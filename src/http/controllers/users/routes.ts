import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { refresh } from './refresh'
//import { verifyUserRole } from '@/http/middlewares/verify-user-role'



export async function usersRoutes(app: FastifyInstance) {

  //app.addHook('onRequest', verifyJwt)

  app.post('/users', register)

  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  //{ onRequest: [verifyUserRole('ADMIN')] },
  app.get('/profile', { onRequest: [verifyJwt] }, profile)
}