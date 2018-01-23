-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: homestead
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `affinity_node`
--

DROP TABLE IF EXISTS `affinity_node`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `affinity_node` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `sort` INT(11)                                 NOT NULL,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_FF9AD9A4989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 56
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affinity_node`
--

LOCK TABLES `affinity_node` WRITE;
/*!40000 ALTER TABLE `affinity_node`
  DISABLE KEYS */;
INSERT INTO `affinity_node` VALUES (1, 1, 'Dark Mastery', 'dark-mastery'), (2, 2, 'Earth Mastery', 'earth-mastery'),
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
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `battle_role` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_E49FC989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battle_role`
--

LOCK TABLES `battle_role` WRITE;
/*!40000 ALTER TABLE `battle_role`
  DISABLE KEYS */;
INSERT INTO `battle_role` VALUES (1, 'ATK', 'atk'), (2, 'TNK', 'tnk'), (3, 'HLR', 'hlr');
/*!40000 ALTER TABLE `battle_role`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade`
--

DROP TABLE IF EXISTS `blade`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blade` (
  `id`              INT(11)    NOT NULL,
  `user_id`         INT(11) DEFAULT NULL,
  `driver_id`       INT(11) DEFAULT NULL,
  `trust_id`        INT(11) DEFAULT NULL,
  `merc_mission_id` INT(11) DEFAULT NULL,
  `strength`        INT(11)    NOT NULL,
  `affinity`        INT(11)    NOT NULL,
  `is_merc_leader`  TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_217C01E8A76ED395` (`user_id`),
  KEY `IDX_217C01E8C3423909` (`driver_id`),
  KEY `IDX_217C01E8AE0FAC85` (`trust_id`),
  KEY `IDX_217C01E852594D7F` (`merc_mission_id`),
  CONSTRAINT `FK_217C01E852594D7F` FOREIGN KEY (`merc_mission_id`) REFERENCES `merc_mission` (`id`),
  CONSTRAINT `FK_217C01E8A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_217C01E8AE0FAC85` FOREIGN KEY (`trust_id`) REFERENCES `trust_rank` (`id`),
  CONSTRAINT `FK_217C01E8BF396750` FOREIGN KEY (`id`) REFERENCES `blade_superclass` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_217C01E8C3423909` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blade_affinity_node`
--

LOCK TABLES `blade_affinity_node` WRITE;
/*!40000 ALTER TABLE `blade_affinity_node`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `blade_affinity_node`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade_class`
--

DROP TABLE IF EXISTS `blade_class`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blade_class` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_B86276AF989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blade_class`
--

LOCK TABLES `blade_class` WRITE;
/*!40000 ALTER TABLE `blade_class`
  DISABLE KEYS */;
INSERT INTO `blade_class` VALUES (1, 'Humanoid', 'humanoid'), (2, 'Animal', 'animal');
/*!40000 ALTER TABLE `blade_class`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blade_superclass`
--

DROP TABLE IF EXISTS `blade_superclass`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blade_superclass` (
  `id`              INT(11)                                 NOT NULL                     AUTO_INCREMENT,
  `element_id`      INT(11)                                                              DEFAULT NULL,
  `gender_id`       INT(11)                                                              DEFAULT NULL,
  `battle_role_id`  INT(11)                                                              DEFAULT NULL,
  `weapon_class_id` INT(11)                                                              DEFAULT NULL,
  `is_merc`         TINYINT(1)                              NOT NULL,
  `merc_team_name`  VARCHAR(255) COLLATE utf8mb4_unicode_ci                              DEFAULT NULL,
  `rarity`          INT(11)                                 NOT NULL,
  `affinity_total`  INT(11)                                 NOT NULL,
  `can_be_released` TINYINT(1)                              NOT NULL,
  `name`            VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discr`           VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blade_superclass`
--

LOCK TABLES `blade_superclass` WRITE;
/*!40000 ALTER TABLE `blade_superclass`
  DISABLE KEYS */;
