import { Chore } from "../types/chore"

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

const editInDatabase = async (newChore: Chore) => {

    try {
      const response = await fetch(`${apiRoot}/edit/${newChore.content}`, {
        method: 'PATCH',
        body: JSON.stringify(newChore),
      })
    
      const data = await response.json()
      
      if (data.success) {
        alert(`${newChore.content} edited successfully`)
      }
  
      return 'success';
    } catch (error) {
      console.error(error)
      return 'error'
    }  
  
  }

  export default editInDatabase;