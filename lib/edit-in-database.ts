import { Chore } from "../types/chore"

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

const editInDatabase = async (choreDetails: Chore, existingChore: Chore) => {

    try {
      const response = await fetch(`${apiRoot}/edit/${existingChore.content}`, {
        method: 'PATCH',
        body: JSON.stringify(choreDetails),
      })
    
      const data = await response.json()
      
      return {
        status: 'success',
        message: data.message
      }
    } catch (error) {
      return {
        status: 'error',
        message: error
      }
    }
  
  }

  export default editInDatabase;