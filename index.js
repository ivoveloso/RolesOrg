// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config();
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

const initPrompt = [
  'View All Employees',
  'Add Employee',
  'Update Employee Role',
  'View All Roles',
  'Add Role',
  'View All Departments',
  'Add Department',
  'Quit'
];

const departmentQs = [
  'Whats the department name?'
];

const roleQs = [
  'What is the role title?',
  'What is this role salary?',
  'What is the department?'
]

const employeeQs = [
  'What is the first name?',
  'What is the last name?',
  'What is the role?',
  'Who is the manager?'
]

function init() {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: initPrompt,
      name: 'option'
    },
  ])
  .then(val => {
    console.log("val", val)
    switch (val.option) {
      case 'View All Employees':
        getallemployees()
        break;
      case 'Add Employee':
        break;
      case 'View All Departments':
          getalldepartments()
          break;
      case 'View All Roles':
          getallroles()
          break;
      case 'Add Department':
        addDepartment()
        break;
      case 'Update Employee Role':
        updateEmpRole()
        break;
    
      default:
        break;
    }
    return console.log(val.option);
    })}

    function getalldepartments() {
      const sql = 'SELECT * FROM department'

      db.query(sql, (err, result) => {
        if (err) {
          console.error(err)
          return;
        }
        
        console.table(result);
        init();
      });
    }

    function getallemployees() {
      const sql = 'SELECT * FROM employee JOIN role ON role.id = employee.role_id JOIN employee AS manager ON manager.id = employee.manager_id'

      db.query(sql, (err, result) => {
        if (err) {
          console.error(err)
          return;
        }
        console.table(result);
        init();
      });
    }

    function getallroles() {
      const sql = 'SELECT * FROM role JOIN department ON department.id = role.department_id'
      db.query(sql, (err, result) => {
        if (err) {
          console.error(err)
          return;
        }
        console.table(result);
        init();
      });
    }

    function addDepartment() {
      inquirer
      .prompt ([{
        message: departmentQs[0],
        name: 'data'
      }])
      .then(val => {
        const sql = 'INSERT INTO department (name) VALUES (?)'
        const params = [val.data]
        db.query(sql, params, (err,result) => {
          if (err) {
            console.error(err)
            return;
          }
          console.log('Department added!')
          init();
        });
      })
    }

    function updateEmpRole() {
      const sql = 'SELECT first_name, last_name, id FROM employee'
      const sql2 = 'SELECT title, id FROM role'
      db.query(sql, (err,result) => {
        if (err) {
          console.error(err)
          return;
        }
        db.query(sql2, (err,result2) => {
          if (err) {
            console.error(err)
            return;
          }
          const employees = result.map(emp => ({name: `${emp.first_name} ${emp.last_name}`, value: emp.id}))
          const roles = result2.map(rol => ({name: rol.title, value: rol.id}))
          inquirer
          .prompt([
            {
              type: 'list',
              message: 'What is the employee name?',
              choices: employees,
              name: 'employee_id'
            },
            {
              type: 'list',
              message: 'What is the new role?',
              choices: roles,
              name: 'role_id'
            }
          ])
          .then(val => {
            const sql3 = 'UPDATE employee SET role_id = ? WHERE id = ?'
            db.query(sql3, [val.role_id, val.employee_id], (err,result) => {
              if (err) {
                console.error(err)
                return;
              }
              console.log(val.employee_id, val.role_id)
              console.log('Role updated!')
              init();
            });
          })
        });
      });
      
    }

  // function to start everything
  init();

