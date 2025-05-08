import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

// --- declare function ---

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

const createSummaries = async (ids = []) => {
  const userPromises = ids.map((id) => usersFetch(id));
  const users = await Promise.all(userPromises);
  const coordinates = users
    .filter((user) => user && user.address && user.address.city && user.company && user.company.name)
    .map((user) => ({
      name: user.name,
      city: user.address.city,
      companyName: user.company.name,
    }));
  return coordinates;
};

// --- --- tests --- ---

describe('createSummaries: returns an array of user summaries', () => {
    it('creates a summary for 6', async () => {
        const actual = await createSummaries([6]);
        expect(actual).toEqual([
            {
                name: 'Mrs. Dennis Schulist',
                city: 'South Christy',
                companyName: 'Considine-Lockman',
            },
        ]);
    });
    it('creates a summary for 5, 1, 10', async () => {
        const actual = await createSummaries([5, 1, 10]);
        expect(actual).toEqual([
            {
                name: 'Chelsey Dietrich',
                city: 'Roscoeview',
                companyName: 'Keebler LLC',
            },
            {
                name: 'Leanne Graham',
                city: 'Gwenborough',
                companyName: 'Romaguera-Crona',
            },
            {
                name: 'Clementina DuBuque',
                city: 'Lebsackbury',
                companyName: 'Hoeger LLC',
            },
        ]);
    });
    it('creates a summary for 7, 5', async () => {
        const actual = await createSummaries([7, 5]);
        expect(actual).toEqual([
            {
                name: 'Kurtis Weissnat',
                city: 'Howemouth',
                companyName: 'Johns Group',
            },
            {
                name: 'Chelsey Dietrich',
                city: 'Roscoeview',
                companyName: 'Keebler LLC',
            },
        ]);
    });
    it('creates a summary for no one', async () => {
        const actual = await createSummaries([]);
        expect(actual).toEqual([]);
    });
});

console.log('= = = =  the call stack is empty  = = = =');
