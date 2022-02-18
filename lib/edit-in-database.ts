import { Chore } from "../types/chore"

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

const editInDatabase = async (choreDetails: Chore, existingChore: Chore) => {

    try {
      const response = await fetch(`${apiRoot}/edit/${existingChore.content}`, {
        method: 'PATCH',
        body: JSON.stringify(choreDetails),
      })
    
      const data = await response.json()
      
      if (data.success) {
        alert(`${choreDetails.content} edited successfully`)
      }
  
      return 'success';
    } catch (error) {
      console.error(error)
      return 'error'
    }  
  
  }

  export default editInDatabase;