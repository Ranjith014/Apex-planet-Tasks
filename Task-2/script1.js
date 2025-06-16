document.addEventListener('DOMContentLoaded', function() {

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            validateForm();
        });
    }

    function validateForm() {
        let isValid = true;
        formStatus.textContent = ''; // Clear previous status
        formStatus.className = ''; // Clear previous class

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Full name is required.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email address is required.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        if (isValid) {
            // If form is valid, you would typically send data to a server here.
            // For this demo, we'll just show a success message.
            formStatus.textContent = 'Message sent successfully!';
            formStatus.className = 'success';
            contactForm.reset(); // Clear the form fields
            // Optionally, clear error messages explicitly if needed after reset
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
        } else {
            formStatus.textContent = 'Please correct the errors above.';
            formStatus.className = 'error';
        }
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --- To-Do List Functionality ---
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', addTask);
    }
    if (todoInput) {
        todoInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    }
    if (todoList) {
        // Event delegation for remove and toggle buttons
        todoList.addEventListener('click', handleTaskAction);
    }

    function addTask() {
        const taskText = todoInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'task-controls';

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle';
        toggleBtn.className = 'toggle-todo';
        controlsDiv.appendChild(toggleBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-todo';
        controlsDiv.appendChild(removeBtn);
        
        listItem.appendChild(controlsDiv);
        todoList.appendChild(listItem);

        todoInput.value = ''; // Clear the input field
        todoInput.focus();
    }

    function handleTaskAction(event) {
        const target = event.target;
        const listItem = target.closest('li'); // Find the parent <li>

        if (!listItem) return; // Click was not on a button inside an li

        if (target.classList.contains('remove-todo')) {
            listItem.remove();
        } else if (target.classList.contains('toggle-todo')) {
            listItem.classList.toggle('completed');
        }
    }

    // --- Mobile Menu Toggle (Simple Example) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

});