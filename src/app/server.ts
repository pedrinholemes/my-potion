import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

const server = express()

// Headers Config
server.use(helmet())

// Body Config
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Logger Config
server.use(morgan('dev'))

export { server }
