const inquirer = require("inquirer");
const db = require('./db/connection')
async function start() {
   const {choice} = await inquirer.prompt({
        name: "choice",
        type: 'list',
        message: 'What would you like to do',
        choices: [
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'Add Department',
            'Add Roles',
            'Add Employee',
            'Update Employee Role',
            'Quit'
        ]
    })
    switch (choice){
        case 'View all Departments':
            viewDeparments()
            break
            case 'View all Roles':
                viewRoles()
                break
                case 'View all Employees':
                    viewEmployees()
                    break
                    case 'Add Department':
                        addDepartment()
                        break
                        case 'Add Roles':
                            addRoles()
                            break
                            case 'Add Employee':
                                addEmployee()
                                break
                                case 'Update Employee Role':
                                updateEmployeeRole()
                                break

                    default:
                        console.log('GoodBye')
                        process.exit(0)
    }
}
start()

function getDeparments() {
    return db.promise().query('select * from department')
}

function viewDeparments(){
    getDeparments()
    .then(([departments])=> {
        console.table(departments)
        setTimeout(start, 2000)
    })
}

function getRoles() {
    return db.promise().query('select * from role')
}

function viewRoles(){
    getRoles()
    .then(([roles])=> {
        console.table(roles)
        setTimeout(start, 2000)
    })
}

function getEmployees() {
    return db.promise().query('select * from department')
}

function viewEmployees(){
    getEmployees()
    .then(([employee])=> {
        console.table(employee)
        setTimeout(start, 2000)
    })
}

function addDepartment() {
    inquirer.prompt({
      name: "name",
      type: "input",
      message: "Enter the department name:"
    }).then(answer => {
      const departmentName = answer.name;
      db.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName])
        .then(() => {
          console.log('Department added successfully!');
          setTimeout(start, 2000);
        })
        .catch(err => {
          console.log('Error adding department:', err);
          setTimeout(start, 2000);
        });
    });
  }

  function addRoles() {
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the role title:"
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the role salary:"
      },
      {
        name: "departmentId",
        type: "input",
        message: "Enter the department ID:"
      }
    ]).then(answers => {
      const { title, salary, departmentId } = answers;
      db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId])
        .then(() => {
          console.log('Role added successfully!');
          setTimeout(start, 2000);
        })
        .catch(err => {
          console.log('Error adding role:', err);
          setTimeout(start, 2000);
        });
    });
  }

  function addEmployee() {
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the employee's first name:"
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee's last name:"
      },
      {
        name: "roleId",
        type: "input",
        message: "Enter the role ID:"
      },
      {
        name: "managerId",
        type: "input",
        message: "Enter the manager's ID (optional):"
      }
    ]).then(answers => {
      const { firstName, lastName, roleId, managerId } = answers;
      db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId])
        .then(() => {
          console.log('Employee added successfully!');
          setTimeout(start, 2000);
        })
        .catch(err => {
            console.log('Error adding employee:', err);
            setTimeout(start, 2000);
            }
        );
    });
    }

    function updateEmployeeRole() {
        inquirer.prompt([
          {
            name: "employeeId",
            type: "input",
            message: "Enter the employee ID:"
          },
          {
            name: "roleId",
            type: "input",
            message: "Enter the new role ID:"
          }
        ]).then(answers => {
          const { employeeId, roleId } = answers;
          db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId])
            .then(() => {
              console.log('Employee role updated successfully!');
              setTimeout(start, 2000);
            })
            .catch(err => {
              console.log('Error updating employee role:', err);
              setTimeout(start, 2000);
            });
        });
      }