INSERT INTO `blade_superclass` VALUES (1, 1, 2, 1, 1, 0, NULL, 5, 44, 0, 'Pyra', 'bladetemplate'),
  (2, 7, 2, 1, 1, 0, NULL, 5, 44, 0, 'Mythra', 'bladetemplate'),
  (3, 2, 3, 3, 15, 0, NULL, 5, 44, 0, 'Dromarch', 'bladetemplate'),
  (4, 5, 2, 2, 5, 0, NULL, 5, 44, 0, 'Poppi ɑ', 'bladetemplate'),
  (5, 1, 2, 2, 11, 0, NULL, 5, 44, 0, 'Poppi QT', 'bladetemplate'),
  (6, 3, 2, 2, 16, 0, NULL, 5, 44, 0, 'Poppi QTπ', 'bladetemplate'),
  (7, 6, 2, 1, 2, 0, NULL, 5, 44, 0, 'Pandoria', 'bladetemplate'),
  (8, 4, 1, 1, 7, 1, NULL, 5, 44, 0, 'Roc', 'bladetemplate'),
  (9, 1, 2, 2, 17, 0, NULL, 5, 44, 0, 'Brighid', 'bladetemplate'),
  (10, 2, 1, 2, 4, 1, NULL, 5, 44, 0, 'Aegaeon', 'bladetemplate'),
  (11, 4, 2, 2, 14, 1, 'Albatrojans', 5, 44, 1, 'Finch', 'bladetemplate'),
  (12, 8, 1, 2, 4, 1, NULL, 5, 44, 1, 'Perceval', 'bladetemplate'),
  (13, 5, 1, 3, 3, 1, 'Florentrancers', 5, 44, 1, 'Floren', 'bladetemplate'),
  (14, 1, 1, 1, 9, 1, NULL, 5, 44, 1, 'Dagas', 'bladetemplate'),
  (15, 8, 2, 1, 8, 1, NULL, 5, 44, 1, 'Azami', 'bladetemplate'),
  (16, 5, 2, 3, 10, 1, NULL, 5, 44, 1, 'Nim', 'bladetemplate'),
  (17, 6, 2, 2, 14, 1, NULL, 5, 44, 1, 'Electra', 'bladetemplate'),
  (18, 3, 2, 1, 12, 1, NULL, 5, 44, 1, 'Perun', 'bladetemplate'),
  (19, 4, 2, 3, 10, 1, NULL, 5, 44, 1, 'Adenine', 'bladetemplate'),
  (20, 1, 2, 2, 4, 1, NULL, 5, 44, 1, 'Newt', 'bladetemplate'),
  (21, 2, 1, 1, 9, 1, 'Flying Merfolk', 5, 44, 1, 'Gorg', 'bladetemplate'),
  (22, 6, 2, 3, 10, 1, NULL, 5, 44, 1, 'Kora', 'bladetemplate'),
  (23, 6, 2, 3, 3, 1, NULL, 5, 44, 1, 'Vess', 'bladetemplate'),
  (24, 4, 1, 3, 3, 1, NULL, 5, 44, 1, 'Boreas', 'bladetemplate'),
  (25, 8, 2, 1, 1, 1, NULL, 5, 44, 1, 'Vale', 'bladetemplate'),
  (26, 5, 1, 1, 12, 1, 'Gungnir Wardens', 5, 44, 1, 'Wulfric', 'bladetemplate'),
  (27, 6, 2, 1, 8, 1, NULL, 5, 44, 1, 'Herald', 'bladetemplate'),
  (28, 3, 1, 2, 14, 1, NULL, 5, 44, 1, 'Godfrey', 'bladetemplate'),
  (29, 4, 2, 1, 9, 1, NULL, 5, 44, 1, 'Zenobia', 'bladetemplate'),
  (30, 2, 2, 1, 12, 1, NULL, 5, 44, 1, 'Praxis', 'bladetemplate'),
  (31, 3, 2, 2, 4, 1, NULL, 5, 44, 1, 'Theory', 'bladetemplate'),
  (32, 2, 2, 1, 8, 1, NULL, 5, 44, 1, 'Sheba', 'bladetemplate'),
  (33, 5, 2, 1, 9, 1, NULL, 5, 44, 1, 'Agate', 'bladetemplate'),
  (34, 8, 2, 2, 14, 1, NULL, 5, 44, 1, 'Kasandra', 'bladetemplate'),
  (35, 3, 2, 3, 3, 1, 'Perenial Beauties', 5, 44, 1, 'Dahlia', 'bladetemplate'),
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
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blade_template` (
  `id`   INT(11)                                 NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_13DC1542989D9B62` (`slug`),
  CONSTRAINT `FK_13DC1542BF396750` FOREIGN KEY (`id`) REFERENCES `blade_superclass` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blade_template`
--

LOCK TABLES `blade_template` WRITE;
/*!40000 ALTER TABLE `blade_template`
  DISABLE KEYS */;
INSERT INTO `blade_template`
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
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_11667CD9989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver`
  DISABLE KEYS */;
INSERT INTO `driver`
VALUES (1, 'Rex', 'rex'), (2, 'Nia', 'nia'), (3, 'Tora', 'tora'), (4, 'Mòrag', 'morag'), (5, 'Zeke', 'zeke');
/*!40000 ALTER TABLE `driver`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `element`
--

DROP TABLE IF EXISTS `element`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `element` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_41405E39989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 9
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `element`
--

LOCK TABLES `element` WRITE;
/*!40000 ALTER TABLE `element`
  DISABLE KEYS */;
