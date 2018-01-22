CREATE TABLE blade_template
(
    id INTEGER PRIMARY KEY NOT NULL,
    slug VARCHAR(255) NOT NULL,
    CONSTRAINT FK_13DC1542BF396750 FOREIGN KEY (id) REFERENCES blade_superclass (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX UNIQ_13DC1542989D9B62 ON blade_template (slug);
INSERT INTO blade_template (id, slug) VALUES (1, 'pyra');
INSERT INTO blade_template (id, slug) VALUES (2, 'mythra');
INSERT INTO blade_template (id, slug) VALUES (3, 'dromarch');
INSERT INTO blade_template (id, slug) VALUES (4, 'poppi-ɑ');
INSERT INTO blade_template (id, slug) VALUES (5, 'poppi-qt');
INSERT INTO blade_template (id, slug) VALUES (6, 'poppi-qtp');
INSERT INTO blade_template (id, slug) VALUES (7, 'pandoria');
INSERT INTO blade_template (id, slug) VALUES (8, 'roc');
INSERT INTO blade_template (id, slug) VALUES (9, 'brighid');
INSERT INTO blade_template (id, slug) VALUES (10, 'aegaeon');
INSERT INTO blade_template (id, slug) VALUES (11, 'finch');
INSERT INTO blade_template (id, slug) VALUES (12, 'perceval');
INSERT INTO blade_template (id, slug) VALUES (13, 'floren');
INSERT INTO blade_template (id, slug) VALUES (14, 'dagas');
INSERT INTO blade_template (id, slug) VALUES (15, 'azami');
INSERT INTO blade_template (id, slug) VALUES (16, 'nim');
INSERT INTO blade_template (id, slug) VALUES (17, 'electra');
INSERT INTO blade_template (id, slug) VALUES (18, 'perun');
INSERT INTO blade_template (id, slug) VALUES (19, 'adenine');
INSERT INTO blade_template (id, slug) VALUES (20, 'newt');
INSERT INTO blade_template (id, slug) VALUES (21, 'gorg');
INSERT INTO blade_template (id, slug) VALUES (22, 'kora');
INSERT INTO blade_template (id, slug) VALUES (23, 'vess');
INSERT INTO blade_template (id, slug) VALUES (24, 'boreas');
INSERT INTO blade_template (id, slug) VALUES (25, 'vale');
INSERT INTO blade_template (id, slug) VALUES (26, 'wulfric');
INSERT INTO blade_template (id, slug) VALUES (27, 'herald');
INSERT INTO blade_template (id, slug) VALUES (28, 'godfrey');
INSERT INTO blade_template (id, slug) VALUES (29, 'zenobia');
INSERT INTO blade_template (id, slug) VALUES (30, 'praxis');
INSERT INTO blade_template (id, slug) VALUES (31, 'theory');
INSERT INTO blade_template (id, slug) VALUES (32, 'sheba');
INSERT INTO blade_template (id, slug) VALUES (33, 'agate');
INSERT INTO blade_template (id, slug) VALUES (34, 'kasandra');
INSERT INTO blade_template (id, slug) VALUES (35, 'dahlia');
INSERT INTO blade_template (id, slug) VALUES (36, 'ursula');
INSERT INTO blade_template (id, slug) VALUES (37, 'kos-mos');
INSERT INTO blade_template (id, slug) VALUES (38, 'nia');