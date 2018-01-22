CREATE TABLE driver
(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_11667CD9989D9B62 ON driver (slug);
INSERT INTO driver (id, name, slug) VALUES (1, 'Rex', 'rex');
INSERT INTO driver (id, name, slug) VALUES (2, 'Nia', 'nia');
INSERT INTO driver (id, name, slug) VALUES (3, 'Tora', 'tora');
INSERT INTO driver (id, name, slug) VALUES (4, 'Mòrag', 'morag');
INSERT INTO driver (id, name, slug) VALUES (5, 'Zeke', 'zeke');