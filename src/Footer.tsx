import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const questions = useQuestionsStore(state => state.questions)
  const reset = useQuestionsStore(state => state.resetGame)
  let correct = 0
  let incorrect = 0
  let unanswered = 0
  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) return unanswered++
    if (userSelectedAnswer === correctAnswer) return correct++
    if (userSelectedAnswer !== correctAnswer) return incorrect++
  })
  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <Button onClick={reset}>
        Resetear Juego
      </Button>
    </footer>
  )
}
