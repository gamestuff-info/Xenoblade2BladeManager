-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: homestead
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @`OLD_CHARACTER_SET_CLIENT` = @@`CHARACTER_SET_CLIENT` */;
/*!40101 SET @`OLD_CHARACTER_SET_RESULTS` = @@`CHARACTER_SET_RESULTS` */;
/*!40101 SET @`OLD_COLLATION_CONNECTION` = @@`COLLATION_CONNECTION` */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @`OLD_TIME_ZONE` = @@`TIME_ZONE` */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @`OLD_UNIQUE_CHECKS` = @@`UNIQUE_CHECKS`, UNIQUE_CHECKS = 0 */;
/*!40014 SET @`OLD_FOREIGN_KEY_CHECKS` = @@`FOREIGN_KEY_CHECKS`, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @`OLD_SQL_MODE` = @@`SQL_MODE`, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @`OLD_SQL_NOTES` = @@`SQL_NOTES`, SQL_NOTES = 0 */;

--
-- Table structure for table `affinity_node`
--

DROP TABLE IF EXISTS `affinity_node`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `affinity_node` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `sort` INT(11)                                   NOT NULL,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_FF9AD9A4989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 56
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `affinity_node`
--

LOCK TABLES `affinity_node` WRITE;
/*!40000 ALTER TABLE `affinity_node`
  DISABLE KEYS */;
INSERT INTO `affinity_node` (`id`, `sort`, `name`, `slug`)
VALUES (1, 1, 'Dark Mastery', 'dark-mastery'), (2, 2, 'Earth Mastery', 'earth-mastery'),
  (3, 3, 'Electric Mastery', 'electric-mastery'), (4, 4, 'Fire Mastery', 'fire-mastery'),
  (5, 6, 'Light Mastery', 'light-mastery'), (6, 5, 'Ice Mastery', 'ice-mastery'),
  (7, 7, 'Water Mastery', 'water-mastery'), (8, 8, 'Wind Mastery', 'wind-mastery'), (9, 9, 'Agronomy', 'agronomy'),
  (10, 10, 'Botany', 'botany'), (11, 11, 'Entomology', 'entomology'), (12, 12, 'Forestry', 'forestry'),
  (13, 13, 'Ichthyology', 'ichthyology'), (14, 14, 'Mineralogy', 'mineralogy'),
  (15, 15, 'Salvaging Mastery', 'salvaging-mastery'), (16, 16, 'Ancient Wisdom', 'ancient-wisdom'),
  (17, 17, 'Focus', 'focus'), (18, 18, 'Fortitude', 'fortitude'), (19, 19, 'Girls\' Talk', 'girls-talk'),
  (20, 20, 'Keen Eye', 'keen-eye'), (21, 21, 'Leaping', 'leaping'), (22, 22, 'Lockpicking', 'lockpicking'),
  (23, 23, 'Nopon Wisdom', 'nopon-wisdom'), (24, 24, 'Superstrength', 'superstrength'),
  (25, 25, 'Expeditionist', 'expeditionist'), (26, 26, 'Industry Mastery', 'industry-mastery'),
  (27, 27, 'Info Collector', 'info-collector'), (28, 28, 'Production Mastery', 'production-mastery'),
  (29, 29, 'Transport Mastery', 'transport-mastery'), (30, 36, 'Cooking', 'cooking'), (31, 55, 'Weaving', 'weaving'),
  (32, 50, 'Patissier', 'patissier'), (33, 37, 'Dumpling Pro', 'dumpling-pro'),
  (34, 47, 'Miasma Dispersal', 'miasma-dispersal'), (35, 49, 'Passionate Soul', 'passionate-soul'),
  (36, 43, 'Justice-Loving Soul', 'justice-loving-soul'), (37, 44, 'Kind Soul', 'kind-soul'),
  (38, 30, 'Assassination', 'assassination'), (39, 52, 'Prospecting', 'prospecting'),
  (40, 40, 'Fleet of Foot', 'fleet-of-foot'), (41, 48, 'One Lucky Gal', 'one-lucky-gal'),
  (42, 34, 'Chivalry', 'chivalry'), (43, 41, 'Harmony', 'harmony'),
  (44, 51, 'Phonex Linguistics', 'phonex-linguistics'), (45, 38, 'Extra-Ancient Wisdom', 'extra-ancient-wisdom'),
  (46, 45, 'Mastery of Thunder', 'mastery-of-thunder'), (47, 32, 'Birdbrain', 'birdbrain'),
  (48, 31, 'Beguiling Charms', 'beguiling-charms'), (49, 53, 'Rampage', 'rampage'),
  (50, 33, 'Cavalier Attitude', 'cavalier-attitude'), (51, 35, 'Clairvoyant Eye', 'clairvoyant-eye'),
  (52, 54, 'Titan Weapon Wisdom', 'titan-weapon-wisdom'), (53, 39, 'Eye for Beauty', 'eye-for-beauty'),
  (54, 42, 'Icecraft', 'icecraft'), (55, 46, 'Mental Arithmetic', 'mental-arithmetic');
/*!40000 ALTER TABLE `affinity_node`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battle_role`
--

DROP TABLE IF EXISTS `battle_role`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `battle_role` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_E49FC989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `battle_role`
--

LOCK TABLES `battle_role` WRITE;
/*!40000 ALTER TABLE `battle_role`
  DISABLE KEYS */;
INSERT INTO `battle_role` (`id`, `name`, `slug`) VALUES (1, 'ATK', 'atk'), (2, 'TNK', 'tnk'), (3, 'HLR', 'hlr');
/*!40000 ALTER TABLE `battle_role`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade`
--

DROP TABLE IF EXISTS `blade`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `blade` (
  `id`               INT(11)    NOT NULL,
  `user_id`          INT(11) DEFAULT NULL,
  `driver_id`        INT(11) DEFAULT NULL,
  `trust_id`         INT(11) DEFAULT NULL,
  `merc_mission_id`  INT(11) DEFAULT NULL,
  `strength`         INT(11)    NOT NULL,
  `affinity`         INT(11)    NOT NULL,
  `is_merc_leader`   TINYINT(1) NOT NULL,
  `from_template_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_217C01E8A76ED395` (`user_id`),
  KEY `IDX_217C01E8C3423909` (`driver_id`),
  KEY `IDX_217C01E8AE0FAC85` (`trust_id`),
  KEY `IDX_217C01E852594D7F` (`merc_mission_id`),
  KEY `IDX_217C01E89B953EDD` (`from_template_id`),
  CONSTRAINT `FK_217C01E852594D7F` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`),
  CONSTRAINT `FK_217C01E89B953EDD` FOREIGN KEY (`from_template_id`) REFERENCES `blade_template` (`id`),
  CONSTRAINT `FK_217C01E8A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_217C01E8AE0FAC85` FOREIGN KEY (`trust_id`) REFERENCES `trust_rank` (`id`),
  CONSTRAINT `FK_217C01E8BF396750` FOREIGN KEY (`id`) REFERENCES `blade_superclass` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_217C01E8C3423909` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `blade`
--

LOCK TABLES `blade` WRITE;
/*!40000 ALTER TABLE `blade`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `blade`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade_affinity_node`
--

DROP TABLE IF EXISTS `blade_affinity_node`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `blade_affinity_node` (
  `id`               INT(11) NOT NULL AUTO_INCREMENT,
  `blade_id`         INT(11)          DEFAULT NULL,
  `affinity_node_id` INT(11)          DEFAULT NULL,
  `level`            INT(11) NOT NULL,
  `max_level`        INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D7F9A2908118485F` (`blade_id`),
  KEY `IDX_D7F9A290F810347F` (`affinity_node_id`),
  CONSTRAINT `FK_D7F9A2908118485F` FOREIGN KEY (`blade_id`) REFERENCES `blade_superclass` (`id`),
  CONSTRAINT `FK_D7F9A290F810347F` FOREIGN KEY (`affinity_node_id`) REFERENCES `affinity_node` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 115
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `blade_affinity_node`
--

LOCK TABLES `blade_affinity_node` WRITE;
/*!40000 ALTER TABLE `blade_affinity_node`
  DISABLE KEYS */;
