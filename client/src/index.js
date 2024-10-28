import { createNote } from "./components/createNote.js"
import { noteCard } from "./components/noteCard.js"
const createNoteButton = document.getElementById("create-note-button")
const notesContainer = document.getElementById("notes-container")

createNoteButton.addEventListener("click", async () => {
  try {
    // Use createNote and post the noteData to backend
    const noteData = await createNote(["hello"], document.body)
    const response = await fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    })
    const result = await response.json()
    console.log("Status:", result.message)
    // Empty the notes container on submit button click and repopulate
    notesContainer.innerHTML = ""
    await populateNoteCard()
  } catch (err) {
    console.log(`Error in POST noteData:${err}`)
  }
})

const populateNoteCard = async () => {
  try {
    // Fetch notes data from backend and populate noteCard
    const noteData = await fetch("http://localhost:3000/api/v1/notes/get")
    const response = await noteData.json()
    response.forEach(async (element) => {
      const { id, image_url, created_at, title, description } = element
      await noteCard(id, image_url, created_at, title, description)
    })
  } catch (error) {
    console.log(error)
  }
}

populateNoteCard()
