--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Debian 11.2-1.pgdg90+1)
-- Dumped by pg_dump version 11.2 (Ubuntu 11.2-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS xeno2;
--
-- Name: xeno2; Type: DATABASE; Schema: -; Owner: xeno2
--

CREATE DATABASE xeno2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE xeno2 OWNER TO xeno2;

\connect xeno2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: xeno2; Type: SCHEMA; Schema: -; Owner: xeno2
--

CREATE SCHEMA xeno2;


ALTER SCHEMA xeno2 OWNER TO xeno2;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: affinity_node; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.affinity_node (
    id bigint NOT NULL,
    sort bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.affinity_node OWNER TO xeno2;

--
-- Name: affinity_node_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.affinity_node_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.affinity_node_id_seq OWNER TO xeno2;

--
-- Name: affinity_node_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.affinity_node_id_seq OWNED BY xeno2.affinity_node.id;


--
-- Name: battle_role; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.battle_role (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.battle_role OWNER TO xeno2;

--
-- Name: battle_role_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.battle_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.battle_role_id_seq OWNER TO xeno2;

--
-- Name: battle_role_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.battle_role_id_seq OWNED BY xeno2.battle_role.id;


--
-- Name: blade; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.blade (
    id bigint NOT NULL,
    user_id bigint,
    driver_id bigint,
    trust_id bigint,
    merc_mission_id bigint,
    strength bigint NOT NULL,
    affinity bigint NOT NULL,
    is_merc_leader boolean NOT NULL,
    from_template_id bigint,
    merc_team_position bigint,
    in_party boolean NOT NULL
);


ALTER TABLE xeno2.blade OWNER TO xeno2;

--
-- Name: blade_affinity_node; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.blade_affinity_node (
    id bigint NOT NULL,
    blade_id bigint,
    affinity_node_id bigint,
    level bigint NOT NULL,
    max_level bigint NOT NULL
);


ALTER TABLE xeno2.blade_affinity_node OWNER TO xeno2;

--
-- Name: blade_affinity_node_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.blade_affinity_node_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.blade_affinity_node_id_seq OWNER TO xeno2;

--
-- Name: blade_affinity_node_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.blade_affinity_node_id_seq OWNED BY xeno2.blade_affinity_node.id;


--
-- Name: blade_class; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.blade_class (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.blade_class OWNER TO xeno2;

--
-- Name: blade_class_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.blade_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.blade_class_id_seq OWNER TO xeno2;

--
-- Name: blade_class_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.blade_class_id_seq OWNED BY xeno2.blade_class.id;


--
-- Name: blade_superclass; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.blade_superclass (
    id bigint NOT NULL,
    element_id bigint,
    gender_id bigint,
    battle_role_id bigint,
    weapon_class_id bigint,
    is_merc boolean NOT NULL,
    merc_team_name character varying(255),
    rarity bigint NOT NULL,
    affinity_total bigint NOT NULL,
    can_be_released boolean NOT NULL,
    name character varying(255) NOT NULL,
    discr character varying(255) NOT NULL
);


ALTER TABLE xeno2.blade_superclass OWNER TO xeno2;

--
-- Name: blade_superclass_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.blade_superclass_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.blade_superclass_id_seq OWNER TO xeno2;

--
-- Name: blade_superclass_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.blade_superclass_id_seq OWNED BY xeno2.blade_superclass.id;


--
-- Name: blade_template; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.blade_template (
    id bigint NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.blade_template OWNER TO xeno2;

--
-- Name: driver; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.driver (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.driver OWNER TO xeno2;

--
-- Name: driver_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.driver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.driver_id_seq OWNER TO xeno2;

--
-- Name: driver_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.driver_id_seq OWNED BY xeno2.driver.id;


--
-- Name: element; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.element (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.element OWNER TO xeno2;

--
-- Name: element_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.element_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.element_id_seq OWNER TO xeno2;

--
-- Name: element_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.element_id_seq OWNED BY xeno2.element.id;


--
-- Name: gender; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.gender (
    id bigint NOT NULL,
    class_id bigint,
    sort bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.gender OWNER TO xeno2;

--
-- Name: gender_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.gender_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.gender_id_seq OWNER TO xeno2;

--
-- Name: gender_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.gender_id_seq OWNED BY xeno2.gender.id;


--
-- Name: merc_mission; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission (
    id bigint NOT NULL,
    nation_id bigint,
    duration time without time zone NOT NULL,
    repeatable boolean NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    merc_points bigint,
    experience bigint,
    gold bigint
);


ALTER TABLE xeno2.merc_mission OWNER TO xeno2;

--
-- Name: merc_mission_affinity_node; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_affinity_node (
    merc_mission_id bigint NOT NULL,
    affinity_node_id bigint NOT NULL
);


ALTER TABLE xeno2.merc_mission_affinity_node OWNER TO xeno2;

--
-- Name: merc_mission_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.merc_mission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.merc_mission_id_seq OWNER TO xeno2;

--
-- Name: merc_mission_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.merc_mission_id_seq OWNED BY xeno2.merc_mission.id;


--
-- Name: merc_mission_merc_mission_prerequisite; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_merc_mission_prerequisite (
    merc_mission_id bigint NOT NULL,
    merc_mission_prerequisite_id bigint NOT NULL
);


ALTER TABLE xeno2.merc_mission_merc_mission_prerequisite OWNER TO xeno2;

--
-- Name: merc_mission_merc_mission_requirement; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_merc_mission_requirement (
    merc_mission_id bigint NOT NULL,
    merc_mission_requirement_id bigint NOT NULL
);


ALTER TABLE xeno2.merc_mission_merc_mission_requirement OWNER TO xeno2;

--
-- Name: merc_mission_prerequisite; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_prerequisite (
    id bigint NOT NULL,
    sort bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.merc_mission_prerequisite OWNER TO xeno2;

--
-- Name: merc_mission_prerequisite_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.merc_mission_prerequisite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.merc_mission_prerequisite_id_seq OWNER TO xeno2;

--
-- Name: merc_mission_prerequisite_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.merc_mission_prerequisite_id_seq OWNED BY xeno2.merc_mission_prerequisite.id;


--
-- Name: merc_mission_requirement; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement (
    id bigint NOT NULL,
    count bigint NOT NULL,
    discr character varying(255) NOT NULL
);


ALTER TABLE xeno2.merc_mission_requirement OWNER TO xeno2;

--
-- Name: merc_mission_requirement_class; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement_class (
    id bigint NOT NULL,
    class_id bigint
);


ALTER TABLE xeno2.merc_mission_requirement_class OWNER TO xeno2;

--
-- Name: merc_mission_requirement_element; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement_element (
    id bigint NOT NULL,
    element_id bigint
);


ALTER TABLE xeno2.merc_mission_requirement_element OWNER TO xeno2;

--
-- Name: merc_mission_requirement_field_skill; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement_field_skill (
    id bigint NOT NULL,
    field_skill_id bigint,
    level bigint NOT NULL
);


ALTER TABLE xeno2.merc_mission_requirement_field_skill OWNER TO xeno2;

--
-- Name: merc_mission_requirement_gender; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement_gender (
    id bigint NOT NULL,
    gender_id bigint
);


ALTER TABLE xeno2.merc_mission_requirement_gender OWNER TO xeno2;

--
-- Name: merc_mission_requirement_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.merc_mission_requirement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.merc_mission_requirement_id_seq OWNER TO xeno2;

--
-- Name: merc_mission_requirement_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.merc_mission_requirement_id_seq OWNED BY xeno2.merc_mission_requirement.id;


--
-- Name: merc_mission_requirement_strength; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement_strength (
    id bigint NOT NULL,
    strength bigint NOT NULL
);


ALTER TABLE xeno2.merc_mission_requirement_strength OWNER TO xeno2;

--
-- Name: merc_mission_requirement_weapon_class; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.merc_mission_requirement_weapon_class (
    id bigint NOT NULL,
    weapon_class_id bigint
);


ALTER TABLE xeno2.merc_mission_requirement_weapon_class OWNER TO xeno2;

--
-- Name: migration_versions; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.migration_versions (
    version character varying(255) NOT NULL
);


ALTER TABLE xeno2.migration_versions OWNER TO xeno2;

--
-- Name: nation; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.nation (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.nation OWNER TO xeno2;

--
-- Name: nation_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.nation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.nation_id_seq OWNER TO xeno2;

--
-- Name: nation_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.nation_id_seq OWNED BY xeno2.nation.id;


--
-- Name: role; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.role (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.role OWNER TO xeno2;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.role_id_seq OWNER TO xeno2;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.role_id_seq OWNED BY xeno2.role.id;


--
-- Name: sessions; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.sessions (
    sess_id character varying(128) NOT NULL,
    sess_data bytea NOT NULL,
    sess_time bigint NOT NULL,
    sess_lifetime integer NOT NULL
);


ALTER TABLE xeno2.sessions OWNER TO xeno2;

--
-- Name: trust_rank; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.trust_rank (
    id bigint NOT NULL,
    sort bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.trust_rank OWNER TO xeno2;

--
-- Name: trust_rank_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.trust_rank_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.trust_rank_id_seq OWNER TO xeno2;

--
-- Name: trust_rank_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.trust_rank_id_seq OWNED BY xeno2.trust_rank.id;


--
-- Name: user_driver; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.user_driver (
    user_id bigint NOT NULL,
    driver_id bigint NOT NULL
);


ALTER TABLE xeno2.user_driver OWNER TO xeno2;

--
-- Name: users; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.users (
    id bigint NOT NULL,
    password character varying(255),
    email character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    created timestamp with time zone NOT NULL,
    activate_code character varying(255),
    activate_code_time timestamp with time zone,
    google_id character varying(255)
);


ALTER TABLE xeno2.users OWNER TO xeno2;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.user_id_seq OWNER TO xeno2;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.user_id_seq OWNED BY xeno2.users.id;


--
-- Name: user_nation; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.user_nation (
    user_id bigint NOT NULL,
    nation_id bigint NOT NULL
);


ALTER TABLE xeno2.user_nation OWNER TO xeno2;

--
-- Name: user_role; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.user_role (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE xeno2.user_role OWNER TO xeno2;

--
-- Name: weapon_class; Type: TABLE; Schema: xeno2; Owner: xeno2
--

CREATE TABLE xeno2.weapon_class (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE xeno2.weapon_class OWNER TO xeno2;

--
-- Name: weapon_class_id_seq; Type: SEQUENCE; Schema: xeno2; Owner: xeno2
--

CREATE SEQUENCE xeno2.weapon_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE xeno2.weapon_class_id_seq OWNER TO xeno2;

--
-- Name: weapon_class_id_seq; Type: SEQUENCE OWNED BY; Schema: xeno2; Owner: xeno2
--

ALTER SEQUENCE xeno2.weapon_class_id_seq OWNED BY xeno2.weapon_class.id;


--
-- Name: affinity_node id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.affinity_node ALTER COLUMN id SET DEFAULT nextval('xeno2.affinity_node_id_seq'::regclass);


--
-- Name: battle_role id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.battle_role ALTER COLUMN id SET DEFAULT nextval('xeno2.battle_role_id_seq'::regclass);


--
-- Name: blade_affinity_node id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_affinity_node ALTER COLUMN id SET DEFAULT nextval('xeno2.blade_affinity_node_id_seq'::regclass);


--
-- Name: blade_class id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_class ALTER COLUMN id SET DEFAULT nextval('xeno2.blade_class_id_seq'::regclass);


--
-- Name: blade_superclass id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_superclass ALTER COLUMN id SET DEFAULT nextval('xeno2.blade_superclass_id_seq'::regclass);


--
-- Name: driver id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.driver ALTER COLUMN id SET DEFAULT nextval('xeno2.driver_id_seq'::regclass);


--
-- Name: element id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.element ALTER COLUMN id SET DEFAULT nextval('xeno2.element_id_seq'::regclass);


--
-- Name: gender id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.gender ALTER COLUMN id SET DEFAULT nextval('xeno2.gender_id_seq'::regclass);


--
-- Name: merc_mission id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission ALTER COLUMN id SET DEFAULT nextval('xeno2.merc_mission_id_seq'::regclass);


--
-- Name: merc_mission_prerequisite id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_prerequisite ALTER COLUMN id SET DEFAULT nextval('xeno2.merc_mission_prerequisite_id_seq'::regclass);


--
-- Name: merc_mission_requirement id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement ALTER COLUMN id SET DEFAULT nextval('xeno2.merc_mission_requirement_id_seq'::regclass);


--
-- Name: nation id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.nation ALTER COLUMN id SET DEFAULT nextval('xeno2.nation_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.role ALTER COLUMN id SET DEFAULT nextval('xeno2.role_id_seq'::regclass);


--
-- Name: trust_rank id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.trust_rank ALTER COLUMN id SET DEFAULT nextval('xeno2.trust_rank_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.users ALTER COLUMN id SET DEFAULT nextval('xeno2.user_id_seq'::regclass);


--
-- Name: weapon_class id; Type: DEFAULT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.weapon_class ALTER COLUMN id SET DEFAULT nextval('xeno2.weapon_class_id_seq'::regclass);


--
-- Data for Name: affinity_node; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (1, 1, 'Dark Mastery', 'dark-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (2, 2, 'Earth Mastery', 'earth-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (3, 3, 'Electric Mastery', 'electric-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (4, 4, 'Fire Mastery', 'fire-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (5, 6, 'Light Mastery', 'light-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (6, 5, 'Ice Mastery', 'ice-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (7, 7, 'Water Mastery', 'water-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (8, 8, 'Wind Mastery', 'wind-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (9, 9, 'Agronomy', 'agronomy');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (10, 10, 'Botany', 'botany');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (11, 11, 'Entomology', 'entomology');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (12, 12, 'Forestry', 'forestry');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (13, 13, 'Ichthyology', 'ichthyology');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (14, 14, 'Mineralogy', 'mineralogy');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (15, 15, 'Salvaging Mastery', 'salvaging-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (16, 16, 'Ancient Wisdom', 'ancient-wisdom');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (17, 17, 'Focus', 'focus');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (18, 18, 'Fortitude', 'fortitude');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (19, 19, 'Girls'' Talk', 'girls-talk');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (20, 20, 'Keen Eye', 'keen-eye');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (21, 21, 'Leaping', 'leaping');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (22, 22, 'Lockpicking', 'lockpicking');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (23, 23, 'Nopon Wisdom', 'nopon-wisdom');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (24, 24, 'Superstrength', 'superstrength');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (25, 25, 'Expeditionist', 'expeditionist');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (26, 26, 'Industry Mastery', 'industry-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (27, 27, 'Info Collector', 'info-collector');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (28, 28, 'Production Mastery', 'production-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (29, 29, 'Transport Mastery', 'transport-mastery');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (30, 36, 'Cooking', 'cooking');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (31, 55, 'Weaving', 'weaving');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (32, 50, 'Patissier', 'patissier');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (33, 37, 'Dumpling Pro', 'dumpling-pro');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (34, 47, 'Miasma Dispersal', 'miasma-dispersal');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (35, 49, 'Passionate Soul', 'passionate-soul');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (36, 43, 'Justice-Loving Soul', 'justice-loving-soul');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (37, 44, 'Kind Soul', 'kind-soul');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (38, 30, 'Assassination', 'assassination');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (39, 52, 'Prospecting', 'prospecting');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (40, 40, 'Fleet of Foot', 'fleet-of-foot');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (41, 48, 'One Lucky Gal', 'one-lucky-gal');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (42, 34, 'Chivalry', 'chivalry');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (43, 41, 'Harmony', 'harmony');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (44, 51, 'Phonex Linguistics', 'phonex-linguistics');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (45, 38, 'Extra-Ancient Wisdom', 'extra-ancient-wisdom');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (46, 45, 'Mastery of Thunder', 'mastery-of-thunder');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (47, 32, 'Birdbrain', 'birdbrain');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (48, 31, 'Beguiling Charms', 'beguiling-charms');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (49, 53, 'Rampage', 'rampage');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (50, 33, 'Cavalier Attitude', 'cavalier-attitude');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (51, 35, 'Clairvoyant Eye', 'clairvoyant-eye');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (52, 54, 'Titan Weapon Wisdom', 'titan-weapon-wisdom');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (53, 39, 'Eye for Beauty', 'eye-for-beauty');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (54, 42, 'Icecraft', 'icecraft');
INSERT INTO xeno2.affinity_node (id, sort, name, slug) VALUES (55, 46, 'Mental Arithmetic', 'mental-arithmetic');


--
-- Data for Name: battle_role; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.battle_role (id, name, slug) VALUES (1, 'ATK', 'atk');
INSERT INTO xeno2.battle_role (id, name, slug) VALUES (2, 'TNK', 'tnk');
INSERT INTO xeno2.battle_role (id, name, slug) VALUES (3, 'HLR', 'hlr');


--
-- Data for Name: blade; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (39, 1, 1, 6, NULL, 49, 44, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (40, 1, 1, 6, NULL, 64, 44, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (41, 1, 3, 5, NULL, 45, 41, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (42, 1, 3, 6, NULL, 49, 44, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (43, 1, 3, 6, NULL, 49, 44, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (44, 1, 1, 6, NULL, 47, 44, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (45, 1, 4, 6, NULL, 49, 44, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (46, 1, 5, 6, NULL, 49, 44, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (47, 1, 1, 5, NULL, 38, 42, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (48, 1, 4, 6, NULL, 49, 44, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (49, 1, 5, 6, NULL, 71, 50, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (50, 1, 5, 5, NULL, 52, 43, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (51, 1, 4, 5, NULL, 46, 42, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (52, 1, 5, 6, NULL, 48, 44, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (53, 1, 4, 4, NULL, 39, 31, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (54, 1, 4, 5, NULL, 47, 39, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (55, 1, 5, 5, NULL, 55, 41, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (56, 1, 5, 4, NULL, 42, 30, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (57, 1, 5, 5, NULL, 34, 33, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (58, 1, 4, 6, NULL, 59, 44, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (59, 1, 1, 4, NULL, 50, 36, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (60, 1, 5, 6, NULL, 66, 46, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (61, 1, 4, 3, NULL, 34, 26, false, NULL, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (63, 1, 1, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (64, 1, 1, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (65, 1, 5, 4, NULL, 23, 22, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (66, 1, 5, 5, NULL, 17, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (67, 1, 4, 4, NULL, 13, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (68, 1, 5, 3, NULL, 9, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (69, 1, 5, 3, 134, 14, 14, false, NULL, 2, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (70, 1, 1, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (71, 1, 4, 2, NULL, 8, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (72, 1, 4, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (73, 1, 4, 4, NULL, 12, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (74, 1, 4, 3, NULL, 15, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (75, 1, 5, 4, NULL, 23, 22, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (77, 1, 5, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (78, 1, 5, 4, NULL, 18, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (79, 1, 5, 4, NULL, 13, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (80, 1, 4, 4, NULL, 27, 25, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (81, 1, 4, 3, NULL, 10, 11, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (82, 1, 5, 2, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (83, 1, 5, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (84, 1, 5, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (85, 1, 5, 2, NULL, 10, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (86, 1, 4, 1, NULL, 10, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (87, 1, 1, 6, NULL, 20, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (88, 1, 1, 4, NULL, 13, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (89, 1, 1, 6, NULL, 14, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (90, 1, 4, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (91, 1, 4, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (92, 1, 5, 5, NULL, 17, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (93, 1, 4, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (94, 1, 5, 4, NULL, 22, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (95, 1, 5, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (96, 1, 5, 4, NULL, 19, 19, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (97, 1, 4, 4, NULL, 20, 20, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (98, 1, 5, 1, NULL, 7, 6, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (99, 1, 4, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (100, 1, 1, 6, NULL, 20, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (101, 1, 1, 4, NULL, 8, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (102, 1, 1, 4, NULL, 10, 12, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (103, 1, 1, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (104, 1, 1, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (105, 1, 5, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (106, 1, 5, 4, NULL, 14, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (107, 1, 5, 3, NULL, 12, 12, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (108, 1, 5, 3, NULL, 10, 11, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (109, 1, 4, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (110, 1, 4, 3, NULL, 9, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (111, 1, 4, 1, NULL, 10, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (112, 1, 5, 4, NULL, 19, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (113, 1, 4, 6, NULL, 18, 19, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (114, 1, 4, 4, NULL, 18, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (115, 1, 1, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (116, 1, 1, 3, NULL, 12, 12, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (117, 1, 1, 5, NULL, 15, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (118, 1, 5, 2, NULL, 8, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (119, 1, 5, 5, NULL, 19, 20, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (120, 1, 4, 4, NULL, 13, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (121, 1, 4, 6, NULL, 27, 26, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (122, 1, 5, 3, NULL, 14, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (123, 1, 4, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (124, 1, 4, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (125, 1, 1, 5, NULL, 16, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (126, 1, 4, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (127, 1, 4, 4, NULL, 14, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (128, 1, 1, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (129, 1, 5, 5, NULL, 15, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (130, 1, 5, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (131, 1, 5, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (132, 1, 4, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (133, 1, 5, 4, NULL, 14, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (134, 1, 5, 2, NULL, 8, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (135, 1, 4, 6, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (136, 1, 4, 5, NULL, 23, 23, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (137, 1, 5, 1, 134, 8, 7, false, NULL, 3, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (138, 1, 5, 2, NULL, 9, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (139, 1, 5, 3, NULL, 11, 12, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (140, 1, 4, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (141, 1, 4, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (142, 1, 4, 4, NULL, 18, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (144, 1, 5, 3, NULL, 13, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (145, 1, 5, 5, NULL, 23, 23, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (146, 1, 5, 4, NULL, 24, 23, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (147, 1, 5, 4, NULL, 22, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (148, 1, 5, 4, NULL, 18, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (149, 1, 5, 6, NULL, 32, 30, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (150, 1, 4, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (151, 1, 1, 6, NULL, 22, 22, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (152, 1, 1, 6, NULL, 17, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (153, 1, 4, 2, 134, 8, 9, false, NULL, 1, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (154, 1, 4, 1, 134, 8, 7, false, NULL, 5, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (155, 1, 4, 3, NULL, 14, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (156, 1, 4, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (157, 1, 5, 5, NULL, 23, 23, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (158, 1, 5, 4, NULL, 14, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (159, 1, 4, 2, NULL, 12, 11, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (160, 1, 5, 3, NULL, 8, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (161, 1, 5, 4, NULL, 17, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (162, 1, 4, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (163, 1, 2, 6, NULL, 49, 44, false, 3, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (164, 1, 2, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (165, 1, 2, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (166, 1, 2, 5, NULL, 20, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (167, 1, 2, 2, NULL, 9, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (168, 1, 2, 4, NULL, 43, 33, false, 21, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (169, 1, 2, 6, NULL, 15, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (170, 1, 2, 4, NULL, 19, 19, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (171, 1, 2, 3, NULL, 9, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (172, 1, 2, 3, NULL, 15, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (173, 1, 2, 4, NULL, 20, 20, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (174, 1, 2, 3, NULL, 8, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (175, 1, 2, 3, NULL, 17, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (176, 1, 2, 5, NULL, 25, 25, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (177, 1, 2, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (178, 1, 2, 5, NULL, 19, 21, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (179, 1, 2, 4, NULL, 14, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (180, 1, 2, 4, NULL, 17, 17, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (181, 1, 2, 5, NULL, 29, 28, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (182, 1, 2, 6, NULL, 16, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (183, 1, 2, 3, NULL, 12, 12, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (184, 1, 2, 4, NULL, 24, 23, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (185, 1, 2, 3, NULL, 15, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (186, 1, 2, 2, NULL, 8, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (187, 1, 2, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (188, 1, 2, 2, NULL, 10, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (189, 1, 2, 4, NULL, 18, 18, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (190, 1, 2, 3, NULL, 12, 13, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (191, 1, 2, 1, NULL, 8, 7, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (192, 1, 2, 3, NULL, 12, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (193, 1, 2, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (194, 1, 2, 4, NULL, 13, 14, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (195, 1, 2, 6, NULL, 27, 26, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (196, 1, 2, 3, NULL, 8, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (197, 1, 2, 5, NULL, 44, 40, false, 23, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (199, 1, 2, 4, NULL, 25, 24, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (200, 1, 2, 5, NULL, 23, 23, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (201, 1, 2, 3, NULL, 12, 12, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (202, 1, 2, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (203, 1, 2, 2, NULL, 9, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (204, 1, 2, 4, NULL, 15, 16, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (205, 1, 2, 3, NULL, 8, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (206, 1, 2, 3, NULL, 8, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (207, 1, 2, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (208, 1, 2, 2, NULL, 8, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (209, 1, 4, 1, NULL, 9, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (210, 1, 5, 1, NULL, 12, 10, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (211, 1, 5, 4, NULL, 43, 28, false, 25, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (212, 5, 1, 6, NULL, 1, 1, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (213, 6, 2, 3, NULL, 31, 20, false, 19, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (214, 6, 2, 2, NULL, 9, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (215, 6, 1, 3, NULL, 30, 19, false, 15, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (216, 6, 1, 4, NULL, 45, 28, false, 1, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (217, 6, 2, 4, NULL, 29, 27, false, 3, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (218, 6, 3, 4, NULL, 38, 34, false, 4, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (219, 6, 3, 3, NULL, 13, 13, false, 5, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (220, 1, 4, 1, NULL, 9, 8, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (221, 1, 4, 3, NULL, 10, 11, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (222, 1, 4, 5, NULL, 44, 40, false, 31, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (223, 1, 4, 5, 134, 53, 43, true, 24, 0, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (224, 1, 4, 1, NULL, 15, 15, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (225, 1, 4, 5, NULL, 54, 40, false, 20, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (226, 8, 1, 6, NULL, 64, 44, false, 1, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (227, 8, 3, 6, NULL, 49, 44, false, 4, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (228, 1, 5, 5, NULL, 50, 41, false, 28, NULL, true);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (229, 8, 2, 6, NULL, 47, 44, false, 3, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (230, 1, 5, 1, NULL, 10, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (231, 8, 3, 5, NULL, 48, 43, false, 6, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (232, 8, 3, 6, NULL, 49, 44, false, 5, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (233, 1, 5, 1, NULL, 10, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (234, 8, 1, 6, NULL, 47, 44, false, 8, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (235, 1, 5, 2, 134, 10, 10, false, NULL, 4, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (236, 8, 2, 5, NULL, 53, 43, false, 28, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (237, 8, 1, 6, NULL, 71, 44, false, 26, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (238, 8, 2, 5, NULL, 48, 39, false, 12, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (239, 8, 2, 5, NULL, 53, 40, false, 21, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (240, 8, 1, 5, NULL, 48, 43, false, 31, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (241, 8, 1, 5, NULL, 45, 37, false, 18, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (242, 8, 2, 6, NULL, 56, 44, false, 22, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (243, 8, 1, 5, NULL, 57, 42, false, 15, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (244, 8, 1, 4, NULL, 45, 36, false, 36, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (245, 8, 1, 5, NULL, 44, 32, false, 20, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (246, 8, 2, 5, NULL, 57, 42, false, 16, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (247, 8, 2, 5, NULL, 48, 43, false, 32, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (248, 8, 2, 5, NULL, 44, 40, false, 23, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (249, 8, 2, 5, NULL, 58, 44, false, 19, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (250, 8, 4, 5, NULL, 55, 41, false, 11, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (251, 8, 1, 5, NULL, 64, 45, false, 27, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (252, 8, 2, 5, NULL, 50, 41, false, 35, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (253, 1, 5, 1, NULL, 10, 9, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (254, 8, 2, 3, NULL, 10, 11, false, NULL, NULL, false);
INSERT INTO xeno2.blade (id, user_id, driver_id, trust_id, merc_mission_id, strength, affinity, is_merc_leader, from_template_id, merc_team_position, in_party) VALUES (256, 1, 4, 5, NULL, 41, 29, false, 255, NULL, true);


--
-- Data for Name: blade_affinity_node; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (1, 1, 4, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (2, 1, 17, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (3, 1, 30, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (4, 2, 5, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (5, 2, 17, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (6, 2, 19, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (7, 3, 7, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (8, 3, 10, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (9, 4, 21, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (10, 4, 23, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (11, 4, 24, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (12, 5, 22, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (13, 5, 18, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (14, 5, 9, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (15, 6, 20, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (16, 6, 16, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (17, 6, 12, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (18, 7, 3, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (19, 7, 22, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (20, 7, 13, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (21, 8, 8, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (22, 8, 34, 0, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (23, 8, 22, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (24, 9, 4, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (25, 9, 20, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (26, 9, 14, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (27, 10, 7, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (28, 10, 16, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (29, 10, 21, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (30, 11, 11, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (31, 11, 21, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (32, 11, 47, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (33, 12, 1, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (34, 12, 21, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (35, 12, 38, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (36, 13, 10, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (37, 13, 2, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (38, 13, 48, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (39, 14, 50, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (40, 14, 23, 0, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (41, 14, 16, 0, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (42, 14, 14, 0, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (43, 15, 1, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (44, 15, 10, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (45, 15, 51, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (46, 16, 2, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (47, 16, 13, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (48, 16, 44, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (49, 17, 3, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (50, 17, 17, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (51, 17, 46, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (52, 18, 6, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (53, 18, 16, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (54, 18, 42, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (55, 19, 8, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (56, 19, 20, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (57, 19, 45, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (58, 20, 24, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (59, 20, 15, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (60, 20, 52, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (61, 21, 20, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (62, 21, 18, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (63, 21, 32, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (64, 22, 19, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (65, 22, 3, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (66, 22, 22, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (67, 23, 12, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (68, 23, 18, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (69, 23, 33, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (70, 24, 23, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (71, 24, 15, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (72, 24, 40, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (73, 25, 1, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (74, 25, 31, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (75, 25, 19, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (76, 26, 24, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (77, 26, 2, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (78, 26, 17, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (79, 27, 3, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (80, 27, 24, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (81, 27, 49, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (82, 28, 35, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (83, 28, 36, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (84, 28, 37, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (85, 29, 8, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (86, 29, 24, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (87, 29, 21, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (88, 30, 19, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (89, 30, 7, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (90, 30, 15, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (91, 31, 6, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (92, 31, 17, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (93, 31, 23, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (94, 32, 19, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (95, 32, 22, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (96, 32, 53, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (97, 33, 39, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (98, 33, 14, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (99, 33, 20, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (100, 34, 23, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (101, 34, 9, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (102, 34, 41, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (103, 35, 12, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (104, 35, 6, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (105, 35, 54, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (106, 36, 43, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (107, 36, 13, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (108, 36, 18, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (109, 37, 5, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (110, 37, 22, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (111, 37, 55, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (112, 38, 7, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (113, 38, 12, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (114, 38, 18, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (115, 39, 5, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (116, 39, 17, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (117, 39, 19, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (118, 40, 4, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (119, 40, 17, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (120, 40, 30, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (121, 41, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (122, 41, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (123, 41, 24, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (124, 42, 22, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (125, 42, 18, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (126, 42, 9, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (127, 43, 20, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (128, 43, 16, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (129, 43, 12, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (130, 44, 8, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (131, 44, 34, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (132, 44, 22, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (133, 45, 4, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (134, 45, 20, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (135, 45, 14, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (136, 46, 3, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (137, 46, 22, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (138, 46, 13, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (139, 47, 7, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (140, 47, 12, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (141, 47, 18, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (142, 48, 7, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (143, 48, 16, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (144, 48, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (145, 49, 24, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (146, 49, 2, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (147, 49, 17, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (148, 50, 1, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (149, 50, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (150, 50, 38, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (151, 51, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (152, 51, 9, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (153, 51, 41, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (154, 52, 19, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (155, 52, 7, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (156, 52, 15, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (157, 53, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (158, 53, 16, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (159, 53, 42, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (160, 54, 19, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (161, 54, 3, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (162, 54, 22, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (163, 55, 1, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (164, 55, 10, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (165, 55, 51, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (166, 56, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (167, 56, 13, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (168, 56, 44, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (169, 57, 19, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (170, 57, 22, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (171, 57, 53, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (172, 58, 11, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (173, 58, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (174, 58, 47, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (175, 59, 10, 4, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (176, 59, 2, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (177, 59, 48, 1, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (178, 60, 3, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (179, 60, 24, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (180, 60, 49, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (181, 61, 12, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (182, 61, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (183, 61, 54, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (186, 63, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (187, 64, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (188, 65, 6, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (189, 66, 1, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (190, 66, 26, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (191, 67, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (192, 68, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (193, 69, 2, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (194, 69, 12, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (195, 70, 7, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (196, 70, 11, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (197, 71, 4, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (198, 72, 8, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (199, 73, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (200, 73, 13, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (201, 74, 3, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (202, 74, 10, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (203, 75, 7, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (204, 75, 29, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (207, 77, 6, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (208, 78, 4, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (209, 78, 28, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (210, 79, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (211, 80, 8, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (212, 80, 12, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (213, 80, 9, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (214, 81, 8, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (215, 82, 4, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (216, 82, 25, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (217, 83, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (218, 83, 27, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (219, 84, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (220, 85, 1, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (221, 85, 29, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (222, 86, 6, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (223, 86, 11, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (224, 87, 3, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (225, 87, 15, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (226, 87, 10, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (227, 88, 4, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (228, 89, 1, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (229, 89, 25, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (230, 90, 7, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (231, 90, 10, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (232, 91, 4, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (233, 91, 14, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (234, 92, 1, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (235, 92, 13, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (236, 93, 3, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (237, 94, 1, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (238, 94, 15, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (239, 95, 1, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (240, 96, 8, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (241, 96, 25, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (242, 97, 7, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (243, 98, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (244, 99, 4, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (245, 99, 13, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (246, 100, 7, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (247, 100, 14, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (248, 100, 15, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (249, 101, 1, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (250, 102, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (251, 103, 3, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (252, 103, 12, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (253, 104, 6, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (254, 105, 7, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (255, 106, 6, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (256, 107, 8, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (257, 108, 4, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (258, 108, 11, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (259, 109, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (260, 110, 6, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (261, 111, 4, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (262, 112, 1, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (263, 112, 27, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (264, 113, 2, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (265, 113, 25, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (266, 113, 10, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (267, 114, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (268, 114, 11, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (269, 115, 4, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (270, 116, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (271, 117, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (272, 117, 15, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (273, 118, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (274, 119, 1, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (275, 119, 26, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (276, 119, 25, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (277, 120, 8, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (278, 120, 9, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (279, 121, 4, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (280, 121, 15, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (281, 122, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (282, 122, 26, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (283, 123, 1, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (284, 124, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (285, 124, 12, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (286, 125, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (287, 125, 10, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (288, 126, 7, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (289, 127, 7, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (290, 128, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (291, 129, 6, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (292, 130, 2, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (293, 131, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (294, 131, 11, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (295, 132, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (296, 132, 10, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (297, 133, 1, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (298, 134, 7, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (299, 135, 7, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (300, 135, 15, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (301, 136, 4, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (302, 136, 14, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (303, 137, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (304, 138, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (305, 138, 10, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (306, 139, 3, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (307, 140, 1, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (308, 141, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (309, 142, 2, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (310, 142, 14, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (313, 144, 4, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (314, 145, 6, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (315, 145, 26, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (316, 145, 28, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (317, 146, 1, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (318, 146, 25, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (319, 147, 3, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (320, 147, 25, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (321, 148, 3, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (322, 148, 14, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (323, 149, 3, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (324, 149, 28, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (325, 149, 27, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (326, 150, 4, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (327, 151, 8, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (328, 152, 1, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (329, 153, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (330, 153, 9, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (331, 154, 8, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (332, 155, 4, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (333, 155, 15, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (334, 156, 3, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (335, 156, 15, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (336, 157, 1, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (337, 157, 25, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (338, 157, 10, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (339, 158, 1, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (340, 158, 25, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (341, 159, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (342, 160, 6, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (343, 161, 4, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (344, 161, 27, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (345, 162, 4, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (346, 163, 7, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (347, 163, 10, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (348, 163, 16, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (349, 164, 8, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (350, 165, 6, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (351, 165, 10, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (352, 166, 2, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (353, 166, 27, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (354, 167, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (355, 167, 12, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (356, 167, 13, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (357, 168, 20, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (358, 168, 18, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (359, 168, 32, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (360, 169, 6, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (361, 170, 3, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (362, 170, 15, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (363, 171, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (364, 172, 6, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (365, 172, 11, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (366, 173, 2, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (367, 173, 13, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (368, 174, 6, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (369, 175, 6, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (370, 175, 10, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (371, 176, 7, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (372, 176, 10, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (373, 176, 25, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (374, 177, 1, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (375, 177, 10, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (376, 178, 6, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (377, 178, 14, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (378, 178, 11, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (379, 179, 3, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (380, 179, 9, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (381, 180, 4, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (382, 181, 7, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (383, 181, 13, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (384, 182, 4, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (385, 182, 27, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (386, 183, 8, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (387, 184, 7, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (388, 185, 2, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (389, 185, 9, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (390, 186, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (391, 186, 12, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (392, 187, 4, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (393, 187, 13, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (394, 188, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (395, 188, 29, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (396, 189, 4, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (397, 189, 26, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (398, 190, 1, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (399, 190, 11, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (400, 191, 2, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (401, 192, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (402, 192, 29, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (403, 193, 4, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (404, 193, 15, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (405, 194, 8, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (406, 195, 1, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (407, 195, 15, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (408, 195, 14, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (409, 196, 4, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (410, 197, 12, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (411, 197, 18, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (412, 197, 33, 1, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (415, 199, 3, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (416, 199, 29, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (417, 199, 14, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (418, 200, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (419, 200, 15, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (420, 201, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (421, 201, 29, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (422, 202, 4, 2, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (423, 202, 15, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (424, 203, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (425, 204, 8, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (426, 205, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (427, 205, 25, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (428, 206, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (429, 206, 25, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (430, 207, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (431, 207, 29, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (432, 208, 3, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (433, 209, 6, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (434, 210, 4, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (435, 210, 9, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (436, 210, 12, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (437, 211, 1, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (438, 211, 31, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (439, 211, 19, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (440, 213, 8, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (441, 213, 20, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (442, 213, 45, 2, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (443, 214, 3, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (444, 214, 29, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (445, 215, 1, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (446, 215, 10, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (447, 215, 51, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (448, 216, 4, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (449, 216, 17, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (450, 216, 30, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (451, 217, 7, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (452, 217, 10, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (453, 217, 16, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (454, 218, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (455, 218, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (456, 218, 24, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (457, 219, 22, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (458, 219, 18, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (459, 219, 9, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (460, 220, 6, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (461, 220, 29, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (462, 221, 7, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (463, 221, 15, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (464, 221, 27, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (465, 222, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (466, 222, 17, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (467, 222, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (468, 223, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (469, 223, 15, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (470, 223, 40, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (471, 224, 7, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (472, 224, 25, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (473, 225, 24, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (474, 225, 15, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (475, 225, 52, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (476, 226, 4, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (477, 226, 17, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (478, 226, 30, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (479, 227, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (480, 227, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (481, 227, 24, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (482, 228, 35, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (483, 228, 36, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (484, 228, 37, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (485, 229, 7, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (486, 229, 10, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (487, 230, 3, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (488, 230, 15, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (489, 230, 27, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (490, 231, 20, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (491, 231, 16, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (492, 231, 12, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (493, 232, 22, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (494, 232, 18, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (495, 232, 9, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (496, 233, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (497, 233, 26, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (498, 233, 25, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (499, 234, 8, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (500, 234, 34, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (501, 234, 22, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (502, 235, 8, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (503, 235, 26, 1, 2);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (504, 235, 29, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (505, 236, 35, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (506, 236, 36, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (507, 236, 37, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (508, 237, 24, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (509, 237, 2, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (510, 237, 17, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (511, 238, 1, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (512, 238, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (513, 238, 38, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (514, 239, 20, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (515, 239, 18, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (516, 239, 32, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (517, 240, 6, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (518, 240, 17, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (519, 240, 23, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (520, 241, 6, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (521, 241, 16, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (522, 241, 42, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (523, 242, 19, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (524, 242, 3, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (525, 242, 22, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (526, 243, 1, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (527, 243, 10, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (528, 243, 51, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (529, 244, 43, 4, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (530, 244, 13, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (531, 244, 18, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (532, 245, 24, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (533, 245, 15, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (534, 245, 52, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (535, 246, 2, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (536, 246, 13, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (537, 246, 44, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (538, 247, 19, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (539, 247, 22, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (540, 247, 53, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (541, 248, 12, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (542, 248, 18, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (543, 248, 33, 1, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (544, 249, 8, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (545, 249, 20, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (546, 249, 45, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (547, 250, 11, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (548, 250, 21, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (549, 250, 47, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (550, 251, 3, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (551, 251, 24, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (552, 251, 49, 5, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (553, 252, 12, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (554, 252, 6, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (555, 252, 54, 2, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (556, 253, 2, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (557, 253, 25, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (558, 253, 29, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (559, 254, 3, 1, 1);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (560, 255, 11, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (561, 255, 15, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (562, 255, 24, 0, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (563, 256, 11, 3, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (564, 256, 15, 1, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (565, 256, 24, 3, 5);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (566, 257, 15, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (567, 257, 20, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (568, 257, 16, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (569, 258, 13, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (570, 258, 18, 0, 3);
INSERT INTO xeno2.blade_affinity_node (id, blade_id, affinity_node_id, level, max_level) VALUES (571, 258, 23, 0, 3);


--
-- Data for Name: blade_class; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.blade_class (id, name, slug) VALUES (1, 'Humanoid', 'humanoid');
INSERT INTO xeno2.blade_class (id, name, slug) VALUES (2, 'Animal', 'animal');


--
-- Data for Name: blade_superclass; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (1, 1, 2, 1, 1, false, NULL, 5, 44, false, 'Pyra', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (2, 7, 2, 1, 1, false, NULL, 5, 44, false, 'Mythra', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (3, 2, 3, 3, 15, false, NULL, 5, 44, false, 'Dromarch', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (4, 5, 2, 2, 5, false, NULL, 5, 44, false, 'Poppi ɑ', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (5, 1, 2, 2, 11, false, NULL, 5, 44, false, 'Poppi QT', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (6, 3, 2, 2, 16, false, NULL, 5, 44, false, 'Poppi QTπ', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (7, 6, 2, 1, 2, false, NULL, 5, 44, false, 'Pandoria', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (8, 4, 1, 1, 7, true, 'Roc & the Roquettes', 5, 44, false, 'Roc', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (9, 1, 2, 2, 17, false, NULL, 5, 44, false, 'Brighid', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (10, 2, 1, 2, 4, true, 'Hecatonics', 5, 44, false, 'Aegaeon', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (11, 4, 2, 2, 14, true, 'Albatrojans', 5, 44, true, 'Finch', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (12, 8, 1, 2, 4, true, 'Banners of Flame', 5, 44, true, 'Perceval', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (13, 5, 1, 3, 3, true, 'Florentrancers', 5, 44, true, 'Floren', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (14, 1, 1, 1, 9, true, '6th Royal Legion', 5, 44, true, 'Dagas', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (15, 8, 2, 1, 8, true, 'Shadow Puppets', 5, 44, true, 'Azami', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (16, 5, 2, 3, 10, true, 'Dandy Lions', 5, 44, true, 'Nim', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (17, 6, 2, 2, 14, true, 'Zapmeisters', 5, 44, true, 'Electra', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (18, 3, 2, 1, 12, true, 'Ardent Lancers', 5, 44, true, 'Perun', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (19, 4, 2, 3, 10, true, 'Contrarians', 5, 44, true, 'Adenine', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (20, 1, 2, 2, 4, true, 'Battle Cruisers', 5, 44, true, 'Newt', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (21, 2, 1, 1, 9, true, 'Flying Merfolk', 5, 44, true, 'Gorg', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (22, 6, 2, 3, 10, true, 'Breeze Shooters', 5, 44, true, 'Kora', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (23, 6, 2, 3, 3, true, 'Ting-a-Ling Troupe', 5, 44, true, 'Vess', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (24, 4, 1, 3, 3, true, 'Voracious Vanguard', 5, 44, true, 'Boreas', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (25, 8, 2, 1, 1, true, 'Slayswords', 5, 44, true, 'Vale', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (26, 5, 1, 1, 12, true, 'Gungnir Wardens', 5, 44, true, 'Wulfric', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (27, 6, 2, 1, 8, true, 'Valkyr Legion', 5, 44, true, 'Herald', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (28, 3, 1, 2, 14, true, 'Bravest of the Brave', 5, 44, true, 'Godfrey', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (29, 4, 2, 1, 9, true, 'Boss Buster Band', 5, 44, true, 'Zenobia', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (30, 2, 2, 1, 12, true, 'Gutsy Glaives', 5, 44, true, 'Praxis', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (31, 3, 2, 2, 4, true, 'Purificators', 5, 44, true, 'Theory', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (32, 2, 2, 1, 8, true, 'Royal Teas', 5, 44, true, 'Sheba', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (33, 5, 2, 1, 9, true, 'Frontier Falcons', 5, 44, true, 'Agate', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (34, 8, 2, 2, 14, true, 'Arrowroot Company', 5, 44, true, 'Kasandra', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (35, 3, 2, 3, 3, true, 'Perennial Beauties', 5, 44, true, 'Dahlia', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (36, 3, 2, 3, 10, true, 'Ursula''s New Groove', 5, 44, true, 'Ursula', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (37, 7, 2, 1, 8, true, 'Erde Kaisers', 5, 44, true, 'KOS-MOS', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (38, 2, 2, 3, 18, false, NULL, 5, 44, false, 'Nia', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (39, 7, 2, 1, 1, false, NULL, 5, 44, false, 'Mythra', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (40, 1, 2, 1, 1, false, NULL, 5, 44, false, 'Pyra', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (41, 5, 2, 2, 5, false, NULL, 5, 44, false, 'Poppi ɑ', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (42, 1, 2, 2, 11, false, NULL, 5, 44, false, 'Poppi QT', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (43, 3, 2, 2, 16, false, NULL, 5, 44, false, 'Poppi QTπ', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (44, 4, 1, 1, 7, true, 'Roc & the Roquettes', 5, 44, false, 'Roc', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (45, 1, 2, 2, 17, false, NULL, 5, 44, false, 'Brighid', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (46, 6, 2, 1, 2, false, NULL, 5, 44, false, 'Pandoria', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (47, 2, 2, 3, 18, false, NULL, 5, 44, false, 'Nia', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (48, 2, 1, 2, 4, true, 'Hecatonics', 5, 44, false, 'Aegaeon', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (49, 5, 1, 1, 12, true, 'Gungnir Wardens', 5, 50, true, 'Wulfric', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (50, 8, 1, 2, 4, true, 'Banners of Flame', 5, 44, true, 'Perceval', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (51, 8, 2, 2, 14, true, 'Arrowroot Company', 5, 44, true, 'Kasandra', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (52, 2, 2, 1, 12, true, 'Gutsy Glaives', 5, 44, true, 'Praxis', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (53, 3, 2, 1, 12, true, 'Ardent Lancers', 5, 44, true, 'Perun', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (54, 6, 2, 3, 10, true, 'Breeze Shooters', 5, 44, true, 'Kora', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (55, 8, 2, 1, 8, true, 'Shadow Puppets', 5, 44, true, 'Azami', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (56, 5, 2, 3, 10, true, 'Dandy Lions', 5, 44, true, 'Nim', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (57, 2, 2, 1, 8, true, 'Royal Teas', 5, 44, true, 'Sheba', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (58, 4, 2, 2, 14, true, 'Albatrojans', 5, 44, true, 'Finch', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (59, 5, 1, 3, 3, true, 'Florentrancers', 5, 44, true, 'Floren', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (60, 6, 2, 1, 8, true, 'Valkyr Legion', 5, 46, true, 'Herald', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (61, 3, 2, 3, 3, true, 'Perennial Beauties', 5, 44, true, 'Dahlia', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (63, 6, 3, 3, 15, true, NULL, 2, 21, true, 'Orochi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (64, 6, 3, 3, 15, true, NULL, 2, 20, true, 'Jin Rai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (65, 3, 3, 3, 15, true, NULL, 3, 31, true, 'Shippun', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (66, 8, 3, 3, 15, true, NULL, 2, 22, true, 'Tamon', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (67, 5, 3, 3, 15, true, NULL, 1, 17, true, 'Kagero', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (68, 8, 3, 3, 15, true, NULL, 3, 32, true, 'Shigan', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (69, 5, 3, 3, 15, true, NULL, 3, 29, true, 'Kontro', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (70, 2, 1, 1, 9, true, NULL, 2, 19, true, 'Konjiki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (71, 1, 1, 1, 9, true, NULL, 2, 24, true, 'Ryo', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (72, 4, 2, 1, 9, true, NULL, 2, 19, true, 'Tomae', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (73, 5, 1, 1, 9, true, NULL, 1, 15, true, 'Shikiso', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (74, 6, 1, 1, 9, true, NULL, 2, 25, true, 'Musashi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (75, 2, 1, 1, 9, true, NULL, 2, 26, true, 'Hakusui', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (77, 3, 1, 1, 9, true, NULL, 2, 20, true, 'Zeku', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (78, 1, 1, 1, 9, true, NULL, 2, 22, true, 'Hakuto', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (79, 3, 2, 1, 9, true, NULL, 1, 16, true, 'Botania', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (80, 4, 2, 1, 9, true, NULL, 2, 28, true, 'Ai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (81, 4, 1, 1, 9, true, NULL, 1, 15, true, 'Rogen', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (82, 1, 2, 1, 9, true, NULL, 2, 19, true, 'Nosuri', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (83, 5, 2, 1, 9, true, NULL, 1, 18, true, 'Yura', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (84, 8, 2, 1, 9, true, NULL, 2, 27, true, 'Nenoh', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (85, 8, 1, 1, 9, true, NULL, 2, 26, true, 'Sulgar', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (86, 3, 2, 1, 9, true, NULL, 3, 35, true, 'Chigusa', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (87, 6, 1, 1, 12, true, NULL, 2, 21, true, 'Ranmaru', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (88, 1, 1, 1, 12, true, NULL, 1, 16, true, 'Zeno', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (89, 8, 2, 1, 12, true, NULL, 1, 16, true, 'Shussu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (90, 2, 1, 1, 12, true, NULL, 2, 19, true, 'Okina', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (91, 1, 1, 1, 12, true, NULL, 1, 18, true, 'Ichiro', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (92, 8, 2, 1, 12, true, NULL, 2, 20, true, 'Mutsuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (93, 6, 1, 1, 12, true, NULL, 2, 21, true, 'Kanemitsu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (94, 8, 2, 1, 12, true, NULL, 2, 23, true, 'Shirayuri', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (95, 8, 1, 1, 12, true, NULL, 1, 18, true, 'Hekireki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (96, 4, 1, 1, 12, true, NULL, 2, 21, true, 'Bengara', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (97, 2, 1, 1, 1, true, NULL, 2, 21, true, 'Hayabusa', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (98, 8, 2, 1, 12, true, NULL, 2, 21, true, 'Yayoi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (99, 1, 1, 1, 12, true, NULL, 2, 27, true, 'Denko', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (100, 2, 1, 1, 8, true, NULL, 2, 21, true, 'Kanehira', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (101, 8, 2, 1, 8, true, NULL, 1, 12, true, 'Kaeda', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (102, 3, 2, 1, 8, true, NULL, 1, 16, true, 'Isuzu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (103, 6, 1, 1, 8, true, NULL, 2, 19, true, 'Arai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (104, 3, 1, 1, 8, true, NULL, 1, 18, true, 'Huga', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (105, 2, 2, 1, 8, true, NULL, 2, 21, true, 'Mochi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (106, 3, 1, 1, 8, true, NULL, 2, 27, true, 'Mejiro', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (107, 4, 1, 1, 8, true, NULL, 2, 25, true, 'Akebono', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (108, 1, 1, 1, 8, true, NULL, 2, 21, true, 'Musou', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (109, 6, 2, 1, 8, true, NULL, 3, 29, true, 'Faera', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (110, 3, 2, 1, 8, true, NULL, 2, 28, true, 'Miyuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (111, 1, 2, 1, 8, true, NULL, 2, 28, true, 'Orka', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (112, 8, 2, 1, 8, true, NULL, 3, 29, true, 'Ruri', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (113, 5, 2, 2, 14, true, NULL, 2, 19, true, 'Sakuya', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (114, 3, 1, 2, 14, true, NULL, 2, 20, true, 'Sohaya', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (115, 1, 1, 2, 14, true, NULL, 1, 16, true, 'Tenku', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (116, 6, 1, 2, 14, true, NULL, 2, 23, true, 'Shiden', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (117, 3, 1, 2, 14, true, NULL, 1, 18, true, 'Yanagi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (118, 5, 1, 2, 14, true, NULL, 2, 22, true, 'Genno', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (119, 8, 1, 2, 14, true, NULL, 2, 21, true, 'Sordai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (120, 4, 1, 2, 14, true, NULL, 1, 18, true, 'Meikyo', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (121, 1, 2, 2, 14, true, NULL, 2, 26, true, 'Shimoki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (122, 6, 1, 2, 14, true, NULL, 2, 28, true, 'Tadar', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (123, 8, 1, 2, 14, true, NULL, 2, 27, true, 'Kokras', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (124, 5, 2, 2, 14, true, NULL, 2, 28, true, 'Setsuka', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (125, 5, 1, 2, 4, true, NULL, 1, 18, true, 'Yamato', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (126, 2, 2, 2, 4, true, NULL, 2, 27, true, 'Hisui', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (127, 2, 1, 2, 4, true, NULL, 1, 17, true, 'Kanesada', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (128, 3, 2, 2, 4, true, NULL, 1, 16, true, 'Mika', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (129, 3, 2, 2, 4, true, NULL, 2, 20, true, 'Kyoka', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (130, 5, 1, 2, 4, true, NULL, 2, 20, true, 'Izayoi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (131, 5, 1, 2, 4, true, NULL, 2, 21, true, 'Hanni', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (132, 8, 1, 2, 4, true, NULL, 2, 21, true, 'Fugetsu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (133, 8, 1, 2, 4, true, NULL, 1, 16, true, 'Akatsuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (134, 2, 1, 2, 4, true, NULL, 2, 20, true, 'Kaibyaku', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (135, 2, 1, 2, 4, true, NULL, 1, 16, true, 'Shishi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (136, 1, 1, 2, 4, true, NULL, 2, 24, true, 'Issen', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (137, 5, 1, 2, 4, true, NULL, 3, 31, true, 'Yumo', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (138, 8, 1, 2, 4, true, NULL, 2, 22, true, 'Mugen', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (139, 6, 1, 2, 4, true, NULL, 2, 26, true, 'Soten', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (140, 8, 2, 2, 4, true, NULL, 3, 32, true, 'Satsuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (141, 8, 2, 2, 4, true, NULL, 2, 27, true, 'Tsugumi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (142, 5, 2, 3, 3, true, NULL, 2, 20, true, 'Anzu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (144, 1, 1, 3, 3, true, NULL, 1, 15, true, 'Ikazuchi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (145, 3, 1, 3, 3, true, NULL, 2, 24, true, 'Hayate', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (146, 8, 2, 3, 3, true, NULL, 2, 25, true, 'Karei', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (147, 6, 1, 3, 3, true, NULL, 2, 26, true, 'Shiko', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (148, 6, 1, 3, 3, true, NULL, 2, 19, true, 'Yasha', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (149, 6, 1, 3, 3, true, NULL, 3, 30, true, 'Oboro', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (150, 1, 1, 3, 3, true, NULL, 2, 27, true, 'Kur', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (151, 4, 2, 3, 10, true, NULL, 2, 22, false, 'Umi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (152, 8, 2, 3, 10, true, NULL, 1, 18, true, 'Tsubaki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (153, 5, 2, 3, 10, true, NULL, 3, 31, true, 'Madoka', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (154, 4, 1, 3, 10, true, NULL, 2, 22, true, 'Mikazuchi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (155, 1, 1, 3, 10, true, NULL, 3, 34, true, 'Sohmei', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (156, 6, 1, 3, 10, true, NULL, 2, 19, true, 'Gokuto', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (157, 8, 1, 3, 10, true, NULL, 2, 24, true, 'Krogane', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (158, 8, 2, 3, 10, true, NULL, 1, 18, true, 'Tsura', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (159, 5, 2, 3, 10, true, NULL, 1, 17, true, 'Hinagetsu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (160, 3, 1, 3, 10, true, NULL, 2, 19, true, 'Mu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (161, 1, 2, 3, 10, true, NULL, 2, 23, true, 'Wakaba', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (162, 1, 1, 3, 10, true, NULL, 2, 28, true, 'Kibitsu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (163, 2, 3, 3, 15, false, NULL, 5, 44, false, 'Dromarch', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (164, 4, 3, 3, 15, true, NULL, 1, 17, true, 'Mior', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (165, 3, 3, 3, 15, true, NULL, 2, 26, true, 'Hiken', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (166, 5, 3, 3, 15, true, NULL, 2, 21, true, 'Hutar', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (167, 6, 3, 3, 15, true, NULL, 2, 26, true, 'Kogarashi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (168, 2, 1, 1, 9, true, 'Flying Merfolk', 5, 44, true, 'Gorg', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (169, 3, 2, 1, 9, true, NULL, 1, 17, true, 'Nadeshiko', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (170, 6, 1, 1, 9, true, NULL, 2, 26, true, 'Azai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (171, 8, 2, 1, 9, true, NULL, 2, 21, true, 'Yoiyami', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (172, 3, 1, 1, 9, true, NULL, 2, 23, true, 'Seimei', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (173, 5, 2, 1, 9, true, NULL, 2, 23, true, 'Suzukaze', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (174, 3, 2, 1, 9, true, NULL, 2, 23, true, 'Kokutan', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (175, 3, 2, 1, 9, true, NULL, 2, 20, true, 'Sazami', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (176, 2, 2, 1, 12, true, NULL, 2, 26, true, 'Kanon', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (177, 8, 1, 1, 12, true, NULL, 1, 18, true, 'Shungen', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (178, 3, 2, 1, 12, true, NULL, 2, 23, true, 'Haruna', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (179, 6, 2, 1, 12, true, NULL, 1, 16, true, 'Yuka', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (180, 1, 1, 1, 12, true, NULL, 2, 22, true, 'Bakuya', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (181, 2, 1, 1, 8, true, NULL, 3, 31, true, 'Fuwei', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (182, 1, 1, 1, 8, true, NULL, 1, 18, true, 'Ushio', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (183, 4, 1, 1, 8, true, NULL, 1, 17, true, 'Kongir', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (184, 2, 1, 1, 8, true, NULL, 2, 25, true, 'Yakumo', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (185, 5, 1, 1, 8, true, NULL, 2, 20, true, 'Taiga', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (186, 6, 2, 1, 8, true, NULL, 2, 24, true, 'Yuna', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (187, 1, 2, 1, 8, true, NULL, 3, 30, true, 'Mikazuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (188, 5, 1, 1, 8, true, NULL, 2, 24, true, 'Shun', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (189, 1, 2, 2, 14, true, NULL, 2, 19, true, 'Shisui', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (190, 8, 1, 2, 14, true, NULL, 2, 28, true, 'Kusanagi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (191, 5, 2, 2, 14, true, NULL, 2, 19, true, 'Koyuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (192, 8, 2, 2, 14, true, NULL, 3, 35, true, 'Tamayori', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (193, 1, 1, 2, 4, true, NULL, 2, 21, true, 'Kirim', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (194, 4, 2, 2, 4, true, NULL, 1, 16, true, 'Moyoi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (195, 8, 2, 2, 4, true, NULL, 2, 26, true, 'Misaki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (196, 1, 2, 2, 4, true, NULL, 1, 16, true, 'Minazuki', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (197, 6, 2, 3, 3, true, 'Ting-a-Ling Troupe', 5, 46, true, 'Vess', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (199, 6, 2, 3, 3, true, NULL, 2, 27, true, 'Rania', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (200, 3, 2, 3, 3, true, NULL, 2, 26, true, 'Yomogi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (201, 6, 1, 3, 3, true, NULL, 2, 19, true, 'Seigai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (202, 1, 1, 3, 10, true, NULL, 2, 21, true, 'Murakumo', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (203, 6, 2, 3, 10, true, NULL, 2, 22, true, 'Zutsuji', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (204, 4, 2, 3, 10, true, NULL, 1, 18, true, 'Lin', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (205, 6, 1, 3, 10, true, NULL, 2, 19, true, 'Hokuto', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (206, 5, 1, 3, 10, true, NULL, 2, 21, true, 'Hagan', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (207, 5, 1, 3, 10, true, NULL, 2, 27, true, 'Toshi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (208, 6, 1, 3, 10, true, NULL, 2, 23, true, 'Daiko', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (209, 3, 1, 1, 9, true, NULL, 3, 32, true, 'Kojiro', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (210, 1, 2, 3, 3, true, NULL, 3, 36, true, 'Shuraya', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (211, 8, 2, 1, 12, true, 'Slayswords', 5, 44, true, 'Vale', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (212, 1, 2, 1, 1, false, NULL, 1, 1, true, 'Pyra', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (213, 4, 2, 3, 10, true, 'Contrarians', 5, 46, true, 'Adenine', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (214, 6, 2, 3, 3, true, NULL, 1, 17, true, 'Ai', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (215, 8, 2, 1, 8, true, 'Shadow Puppets', 5, 44, true, 'Azami', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (216, 1, 2, 1, 1, false, NULL, 5, 44, false, 'Pyra', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (217, 2, 3, 3, 15, false, NULL, 5, 44, false, 'Dromarch', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (218, 5, 2, 2, 5, false, NULL, 5, 44, false, 'Poppi ɑ', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (219, 1, 2, 2, 11, false, NULL, 5, 44, false, 'Poppi QT', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (220, 3, 2, 2, 14, true, NULL, 3, 30, true, 'Kiri', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (221, 2, 1, 1, 9, true, NULL, 3, 34, true, 'Oryuu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (222, 3, 2, 2, 4, true, 'Purificators', 5, 44, true, 'Theory', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (223, 4, 1, 3, 3, true, 'Voracious Vanguard', 5, 44, true, 'Boreas', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (224, 2, 1, 2, 14, true, NULL, 3, 34, true, 'Kazan', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (225, 1, 2, 2, 4, true, 'Battle Cruisers', 5, 44, true, 'Newt', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (226, 1, 2, 1, 1, true, 'Inflammables', 5, 44, false, 'Pyra', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (227, 5, 2, 2, 5, true, 'Poppi Seeds', 5, 44, false, 'Poppi ɑ', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (228, 3, 1, 2, 14, true, 'Bravest of the Brave', 5, 44, true, 'Godfrey', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (229, 2, 3, 3, 15, true, 'Dromarch''s Dragoons', 5, 44, false, 'Dromarch', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (230, 6, 2, 1, 12, true, NULL, 3, 35, true, 'Shinobu', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (231, 4, 2, 2, 16, true, 'QT Pirates', 5, 44, false, 'Poppi QTπ', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (232, 1, 2, 2, 11, true, 'QT Corps', 5, 44, false, 'Poppi QT', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (233, 5, 2, 3, 10, true, NULL, 3, 32, true, 'Lindora', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (234, 4, 1, 1, 7, true, 'Roc & the Roquettes', 5, 44, false, 'Roc', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (235, 4, 1, 3, 3, true, NULL, 3, 32, true, 'Gingar', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (236, 3, 1, 2, 14, true, 'Bravest of the Brave', 5, 44, true, 'Godfrey', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (237, 5, 1, 1, 12, true, 'Gungnir Wardens', 5, 44, true, 'Wulfric', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (238, 8, 1, 2, 4, true, 'Banners of Flame', 5, 44, true, 'Perceval', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (239, 2, 1, 1, 9, true, 'Flying Merfolk', 5, 44, true, 'Gorg', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (240, 3, 2, 2, 4, true, 'Purificators', 5, 44, true, 'Theory', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (241, 3, 2, 1, 12, true, 'Ardent Lancers', 5, 44, true, 'Perun', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (242, 6, 2, 3, 10, true, 'Breeze Shooters', 5, 44, true, 'Kora', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (243, 8, 2, 1, 8, true, 'Shadow Puppets', 5, 44, true, 'Azami', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (244, 3, 2, 3, 10, true, 'Ursula''s New Groove', 5, 46, true, 'Ursula', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (245, 1, 2, 2, 4, true, 'Battle Cruisers', 5, 44, true, 'Newt', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (246, 5, 2, 3, 10, true, 'Dandy Lions', 5, 44, true, 'Nim', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (247, 2, 2, 1, 8, true, 'Royal Teas', 5, 44, true, 'Sheba', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (248, 6, 2, 3, 3, true, 'Ting-a-Ling Troupe', 5, 46, true, 'Vess', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (249, 4, 2, 3, 10, true, 'Contrarians', 5, 46, true, 'Adenine', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (250, 4, 2, 2, 14, true, 'Albatrojans', 5, 44, true, 'Finch', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (251, 6, 2, 1, 8, true, 'Valkyr Legion', 5, 46, true, 'Herald', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (252, 3, 2, 3, 3, true, 'Perennial Beauties', 5, 44, true, 'Dahlia', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (253, 5, 2, 2, 14, true, NULL, 3, 33, true, 'Tsukumi', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (254, 6, 1, 1, 12, true, NULL, 3, 31, true, 'Kokuyo', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (255, 7, 1, 2, 14, false, NULL, 5, 46, false, 'Poppibuster', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (256, 7, 1, 2, 14, false, NULL, 5, 46, false, 'Poppibuster', 'blade');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (257, 7, 1, 1, 19, false, NULL, 5, 44, false, 'Shulk', 'bladetemplate');
INSERT INTO xeno2.blade_superclass (id, element_id, gender_id, battle_role_id, weapon_class_id, is_merc, merc_team_name, rarity, affinity_total, can_be_released, name, discr) VALUES (258, 4, 2, 3, 20, false, NULL, 5, 44, false, 'Fiora', 'bladetemplate');


--
-- Data for Name: blade_template; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.blade_template (id, slug) VALUES (19, 'adenine');
INSERT INTO xeno2.blade_template (id, slug) VALUES (10, 'aegaeon');
INSERT INTO xeno2.blade_template (id, slug) VALUES (33, 'agate');
INSERT INTO xeno2.blade_template (id, slug) VALUES (15, 'azami');
INSERT INTO xeno2.blade_template (id, slug) VALUES (24, 'boreas');
INSERT INTO xeno2.blade_template (id, slug) VALUES (9, 'brighid');
INSERT INTO xeno2.blade_template (id, slug) VALUES (14, 'dagas');
INSERT INTO xeno2.blade_template (id, slug) VALUES (35, 'dahlia');
INSERT INTO xeno2.blade_template (id, slug) VALUES (3, 'dromarch');
INSERT INTO xeno2.blade_template (id, slug) VALUES (17, 'electra');
INSERT INTO xeno2.blade_template (id, slug) VALUES (11, 'finch');
INSERT INTO xeno2.blade_template (id, slug) VALUES (258, 'fiora');
INSERT INTO xeno2.blade_template (id, slug) VALUES (13, 'floren');
INSERT INTO xeno2.blade_template (id, slug) VALUES (28, 'godfrey');
INSERT INTO xeno2.blade_template (id, slug) VALUES (21, 'gorg');
INSERT INTO xeno2.blade_template (id, slug) VALUES (27, 'herald');
INSERT INTO xeno2.blade_template (id, slug) VALUES (34, 'kasandra');
INSERT INTO xeno2.blade_template (id, slug) VALUES (22, 'kora');
INSERT INTO xeno2.blade_template (id, slug) VALUES (37, 'kos-mos');
INSERT INTO xeno2.blade_template (id, slug) VALUES (2, 'mythra');
INSERT INTO xeno2.blade_template (id, slug) VALUES (20, 'newt');
INSERT INTO xeno2.blade_template (id, slug) VALUES (38, 'nia');
INSERT INTO xeno2.blade_template (id, slug) VALUES (16, 'nim');
INSERT INTO xeno2.blade_template (id, slug) VALUES (7, 'pandoria');
INSERT INTO xeno2.blade_template (id, slug) VALUES (12, 'perceval');
INSERT INTO xeno2.blade_template (id, slug) VALUES (18, 'perun');
INSERT INTO xeno2.blade_template (id, slug) VALUES (4, 'poppi-ɑ');
INSERT INTO xeno2.blade_template (id, slug) VALUES (5, 'poppi-qt');
INSERT INTO xeno2.blade_template (id, slug) VALUES (6, 'poppi-qtp');
INSERT INTO xeno2.blade_template (id, slug) VALUES (255, 'poppibuster');
INSERT INTO xeno2.blade_template (id, slug) VALUES (30, 'praxis');
INSERT INTO xeno2.blade_template (id, slug) VALUES (1, 'pyra');
INSERT INTO xeno2.blade_template (id, slug) VALUES (8, 'roc');
INSERT INTO xeno2.blade_template (id, slug) VALUES (32, 'sheba');
INSERT INTO xeno2.blade_template (id, slug) VALUES (257, 'shulk');
INSERT INTO xeno2.blade_template (id, slug) VALUES (31, 'theory');
INSERT INTO xeno2.blade_template (id, slug) VALUES (36, 'ursula');
INSERT INTO xeno2.blade_template (id, slug) VALUES (25, 'vale');
INSERT INTO xeno2.blade_template (id, slug) VALUES (23, 'vess');
INSERT INTO xeno2.blade_template (id, slug) VALUES (26, 'wulfric');
INSERT INTO xeno2.blade_template (id, slug) VALUES (29, 'zenobia');


--
-- Data for Name: driver; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.driver (id, name, slug) VALUES (1, 'Rex', 'rex');
INSERT INTO xeno2.driver (id, name, slug) VALUES (2, 'Nia', 'nia');
INSERT INTO xeno2.driver (id, name, slug) VALUES (3, 'Tora', 'tora');
INSERT INTO xeno2.driver (id, name, slug) VALUES (4, 'Mòrag', 'morag');
INSERT INTO xeno2.driver (id, name, slug) VALUES (5, 'Zeke', 'zeke');


--
-- Data for Name: element; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.element (id, name, slug) VALUES (1, 'Fire', 'fire');
INSERT INTO xeno2.element (id, name, slug) VALUES (2, 'Water', 'water');
INSERT INTO xeno2.element (id, name, slug) VALUES (3, 'Ice', 'ice');
INSERT INTO xeno2.element (id, name, slug) VALUES (4, 'Wind', 'wind');
INSERT INTO xeno2.element (id, name, slug) VALUES (5, 'Earth', 'earth');
INSERT INTO xeno2.element (id, name, slug) VALUES (6, 'Electric', 'electric');
INSERT INTO xeno2.element (id, name, slug) VALUES (7, 'Light', 'light');
INSERT INTO xeno2.element (id, name, slug) VALUES (8, 'Dark', 'dark');


--
-- Data for Name: gender; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.gender (id, class_id, sort, name, slug) VALUES (1, 1, 1, 'Male', 'male');
INSERT INTO xeno2.gender (id, class_id, sort, name, slug) VALUES (2, 1, 2, 'Female', 'female');
INSERT INTO xeno2.gender (id, class_id, sort, name, slug) VALUES (3, 2, 3, 'Animal', 'animal');


--
-- Data for Name: merc_mission; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (1, 1, '00:30:00', true, 'Unloading of Goods', 'unloading-of-goods', 40, 240, 675);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (2, 1, '00:30:00', true, 'Crane Repairs', 'crane-repairs', 40, 225, 720);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (3, 1, '00:30:00', true, 'Salvaging Security', 'salvaging-security', 40, 285, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (4, 1, '00:40:00', true, 'Nopon Veggie Stir-Fry', 'nopon-veggie-stir-fry', 50, 240, 705);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (5, 1, '00:40:00', true, 'Canteen Job', 'canteen-job', 50, 255, 645);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (6, 1, '00:50:00', true, 'Port Pest Problem', 'port-pest-problem', 65, 240, 675);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (7, 1, '00:50:00', true, 'Grounded Ship Rescue', 'grounded-ship-rescue', 65, 240, 690);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (8, 1, '00:50:00', true, 'Ship Snooping', 'ship-snooping', 65, 315, 495);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (9, 1, '00:50:00', true, 'Avoiding Heavy Losses', 'avoiding-heavy-losses', 65, 270, 630);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (10, 1, '01:00:00', true, 'Money, Money, Money', 'money-money-money', 80, 270, 750);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (11, 1, '01:00:00', true, 'Flying Monsters', 'flying-monsters', 80, 300, 660);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (12, 1, '01:20:00', true, 'Big Catch Opportunity', 'big-catch-opportunity', 105, 300, 690);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (13, 1, '01:20:00', true, 'Crane Protection', 'crane-protection', 105, 330, 615);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (14, 1, '01:40:00', true, 'Nopon News', 'nopon-news', 130, 285, 720);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (15, 1, '01:40:00', true, 'Deck Duty', 'deck-duty', 130, 270, 750);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (16, 1, '01:40:00', true, 'Sunken Ship Survey', 'sunken-ship-survey', 130, 285, 855);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (17, 2, '00:30:00', true, 'Woodworking', 'woodworking', 40, 285, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (18, 2, '00:30:00', true, 'Modeling Work', 'modeling-work', 40, 270, 615);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (19, 2, '00:30:00', true, 'Landslide Prevention', 'landslide-prevention', 40, 300, 555);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (20, 2, '00:40:00', true, 'Harvest Help', 'harvest-help', 50, 240, 675);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (21, 2, '00:40:00', true, 'Field Devastation', 'field-devastation', 50, 285, 585);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (22, 2, '00:50:00', true, 'Mannam Juice Delivery', 'mannam-juice-delivery', 65, 270, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (23, 2, '00:50:00', true, 'Wood Gathering', 'wood-gathering', 65, 285, 585);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (24, 2, '00:50:00', true, 'Armu Retrieval', 'armu-retrieval', 65, 300, 555);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (25, 2, '00:50:00', true, 'Test of Courage', 'test-of-courage', 65, 255, 660);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (26, 2, '01:00:00', true, 'Forest Fire Prevention', 'forest-fire-prevention', 80, 360, 540);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (27, 2, '01:00:00', true, 'Stranded Merchant', 'stranded-merchant', 80, 360, 540);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (28, 2, '01:20:00', true, 'Gormott Secret Area', 'gormott-secret-area', 105, 315, 630);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (29, 2, '01:20:00', true, 'Protect the Holy Place', 'protect-the-holy-place', 105, 360, 540);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (30, 2, '01:40:00', true, 'Mock Maneuvers', 'mock-maneuvers', 130, 240, 795);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (31, 2, '01:40:00', true, 'Arrest Warrant', 'arrest-warrant', 130, 270, 735);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (32, 2, '02:00:00', true, 'Wine Delivery', 'wine-delivery', 160, 645, 1530);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (33, 2, '02:00:00', true, 'Phantom Fruit', 'phantom-fruit', 160, 705, 1425);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (34, 2, '02:00:00', true, 'Weird Water', 'weird-water', 160, 795, 1230);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (35, 2, '00:30:00', true, 'Energy for Remodeling', 'energy-for-remodeling', 100, 405, 1050);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (36, 2, '00:30:00', true, 'Manufacture Help', 'manufacture-help', 100, 0, 0);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (37, 3, '00:30:00', true, 'Flotsam Inspection', 'flotsam-inspection', 40, 255, 630);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (38, 3, '00:30:00', true, 'Lost and Found', 'lost-and-found', 40, 270, 630);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (39, 3, '00:40:00', true, 'Beautiful Pearl', 'beautiful-pearl', 50, 315, 525);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (40, 3, '00:40:00', true, 'Igna Investigation', 'igna-investigation', 50, 285, 570);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (41, 3, '00:50:00', true, 'Rogue Miners', 'rogue-miners', 65, 300, 555);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (42, 3, '00:50:00', true, 'Warehouse Work', 'warehouse-work', 65, 285, 720);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (43, 3, '00:50:00', true, 'King of the Spring', 'king-of-the-spring', 65, 270, 720);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (44, 3, '00:50:00', true, 'Daily Training', 'daily-training', 65, 345, 555);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (45, 3, '01:00:00', true, 'Giant Crab Attack', 'giant-crab-attack', 80, 690, 1440);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (46, 3, '01:00:00', true, 'Goods Transport', 'goods-transport', 80, 255, 660);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (47, 3, '01:20:00', true, 'Art Supplies', 'art-supplies', 105, 255, 630);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (48, 3, '01:20:00', true, 'Water Quality Check', 'water-quality-check', 105, 285, 585);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (49, 3, '01:40:00', true, 'Wonderful Stage', 'wonderful-stage', 130, 255, 645);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (50, 3, '01:40:00', true, 'Road Repairs', 'road-repairs', 130, 285, 720);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (51, 3, '02:00:00', true, 'Rare Goods Repairs', 'rare-goods-repairs', 160, 360, 540);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (52, 3, '02:00:00', true, 'Fort Rescue', 'fort-rescue', 160, 390, 615);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (53, 4, '00:30:00', true, 'Cooking Spices', 'cooking-spices', 40, 315, 510);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (54, 4, '00:30:00', true, 'Lunch of Love', 'lunch-of-love', 40, 285, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (55, 4, '00:30:00', true, 'Titan Weaponry', 'titan-weaponry', 40, 315, 510);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (56, 4, '00:40:00', true, 'VIP Escort', 'vip-escort', 50, 285, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (57, 4, '00:40:00', true, 'Pest Extermination', 'pest-extermination', 50, 315, 495);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (58, 4, '00:50:00', true, 'Gondola Inspection', 'gondola-inspection', 65, 240, 690);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (59, 4, '00:50:00', true, 'Nopon Letter', 'nopon-letter', 65, 255, 645);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (60, 4, '00:50:00', true, 'Antique Judgment', 'antique-judgment', 65, 285, 570);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (61, 4, '00:50:00', true, 'Burned Wanted Posters', 'burned-wanted-posters', 65, 270, 615);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (62, 4, '01:00:00', true, 'Mining Machine', 'mining-machine', 80, 330, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (63, 4, '01:00:00', true, 'Titan Research', 'titan-research', 80, 330, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (64, 4, '01:20:00', true, 'Longing for Mòrag', 'longing-for-morag', 105, 345, 570);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (65, 4, '01:20:00', true, 'Illegal Dumper', 'illegal-dumper', 105, 640, 1470);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (66, 4, '01:40:00', true, 'Acquiring Rare Parts', 'acquiring-rare-parts', 130, 240, 795);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (67, 4, '01:40:00', true, 'Street Patrols', 'street-patrols', 130, 330, 615);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (68, 4, '01:40:00', true, 'Scientific Development', 'scientific-development', 130, 270, 735);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (69, 4, '02:00:00', true, 'Hot Nopon', 'hot-nopon', 160, 615, 1620);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (70, 4, '02:00:00', true, 'Smuggler Arrest', 'smuggler-arrest', 160, 570, 1710);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (71, 5, '00:30:00', true, 'Graveside Flowers', 'graveside-flowers', 40, 270, 720);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (72, 5, '00:30:00', true, 'Heavy Angling', 'heavy-angling', 40, 255, 765);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (73, 5, '00:30:00', true, 'Lost Property', 'lost-property', 40, 300, 690);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (74, 5, '00:30:00', true, 'Lost Property', 'lost-property-1', 40, 300, 690);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (75, 5, '00:40:00', true, 'Field Pests', 'field-pests', 50, 255, 780);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (76, 5, '00:40:00', true, 'Taminbi', 'taminbi', 50, 255, 780);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (77, 5, '00:50:00', true, 'Insect Professor', 'insect-professor', 65, 330, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (78, 5, '00:50:00', true, 'Parisax Extermination', 'parisax-extermination', 65, 360, 555);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (79, 5, '00:50:00', true, 'Pending Payout', 'pending-payout', 65, 300, 690);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (80, 5, '00:50:00', true, 'Shellfish Savior', 'shellfish-savior', 65, 360, 555);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (81, 5, '01:00:00', true, 'Vessel Scrapping', 'vessel-scrapping', 80, 405, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (82, 5, '01:00:00', true, 'Memory Bracelet', 'memory-bracelet', 80, 300, 825);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (83, 5, '01:20:00', true, 'Rex''s Condition', 'rexs-condition', 105, 315, 795);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (84, 5, '01:20:00', true, 'Research Results', 'research-results', 105, 300, 840);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (85, 5, '01:40:00', true, 'Suspicious Ship', 'suspicious-ship', 130, 375, 645);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (86, 5, '01:40:00', true, 'Dringworm Hunting', 'dringworm-hunting', 130, 270, 870);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (87, 5, '01:40:00', true, 'Yashima Festival', 'yashima-festival', 130, 405, 600);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (88, 7, '00:30:00', true, 'Ether Furnace Checks', 'ether-furnace-checks', 40, 345, 705);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (89, 7, '00:30:00', true, 'Children''s Snowsuit', 'childrens-snowsuit', 40, 300, 810);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (90, 7, '00:30:00', true, 'Snow Removal', 'snow-removal', 40, 375, 660);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (91, 7, '00:40:00', true, 'Exiting Tantal', 'exiting-tantal', 50, 375, 645);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (92, 7, '00:40:00', true, 'Warming Stralu', 'warming-stralu', 50, 390, 630);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (93, 7, '00:50:00', true, 'Snow Flower', 'snow-flower', 65, 360, 855);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (94, 7, '00:50:00', true, 'Carnivorous Beast', 'carnivorous-beast', 65, 315, 945);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (95, 7, '00:50:00', true, 'New Book', 'new-book', 65, 420, 735);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (96, 7, '00:50:00', true, 'Blizzard Zone', 'blizzard-zone', 65, 405, 750);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (97, 7, '01:00:00', true, 'Cold-Proof Crops', 'cold-proof-crops', 80, 375, 810);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (98, 7, '01:00:00', true, 'Military Training', 'military-training', 80, 405, 735);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (99, 7, '01:20:00', true, 'The Black Market', 'the-black-market', 105, 450, 660);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (100, 7, '01:20:00', true, 'Dandes Salt Cave', 'dandes-salt-cave', 105, 375, 795);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (101, 7, '01:40:00', true, 'Snow Survey', 'snow-survey', 130, 375, 810);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (102, 7, '01:40:00', true, 'Shaking Icicles', 'shaking-icicles', 130, 375, 825);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (103, 7, '01:40:00', true, 'Confidential Documents', 'confidential-documents', 130, 345, 870);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (104, 1, '02:00:00', true, 'Big Ship Escort', 'big-ship-escort', 160, 765, 1275);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (105, 1, '02:00:00', true, 'Cooking Up a Feast', 'cooking-up-a-feast', 160, 675, 1470);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (106, 1, '02:00:00', true, 'Lifesaving', 'lifesaving', 160, 795, 1215);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (107, 7, '02:00:00', true, 'Book Writing', 'book-writing', 160, 690, 2055);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (108, 7, '02:00:00', true, 'World in a Book', 'world-in-a-book', 160, 840, 1740);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (109, 7, '02:00:00', true, 'Mysterious Lifeform', 'mysterious-lifeform', 160, 915, 1575);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (110, 7, '02:00:00', true, 'Ice Hunter', 'ice-hunter', 160, 885, 1635);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (111, 3, '02:00:00', true, 'Source Security', 'source-security', 160, 630, 1560);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (112, 5, '02:00:00', true, 'Energy investigation', 'energy-investigation', 160, 630, 1875);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (113, 5, '02:00:00', true, 'Elpys Investigation', 'elpys-investigation', 160, 855, 1395);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (114, 4, '02:00:00', true, 'Spooky Spirits', 'spooky-spirits', 160, 795, 1215);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (115, 5, '02:00:00', true, 'Night Visitors', 'night-visitors', 160, 675, 1800);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (116, 3, '00:30:00', true, 'Containing the Chaos', 'containing-the-chaos', 40, 2970, 5250);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (117, 2, '02:00:00', true, 'Rebel Purge', 'rebel-purge', 160, 615, 1620);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (118, 4, '00:30:00', true, 'Lifeline to Temperantia', 'lifeline-to-temperantia', 400, 2475, 5250);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (119, 5, '02:00:00', true, 'Cloud Sea Noises', 'cloud-sea-noises', 160, 720, 1680);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (120, 3, '00:20:00', false, 'Allies of Justice 1', 'allies-of-justice-1', 50, 690, 1155);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (121, 2, '00:20:00', false, 'Allies of Justice 2', 'allies-of-justice-2', 100, 630, 1260);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (122, 3, '00:20:00', false, 'Allies of Justice 3', 'allies-of-justice-3', 150, 645, 1545);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (123, 5, '00:20:00', true, 'Allies of Justice 4', 'allies-of-justice-4', 200, 765, 1290);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (124, 4, '00:20:00', true, 'Allies of Justice 5', 'allies-of-justice-5', 250, 750, 1635);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (125, 7, '00:20:00', false, 'Allies of Justice 6', 'allies-of-justice-6', 250, 795, 1530);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (126, 3, '02:00:00', true, 'Dream of Rice', 'dream-of-rice', 160, 510, 1530);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (127, 7, '00:20:00', false, 'Finch''s Big News', 'finchs-big-news', 100, 1980, 7005);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (128, 5, '00:20:00', false, 'Catch a Crook', 'catch-a-crook', 100, 990, 2835);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (129, 5, '00:20:00', false, 'Extract a Confession', 'extract-a-confession', 100, 1080, 2475);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (130, 3, '00:20:00', false, 'Beautiful Flower', 'beautiful-flower', 150, 585, 1680);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (131, 5, '00:20:00', false, 'Guard the Field', 'guard-the-field', 100, 1035, 2655);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (132, 2, '00:20:00', true, 'Unreturnable Money', 'unreturnable-money', 200, 840, 1425);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (133, 5, '00:30:00', true, 'Reclamation', 'reclamation', 100, 1245, 1770);
INSERT INTO xeno2.merc_mission (id, nation_id, duration, repeatable, name, slug, merc_points, experience, gold) VALUES (134, 3, '01:00:00', false, 'Trial Run 1', 'trial-run-1', 100, 1245, 1770);


--
-- Data for Name: merc_mission_affinity_node; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (1, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (1, 40);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (2, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (2, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (3, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (3, 15);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (3, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (4, 23);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (4, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (5, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (5, 19);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (5, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (6, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (6, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (6, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (7, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (7, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (7, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (8, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (8, 23);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (9, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (9, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (10, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (10, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (10, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (11, 8);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (11, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (11, 41);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (12, 13);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (12, 15);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (13, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (13, 13);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (13, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (14, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (14, 19);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (14, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (15, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (15, 51);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (16, 15);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (16, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (16, 45);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (17, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (17, 24);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (18, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (18, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (18, 41);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (19, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (19, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (20, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (20, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (20, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (21, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (21, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (22, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (22, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (23, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (23, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (23, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (24, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (24, 24);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (24, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (25, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (25, 41);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (25, 44);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (26, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (26, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (26, 35);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (27, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (27, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (27, 36);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (28, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (28, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (29, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (29, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (29, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (30, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (30, 42);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (30, 52);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (31, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (31, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (31, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (32, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (32, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (32, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (33, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (33, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (33, 41);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (34, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (34, 13);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (34, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (35, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (35, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (35, 55);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (36, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (36, 8);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (36, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (37, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (37, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (37, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (38, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (38, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (38, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (39, 19);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (39, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (39, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (40, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (40, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (41, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (41, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (41, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (42, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (42, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (42, 55);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (43, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (43, 13);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (43, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (44, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (44, 42);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (45, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (45, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (46, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (46, 55);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (47, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (47, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (47, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (48, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (48, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (48, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (49, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (49, 48);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (50, 8);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (50, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (50, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (51, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (51, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (51, 46);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (52, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (52, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (52, 40);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (53, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (53, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (53, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (54, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (54, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (54, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (55, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (55, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (55, 52);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (56, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (56, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (57, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (57, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (58, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (58, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (58, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (60, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (60, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (60, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (61, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (61, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (61, 36);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (62, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (62, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (62, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (63, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (63, 4);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (63, 44);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (64, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (64, 4);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (64, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (65, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (65, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (65, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (66, 15);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (66, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (66, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (67, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (67, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (67, 41);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (68, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (68, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (68, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (69, 4);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (69, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (69, 47);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (70, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (70, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (70, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (71, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (71, 37);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (72, 13);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (72, 46);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (73, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (73, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (73, 37);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (74, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (74, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (74, 37);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (75, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (75, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (76, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (76, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (76, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (77, 12);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (77, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (78, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (78, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (79, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (79, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (79, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (80, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (80, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (81, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (81, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (81, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (82, 8);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (82, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (82, 47);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (83, 19);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (83, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (83, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (84, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (84, 13);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (84, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (85, 15);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (85, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (85, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (86, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (86, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (86, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (87, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (87, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (87, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (88, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (88, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (88, 45);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (89, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (89, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (89, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (90, 4);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (90, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (91, 23);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (91, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (92, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (92, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (93, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (93, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (93, 54);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (94, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (94, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (95, 11);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (95, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (95, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (96, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (96, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (96, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (97, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (97, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (97, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (98, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (98, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (98, 42);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (99, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (99, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (99, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (100, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (100, 4);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (100, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (101, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (101, 14);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (101, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (102, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (102, 24);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (103, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (103, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (103, 51);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (104, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (104, 46);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (105, 23);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (105, 33);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (106, 22);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (106, 26);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (106, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (107, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (107, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (107, 19);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (108, 19);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (108, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (108, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (109, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (109, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (109, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (110, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (110, 8);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (110, 35);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (111, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (111, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (111, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (112, 5);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (112, 28);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (112, 46);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (113, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (113, 6);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (113, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (114, 5);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (114, 34);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (115, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (115, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (115, 38);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (116, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (116, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (116, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (117, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (117, 38);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (118, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (118, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (119, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (119, 43);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (120, 4);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (120, 23);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (120, 42);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (121, 7);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (121, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (121, 51);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (122, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (122, 24);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (122, 25);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (123, 8);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (123, 29);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (123, 40);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (124, 3);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (124, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (124, 44);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (125, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (125, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (125, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (126, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (126, 10);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (126, 16);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (127, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (127, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (128, 17);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (128, 27);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (129, 18);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (129, 20);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (130, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (130, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (130, 38);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (131, 2);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (131, 9);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (132, 1);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (132, 21);
INSERT INTO xeno2.merc_mission_affinity_node (merc_mission_id, affinity_node_id) VALUES (132, 38);


--
-- Data for Name: merc_mission_merc_mission_prerequisite; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (104, 5);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (105, 5);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (106, 5);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (107, 25);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (108, 25);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (109, 25);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (110, 25);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (111, 15);
INSERT INTO xeno2.merc_mission_merc_mission_prerequisite (merc_mission_id, merc_mission_prerequisite_id) VALUES (112, 35);


--
-- Data for Name: merc_mission_merc_mission_requirement; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (1, 1);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (2, 2);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (3, 3);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (4, 4);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (5, 5);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (6, 6);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (7, 7);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (8, 8);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (9, 9);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (9, 10);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (10, 11);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (10, 12);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (11, 13);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (11, 14);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (12, 15);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (12, 16);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (13, 17);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (13, 18);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (14, 19);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (14, 20);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (15, 21);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (15, 22);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (16, 23);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (16, 24);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (17, 25);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (18, 26);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (19, 27);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (20, 28);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (21, 29);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (22, 30);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (22, 31);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (23, 32);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (24, 33);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (24, 34);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (25, 35);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (26, 36);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (26, 37);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (27, 38);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (28, 39);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (29, 40);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (30, 41);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (30, 42);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (31, 43);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (31, 44);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (32, 45);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (32, 46);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (33, 47);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (33, 48);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (33, 49);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (34, 50);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (34, 51);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (34, 52);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (35, 53);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (35, 54);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (35, 55);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (36, 56);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (37, 57);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (38, 58);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (39, 59);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (40, 60);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (41, 61);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (41, 62);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (42, 63);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (42, 64);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (43, 65);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (43, 66);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (44, 67);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (44, 68);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (45, 69);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (45, 70);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (45, 71);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (46, 72);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (47, 73);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (48, 74);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (49, 75);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (49, 76);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (50, 77);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (50, 78);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (51, 79);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (51, 80);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (52, 81);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (52, 82);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (52, 83);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (53, 84);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (54, 85);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (55, 86);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (56, 87);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (57, 88);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (58, 89);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (59, 90);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (59, 91);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (60, 92);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (61, 93);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (62, 94);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (62, 95);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (63, 96);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (63, 97);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (64, 98);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (64, 99);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (65, 100);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (65, 101);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (66, 102);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (66, 103);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (67, 104);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (67, 105);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (68, 106);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (68, 107);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (69, 108);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (69, 109);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (69, 110);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (70, 111);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (70, 112);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (71, 113);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (72, 114);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (73, 115);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (74, 116);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (75, 117);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (76, 118);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (77, 119);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (77, 120);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (78, 121);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (79, 122);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (79, 123);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (80, 124);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (80, 125);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (81, 126);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (81, 127);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (82, 128);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (82, 129);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (83, 130);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (83, 131);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (84, 132);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (84, 133);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (85, 134);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (86, 135);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (86, 136);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (87, 137);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (87, 138);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (88, 139);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (89, 140);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (90, 141);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (91, 142);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (92, 143);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (93, 144);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (93, 145);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (94, 146);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (95, 147);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (95, 148);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (96, 149);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (97, 150);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (97, 151);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (98, 152);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (98, 153);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (99, 154);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (99, 155);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (100, 156);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (100, 157);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (101, 158);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (101, 159);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (102, 160);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (102, 161);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (103, 162);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (103, 163);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (104, 164);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (104, 165);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (105, 166);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (105, 167);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (106, 168);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (106, 169);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (106, 170);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (107, 171);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (107, 172);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (107, 173);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (108, 174);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (108, 175);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (108, 176);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (109, 177);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (109, 178);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (110, 179);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (110, 180);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (110, 181);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (111, 182);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (111, 183);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (111, 184);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (112, 185);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (112, 186);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (113, 187);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (113, 188);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (114, 189);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (114, 190);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (114, 191);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (115, 192);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (115, 193);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (116, 194);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (116, 195);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (116, 196);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (117, 197);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (117, 198);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (118, 199);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (118, 200);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (119, 203);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (119, 204);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (119, 205);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (120, 206);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (120, 207);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (120, 208);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (121, 209);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (121, 210);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (121, 211);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (122, 212);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (122, 213);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (122, 214);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (123, 215);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (123, 216);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (123, 217);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (124, 218);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (124, 219);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (124, 220);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (125, 221);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (125, 222);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (125, 223);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (126, 224);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (126, 225);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (127, 226);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (127, 227);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (128, 228);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (129, 229);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (129, 230);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (129, 231);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (130, 232);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (130, 233);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (130, 234);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (131, 235);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (132, 236);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (132, 237);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (132, 238);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (133, 239);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (133, 240);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (133, 241);
INSERT INTO xeno2.merc_mission_merc_mission_requirement (merc_mission_id, merc_mission_requirement_id) VALUES (134, 242);


--
-- Data for Name: merc_mission_prerequisite; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (1, 1, 'Argentum Dev Level 1', 'argentum-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (2, 2, 'Argentum Dev Level 2', 'argentum-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (3, 3, 'Argentum Dev Level 3', 'argentum-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (4, 4, 'Argentum Dev Level 4', 'argentum-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (5, 5, 'Argentum Dev Level 5', 'argentum-dev-level-5');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (6, 6, 'Gormott Dev Level 1', 'gormott-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (7, 7, 'Gormott Dev Level 2', 'gormott-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (8, 8, 'Gormott Dev Level 3', 'gormott-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (9, 9, 'Gormott Dev Level 4', 'gormott-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (10, 10, 'Gormott Dev Level 5', 'gormott-dev-level-5');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (11, 11, 'Uraya Dev Level 1', 'uraya-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (12, 12, 'Uraya Dev Level 2', 'uraya-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (13, 13, 'Uraya Dev Level 3', 'uraya-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (14, 14, 'Uraya Dev Level 4', 'uraya-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (15, 15, 'Uraya Dev Level 5', 'uraya-dev-level-5');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (16, 16, 'Mor Ardain Dev Level 1', 'mor-ardain-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (17, 17, 'Mor Ardain Dev Level 2', 'mor-ardain-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (18, 18, 'Mor Ardain Dev Level 3', 'mor-ardain-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (19, 19, 'Mor Ardain Dev Level 4', 'mor-ardain-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (20, 20, 'Mor Ardain Dev Level 5', 'mor-ardain-dev-level-5');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (21, 21, 'Tantal Dev Level 1', 'tantal-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (22, 22, 'Tantal Dev Level 2', 'tantal-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (23, 23, 'Tantal Dev Level 3', 'tantal-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (24, 24, 'Tantal Dev Level 4', 'tantal-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (25, 25, 'Tantal Dev Level 5', 'tantal-dev-level-5');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (26, 26, 'Indol Dev Level 1', 'indol-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (27, 27, 'Indol Dev Level 2', 'indol-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (28, 28, 'Indol Dev Level 3', 'indol-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (29, 29, 'Indol Dev Level 4', 'indol-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (30, 30, 'Indol Dev Level 5', 'indol-dev-level-5');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (31, 31, 'Leftheria Dev Level 1', 'leftheria-dev-level-1');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (32, 32, 'Leftheria Dev Level 2', 'leftheria-dev-level-2');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (33, 33, 'Leftheria Dev Level 3', 'leftheria-dev-level-3');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (34, 34, 'Leftheria Dev Level 4', 'leftheria-dev-level-4');
INSERT INTO xeno2.merc_mission_prerequisite (id, sort, name, slug) VALUES (35, 35, 'Leftheria Dev Level 5', 'leftheria-dev-level-5');


--
-- Data for Name: merc_mission_requirement; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (1, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (2, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (3, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (4, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (5, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (6, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (7, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (8, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (9, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (10, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (11, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (12, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (13, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (14, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (15, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (16, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (17, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (18, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (19, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (20, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (21, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (22, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (23, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (24, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (25, 1, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (26, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (27, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (28, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (29, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (30, 1, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (31, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (32, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (33, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (34, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (35, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (36, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (37, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (38, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (39, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (40, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (41, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (42, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (43, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (44, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (45, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (46, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (47, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (48, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (49, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (50, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (51, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (52, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (53, 2, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (54, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (55, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (56, 3, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (57, 1, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (58, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (59, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (60, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (61, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (62, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (63, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (64, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (65, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (66, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (67, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (68, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (69, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (70, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (71, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (72, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (73, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (74, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (75, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (76, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (77, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (78, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (79, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (80, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (81, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (82, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (83, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (84, 1, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (85, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (86, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (87, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (88, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (89, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (90, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (91, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (92, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (93, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (94, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (95, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (96, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (97, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (98, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (99, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (100, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (101, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (102, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (103, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (104, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (105, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (106, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (107, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (108, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (109, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (110, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (111, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (112, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (113, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (114, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (115, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (116, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (117, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (118, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (119, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (120, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (121, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (122, 1, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (123, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (124, 1, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (125, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (126, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (127, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (128, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (129, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (130, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (131, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (132, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (133, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (134, 6, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (135, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (136, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (137, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (138, 3, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (139, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (140, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (141, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (142, 1, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (143, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (144, 1, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (145, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (146, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (147, 6, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (148, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (149, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (150, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (151, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (152, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (153, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (154, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (155, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (156, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (157, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (158, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (159, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (160, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (161, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (162, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (163, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (164, 1, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (165, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (166, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (167, 6, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (168, 1, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (169, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (170, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (171, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (172, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (173, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (174, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (175, 2, 'mercmissionrequirementgender');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (176, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (177, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (178, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (179, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (180, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (181, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (182, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (183, 1, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (184, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (185, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (186, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (187, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (188, 2, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (189, 3, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (190, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (191, 1, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (192, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (193, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (194, 4, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (195, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (196, 2, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (197, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (198, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (199, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (200, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (203, 1, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (204, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (205, 2, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (206, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (207, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (208, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (209, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (210, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (211, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (212, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (213, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (214, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (215, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (216, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (217, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (218, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (219, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (220, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (221, 2, 'mercmissionrequirementweaponclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (222, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (223, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (224, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (225, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (226, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (227, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (228, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (229, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (230, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (231, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (232, 3, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (233, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (234, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (235, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (236, 2, 'mercmissionrequirementstrength');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (237, 3, 'mercmissionrequirementelement');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (238, 3, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (239, 1, 'mercmissionrequirementfieldskill');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (240, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (241, 1, 'mercmissionrequirementclass');
INSERT INTO xeno2.merc_mission_requirement (id, count, discr) VALUES (242, 1, 'mercmissionrequirementfieldskill');


--
-- Data for Name: merc_mission_requirement_class; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (1, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (2, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (8, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (9, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (27, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (31, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (54, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (66, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (80, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (89, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (92, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (95, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (115, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (116, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (118, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (123, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (127, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (139, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (148, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (167, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (170, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (176, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (195, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (225, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (226, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (234, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (240, 1);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (10, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (12, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (34, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (35, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (37, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (55, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (58, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (62, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (73, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (91, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (93, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (97, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (105, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (107, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (120, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (151, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (155, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (163, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (196, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (227, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (238, 2);
INSERT INTO xeno2.merc_mission_requirement_class (id, class_id) VALUES (241, 2);


--
-- Data for Name: merc_mission_requirement_element; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (4, 1);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (86, 1);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (99, 1);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (109, 1);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (140, 1);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (161, 1);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (16, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (17, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (32, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (36, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (50, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (65, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (74, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (233, 2);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (20, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (42, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (49, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (64, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (110, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (145, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (150, 3);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (14, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (26, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (52, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (76, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (90, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (106, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (119, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (125, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (205, 4);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (11, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (28, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (48, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (51, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (78, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (113, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (136, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (157, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (181, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (224, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (237, 5);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (18, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (79, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (114, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (129, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (133, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (165, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (186, 6);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (24, 8);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (83, 8);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (191, 8);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (193, 8);
INSERT INTO xeno2.merc_mission_requirement_element (id, element_id) VALUES (198, 8);


--
-- Data for Name: merc_mission_requirement_field_skill; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (47, 12, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (53, 15, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (56, 9, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (166, 28, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (169, 18, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (173, 25, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (180, 25, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (188, 16, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (190, 18, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (197, 20, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (204, 20, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (208, 36, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (211, 37, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (214, 35, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (217, 37, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (220, 35, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (223, 36, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (228, 38, 3);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (229, 35, 3);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (230, 36, 3);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (231, 37, 3);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (235, 42, 3);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (239, 2, 1);
INSERT INTO xeno2.merc_mission_requirement_field_skill (id, field_skill_id, level) VALUES (242, 40, 1);


--
-- Data for Name: merc_mission_requirement_gender; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (15, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (25, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (44, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (72, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (77, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (94, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (103, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (122, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (126, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (131, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (137, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (142, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (168, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (174, 1);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (5, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (19, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (59, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (63, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (75, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (87, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (98, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (130, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (138, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (144, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (147, 2);
INSERT INTO xeno2.merc_mission_requirement_gender (id, gender_id) VALUES (175, 2);


--
-- Data for Name: merc_mission_requirement_strength; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (6, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (13, 20);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (22, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (23, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (30, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (39, 20);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (41, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (46, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (57, 10);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (60, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (71, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (82, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (84, 10);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (85, 10);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (88, 10);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (96, 20);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (101, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (102, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (104, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (108, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (112, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (121, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (124, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (132, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (134, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (141, 10);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (146, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (154, 20);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (156, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (159, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (162, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (164, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (172, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (178, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (179, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (184, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (185, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (187, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (192, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (194, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (203, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (207, 10);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (210, 15);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (213, 20);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (216, 25);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (219, 30);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (222, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (232, 35);
INSERT INTO xeno2.merc_mission_requirement_strength (id, strength) VALUES (236, 40);


--
-- Data for Name: merc_mission_requirement_weapon_class; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (38, 3);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (67, 3);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (135, 3);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (209, 3);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (40, 4);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (45, 4);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (100, 4);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (182, 4);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (218, 4);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (21, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (43, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (117, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (143, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (152, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (160, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (183, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (212, 8);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (29, 9);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (69, 9);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (149, 9);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (177, 9);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (221, 9);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (33, 10);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (81, 10);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (200, 10);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (206, 10);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (3, 12);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (7, 12);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (61, 12);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (128, 12);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (158, 12);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (68, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (70, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (111, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (153, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (171, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (189, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (199, 14);
INSERT INTO xeno2.merc_mission_requirement_weapon_class (id, weapon_class_id) VALUES (215, 14);


--
-- Data for Name: migration_versions; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.migration_versions (version) VALUES ('20190203151139');
INSERT INTO xeno2.migration_versions (version) VALUES ('20190203182309');


--
-- Data for Name: nation; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.nation (id, name, slug) VALUES (1, 'Argentum', 'argentum');
INSERT INTO xeno2.nation (id, name, slug) VALUES (2, 'Gormott', 'gormott');
INSERT INTO xeno2.nation (id, name, slug) VALUES (3, 'Uraya', 'uraya');
INSERT INTO xeno2.nation (id, name, slug) VALUES (4, 'Mor Ardain', 'mor-ardain');
INSERT INTO xeno2.nation (id, name, slug) VALUES (5, 'Leftheria', 'leftheria');
INSERT INTO xeno2.nation (id, name, slug) VALUES (6, 'Indol', 'indol');
INSERT INTO xeno2.nation (id, name, slug) VALUES (7, 'Tantal', 'tantal');


--
-- Data for Name: role; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.role (id, name, slug) VALUES (1, 'ROLE_USER', 'user');
INSERT INTO xeno2.role (id, name, slug) VALUES (2, 'ROLE_ADMIN', 'admin');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.sessions (sess_id, sess_data, sess_time, sess_lifetime) VALUES ('13bb55276bab1e506e2a134cf812b9ce', '\x5f7366325f617474726962757465737c613a353a7b733a31383a225f637372662f61757468656e746963617465223b733a34333a22396975723573545173546632737a5744634b333134574175337a7362653959724b50703779797a65686634223b733a32343a226b6e70752e6f61757468325f636c69656e745f7374617465223b733a33323a223266386530336637313136633237303038623462663164343736623033666365223b733a31343a225f73656375726974795f6d61696e223b733a3439353a22433a36373a2253796d666f6e795c436f6d706f6e656e745c53656375726974795c47756172645c546f6b656e5c506f737441757468656e7469636174696f6e4775617264546f6b656e223a3431343a7b613a323a7b693a303b733a343a226d61696e223b693a313b733a3338303a22613a343a7b693a303b433a31353a224170705c456e746974795c55736572223a35363a7b613a343a7b693a303b693a313b693a313b733a31363a22646b4064616e6b65656e616e2e6f7267223b693a323b4e3b693a333b623a313b7d7d693a313b623a313b693a323b613a323a7b693a303b4f3a34313a2253796d666f6e795c436f6d706f6e656e745c53656375726974795c436f72655c526f6c655c526f6c65223a313a7b733a34373a220053796d666f6e795c436f6d706f6e656e745c53656375726974795c436f72655c526f6c655c526f6c6500726f6c65223b733a393a22524f4c455f55534552223b7d693a313b4f3a34313a2253796d666f6e795c436f6d706f6e656e745c53656375726974795c436f72655c526f6c655c526f6c65223a313a7b733a34373a220053796d666f6e795c436f6d706f6e656e745c53656375726974795c436f72655c526f6c655c526f6c6500726f6c65223b733a31303a22524f4c455f41444d494e223b7d7d693a333b613a303a7b7d7d223b7d7d223b733a31363a225f637372662f626c6164655f666f726d223b733a34333a2249643359427478495269694e35614738666b74424e4f424a53547469676f655f72376d6f6665436a555341223b733a31363a225f637372662f626c6164655f66696e64223b733a34333a227554614576657a5a514d375078382d466a695753596a766f7a506939476d7a5432494c736232794f6b7238223b7d5f7366325f6d6574617c613a333a7b733a313a2275223b693a313535353033313734393b733a313a2263223b693a313535353033313636393b733a313a226c223b733a313a2230223b7d', 1555031749, 1440);
INSERT INTO xeno2.sessions (sess_id, sess_data, sess_time, sess_lifetime) VALUES ('92888e4915ee79761fe144b98fa050ee', '\x5f7366325f617474726962757465737c613a323a7b733a31383a225f637372662f61757468656e746963617465223b733a34333a226b5954754e4365683068725a3975696962715044615769524873445230756461742d5841336a337a524f34223b733a32343a226b6e70752e6f61757468325f636c69656e745f7374617465223b733a33323a223332316639336132386132366434316336373439333862353536316533343637223b7d5f7366325f6d6574617c613a333a7b733a313a2275223b693a313535353032383930363b733a313a2263223b693a313535353032383832333b733a313a226c223b733a313a2230223b7d', 1555028906, 1440);


--
-- Data for Name: trust_rank; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.trust_rank (id, sort, name, slug) VALUES (1, 6, 'E', 'e');
INSERT INTO xeno2.trust_rank (id, sort, name, slug) VALUES (2, 5, 'D', 'd');
INSERT INTO xeno2.trust_rank (id, sort, name, slug) VALUES (3, 4, 'C', 'c');
INSERT INTO xeno2.trust_rank (id, sort, name, slug) VALUES (4, 3, 'B', 'b');
INSERT INTO xeno2.trust_rank (id, sort, name, slug) VALUES (5, 2, 'A', 'a');
INSERT INTO xeno2.trust_rank (id, sort, name, slug) VALUES (6, 1, 'S', 's');


--
-- Data for Name: user_driver; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (1, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (1, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (1, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (1, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (1, 5);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (3, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (3, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (3, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (3, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (3, 5);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (4, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (4, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (4, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (4, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (4, 5);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (5, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (5, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (5, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (5, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (5, 5);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (6, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (6, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (6, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (6, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (7, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (8, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (8, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (8, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (8, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (9, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (9, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (9, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (9, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (9, 5);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (11, 1);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (11, 2);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (11, 3);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (11, 4);
INSERT INTO xeno2.user_driver (user_id, driver_id) VALUES (11, 5);


--
-- Data for Name: user_nation; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (1, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (1, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (1, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (1, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (1, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (1, 7);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 6);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (3, 7);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (4, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (4, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (4, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (4, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (4, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (4, 7);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 6);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (5, 7);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (6, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (6, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (6, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (6, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (6, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (8, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (8, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (8, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (8, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (8, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (8, 6);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 6);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (9, 7);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 1);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 2);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 3);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 4);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 5);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 6);
INSERT INTO xeno2.user_nation (user_id, nation_id) VALUES (11, 7);


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (1, 2);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (4, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (5, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (6, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (7, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (8, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (9, 1);
INSERT INTO xeno2.user_role (user_id, role_id) VALUES (11, 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (1, NULL, 'dk@dankeenan.org', true, '2018-01-12 02:27:38+00', NULL, NULL, '110771024139821500179');
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (2, NULL, 'danielskeenan@gmail.com', true, '2018-02-26 14:10:17+00', NULL, NULL, '112129877316994683232');
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (3, '$2y$13$DT5Wl/O5YF9EsX4kz7KsV.S6inLZ/b7EHviauTrRiGowJe3zTazdO', 'prwatkins21@gmail.com', true, '2018-02-26 14:37:24+00', NULL, NULL, NULL);
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (4, NULL, 'ankhduong@gmail.com', true, '2018-02-26 17:42:21+00', NULL, NULL, '104957310838876554818');
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (5, '$2y$13$Cy6D3rbAiHJ6IE7Xkq0qZ.X3qe0i8x1JRABjnqKW1EfRnopmSkhS6', 'greenmaillink@gmail.com', true, '2018-02-27 00:28:06+00', NULL, NULL, NULL);
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (6, '$2y$13$XmCQ86K1AXTm.qW2nT8NrucTWaOTOqa78nnpFV6e44B9Uk3mTc8wq', 'hayman1994@gmail.com', true, '2018-02-27 03:07:30+00', NULL, NULL, '');
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (7, NULL, 'dingodoggywes@gmail.com', true, '2018-02-28 02:47:21+00', NULL, NULL, '116438961926461736166');
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (8, '$2y$13$hF47X6zMydYaT/KQ9FtK1O4E1OGaRLSxjOy3BinSt5jG8TXCPjZHa', 'palpatine213@gmail.com', true, '2018-03-09 19:28:29+00', NULL, NULL, NULL);
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (9, '$2y$13$CHUUJVnlqnPyuJ5zd6eIe.rRxHyY60ezfHqXXe61iY5qmQc915LaG', 'nmb.amarica@gmail.com', true, '2018-04-27 14:50:17+00', NULL, NULL, NULL);
INSERT INTO xeno2.users (id, password, email, is_active, created, activate_code, activate_code_time, google_id) VALUES (11, '$2y$13$FIHlq39RogCq./2Lfe5Z1OHs7huZ6LpBxJE4TCBfePqR0/f6hiq3K', 'hayvol@yahoo.com', true, '2018-12-17 01:37:07+00', NULL, NULL, NULL);


--
-- Data for Name: weapon_class; Type: TABLE DATA; Schema: xeno2; Owner: xeno2
--

INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (1, 'Aegis Sword', 'aegis-sword');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (2, 'Big Bang Edge', 'big-bang-edge');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (3, 'Bitball', 'bitball');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (4, 'Chrome Katana', 'chrome-katana');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (5, 'Drill Shield', 'drill-shield');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (6, 'Dual Blades', 'dual-blades');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (7, 'Dual Scythes', 'dual-scythes');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (8, 'Ether Cannon', 'ether-cannon');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (9, 'Greataxe', 'greataxe');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (10, 'Knuckle Claws', 'knuckle-claws');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (11, 'Mech Arms', 'mech-arms');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (12, 'Megalance', 'megalance');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (13, 'Shield Arms', 'shield-arms');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (14, 'Shield Hammer', 'shield-hammer');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (15, 'Twin Rings', 'twin-rings');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (16, 'Variable Saber', 'variable-saber');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (17, 'Whipswords', 'whipswords');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (18, 'Aqua Scimitar', 'aqua-scimitar');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (19, 'Monado', 'monado');
INSERT INTO xeno2.weapon_class (id, name, slug) VALUES (20, 'Dual Knives', 'dual-knives');


--
-- Name: affinity_node_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.affinity_node_id_seq', 55, true);


--
-- Name: battle_role_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.battle_role_id_seq', 3, true);


--
-- Name: blade_affinity_node_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.blade_affinity_node_id_seq', 571, true);


--
-- Name: blade_class_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.blade_class_id_seq', 2, true);


--
-- Name: blade_superclass_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.blade_superclass_id_seq', 258, true);


--
-- Name: driver_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.driver_id_seq', 5, true);


--
-- Name: element_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.element_id_seq', 8, true);


--
-- Name: gender_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.gender_id_seq', 3, true);


--
-- Name: merc_mission_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.merc_mission_id_seq', 134, true);


--
-- Name: merc_mission_prerequisite_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.merc_mission_prerequisite_id_seq', 35, true);


--
-- Name: merc_mission_requirement_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.merc_mission_requirement_id_seq', 242, true);


--
-- Name: nation_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.nation_id_seq', 7, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.role_id_seq', 2, true);


--
-- Name: trust_rank_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.trust_rank_id_seq', 6, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.user_id_seq', 11, true);


--
-- Name: weapon_class_id_seq; Type: SEQUENCE SET; Schema: xeno2; Owner: xeno2
--

SELECT pg_catalog.setval('xeno2.weapon_class_id_seq', 20, true);


--
-- Name: affinity_node idx_16388_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.affinity_node
    ADD CONSTRAINT idx_16388_primary PRIMARY KEY (id);


--
-- Name: battle_role idx_16397_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.battle_role
    ADD CONSTRAINT idx_16397_primary PRIMARY KEY (id);


--
-- Name: blade idx_16404_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT idx_16404_primary PRIMARY KEY (id);


--
-- Name: blade_affinity_node idx_16409_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_affinity_node
    ADD CONSTRAINT idx_16409_primary PRIMARY KEY (id);


--
-- Name: blade_class idx_16415_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_class
    ADD CONSTRAINT idx_16415_primary PRIMARY KEY (id);


--
-- Name: blade_superclass idx_16424_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_superclass
    ADD CONSTRAINT idx_16424_primary PRIMARY KEY (id);


--
-- Name: blade_template idx_16431_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_template
    ADD CONSTRAINT idx_16431_primary PRIMARY KEY (id);


--
-- Name: driver idx_16436_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.driver
    ADD CONSTRAINT idx_16436_primary PRIMARY KEY (id);


--
-- Name: element idx_16445_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.element
    ADD CONSTRAINT idx_16445_primary PRIMARY KEY (id);


--
-- Name: gender idx_16454_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.gender
    ADD CONSTRAINT idx_16454_primary PRIMARY KEY (id);


--
-- Name: merc_mission idx_16463_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission
    ADD CONSTRAINT idx_16463_primary PRIMARY KEY (id);


--
-- Name: merc_mission_affinity_node idx_16470_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_affinity_node
    ADD CONSTRAINT idx_16470_primary PRIMARY KEY (merc_mission_id, affinity_node_id);


--
-- Name: merc_mission_merc_mission_prerequisite idx_16473_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_merc_mission_prerequisite
    ADD CONSTRAINT idx_16473_primary PRIMARY KEY (merc_mission_id, merc_mission_prerequisite_id);


--
-- Name: merc_mission_merc_mission_requirement idx_16476_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_merc_mission_requirement
    ADD CONSTRAINT idx_16476_primary PRIMARY KEY (merc_mission_id, merc_mission_requirement_id);


--
-- Name: merc_mission_prerequisite idx_16481_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_prerequisite
    ADD CONSTRAINT idx_16481_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement idx_16490_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement
    ADD CONSTRAINT idx_16490_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement_class idx_16494_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_class
    ADD CONSTRAINT idx_16494_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement_element idx_16497_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_element
    ADD CONSTRAINT idx_16497_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement_field_skill idx_16500_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_field_skill
    ADD CONSTRAINT idx_16500_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement_gender idx_16503_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_gender
    ADD CONSTRAINT idx_16503_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement_strength idx_16506_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_strength
    ADD CONSTRAINT idx_16506_primary PRIMARY KEY (id);


--
-- Name: merc_mission_requirement_weapon_class idx_16509_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_weapon_class
    ADD CONSTRAINT idx_16509_primary PRIMARY KEY (id);


--
-- Name: migration_versions idx_16512_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.migration_versions
    ADD CONSTRAINT idx_16512_primary PRIMARY KEY (version);


--
-- Name: nation idx_16517_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.nation
    ADD CONSTRAINT idx_16517_primary PRIMARY KEY (id);


--
-- Name: role idx_16526_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.role
    ADD CONSTRAINT idx_16526_primary PRIMARY KEY (id);


--
-- Name: sessions idx_16533_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.sessions
    ADD CONSTRAINT idx_16533_primary PRIMARY KEY (sess_id);


--
-- Name: trust_rank idx_16541_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.trust_rank
    ADD CONSTRAINT idx_16541_primary PRIMARY KEY (id);


--
-- Name: users idx_16550_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.users
    ADD CONSTRAINT idx_16550_primary PRIMARY KEY (id);


--
-- Name: user_driver idx_16557_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_driver
    ADD CONSTRAINT idx_16557_primary PRIMARY KEY (user_id, driver_id);


--
-- Name: user_nation idx_16560_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_nation
    ADD CONSTRAINT idx_16560_primary PRIMARY KEY (user_id, nation_id);


--
-- Name: user_role idx_16563_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_role
    ADD CONSTRAINT idx_16563_primary PRIMARY KEY (user_id, role_id);


--
-- Name: weapon_class idx_16568_primary; Type: CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.weapon_class
    ADD CONSTRAINT idx_16568_primary PRIMARY KEY (id);


--
-- Name: idx_16388_uniq_ff9ad9a4989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16388_uniq_ff9ad9a4989d9b62 ON xeno2.affinity_node USING btree (slug);


--
-- Name: idx_16397_uniq_e49fc989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16397_uniq_e49fc989d9b62 ON xeno2.battle_role USING btree (slug);


--
-- Name: idx_16404_idx_217c01e852594d7f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16404_idx_217c01e852594d7f ON xeno2.blade USING btree (merc_mission_id);


--
-- Name: idx_16404_idx_217c01e89b953edd; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16404_idx_217c01e89b953edd ON xeno2.blade USING btree (from_template_id);


--
-- Name: idx_16404_idx_217c01e8a76ed395; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16404_idx_217c01e8a76ed395 ON xeno2.blade USING btree (user_id);


--
-- Name: idx_16404_idx_217c01e8ae0fac85; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16404_idx_217c01e8ae0fac85 ON xeno2.blade USING btree (trust_id);


--
-- Name: idx_16404_idx_217c01e8c3423909; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16404_idx_217c01e8c3423909 ON xeno2.blade USING btree (driver_id);


--
-- Name: idx_16409_idx_d7f9a2908118485f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16409_idx_d7f9a2908118485f ON xeno2.blade_affinity_node USING btree (blade_id);


--
-- Name: idx_16409_idx_d7f9a290f810347f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16409_idx_d7f9a290f810347f ON xeno2.blade_affinity_node USING btree (affinity_node_id);


--
-- Name: idx_16415_uniq_b86276af989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16415_uniq_b86276af989d9b62 ON xeno2.blade_class USING btree (slug);


--
-- Name: idx_16424_idx_6ea9eb401c9c96cf; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16424_idx_6ea9eb401c9c96cf ON xeno2.blade_superclass USING btree (battle_role_id);


--
-- Name: idx_16424_idx_6ea9eb401f1f2a24; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16424_idx_6ea9eb401f1f2a24 ON xeno2.blade_superclass USING btree (element_id);


--
-- Name: idx_16424_idx_6ea9eb40708a0e0; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16424_idx_6ea9eb40708a0e0 ON xeno2.blade_superclass USING btree (gender_id);


--
-- Name: idx_16424_idx_6ea9eb409b14b9d9; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16424_idx_6ea9eb409b14b9d9 ON xeno2.blade_superclass USING btree (weapon_class_id);


--
-- Name: idx_16431_uniq_13dc1542989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16431_uniq_13dc1542989d9b62 ON xeno2.blade_template USING btree (slug);


--
-- Name: idx_16436_uniq_11667cd9989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16436_uniq_11667cd9989d9b62 ON xeno2.driver USING btree (slug);


--
-- Name: idx_16445_uniq_41405e39989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16445_uniq_41405e39989d9b62 ON xeno2.element USING btree (slug);


--
-- Name: idx_16454_idx_c7470a42ea000b10; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16454_idx_c7470a42ea000b10 ON xeno2.gender USING btree (class_id);


--
-- Name: idx_16454_uniq_c7470a42989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16454_uniq_c7470a42989d9b62 ON xeno2.gender USING btree (slug);


--
-- Name: idx_16463_idx_faf4b51fae3899; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16463_idx_faf4b51fae3899 ON xeno2.merc_mission USING btree (nation_id);


--
-- Name: idx_16463_uniq_faf4b51f989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16463_uniq_faf4b51f989d9b62 ON xeno2.merc_mission USING btree (slug);


--
-- Name: idx_16470_idx_f63780b852594d7f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16470_idx_f63780b852594d7f ON xeno2.merc_mission_affinity_node USING btree (merc_mission_id);


--
-- Name: idx_16470_idx_f63780b8f810347f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16470_idx_f63780b8f810347f ON xeno2.merc_mission_affinity_node USING btree (affinity_node_id);


--
-- Name: idx_16473_idx_a465e1d252594d7f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16473_idx_a465e1d252594d7f ON xeno2.merc_mission_merc_mission_prerequisite USING btree (merc_mission_id);


--
-- Name: idx_16473_idx_a465e1d2d3aa45cb; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16473_idx_a465e1d2d3aa45cb ON xeno2.merc_mission_merc_mission_prerequisite USING btree (merc_mission_prerequisite_id);


--
-- Name: idx_16476_idx_24e4a71b52594d7f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16476_idx_24e4a71b52594d7f ON xeno2.merc_mission_merc_mission_requirement USING btree (merc_mission_id);


--
-- Name: idx_16476_idx_24e4a71b6f5f9e61; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16476_idx_24e4a71b6f5f9e61 ON xeno2.merc_mission_merc_mission_requirement USING btree (merc_mission_requirement_id);


--
-- Name: idx_16481_uniq_5e819534989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16481_uniq_5e819534989d9b62 ON xeno2.merc_mission_prerequisite USING btree (slug);


--
-- Name: idx_16494_idx_a94d0871ea000b10; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16494_idx_a94d0871ea000b10 ON xeno2.merc_mission_requirement_class USING btree (class_id);


--
-- Name: idx_16497_idx_eb0de4af1f1f2a24; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16497_idx_eb0de4af1f1f2a24 ON xeno2.merc_mission_requirement_element USING btree (element_id);


--
-- Name: idx_16500_idx_56accc8c83bd468f; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16500_idx_56accc8c83bd468f ON xeno2.merc_mission_requirement_field_skill USING btree (field_skill_id);


--
-- Name: idx_16503_idx_80b1c32c708a0e0; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16503_idx_80b1c32c708a0e0 ON xeno2.merc_mission_requirement_gender USING btree (gender_id);


--
-- Name: idx_16509_idx_c0d2df449b14b9d9; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16509_idx_c0d2df449b14b9d9 ON xeno2.merc_mission_requirement_weapon_class USING btree (weapon_class_id);


--
-- Name: idx_16517_uniq_cc5a6d27989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16517_uniq_cc5a6d27989d9b62 ON xeno2.nation USING btree (slug);


--
-- Name: idx_16526_uniq_57698a6a989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16526_uniq_57698a6a989d9b62 ON xeno2.role USING btree (slug);


--
-- Name: idx_16541_uniq_7880d3b1989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16541_uniq_7880d3b1989d9b62 ON xeno2.trust_rank USING btree (slug);


--
-- Name: idx_16550_uniq_8d93d64976f5c865; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16550_uniq_8d93d64976f5c865 ON xeno2.users USING btree (google_id);


--
-- Name: idx_16550_uniq_8d93d649e7927c74; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16550_uniq_8d93d649e7927c74 ON xeno2.users USING btree (email);


--
-- Name: idx_16557_idx_743467e4a76ed395; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16557_idx_743467e4a76ed395 ON xeno2.user_driver USING btree (user_id);


--
-- Name: idx_16557_idx_743467e4c3423909; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16557_idx_743467e4c3423909 ON xeno2.user_driver USING btree (driver_id);


--
-- Name: idx_16560_idx_a908761aa76ed395; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16560_idx_a908761aa76ed395 ON xeno2.user_nation USING btree (user_id);


--
-- Name: idx_16560_idx_a908761aae3899; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16560_idx_a908761aae3899 ON xeno2.user_nation USING btree (nation_id);


--
-- Name: idx_16563_idx_2de8c6a3a76ed395; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16563_idx_2de8c6a3a76ed395 ON xeno2.user_role USING btree (user_id);


--
-- Name: idx_16563_idx_2de8c6a3d60322ac; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE INDEX idx_16563_idx_2de8c6a3d60322ac ON xeno2.user_role USING btree (role_id);


--
-- Name: idx_16568_uniq_c0f1e9fa989d9b62; Type: INDEX; Schema: xeno2; Owner: xeno2
--

CREATE UNIQUE INDEX idx_16568_uniq_c0f1e9fa989d9b62 ON xeno2.weapon_class USING btree (slug);


--
-- Name: blade_template fk_13dc1542bf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_template
    ADD CONSTRAINT fk_13dc1542bf396750 FOREIGN KEY (id) REFERENCES xeno2.blade_superclass(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: blade fk_217c01e852594d7f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT fk_217c01e852594d7f FOREIGN KEY (merc_mission_id) REFERENCES xeno2.merc_mission(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade fk_217c01e89b953edd; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT fk_217c01e89b953edd FOREIGN KEY (from_template_id) REFERENCES xeno2.blade_template(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade fk_217c01e8a76ed395; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT fk_217c01e8a76ed395 FOREIGN KEY (user_id) REFERENCES xeno2.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade fk_217c01e8ae0fac85; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT fk_217c01e8ae0fac85 FOREIGN KEY (trust_id) REFERENCES xeno2.trust_rank(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade fk_217c01e8bf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT fk_217c01e8bf396750 FOREIGN KEY (id) REFERENCES xeno2.blade_superclass(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: blade fk_217c01e8c3423909; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade
    ADD CONSTRAINT fk_217c01e8c3423909 FOREIGN KEY (driver_id) REFERENCES xeno2.driver(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_merc_mission_requirement fk_24e4a71b52594d7f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_merc_mission_requirement
    ADD CONSTRAINT fk_24e4a71b52594d7f FOREIGN KEY (merc_mission_id) REFERENCES xeno2.merc_mission(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_merc_mission_requirement fk_24e4a71b6f5f9e61; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_merc_mission_requirement
    ADD CONSTRAINT fk_24e4a71b6f5f9e61 FOREIGN KEY (merc_mission_requirement_id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: user_role fk_2de8c6a3a76ed395; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_role
    ADD CONSTRAINT fk_2de8c6a3a76ed395 FOREIGN KEY (user_id) REFERENCES xeno2.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: user_role fk_2de8c6a3d60322ac; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_role
    ADD CONSTRAINT fk_2de8c6a3d60322ac FOREIGN KEY (role_id) REFERENCES xeno2.role(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_requirement_field_skill fk_56accc8c83bd468f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_field_skill
    ADD CONSTRAINT fk_56accc8c83bd468f FOREIGN KEY (field_skill_id) REFERENCES xeno2.affinity_node(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_field_skill fk_56accc8cbf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_field_skill
    ADD CONSTRAINT fk_56accc8cbf396750 FOREIGN KEY (id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: blade_superclass fk_6ea9eb401c9c96cf; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_superclass
    ADD CONSTRAINT fk_6ea9eb401c9c96cf FOREIGN KEY (battle_role_id) REFERENCES xeno2.battle_role(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade_superclass fk_6ea9eb401f1f2a24; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_superclass
    ADD CONSTRAINT fk_6ea9eb401f1f2a24 FOREIGN KEY (element_id) REFERENCES xeno2.element(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade_superclass fk_6ea9eb40708a0e0; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_superclass
    ADD CONSTRAINT fk_6ea9eb40708a0e0 FOREIGN KEY (gender_id) REFERENCES xeno2.gender(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade_superclass fk_6ea9eb409b14b9d9; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_superclass
    ADD CONSTRAINT fk_6ea9eb409b14b9d9 FOREIGN KEY (weapon_class_id) REFERENCES xeno2.weapon_class(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_driver fk_743467e4a76ed395; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_driver
    ADD CONSTRAINT fk_743467e4a76ed395 FOREIGN KEY (user_id) REFERENCES xeno2.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: user_driver fk_743467e4c3423909; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_driver
    ADD CONSTRAINT fk_743467e4c3423909 FOREIGN KEY (driver_id) REFERENCES xeno2.driver(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_requirement_gender fk_80b1c32c708a0e0; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_gender
    ADD CONSTRAINT fk_80b1c32c708a0e0 FOREIGN KEY (gender_id) REFERENCES xeno2.gender(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_gender fk_80b1c32cbf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_gender
    ADD CONSTRAINT fk_80b1c32cbf396750 FOREIGN KEY (id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_merc_mission_prerequisite fk_a465e1d252594d7f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_merc_mission_prerequisite
    ADD CONSTRAINT fk_a465e1d252594d7f FOREIGN KEY (merc_mission_id) REFERENCES xeno2.merc_mission(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_merc_mission_prerequisite fk_a465e1d2d3aa45cb; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_merc_mission_prerequisite
    ADD CONSTRAINT fk_a465e1d2d3aa45cb FOREIGN KEY (merc_mission_prerequisite_id) REFERENCES xeno2.merc_mission_prerequisite(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: user_nation fk_a908761aa76ed395; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_nation
    ADD CONSTRAINT fk_a908761aa76ed395 FOREIGN KEY (user_id) REFERENCES xeno2.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: user_nation fk_a908761aae3899; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.user_nation
    ADD CONSTRAINT fk_a908761aae3899 FOREIGN KEY (nation_id) REFERENCES xeno2.nation(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_requirement_class fk_a94d0871bf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_class
    ADD CONSTRAINT fk_a94d0871bf396750 FOREIGN KEY (id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_requirement_class fk_a94d0871ea000b10; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_class
    ADD CONSTRAINT fk_a94d0871ea000b10 FOREIGN KEY (class_id) REFERENCES xeno2.blade_class(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_weapon_class fk_c0d2df449b14b9d9; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_weapon_class
    ADD CONSTRAINT fk_c0d2df449b14b9d9 FOREIGN KEY (weapon_class_id) REFERENCES xeno2.weapon_class(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_weapon_class fk_c0d2df44bf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_weapon_class
    ADD CONSTRAINT fk_c0d2df44bf396750 FOREIGN KEY (id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: gender fk_c7470a42ea000b10; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.gender
    ADD CONSTRAINT fk_c7470a42ea000b10 FOREIGN KEY (class_id) REFERENCES xeno2.blade_class(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_strength fk_cf7f9a13bf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_strength
    ADD CONSTRAINT fk_cf7f9a13bf396750 FOREIGN KEY (id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: blade_affinity_node fk_d7f9a2908118485f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_affinity_node
    ADD CONSTRAINT fk_d7f9a2908118485f FOREIGN KEY (blade_id) REFERENCES xeno2.blade_superclass(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: blade_affinity_node fk_d7f9a290f810347f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.blade_affinity_node
    ADD CONSTRAINT fk_d7f9a290f810347f FOREIGN KEY (affinity_node_id) REFERENCES xeno2.affinity_node(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_element fk_eb0de4af1f1f2a24; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_element
    ADD CONSTRAINT fk_eb0de4af1f1f2a24 FOREIGN KEY (element_id) REFERENCES xeno2.element(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: merc_mission_requirement_element fk_eb0de4afbf396750; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_requirement_element
    ADD CONSTRAINT fk_eb0de4afbf396750 FOREIGN KEY (id) REFERENCES xeno2.merc_mission_requirement(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_affinity_node fk_f63780b852594d7f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_affinity_node
    ADD CONSTRAINT fk_f63780b852594d7f FOREIGN KEY (merc_mission_id) REFERENCES xeno2.merc_mission(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission_affinity_node fk_f63780b8f810347f; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission_affinity_node
    ADD CONSTRAINT fk_f63780b8f810347f FOREIGN KEY (affinity_node_id) REFERENCES xeno2.affinity_node(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: merc_mission fk_faf4b51fae3899; Type: FK CONSTRAINT; Schema: xeno2; Owner: xeno2
--

ALTER TABLE ONLY xeno2.merc_mission
    ADD CONSTRAINT fk_faf4b51fae3899 FOREIGN KEY (nation_id) REFERENCES xeno2.nation(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

