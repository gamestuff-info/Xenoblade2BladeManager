CREATE TABLE weapon_class
(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_C0F1E9FA989D9B62 ON weapon_class (slug);
INSERT INTO weapon_class (id, name, slug) VALUES (1, 'Aegis Sword', 'aegis-sword');
INSERT INTO weapon_class (id, name, slug) VALUES (2, 'Big Bang Edge', 'big-bang-edge');
INSERT INTO weapon_class (id, name, slug) VALUES (3, 'Bitball', 'bitball');
INSERT INTO weapon_class (id, name, slug) VALUES (4, 'Chrome Katana', 'chrome-katana');
INSERT INTO weapon_class (id, name, slug) VALUES (5, 'Drill Shield', 'drill-shield');
INSERT INTO weapon_class (id, name, slug) VALUES (6, 'Dual Blades', 'dual-blades');
INSERT INTO weapon_class (id, name, slug) VALUES (7, 'Dual Scythes', 'dual-scythes');
INSERT INTO weapon_class (id, name, slug) VALUES (8, 'Ether Cannon', 'ether-cannon');
INSERT INTO weapon_class (id, name, slug) VALUES (9, 'Greataxe', 'greataxe');
INSERT INTO weapon_class (id, name, slug) VALUES (10, 'Knuckle Claws', 'knuckle-claws');
INSERT INTO weapon_class (id, name, slug) VALUES (11, 'Mech Arms', 'mech-arms');
INSERT INTO weapon_class (id, name, slug) VALUES (12, 'Megalance', 'megalance');
INSERT INTO weapon_class (id, name, slug) VALUES (13, 'Shield Arms', 'shield-arms');
INSERT INTO weapon_class (id, name, slug) VALUES (14, 'Shield Hammer', 'shield-hammer');
INSERT INTO weapon_class (id, name, slug) VALUES (15, 'Twin Rings', 'twin-rings');
INSERT INTO weapon_class (id, name, slug) VALUES (16, 'Variable Saber', 'variable-saber');
INSERT INTO weapon_class (id, name, slug) VALUES (17, 'Whipswords', 'whipswords');
INSERT INTO weapon_class (id, name, slug) VALUES (18, 'Aqua Scimitar', 'aqua-scimitar');