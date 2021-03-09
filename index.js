const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const [toDoQuestions] = require('./src/questions');
const [viewAllEmployees, addEmployee] = require('./lib/employee');
const [viewAllDepartments, addDepartment] = require('./lib/department');
const [viewAllRoles, addRole] = require('./lib/role');

// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId);
//   afterConnection();
// });

// afterConnection = () => {
//   connection.query('SELECT * FROM department', function(err, res) {
//     if (err) throw err;
//     // console.log(res);
//     console.table(res);
//     connection.end();
//   });
// };

var employeesList;
var departmentsList;
var rolesList;

const updateLists = async () => {
    employeesList = await connection.promise().query('SELECT * FROM employee')
    .then(([rows,fields]) => {
        return rows;
    });
    departmentsList = await connection.promise().query('SELECT * FROM department')
    .then(([rows,fields]) => {
        return rows;
    });
    rolesList = await connection.promise().query('SELECT * FROM role')
    .then(([rows,fields]) => {
        return rows;
    });
    return [employeesList, departmentsList, rolesList]
}

const askQuestions = async () => {
    await updateLists()
    .then(async () => {
        // console.log(employeesList);
        while (true) {
            var toDo = await inquirer.prompt(toDoQuestions)
            .then(async answers => {
                if (answers["to-do"] === "viewAllEmployees") {
                    return await viewAllEmployees();
                }
                else if (answers["to-do"] === "viewAllDerpartments") {
                    return await viewAllDepartments();
                }
                else if (answers["to-do"] === "viewAllRoles") {
                    return await viewAllRoles();
                }
                // else if (answers["to-do"] === "addEmployees") {
                //     continue;
                // }
                if (answers["to-do"] === "addDepartment") {
                    await inquirer.prompt(
                        [
                            {
                                type: 'input',
                                name: 'department-name',
                                message: "Department Name?",
                            },
                        ]
                    )
                    .then(async answers => {
                        console.log(answers);
                        return await addDepartment(answers['department-name']);
                    })
                }
                else if (answers["to-do"] === "addRole") {
                    let depNameVal = []
                    for (var i = 0; i <departmentsList.length; i++) {
                        depNameVal.push({
                            name: departmentsList[i].name,
                            value: departmentsList[i].id
                        })
                    }
                    await inquirer.prompt(
                        [
                            {
                                type: 'input',
                                name: 'role-title',
                                message: "Role Title?",
                            },
                            {
                                type: 'input',
                                name: 'role-salary',
                                message: "Role Salary?",
                            },
                            {
                                type: 'list',
                                name: 'department-id',
                                message: "Department Name?",
                                choices: depNameVal,
                            },
                        ]
                    )
                    .then(async answers => {
                        console.log(answers);
                        return await addRole(answers['role-title'], answers['role-salary'], answers['department-id']);
                    })
                }
                // console.log(answers);
            })
        }
    });
}

// const questionsAddDep = async () => {

// }

// const questionsAddRole = async () => {
    
// }

// const questionsAddEmployee = async () => {
    
// }

askQuestions();