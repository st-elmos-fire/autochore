import { Chore } from '../types/chore';

const apiRoot = process.env.API_ROOT;

const deleteFromDatabase = async (newChore: Chore) => {
  try {
    const response = await fetch(`${apiRoot}/delete/${newChore.content}`, {
      method: 'DELETE'
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

export default deleteFromDatabase;
