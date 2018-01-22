CREATE TABLE battle_role
(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_E49FC989D9B62 ON battle_role (slug);
INSERT INTO battle_role (id, name, slug) VALUES (1, 'ATK', 'atk');
INSERT INTO battle_role (id, name, slug) VALUES (2, 'TNK', 'tnk');
INSERT INTO battle_role (id, name, slug) VALUES (3, 'HLR', 'hlr');