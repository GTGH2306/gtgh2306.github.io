const students = [];
const minGrade = 12;

window.addEventListener('load', function() {

    fetch('./eval.json')
    .then( function(_reponse){
        return _reponse.json();
    }).then(function(_results){
        addStudentsToTable(_results);
        showNbStudents();
        showAverage();
        showNbAboveAvg();
        showObtained();
        addRemoveButtons();
    })
});

document.getElementById('addStudent').addEventListener('click', function(){
    const student = {
        fullname: document.getElementById('fullname').value,
        grade: document.getElementById('grade').value * 1
    }

    try{
        checkStudent(student);
        students.push(student);
        addStudentsToTable(students);
        showNbStudents();
        showAverage();
        showNbAboveAvg();
    } catch (error) {
        console.log(error)
    }
});

function addStudent(_student){
    try {
        checkStudent(_student)
        let lastName;
        let firstName;
        let line;
        let gradeElement;
        
        lastName = _student.fullname.split(' ')[0];
        firstName = _student.fullname.split(' ')[1];
        line = document.createElement('tr');
        
        line.appendChild(document.createElement('td')).textContent = lastName;
        line.appendChild(document.createElement('td')).textContent = firstName;
        gradeElement = document.createElement('td');
        gradeElement.textContent = _student.grade;
        gradeElement.classList.add('grade');
        line.appendChild(gradeElement);
    
        line.classList.add('line')
    
        document.getElementById('resultsBody').appendChild(line)
    } catch (_error) {
        console.log('Error: ' + _error)
    }
}

function checkStudent(_student){
    if(!_student.fullname) {
        throw new Error(_student + ' fullname is invalid');
    } else if(!_student.grade && _student.grade !== 0){
        throw new Error(_student.fullname + ' grade is invalid')
    } else if (_student.grade < 0){
        throw new Error(_student.fullname + ' grade is lesser than 0');
    } else if (_student.grade > 20){
        throw new Error (_student.fullname + ' grade is greater than 20');
    } else if (_student.fullname.split(' ').length > 2){
        throw new Error (_student.fullname + ' name is invalid(too much arguments)');
    } else if (_student.fullname.split(' ').length < 2){
        throw new Error(_student.fullname + ' name is invalid(not enough arguments)');
    } else if (_student.fullname.split(' ')[0].length < 2) {
        throw new Error(_student.fullname + ' lastname is invalid(too short)')
    } else if (_student.fullname.split(' ')[1].length < 2) {
        throw new Error(_student.fullname + ' firstname is invalid(too short)')
    }
}

function addStudentsToTable(_students){

    while (document.getElementById('resultsBody').firstChild){
        document.getElementById('resultsBody').removeChild(document.getElementById('resultsBody').firstChild)
    }


    _students.sort(function (a, b) {
        return b.grade - a.grade;
    });

    for (const student of _students){
        addStudent(student);
        if (students.indexOf(student) === -1){
            students.push(student);
        }
    }

    if (document.getElementById('obtainedHead')){
        showObtained();
    }

    if (document.getElementById('rmHead')){
        addRemoveButtons()
    }

}

function showNbStudents(){
    document.getElementById('nbStudents').textContent = 'Nombre d\'étudiants : ' + students.length;
}

function getAverage(){
    let average = 0;

    for (let student of students){
        average += student.grade;
    }
    average /= students.length;
    average = Math.round(average * 100) / 100;
    return average;
}

function showAverage(){
    document.getElementById('classAverage').textContent = 'Moyenne de la classe : ' + getAverage();
}

function showNbAboveAvg(){
    let nbAboveAvg = 0;
    for (let student of students){
        nbAboveAvg = (student.grade > getAverage())?nbAboveAvg + 1:nbAboveAvg;
    }
    document.getElementById('nbAboveAverage').textContent = 'Nombre d\'étudiants au dessus de la moyenne : ' + nbAboveAvg;
}

function showObtained(){
    const lines = document.getElementsByClassName('line');


    if (!document.getElementById('obtainedHead')){
        const header = document.createElement('th');
        header.textContent = 'Obtenu';
        header.id = 'obtainedHead';
        document.getElementById('resultsHead').appendChild(header)
    }

    while (document.getElementsByClassName('obtained').length > 0){
        document.getElementsByClassName('obtained').remove()[0];
    }

    for (let i = 0; i < lines.length; i++){
        const obtained = document.createElement('td')
        obtained.id = 'obtained'
        if (students[i].grade >= minGrade){
            obtained.textContent = 'Oui';
        } else {
            obtained.textContent = 'Non';
        }
        lines[i].appendChild(obtained);
    }

    document.getElementById('minRate').textContent = 'Note éliminatoire : ' + minGrade;
}

function addRemoveButtons(){
    if (!document.getElementById('rmHead')){
        const rmHead = document.createElement('th');
        rmHead.textContent = 'Suppr';
        rmHead.id = 'rmHead';
        document.getElementById('resultsHead').appendChild(rmHead);
    }

    while (document.getElementsByClassName('rmButton').length > 0){
        document.getElementsByClassName('rmButton')[0].parentElement.remove();
    }


    const lines = document.getElementsByClassName('line');
    for (let i = 0; i < lines.length; i++){
        const td = document.createElement('td');
        const button = document.createElement('input');
        button.value = '-';
        button.addEventListener('click', function(){
            students.splice(i, 1);
            button.parentElement.parentElement.remove();
            showNbStudents();
            showAverage();
            showNbAboveAvg();
            addRemoveButtons();
        });
        button.type = 'button';
        button.classList.add('rmButton');
        td.appendChild(button);
        lines[i].appendChild(td);
    }
}