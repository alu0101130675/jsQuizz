import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

export const Start = () => {
  const fetch = useQuestionsStore(state => state.fetchQuestions)
  const handleClick = async () => {
    await fetch(10)
  }
  return (
    <Button variant='contained' onClick={handleClick}>
      Vamos a empezar
    </Button>
  )
}
