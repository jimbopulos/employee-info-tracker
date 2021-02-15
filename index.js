// Dependencies
const fs = require("fs");
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
  
    // port
    port: 3306,
  
    // username
    user: 'root',
  
    // password and database path
    password: 'sUsh!8585',
    database: 'employeeDB',
});

// query functions
    // View Departments
    function viewDepartments() {
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            console.table(res);
            connection.end();
        });
    };
viewDepartments();

// prompt for user (inquirer)
    // what would you like to do?
    // add
        // department
        // employee
        // role
    // view
        // departments 
        // roles
        // employees
    // update employee roles