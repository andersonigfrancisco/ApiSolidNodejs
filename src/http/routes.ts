import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from "./controllers/profile";


export async function appRoutes(app: FastifyInstance) {
  app.post('/users', { onRequest: [verifyJwt] }, register)
  app.post('/session', authenticate)

  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}