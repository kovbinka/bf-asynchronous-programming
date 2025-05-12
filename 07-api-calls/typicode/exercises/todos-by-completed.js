import { ORIGIN } from '../config.js';

/**
 * Fetches all of the completed or incomplete todos from the jsonplaceholder.typicode.com API.
 *
 * @async
 * @param {boolean} [completed=true] - Whether to fetch complete or incomplete todos.
 * @returns {Promise<array>} A promise that resolves to an array of todos.
 * @throws {Error} If an HTTP error occurs or response parsing fails.
 */
export const todosByCompleted = async (completed = true) => {
    // Validate completed parameter
    if (typeof completed !== 'boolean') {
        throw new Error('completed must be a boolean');
    }

    // Construct URL with resource path and query parameter
    const URL = `${ORIGIN}/todos?completed=${completed}`;

    // Fetch the API data
    const response = await fetch(URL);

    // Check for HTTP errors
    if (!response.ok) {
        const message = response.statusText
            ? `${response.status}: ${response.statusText}\n-> ${URL}`
            : `HTTP error! status: ${response.status}\n-> ${URL}`;
        throw new Error(message);
    }

    // Parse the data
    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error(`Failed to parse response as JSON: ${error.message}\n-> ${URL}`);
    }

    // Return the data
    return data;
};