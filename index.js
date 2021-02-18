// Dependencies
const fs = require("fs");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags, title } = require("process");

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
        .prompt([{
            name: 'action',
            type: 'list',
            // what would you like to do?
            message: 'What would you like to do?',
            choices: [
                // view
                'View all departments',
                'View all roles',
                'View all employees',
                // add
                'Add a department',
                'Add a role',
                'Add an employee',
                // update employee roles
                'Update an employee role',
                // EXIT (connection.end)
                'Exit',
            ],
        }])
        .then(async answer => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                
                case 'View all roles':
                    viewRoles();
                    break;
                
                case 'View all employees':
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
    return connection.query('SELECT * FROM department', (err, res) => {
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
    connection.query(`
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
    `, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// Add departments
const addDepartment = () => {
    inquirer
        .prompt([{
            name: 'newDepartment',
            type: 'input',
            message: 'What department would you like to add?',
        }])
        .then((answer) => {
            const query = 'INSERT INTO department SET ?';
            connection.query(query, { name: answer.newDepartment }, (err, res) => {
                if (err) throw err;
                console.log(`${answer.newDepartment} department added!`);
                init();
            });
        });
};

// Add roles
const addRole = async () => {
    const departmentList = [];
    await connection.query('SELECT * FROM department', (err, res) => {
        res.forEach(({ id, name }) => {
            departmentList.push({ 
                value: id, 
                name: name
            });
          });
    });
    // console.log(departmentList);
    await inquirer
        .prompt(
        [{
            name: 'newRole',
            type: 'input',
            message: 'What role would you like to add?',
        },
        {
            name: 'newSalary',
            type: 'input',
            message: 'What salary will this role earn?',
        },
        {
            name: 'department',
            type: 'rawlist',
            choices: departmentList,
            message: 'To which department will this role belong?',
        }
        ])
        .then((answer) => {
            const query = 'INSERT INTO role SET ?';
            connection.query(query, 
                { 
                    title: answer.newRole,
                    salary: answer.newSalary,
                    department_id: answer.department,
                }, 
                async (err, res) => {
                if (err) throw err;
                console.log(`${answer.newRole} role added!`);
                await init();
            });
        });
};

// Add employees
const addEmployee = async () => {
    const roleList = [];
    const managerList = [];
    await connection.query(`SELECT * FROM role`, (err, res) => {
        res.forEach(({ id, title, salary, department_id }) => {
            roleList.push({
                value: id,  
                title: title,
                salary: salary,
                department: department_id, 
            });
          });
    });
    await connection.query(`SELECT * FROM employee`, (err, res) => {
        res.forEach(({ id, managerFirstName, managerLastName, role_id, manager_id }) => {
            managerList.push({
                value: id,
                first_name: managerFirstName,
                last_name: managerLastName,
                role_id: role_id,
                manager_id: manager_id,
            });
        });
    })
    // console.log(roleList);
    await inquirer.prompt([
        {
            name: 'employeeFirstName',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'employeeLastName',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'employeeRole',
            type: 'list',
            choices: roleList,
            message: "What will their role ID be?",
        },
        {
            name: 'employeeManager',
            type: 'list',
            choices: managerList,
            message: "What is the ID of this employee's manager?",
        },
    ])
    .then((answer) => {
        const query = 'INSERT INTO employee SET ?';
        connection.query(query, 
            {
                // value: id,
                first_name: answer.employeeFirstName,
                last_name: answer.employeeLastName,
                role_id: answer.employeeRole,
                manager_id: answer.employeeManager,
            },
            async (err, res) => {
                if (err) throw err;
                console.log(`Employee ${answer.employeeFirstName} ${answer.employeeLastName} added to the team!`);
                await init();
            });
    });
};

// Update employee roles
const updateRole = () => {
    
}
    // init

// EXIT
const exit = () => {
    connection.end();
}

