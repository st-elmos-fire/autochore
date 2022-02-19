import { Chore } from '../types/chore';

const apiRoot = process.env.API_ROOT;

const postToDatabase = async (newChore: Chore) => {
  const endpoint = '/add-chore';
  try {
    const response = await fetch(`${apiRoot}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(newChore)
    });

    const data = await response.json();

    return {
      status: 'success',
      message: data.message
    };
  } catch (error) {
    return {
      status: 'error',
      message: error
    };
  }
};

export default postToDatabase;
