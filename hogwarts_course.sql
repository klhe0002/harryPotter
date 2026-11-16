--
-- PostgreSQL database dump
--

\restrict itsQGyLDe7ajkFhD6q5CeKsHuFu5UgTDnbApFTJJDaubMOsoEJyGGDb4NZWe8tg

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
    fk_teachers integer,
    type character varying(30),
    level character varying(10),
    school_year integer
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
    school_year integer,
    fk_houses integer,
    birthday date
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
    fk_houses integer,
    employment_start date,
    currently_active boolean,
    deceased boolean
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
-- Name: exams; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.exams (
    id integer NOT NULL,
    fk_course integer NOT NULL,
    fk_student integer NOT NULL,
    fk_grade character(1) NOT NULL
);


ALTER TABLE hogwarts_course.exams OWNER TO postgres;

--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE hogwarts_course.exams ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME hogwarts_course.exams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: grades; Type: TABLE; Schema: hogwarts_course; Owner: postgres
--

CREATE TABLE hogwarts_course.grades (
    letter character(1) NOT NULL,
    name character varying(30),
    description text,
    passed boolean
);


ALTER TABLE hogwarts_course.grades OWNER TO postgres;

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

INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (2, 'Potions', 2, 'core', 'OWL', 1);
INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (3, 'Herbology', 3, 'core', 'OWL', 1);
INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (4, 'Charms', 4, 'core', 'OWL', 1);
INSERT INTO hogwarts_course.courses OVERRIDING SYSTEM VALUE VALUES (1, 'Transfiguration', 1, 'core', 'OWL', 1);


--
-- Data for Name: exams; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, 'E');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (2, 2, 1, 'P');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (3, 3, 1, 'A');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (5, 2, 2, 'O');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (6, 4, 2, 'O');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (7, 2, 3, 'A');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (8, 3, 3, 'E');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (9, 2, 4, 'E');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (10, 4, 4, 'A');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (11, 4, 5, 'E');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (12, 3, 6, 'O');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (17, 1, 1, 'T');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (4, 1, 1, 'A');
INSERT INTO hogwarts_course.exams OVERRIDING SYSTEM VALUE VALUES (18, 1, 1, 'A');


--
-- Data for Name: grades; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.grades VALUES ('O', 'Outstanding', 'CONGRATULATIONS! Your exemplary powers of deduction and a formidable knowledge of the inner workings of the magical world reveal you to be a witch or wizard of genuine skill and learning.', true);
INSERT INTO hogwarts_course.grades VALUES ('E', 'Exceeds Expectations', 'Well done – a most creditable performance!', true);
INSERT INTO hogwarts_course.grades VALUES ('A', 'Acceptable', 'demonstrates real magical potential.', true);
INSERT INTO hogwarts_course.grades VALUES ('P', 'Poor', 'Alas – we regret to inform you that you have narrowly failed. This may have been due to factors outside your control (eg: poltergeist intervention, examination nerves or a malfunctioning quill.) Please do not disconsolate.', false);
INSERT INTO hogwarts_course.grades VALUES ('D', 'Dreadful', 'We are sorry to inform you that you have failed.', false);
INSERT INTO hogwarts_course.grades VALUES ('T', 'Troll', 'You would appear either to have abandoned the test due to factors outside your control (eg, earthquake, poltergeist attack), or else you are a troll, in which case you are to be congratulated on being able to use a computer and have achieved the grade of O.F.T. (Outstanding for Trolls).', false);


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

INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (1, 'Harry Potter', 1, 1, '1980-07-31');
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (2, 'Hermione Granger', 1, 1, '1979-09-19');
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (3, 'Ron Weasley', 1, 1, '1980-03-01');
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (4, 'Draco Malfoy', 1, 4, '1980-06-05');
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (5, 'Luna Lovegood', 1, 3, '1981-02-13');
INSERT INTO hogwarts_course.students OVERRIDING SYSTEM VALUE VALUES (6, 'Cedric Diggory', 3, 2, '1977-10-01');


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: hogwarts_course; Owner: postgres
--

INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (23, 'Remus Lupin', 1, '1993-09-01', false, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (24, 'Remus Lupin', 1, '1993-09-01', false, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (25, 'Test updated', 3, '1960-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (1, 'Minerva McGonagall', 1, '1956-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (2, 'Severus Snape', 4, '1981-09-01', true, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (3, 'Pomona Sprout', 2, '1965-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (4, 'Filius Flitwick', 3, '1960-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (5, 'Remus Lupin', 1, '1993-09-01', false, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (6, 'Albus Percival Wulfric Brian Dumbledore', 1, '1938-09-01', true, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (7, 'Charity Burbage', 1, '1980-09-01', true, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (8, 'Quirinus Quirrell', 3, '1990-09-01', true, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (9, 'Silvanus Kettleburn', 2, '1950-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (10, 'Gilderoy Lockhart', 3, '1992-09-01', false, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (11, 'Sybill Trelawney', 3, '1980-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (12, 'Horace Slughorn', 4, '1930-09-01', false, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (13, 'Dolores Umbridge', 4, '1995-09-01', false, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (14, 'Bathsheda Babbling', NULL, '1985-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (15, 'Aurora Sinistra', NULL, '1985-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (16, 'Alastor Moody', NULL, '1994-09-01', false, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (17, 'Rolanda Hooch', NULL, '1980-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (18, 'Cuthbert Binns', NULL, '1900-09-01', true, true);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (19, 'Septima Vector', NULL, '1985-09-01', true, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (20, 'Wilhelmina Grubbly-Plank', NULL, '1993-09-01', false, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (21, 'Rubeus Hagrid', 1, '1993-09-01', false, false);
INSERT INTO hogwarts_course.teachers OVERRIDING SYSTEM VALUE VALUES (22, 'Firenze', NULL, '1996-09-01', false, false);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."Course_id_seq"', 9, true);


--
-- Name: House_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."House_id_seq"', 4, true);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."Student_id_seq"', 10, true);


--
-- Name: Teachers_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course."Teachers_id_seq"', 25, true);


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: hogwarts_course; Owner: postgres
--

SELECT pg_catalog.setval('hogwarts_course.exams_id_seq', 18, true);


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
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (letter);


--
-- Name: student_course student_course_pkey; Type: CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.student_course
    ADD CONSTRAINT student_course_pkey PRIMARY KEY (fk_student, fk_course);


--
-- Name: exams fk_course; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.exams
    ADD CONSTRAINT fk_course FOREIGN KEY (fk_course) REFERENCES hogwarts_course.courses(id);


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
-- Name: exams fk_grades; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.exams
    ADD CONSTRAINT fk_grades FOREIGN KEY (fk_grade) REFERENCES hogwarts_course.grades(letter);


--
-- Name: student_course fk_student; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.student_course
    ADD CONSTRAINT fk_student FOREIGN KEY (fk_student) REFERENCES hogwarts_course.students(id) ON DELETE CASCADE;


--
-- Name: exams fk_students; Type: FK CONSTRAINT; Schema: hogwarts_course; Owner: postgres
--

ALTER TABLE ONLY hogwarts_course.exams
    ADD CONSTRAINT fk_students FOREIGN KEY (fk_student) REFERENCES hogwarts_course.students(id);


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

\unrestrict itsQGyLDe7ajkFhD6q5CeKsHuFu5UgTDnbApFTJJDaubMOsoEJyGGDb4NZWe8tg

