CREATE TABLE merc_mission_requirement_gender
(
    id INTEGER PRIMARY KEY NOT NULL,
    gender_id INTEGER DEFAULT NULL
);
CREATE INDEX IDX_80B1C32C708A0E0 ON merc_mission_requirement_gender (gender_id);