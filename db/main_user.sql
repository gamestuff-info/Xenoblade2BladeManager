CREATE TABLE user
(
    id INTEGER PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created DATETIME NOT NULL,
    activate_code VARCHAR(255) DEFAULT NULL,
    activate_code_time DATETIME DEFAULT NULL
);
CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON user (username);
CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email);
INSERT INTO user (id, username, password, email, is_active, created, activate_code, activate_code_time) VALUES (1, 'dk', '$2y$13$E939/rSZ4HI0qvv1OYi0h.VFqVfaaQjymgYTPHajBEKfLNKlna3ci', 'dk@dankeenan.org', 1, '2018-01-12 02:27:38', null, null);