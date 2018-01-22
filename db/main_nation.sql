CREATE TABLE nation
(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_CC5A6D27989D9B62 ON nation (slug);
INSERT INTO nation (id, name, slug) VALUES (1, 'Argentum', 'argentum');
INSERT INTO nation (id, name, slug) VALUES (2, 'Gormott', 'gormott');
INSERT INTO nation (id, name, slug) VALUES (3, 'Uraya', 'uraya');
INSERT INTO nation (id, name, slug) VALUES (4, 'Mor Ardain', 'mor-ardain');
INSERT INTO nation (id, name, slug) VALUES (5, 'Leftheria', 'leftheria');
INSERT INTO nation (id, name, slug) VALUES (6, 'Indol', 'indol');
INSERT INTO nation (id, name, slug) VALUES (7, 'Tantal', 'tantal');