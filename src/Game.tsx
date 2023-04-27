import { IconButton, Stack } from '@mui/material'
import { useQuestionsStore } from './store/questions'

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'
import { Questions } from './Question'
export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const questionInfo = questions[currentQuestion]
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center' />
      <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
        <ArrowBackIosNew />
      </IconButton>
      {currentQuestion + 1} / {questions.length}
      <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
        <ArrowForwardIos />
      </IconButton>
      <Questions info={questionInfo} />
      <Footer />
    </>
  )
}