INSERT INTO `blade_affinity_node` (`id`, `blade_id`, `affinity_node_id`, `level`, `max_level`)
VALUES (1, 1, 4, 0, 3), (2, 1, 17, 0, 3), (3, 1, 30, 0, 3), (4, 2, 5, 0, 3), (5, 2, 17, 0, 3), (6, 2, 19, 0, 3),
  (7, 3, 7, 0, 3), (8, 3, 10, 0, 3), (9, 4, 21, 0, 3), (10, 4, 23, 0, 3), (11, 4, 24, 0, 3), (12, 5, 22, 0, 3),
  (13, 5, 18, 0, 3), (14, 5, 9, 0, 3), (15, 6, 20, 0, 3), (16, 6, 16, 0, 3), (17, 6, 12, 0, 3), (18, 7, 3, 0, 3),
  (19, 7, 22, 0, 3), (20, 7, 13, 0, 3), (21, 8, 8, 0, 3), (22, 8, 34, 0, 1), (23, 8, 22, 0, 3), (24, 9, 4, 0, 3),
  (25, 9, 20, 0, 3), (26, 9, 14, 0, 3), (27, 10, 7, 0, 3), (28, 10, 16, 0, 3), (29, 10, 21, 0, 3), (30, 11, 11, 0, 3),
  (31, 11, 21, 0, 3), (32, 11, 47, 0, 3), (33, 12, 1, 0, 3), (34, 12, 21, 0, 3), (35, 12, 38, 0, 3), (36, 13, 10, 0, 5),
  (37, 13, 2, 0, 3), (38, 13, 48, 0, 5), (39, 14, 50, 0, 5), (40, 14, 23, 0, 1), (41, 14, 16, 0, 1), (42, 14, 14, 0, 1),
  (43, 15, 1, 0, 3), (44, 15, 10, 0, 3), (45, 15, 51, 0, 3), (46, 16, 2, 0, 3), (47, 16, 13, 0, 3), (48, 16, 44, 0, 3),
  (49, 17, 3, 0, 5), (50, 17, 17, 0, 3), (51, 17, 46, 0, 5), (52, 18, 6, 0, 3), (53, 18, 16, 0, 3), (54, 18, 42, 0, 3),
  (55, 19, 8, 0, 3), (56, 19, 20, 0, 3), (57, 19, 45, 0, 5), (58, 20, 24, 0, 3), (59, 20, 15, 0, 3), (60, 20, 52, 0, 3),
  (61, 21, 20, 0, 3), (62, 21, 18, 0, 3), (63, 21, 32, 0, 3), (64, 22, 19, 0, 5), (65, 22, 3, 0, 3), (66, 22, 22, 0, 3),
  (67, 23, 12, 0, 3), (68, 23, 18, 0, 3), (69, 23, 33, 0, 5), (70, 24, 23, 0, 3), (71, 24, 15, 0, 3),
  (72, 24, 40, 0, 3), (73, 25, 1, 0, 3), (74, 25, 31, 0, 3), (75, 25, 19, 0, 3), (76, 26, 24, 0, 5), (77, 26, 2, 0, 5),
  (78, 26, 17, 0, 5), (79, 27, 3, 0, 3), (80, 27, 24, 0, 3), (81, 27, 49, 0, 5), (82, 28, 35, 0, 3), (83, 28, 36, 0, 3),
  (84, 28, 37, 0, 3), (85, 29, 8, 0, 5), (86, 29, 24, 0, 5), (87, 29, 21, 0, 5), (88, 30, 19, 0, 3), (89, 30, 7, 0, 3),
  (90, 30, 15, 0, 3), (91, 31, 6, 0, 3), (92, 31, 17, 0, 3), (93, 31, 23, 0, 3), (94, 32, 19, 0, 3), (95, 32, 22, 0, 3),
  (96, 32, 53, 0, 3), (97, 33, 39, 0, 3), (98, 33, 14, 0, 3), (99, 33, 20, 0, 3), (100, 34, 23, 0, 3),
  (101, 34, 9, 0, 3), (102, 34, 41, 0, 3), (103, 35, 12, 0, 3), (104, 35, 6, 0, 3), (105, 35, 54, 0, 3),
  (106, 36, 43, 0, 5), (107, 36, 13, 0, 3), (108, 36, 18, 0, 3), (109, 37, 5, 0, 3), (110, 37, 22, 0, 3),
  (111, 37, 55, 0, 3), (112, 38, 7, 0, 3), (113, 38, 12, 0, 3), (114, 38, 18, 0, 3);
/*!40000 ALTER TABLE `blade_affinity_node`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade_class`
--

DROP TABLE IF EXISTS `blade_class`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `blade_class` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_B86276AF989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `blade_class`
--

LOCK TABLES `blade_class` WRITE;
/*!40000 ALTER TABLE `blade_class`
  DISABLE KEYS */;
INSERT INTO `blade_class` (`id`, `name`, `slug`) VALUES (1, 'Humanoid', 'humanoid'), (2, 'Animal', 'animal');
/*!40000 ALTER TABLE `blade_class`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade_superclass`
--

DROP TABLE IF EXISTS `blade_superclass`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `blade_superclass` (
  `id`              INT(11)                                   NOT NULL                       AUTO_INCREMENT,
  `element_id`      INT(11)                                                                  DEFAULT NULL,
  `gender_id`       INT(11)                                                                  DEFAULT NULL,
  `battle_role_id`  INT(11)                                                                  DEFAULT NULL,
  `weapon_class_id` INT(11)                                                                  DEFAULT NULL,
  `is_merc`         TINYINT(1)                                NOT NULL,
  `merc_team_name`  VARCHAR(255) COLLATE `utf8mb4_unicode_ci`                                DEFAULT NULL,
  `rarity`          INT(11)                                   NOT NULL,
  `affinity_total`  INT(11)                                   NOT NULL,
  `can_be_released` TINYINT(1)                                NOT NULL,
  `name`            VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `discr`           VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_6EA9EB401F1F2A24` (`element_id`),
  KEY `IDX_6EA9EB40708A0E0` (`gender_id`),
  KEY `IDX_6EA9EB401C9C96CF` (`battle_role_id`),
  KEY `IDX_6EA9EB409B14B9D9` (`weapon_class_id`),
  CONSTRAINT `FK_6EA9EB401C9C96CF` FOREIGN KEY (`battle_role_id`) REFERENCES `battle_role` (`id`),
  CONSTRAINT `FK_6EA9EB401F1F2A24` FOREIGN KEY (`element_id`) REFERENCES `element` (`id`),
  CONSTRAINT `FK_6EA9EB40708A0E0` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  CONSTRAINT `FK_6EA9EB409B14B9D9` FOREIGN KEY (`weapon_class_id`) REFERENCES `weapon_class` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 39
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `blade_superclass`
--

LOCK TABLES `blade_superclass` WRITE;
/*!40000 ALTER TABLE `blade_superclass`
  DISABLE KEYS */;
INSERT INTO `blade_superclass` (`id`, `element_id`, `gender_id`, `battle_role_id`, `weapon_class_id`, `is_merc`, `merc_team_name`, `rarity`, `affinity_total`, `can_be_released`, `name`, `discr`)
VALUES (1, 1, 2, 1, 1, 0, NULL, 5, 44, 0, 'Pyra', 'bladetemplate'),
  (2, 7, 2, 1, 1, 0, NULL, 5, 44, 0, 'Mythra', 'bladetemplate'),
  (3, 2, 3, 3, 15, 0, NULL, 5, 44, 0, 'Dromarch', 'bladetemplate'),
  (4, 5, 2, 2, 5, 0, NULL, 5, 44, 0, 'Poppi ɑ', 'bladetemplate'),
  (5, 1, 2, 2, 11, 0, NULL, 5, 44, 0, 'Poppi QT', 'bladetemplate'),
  (6, 3, 2, 2, 16, 0, NULL, 5, 44, 0, 'Poppi QTπ', 'bladetemplate'),
  (7, 6, 2, 1, 2, 0, NULL, 5, 44, 0, 'Pandoria', 'bladetemplate'),
  (8, 4, 1, 1, 7, 1, 'Roc & the Roquettes', 5, 44, 0, 'Roc', 'bladetemplate'),
  (9, 1, 2, 2, 17, 0, NULL, 5, 44, 0, 'Brighid', 'bladetemplate'),
  (10, 2, 1, 2, 4, 1, 'Hecatonics', 5, 44, 0, 'Aegaeon', 'bladetemplate'),
  (11, 4, 2, 2, 14, 1, 'Albatrojans', 5, 44, 1, 'Finch', 'bladetemplate'),
  (12, 8, 1, 2, 4, 1, 'Banners of Flame', 5, 44, 1, 'Perceval', 'bladetemplate'),
  (13, 5, 1, 3, 3, 1, 'Florentrancers', 5, 44, 1, 'Floren', 'bladetemplate'),
  (14, 1, 1, 1, 9, 1, NULL, 5, 44, 1, 'Dagas', 'bladetemplate'),
  (15, 8, 2, 1, 8, 1, 'Shadow Puppets', 5, 44, 1, 'Azami', 'bladetemplate'),
  (16, 5, 2, 3, 10, 1, 'Dandy Lions', 5, 44, 1, 'Nim', 'bladetemplate'),
  (17, 6, 2, 2, 14, 1, NULL, 5, 44, 1, 'Electra', 'bladetemplate'),
  (18, 3, 2, 1, 12, 1, 'Ardent Lancers', 5, 44, 1, 'Perun', 'bladetemplate'),
  (19, 4, 2, 3, 10, 1, NULL, 5, 44, 1, 'Adenine', 'bladetemplate'),
  (20, 1, 2, 2, 4, 1, NULL, 5, 44, 1, 'Newt', 'bladetemplate'),
  (21, 2, 1, 1, 9, 1, 'Flying Merfolk', 5, 44, 1, 'Gorg', 'bladetemplate'),
  (22, 6, 2, 3, 10, 1, 'Breeze Shooters', 5, 44, 1, 'Kora', 'bladetemplate'),
  (23, 6, 2, 3, 3, 1, 'Ting-a-Ling Troupe', 5, 44, 1, 'Vess', 'bladetemplate'),
  (24, 4, 1, 3, 3, 1, NULL, 5, 44, 1, 'Boreas', 'bladetemplate'),
  (25, 8, 2, 1, 1, 1, 'Slayswords', 5, 44, 1, 'Vale', 'bladetemplate'),
  (26, 5, 1, 1, 12, 1, 'Gungnir Wardens', 5, 44, 1, 'Wulfric', 'bladetemplate'),
  (27, 6, 2, 1, 8, 1, 'Valkyr Legion', 5, 44, 1, 'Herald', 'bladetemplate'),
  (28, 3, 1, 2, 14, 1, NULL, 5, 44, 1, 'Godfrey', 'bladetemplate'),
  (29, 4, 2, 1, 9, 1, NULL, 5, 44, 1, 'Zenobia', 'bladetemplate'),
  (30, 2, 2, 1, 12, 1, 'Gutsy Glaives', 5, 44, 1, 'Praxis', 'bladetemplate'),
  (31, 3, 2, 2, 4, 1, NULL, 5, 44, 1, 'Theory', 'bladetemplate'),
  (32, 2, 2, 1, 8, 1, 'Royal Teas', 5, 44, 1, 'Sheba', 'bladetemplate'),
  (33, 5, 2, 1, 9, 1, NULL, 5, 44, 1, 'Agate', 'bladetemplate'),
  (34, 8, 2, 2, 14, 1, 'Arrowroot Company', 5, 44, 1, 'Kasandra', 'bladetemplate'),
  (35, 3, 2, 3, 3, 1, 'Perennial Beauties', 5, 44, 1, 'Dahlia', 'bladetemplate'),
  (36, 3, 2, 3, 10, 1, NULL, 5, 44, 1, 'Ursula', 'bladetemplate'),
  (37, 7, 2, 1, 8, 1, NULL, 5, 44, 1, 'KOS-MOS', 'bladetemplate'),
  (38, 2, 2, 3, 18, 0, NULL, 5, 44, 0, 'Nia', 'bladetemplate');
