CREATE TABLE gender
(
    id INTEGER PRIMARY KEY NOT NULL,
    class_id INTEGER DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    sort INTEGER NOT NULL,
    CONSTRAINT FK_C7470A42EA000B10 FOREIGN KEY (class_id) REFERENCES blade_class (id)
);
CREATE UNIQUE INDEX UNIQ_C7470A42989D9B62 ON gender (slug);
CREATE INDEX IDX_C7470A42EA000B10 ON gender (class_id);
INSERT INTO gender (id, class_id, name, slug, sort) VALUES (1, 1, 'Male', 'male', 1);
INSERT INTO gender (id, class_id, name, slug, sort) VALUES (2, 1, 'Female', 'female', 2);
INSERT INTO gender (id, class_id, name, slug, sort) VALUES (3, 2, 'Animal', 'animal', 3);