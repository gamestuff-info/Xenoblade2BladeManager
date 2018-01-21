<?php


namespace App\Tests;


use Doctrine\Bundle\DoctrineBundle\Registry;
use Faker\Factory;
use Faker\Generator;
use Fidry\AliceDataFixtures\Loader\PurgerLoader;
use Fidry\AliceDataFixtures\Persistence\PurgeMode;
use Liip\FunctionalTestBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\Finder\Finder;

abstract class FixturesTestCase extends WebTestCase
{

    /**
     * @var PurgerLoader
     */
    protected $loader;

    /**
     * @var Registry
     */
    protected $doctrine;

    /**
     * @var Generator
     */
    protected $faker;

    /**
     * @var string
     */
    protected $fixturesDir;

    /**
     * @var Client
     */
    private $client;

    /**
     * @throws \Exception
     *   Thrown when the doctrine:schema:update command cannot run.
     */
    public function setUp()
    {
        parent::setUp();

        $this->client = $this->createClient();
        $container = $this->client->getContainer();
        $this->loader = $container->get('fidry_alice_data_fixtures.loader.doctrine');
        $this->doctrine = $container->get('doctrine');
        $this->faker = Factory::create();

        $projectDir = $container->getParameter('kernel.project_dir');
        $this->fixturesDir = implode(
          DIRECTORY_SEPARATOR, [
            $projectDir,
            'fixtures',
          ]
        );

        // Initialize the database.  The easiest way to do this is to run
        // doctrine:schema:update --force programmatically.
        $kernel = $container->get('kernel');
        $application = new Application($kernel);
        $application->setAutoExit(false);
        $input = new ArrayInput(
          [
            'command' => 'doctrine:schema:update',
            '--force' => true,
          ]
        );
        $output = new NullOutput();
        $application->run($input, $output);
    }

    /**
     * Load fixtures from files.  Defaults to loading all fixtures.
     *
     * @see \Fidry\AliceDataFixtures\Loader\PurgerLoader::load()
     *
     * @param array|string $fixtureNames
     * @param array $parameters
     * @param array $objects
     * @param PurgeMode|null $purgeMode
     *
     * @return array
     */
    protected function loadFixturesFromFile($fixtureNames = [], $parameters = [], $objects = [], PurgeMode $purgeMode = null): array
    {
        if (!is_array($fixtureNames)) {
            $fixtureNames = [$fixtureNames];
        }

        $fixturesFiles = [];
        if (empty($fixtureName)) {
            $finder = new Finder();
            $finder->in($this->fixturesDir)
              ->files()
              ->name('/\.(php|yaml|yml)$/');
            foreach ($finder as $fileInfo) {
                $fixturesFiles[] = $fileInfo->getRealPath();
            }
        } else {
            foreach ($fixtureNames as $fixtureName) {
                $filePath = implode(
                  DIRECTORY_SEPARATOR, [
                    $this->fixturesDir,
                    $fixtureName,
                  ]
                );
                $fixturesFiles[] = $filePath;
            }
        }

        return $this->loader->load($fixturesFiles, $parameters, $objects, $purgeMode);
    }

    /**
     * @param array|string $fixtureNames
     *   A fixture filename or an array of such.  This can be any pattern that
     *   \Symfony\Component\Finder\Finder::name accepts.
     * @param array $parameters
     * @param array $objects
     * @param \Fidry\AliceDataFixtures\Persistence\PurgeMode|null $purgeMode
     *
     * @return array
     */
    protected function loadFixturesFromFileExcept($fixtureNames, $parameters = [], $objects = [], PurgeMode $purgeMode = null): array
    {
        if (!is_array($fixtureNames)) {
            $fixtureNames = [$fixtureNames];
        }

        $finder = new Finder();
        $finder->files()
          ->name('/\.(php|yaml|yml)$/');
        foreach ($fixtureNames as $fixtureName) {
            $finder->notName($fixtureName);
        }

        $fixturesFiles = [];
        foreach ($finder as $fileInfo) {
            $fixturesFiles[] = $fileInfo->getRealPath();
        }

        return $this->loader->load($fixturesFiles, $parameters, $objects, $purgeMode);
    }
}
