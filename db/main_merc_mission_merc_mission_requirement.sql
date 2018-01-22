CREATE TABLE merc_mission_merc_mission_requirement
(
    merc_mission_id INTEGER NOT NULL,
    merc_mission_requirement_id INTEGER NOT NULL,
    PRIMARY KEY (merc_mission_id, merc_mission_requirement_id)
);
CREATE INDEX IDX_24E4A71B52594D7F ON merc_mission_merc_mission_requirement (merc_mission_id);
CREATE INDEX IDX_24E4A71B6F5F9E61 ON merc_mission_merc_mission_requirement (merc_mission_requirement_id);