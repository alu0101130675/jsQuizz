import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { Questions as QuestionType } from './types.d'
import { useQuestionsStore } from './store/questions'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light-async'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'
export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const questionInfo = questions[currentQuestion]
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)

  interface QuestionsProps {
    info: QuestionType
  }
  const Questions: React.FC<QuestionsProps> = ({ info }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)
    const handleClick = (answerIndex: number) => () => {
      selectAnswer(info.id, answerIndex)
    }
    const getBackgroundColors = (index) => {
      const { userSelectedAnswer, correctAnswer } = info
      if (userSelectedAnswer == null) return 'transparent'
      if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
      if (index === correctAnswer) return 'green'
      if (index === userSelectedAnswer) return 'red'
      return 'transparent'
    }
    return (
      <Card variant='outlined' sx={{ textAlign: 'left' }}>
        <Typography variant='h5'>
          {info.question}
        </Typography>
        <SyntaxHighlighter language='javascript' style={gradientDark}>
          {info.code}
        </SyntaxHighlighter>
        <List disablePadding>
          {info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={handleClick(index)}
                sx={{ backgroundColor: getBackgroundColors(index) }}
              >
                <ListItemText primary={answer} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Card>
    )
  }
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
