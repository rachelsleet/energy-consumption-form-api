import request from 'supertest'
import { createApp } from '../createApp'
import { form } from '../../domain/form'
import { Application } from 'express'

describe('Form routes', () => {
  let app: Application
  beforeAll(async () => {
    app = await createApp()
  })
  test('Can return the form structure', async () => {
    const res = await request(app).get('/form')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(form)
  })
})
