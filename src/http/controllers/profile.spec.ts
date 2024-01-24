import request from 'supertest'
import {  describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('Profile (e2e)', () => {

  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const {body} = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await request(app.server).get('/me').set('Authorization', `bearer ${body.token}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com'
      })
    )
  })
})