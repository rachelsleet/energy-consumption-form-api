import { validate } from './validator'

describe('Validator', () => {
  test('Returns error if maxLength exceeded', async () => {
    const validationResponse = validate(
      [{ questionId: 'name', content: 'toolongforvalidation' }],
      [
        {
          questionId: 'name',
          text: 'What is your name?',
          answerType: 'string',
          validation: { maxLength: 10, required: true },
        },
      ]
    )

    expect(validationResponse).toEqual({
      hasErrors: true,
      errorMessages: ['name must be fewer than 10 characters'],
    })
  })

  test('Returns error if required answer is missing or empty', async () => {
    const validationResponse = validate(
      [{ questionId: 'empty', content: '' }],
      [
        {
          questionId: 'empty',
          text: 'Empty answer examples',
          answerType: 'string',
          validation: { required: true },
        },
        {
          questionId: 'missing',
          text: 'Missing answer examples',
          answerType: 'string',
          validation: { required: true },
        },
      ]
    )

    expect(validationResponse).toEqual({
      hasErrors: true,
      errorMessages: [
        'Missing answer for required question empty',
        'Missing answer for required question missing',
      ],
    })
  })

  test('Returns no error if answer is below maxLength', async () => {
    const validationResponse = validate(
      [{ questionId: 'name', content: 'correct length' }],
      [
        {
          questionId: 'name',
          text: 'What is your name?',
          answerType: 'string',
          validation: { maxLength: 20, required: true },
        },
      ]
    )

    expect(validationResponse).toEqual({
      hasErrors: false,
      errorMessages: [],
    })
  })

  test('Returns no error if non-required answer is missing', async () => {
    const validationResponse = validate(
      [],
      [
        {
          questionId: 'notRequired',
          text: 'Is this really necessary?',
          answerType: 'string',
          validation: { required: false },
        },
      ]
    )

    expect(validationResponse).toEqual({
      hasErrors: false,
      errorMessages: [],
    })
  })

  test('Returns error if answer provided for question not in form', async () => {
    const validationResponse = validate(
      [{ questionId: 'unexpectedAnswer', content: 'SURPRISE!' }],
      []
    )

    expect(validationResponse).toEqual({
      hasErrors: true,
      errorMessages: [`Question: unexpectedAnswer is not part of the form`],
    })
  })
})
