const minGrade = 12;
let students = [];

window.addEventListener('load', function() {

    fetch('./eval.json')
    .then( function(_reponse){
        return _reponse.json();
    }).then(function(_results){
        addAllStudents(_results);
        addObtained();
        showNbStudents();
        showAverage();
        showNbAboveAvg();
    })
});

document.getElementById('addStudent').addEventListener('click', function(){
    let fullnameText = document.getElementById('fullname').value;
    let gradeText = document.getElementById('grade').value * 1;

    addStudent({
        fullname: fullnameText,
        grade: gradeText
    });
    refreshStudentsTable();

});

function addAllStudents(_students){
    _students.sort(function (a, b) {
        return b.grade - a.grade;
    });

    for (let student of _students){
        addStudent(student);
    }
}

function addStudent(_student){
    let lastName;
    let firstName;
    let line;
    let gradeElement;
    
    if (students.indexOf(_student) == -1){
        students.push(_student);
    }
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
}

function showNbStudents(){
    document.getElementById('nbStudents').textContent = 'Nombrre d\'étudiants : ' + students.length;
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

function addObtained(){
    document.getElementById('resultsHead').appendChild(document.createElement('th')).textContent = 'Obtenu'
    
    
    for (let i = 0; i < students.length; i++){
        let obtained = document.createElement('td');
        obtained.classList.add('obtained');
        if (students[i].grade >= minGrade){
            obtained.textContent = 'Oui';
        } else {
            obtained.textContent = 'Non';
        }
        document.getElementsByClassName('line')[i].appendChild(obtained);

    }

    document.getElementById('list').appendChild(document.createElement('li')).textContent = 'Note éliminatoire : ' + minGrade;
}

function refreshStudentsTable(){
    let obtainedLength = document.getElementsByClassName('obtained').length;
    let lines = document.getElementsByClassName('line');

    while (lines.length > 0){
        lines[0].remove();
    }

    addAllStudents(students);

    if (obtainedLength > 0){
        addObtained();
    }
}