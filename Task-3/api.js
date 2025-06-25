const getJokeButton = document.getElementById('get-joke-btn');
const jokeDisplayElement = document.getElementById('joke-display');

// The URL for the JokeAPI (requesting a single-part joke)
const apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';

async function getJoke() {
    // Set loading state
    jokeDisplayElement.textContent = 'Loading...';

    try {
        // 1. Fetch data from the API
        const response = await fetch(apiUrl);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // 2. Parse the JSON data from the response
        const data = await response.json();

        // 3. Display the data on the webpage
        if (data.error) {
            jokeDisplayElement.textContent = 'Sorry, could not fetch a joke.';
        } else {
            jokeDisplayElement.textContent = data.joke;
        }

    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
        jokeDisplayElement.textContent = 'Failed to fetch joke. Please try again later.';
    }
}

// Add an event listener to the button
getJokeButton.addEventListener('click', getJoke);