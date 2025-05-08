import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

/**
 * Fetches a user by ID from the JSONPlaceholder API.
 * @param {number} id - The ID of the user to fetch.
 * @returns {Promise<Object|undefined>} The user object or undefined if the fetch fails.
 */
const usersFetch = async (id) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch user with status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

/**
 * Generates an array of user introductions based on provided IDs.
 * @param {number[]} [ids=[]] - Array of user IDs.
 * @returns {Promise<string[]>} Array of introduction strings.
 */
const getIntros = async (ids = []) => {
  const userPromises = ids.map((nextId) => usersFetch(nextId));
  const users = await Promise.all(userPromises);
  const names = users
    .filter((user) => user)
    .map((user) => `${user.id}: Hello, my name is ${user.name}`);
  return names;
};

// --- --- tests --- ---

describe('getIntros: returns an array of user introductions', () => {
    it('gets intros for 6', async () => {
        const actual = await getIntros([6]);
        expect(actual).toEqual(['6: Hello, my name is Mrs. Dennis Schulist']);
    });
    it('gets intros for 8, 6, 4', async () => {
        const actual = await getIntros([8, 6, 4]);
        expect(actual).toEqual([
            '8: Hello, my name is Nicholas Runolfsdottir V',
            '6: Hello, my name is Mrs. Dennis Schulist',
            '4: Hello, my name is Patricia Lebsack',
        ]);
    });
    it('gets intros for 4, 7, 5, 6', async () => {
        const actual = await getIntros([4, 7, 5, 6]);
        expect(actual).toEqual([
            '4: Hello, my name is Patricia Lebsack',
            '7: Hello, my name is Kurtis Weissnat',
            '5: Hello, my name is Chelsey Dietrich',
            '6: Hello, my name is Mrs. Dennis Schulist',
        ]);
    });
    it('gets intros for no one', async () => {
        const actual = await getIntros([]);
        expect(actual).toEqual([]);
    });
});

console.log('= = = =  the call stack is empty  = = = =');