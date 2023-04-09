export type ValidationResult = {
  hasErrors: boolean
  errorMessages: string[]
}

export type AnswerDTO = {
  questionId: string
  content: string
}

export const isAnswerDto = (element: AnswerDTO): element is AnswerDTO => {
  const answerDto = element as AnswerDTO
  return (
    typeof answerDto.content === 'string' &&
    typeof answerDto.questionId === 'string'
  )
}

export type Question = {
  questionId: string
  text: string
  answerType: 'string' | 'number' | 'boolean'
  validation: Validation
}

type Validation = {
  maxLength?: number
  required: boolean
}
