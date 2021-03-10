const connection = require('../config/connection');
const cTable = require('console.table');

async function viewAllRoles() {
    connection.promise().query('SELECT title, name AS department, salary FROM role LEFT JOIN department ON department_id = department.id')
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\nRoles:');
        console.log(cTable.getTable(rows));
        return 1;
    })
    .catch(console.log("ERROR"))
    .then();
    return 1;
}

async function addRole(title, salary, department_id) {
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
        return 1;
    })
    .catch(console.log("ERROR"))
    .then();
    return 1;
}

module.exports = [
    viewAllRoles,
    addRole
];