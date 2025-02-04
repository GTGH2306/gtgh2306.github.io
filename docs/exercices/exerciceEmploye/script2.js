let data = [];
const SortOrder = {
    Id: 'Id',
    Ascending: 'Ascending',
    Descending: 'Descending'
}
let order = SortOrder.Id;


document.addEventListener("DOMContentLoaded", function(){
    fetch("https://arfp.github.io/tp/web/javascript2/03-employees/employees.json")
    .then(function(_fetched){
        return _fetched.json();
    }).then(function(_fetchedJson){
        data = _fetchedJson.data;
        reloadTable();
    })
});

function reloadTable(){
    const tableBody = document.getElementById('tbodyEmpTable')
    while (tableBody.children.length > 0) {
        tableBody.children[0].remove();
    }
    for(const _employee of data){
        tableBody.appendChild(getRow(_employee));
    }
    document.getElementById('sumOfEmployees').textContent = tableBody.children.length
    document.getElementById('salarySum').textContent = getSalarySum() + ' €';
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
    monthlySalary.textContent = getMonthlySalary(_employee) + ' €';
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
        const newEmployee = {
            id: getPossibleId(),
            employee_name: _employee.employee_name,
            employee_salary: _employee.employee_salary,
            employee_age: _employee.employee_age,
            profile_image: _employee.profile_image
        }
        data.splice(data.indexOf(_employee) + 1, 0, newEmployee)
        reloadTable();
    });

    deleteBtn.addEventListener('click', function() {
        for (const _employee of data) {
            if (row.id.replace('rowEmp', '') == _employee.id) {
                data.splice(data.indexOf(_employee), 1)
            }
        }
        reloadTable();
    });

    return row;
}

function getMail(_employee){
    return (
        _employee.employee_name[0] + '.' +
        _employee.employee_name.split(' ')[1] +
        '@email.com'
        ).toLowerCase();
}

function getMonthlySalary(_employee){
    return Math.round(((_employee.employee_salary) / 12)* 100) / 100
}

function getYearOfBirth(_employee){
    todaysYear = new Date().getFullYear()
    return todaysYear - _employee.employee_age
}

function getSalarySum(){
    let total = 0;
    for(const _employee of data){
        total += getMonthlySalary(_employee)
    }
    return Math.round(total * 100) / 100
}

function getPossibleId(){
    let retour = 1;
    const takenIds = [];
    for (const _employee of data){
        takenIds.push(_employee.id);
    }
    while (takenIds.includes(retour)){
        retour ++;
    }
    return retour;
}

document.getElementById('sortButton').addEventListener('click', function() {
    if (order != SortOrder.Ascending){
        data = data.sort(compareSalaries);
        order = SortOrder.Ascending;
    } else {
        data = data.sort(compareSalaries).reverse();
        order = SortOrder.Descending;
    }
    reloadTable();
});

document.getElementById('idBtn').addEventListener('click', function(){
    if (order != SortOrder.Id){
        data = data.sort(compareIds);
        order = SortOrder.Id;
    }
    reloadTable();
});

function compareSalaries(a, b)
{
    return a.employee_salary - b.employee_salary;
}

function compareIds(a, b)
{
    return a.id - b.id
}