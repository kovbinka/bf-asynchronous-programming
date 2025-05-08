import { ORIGIN } from '../config.js';

/**
 * Returns an array of pokemon in an evolution chain.
 *
 * @async
 * @param {number} [chainId=1] - The evolution chain's id to fetch.
 * @returns {Promise<object[]>} An array of Pokemon objects with a name and URL.
 *
 * @throws {Error} HTTP error! status: {number}.
 */
export const evolutionChain = async (chainId = 1) => {
    // --- generate and declare your resource's URL ---
    // docs: https://pokeapi.co/docs/v2#evolution-section
    const URL = `${ORIGIN}/evolution-chain/${chainId}`;

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
    // Helper function to recursively collect all species in the evolution chain
    const collectSpecies = (chain) => {
        const speciesList = [];
        
        // Add the current species
        speciesList.push({
            name: chain.species.name,
            url: chain.species.url
        });

        // Recursively process all evolutions
        if (chain.evolves_to && chain.evolves_to.length > 0) {
            chain.evolves_to.forEach(evolution => {
                speciesList.push(...collectSpecies(evolution));
            });
        }

        return speciesList;
    };

    // Start processing from the chain
    const pokemon = collectSpecies(data.chain);

    // --- return the final data ---
    return pokemon;
};