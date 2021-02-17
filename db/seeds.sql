INSERT INTO department (name)
VALUES ('Engineering'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 1);

INSERT employee (first_name, last_name, role_id, manager_id)
VALUES ('Jimmy', 'Galantino', 1, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;