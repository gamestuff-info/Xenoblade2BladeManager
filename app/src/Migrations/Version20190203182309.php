<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Initial entity creation
 */
final class Version20190203182309 extends AbstractMigration
{

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE `blade_superclass` (`id` INT AUTO_INCREMENT NOT NULL, `element_id` INT DEFAULT NULL, `gender_id` INT DEFAULT NULL, `battle_role_id` INT DEFAULT NULL, `weapon_class_id` INT DEFAULT NULL, `is_merc` TINYINT(1) NOT NULL, `merc_team_name` VARCHAR(255) DEFAULT NULL, `rarity` INT NOT NULL, `affinity_total` INT NOT NULL, `can_be_released` TINYINT(1) NOT NULL, `name` VARCHAR(255) NOT NULL, `discr` VARCHAR(255) NOT NULL, INDEX `idx_6ea9eb401f1f2a24` (`element_id`), INDEX `idx_6ea9eb40708a0e0` (`gender_id`), INDEX `idx_6ea9eb401c9c96cf` (`battle_role_id`), INDEX `idx_6ea9eb409b14b9d9` (`weapon_class_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `blade` (`id` INT NOT NULL, `user_id` INT DEFAULT NULL, `driver_id` INT DEFAULT NULL, `trust_id` INT DEFAULT NULL, `merc_mission_id` INT DEFAULT NULL, `from_template_id` INT DEFAULT NULL, `strength` INT NOT NULL, `affinity` INT NOT NULL, `is_merc_leader` TINYINT(1) NOT NULL, `merc_team_position` INT DEFAULT NULL, `in_party` TINYINT(1) NOT NULL, INDEX `idx_217c01e8a76ed395` (`user_id`), INDEX `idx_217c01e8c3423909` (`driver_id`), INDEX `idx_217c01e8ae0fac85` (`trust_id`), INDEX `idx_217c01e852594d7f` (`merc_mission_id`), INDEX `idx_217c01e89b953edd` (`from_template_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `nation` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_cc5a6d27989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission` (`id` INT AUTO_INCREMENT NOT NULL, `nation_id` INT DEFAULT NULL, `duration` TIME NOT NULL, `repeatable` TINYINT(1) NOT NULL, `merc_points` INT DEFAULT NULL, `experience` INT DEFAULT NULL, `gold` INT DEFAULT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_faf4b51f989d9b62` (`slug`), INDEX `idx_faf4b51fae3899` (`nation_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_merc_mission_requirement` (`merc_mission_id` INT NOT NULL, `merc_mission_requirement_id` INT NOT NULL, INDEX `idx_24e4a71b52594d7f` (`merc_mission_id`), INDEX `idx_24e4a71b6f5f9e61` (`merc_mission_requirement_id`), PRIMARY KEY(`merc_mission_id`, `merc_mission_requirement_id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_merc_mission_prerequisite` (`merc_mission_id` INT NOT NULL, `merc_mission_prerequisite_id` INT NOT NULL, INDEX `idx_a465e1d252594d7f` (`merc_mission_id`), INDEX `idx_a465e1d2d3aa45cb` (`merc_mission_prerequisite_id`), PRIMARY KEY(`merc_mission_id`, `merc_mission_prerequisite_id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_affinity_node` (`merc_mission_id` INT NOT NULL, `affinity_node_id` INT NOT NULL, INDEX `idx_f63780b852594d7f` (`merc_mission_id`), INDEX `idx_f63780b8f810347f` (`affinity_node_id`), PRIMARY KEY(`merc_mission_id`, `affinity_node_id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (`id` INT AUTO_INCREMENT NOT NULL, `password` VARCHAR(255) DEFAULT NULL, `email` VARCHAR(255) NOT NULL, `is_active` TINYINT(1) NOT NULL, `created` DATETIME NOT NULL, `activate_code` VARCHAR(255) DEFAULT NULL, `activate_code_time` DATETIME DEFAULT NULL, `google_id` VARCHAR(255) DEFAULT NULL, UNIQUE INDEX `uniq_8d93d649e7927c74` (`email`), UNIQUE INDEX `uniq_8d93d64976f5c865` (`google_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user_role` (`user_id` INT NOT NULL, `role_id` INT NOT NULL, INDEX `idx_2de8c6a3a76ed395` (`user_id`), INDEX `idx_2de8c6a3d60322ac` (`role_id`), PRIMARY KEY(`user_id`, `role_id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user_nation` (`user_id` INT NOT NULL, `nation_id` INT NOT NULL, INDEX `idx_a908761aa76ed395` (`user_id`), INDEX `idx_a908761aae3899` (`nation_id`), PRIMARY KEY(`user_id`, `nation_id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user_driver` (`user_id` INT NOT NULL, `driver_id` INT NOT NULL, INDEX `idx_743467e4a76ed395` (`user_id`), INDEX `idx_743467e4c3423909` (`driver_id`), PRIMARY KEY(`user_id`, `driver_id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `role` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_57698a6a989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement` (`id` INT AUTO_INCREMENT NOT NULL, `count` INT NOT NULL, `discr` VARCHAR(255) NOT NULL, PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement_element` (`id` INT NOT NULL, `element_id` INT DEFAULT NULL, INDEX `idx_eb0de4af1f1f2a24` (`element_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement_gender` (`id` INT NOT NULL, `gender_id` INT DEFAULT NULL, INDEX `idx_80b1c32c708a0e0` (`gender_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `blade_class` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_b86276af989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_prerequisite` (`id` INT AUTO_INCREMENT NOT NULL, `sort` INT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_5e819534989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement_strength` (`id` INT NOT NULL, `strength` INT NOT NULL, PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `element` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_41405e39989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement_class` (`id` INT NOT NULL, `class_id` INT DEFAULT NULL, INDEX `idx_a94d0871ea000b10` (`class_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement_weapon_class` (`id` INT NOT NULL, `weapon_class_id` INT DEFAULT NULL, INDEX `idx_c0d2df449b14b9d9` (`weapon_class_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `merc_mission_requirement_field_skill` (`id` INT NOT NULL, `field_skill_id` INT DEFAULT NULL, `level` INT NOT NULL, INDEX `idx_56accc8c83bd468f` (`field_skill_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `driver` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_11667cd9989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `affinity_node` (`id` INT AUTO_INCREMENT NOT NULL, `sort` INT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_ff9ad9a4989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `trust_rank` (`id` INT AUTO_INCREMENT NOT NULL, `sort` INT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_7880d3b1989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `weapon_class` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_c0f1e9fa989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `gender` (`id` INT AUTO_INCREMENT NOT NULL, `class_id` INT DEFAULT NULL, `sort` INT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_c7470a42989d9b62` (`slug`), INDEX `idx_c7470a42ea000b10` (`class_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `blade_affinity_node` (`id` INT AUTO_INCREMENT NOT NULL, `blade_id` INT DEFAULT NULL, `affinity_node_id` INT DEFAULT NULL, `level` INT NOT NULL, `max_level` INT NOT NULL, INDEX `idx_d7f9a2908118485f` (`blade_id`), INDEX `idx_d7f9a290f810347f` (`affinity_node_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `blade_template` (`id` INT NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_13dc1542989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `battle_role` (`id` INT AUTO_INCREMENT NOT NULL, `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL, UNIQUE INDEX `uniq_e49fc989d9b62` (`slug`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `blade_superclass` ADD CONSTRAINT `fk_6ea9eb401f1f2a24` FOREIGN KEY (`element_id`) REFERENCES `element` (`id`)');
        $this->addSql('ALTER TABLE `blade_superclass` ADD CONSTRAINT `fk_6ea9eb40708a0e0` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`)');
        $this->addSql('ALTER TABLE `blade_superclass` ADD CONSTRAINT `fk_6ea9eb401c9c96cf` FOREIGN KEY (`battle_role_id`) REFERENCES `battle_role` (`id`)');
        $this->addSql('ALTER TABLE `blade_superclass` ADD CONSTRAINT `fk_6ea9eb409b14b9d9` FOREIGN KEY (`weapon_class_id`) REFERENCES `weapon_class` (`id`)');
        $this->addSql('ALTER TABLE `blade` ADD CONSTRAINT `fk_217c01e8a76ed395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)');
        $this->addSql('ALTER TABLE `blade` ADD CONSTRAINT `fk_217c01e8c3423909` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`)');
        $this->addSql('ALTER TABLE `blade` ADD CONSTRAINT `fk_217c01e8ae0fac85` FOREIGN KEY (`trust_id`) REFERENCES `trust_rank` (`id`)');
        $this->addSql('ALTER TABLE `blade` ADD CONSTRAINT `fk_217c01e852594d7f` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`)');
        $this->addSql('ALTER TABLE `blade` ADD CONSTRAINT `fk_217c01e89b953edd` FOREIGN KEY (`from_template_id`) REFERENCES `blade_template` (`id`)');
        $this->addSql('ALTER TABLE `blade` ADD CONSTRAINT `fk_217c01e8bf396750` FOREIGN KEY (`id`) REFERENCES `blade_superclass` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission` ADD CONSTRAINT `fk_faf4b51fae3899` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`id`)');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_requirement` ADD CONSTRAINT `fk_24e4a71b52594d7f` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_requirement` ADD CONSTRAINT `fk_24e4a71b6f5f9e61` FOREIGN KEY (`merc_mission_requirement_id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_prerequisite` ADD CONSTRAINT `fk_a465e1d252594d7f` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_prerequisite` ADD CONSTRAINT `fk_a465e1d2d3aa45cb` FOREIGN KEY (`merc_mission_prerequisite_id`) REFERENCES `merc_mission_prerequisite` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_affinity_node` ADD CONSTRAINT `fk_f63780b852594d7f` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_affinity_node` ADD CONSTRAINT `fk_f63780b8f810347f` FOREIGN KEY (`affinity_node_id`) REFERENCES `affinity_node` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user_role` ADD CONSTRAINT `fk_2de8c6a3a76ed395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user_role` ADD CONSTRAINT `fk_2de8c6a3d60322ac` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user_nation` ADD CONSTRAINT `fk_a908761aa76ed395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user_nation` ADD CONSTRAINT `fk_a908761aae3899` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user_driver` ADD CONSTRAINT `fk_743467e4a76ed395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user_driver` ADD CONSTRAINT `fk_743467e4c3423909` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_requirement_element` ADD CONSTRAINT `fk_eb0de4af1f1f2a24` FOREIGN KEY (`element_id`) REFERENCES `element` (`id`)');
        $this->addSql('ALTER TABLE `merc_mission_requirement_element` ADD CONSTRAINT `fk_eb0de4afbf396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_requirement_gender` ADD CONSTRAINT `fk_80b1c32c708a0e0` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`)');
        $this->addSql('ALTER TABLE `merc_mission_requirement_gender` ADD CONSTRAINT `fk_80b1c32cbf396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_requirement_strength` ADD CONSTRAINT `fk_cf7f9a13bf396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_requirement_class` ADD CONSTRAINT `fk_a94d0871ea000b10` FOREIGN KEY (`class_id`) REFERENCES `blade_class` (`id`)');
        $this->addSql('ALTER TABLE `merc_mission_requirement_class` ADD CONSTRAINT `fk_a94d0871bf396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_requirement_weapon_class` ADD CONSTRAINT `fk_c0d2df449b14b9d9` FOREIGN KEY (`weapon_class_id`) REFERENCES `weapon_class` (`id`)');
        $this->addSql('ALTER TABLE `merc_mission_requirement_weapon_class` ADD CONSTRAINT `fk_c0d2df44bf396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `merc_mission_requirement_field_skill` ADD CONSTRAINT `fk_56accc8c83bd468f` FOREIGN KEY (`field_skill_id`) REFERENCES `affinity_node` (`id`)');
        $this->addSql('ALTER TABLE `merc_mission_requirement_field_skill` ADD CONSTRAINT `fk_56accc8cbf396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `gender` ADD CONSTRAINT `fk_c7470a42ea000b10` FOREIGN KEY (`class_id`) REFERENCES `blade_class` (`id`)');
        $this->addSql('ALTER TABLE `blade_affinity_node` ADD CONSTRAINT `fk_d7f9a2908118485f` FOREIGN KEY (`blade_id`) REFERENCES `blade_superclass` (`id`)');
        $this->addSql('ALTER TABLE `blade_affinity_node` ADD CONSTRAINT `fk_d7f9a290f810347f` FOREIGN KEY (`affinity_node_id`) REFERENCES `affinity_node` (`id`)');
        $this->addSql('ALTER TABLE `blade_template` ADD CONSTRAINT `fk_13dc1542bf396750` FOREIGN KEY (`id`) REFERENCES `blade_superclass` (`id`) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `blade` DROP FOREIGN KEY `fk_217c01e8bf396750`');
        $this->addSql('ALTER TABLE `blade_affinity_node` DROP FOREIGN KEY `fk_d7f9a2908118485f`');
        $this->addSql('ALTER TABLE `blade_template` DROP FOREIGN KEY `fk_13dc1542bf396750`');
        $this->addSql('ALTER TABLE `merc_mission` DROP FOREIGN KEY `fk_faf4b51fae3899`');
        $this->addSql('ALTER TABLE `user_nation` DROP FOREIGN KEY `fk_a908761aae3899`');
        $this->addSql('ALTER TABLE `blade` DROP FOREIGN KEY `fk_217c01e852594d7f`');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_requirement` DROP FOREIGN KEY `fk_24e4a71b52594d7f`');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_prerequisite` DROP FOREIGN KEY `fk_a465e1d252594d7f`');
        $this->addSql('ALTER TABLE `merc_mission_affinity_node` DROP FOREIGN KEY `fk_f63780b852594d7f`');
        $this->addSql('ALTER TABLE `blade` DROP FOREIGN KEY `fk_217c01e8a76ed395`');
        $this->addSql('ALTER TABLE `user_role` DROP FOREIGN KEY `fk_2de8c6a3a76ed395`');
        $this->addSql('ALTER TABLE `user_nation` DROP FOREIGN KEY `fk_a908761aa76ed395`');
        $this->addSql('ALTER TABLE `user_driver` DROP FOREIGN KEY `fk_743467e4a76ed395`');
        $this->addSql('ALTER TABLE `user_role` DROP FOREIGN KEY `fk_2de8c6a3d60322ac`');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_requirement` DROP FOREIGN KEY `fk_24e4a71b6f5f9e61`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_element` DROP FOREIGN KEY `fk_eb0de4afbf396750`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_gender` DROP FOREIGN KEY `fk_80b1c32cbf396750`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_strength` DROP FOREIGN KEY `fk_cf7f9a13bf396750`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_class` DROP FOREIGN KEY `fk_a94d0871bf396750`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_weapon_class` DROP FOREIGN KEY `fk_c0d2df44bf396750`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_field_skill` DROP FOREIGN KEY `fk_56accc8cbf396750`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_class` DROP FOREIGN KEY `fk_a94d0871ea000b10`');
        $this->addSql('ALTER TABLE `gender` DROP FOREIGN KEY `fk_c7470a42ea000b10`');
        $this->addSql('ALTER TABLE `merc_mission_merc_mission_prerequisite` DROP FOREIGN KEY `fk_a465e1d2d3aa45cb`');
        $this->addSql('ALTER TABLE `blade_superclass` DROP FOREIGN KEY `fk_6ea9eb401f1f2a24`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_element` DROP FOREIGN KEY `fk_eb0de4af1f1f2a24`');
        $this->addSql('ALTER TABLE `blade` DROP FOREIGN KEY `fk_217c01e8c3423909`');
        $this->addSql('ALTER TABLE `user_driver` DROP FOREIGN KEY `fk_743467e4c3423909`');
        $this->addSql('ALTER TABLE `merc_mission_affinity_node` DROP FOREIGN KEY `fk_f63780b8f810347f`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_field_skill` DROP FOREIGN KEY `fk_56accc8c83bd468f`');
        $this->addSql('ALTER TABLE `blade_affinity_node` DROP FOREIGN KEY `fk_d7f9a290f810347f`');
        $this->addSql('ALTER TABLE `blade` DROP FOREIGN KEY `fk_217c01e8ae0fac85`');
        $this->addSql('ALTER TABLE `blade_superclass` DROP FOREIGN KEY `fk_6ea9eb409b14b9d9`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_weapon_class` DROP FOREIGN KEY `fk_c0d2df449b14b9d9`');
        $this->addSql('ALTER TABLE `blade_superclass` DROP FOREIGN KEY `fk_6ea9eb40708a0e0`');
        $this->addSql('ALTER TABLE `merc_mission_requirement_gender` DROP FOREIGN KEY `fk_80b1c32c708a0e0`');
        $this->addSql('ALTER TABLE `blade` DROP FOREIGN KEY `fk_217c01e89b953edd`');
        $this->addSql('ALTER TABLE `blade_superclass` DROP FOREIGN KEY `fk_6ea9eb401c9c96cf`');
        $this->addSql('DROP TABLE `blade_superclass`');
        $this->addSql('DROP TABLE `blade`');
        $this->addSql('DROP TABLE `nation`');
        $this->addSql('DROP TABLE `merc_mission`');
        $this->addSql('DROP TABLE `merc_mission_merc_mission_requirement`');
        $this->addSql('DROP TABLE `merc_mission_merc_mission_prerequisite`');
        $this->addSql('DROP TABLE `merc_mission_affinity_node`');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE `user_role`');
        $this->addSql('DROP TABLE `user_nation`');
        $this->addSql('DROP TABLE `user_driver`');
        $this->addSql('DROP TABLE `role`');
        $this->addSql('DROP TABLE `merc_mission_requirement`');
        $this->addSql('DROP TABLE `merc_mission_requirement_element`');
        $this->addSql('DROP TABLE `merc_mission_requirement_gender`');
        $this->addSql('DROP TABLE `blade_class`');
        $this->addSql('DROP TABLE `merc_mission_prerequisite`');
        $this->addSql('DROP TABLE `merc_mission_requirement_strength`');
        $this->addSql('DROP TABLE `element`');
        $this->addSql('DROP TABLE `merc_mission_requirement_class`');
        $this->addSql('DROP TABLE `merc_mission_requirement_weapon_class`');
        $this->addSql('DROP TABLE `merc_mission_requirement_field_skill`');
        $this->addSql('DROP TABLE `driver`');
        $this->addSql('DROP TABLE `affinity_node`');
        $this->addSql('DROP TABLE `trust_rank`');
        $this->addSql('DROP TABLE `weapon_class`');
        $this->addSql('DROP TABLE `gender`');
        $this->addSql('DROP TABLE `blade_affinity_node`');
        $this->addSql('DROP TABLE `blade_template`');
        $this->addSql('DROP TABLE `battle_role`');
    }
}
