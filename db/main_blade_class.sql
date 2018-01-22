CREATE TABLE blade_class
(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_B86276AF989D9B62 ON blade_class (slug);
INSERT INTO blade_class (id, name, slug) VALUES (1, 'Humanoid', 'humanoid');
INSERT INTO blade_class (id, name, slug) VALUES (2, 'Animal', 'animal');