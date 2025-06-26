import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

// Allowed origins for CORS: local dev + production frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-production-url.vercel.app', // ← Replace with your actual production frontend URL
]

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  }),
)

app.use(express.json())

console.log('DATABASE_URL:', process.env.DATABASE_URL)

// Create a new project
app.post('/projects', async (req: Request, res: Response): Promise<void> => {
  const { title, description, startDate, endDate } = req.body

  if (!title || !description || !startDate || !endDate) {
    res.status(400).json({ message: 'All fields are required' })
    return
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    })

    res.status(201).json({ message: 'Project created', data: newProject })
  } catch (error) {
    console.error('Create error:', error)
    res.status(500).json({ message: 'Failed to create project' })
  }
})

// Get all projects
app.get('/projects', async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany()
    res.json(projects)
  } catch (error) {
    console.error('Fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

// Get a project by ID
app.get('/projects/:id', async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid project ID' })
    return
  }

  try {
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) {
      res.status(404).json({ message: 'Project not found' })
      return
    }

    res.json(project)
  } catch (error) {
    console.error('Fetch by ID error:', error)
    res.status(500).json({ message: 'Failed to fetch project' })
  }
})

// Update a project
app.put('/projects/:id', async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  const { title, description, startDate, endDate } = req.body

  if (!title || !description || !startDate || !endDate) {
    res.status(400).json({ message: 'All fields are required for update' })
    return
  }

  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid project ID' })
    return
  }

  try {
    const existing = await prisma.project.findUnique({ where: { id } })
    if (!existing) {
      res.status(404).json({ message: 'Project not found' })
      return
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    })

    res.json({ message: 'Project updated', data: updated })
  } catch (error) {
    console.error('Update error:', error)
    res.status(500).json({ message: 'Failed to update project' })
  }
})

// Delete a project by ID
app.delete('/projects/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).send({ message: 'Invalid ID' })
    return
  }

  try {
    await prisma.project.delete({ where: { id } })
    console.log('Deletion request received')
    console.log('ID:', id)
    res.status(200).send({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).send({ message: 'Failed to delete project' })
  }
})

// Use PORT env var if available (Render, Vercel, etc.), else default 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
