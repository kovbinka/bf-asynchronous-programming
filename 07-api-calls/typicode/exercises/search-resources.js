import { ORIGIN } from '../config.js';

/**
 * Fetches all the resources matching a specific search query.
 *
 * @async
 * @param {string} [resourceType=''] - The resource type to fetch.
 * @param {string} [searchQuery=''] - The text to search for in the resource entries.
 * @returns {Promise<array>} An array of resources matching the search query.
 *
 * @throws {Error} HTTP error! status: {number}.
 */
export const searchResources = async (resourceType = '', searchQuery = '') => {

    if (!resourceType) {
      throw new Error('resourceType cannot be empty');
    }
    // --- declare your resource's URL ---
    // hint: https://github.com/typicode/json-server#full-text-search
    const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
    const URL = `${ORIGIN}/${resourceType}/${query}`;

    // --- fetch the API data (this works!) ---
    const encodedURL = encodeURI(URL);
    const response = await fetch(encodedURL);

    // --- throw an error if the response is not ok (this works!) ---
    if (!response.ok) {
        const message = response.statusText
            ? `${response.status}: ${response.statusText}\n-> ${URL}`
            : `HTTP error! status: ${response.status}\n-> ${URL}`;
        throw new Error(message);
    }

    /* --- parse the data if the response was ok (this works!) ---*/
    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error(`Failed to parse response as JSON: ${error.message}\n-> ${URL}`);
    }

    // --- return the final data ---
    return data;
};