/*!40000 ALTER TABLE `blade_superclass`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade_template`
--

DROP TABLE IF EXISTS `blade_template`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `blade_template` (
  `id`   INT(11)                                   NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_13DC1542989D9B62` (`slug`),
  CONSTRAINT `FK_13DC1542BF396750` FOREIGN KEY (`id`) REFERENCES `blade_superclass` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `blade_template`
--

LOCK TABLES `blade_template` WRITE;
/*!40000 ALTER TABLE `blade_template`
  DISABLE KEYS */;
INSERT INTO `blade_template` (`id`, `slug`)
VALUES (19, 'adenine'), (10, 'aegaeon'), (33, 'agate'), (15, 'azami'), (24, 'boreas'), (9, 'brighid'), (14, 'dagas'),
  (35, 'dahlia'), (3, 'dromarch'), (17, 'electra'), (11, 'finch'), (13, 'floren'), (28, 'godfrey'), (21, 'gorg'),
  (27, 'herald'), (34, 'kasandra'), (22, 'kora'), (37, 'kos-mos'), (2, 'mythra'), (20, 'newt'), (38, 'nia'),
  (16, 'nim'), (7, 'pandoria'), (12, 'perceval'), (18, 'perun'), (4, 'poppi-ɑ'), (5, 'poppi-qt'), (6, 'poppi-qtp'),
  (30, 'praxis'), (1, 'pyra'), (8, 'roc'), (32, 'sheba'), (31, 'theory'), (36, 'ursula'), (25, 'vale'), (23, 'vess'),
  (26, 'wulfric'), (29, 'zenobia');
/*!40000 ALTER TABLE `blade_template`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `driver` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_11667CD9989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver`
  DISABLE KEYS */;
INSERT INTO `driver` (`id`, `name`, `slug`)
VALUES (1, 'Rex', 'rex'), (2, 'Nia', 'nia'), (3, 'Tora', 'tora'), (4, 'Mòrag', 'morag'), (5, 'Zeke', 'zeke');
/*!40000 ALTER TABLE `driver`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `element`
--

DROP TABLE IF EXISTS `element`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `element` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_41405E39989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 9
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `element`
--

LOCK TABLES `element` WRITE;
/*!40000 ALTER TABLE `element`
  DISABLE KEYS */;
INSERT INTO `element` (`id`, `name`, `slug`)
VALUES (1, 'Fire', 'fire'), (2, 'Water', 'water'), (3, 'Ice', 'ice'), (4, 'Wind', 'wind'), (5, 'Earth', 'earth'),
  (6, 'Electric', 'electric'), (7, 'Light', 'light'), (8, 'Dark', 'dark');
/*!40000 ALTER TABLE `element`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `gender` (
  `id`       INT(11)                                   NOT NULL AUTO_INCREMENT,
  `class_id` INT(11)                                            DEFAULT NULL,
  `sort`     INT(11)                                   NOT NULL,
  `name`     VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug`     VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_C7470A42989D9B62` (`slug`),
  KEY `IDX_C7470A42EA000B10` (`class_id`),
  CONSTRAINT `FK_C7470A42EA000B10` FOREIGN KEY (`class_id`) REFERENCES `blade_class` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender`
  DISABLE KEYS */;
INSERT INTO `gender` (`id`, `class_id`, `sort`, `name`, `slug`)
VALUES (1, 1, 1, 'Male', 'male'), (2, 1, 2, 'Female', 'female'), (3, 2, 3, 'Animal', 'animal');
/*!40000 ALTER TABLE `gender`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission`
--

DROP TABLE IF EXISTS `merc_mission`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission` (
  `id`          INT(11)                                   NOT NULL AUTO_INCREMENT,
  `nation_id`   INT(11)                                            DEFAULT NULL,
  `duration`    TIME                                      NOT NULL,
  `repeatable`  TINYINT(1)                                NOT NULL,
  `name`        VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug`        VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `merc_points` INT(11)                                            DEFAULT NULL,
  `experience`  INT(11)                                            DEFAULT NULL,
  `gold`        INT(11)                                            DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_FAF4B51F989D9B62` (`slug`),
  KEY `IDX_FAF4B51FAE3899` (`nation_id`),
  CONSTRAINT `FK_FAF4B51FAE3899` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 114
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission`
--

LOCK TABLES `merc_mission` WRITE;
/*!40000 ALTER TABLE `merc_mission`
  DISABLE KEYS */;
