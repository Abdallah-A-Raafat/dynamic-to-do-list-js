// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the "Add Task" button
    const addButton = document.getElementById('add-task-btn');
    // Select the input field for entering tasks
    const taskInput = document.getElementById('task-input');
    // Select the unordered list that will display the tasks
    const taskList = document.getElementById('task-list');

      // Load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }

    // Function to add a new task to the list and optionally save to Local Storage
    function addTask(taskText, save = true) {
        // If called from button/input, get value from input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        classList.add('remove-btn');

        // When the remove button is clicked, remove the task from the list and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            // Remove from Local Storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);
        // Append the list item to the task list
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if task was added from input
        if (save) {
            taskInput.value = "";
        }
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add event listener to the input field for "Enter" key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});