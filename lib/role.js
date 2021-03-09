const connection = require('../config/connection');
const cTable = require('console.table');

function viewAllRoles() {
    connection.promise().query('SELECT * FROM role')
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\nRoles:');
        console.log(cTable.getTable(rows));
        return;
    })
    .catch(console.log("ERROR"))
    .then();
    return;
}

function addRole(title, salary, department_id) {
    connection.promise().query(
        'INSERT INTO role SET ?',
        {
            title: title,
            salary: salary,
            department_id: department_id
        }
    )
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\n');
        console.log('Added Role');
        return;
    })
    .catch(console.log("ERROR"))
    .then();
    return;;
}

module.exports = [
    viewAllRoles,
    addRole
];