import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pool from "./database/db.js"
import queries from "./queries/noteQueries.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.post("/api/v1/notes", (req, res) => {
  const { image_url, category, title, description } = req.body
  pool.query(queries.addNotesQuery, [image_url, category, title, description], (error, results) => {
    if (error) {
      console.error("Error adding note:", error)
      res.status(500).json({ error: "An error occurred while adding the note." })
      return
    }
    console.log("Note Added Successfully!")
    res.status(201).json({ message: "Note Added Successfully!" })
  })
})

app.get("/api/v1/notes/get", (req, res) => {
  pool.query(queries.getNotesQuery, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
})

app.get("/api/v1/notes/categories", (req, res) => {
  pool.query(queries.getCategoriesQuery, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
})

app.get("/api/v1/notes/category/:category", (req, res) => {
  pool.query(queries.getNotesByCategoryQuery, [req.params.category], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
})

app.delete("/api/v1/notes/:id", (req, res) => {
  pool.query(queries.deleteCardDataQuery, [req.params.id], (error, results) => {
    if (error) throw error
    res.status(200).json({ message: "Note deleted successfully!" })
  })
})

app.put("/api/v1/notes/edit/:id", (req, res) => {
  const { id } = req.params
  const { image_url, category, title, description } = req.body
  const fields = []
  const values = []
  // Create fields and values dynamically
  for (const [key, value] of Object.entries({ image_url, category, title, description })) {
    if (value) {
      fields.push(`${key} = $${fields.length + 1}`)
      values.push(value)
    }
  }
  // Ensure at least one field is provided
  if (!fields.length) {
    return res.status(400).json({ error: "No fields to update" })
  }
  values.push(id)
  const query = `UPDATE notes SET ${fields.join(", ")} WHERE id = $${values.length};`
  pool.query(query, values, (error) => {
    if (error) throw error
    res.status(200).json({ message: "Note deleted successfully!" })
  })
})

app.use("/", (req, res) => {
  res.send("Server is running")
})

app.listen(port, () => {
  console.log(`Server is running on Port:${port}`)
})
