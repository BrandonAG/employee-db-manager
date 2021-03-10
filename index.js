const connection = require('./config/connection');
const inquirer = require('inquirer');
const [toDoQuestions] = require('./src/questions');
const [viewAllEmployees, addEmployee, updateEmployee] = require('./lib/employee');
const [viewAllDepartments, addDepartment] = require('./lib/department');
const [viewAllRoles, addRole] = require('./lib/role');

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
                else if (answers["to-do"] === "addEmployee") {
                    let rolNameVal = []
                    for (var i = 0; i <rolesList.length; i++) {
                        rolNameVal.push({
                            name: rolesList[i].title,
                            value: rolesList[i].id
                        })
                    }
                    let empNameVal = []
                    for (var i = 0; i <employeesList.length; i++) {
                        empNameVal.push({
                            name: employeesList[i].first_name + " " + employeesList[i].last_name,
                            value: employeesList[i].id
                        })
                    }
                    empNameVal.unshift({
                        name: "None",
                        value: null
                    })
                    await inquirer.prompt(
                        [
                            {
                                type: 'input',
                                name: 'first-name',
                                message: "Employee's First Name?",
                            },
                            {
                                type: 'input',
                                name: 'last-name',
                                message: "Employee's Last Name?",
                            },
                            {
                                type: 'list',
                                name: 'role-id',
                                message: "Employee's Title?",
                                choices: rolNameVal,
                            },
                            {
                                type: 'list',
                                name: 'manager-id',
                                message: "Employee's Manager?",
                                choices: empNameVal,
                            },
                        ]
                    )
                    .then(async answers => {
                        return await addEmployee(answers['first-name'], answers['last-name'], answers['role-id'], answers['manager-id'])
                        .then(() => {
                            updateLists()
                        });
                    })
                }
                else if (answers["to-do"] === "updateRole") {
                    let rolNameVal = []
                    for (var i = 0; i <rolesList.length; i++) {
                        rolNameVal.push({
                            name: rolesList[i].title,
                            value: rolesList[i].id
                        })
                    }
                    let empNameVal = []
                    for (var i = 0; i <employeesList.length; i++) {
                        empNameVal.push({
                            name: employeesList[i].first_name + " " + employeesList[i].last_name,
                            value: employeesList[i].id
                        })
                    }
                    await inquirer.prompt(
                        [
                            {
                                type: 'list',
                                name: 'employee-id',
                                message: "Employee's Name?",
                                choices: empNameVal,
                            },
                            {
                                type: 'list',
                                name: 'role-id',
                                message: "Employee's Role?",
                                choices: rolNameVal,
                            },
                        ]
                    )
                    .then(async answers => {
                        return await updateEmployee(answers['employee-id'], answers['role-id'])
                        .then(() => {
                            updateLists()
                        });
                    })
                }
                else if (answers["to-do"] === "addDepartment") {
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
                        return await addDepartment(answers['department-name'])
                        .then(() => {
                            updateLists()
                        });
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
                        return await addRole(answers['role-title'], answers['role-salary'], answers['department-id'])
                        .then(() => {
                            updateLists()
                        });
                    })
                }
            })
        }
    });
}

askQuestions();