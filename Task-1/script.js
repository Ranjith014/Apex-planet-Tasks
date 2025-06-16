// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    // Get the button element by its ID
    const interactiveButton = document.getElementById('interactiveButton');

    // Check if the button was found to prevent errors
    if (interactiveButton) {
        // Add an event listener for 'click' events
        interactiveButton.addEventListener('click', function() {
            // When the button is clicked, show an alert message
            alert('Congratulations! For visiting my website!');
        });
    } else {
        console.error('Button with ID "interactiveButton" not found.');
    }

});