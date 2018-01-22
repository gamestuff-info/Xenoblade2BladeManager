CREATE TABLE element
(
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_41405E39989D9B62 ON element (slug);
INSERT INTO element (id, name, slug) VALUES (1, 'Fire', 'fire');
INSERT INTO element (id, name, slug) VALUES (2, 'Water', 'water');
INSERT INTO element (id, name, slug) VALUES (3, 'Ice', 'ice');
INSERT INTO element (id, name, slug) VALUES (4, 'Wind', 'wind');
INSERT INTO element (id, name, slug) VALUES (5, 'Earth', 'earth');
INSERT INTO element (id, name, slug) VALUES (6, 'Electric', 'electric');
INSERT INTO element (id, name, slug) VALUES (7, 'Light', 'light');
INSERT INTO element (id, name, slug) VALUES (8, 'Dark', 'dark');