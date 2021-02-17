// Dependencies
const fs = require("fs");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");

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

// establish connect, run init function
connection.connect((err) => {
    if (err) throw err;
    init();
  });

// init function to begin inquirer
const init = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        })
        .then((input) => {
            switch (input.action) {
                case 'View departments':
                    viewDepartments();
                    break;
                
                case 'View roles':
                    viewRoles();
                    break;
                
                case 'View employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;
                
                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update an employee role':
                    updateRole();
                    break;
                
                case 'Exit':
                    exit();
                    break;

                default:
                    console.log(`Couldn't execute: ${input.action}`);
                    break;
            }
        });
};

// query functions
// View Departments
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// View Roles
const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// View Employees

// EXIT
const exit = () => {
    connection.end();
}

// prompt for user (inquirer)
    // what would you like to do?
    // add
        // department
        // role
        // employee
        // init
    // view
        // departments 
        // roles
        // employees
        // init
    // update employee roles
        // init
    // EXIT (connection.end)