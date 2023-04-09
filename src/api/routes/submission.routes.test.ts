import request from 'supertest'
import { createApp } from '../createApp'
import { Application } from 'express'
import { AppDataSource } from '../../infra/datasource'

describe('Submission routes', () => {
  let app: Application

  beforeAll(async () => {
    app = await createApp()
  })

  afterAll(async () => {
    await AppDataSource.dropDatabase() // clean up
  })

  test('Get empty form submissions', async () => {
    const res = await request(app).get('/submissions')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([])
  })

  test('When a POST /submissions request is sent with valid form input, submission is saved and returned with next GET request', async () => {
    const res = await request(app)
      .post('/submissions')
      .set('Content-type', 'application/json')
      .send([
        { questionId: 'double-glazed', content: 'yes' },
        { questionId: 'building-size', content: '70' },
        { questionId: 'boiler-type', content: 'gas' },
      ])
    expect(res.statusCode).toEqual(201)

    const submissionsRes = await request(app).get('/submissions')
    expect(submissionsRes.statusCode).toEqual(200)
    expect(submissionsRes.body.length).toEqual(1)
  })

  test('When a POST /submissions request is sent with invalid form input, returns validation message and 400 status code', async () => {
    const res = await request(app)
      .post('/submissions')
      .set('Content-type', 'application/json')
      .send({ invalid: 'Invalid input' })

    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual(
      `Invalid request. Body must be array of answers of shape {"questionId": string, "content": string}`
    )
  })

  test('When a POST /submissions request is sent with invalid answer shape, returns validation message and 400 status code', async () => {
    const res = await request(app)
      .post('/submissions')
      .set('Content-type', 'application/json')
      .send([
        { wrongKeyName: 'building-size', content: '70' },
        { questionId: 'boiler-type', content: 'gas' },
      ])

    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual(
      `Invalid request. Body must be array of answers of shape {\"questionId\": string, \"content\": string}`
    )
  })

  test('When a POST /submissions request is sent with a missing answer, returns validation message and 400 status code', async () => {
    const res = await request(app)
      .post('/submissions')
      .set('Content-type', 'application/json')
      .send([
        { questionId: 'building-size', content: '70' },
        { questionId: 'boiler-type', content: 'gas' },
      ])

    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual(
      `[\"Missing answer for required question double-glazed\"]`
    )
  })
})
