const toDoQuestions = [
    {
        type: 'list',
        name: 'to-do',
        message: "What would you like to do?",
        choices: [
            {
                name: "View All Employees",
                value: "viewAllEmployees",
            },
            {
                name: "View All Departments",
                value: "viewAllDerpartments",
            },
            {
                name: "View All Roles",
                value: "viewAllRoles",
            },
            {
                name: "Add Employee",
                value: "addEmployees",
            },
            {
                name: "Add Department",
                value: "addDepartment",
            },
            {
                name: "Add Role",
                value: "addRole",
            },
        ],
    },
]

// const addEmployeeQuestions = [
//     {
//         type: 'input',
//         name: 'employee-firstname',
//         message: "Employees First Name?",
//     },
//     {
//         type: 'input',
//         name: 'employee-lastname',
//         message: "Employees Last Name?",
//     },
//     {
//         type: 'list',
//         name: 'employee-role',
//         message: "Employees Role?",
//         choices: ,
//     },
//     {
//         type: 'list',
//         name: 'employee-manager',
//         message: "Employees Manager?",
//         choices: ,
//     },
// ]

// const addDepartmentQuestions = 

// const addRoleQuestions =

// const updateEmployeeQuestions = 

module.exports = [toDoQuestions];