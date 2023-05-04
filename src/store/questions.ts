import { create } from 'zustand'
import { Questions } from '../types'
import { persist } from 'zustand/middleware'
interface State {
  questions: Questions[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answersIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  resetGame: () => void
}
export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const res = await fetch('https://js-examplequizz.netlify.app/data.json')
      const json = await res.json()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
    selectAnswer: (questionId, answersIndex) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex((q: Questions) => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectAnswer = questionInfo.correctAnswer === answersIndex
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectAnswer,
        userSelectedAnswer: answersIndex
      }
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestions = currentQuestion + 1
      if (nextQuestions < questions.length) {
        set({ currentQuestion: nextQuestions })
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const nextQuestions = currentQuestion - 1
      if (nextQuestions >= 0) {
        set({ currentQuestion: nextQuestions })
      }
    },
    resetGame: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, {
  name: 'quesition'
}))
