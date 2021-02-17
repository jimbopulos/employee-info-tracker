-- DROP DATABASE IF EXISTS
DROP DATABASE IF EXISTS employeeDB;

-- CREATE DB
CREATE DATABASE employeeDB;

-- USE DB
USE employeeDB;

-- TABLES FOR DATA
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(7, 2),
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

-- INSERT DATA into tables
-- JOIN tables
-- SELECT * FROM table ... (WHERE)
