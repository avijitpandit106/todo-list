const inputbox = document.querySelector<HTMLInputElement>('#input-box')!;
const addButton = document.querySelector<HTMLButtonElement>('#add-btn')!;
const listContainer =
  document.querySelector<HTMLUListElement>('#list-container')!;
const warningBox = document.querySelector<HTMLDivElement>('#warning')!;
const closeButton = document.querySelector<HTMLButtonElement>('#close-btn')!;

function addTask(): void {
  if (inputbox.value === '') {
    if (warningBox.classList.contains('show')) {
      warningBox.classList.add('displayed');

      setTimeout(() => {
        warningBox.classList.remove('displayed');
      }, 500);
    } else {
      warningBox.classList.add('show');

      setTimeout(() => {
        warningBox.classList.remove('show');
      }, 2000);
    }
  } else {
    const li = document.createElement('li');
    li.textContent = inputbox.value;
    listContainer.appendChild(li);

    const span = document.createElement('span');
    span.textContent = '\u00d7';
    li.appendChild(span);
  }
  inputbox.value = '';
  saveTasks();
}

addButton.addEventListener('click', addTask);

inputbox.addEventListener('keydown', (e: KeyboardEvent): void => {
  if (e.key === 'Enter') {
    addTask();
  }
});

closeButton.addEventListener('click', (): void => {
  warningBox.classList.remove('show');
});

listContainer.addEventListener('click', (e: MouseEvent): void => {
  if ((e.target as HTMLElement).tagName === 'LI') {
    (e.target as HTMLLIElement).classList.toggle('checked');
    saveTasks();
  } else if ((e.target as HTMLElement).tagName === 'SPAN') {
    (e.target as HTMLSpanElement).parentElement?.remove();
    saveTasks();
  }
});

function saveTasks(): void {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTasks(): void {
  const tasks = localStorage.getItem('data');
  if (tasks) {
    listContainer.innerHTML = tasks;
  }
}

showTasks();
