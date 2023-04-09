import { AnswerDTO, Question, ValidationResult } from '../../types'

export const validate = (
  answers: AnswerDTO[],
  formStructure: Question[]
): ValidationResult => {
  const errorMessages = []

  for (const answer of answers) {
    // if doesn't exist in formStructure - add error message
    const question = formStructure.find(
      (q) => q.questionId === answer.questionId
    )

    if (!question) {
      errorMessages.push(
        `Question: ${answer.questionId} is not part of the form`
      )
      break
    }

    // if does exist, check isRequired and maxLength - add error messages
    const { maxLength, required } = question.validation

    if (required && !answer.content) {
      errorMessages.push(
        `Missing answer for required question ${question.questionId}`
      )
    }

    if (maxLength && answer.content.length > maxLength) {
      errorMessages.push(
        `${question.questionId} must be fewer than ${maxLength} characters`
      )
    }
  }

  // If any required questions are missing in the answers, add error message
  formStructure
    .filter(
      (q) =>
        q.validation.required &&
        !answers.find((a) => a.questionId === q.questionId)
    )
    .forEach((q) => {
      errorMessages.push(`Missing answer for required question ${q.questionId}`)
    })

  return { hasErrors: errorMessages.length > 0, errorMessages }
}
