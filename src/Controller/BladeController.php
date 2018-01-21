<?php

namespace App\Controller;

use App\Entity\Blade;
use App\Entity\BladeAffinityNode;
use App\Entity\BladeTemplate;
use App\Entity\Driver;
use App\Form\BladeFormType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\SerializerInterface;

class BladeController extends Controller
{

    /**
     * @param string $driverSlug
     *
     * @return Response
     *
     * @Route("/blades/{driverSlug}", name="blade_index", defaults={"driverSlug": "all"})
     * @Security("has_role('ROLE_USER')")
     */
    public function index(string $driverSlug)
    {
        $driverRepo = $this->getDoctrine()->getRepository(Driver::class);
        if ($driverSlug !== 'all') {
            $driver = $driverRepo->findOneBy(['slug' => $driverSlug]);
            if (!$driver) {
                throw new NotFoundHttpException();
            }
            $title = 'Blades - '.$driver->getName();
        } else {
            $driver = null;
            $title = 'Blades - All';
        }

        $bladeRepo = $this->getDoctrine()->getRepository(Blade::class);

        $drivers = $driverRepo->findAll();
        if ($driver) {
            $blades = $bladeRepo->findDriverBlades($this->getUser(), $driver);
        } else {
            $blades = $bladeRepo->findBy(['user' => $this->getUser()]);
        }

        return $this->render(
          'pages/blade/index.html.twig',
          [
            'title' => $title,
            'currentDriver' => $driver,
            'drivers' => $drivers,
            'blades' => $blades,
          ]
        );
    }

    /**
     * @param Request $request
     * @param string $driverSlug
     *
     * @return Response
     *
     * @Route("/blades/{driverSlug}/new", name="blade_new")
     * @Security("has_role('ROLE_USER')")
     */
    public function new(Request $request, string $driverSlug)
    {
        $driverRepo = $this->getDoctrine()->getRepository(Driver::class);
        if ($driverSlug !== 'all') {
            $driver = $driverRepo->findOneBy(['slug' => $driverSlug]);
            if (!$driver) {
                throw new NotFoundHttpException();
            }
            $title = 'Bond Blade - '.$driver->getName();
        } else {
            $driver = null;
            $title = 'Bond Blade';
        }

        $bladeTemplateRepo = $this->getDoctrine()
          ->getRepository(BladeTemplate::class);
        $bladeTemplates = $bladeTemplateRepo->findAll();

        $templateSlug = $request->get('template');
        if (!is_null($templateSlug) && $template = $bladeTemplateRepo->findOneBy(['slug' => $templateSlug])) {
            $blade = $template->toBlade();
        } else {
            $blade = new Blade();
        }
        $blade->setUser($this->getUser());
        if ($driver) {
            $blade->setDriver($driver);
        }
        $form = $this->createForm(BladeFormType::class, $blade);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $blade = $form->getData();
                $em = $this->getDoctrine()->getManager();
                $em->persist($blade);
                $em->flush();

                $this->showBladeAddedMessage($blade);

                return $this->redirectToRoute(
                  'blade_index',
                  ['driverSlug' => $driverSlug]
                );
            } else {
                $this->showBladeErrorMessage($blade);
            }
        }

        return $this->render(
          'pages/blade/form.html.twig',
          [
            'title' => $title,
            'form' => $form->createView(),
            'currentDriver' => $driver,
            'templates' => $bladeTemplates,
          ]
        );
    }

    /**
     * @param Request $request
     * @param string $driverSlug
     * @param Blade $blade
     *
     * @return Response
     *
     * @Route("/blades/{driverSlug}/edit/{blade}", name="blade_edit")
     * @ParamConverter("blade", options={"mapping": {"blade": "id"}})
     */
    public function edit(Request $request, string $driverSlug, Blade $blade)
    {
        $this->denyAccessUnlessGranted('EDIT', $blade);

        $form = $this->createForm(BladeFormType::class, $blade);

        // Capture the original Affinity Chart so it can be reconciled later.
        /** @var Collection|BladeAffinityNode[] $originalAffinityChart */
        $originalAffinityChart = new ArrayCollection();
        foreach ($blade->getAffinityNodes() as $affinityNode) {
            $originalAffinityChart->add($affinityNode);
        }

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();

                /** @var Blade $blade */
                $blade = $form->getData();

                // Remove unused affinity nodes.
                foreach ($originalAffinityChart as $affinityNode) {
                    if (!$blade->getAffinityNodes()->contains($affinityNode)) {
                        $affinityNode->setBlade(null);
                        $em->persist($affinityNode);
                        $em->remove($affinityNode);
                    }
                }
                $em->persist($blade);
                $em->flush();

                $this->addFlash(
                  'success',
                  $blade->getName().' has been changed.'
                );

                return $this->redirectToRoute(
                  'blade_index',
                  ['driver' => $driverSlug]
                );
            } else {
                $this->showBladeErrorMessage($blade);
            }
        }

        return $this->render(
          'pages/blade/form.html.twig',
          [
            'title' => 'Edit '.$blade->getName(),
            'form' => $form->createView(),
          ]
        );
    }

    /**
     * @param string $driverSlug
     * @param Blade $blade
     *
     * @return Response
     *
     * @Route("/blades/{driverSlug}/delete/{blade}", name="blade_delete")
     * @ParamConverter("blade", options={"mapping": {"blade": "id"}})
     */
    public function delete(string $driverSlug, Blade $blade)
    {
        $this->denyAccessUnlessGranted('DELETE', $blade);

        $em = $this->getDoctrine()->getManager();
        $em->remove($blade);
        $em->flush();

        $this->addFlash('success', $blade->getName().' has been released.');

        return $this->redirectToRoute('blade_index', ['driverSlug' => $driverSlug]);
    }

    /**
     * @param Blade $blade
     */
    private function showBladeAddedMessage(Blade $blade)
    {
        $this->addFlash(
          'success',
          sprintf(
            '%s has been bonded with %s.',
            $blade->getName(),
            $blade->getDriver()->getName()
          )
        );
    }

    /**
     * @param Blade $blade
     */
    private function showBladeErrorMessage(Blade $blade)
    {
        $this->addFlash(
          'danger',
          sprintf(
            'An error occurred processing %s.',
            $blade->getName() ?: 'this Blade'
          )
        );
    }
}
