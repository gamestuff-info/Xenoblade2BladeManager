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
        //        $this->getSessionHandler()->createTable();
        $this->addSql(
          <<<SQL
CREATE TABLE `sessions` (
    `sess_id` VARCHAR(128) NOT NULL PRIMARY KEY,
    `sess_data` BLOB NOT NULL,
    `sess_time` INTEGER UNSIGNED NOT NULL,
    `sess_lifetime` MEDIUMINT NOT NULL
) COLLATE `utf8mb4_bin`, charset = `utf8mb4` ENGINE = InnoDB;
SQL
        );
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->addSql(
          <<<SQL
DROP TABLE `sessions`;
SQL
        );
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
