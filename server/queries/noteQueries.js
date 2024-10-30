const getNotesQuery = "SELECT * FROM notes;"
const addNotesQuery =
  "INSERT INTO notes (image_url, category, title, description) VALUES ($1, $2, $3, $4);"
const getNotesByCategoryQuery =
  "SELECT id, image_url, created_at, category, title, description FROM notes WHERE category = $1;"
const getCategoriesQuery = "SELECT DISTINCT category FROM notes;"
const deleteCardDataQuery = "DELETE FROM notes WHERE id = $1;"

const queries = {
  getNotesQuery,
  addNotesQuery,
  getNotesByCategoryQuery,
  getCategoriesQuery,
  deleteCardDataQuery,
}

export default queries
