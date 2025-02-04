let data;
let empRows = [];
let ordreCroissant = false;

window.addEventListener("load", function(){
    fetch("https://arfp.github.io/tp/web/javascript2/03-employees/employees.json")
    .then(function(_fetched){
        return _fetched.json();
    }).then(function(_fetchedJson){
        data = _fetchedJson.data;
        loadDataTable(data);
    })
});

document.getElementById('sortButton').addEventListener('click', function() {
    if (!ordreCroissant){
        empRows = empRows.sort(compareSalaries);
        ordreCroissant = true;
    } else {
        empRows = empRows.sort(compareSalaries).reverse();
        ordreCroissant = false;
    }
    reloadTable();
})

function getMail(_employee){
    return (
        _employee.employee_name[0] + '.' +
        _employee.employee_name.split(' ')[1] +
        '@email.com'
        ).toLowerCase();
}

function getMonthlySalary(_employee){
    return Math.round(Number((_employee.employee_salary) / 12)* 100) / 100 + ' €'
}

function getYearOfBirth(_employee){
    todaysYear = new Date().getFullYear()
    return todaysYear - Number(_employee.employee_age)
}

function getRow(_employee){
    const row = document.createElement('tr');
    const id = document.createElement('td');
    const fullname = document.createElement('td');
    const email = document.createElement('td');
    const monthlySalary = document.createElement('td');
    const yearOfBirth = document.createElement('td');
    const actions = document.createElement('td');
    const duplicateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button')
    const duplicateBtnIcon = document.createElement('i');
    const deleteBtnIcon = document.createElement('i');

    row.id = 'rowEmp' + _employee.id;
    id.textContent = _employee.id;
    fullname.textContent = _employee.employee_name;
    email.textContent = getMail(_employee);
    monthlySalary.textContent = getMonthlySalary(_employee);
    monthlySalary.id = 'salEmp' + _employee.id
    yearOfBirth.textContent = getYearOfBirth(_employee);
    duplicateBtn.textContent = "Duplicate";
    duplicateBtn.classList.add('duplicateButton');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('deleteButton');
    duplicateBtnIcon.classList.add('fa-copy');
    duplicateBtnIcon.classList.add('fa-solid');
    deleteBtnIcon.classList.add('fa-solid');
    deleteBtnIcon.classList.add('fa-trash');

    row.appendChild(id);
    row.appendChild(fullname);
    row.appendChild(email);
    row.appendChild(monthlySalary);
    row.appendChild(yearOfBirth);
    row.appendChild(actions);
    actions.appendChild(duplicateBtn);
    actions.appendChild(deleteBtn);
    duplicateBtn.prepend(duplicateBtnIcon);
    deleteBtn.prepend(deleteBtnIcon);

    duplicateBtn.addEventListener('click', function() {
        const newEmployee = _employee;
        newEmployee.id = getPossibleId();
        empRows.splice(empRows.indexOf(row) + 1 , 0, getRow(newEmployee));
        reloadTable();
    });

    deleteBtn.addEventListener('click', function() {
        empRows.splice(empRows.indexOf(row), 1)
        reloadTable();
    });

    return row;
}

function reloadTable(){
    const tableBody = document.getElementById('tbodyEmpTable')
    while (tableBody.children.length > 0) {
        tableBody.children[0].remove();
    }
    for (const _row of empRows){
        tableBody.appendChild(_row);
    }
    document.getElementById('sumOfEmployees').textContent = empRows.length
    document.getElementById('salarySum').textContent = getSalarySum();
}

function loadDataTable(_data){
    empRows = []
    for(const _employee of _data){
        const empRow = getRow(_employee);
        empRows.push(empRow);
    }
    reloadTable();
}

function getPossibleId(){
    let retour = 1;
    const takenIds = [];
    for (let i = 0; i < empRows.length; i++){
        takenIds.push(Number(empRows[i].id.replace('rowEmp', '')));
    }
    while (takenIds.includes(retour)){
        retour ++;
    }
    return retour;
}

function getSalarySum(){
    let total = 0;
    for (const _row of empRows){
        total += getSalaryFromRow(_row)
    }
    return Math.round(total * 100) / 100 + ' €';
}

function getSalaryFromRow(_row){
    return Number(document.getElementById('salEmp' + _row.id.replace('rowEmp', '')).textContent.replace(' €', ''))
}


function compareSalaries(a, b)
{
    return getSalaryFromRow(a) - getSalaryFromRow(b);
}