CREATE TABLE merc_mission_affinity_node
(
    merc_mission_id INTEGER NOT NULL,
    affinity_node_id INTEGER NOT NULL,
    PRIMARY KEY (merc_mission_id, affinity_node_id)
);
CREATE INDEX IDX_F63780B852594D7F ON merc_mission_affinity_node (merc_mission_id);
CREATE INDEX IDX_F63780B8F810347F ON merc_mission_affinity_node (affinity_node_id);