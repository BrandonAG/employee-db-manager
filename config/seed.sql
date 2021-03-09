USE employees_db;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Marketing"),
    ("Research and Development"),
    ("Qaulity Assurance");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Analyst", 125000, 1),
    ("Marketing Analyst", 120000, 2),
    ("Design Engineer", 120000, 3),
    ("Applications Engineer", 130000, 3),
    ("Qaulity Assurance Engineer", 130000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Tom", "Smith", 2, NULL),
    ("Amy", "Watson", 1, NULL),
    ("Sam", "Branson", 3, 4),
    ("Jackie", "Simmons", 3, NULL),
    ("Barbara", "Thompson", 4, NULL),
    ("Jeff", "Chung", 5, NULL);