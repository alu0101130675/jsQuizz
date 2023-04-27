import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light-async'
import { Questions as QuestionType } from './types.d'
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'

interface QuestionsProps {
  info: QuestionType
}
export const Questions: React.FC<QuestionsProps> = ({ info }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  const getBackgroundColors = (index: number) => {
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
