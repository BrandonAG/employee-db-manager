const connection = require('../config/connection');
const cTable = require('console.table');

async function viewAllEmployees() {
    connection.promise().query('SELECT * FROM employee')
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\nEmployees:');
        console.log(cTable.getTable(rows));
        return;
    })
    .catch(console.log("ERROR"))
    .then();
    return;
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
        return;
    })
    .catch(console.log("ERROR"))
    .then();
    return;
}

module.exports = [
    viewAllEmployees,
    addEmployee
];