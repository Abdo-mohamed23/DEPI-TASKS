const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskItem(taskText);
    taskInput.value = '';
  }
});

function createTaskItem(taskText) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  editBtn.addEventListener('click', () => {
    const newTask = prompt('Edit task:', taskText);
    if (newTask) span.textContent = newTask;
  });

  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '<i class="fa-regular fa-square-check"></i>';
  completeBtn.addEventListener('click', () => {
    span.style.textDecoration = 'line-through';
    span.style.color = '#ccc';
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}
