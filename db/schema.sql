-- DROP DATABASE IF EXISTS
DROP DATABASE IF EXISTS employeeDB;

-- CREATE DB
CREATE DATABASE employeeDB;

-- USE DB
USE employeeDB;

-- TABLES FOR DATA
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT NULL,
    FOREIGN KEY (manager_id) REFERENCES role(id),
    PRIMARY KEY (id)
);

-- INSERT DATA into tables

-- JOIN tables
-- SELECT * FROM table ... (WHERE)