INSERT INTO `merc_mission` (`id`, `nation_id`, `duration`, `repeatable`, `name`, `slug`, `merc_points`, `experience`, `gold`)
VALUES (1, 1, '00:30:00', 1, 'Unloading of Goods', 'unloading-of-goods', 40, 240, 675),
  (2, 1, '00:30:00', 1, 'Crane Repairs', 'crane-repairs', 40, 225, 720),
  (3, 1, '00:30:00', 1, 'Salvaging Security', 'salvaging-security', 40, 285, 600),
  (4, 1, '00:40:00', 1, 'Nopon Veggie Stir-Fry', 'nopon-veggie-stir-fry', 50, 240, 705),
  (5, 1, '00:40:00', 1, 'Canteen Job', 'canteen-job', 50, 255, 645),
  (6, 1, '00:50:00', 1, 'Port Pest Problem', 'port-pest-problem', 65, 240, 675),
  (7, 1, '00:50:00', 1, 'Grounded Ship Rescue', 'grounded-ship-rescue', 65, 240, 690),
  (8, 1, '00:50:00', 1, 'Ship Snooping', 'ship-snooping', 65, 315, 495),
  (9, 1, '00:50:00', 1, 'Avoiding Heavy Losses', 'avoiding-heavy-losses', 65, 270, 630),
  (10, 1, '01:00:00', 1, 'Money, Money, Money', 'money-money-money', 80, 270, 750),
  (11, 1, '01:00:00', 1, 'Flying Monsters', 'flying-monsters', 80, 300, 660),
  (12, 1, '01:20:00', 1, 'Big Catch Opportunity', 'big-catch-opportunity', 105, 300, 690),
  (13, 1, '01:20:00', 1, 'Crane Protection', 'crane-protection', 105, 330, 615),
  (14, 1, '01:40:00', 1, 'Nopon News', 'nopon-news', 130, 285, 720),
  (15, 1, '01:40:00', 1, 'Deck Duty', 'deck-duty', 130, 270, 750),
  (16, 1, '01:40:00', 1, 'Sunken Ship Survey', 'sunken-ship-survey', 130, 285, 855),
  (17, 2, '00:30:00', 1, 'Woodworking', 'woodworking', 40, 285, 600),
  (18, 2, '00:30:00', 1, 'Modeling Work', 'modeling-work', 40, 270, 615),
  (19, 2, '00:30:00', 1, 'Landslide Prevention', 'landslide-prevention', 40, 300, 555),
  (20, 2, '00:40:00', 1, 'Harvest Help', 'harvest-help', 50, 240, 675),
  (21, 2, '00:40:00', 1, 'Field Devastation', 'field-devastation', 50, 285, 585),
  (22, 2, '00:50:00', 1, 'Mannam Juice Delivery', 'mannam-juice-delivery', 65, 270, 600),
  (23, 2, '00:50:00', 1, 'Wood Gathering', 'wood-gathering', 65, 285, 585),
  (24, 2, '00:50:00', 1, 'Armu Retrieval', 'armu-retrieval', 65, 300, 555),
  (25, 2, '00:50:00', 1, 'Test of Courage', 'test-of-courage', 65, 255, 660),
  (26, 2, '01:00:00', 1, 'Forest Fire Prevention', 'forest-fire-prevention', 80, 360, 540),
  (27, 2, '01:00:00', 1, 'Stranded Merchant', 'stranded-merchant', 80, 360, 540),
  (28, 2, '01:20:00', 1, 'Gormott Secret Area', 'gormott-secret-area', 105, 315, 630),
  (29, 2, '01:20:00', 1, 'Protect the Holy Place', 'protect-the-holy-place', 105, 360, 540),
  (30, 2, '01:40:00', 1, 'Mock Maneuvers', 'mock-maneuvers', 130, 240, 795),
  (31, 2, '01:40:00', 1, 'Arrest Warrant', 'arrest-warrant', 130, 270, 735),
  (32, 2, '02:00:00', 1, 'Wine Delivery', 'wine-delivery', 160, 645, 1530),
  (33, 2, '02:00:00', 1, 'Phantom Fruit', 'phantom-fruit', 160, 705, 1425),
  (34, 2, '02:00:00', 1, 'Weird Water', 'weird-water', 160, 795, 1230),
  (35, 2, '00:30:00', 1, 'Energy for Remodeling', 'energy-for-remodeling', 100, 405, 1050),
  (36, 2, '00:30:00', 1, 'Manufacture Help', 'manufacture-help', 100, 0, 0),
  (37, 3, '00:30:00', 1, 'Flotsam Inspection', 'flotsam-inspection', 40, 255, 630),
  (38, 3, '00:30:00', 1, 'Lost and Found', 'lost-and-found', 40, 270, 630),
  (39, 3, '00:40:00', 1, 'Beautiful Pearl', 'beautiful-pearl', 50, 315, 525),
  (40, 3, '00:40:00', 1, 'Igna Investigation', 'igna-investigation', 50, 285, 570),
  (41, 3, '00:50:00', 1, 'Rogue Miners', 'rogue-miners', 65, 300, 555),
  (42, 3, '00:50:00', 1, 'Warehouse Work', 'warehouse-work', 65, 285, 720),
  (43, 3, '00:50:00', 1, 'King of the Spring', 'king-of-the-spring', 65, 270, 720),
  (44, 3, '00:50:00', 1, 'Daily Training', 'daily-training', 65, 345, 555),
  (45, 3, '01:00:00', 1, 'Giant Crab Attack', 'giant-crab-attack', 80, 690, 1440),
  (46, 3, '01:00:00', 1, 'Goods Transport', 'goods-transport', 80, 255, 660),
  (47, 3, '01:20:00', 1, 'Art Supplies', 'art-supplies', 105, 255, 630),
  (48, 3, '01:20:00', 1, 'Water Quality Check', 'water-quality-check', 105, 285, 585),
  (49, 3, '01:40:00', 1, 'Wonderful Stage', 'wonderful-stage', 130, 255, 645),
  (50, 3, '01:40:00', 1, 'Road Repairs', 'road-repairs', 130, 285, 720),
  (51, 3, '02:00:00', 1, 'Rare Goods Repairs', 'rare-goods-repairs', 160, 360, 540),
  (52, 3, '02:00:00', 1, 'Fort Rescue', 'fort-rescue', 160, 390, 615),
  (53, 4, '00:30:00', 1, 'Cooking Spices', 'cooking-spices', 40, 315, 510),
  (54, 4, '00:30:00', 1, 'Lunch of Love', 'lunch-of-love', 40, 285, 600),
  (55, 4, '00:30:00', 1, 'Titan Weaponry', 'titan-weaponry', 40, 315, 510),
  (56, 4, '00:40:00', 1, 'VIP Escort', 'vip-escort', 50, 285, 600),
  (57, 4, '00:40:00', 1, 'Pest Extermination', 'pest-extermination', 50, 315, 495),
  (58, 4, '00:50:00', 1, 'Gondola Inspection', 'gondola-inspection', 65, 240, 690),
  (59, 4, '00:50:00', 1, 'Nopon Letter', 'nopon-letter', 65, 255, 645),
  (60, 4, '00:50:00', 1, 'Antique Judgment', 'antique-judgment', 65, 285, 570),
  (61, 4, '00:50:00', 1, 'Burned Wanted Posters', 'burned-wanted-posters', 65, 270, 615),
  (62, 4, '01:00:00', 1, 'Mining Machine', 'mining-machine', 80, 330, 600),
  (63, 4, '01:00:00', 1, 'Titan Research', 'titan-research', 80, 330, 600),
  (64, 4, '01:20:00', 1, 'Longing for Mòrag', 'longing-for-morag', 105, 345, 570),
  (65, 4, '01:20:00', 1, 'Illegal Dumper', 'illegal-dumper', 105, 640, 1470),
  (66, 4, '01:40:00', 1, 'Acquiring Rare Parts', 'acquiring-rare-parts', 130, 240, 795),
  (67, 4, '01:40:00', 1, 'Street Patrols', 'street-patrols', 130, 330, 615),
  (68, 4, '01:40:00', 1, 'Scientific Development', 'scientific-development', 130, 270, 735),
  (69, 4, '02:00:00', 1, 'Hot Nopon', 'hot-nopon', 160, 615, 1620),
  (70, 4, '02:00:00', 1, 'Smuggler Arrest', 'smuggler-arrest', 160, 570, 1710),
  (71, 5, '00:30:00', 1, 'Graveside Flowers', 'graveside-flowers', 40, 270, 720),
  (72, 5, '00:30:00', 1, 'Heavy Angling', 'heavy-angling', 40, 255, 765),
  (73, 5, '00:30:00', 1, 'Lost Property', 'lost-property', 40, 300, 690),
  (74, 5, '00:30:00', 1, 'Lost Property', 'lost-property-1', 40, 300, 690),
  (75, 5, '00:40:00', 1, 'Field Pests', 'field-pests', 50, 255, 780),
  (76, 5, '00:40:00', 1, 'Taminbi', 'taminbi', 50, 255, 780),
  (77, 5, '00:50:00', 1, 'Insect Professor', 'insect-professor', 65, 330, 600),
  (78, 5, '00:50:00', 1, 'Parisax Extermination', 'parisax-extermination', 65, 360, 555),
  (79, 5, '00:50:00', 1, 'Pending Payout', 'pending-payout', 65, 300, 690),
  (80, 5, '00:50:00', 1, 'Shellfish Savior', 'shellfish-savior', 65, 360, 555),
  (81, 5, '01:00:00', 1, 'Vessel Scrapping', 'vessel-scrapping', 80, 405, 600),
  (82, 5, '01:00:00', 1, 'Memory Bracelet', 'memory-bracelet', 80, 300, 825),
  (83, 5, '01:20:00', 1, 'Rex\'s Condition', 'rexs-condition', 105, 315, 795),
  (84, 5, '01:20:00', 1, 'Research Results', 'research-results', 105, 300, 840),
  (85, 5, '01:40:00', 1, 'Suspicious Ship', 'suspicious-ship', 130, 375, 645),
  (86, 5, '01:40:00', 1, 'Dringworm Hunting', 'dringworm-hunting', 130, 270, 870),
  (87, 5, '01:40:00', 1, 'Yashima Festival', 'yashima-festival', 130, 405, 600),
  (88, 7, '00:30:00', 1, 'Ether Furnace Checks', 'ether-furnace-checks', 40, 345, 705),
  (89, 7, '00:30:00', 1, 'Children\'s Snowsuit', 'childrens-snowsuit', 40, 300, 810),
  (90, 7, '00:30:00', 1, 'Snow Removal', 'snow-removal', 40, 375, 660),
  (91, 7, '00:40:00', 1, 'Exiting Tantal', 'exiting-tantal', 50, 375, 645),
  (92, 7, '00:40:00', 1, 'Warming Stralu', 'warming-stralu', 50, 390, 630),
  (93, 7, '00:50:00', 1, 'Snow Flower', 'snow-flower', 65, 360, 855),
  (94, 7, '00:50:00', 1, 'Carnivorous Beast', 'carnivorous-beast', 65, 315, 945),
  (95, 7, '00:50:00', 1, 'New Book', 'new-book', 65, 420, 735),
  (96, 7, '00:50:00', 1, 'Blizzard Zone', 'blizzard-zone', 65, 405, 750),
  (97, 7, '01:00:00', 1, 'Cold-Proof Crops', 'cold-proof-crops', 80, 375, 810),
  (98, 7, '01:00:00', 1, 'Military Training', 'military-training', 80, 405, 735),
  (99, 7, '01:20:00', 1, 'The Black Market', 'the-black-market', 105, 450, 660),
  (100, 7, '01:20:00', 1, 'Dandes Salt Cave', 'dandes-salt-cave', 105, 375, 795),
  (101, 7, '01:40:00', 1, 'Snow Survey', 'snow-survey', 130, 375, 810),
  (102, 7, '01:40:00', 1, 'Shaking Icicles', 'shaking-icicles', 130, 375, 825),
  (103, 7, '01:40:00', 1, 'Confidential Documents', 'confidential-documents', 130, 345, 870),
  (104, 1, '02:00:00', 1, 'Big Ship Escort', 'big-ship-escort', 160, 765, 1275),
  (105, 1, '02:00:00', 1, 'Cooking Up a Feast', 'cooking-up-a-feast', 160, 675, 1470),
  (106, 1, '02:00:00', 1, 'Lifesaving', 'lifesaving', 160, 795, 1215),
  (107, 7, '02:00:00', 1, 'Book Writing', 'book-writing', 160, 690, 2055),
  (108, 7, '02:00:00', 1, 'World in a Book', 'world-in-a-book', 160, 840, 1740),
  (109, 7, '02:00:00', 1, 'Mysterious Lifeform', 'mysterious-lifeform', 160, 915, 1575),
  (110, 7, '02:00:00', 1, 'Ice Hunter', 'ice-hunter', 160, 885, 1635),
  (111, 3, '02:00:00', 1, 'Source Security', 'source-security', 160, 630, 1560),
  (112, 5, '02:00:00', 1, 'Energy investigation', 'energy-investigation', 160, 630, 1875),
  (113, 5, '02:00:00', 1, 'Elpys Investigation', 'elpys-investigation', 160, 855, 1395);
