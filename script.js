document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', taskList.innerHTML);
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        taskList.innerHTML = localStorage.getItem('tasks') || '';
        // Re-attach event listeners after loading tasks
        attachTaskListeners();
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get value and remove whitespace
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(li);
        taskInput.value = ''; // Clear input field

        attachSingleTaskListeners(li); // Attach listeners to the new task
        saveTasks(); // Save tasks after adding
    }

    // Function to attach event listeners to a single task item
    function attachSingleTaskListeners(li) {
        // Toggle complete on task text click
        li.querySelector('span').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks(); // Save after toggling
        });

        // Delete task on delete button click
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasks(); // Save after deleting
        });
    }

    // Function to attach event listeners to all existing task items
    function attachTaskListeners() {
        taskList.querySelectorAll('li').forEach(li => {
            attachSingleTaskListeners(li);
        });
    }

    // Event Listener for Add Task Button
    addTaskBtn.addEventListener('click', addTask);

    // Event Listener for Enter key in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when the page first loads
    loadTasks();
});