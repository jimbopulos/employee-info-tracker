INSERT INTO department (name)
VALUES ('Engineering'), 
('Sales'), 
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 1),
('Sales Lead', 100000, 2),
('Lawyer', 160000, 3);

INSERT employee (first_name, last_name, role_id, manager_id)
VALUES ('Jimmy', 'Galantino', 1, 2), 
('Loreto', 'Delgado III', 2, null),
('Carolina', 'Rizk', 3, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT employee.id,
first_name, 
last_name,
role.title,
role.department_id,
role.salary, 
manager_id
FROM employee
INNER JOIN role
ON role.id = employee.role_id;

SELECT * FROM employee AS manager
LEFT JOIN role
ON manager.id = role.id;

SELECT * FROM employee
WHERE manager_id = employee.id