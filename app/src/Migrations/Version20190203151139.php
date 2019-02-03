<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\HttpFoundation\Session\Storage\Handler\PdoSessionHandler;

/**
 * Create the session table.
 */
final class Version20190203151139 extends AbstractMigration implements ContainerAwareInterface
{

    use ContainerAwareTrait;

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->getSessionHandler()->createTable();
    }

    /**
     * @param Schema $schema
     *
     * @throws \Doctrine\DBAL\Migrations\IrreversibleMigrationException
     */
    public function down(Schema $schema): void
    {
        $this->throwIrreversibleMigrationException();

    }

    /**
     * Get the PdoSessionHandler, initializing from the container if necessary.
     *
     * @return PdoSessionHandler
     */
    private function getSessionHandler(): PdoSessionHandler
    {
        static $pdoSessionHandler = null;

        if (!isset($pdoSessionHandler)) {
            $pdoSessionHandler = $this->container->get('session_handler.pdo');
        }

        return $pdoSessionHandler;
    }
}
