const connection = require('../config/connection');
const cTable = require('console.table');

function viewAllDepartments() {
    connection.promise().query('SELECT * FROM department')
    .then(([rows,fields]) => {
        // Log all results of the SELECT statement
        console.log('\nDepartments:');
        console.log(cTable.getTable(rows));
        return;
    })
    .catch(console.log("ERROR"))
    .then();
    return;
}

function addDepartment(name) {
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
        return;
    })
    .catch(console.log("ERROR"))
    .then();
    return;;
}

module.exports = [
    viewAllDepartments,
    addDepartment
];