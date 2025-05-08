import { ORIGIN } from '../config.js';

/**
 * Returns an array of all Pokemon with a specific ability.
 *
 * @async
 * @param {string} [ability=''] - The ability to request.
 * @returns {Promise<object[]>} An array of Pokemon objects with a name and URL.
 *
 * @throws {Error} HTTP error! status: {number}.
 */
export const pokemonWithAbility = async (ability = '') => {
    // --- generate and declare your resource's URL ---
    // docs: https://pokeapi.co/docs/v2#abilities
    const URL = `${ORIGIN}/ability/${ability}`;

    // --- fetch the API data ---
    const encodedURL = encodeURI(URL);
    const response = await fetch(encodedURL);

    // --- throw an error if the response is not ok ---
    if (!response.ok) {
        const message = response.statusText
            ? `${response.status}: ${response.statusText}\n-> ${URL}`
            : `HTTP error! status: ${response.status}\n-> ${URL}`;
        throw new Error(message);
    }

    // --- parse the data if the response was ok ---
    const data = await response.json();

    // --- process the fetched data ---
    const pokemon = data.pokemon.map(item => ({
        name: item.pokemon.name,
        url: item.pokemon.url
    }));

    // --- return the final data ---
    return pokemon;
};