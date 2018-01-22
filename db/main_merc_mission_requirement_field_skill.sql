CREATE TABLE merc_mission_requirement_field_skill
(
    id INTEGER PRIMARY KEY NOT NULL,
    field_skill_id INTEGER DEFAULT NULL,
    level INTEGER NOT NULL
);
CREATE INDEX IDX_56ACCC8C83BD468F ON merc_mission_requirement_field_skill (field_skill_id);