/*!40000 ALTER TABLE `merc_mission`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_affinity_node`
--

DROP TABLE IF EXISTS `merc_mission_affinity_node`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_affinity_node` (
  `merc_mission_id`  INT(11) NOT NULL,
  `affinity_node_id` INT(11) NOT NULL,
  PRIMARY KEY (`merc_mission_id`, `affinity_node_id`),
  KEY `IDX_F63780B852594D7F` (`merc_mission_id`),
  KEY `IDX_F63780B8F810347F` (`affinity_node_id`),
  CONSTRAINT `FK_F63780B852594D7F` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_F63780B8F810347F` FOREIGN KEY (`affinity_node_id`) REFERENCES `affinity_node` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_affinity_node`
--

LOCK TABLES `merc_mission_affinity_node` WRITE;
/*!40000 ALTER TABLE `merc_mission_affinity_node`
  DISABLE KEYS */;
INSERT INTO `merc_mission_affinity_node` (`merc_mission_id`, `affinity_node_id`)
VALUES (1, 29), (1, 40), (2, 3), (2, 26), (3, 7), (3, 15), (3, 25), (4, 23), (4, 28), (5, 17), (5, 19), (5, 27),
  (6, 11), (6, 25), (6, 26), (7, 7), (7, 18), (7, 26), (8, 22), (8, 23), (9, 27), (9, 29), (10, 10), (10, 27), (10, 29),
  (11, 8), (11, 21), (11, 41), (12, 13), (12, 15), (13, 7), (13, 13), (13, 26), (14, 16), (14, 19), (14, 27), (15, 6),
  (15, 51), (16, 15), (16, 22), (16, 45), (17, 12), (17, 24), (18, 12), (18, 18), (18, 41), (19, 2), (19, 12), (20, 9),
  (20, 28), (20, 29), (21, 3), (21, 9), (22, 11), (22, 12), (23, 6), (23, 12), (23, 29), (24, 2), (24, 24), (24, 29),
  (25, 1), (25, 41), (25, 44), (26, 7), (26, 12), (26, 35), (27, 10), (27, 21), (27, 36), (28, 12), (28, 16), (29, 16),
  (29, 22), (29, 25), (30, 3), (30, 42), (30, 52), (31, 18), (31, 27), (31, 29), (32, 3), (32, 6), (32, 28), (33, 10),
  (33, 11), (33, 41), (34, 10), (34, 13), (34, 20), (35, 14), (35, 26), (35, 55), (36, 7), (36, 8), (36, 10), (37, 14),
  (37, 17), (37, 20), (38, 7), (38, 25), (38, 27), (39, 19), (39, 27), (39, 28), (40, 1), (40, 20), (41, 1), (41, 7),
  (41, 18), (42, 9), (42, 29), (42, 55), (43, 7), (43, 13), (43, 18), (44, 7), (44, 42), (45, 3), (45, 25), (46, 29),
  (46, 55), (47, 14), (47, 20), (47, 28), (48, 7), (48, 20), (48, 27), (49, 28), (49, 48), (50, 8), (50, 14), (50, 26),
  (51, 22), (51, 26), (51, 46), (52, 6), (52, 18), (52, 40), (53, 9), (53, 10), (53, 29), (54, 14), (54, 21), (54, 25),
  (55, 9), (55, 11), (55, 52), (56, 3), (56, 18), (57, 6), (57, 9), (58, 17), (58, 21), (58, 26), (60, 16), (60, 17),
  (60, 20), (61, 20), (61, 27), (61, 36), (62, 14), (62, 26), (62, 29), (63, 2), (63, 4), (63, 44), (64, 1), (64, 4),
  (64, 7), (65, 3), (65, 26), (65, 27), (66, 15), (66, 18), (66, 26), (67, 1), (67, 7), (67, 41), (68, 2), (68, 11),
  (68, 12), (69, 4), (69, 6), (69, 47), (70, 1), (70, 18), (70, 27), (71, 10), (71, 37), (72, 13), (72, 46), (73, 17),
  (73, 27), (73, 37), (74, 17), (74, 27), (74, 37), (75, 9), (75, 11), (76, 9), (76, 18), (76, 27), (77, 12), (77, 27),
  (78, 3), (78, 6), (79, 17), (79, 22), (79, 26), (80, 14), (80, 28), (81, 17), (81, 26), (81, 29), (82, 8), (82, 21),
  (82, 47), (83, 19), (83, 25), (83, 27), (84, 3), (84, 13), (84, 29), (85, 15), (85, 22), (85, 27), (86, 3), (86, 11),
  (86, 17), (88, 17), (88, 26), (88, 45), (89, 1), (89, 6), (89, 28), (90, 4), (90, 6), (91, 23), (91, 25), (92, 1),
  (92, 7), (93, 10), (93, 20), (93, 54), (94, 1), (94, 25), (95, 11), (95, 14), (95, 16), (96, 1), (96, 6), (96, 14),
  (97, 2), (97, 9), (97, 10), (98, 3), (98, 18), (98, 42), (99, 18), (99, 20), (99, 22), (100, 2), (100, 4), (100, 14),
  (101, 6), (101, 14), (101, 20), (102, 16), (102, 24), (103, 18), (103, 27), (103, 51), (104, 26), (104, 46),
  (105, 23), (105, 33), (106, 22), (106, 26), (106, 27), (107, 1), (107, 6), (107, 19), (108, 19), (108, 20), (108, 27),
  (109, 7), (109, 16), (109, 25), (110, 2), (110, 8), (110, 35), (111, 3), (111, 7), (111, 25), (112, 5), (112, 28),
  (112, 46), (113, 1), (113, 6), (113, 27);
/*!40000 ALTER TABLE `merc_mission_affinity_node`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_merc_mission_prerequisite`
--

DROP TABLE IF EXISTS `merc_mission_merc_mission_prerequisite`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_merc_mission_prerequisite` (
  `merc_mission_id`              INT(11) NOT NULL,
  `merc_mission_prerequisite_id` INT(11) NOT NULL,
  PRIMARY KEY (`merc_mission_id`, `merc_mission_prerequisite_id`),
  KEY `IDX_A465E1D252594D7F` (`merc_mission_id`),
  KEY `IDX_A465E1D2D3AA45CB` (`merc_mission_prerequisite_id`),
  CONSTRAINT `FK_A465E1D252594D7F` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_A465E1D2D3AA45CB` FOREIGN KEY (`merc_mission_prerequisite_id`) REFERENCES `merc_mission_prerequisite` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_merc_mission_prerequisite`
--

LOCK TABLES `merc_mission_merc_mission_prerequisite` WRITE;
/*!40000 ALTER TABLE `merc_mission_merc_mission_prerequisite`
  DISABLE KEYS */;
INSERT INTO `merc_mission_merc_mission_prerequisite` (`merc_mission_id`, `merc_mission_prerequisite_id`)
VALUES (104, 5), (105, 5), (106, 5), (107, 25), (108, 25), (109, 25), (110, 25), (111, 15), (112, 35);
/*!40000 ALTER TABLE `merc_mission_merc_mission_prerequisite`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_merc_mission_requirement`
--

DROP TABLE IF EXISTS `merc_mission_merc_mission_requirement`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_merc_mission_requirement` (
  `merc_mission_id`             INT(11) NOT NULL,
  `merc_mission_requirement_id` INT(11) NOT NULL,
  PRIMARY KEY (`merc_mission_id`, `merc_mission_requirement_id`),
  KEY `IDX_24E4A71B52594D7F` (`merc_mission_id`),
  KEY `IDX_24E4A71B6F5F9E61` (`merc_mission_requirement_id`),
  CONSTRAINT `FK_24E4A71B52594D7F` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_24E4A71B6F5F9E61` FOREIGN KEY (`merc_mission_requirement_id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_merc_mission_requirement`
--

LOCK TABLES `merc_mission_merc_mission_requirement` WRITE;
/*!40000 ALTER TABLE `merc_mission_merc_mission_requirement`
  DISABLE KEYS */;
