--
-- PostgreSQL database dump
--

\restrict ipDnRP2Dt5kqtNinTGJyNAmt1bRMi01Egrh6vX3Gqradk7wxSz2oeMGf9CcyM9e

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hogwarts_course; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hogwarts_course;


ALTER SCHEMA hogwarts_course OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.courses (
    id integer CONSTRAINT "Course_id_not_null" NOT NULL,
    name character varying(60) CONSTRAINT "Course_Name_not_null" NOT NULL,
    fk_teachers integer
);


ALTER TABLE hogwarts_course.courses OWNER TO postgres;

--
-- Name: Course_id_seq; Type: SEQUENCE; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE hogwarts_course.courses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME hogwarts_course."Course_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: houses; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.houses (
    id integer CONSTRAINT "House_id_not_null" NOT NULL,
    name character varying(60) CONSTRAINT "House_Name_not_null" NOT NULL,
    colors character varying(60) CONSTRAINT "House_Colors_not_null" NOT NULL,
    founder character varying(60) CONSTRAINT "House_Founder_not_null" NOT NULL,
    fk_houses integer
);


ALTER TABLE hogwarts_course.houses OWNER TO postgres;

--
-- Name: House_id_seq; Type: SEQUENCE; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE hogwarts_course.houses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME hogwarts_course."House_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: students; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.students (
    id integer CONSTRAINT "Student_id_not_null" NOT NULL,
    name character varying(60) CONSTRAINT "Student_Name_not_null" NOT NULL,
    year integer,
    fk_houses integer
);


ALTER TABLE hogwarts_course.students OWNER TO postgres;

--
-- Name: Student_id_seq; Type: SEQUENCE; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE hogwarts_course.students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME hogwarts_course."Student_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: teachers; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.teachers (
    id integer CONSTRAINT "Teachers_id_not_null" NOT NULL,
    name character varying(60) CONSTRAINT "Teachers_Name_not_null" NOT NULL,
    fk_houses integer
);


ALTER TABLE hogwarts_course.teachers OWNER TO postgres;

--
-- Name: Teachers_id_seq; Type: SEQUENCE; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE hogwarts_course.teachers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME hogwarts_course."Teachers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: student_course; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.student_course (
    fk_student integer NOT NULL,
    fk_course integer NOT NULL
);


ALTER TABLE hogwarts_course.student_course OWNER TO postgres;

--
-- Data for Name: courses; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (1, 'Transfiguration', 1);
INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (3, 'Herbology', 3);
INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (4, 'Charms', 4);
INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (2, 'Potions', 2);


--
-- Data for Name: houses; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.houses OVERRIDING SYSTEM VALUE VALUES (1, 'Gryffindor', 'Scarlet and gold', 'Godric Gryffindor', NULL);
INSERT INTO hogwarts_course.houses OVERRIDING SYSTEM VALUE VALUES (2, 'Hufflepuff', 'Yellow and black', 'Helga Hufflepuff', NULL);
INSERT INTO hogwarts_course.houses OVERRIDING SYSTEM VALUE VALUES (3, 'Ravenclaw', 'Blue and bronze', 'Rowena Ravenclaw', NULL);
INSERT INTO hogwarts_course.houses OVERRIDING SYSTEM VALUE VALUES (4, 'Slytherin', 'Green and silver', 'Salazar Slytherin', NULL);


--
-- Data for Name: student_course; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.student_course VALUES (1, 1);
INSERT INTO hogwarts_course.student_course VALUES (1, 2);
INSERT INTO hogwarts_course.student_course VALUES (2, 1);
INSERT INTO hogwarts_course.student_course VALUES (2, 2);
INSERT INTO hogwarts_course.student_course VALUES (2, 4);
INSERT INTO hogwarts_course.student_course VALUES (3, 2);
INSERT INTO hogwarts_course.student_course VALUES (4, 2);
INSERT INTO hogwarts_course.student_course VALUES (4, 4);
INSERT INTO hogwarts_course.student_course VALUES (5, 4);
INSERT INTO hogwarts_course.student_course VALUES (1, 3);
INSERT INTO hogwarts_course.student_course VALUES (3, 3);
INSERT INTO hogwarts_course.student_course VALUES (6, 3);


--
-- Data for Name: students; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (1, 'Harry Potter', 1, 1);
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (2, 'Hermione Granger', 1, 1);
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (3, 'Ron Weasley', 1, 1);
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (4, 'Draco Malfoy', 1, 4);
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (5, 'Luna Lovegood', 1, 3);
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (6, 'Cedric Diggory', 3, 2);


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (1, 'Minerva McGonagall', 1);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (2, 'Severus Snape', 4);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (3, 'Pomona Sprout', 2);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (4, 'Filius Flitwick', 3);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."Course_id_seq"', 7, true);


--
-- Name: House_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."House_id_seq"', 4, true);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."Student_id_seq"', 9, true);


--
-- Name: Teachers_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."Teachers_id_seq"', 7, true);


--
-- Name: courses Course_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.courses
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: houses House_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.houses
    ADD CONSTRAINT "House_pkey" PRIMARY KEY (id);


--
-- Name: students Student_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.students
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: teachers Teachers_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.teachers
    ADD CONSTRAINT "Teachers_pkey" PRIMARY KEY (id);


--
-- Name: student_course student_course_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.student_course
    ADD CONSTRAINT student_course_pkey PRIMARY KEY (fk_student, fk_course);


--
-- Name: student_course fk_course; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.student_course
    ADD CONSTRAINT fk_course FOREIGN KEY (fk_course) REFERENCES hogwarts_course.courses(id) ON DELETE CASCADE;


--
-- Name: courses fk_courses_teachers; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.courses
    ADD CONSTRAINT fk_courses_teachers FOREIGN KEY (fk_teachers) REFERENCES hogwarts_course.teachers(id) ON DELETE SET NULL NOT VALID;


--
-- Name: student_course fk_student; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.student_course
    ADD CONSTRAINT fk_student FOREIGN KEY (fk_student) REFERENCES hogwarts_course.students(id) ON DELETE CASCADE;


--
-- Name: students fk_students_houses; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.students
    ADD CONSTRAINT fk_students_houses FOREIGN KEY (fk_houses) REFERENCES hogwarts_course.houses(id) NOT VALID;


--
-- Name: houses fk_teachers_houses; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.houses
    ADD CONSTRAINT fk_teachers_houses FOREIGN KEY (fk_houses) REFERENCES hogwarts_course.houses(id) NOT VALID;


--
-- Name: teachers teachers_fk_houses_fkey; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.teachers
    ADD CONSTRAINT teachers_fk_houses_fkey FOREIGN KEY (fk_houses) REFERENCES hogwarts_course.houses(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

\unrestrict ipDnRP2Dt5kqtNinTGJyNAmt1bRMi01Egrh6vX3Gqradk7wxSz2oeMGf9CcyM9e

