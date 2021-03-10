const connection = require('../config/connection');
const cTable = require('console.table');

async function viewAllEmployees() {
    // connection.promise().query('SELECT first_name, last_name, title, department FROM employee LEFT JOIN role ON employee.role_id = role.id')
    connection.promise().query(`SELECT em.id, em.first_name, em.last_name, ro.title, ro.salary, de.name as department, CONCAT(mg.first_name , ' ' , mg.last_name) as manager
    FROM employee as em
    LEFT JOIN role as ro
    ON em.role_id = ro.id
    LEFT JOIN department as de
    ON ro.department_id = de.id
    LEFT JOIN employee as mg
    ON em.manager_id = mg.id`)
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\nEmployees:');
        console.log(cTable.getTable(rows));
        return 1;
    })
    .catch((error) => console.log(error))
    .then();
    return 1;
}

async function addEmployee(first_name, last_name, role_id, manager_id) {
    connection.promise().query(
        'INSERT INTO employee SET ?',
        {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        }
    )
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\n');
        console.log('Added Employee');
        return 1;
    })
    .catch((error) => console.log(error))
    .then();
    return 1;
}

async function updateEmployee(employee_id, role_id) {
    connection.promise().query(
        'UPDATE employee SET ? WHERE ?',
        [
            {
                role_id: role_id,
            },
            {
                id: employee_id,
            }
        ]
    )
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\n');
        console.log('Updated Employee');
        return 1;
    })
    .catch((error) => console.log(error))
    .then();
    return 1;
}

module.exports = [
    viewAllEmployees,
    addEmployee,
    updateEmployee
];