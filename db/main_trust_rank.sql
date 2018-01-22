CREATE TABLE trust_rank
(
    id INTEGER PRIMARY KEY NOT NULL,
    sort INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UNIQ_7880D3B1989D9B62 ON trust_rank (slug);
INSERT INTO trust_rank (id, sort, name, slug) VALUES (1, 6, 'E', 'e');
INSERT INTO trust_rank (id, sort, name, slug) VALUES (2, 5, 'D', 'd');
INSERT INTO trust_rank (id, sort, name, slug) VALUES (3, 4, 'C', 'c');
INSERT INTO trust_rank (id, sort, name, slug) VALUES (4, 3, 'B', 'b');
INSERT INTO trust_rank (id, sort, name, slug) VALUES (5, 2, 'A', 'a');
INSERT INTO trust_rank (id, sort, name, slug) VALUES (6, 1, 'S', 's');