INSERT INTO `merc_mission_merc_mission_requirement` (`merc_mission_id`, `merc_mission_requirement_id`)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (9, 10), (10, 11), (10, 12), (11, 13),
  (11, 14), (12, 15), (12, 16), (13, 17), (13, 18), (14, 19), (14, 20), (15, 21), (15, 22), (16, 23), (16, 24),
  (17, 25), (18, 26), (19, 27), (20, 28), (21, 29), (22, 30), (22, 31), (23, 32), (24, 33), (24, 34), (25, 35),
  (26, 36), (26, 37), (27, 38), (28, 39), (29, 40), (30, 41), (30, 42), (31, 43), (31, 44), (32, 45), (32, 46),
  (33, 47), (33, 48), (33, 49), (34, 50), (34, 51), (34, 52), (35, 53), (35, 54), (35, 55), (36, 56), (37, 57),
  (38, 58), (39, 59), (40, 60), (41, 61), (41, 62), (42, 63), (42, 64), (43, 65), (43, 66), (44, 67), (44, 68),
  (45, 69), (45, 70), (45, 71), (46, 72), (47, 73), (48, 74), (49, 75), (49, 76), (50, 77), (50, 78), (51, 79),
  (51, 80), (52, 81), (52, 82), (52, 83), (53, 84), (54, 85), (55, 86), (56, 87), (57, 88), (58, 89), (59, 90),
  (59, 91), (60, 92), (61, 93), (62, 94), (62, 95), (63, 96), (63, 97), (64, 98), (64, 99), (65, 100), (65, 101),
  (66, 102), (66, 103), (67, 104), (67, 105), (68, 106), (68, 107), (69, 108), (69, 109), (69, 110), (70, 111),
  (70, 112), (71, 113), (72, 114), (73, 115), (74, 116), (75, 117), (76, 118), (77, 119), (77, 120), (78, 121),
  (79, 122), (79, 123), (80, 124), (80, 125), (81, 126), (81, 127), (82, 128), (82, 129), (83, 130), (83, 131),
  (84, 132), (84, 133), (85, 134), (86, 135), (86, 136), (87, 137), (87, 138), (88, 139), (89, 140), (90, 141),
  (91, 142), (92, 143), (93, 144), (93, 145), (94, 146), (95, 147), (95, 148), (96, 149), (97, 150), (97, 151),
  (98, 152), (98, 153), (99, 154), (99, 155), (100, 156), (100, 157), (101, 158), (101, 159), (102, 160), (102, 161),
  (103, 162), (103, 163), (104, 164), (104, 165), (105, 166), (105, 167), (106, 168), (106, 169), (106, 170),
  (107, 171), (107, 172), (107, 173), (108, 174), (108, 175), (108, 176), (109, 177), (109, 178), (110, 179),
  (110, 180), (110, 181), (111, 182), (111, 183), (111, 184), (112, 185), (112, 186), (113, 187), (113, 188);
/*!40000 ALTER TABLE `merc_mission_merc_mission_requirement`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_prerequisite`
--

DROP TABLE IF EXISTS `merc_mission_prerequisite`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_prerequisite` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `sort` INT(11)                                   NOT NULL,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_5E819534989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 36
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_prerequisite`
--

LOCK TABLES `merc_mission_prerequisite` WRITE;
/*!40000 ALTER TABLE `merc_mission_prerequisite`
  DISABLE KEYS */;
INSERT INTO `merc_mission_prerequisite` (`id`, `sort`, `name`, `slug`)
VALUES (1, 1, 'Argentum Dev Level 1', 'argentum-dev-level-1'), (2, 2, 'Argentum Dev Level 2', 'argentum-dev-level-2'),
  (3, 3, 'Argentum Dev Level 3', 'argentum-dev-level-3'), (4, 4, 'Argentum Dev Level 4', 'argentum-dev-level-4'),
  (5, 5, 'Argentum Dev Level 5', 'argentum-dev-level-5'), (6, 6, 'Gormott Dev Level 1', 'gormott-dev-level-1'),
  (7, 7, 'Gormott Dev Level 2', 'gormott-dev-level-2'), (8, 8, 'Gormott Dev Level 3', 'gormott-dev-level-3'),
  (9, 9, 'Gormott Dev Level 4', 'gormott-dev-level-4'), (10, 10, 'Gormott Dev Level 5', 'gormott-dev-level-5'),
  (11, 11, 'Uraya Dev Level 1', 'uraya-dev-level-1'), (12, 12, 'Uraya Dev Level 2', 'uraya-dev-level-2'),
  (13, 13, 'Uraya Dev Level 3', 'uraya-dev-level-3'), (14, 14, 'Uraya Dev Level 4', 'uraya-dev-level-4'),
  (15, 15, 'Uraya Dev Level 5', 'uraya-dev-level-5'), (16, 16, 'Mor Ardain Dev Level 1', 'mor-ardain-dev-level-1'),
  (17, 17, 'Mor Ardain Dev Level 2', 'mor-ardain-dev-level-2'),
  (18, 18, 'Mor Ardain Dev Level 3', 'mor-ardain-dev-level-3'),
  (19, 19, 'Mor Ardain Dev Level 4', 'mor-ardain-dev-level-4'),
  (20, 20, 'Mor Ardain Dev Level 5', 'mor-ardain-dev-level-5'), (21, 21, 'Tantal Dev Level 1', 'tantal-dev-level-1'),
  (22, 22, 'Tantal Dev Level 2', 'tantal-dev-level-2'), (23, 23, 'Tantal Dev Level 3', 'tantal-dev-level-3'),
  (24, 24, 'Tantal Dev Level 4', 'tantal-dev-level-4'), (25, 25, 'Tantal Dev Level 5', 'tantal-dev-level-5'),
  (26, 26, 'Indol Dev Level 1', 'indol-dev-level-1'), (27, 27, 'Indol Dev Level 2', 'indol-dev-level-2'),
  (28, 28, 'Indol Dev Level 3', 'indol-dev-level-3'), (29, 29, 'Indol Dev Level 4', 'indol-dev-level-4'),
  (30, 30, 'Indol Dev Level 5', 'indol-dev-level-5'), (31, 31, 'Leftheria Dev Level 1', 'leftheria-dev-level-1'),
  (32, 32, 'Leftheria Dev Level 2', 'leftheria-dev-level-2'),
  (33, 33, 'Leftheria Dev Level 3', 'leftheria-dev-level-3'),
  (34, 34, 'Leftheria Dev Level 4', 'leftheria-dev-level-4'),
  (35, 35, 'Leftheria Dev Level 5', 'leftheria-dev-level-5');