INSERT INTO `element`
VALUES (1, 'Fire', 'fire'), (2, 'Water', 'water'), (3, 'Ice', 'ice'), (4, 'Wind', 'wind'), (5, 'Earth', 'earth'),
  (6, 'Electric', 'electric'), (7, 'Light', 'light'), (8, 'Dark', 'dark');
/*!40000 ALTER TABLE `element`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gender` (
  `id`       INT(11)                                 NOT NULL AUTO_INCREMENT,
  `class_id` INT(11)                                          DEFAULT NULL,
  `sort`     INT(11)                                 NOT NULL,
  `name`     VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug`     VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_C7470A42989D9B62` (`slug`),
  KEY `IDX_C7470A42EA000B10` (`class_id`),
  CONSTRAINT `FK_C7470A42EA000B10` FOREIGN KEY (`class_id`) REFERENCES `blade_class` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender`
  DISABLE KEYS */;
INSERT INTO `gender` VALUES (1, 1, 1, 'Male', 'male'), (2, 1, 2, 'Female', 'female'), (3, 2, 3, 'Animal', 'animal');
/*!40000 ALTER TABLE `gender`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission`
--

DROP TABLE IF EXISTS `merc_mission`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merc_mission` (
  `id`         INT(11)                                 NOT NULL AUTO_INCREMENT,
  `nation_id`  INT(11)                                          DEFAULT NULL,
  `duration`   TIME                                    NOT NULL,
  `repeatable` TINYINT(1)                              NOT NULL,
  `name`       VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug`       VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_FAF4B51F989D9B62` (`slug`),
  KEY `IDX_FAF4B51FAE3899` (`nation_id`),
  CONSTRAINT `FK_FAF4B51FAE3899` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission`
--

LOCK TABLES `merc_mission` WRITE;
/*!40000 ALTER TABLE `merc_mission`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_affinity_node`
--

DROP TABLE IF EXISTS `merc_mission_affinity_node`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_affinity_node`
--

LOCK TABLES `merc_mission_affinity_node` WRITE;
/*!40000 ALTER TABLE `merc_mission_affinity_node`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_affinity_node`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_merc_mission_prerequisite`
--

DROP TABLE IF EXISTS `merc_mission_merc_mission_prerequisite`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_merc_mission_prerequisite`
--

LOCK TABLES `merc_mission_merc_mission_prerequisite` WRITE;
/*!40000 ALTER TABLE `merc_mission_merc_mission_prerequisite`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_merc_mission_prerequisite`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_merc_mission_requirement`
--

DROP TABLE IF EXISTS `merc_mission_merc_mission_requirement`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_merc_mission_requirement`
--

LOCK TABLES `merc_mission_merc_mission_requirement` WRITE;
/*!40000 ALTER TABLE `merc_mission_merc_mission_requirement`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_merc_mission_requirement`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_prerequisite`
--

DROP TABLE IF EXISTS `merc_mission_prerequisite`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merc_mission_prerequisite` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `sort` INT(11)                                 NOT NULL,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_5E819534989D9B62` (`slug`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_prerequisite`
--

LOCK TABLES `merc_mission_prerequisite` WRITE;
/*!40000 ALTER TABLE `merc_mission_prerequisite`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_prerequisite`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement`
--

DROP TABLE IF EXISTS `merc_mission_requirement`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merc_mission_requirement` (
  `id`    INT(11)                                 NOT NULL AUTO_INCREMENT,
  `count` INT(11)                                 NOT NULL,
  `discr` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement`
--

LOCK TABLES `merc_mission_requirement` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_class`
--

DROP TABLE IF EXISTS `merc_mission_requirement_class`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement_class`
--

LOCK TABLES `merc_mission_requirement_class` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_class`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement_class`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_element`
--

DROP TABLE IF EXISTS `merc_mission_requirement_element`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement_element`
--

LOCK TABLES `merc_mission_requirement_element` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_element`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement_element`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_field_skill`
--

DROP TABLE IF EXISTS `merc_mission_requirement_field_skill`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement_field_skill`
--

LOCK TABLES `merc_mission_requirement_field_skill` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_field_skill`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement_field_skill`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_gender`
--

DROP TABLE IF EXISTS `merc_mission_requirement_gender`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement_gender`
--

LOCK TABLES `merc_mission_requirement_gender` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_gender`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement_gender`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_strength`
--

DROP TABLE IF EXISTS `merc_mission_requirement_strength`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merc_mission_requirement_strength` (
  `id`       INT(11) NOT NULL,
  `strength` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_CF7F9A13BF396750` FOREIGN KEY (`id`) REFERENCES `merc_mission_requirement` (`id`)
    ON DELETE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement_strength`
--

LOCK TABLES `merc_mission_requirement_strength` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_strength`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement_strength`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merc_mission_requirement_weapon_class`
--

DROP TABLE IF EXISTS `merc_mission_requirement_weapon_class`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merc_mission_requirement_weapon_class`
--

LOCK TABLES `merc_mission_requirement_weapon_class` WRITE;
/*!40000 ALTER TABLE `merc_mission_requirement_weapon_class`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `merc_mission_requirement_weapon_class`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nation`
--

DROP TABLE IF EXISTS `nation`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nation` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_CC5A6D27989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nation`
--

LOCK TABLES `nation` WRITE;
/*!40000 ALTER TABLE `nation`
  DISABLE KEYS */;
