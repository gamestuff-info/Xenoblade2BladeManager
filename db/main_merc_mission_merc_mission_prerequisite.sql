CREATE TABLE merc_mission_merc_mission_prerequisite
(
    merc_mission_id INTEGER NOT NULL,
    merc_mission_prerequisite_id INTEGER NOT NULL,
    PRIMARY KEY (merc_mission_id, merc_mission_prerequisite_id)
);
CREATE INDEX IDX_A465E1D252594D7F ON merc_mission_merc_mission_prerequisite (merc_mission_id);
CREATE INDEX IDX_A465E1D2D3AA45CB ON merc_mission_merc_mission_prerequisite (merc_mission_prerequisite_id);