/*!40000 ALTER TABLE `merc_mission_prerequisite`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement`
--

DROP TABLE IF EXISTS `merc_mission_requirement`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement` (
  `id`    INT(11)                                   NOT NULL AUTO_INCREMENT,
  `count` INT(11)                                   NOT NULL,
  `discr` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 189
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement`
--

LOCK TABLES `merc_mission_requirement` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement` (`id`, `count`, `discr`)
VALUES (1, 1, 'mercmissionrequirementclass'), (2, 2, 'mercmissionrequirementclass'),
  (3, 1, 'mercmissionrequirementweaponclass'), (4, 1, 'mercmissionrequirementelement'),
  (5, 2, 'mercmissionrequirementgender'), (6, 2, 'mercmissionrequirementstrength'),
  (7, 2, 'mercmissionrequirementweaponclass'), (8, 2, 'mercmissionrequirementclass'),
  (9, 1, 'mercmissionrequirementclass'), (10, 1, 'mercmissionrequirementclass'),
  (11, 2, 'mercmissionrequirementelement'), (12, 1, 'mercmissionrequirementclass'),
  (13, 2, 'mercmissionrequirementstrength'), (14, 2, 'mercmissionrequirementelement'),
  (15, 3, 'mercmissionrequirementgender'), (16, 1, 'mercmissionrequirementelement'),
  (17, 2, 'mercmissionrequirementelement'), (18, 1, 'mercmissionrequirementelement'),
  (19, 2, 'mercmissionrequirementgender'), (20, 2, 'mercmissionrequirementelement'),
  (21, 1, 'mercmissionrequirementweaponclass'), (22, 3, 'mercmissionrequirementstrength'),
  (23, 2, 'mercmissionrequirementstrength'), (24, 2, 'mercmissionrequirementelement'),
  (25, 1, 'mercmissionrequirementgender'), (26, 1, 'mercmissionrequirementelement'),
  (27, 2, 'mercmissionrequirementclass'), (28, 1, 'mercmissionrequirementelement'),
  (29, 1, 'mercmissionrequirementweaponclass'), (30, 1, 'mercmissionrequirementstrength'),
  (31, 1, 'mercmissionrequirementclass'), (32, 2, 'mercmissionrequirementelement'),
  (33, 2, 'mercmissionrequirementweaponclass'), (34, 1, 'mercmissionrequirementclass'),
  (35, 2, 'mercmissionrequirementclass'), (36, 3, 'mercmissionrequirementelement'),
  (37, 2, 'mercmissionrequirementclass'), (38, 3, 'mercmissionrequirementweaponclass'),
  (39, 3, 'mercmissionrequirementstrength'), (40, 3, 'mercmissionrequirementweaponclass'),
  (41, 2, 'mercmissionrequirementstrength'), (42, 3, 'mercmissionrequirementelement'),
  (43, 3, 'mercmissionrequirementweaponclass'), (44, 3, 'mercmissionrequirementgender'),
  (45, 3, 'mercmissionrequirementweaponclass'), (46, 3, 'mercmissionrequirementstrength'),
  (47, 1, 'mercmissionrequirementfieldskill'), (48, 2, 'mercmissionrequirementelement'),
  (49, 2, 'mercmissionrequirementelement'), (50, 2, 'mercmissionrequirementelement'),
  (51, 2, 'mercmissionrequirementelement'), (52, 2, 'mercmissionrequirementelement'),
  (53, 2, 'mercmissionrequirementfieldskill'), (54, 3, 'mercmissionrequirementclass'),
  (55, 2, 'mercmissionrequirementclass'), (56, 3, 'mercmissionrequirementfieldskill'),
  (57, 1, 'mercmissionrequirementstrength'), (58, 1, 'mercmissionrequirementclass'),
  (59, 2, 'mercmissionrequirementgender'), (60, 2, 'mercmissionrequirementstrength'),
  (61, 2, 'mercmissionrequirementweaponclass'), (62, 1, 'mercmissionrequirementclass'),
  (63, 2, 'mercmissionrequirementgender'), (64, 2, 'mercmissionrequirementelement'),
  (65, 2, 'mercmissionrequirementelement'), (66, 2, 'mercmissionrequirementclass'),
  (67, 2, 'mercmissionrequirementweaponclass'), (68, 2, 'mercmissionrequirementweaponclass'),
  (69, 1, 'mercmissionrequirementweaponclass'), (70, 1, 'mercmissionrequirementweaponclass'),
  (71, 3, 'mercmissionrequirementstrength'), (72, 2, 'mercmissionrequirementgender'),
  (73, 1, 'mercmissionrequirementclass'), (74, 2, 'mercmissionrequirementelement'),
  (75, 2, 'mercmissionrequirementgender'), (76, 1, 'mercmissionrequirementelement'),
  (77, 3, 'mercmissionrequirementgender'), (78, 2, 'mercmissionrequirementelement'),
  (79, 2, 'mercmissionrequirementelement'), (80, 3, 'mercmissionrequirementclass'),
  (81, 2, 'mercmissionrequirementweaponclass'), (82, 2, 'mercmissionrequirementstrength'),
  (83, 2, 'mercmissionrequirementelement'), (84, 1, 'mercmissionrequirementstrength'),
  (85, 2, 'mercmissionrequirementstrength'), (86, 2, 'mercmissionrequirementelement'),
  (87, 2, 'mercmissionrequirementgender'), (88, 2, 'mercmissionrequirementstrength'),
  (89, 2, 'mercmissionrequirementclass'), (90, 1, 'mercmissionrequirementelement'),
  (91, 1, 'mercmissionrequirementclass'), (92, 2, 'mercmissionrequirementclass'),
  (93, 2, 'mercmissionrequirementclass'), (94, 3, 'mercmissionrequirementgender'),
  (95, 2, 'mercmissionrequirementclass'), (96, 3, 'mercmissionrequirementstrength'),
  (97, 1, 'mercmissionrequirementclass'), (98, 2, 'mercmissionrequirementgender'),
  (99, 2, 'mercmissionrequirementelement'), (100, 2, 'mercmissionrequirementweaponclass'),
  (101, 3, 'mercmissionrequirementstrength'), (102, 3, 'mercmissionrequirementstrength'),
  (103, 2, 'mercmissionrequirementgender'), (104, 2, 'mercmissionrequirementstrength'),
  (105, 3, 'mercmissionrequirementclass'), (106, 2, 'mercmissionrequirementelement'),
  (107, 3, 'mercmissionrequirementclass'), (108, 3, 'mercmissionrequirementstrength'),
  (109, 1, 'mercmissionrequirementelement'), (110, 1, 'mercmissionrequirementelement'),
  (111, 3, 'mercmissionrequirementweaponclass'), (112, 3, 'mercmissionrequirementstrength'),
  (113, 1, 'mercmissionrequirementelement'), (114, 1, 'mercmissionrequirementelement'),
  (115, 2, 'mercmissionrequirementclass'), (116, 2, 'mercmissionrequirementclass'),
  (117, 1, 'mercmissionrequirementweaponclass'), (118, 2, 'mercmissionrequirementclass'),
  (119, 1, 'mercmissionrequirementelement'), (120, 1, 'mercmissionrequirementclass'),
  (121, 2, 'mercmissionrequirementstrength'), (122, 1, 'mercmissionrequirementgender'),
  (123, 2, 'mercmissionrequirementclass'), (124, 1, 'mercmissionrequirementstrength'),
  (125, 2, 'mercmissionrequirementelement'), (126, 3, 'mercmissionrequirementgender'),
  (127, 1, 'mercmissionrequirementclass'), (128, 2, 'mercmissionrequirementweaponclass'),
  (129, 2, 'mercmissionrequirementelement'), (130, 2, 'mercmissionrequirementgender'),
  (131, 2, 'mercmissionrequirementgender'), (132, 2, 'mercmissionrequirementstrength'),
  (133, 3, 'mercmissionrequirementelement'), (134, 6, 'mercmissionrequirementstrength'),
  (135, 2, 'mercmissionrequirementweaponclass'), (136, 3, 'mercmissionrequirementelement'),
  (137, 3, 'mercmissionrequirementgender'), (138, 3, 'mercmissionrequirementgender'),
  (139, 1, 'mercmissionrequirementclass'), (140, 1, 'mercmissionrequirementelement'),
  (141, 2, 'mercmissionrequirementstrength'), (142, 1, 'mercmissionrequirementgender'),
  (143, 2, 'mercmissionrequirementweaponclass'), (144, 1, 'mercmissionrequirementgender'),
  (145, 2, 'mercmissionrequirementelement'), (146, 2, 'mercmissionrequirementstrength'),
  (147, 6, 'mercmissionrequirementgender'), (148, 2, 'mercmissionrequirementclass'),
  (149, 2, 'mercmissionrequirementweaponclass'), (150, 2, 'mercmissionrequirementelement'),
  (151, 2, 'mercmissionrequirementclass'), (152, 2, 'mercmissionrequirementweaponclass'),
  (153, 2, 'mercmissionrequirementweaponclass'), (154, 3, 'mercmissionrequirementstrength'),
  (155, 1, 'mercmissionrequirementclass'), (156, 3, 'mercmissionrequirementstrength'),
  (157, 2, 'mercmissionrequirementelement'), (158, 3, 'mercmissionrequirementweaponclass'),
  (159, 2, 'mercmissionrequirementstrength'), (160, 3, 'mercmissionrequirementweaponclass'),
  (161, 2, 'mercmissionrequirementelement'), (162, 3, 'mercmissionrequirementstrength'),
  (163, 1, 'mercmissionrequirementclass'), (164, 1, 'mercmissionrequirementstrength'),
  (165, 3, 'mercmissionrequirementelement'), (166, 1, 'mercmissionrequirementfieldskill'),
  (167, 6, 'mercmissionrequirementclass'), (168, 1, 'mercmissionrequirementgender'),
  (169, 1, 'mercmissionrequirementfieldskill'), (170, 2, 'mercmissionrequirementclass'),
  (171, 1, 'mercmissionrequirementweaponclass'), (172, 2, 'mercmissionrequirementstrength'),
  (173, 1, 'mercmissionrequirementfieldskill'), (174, 2, 'mercmissionrequirementgender'),
  (175, 2, 'mercmissionrequirementgender'), (176, 2, 'mercmissionrequirementclass'),
  (177, 3, 'mercmissionrequirementweaponclass'), (178, 3, 'mercmissionrequirementstrength'),
  (179, 2, 'mercmissionrequirementstrength'), (180, 1, 'mercmissionrequirementfieldskill'),
  (181, 2, 'mercmissionrequirementelement'), (182, 1, 'mercmissionrequirementweaponclass'),
  (183, 1, 'mercmissionrequirementweaponclass'), (184, 3, 'mercmissionrequirementstrength'),
  (185, 3, 'mercmissionrequirementstrength'), (186, 3, 'mercmissionrequirementelement'),
  (187, 2, 'mercmissionrequirementstrength'), (188, 2, 'mercmissionrequirementfieldskill');
/*!40000 ALTER TABLE `merc_mission_requirement`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_class`
--

DROP TABLE IF EXISTS `merc_mission_requirement_class`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement_class` (
  `id`       INT(11) NOT NULL,
  `class_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A94D0871EA000B10` (`class_id`),
  CONSTRAINT `FK_A94D0871BF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_A94D0871EA000B10` FOREIGN KEY (`class_id`) REFERENCES `blade_class` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement_class`
--

LOCK TABLES `merc_mission_requirement_class` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_class`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement_class` (`id`, `class_id`)
VALUES (1, 1), (2, 1), (8, 1), (9, 1), (27, 1), (31, 1), (54, 1), (66, 1), (80, 1), (89, 1), (92, 1), (95, 1), (115, 1),
  (116, 1), (118, 1), (123, 1), (127, 1), (139, 1), (148, 1), (167, 1), (170, 1), (176, 1), (10, 2), (12, 2), (34, 2),
  (35, 2), (37, 2), (55, 2), (58, 2), (62, 2), (73, 2), (91, 2), (93, 2), (97, 2), (105, 2), (107, 2), (120, 2),
  (151, 2), (155, 2), (163, 2);
/*!40000 ALTER TABLE `merc_mission_requirement_class`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_element`
--

DROP TABLE IF EXISTS `merc_mission_requirement_element`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement_element` (
  `id`         INT(11) NOT NULL,
  `element_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_EB0DE4AF1F1F2A24` (`element_id`),
  CONSTRAINT `FK_EB0DE4AF1F1F2A24` FOREIGN KEY (`element_id`) REFERENCES `element` (`id`),
  CONSTRAINT `FK_EB0DE4AFBF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement_element`
--

LOCK TABLES `merc_mission_requirement_element` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_element`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement_element` (`id`, `element_id`)
VALUES (4, 1), (86, 1), (99, 1), (109, 1), (140, 1), (161, 1), (16, 2), (17, 2), (32, 2), (36, 2), (50, 2), (65, 2),
  (74, 2), (20, 3), (42, 3), (49, 3), (64, 3), (110, 3), (145, 3), (150, 3), (14, 4), (26, 4), (52, 4), (76, 4),
  (90, 4), (106, 4), (119, 4), (125, 4), (11, 5), (28, 5), (48, 5), (51, 5), (78, 5), (113, 5), (136, 5), (157, 5),
  (181, 5), (18, 6), (79, 6), (114, 6), (129, 6), (133, 6), (165, 6), (186, 6), (24, 8), (83, 8);
/*!40000 ALTER TABLE `merc_mission_requirement_element`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_field_skill`
--

DROP TABLE IF EXISTS `merc_mission_requirement_field_skill`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement_field_skill` (
  `id`             INT(11) NOT NULL,
  `field_skill_id` INT(11) DEFAULT NULL,
  `level`          INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_56ACCC8C83BD468F` (`field_skill_id`),
  CONSTRAINT `FK_56ACCC8C83BD468F` FOREIGN KEY (`field_skill_id`) REFERENCES `affinity_node` (`id`),
  CONSTRAINT `FK_56ACCC8CBF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement_field_skill`
--

LOCK TABLES `merc_mission_requirement_field_skill` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_field_skill`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement_field_skill` (`id`, `field_skill_id`, `level`)
VALUES (47, 12, 1), (53, 15, 1), (56, 9, 1), (166, 28, 1), (169, 18, 1), (173, 25, 1), (180, 25, 1), (188, 16, 1);
/*!40000 ALTER TABLE `merc_mission_requirement_field_skill`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_gender`
--

DROP TABLE IF EXISTS `merc_mission_requirement_gender`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement_gender` (
  `id`        INT(11) NOT NULL,
  `gender_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_80B1C32C708A0E0` (`gender_id`),
  CONSTRAINT `FK_80B1C32C708A0E0` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  CONSTRAINT `FK_80B1C32CBF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement_gender`
--

LOCK TABLES `merc_mission_requirement_gender` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_gender`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement_gender` (`id`, `gender_id`)
VALUES (15, 1), (25, 1), (44, 1), (72, 1), (77, 1), (94, 1), (103, 1), (122, 1), (126, 1), (131, 1), (137, 1), (142, 1),
  (168, 1), (174, 1), (5, 2), (19, 2), (59, 2), (63, 2), (75, 2), (87, 2), (98, 2), (130, 2), (138, 2), (144, 2),
  (147, 2), (175, 2);
/*!40000 ALTER TABLE `merc_mission_requirement_gender`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_strength`
--

DROP TABLE IF EXISTS `merc_mission_requirement_strength`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement_strength` (
  `id`       INT(11) NOT NULL,
  `strength` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_CF7F9A13BF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement_strength`
--

LOCK TABLES `merc_mission_requirement_strength` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_strength`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement_strength` (`id`, `strength`)
VALUES (6, 15), (13, 20), (22, 30), (23, 30), (30, 15), (39, 20), (41, 30), (46, 35), (57, 10), (60, 15), (71, 35),
  (82, 35), (84, 10), (85, 10), (88, 10), (96, 20), (101, 30), (102, 30), (104, 30), (108, 35), (112, 35), (121, 15),
  (124, 15), (132, 30), (134, 30), (141, 10), (146, 15), (154, 20), (156, 30), (159, 30), (162, 30), (164, 35),
  (172, 35), (178, 35), (179, 35), (184, 35), (185, 35), (187, 35);
/*!40000 ALTER TABLE `merc_mission_requirement_strength`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_weapon_class`
--

DROP TABLE IF EXISTS `merc_mission_requirement_weapon_class`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `merc_mission_requirement_weapon_class` (
  `id`              INT(11) NOT NULL,
  `weapon_class_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_C0D2DF449B14B9D9` (`weapon_class_id`),
  CONSTRAINT `FK_C0D2DF449B14B9D9` FOREIGN KEY (`weapon_class_id`) REFERENCES `weapon_class` (`id`),
  CONSTRAINT `FK_C0D2DF44BF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `merc_mission_requirement_weapon_class`
--

LOCK TABLES `merc_mission_requirement_weapon_class` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_weapon_class`
  DISABLE KEYS */;