INSERT INTO `nation`
VALUES (1, 'Argentum', 'argentum'), (2, 'Gormott', 'gormott'), (3, 'Uraya', 'uraya'), (4, 'Mor Ardain', 'mor-ardain'),
  (5, 'Leftheria', 'leftheria'), (6, 'Indol', 'indol'), (7, 'Tantal', 'tantal');
/*!40000 ALTER TABLE `nation`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_57698A6A989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role`
  DISABLE KEYS */;
INSERT INTO `role` VALUES (1, 'ROLE_USER', 'user'), (2, 'ROLE_ADMIN', 'admin');
/*!40000 ALTER TABLE `role`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trust_rank`
--

DROP TABLE IF EXISTS `trust_rank`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trust_rank` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `sort` INT(11)                                 NOT NULL,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_7880D3B1989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trust_rank`
--

LOCK TABLES `trust_rank` WRITE;
/*!40000 ALTER TABLE `trust_rank`
  DISABLE KEYS */;
INSERT INTO `trust_rank`
VALUES (1, 6, 'E', 'e'), (2, 5, 'D', 'd'), (3, 4, 'C', 'c'), (4, 3, 'B', 'b'), (5, 2, 'A', 'a'), (6, 1, 'S', 's');
/*!40000 ALTER TABLE `trust_rank`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id`                 INT(11)                                 NOT NULL AUTO_INCREMENT,
  `username`           VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password`           VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email`              VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active`          TINYINT(1)                              NOT NULL,
  `created`            DATETIME                                NOT NULL,
  `activate_code`      VARCHAR(255) COLLATE utf8mb4_unicode_ci          DEFAULT NULL,
  `activate_code_time` DATETIME                                         DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user`
  DISABLE KEYS */;
INSERT INTO `user` VALUES
  (1, 'dk', '$2y$13$E939/rSZ4HI0qvv1OYi0h.VFqVfaaQjymgYTPHajBEKfLNKlna3ci', 'dk@dankeenan.org', 1,
   '2018-01-12 02:27:38', NULL, NULL);
/*!40000 ALTER TABLE `user`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role`
  DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1, 1), (1, 2);
/*!40000 ALTER TABLE `user_role`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapon_class`
--

DROP TABLE IF EXISTS `weapon_class`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weapon_class` (
  `id`   INT(11)                                 NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_C0F1E9FA989D9B62` (`slug`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 19
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapon_class`
--

LOCK TABLES `weapon_class` WRITE;
/*!40000 ALTER TABLE `weapon_class`
  DISABLE KEYS */;
INSERT INTO `weapon_class`
VALUES (1, 'Aegis Sword', 'aegis-sword'), (2, 'Big Bang Edge', 'big-bang-edge'), (3, 'Bitball', 'bitball'),
  (4, 'Chrome Katana', 'chrome-katana'), (5, 'Drill Shield', 'drill-shield'), (6, 'Dual Blades', 'dual-blades'),
  (7, 'Dual Scythes', 'dual-scythes'), (8, 'Ether Cannon', 'ether-cannon'), (9, 'Greataxe', 'greataxe'),
  (10, 'Knuckle Claws', 'knuckle-claws'), (11, 'Mech Arms', 'mech-arms'), (12, 'Megalance', 'megalance'),
  (13, 'Shield Arms', 'shield-arms'), (14, 'Shield Hammer', 'shield-hammer'), (15, 'Twin Rings', 'twin-rings'),
  (16, 'Variable Saber', 'variable-saber'), (17, 'Whipswords', 'whipswords'), (18, 'Aqua Scimitar', 'aqua-scimitar');
/*!40000 ALTER TABLE `weapon_class`
  ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2018-01-22 20:32:03
