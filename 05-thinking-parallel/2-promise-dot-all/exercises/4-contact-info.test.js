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
 * Fetches contact details for users by their IDs.
 * @param {number[]} [ids=[]] - Array of user IDs.
 * @returns {Promise<string[]>} Array of contact detail strings or error messages for invalid IDs.
 */
const contactDetails = async (ids = []) => {
  const userPromises = ids.map((id) => usersFetch(id));
  const users = await Promise.all(userPromises);
  const details = users.map((user, index) => {
    const id = ids[index];
    if (!user) {
      return `404: Not Found: there is no user with id ${id}`;
    }
    return `${id}: ${user.email}, ${user.phone}, ${user.website}`;
  });
  return details;
};

// --- --- tests --- ---

describe('contactDetails: returns an array of user contact details', () => {
    describe('when fetching only users that exist', () => {
        it('finds contact details for user 5', async () => {
            const actual = await contactDetails([5]);
            expect(actual).toEqual([
                '5: Lucio_Hettinger@annie.ca, (254)954-1289, demarco.info',
            ]);
        });
        it('finds contact details for users 6, 1, 2', async () => {
            const actual = await contactDetails([6, 1, 2]);
            expect(actual).toEqual([
                '6: Karley_Dach@jasper.info, 1-477-935-8478 x6430, ola.org',
                '1: Sincere@april.biz, 1-770-736-8031 x56442, hildegard.org',
                '2: Shanna@melissa.tv, 010-692-6593 x09125, anastasia.net',
            ]);
        });
        it('finds contact details for all odd users', async () => {
            const actual = await contactDetails([1, 3, 5, 7, 9]);
            expect(actual).toEqual([
                '1: Sincere@april.biz, 1-770-736-8031 x56442, hildegard.org',
                '3: Nathan@yesenia.net, 1-463-123-4447, ramiro.info',
                '5: Lucio_Hettinger@annie.ca, (254)954-1289, demarco.info',
                '7: Telly.Hoeger@billy.biz, 210.067.6132, elvis.io',
                '9: Chaim_McDermott@dana.io, (775)976-6794 x41206, conrad.com',
            ]);
        });
    });
    describe('when fetching some users that do not exist', () => {
        it('user 0', async () => {
            const actual = await contactDetails([0]);
            expect(actual).toEqual([
                '404: Not Found: there is no user with id 0',
            ]);
        });
        it('users -11, 0, 11', async () => {
            const actual = await contactDetails([-11, 0, 11]);
            expect(actual).toEqual([
                '404: Not Found: there is no user with id -11',
                '404: Not Found: there is no user with id 0',
                '404: Not Found: there is no user with id 11',
            ]);
        });
        it('users 0, 1, 2', async () => {
            const actual = await contactDetails([0, 1, 2]);
            expect(actual).toEqual([
                '404: Not Found: there is no user with id 0',
                '1: Sincere@april.biz, 1-770-736-8031 x56442, hildegard.org',
                '2: Shanna@melissa.tv, 010-692-6593 x09125, anastasia.net',
            ]);
        });
    });
});

console.log('=== === === the callstack is empty === === ===');