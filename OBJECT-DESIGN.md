Teachers:
{
"id": 4,
"name": "Filius Flitwick",
"house": "Ravenclaw",
"employment_start": "1970-09-01",
"currently_active": true,
"deceased": false
}

POST Teacher:
{
"name": "Filius Flitwick",
"fk_houses": 2,
"employment_start": "1970-09-01",
"currently_active": true,
"deceased": false
}

Course:
{
"id": 3,
"name": "Herbology",
"teacher": "Pomona Sprout",
"type": "core",
"level": "OWL",
"school_year": 1
}

POST course:
{
"name": "Herbology",
"fk_teachers": 2,
"type": "core",
"level": "OWL",
"school_year": 1
}

student:
{
"id": 1,
"name": "Harry Potter",
"school_year": 1,
"house": "Gryffindor",
"birthday": "2002-02-08"
}

POST student:
{
"name": "Harry Potter",
"school_year": 1,
"fk_houses": 1,
"birthday": "2002-02-08"
}

exam:
{
"id": 1,
"course": "Herbology",
"student": "Harry Potter",
"grade": "O"
}

POST exam:
{
"fk_course": 3,
"fk_student": 1,
"fk_grade": "O"
}

Grade:
{
"letter": "A",
"name": "Acceptable",
"description": "demonstrates real magical potential.",
"passed": true
}

Hvordan de kommer ind:
{
"fk_course": 3,
"fk_student": 1,
"fk_grade": "O"
}
