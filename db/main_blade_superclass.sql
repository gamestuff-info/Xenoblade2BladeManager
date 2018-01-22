CREATE TABLE blade_superclass
(
    id INTEGER PRIMARY KEY NOT NULL,
    element_id INTEGER DEFAULT NULL,
    gender_id INTEGER DEFAULT NULL,
    battle_role_id INTEGER DEFAULT NULL,
    weapon_class_id INTEGER DEFAULT NULL,
    is_merc BOOLEAN NOT NULL,
    rarity INTEGER NOT NULL,
    affinity_total INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    discr VARCHAR(255) NOT NULL,
    merc_team_name VARCHAR(255) DEFAULT NULL,
    can_be_released BOOLEAN NOT NULL,
    CONSTRAINT FK_6EA9EB401F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id),
    CONSTRAINT FK_6EA9EB40708A0E0 FOREIGN KEY (gender_id) REFERENCES gender (id),
    CONSTRAINT FK_6EA9EB401C9C96CF FOREIGN KEY (battle_role_id) REFERENCES battle_role (id),
    CONSTRAINT FK_6EA9EB409B14B9D9 FOREIGN KEY (weapon_class_id) REFERENCES weapon_class (id)
);
CREATE INDEX IDX_6EA9EB401F1F2A24 ON blade_superclass (element_id);
CREATE INDEX IDX_6EA9EB40708A0E0 ON blade_superclass (gender_id);
CREATE INDEX IDX_6EA9EB401C9C96CF ON blade_superclass (battle_role_id);
CREATE INDEX IDX_6EA9EB409B14B9D9 ON blade_superclass (weapon_class_id);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (1, 1, 2, 1, 1, 0, 5, 44, 'Pyra', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (2, 7, 2, 1, 1, 0, 5, 44, 'Mythra', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (3, 2, 3, 3, 15, 0, 5, 44, 'Dromarch', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (4, 5, 2, 2, 5, 0, 5, 44, 'Poppi ɑ', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (5, 1, 2, 2, 11, 0, 5, 44, 'Poppi QT', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (6, 3, 2, 2, 16, 0, 5, 44, 'Poppi QTπ', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (7, 6, 2, 1, 2, 0, 5, 44, 'Pandoria', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (8, 4, 1, 1, 7, 1, 5, 44, 'Roc', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (9, 1, 2, 2, 17, 0, 5, 44, 'Brighid', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (10, 2, 1, 2, 4, 1, 5, 44, 'Aegaeon', 'bladetemplate', null, 0);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (11, 4, 2, 2, 14, 1, 5, 44, 'Finch', 'bladetemplate', 'Albatrojans', 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (12, 8, 1, 2, 4, 1, 5, 44, 'Perceval', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (13, 5, 1, 3, 3, 1, 5, 44, 'Floren', 'bladetemplate', 'Florentrancers', 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (14, 1, 1, 1, 9, 1, 5, 44, 'Dagas', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (15, 8, 2, 1, 8, 1, 5, 44, 'Azami', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (16, 5, 2, 3, 10, 1, 5, 44, 'Nim', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (17, 6, 2, 2, 14, 1, 5, 44, 'Electra', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (18, 3, 2, 1, 12, 1, 5, 44, 'Perun', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (19, 4, 2, 3, 10, 1, 5, 44, 'Adenine', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (20, 1, 2, 2, 4, 1, 5, 44, 'Newt', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (21, 2, 1, 1, 9, 1, 5, 44, 'Gorg', 'bladetemplate', 'Flying Merfolk', 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (22, 6, 2, 3, 10, 1, 5, 44, 'Kora', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (23, 6, 2, 3, 3, 1, 5, 44, 'Vess', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (24, 4, 1, 3, 3, 1, 5, 44, 'Boreas', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (25, 8, 2, 1, 1, 1, 5, 44, 'Vale', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (26, 5, 1, 1, 12, 1, 5, 44, 'Wulfric', 'bladetemplate', 'Gungnir Wardens', 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (27, 6, 2, 1, 8, 1, 5, 44, 'Herald', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (28, 3, 1, 2, 14, 1, 5, 44, 'Godfrey', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (29, 4, 2, 1, 9, 1, 5, 44, 'Zenobia', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (30, 2, 2, 1, 12, 1, 5, 44, 'Praxis', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (31, 3, 2, 2, 4, 1, 5, 44, 'Theory', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (32, 2, 2, 1, 8, 1, 5, 44, 'Sheba', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (33, 5, 2, 1, 9, 1, 5, 44, 'Agate', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (34, 8, 2, 2, 14, 1, 5, 44, 'Kasandra', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (35, 3, 2, 3, 3, 1, 5, 44, 'Dahlia', 'bladetemplate', 'Perenial Beauties', 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (36, 3, 2, 3, 10, 1, 5, 44, 'Ursula', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (37, 7, 2, 1, 8, 1, 5, 44, 'KOS-MOS', 'bladetemplate', null, 1);
INSERT INTO blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, rarity, affinity_total, name, discr, merc_team_name, can_be_released) VALUES (38, 2, 2, 3, 18, 0, 5, 44, 'Nia', 'bladetemplate', null, 0);