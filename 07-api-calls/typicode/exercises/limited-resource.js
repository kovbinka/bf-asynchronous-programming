import { ORIGIN } from '../config.js';

/**
 * Fetches a certain number of entries from one resource type.
 *
 * @async
 * @param {string} resourceType - The resource type to fetch.
 * @param {number} [limit=1] - The number of items to request.
 * @returns {Promise<array>} A promise that resolves to an array of resources (up to `limit` items).
 * @throws {Error} If the resourceType is empty, limit is invalid, or HTTP error occurs.
 */
export const limitedResource = async (resourceType, limit = 1) => {
    // Validate inputs
    if (!resourceType) {
        throw new Error('resourceType cannot be empty');
    }
    if (!Number.isInteger(limit) || limit < 1) {
        throw new Error('limit must be a positive integer');
    }

    // Generate URL with limit as a query parameter
    const URL = `${ORIGIN}/${resourceType}?limit=${limit}`;

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

    return data;
};