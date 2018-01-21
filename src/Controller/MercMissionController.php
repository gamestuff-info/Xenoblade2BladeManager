<?php

namespace App\Controller;

use App\Entity\Blade;
use App\Entity\MercMission;
use App\Entity\MercMissionRequirementClass;
use App\Entity\MercMissionRequirementElement;
use App\Entity\MercMissionRequirementFieldSkill;
use App\Entity\MercMissionRequirementGender;
use App\Entity\MercMissionRequirementStrength;
use App\Entity\MercMissionRequirementWeaponClass;
use App\Entity\Nation;
use App\Form\MercMissionFormType;
use App\Form\MercMissionStartType;
use App\Form\MercMissionStopType;
use Doctrine\Common\Collections\ArrayCollection;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MercMissionController extends Controller
{

    private const NATION_ALL = 'all';

    /**
     * @param string $nationSlug
     *
     * @return Response
     *
     * @Route("/mercmissions/{nationSlug}", name="mercmission_index", defaults={"nationSlug": "all"})
     * @Security("has_role('ROLE_USER')")
     */
    public function index(string $nationSlug = self::NATION_ALL)
    {
        $nationRepo = $this->getDoctrine()->getRepository(Nation::class);
        $bladeRepo = $this->getDoctrine()->getRepository(Blade::class);
        $mercMissionRepo = $this->getDoctrine()->getRepository(MercMission::class);

        if ($nationSlug == self::NATION_ALL) {
            $nation = null;
            $mercMissions = $mercMissionRepo->findAll();
            $title = 'Merc Missions - All';
        } else {
            $nation = $nationRepo->findOneBy(['slug' => $nationSlug]);
            if (!$nation) {
                throw new NotFoundHttpException();
            }
            $mercMissions = $mercMissionRepo->findBy(['nation' => $nation]);
            $title = 'Merc Missions - '.$nation->getName();
        }

        $nations = $nationRepo->findAll();
        $activeMissionList = $mercMissionRepo->findActiveMissions($this->getUser());
        $activeMissions = [];
        foreach ($activeMissionList as $mercMission) {
            $mercMissionBlades = $bladeRepo->findBladesOnMercMission($this->getUser(), $mercMission);
            $teamLeader = $this->findTeamLeader($mercMissionBlades);
            $mercTeamName = $teamLeader->getMercTeamName();
            if (!$mercTeamName) {
                $mercTeamName = 'Team '.$teamLeader->getName();
            }
            $activeMissions[$mercMission->getId()] = [
              'mission' => $mercMission,
              'teamName' => $mercTeamName,
              'leader' => $teamLeader,
              'blades' => $mercMissionBlades,
            ];
        }

        return $this->render(
          'pages/merc_mission/index.html.twig', [
            'title' => $title,
            'currentNation' => $nation,
            'nations' => $nations,
            'mercMissions' => $mercMissions,
            'activeMissions' => $activeMissions,
          ]
        );
    }

    /**
     * @param string $nationSlug
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/mercmissions/{nationSlug}/new", name="mercmission_new", defaults={"nationSlug": "all"})
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function new(Request $request, string $nationSlug)
    {
        $mercMission = new MercMission();

        $nationRepo = $this->getDoctrine()->getRepository(Nation::class);
        if ($nationSlug !== self::NATION_ALL) {
            $nation = $nationRepo->findOneBy(['slug' => $nationSlug]);
            if ($nation) {
                $mercMission->setNation($nation);
            } else {
                throw new NotFoundHttpException();
            }
        }

        $form = $this->createForm(MercMissionFormType::class);
        $form = $this->fillFormFromMercMission($mercMission, $form);

        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $mercMission = $this->fillMercMissionFromForm($form->getData(), $mercMission);

                $em = $this->getDoctrine()->getManager();
                $em->persist($mercMission);
                $em->flush();

                $this->addFlash('success', sprintf('Merc Mission %s added successfully.', $mercMission->getName()));

                return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nationSlug]);
            }
        }

        return $this->render(
          'pages/merc_mission/form.html.twig', [
            'title' => 'New Merc Mission',
            'form' => $form->createView(),
          ]
        );
    }

    /**
     * @param Request $request
     * @param Nation $nation
     * @param MercMission $mercMission
     *
     * @return Response
     *
     * @Route("/mercmissions/{nation}/edit/{mercMission}", name="mercmission_edit")
     * @ParamConverter("nation", options={"mapping": {"nation": "slug"}})
     * @ParamConverter("mercMission", options={"mapping": {"mercMission": "slug"}})
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function edit(Request $request, Nation $nation, MercMission $mercMission)
    {
        $form = $this->createForm(MercMissionFormType::class);
        $form = $this->fillFormFromMercMission($mercMission, $form);

        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $mercMission = $this->fillMercMissionFromForm($form->getData(), $mercMission);

                $em = $this->getDoctrine()->getManager();
                $em->persist($mercMission);
                $em->flush();

                $this->addFlash('success', sprintf('Merc Mission %s has been changed.', $mercMission->getName()));

                return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nation->getSlug()]);
            }
        }

        return $this->render(
          'pages/merc_mission/form.html.twig', [
            'title' => 'Edit Merc Mission - '.$mercMission->getName(),
            'form' => $form->createView(),
          ]
        );
    }

    /**
     * @param Nation $nation
     * @param MercMission $mercMission
     *
     * @return Response
     *
     * @Route("/mercmissions/{nation}/delete/{mercMission}", name="mercmission_delete")
     * @ParamConverter("nation", options={"mapping": {"nation": "slug"}})
     * @ParamConverter("mercMission", options={"mapping": {"mercMission": "slug"}})
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function delete(Nation $nation, MercMission $mercMission)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($mercMission);
        $em->flush();

        $this->addFlash('success', 'The Merc Mission '.$mercMission->getName().' has been deleted.');

        return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nation->getSlug()]);
    }

    /**
     * @param Request $request ,
     * @param Nation $nation
     * @param MercMission $mercMission
     *
     * @return Response
     *
     * @Route("/mercmissions/{nation}/start/{mercMission}", name="mercmission_start")
     * @ParamConverter("nation", options={"mapping": {"nation": "slug"}})
     * @ParamConverter("mercMission", options={"mapping": {"mercMission": "slug"}})
     * @Security("has_role('ROLE_USER')")
     */
    public function start(Request $request, Nation $nation, MercMission $mercMission)
    {
        // Don't let the user start a mission that has already been started.
        $mercMissionRepo = $this->getDoctrine()->getRepository(MercMission::class);
        $activeMissions = $mercMissionRepo->findActiveMissions($this->getUser());
        foreach ($activeMissions as $activeMission) {
            if ($activeMission->getId() == $mercMission->getId()) {
                // This mission is already active
                $this->addFlash('danger', $mercMission->getName().' is already active.');

                return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nation->getSlug()]);
            }
        }

        $bladeRepo = $this->getDoctrine()->getRepository(Blade::class);

        $form = $this->createForm(MercMissionStartType::class);

        $listBlades = $bladeRepo->findBladesForMercMission($this->getUser(), $mercMission);
        $lists = [
          'a' => [
            'name' => 'A List',
            'help' => "Blades that meet a requirement and have a recommended field skill.",
            'blades' => $this->buildBladeMetadata($listBlades['a'], $mercMission),
          ],
          'b' => [
            'name' => 'B List',
            'help' => "Blades that meet a requirement but don't have any recommended field skills.",
            'blades' => $this->buildBladeMetadata($listBlades['b'], $mercMission),
          ],
          'c' => [
            'name' => 'C List',
            'help' => "Blades with a recommended field skill but don't meet any of the requirements.",
            'blades' => $this->buildBladeMetadata($listBlades['c'], $mercMission),
          ],
          'd' => [
            'name' => 'D List',
            'help' => "Blades that don't meet any of the requirements or have any recommended field skills.",
            'blades' => $this->buildBladeMetadata($listBlades['d'], $mercMission),
          ],
          'all' => [
            'name' => 'All',
            'help' => "All Blades",
            'blades' => $this->buildBladeMetadata($listBlades['all'], $mercMission),
          ],
        ];

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // TODO: Check to ensure that the Blades belong to the user.
            $em = $this->getDoctrine()->getManager();
            $bladeIds = json_decode($form->getData()['blades']);
            $leaderId = $form->getData()['leader'];
            $blades = $bladeRepo->findBy(['id' => $bladeIds]);

            foreach ($blades as &$blade) {
                $blade->setMercMission($mercMission);
                if ($blade->getId() == $leaderId) {
                    $blade->setIsMercLeader(true);
                } else {
                    $blade->setIsMercLeader(false);
                }

                $em->persist($blade);
            }
            $em->flush();

            $this->addFlash('success', $mercMission->getName().' has been started.');

            return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nation->getSlug()]);
        }

        return $this->render(
          'pages/merc_mission/start.html.twig', [
            'title' => sprintf('Start "%s"', $mercMission->getName()),
            'mercMission' => $mercMission,
            'form' => $form->createView(),
            'lists' => $lists,
          ]
        );
    }

    /**
     * @param Request $request ,
     * @param Nation $nation
     * @param MercMission $mercMission
     *
     * @return Response
     *
     * @Route("/mercmissions/{nation}/stop/{mercMission}", name="mercmission_stop")
     * @ParamConverter("nation", options={"mapping": {"nation": "slug"}})
     * @ParamConverter("mercMission", options={"mapping": {"mercMission": "slug"}})
     * @Security("has_role('ROLE_USER')")
     */
    public function stop(Request $request, Nation $nation, MercMission $mercMission)
    {
        $mercMissionRepo = $this->getDoctrine()->getRepository(MercMission::class);
        $bladeRepo = $this->getDoctrine()->getRepository(Blade::class);

        // Don't let the user stop a mission that hasn't been started.
        $activeMissions = $mercMissionRepo->findActiveMissions($this->getUser());
        $missionActive = false;
        foreach ($activeMissions as $activeMission) {
            if ($activeMission->getId() == $mercMission->getId()) {
                $missionActive = true;
                break;
            }
        }
        if (!$missionActive) {
            $this->addFlash('danger', $mercMission->getName().' has not been started yet.');

            return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nation->getSlug()]);
        }

        $blades = $bladeRepo->findBladesOnMercMission($this->getUser(), $mercMission);
        $form = $this->createForm(MercMissionStopType::class, null, ['blades' => $blades]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $data = $form->getData();
            /** @var Blade[] $blades */
            $blades = $data['blades'];
            foreach ($blades as $blade) {
                $blade->setIsMercLeader(false)
                  ->setMercMission(null);

                $em->persist($blade);
            }
            $em->flush();

            return $this->redirectToRoute('mercmission_index', ['nationSlug' => $nation->getSlug()]);
        }

        return $this->render(
          'pages/merc_mission/stop.html.twig', [
            'title' => sprintf('Complete "%s"', $mercMission->getName()),
            'form' => $form->createView(),
          ]
        );
    }

    /**
     * @param Blade[] $blades
     *   The blades on this merc mission
     *
     * @return Blade
     */
    private function findTeamLeader($blades)
    {
        foreach ($blades as $blade) {
            if ($blade->isMercLeader()) {
                return $blade;
            }
        }

        throw new \LogicException('Merc Mission has no leader.');
    }

    /**
     * Because the requirements field is polymorphic, the default Symfony mapper
     * cannot be used.
     *
     * @param MercMission $mercMission
     * @param FormInterface $form
     *
     * @return FormInterface
     */
    private function fillFormFromMercMission(MercMission $mercMission, FormInterface $form): FormInterface
    {
        $data = [
          'name' => $mercMission->getName(),
          'nation' => $mercMission->getNation(),
          'duration' => $mercMission->getDuration(),
          'prerequisites' => $mercMission->getPrerequisites(),
          'field_skills' => $mercMission->getFieldSkills(),
          'repeatable' => $mercMission->isRepeatable(),
        ];

        $requirementsFormFieldMap = [
          MercMissionRequirementClass::class => 'blade_class',
          MercMissionRequirementElement::class => 'element',
          MercMissionRequirementFieldSkill::class => 'field_skill',
          MercMissionRequirementGender::class => 'gender',
          MercMissionRequirementStrength::class => 'strength',
          MercMissionRequirementWeaponClass::class => 'weapon_class',
        ];
        foreach ($requirementsFormFieldMap as $requirementType) {
            $data['requirements_'.$requirementType] = new ArrayCollection();
        }
        foreach ($mercMission->getRequirements() as $requirement) {
            $dataKey = 'requirements_'.$requirementsFormFieldMap[get_class($requirement)];
            $data[$dataKey]->add($requirement);
        }

        $form->setData($data);

        return $form;
    }

    /**
     * Because the requirements field is polymorphic, the default Symfony mapper
     * cannot be used.
     *
     * The Entity Manager must be flushed after this function.
     *
     * @param array $data
     * @param MercMission $mercMission
     *
     * @return MercMission
     */
    private function fillMercMissionFromForm(array $data, MercMission $mercMission): MercMission
    {
        $mercMission->setName($data['name'])
          ->setNation($data['nation'])
          ->setDuration($data['duration'])
          ->setPrerequisites($data['prerequisites'])
          ->setFieldSkills($data['field_skills'])
          ->setRepeatable($data['repeatable']);

        // Empty the requirements list first
        $originalRequirements = $mercMission->getRequirements();
        $mercMission->setRequirements(new ArrayCollection());
        $requirementTypes = [
          'blade_class',
          'element',
          'field_skill',
          'gender',
          'strength',
          'weapon_class',
        ];
        foreach ($requirementTypes as $requirementType) {
            // Add the new requirements.  The entity itself will check and ignore duplicates.
            foreach ($data['requirements_'.$requirementType] as $newRequirement) {
                $mercMission->addRequirement($newRequirement);
            }
        }
        // Remove requirement entities that are no longer in use.
        $em = $this->getDoctrine()->getManager();
        foreach ($originalRequirements as $originalRequirement) {
            if (!$mercMission->getRequirements()
              ->contains($originalRequirement)) {
                $em->remove($originalRequirement);
            }
        }

        return $mercMission;
    }

    /**
     * @param Blade[] $blades
     * @param MercMission $mercMission
     *
     * @return array[]
     */
    private function buildBladeMetadata(array $blades, MercMission $mercMission): array
    {
        // Sort the Blade list by affinity percentage, ascending.
        uasort(
          $blades,
          function (Blade $a, Blade $b) {
              $aPct = $a->getAffinity() / $a->getAffinityTotal();
              $bPct = $b->getAffinity() / $b->getAffinityTotal();

              return (100 * $aPct) - (100 * $bPct);
          }
        );
        $bladeList = [];

        foreach ($blades as $blade) {
            $bladeList[] = [
              'blade' => $blade,
              'requirements' => $this->getRequirementsMet($blade, $mercMission),
              'fieldSkills' => $this->getFieldSkillsMet($blade, $mercMission),
            ];
        }

        return $bladeList;
    }

    /**
     * Determine which Merc Mission Requirements the given blade meets.
     *
     * @param Blade $blade
     * @param MercMission $mercMission
     *
     * @return int[]
     *   A list of Requirement ids
     */
    private function getRequirementsMet(Blade $blade, MercMission $mercMission)
    {
        $requirementsMet = [];

        foreach ($mercMission->getRequirements() as $requirement) {
            if ($requirement instanceof MercMissionRequirementClass) {
                if ($blade->getGender()->getClass()->getId() == $requirement->getClass()->getId()) {
                    $requirementsMet[] = $requirement->getId();
                }
            } elseif ($requirement instanceof MercMissionRequirementElement) {
                if ($blade->getElement()->getId() == $requirement->getElement()->getId()) {
                    $requirementsMet[] = $requirement->getId();
                }
            } elseif ($requirement instanceof MercMissionRequirementFieldSkill) {
                foreach ($blade->getAffinityNodes() as $affinityNode) {
                    if ($affinityNode->getAffinityNode()->getId() == $requirement->getFieldSkill()->getId()
                      && $affinityNode->getLevel() >= $requirement->getLevel()) {
                        $requirementsMet[] = $requirement->getId();
                        break;
                    }
                }
            } elseif ($requirement instanceof MercMissionRequirementGender) {
                if ($blade->getGender()->getId() == $requirement->getGender()->getId()) {
                    $requirementsMet[] = $requirement->getId();
                }
            } elseif ($requirement instanceof MercMissionRequirementStrength) {
                if ($blade->getStrength() >= $requirement->getStrength()) {
                    $requirementsMet[] = $requirement->getId();
                }
            } elseif ($requirement instanceof MercMissionRequirementWeaponClass) {
                if ($blade->getWeaponClass()->getId() == $requirement->getWeaponClass()->getId()) {
                    $requirementsMet[] = $requirement->getId();
                }
            } else {
                throw new \LogicException(get_class($requirement).' is not a valid Merc Mission Requirement.');
            }
        }

        return $requirementsMet;
    }

    /**
     * Determine which optional field skills a Blade can contribute to the Merc
     * Mission.
     *
     * @param Blade $blade
     * @param MercMission $mercMission
     *
     * @return int[]
     */
    private function getFieldSkillsMet(Blade $blade, MercMission $mercMission)
    {
        $fieldSkills = [];

        foreach ($mercMission->getFieldSkills() as $fieldSkill) {
            foreach ($blade->getAffinityNodes() as $affinityNode) {
                if ($affinityNode->getAffinityNode()->getId() == $fieldSkill->getId()) {
                    $fieldSkills[] = $fieldSkill->getId();
                }
            }
        }

        return $fieldSkills;
    }
}
