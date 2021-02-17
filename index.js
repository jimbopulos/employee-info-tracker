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
// prompt for user (inquirer)
const init = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            // what would you like to do?
            message: 'What would you like to do?',
            choices: [
                // view
                'View departments',
                'View roles',
                'View employees',
                // add
                'Add a department',
                'Add a role',
                'Add an employee',
                // update employee roles
                'Update an employee role',
                // EXIT (connection.end)
                'Exit',
            ],
        })
        .then(async answer => {
            switch (answer.action) {
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
                await addDepartment();
                    break;

                case 'Add a role':
                await addRole();
                    break;
                
                case 'Add an employee':
                await addEmployee();
                    break;

                case 'Update an employee role':
                await updateRole();
                    break;
                
                case 'Exit':
                    exit();
                    break;

                default:
                    console.log(`Couldn't execute: ${answer.action}`);
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
const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// Add departments
const addDepartment = () => {
    inquirer
        .prompt({
            name: 'newDepartment',
            type: 'input',
            message: 'What department would you like to add?',
        })
        .then((answer) => {
            const query = 'INSERT INTO department SET ?';
            connection.query(query, { name: answer.newDepartment }, (err, res) => {
                if (err) throw err;
                console.log(`${answer.newDepartment} department added!`);
                init();
            })
        })
};
// init 

// Add roles
// init

// Add employees
// init

// Update employee roles
    // init

// EXIT
const exit = () => {
    connection.end();
}

