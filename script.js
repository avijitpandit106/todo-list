var inputbox = document.querySelector('#input-box');
var addButton = document.querySelector('#add-btn');
var listContainer = document.querySelector('#list-container');
var warningBox = document.querySelector('#warning');
var closeButton = document.querySelector('#close-btn');
function addTask() {
    if (inputbox.value === '') {
        if (warningBox.classList.contains('show')) {
            warningBox.classList.add('displayed');
            setTimeout(function () {
                warningBox.classList.remove('displayed');
            }, 500);
        }
        else {
            warningBox.classList.add('show');
            setTimeout(function () {
                warningBox.classList.remove('show');
            }, 2000);
        }
    }
    else {
        var li = document.createElement('li');
        li.textContent = inputbox.value;
        listContainer.appendChild(li);
        var span = document.createElement('span');
        span.textContent = '\u00d7';
        li.appendChild(span);
    }
    inputbox.value = '';
    saveTasks();
}
addButton.addEventListener('click', addTask);
inputbox.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
closeButton.addEventListener('click', function () {
    warningBox.classList.remove('show');
});
listContainer.addEventListener('click', function (e) {
    var _a;
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveTasks();
    }
    else if (e.target.tagName === 'SPAN') {
        (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        saveTasks();
    }
});
function saveTasks() {
    localStorage.setItem('data', listContainer.innerHTML);
}
function showTasks() {
    var tasks = localStorage.getItem('data');
    if (tasks) {
        listContainer.innerHTML = tasks;
    }
}
showTasks();
