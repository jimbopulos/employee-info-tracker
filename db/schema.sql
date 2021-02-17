-- CREATE DB
CREATE DATABASE employeeDB;

-- USE DB
USE employeeDB;

-- TABLES FOR DATA
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL,
    manager_id INT NULL
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- INSERT DATA into tables

-- JOIN tables
-- SELECT * FROM table ... (WHERE)
