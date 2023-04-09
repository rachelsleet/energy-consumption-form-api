import { Question } from '../types'

export const form: Question[] = [
  {
    questionId: 'double-glazed',
    text: 'Are your windows double glazed?',
    answerType: 'string',
    validation: { maxLength: 20, required: true },
  },
  {
    questionId: 'building-size',
    text: 'How large is the livable area of your building in m2?',
    answerType: 'string',
    validation: { maxLength: 20, required: true },
  },
  {
    questionId: 'boiler-type',
    text: 'What type of boilder do you have?',
    answerType: 'string',
    validation: { required: true },
  },
]
