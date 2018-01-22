CREATE TABLE merc_mission_requirement_weapon_class
(
    id INTEGER PRIMARY KEY NOT NULL,
    weapon_class_id INTEGER DEFAULT NULL
);
CREATE INDEX IDX_C0D2DF449B14B9D9 ON merc_mission_requirement_weapon_class (weapon_class_id);