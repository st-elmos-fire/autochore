import { Chore } from "../types/chore"

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

const deleteFromDatabase = async (newChore: Chore) => {

    try {
      const response = await fetch(`${apiRoot}/delete/${newChore.content}`, {
        method: 'DELETE'
      })
    
      const data = await response.json()
      
      if (data.success) {
        alert(`${newChore.content} deleted successfully`)
      }
  
      return 'success';
    } catch (error) {
      console.error(error)
      return 'error'
    }  
  
  }

  export default deleteFromDatabase;