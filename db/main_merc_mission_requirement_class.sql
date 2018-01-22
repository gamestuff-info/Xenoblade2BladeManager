CREATE TABLE merc_mission_requirement_class
(
    id INTEGER PRIMARY KEY NOT NULL,
    class_id INTEGER DEFAULT NULL
);
CREATE INDEX IDX_A94D0871EA000B10 ON merc_mission_requirement_class (class_id);