INSERT INTO `merc_mission_requirement_weapon_class` (`id`, `weapon_class_id`)
VALUES (38, 3), (67, 3), (135, 3), (40, 4), (45, 4), (100, 4), (182, 4), (21, 8), (43, 8), (117, 8), (143, 8), (152, 8),
  (160, 8), (183, 8), (29, 9), (69, 9), (149, 9), (177, 9), (33, 10), (81, 10), (3, 12), (7, 12), (61, 12), (128, 12),
  (158, 12), (68, 14), (70, 14), (111, 14), (153, 14), (171, 14);
/*!40000 ALTER TABLE `merc_mission_requirement_weapon_class`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nation`
--

DROP TABLE IF EXISTS `nation`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `nation` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_CC5A6D27989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `nation`
--

LOCK TABLES `nation` WRITE;
/*!40000 ALTER TABLE `nation`
  DISABLE KEYS */;
INSERT INTO `nation` (`id`, `name`, `slug`)
VALUES (1, 'Argentum', 'argentum'), (2, 'Gormott', 'gormott'), (3, 'Uraya', 'uraya'), (4, 'Mor Ardain', 'mor-ardain'),
  (5, 'Leftheria', 'leftheria'), (6, 'Indol', 'indol'), (7, 'Tantal', 'tantal');
/*!40000 ALTER TABLE `nation`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `role` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_57698A6A989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role`
  DISABLE KEYS */;
INSERT INTO `role` (`id`, `name`, `slug`) VALUES (1, 'ROLE_USER', 'user'), (2, 'ROLE_ADMIN', 'admin');
/*!40000 ALTER TABLE `role`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trust_rank`
--

DROP TABLE IF EXISTS `trust_rank`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `trust_rank` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `sort` INT(11)                                   NOT NULL,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_7880D3B1989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `trust_rank`
--

LOCK TABLES `trust_rank` WRITE;
/*!40000 ALTER TABLE `trust_rank`
  DISABLE KEYS */;
INSERT INTO `trust_rank` (`id`, `sort`, `name`, `slug`)
VALUES (1, 6, 'E', 'e'), (2, 5, 'D', 'd'), (3, 4, 'C', 'c'), (4, 3, 'B', 'b'), (5, 2, 'A', 'a'), (6, 1, 'S', 's');
/*!40000 ALTER TABLE `trust_rank`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `user` (
  `id`                 INT(11)                                   NOT NULL AUTO_INCREMENT,
  `username`           VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `password`           VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `email`              VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `is_active`          TINYINT(1)                                NOT NULL,
  `created`            DATETIME                                  NOT NULL,
  `activate_code`      VARCHAR(255) COLLATE `utf8mb4_unicode_ci`          DEFAULT NULL,
  `activate_code_time` DATETIME                                           DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `user`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `user_role` (
  `user_id` INT(11) NOT NULL,
  `role_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  KEY `IDX_2DE8C6A3A76ED395` (`user_id`),
  KEY `IDX_2DE8C6A3D60322AC` (`role_id`),
  CONSTRAINT `FK_2DE8C6A3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_2DE8C6A3D60322AC` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapon_class`
--

DROP TABLE IF EXISTS `weapon_class`;
/*!40101 SET @`saved_cs_client` = @@`character_set_client` */;
/*!40101 SET character_set_client = `utf8` */;
CREATE TABLE `weapon_class` (
  `id`   INT(11)                                   NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  `slug` VARCHAR(255) COLLATE `utf8mb4_unicode_ci` NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_C0F1E9FA989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 19
  DEFAULT CHARSET = `utf8mb4`
  COLLATE = `utf8mb4_unicode_ci`;
/*!40101 SET character_set_client = @`saved_cs_client` */;

--
-- Dumping data for table `weapon_class`
--

LOCK TABLES `weapon_class` WRITE;
/*!40000 ALTER TABLE `weapon_class`
  DISABLE KEYS */;
INSERT INTO `weapon_class` (`id`, `name`, `slug`)
VALUES (1, 'Aegis Sword', 'aegis-sword'), (2, 'Big Bang Edge', 'big-bang-edge'), (3, 'Bitball', 'bitball'),
  (4, 'Chrome Katana', 'chrome-katana'), (5, 'Drill Shield', 'drill-shield'), (6, 'Dual Blades', 'dual-blades'),
  (7, 'Dual Scythes', 'dual-scythes'), (8, 'Ether Cannon', 'ether-cannon'), (9, 'Greataxe', 'greataxe'),
  (10, 'Knuckle Claws', 'knuckle-claws'), (11, 'Mech Arms', 'mech-arms'), (12, 'Megalance', 'megalance'),
  (13, 'Shield Arms', 'shield-arms'), (14, 'Shield Hammer', 'shield-hammer'), (15, 'Twin Rings', 'twin-rings'),
  (16, 'Variable Saber', 'variable-saber'), (17, 'Whipswords', 'whipswords'), (18, 'Aqua Scimitar', 'aqua-scimitar');
/*!40000 ALTER TABLE `weapon_class`
  ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @`OLD_TIME_ZONE` */;

/*!40101 SET SQL_MODE = @`OLD_SQL_MODE` */;
/*!40014 SET FOREIGN_KEY_CHECKS = @`OLD_FOREIGN_KEY_CHECKS` */;
/*!40014 SET UNIQUE_CHECKS = @`OLD_UNIQUE_CHECKS` */;
/*!40101 SET CHARACTER_SET_CLIENT = @`OLD_CHARACTER_SET_CLIENT` */;
/*!40101 SET CHARACTER_SET_RESULTS = @`OLD_CHARACTER_SET_RESULTS` */;
/*!40101 SET COLLATION_CONNECTION = @`OLD_COLLATION_CONNECTION` */;
/*!40111 SET SQL_NOTES = @`OLD_SQL_NOTES` */;

-- Dump completed on 2018-01-28 22:06:07
