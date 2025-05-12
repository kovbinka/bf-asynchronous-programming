import { ORIGIN } from '../config.js';

/**
 * Fetches a single user with the given user name.
 *
 * @async
 * @param {string} userName - The user name to request.
 * @returns {Promise<object|null>} The user object if it exists, otherwise null.
 * @throws {Error} If userName is empty, an HTTP error occurs, or response parsing fails.
 */
export const userByUsername = async (userName) => {
    // Validate userName
    if (!userName || typeof userName !== 'string') {
        throw new Error('userName must be a non-empty string');
    }

    // Declare the resource's URL
    const URL = `${ORIGIN}/users?username=${encodeURIComponent(userName)}`;

    // Fetch the API data
    const response = await fetch(URL);

    // Throw an error if the response is not ok
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

    // Process the fetched data
    const user = data.length > 0 ? data[0] : null;

    // Return the final data
    return user;
};