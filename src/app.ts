import fastifyJwt from "@fastify/jwt";
import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'



export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation Error ', inssues: error.format() })
  }
  if (env.NODE_ENV != 'production')
    console.error(error)
  else
    // Todo heere we should log to on external tool like DataDog/NewRelic/Sentry

    return reply.status(500).send({ message: 'Internal server error.' })
})