CREATE TABLE merc_mission_requirement_element
(
    id INTEGER PRIMARY KEY NOT NULL,
    element_id INTEGER DEFAULT NULL
);
CREATE INDEX IDX_EB0DE4AF1F1F2A24 ON merc_mission_requirement_element (element_id);