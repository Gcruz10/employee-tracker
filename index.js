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
                                updateRole()
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