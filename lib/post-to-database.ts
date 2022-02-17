import { Chore } from "../types/chore"

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

const postToDatabase = async (newChore: Chore, existingChore?:string) => {

    const endpoint = existingChore ? `/edit-chore/${existingChore}` : '/add-chore'
  
    try {
      const response = await fetch(`${apiRoot}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(newChore),
      })
    
      const data = await response.json()
      
      if (data.success) {
        alert(`Chore ${existingChore ? 'added' : 'updated'} successfully`)
      }
  
      return 'success';
    } catch (error) {
      console.error(error)
      return 'error'
    }  
  
  }

  export default postToDatabase;