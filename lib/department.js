const connection = require('../config/connection');
const cTable = require('console.table');

async function viewAllDepartments() {
    connection.promise().query('SELECT * FROM department')
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\nDepartments:');
        console.log(cTable.getTable(rows));
        return 1;
    })
    .catch((error) => console.log(error))
    .then();
    return 1;
}

async function addDepartment(name) {
    connection.promise().query(
        'INSERT INTO department SET ?',
        {
            name: name
        }
    )
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\n');
        console.log('Added Department');
        return 1;
    })
    .catch((error) => console.log(error))
    .then();
    return 1;
}

module.exports = [
    viewAllDepartments,
    addDepartment
];