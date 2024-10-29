import { createNote } from "./components/createNote.js"
import { noteCard } from "./components/noteCard.js"
import { createElement } from "./utils/createElement.js"
const createNoteButton = document.getElementById("create-note-button")
const notesContainer = document.getElementById("notes-container")
const navbar = document.getElementById("header-bottom-container-navbar")

createNoteButton.addEventListener("click", async () => {
  try {
    // Use createNote and post the noteData to backend
    const noteData = await createNote(["hello"], document.body)
    const response = await fetch("https://snippet-stack-server.vercel.app/api/v1/notes", {
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
    navbar.innerHTML = ""
    await populateNoteCard()
  } catch (err) {
    console.log(`Error in POST noteData:${err}`)
  }
})

const populateNoteCard = async () => {
  try {
    // Fetch notes data from backend and populate noteCard
    const noteData = await fetch("https://snippet-stack-server.vercel.app/api/v1/notes/get")
    const response = await noteData.json()
    response.forEach(async (element) => {
      const { id, image_url, created_at, title, description } = element
      await noteCard(id, image_url, created_at, title, description)
    })
    await getCategories()
  } catch (error) {
    console.log(error)
  }
}

const getCategories = async () => {
  // Fetch unique category names from backend and populate navbar
  const noteCategories = await fetch(
    "https://snippet-stack-server.vercel.app/api/v1/notes/categories"
  )
  const response = await noteCategories.json()
  response.unshift({ category: "All" })
  // console.log(response)
  response.forEach(async (element) => {
    let spanCategory = createElement("span", { innerHTML: element.category })
    navbar.append(spanCategory)
  })
}

const getNotesByCategory = async () => {
  // Fetch notes by category name from backend and populate noteCard
  navbar.addEventListener("click", async (event) => {
    if (event.target.tagName === "SPAN" && event.target.innerHTML !== "All") {
      const categoryName = event.target.innerHTML.trim()
      try {
        const noteCategoriesData = await fetch(
          `https://snippet-stack-server.vercel.app/api/v1/notes/category/${categoryName}`
        )
        const response = await noteCategoriesData.json()
        notesContainer.innerHTML = ""
        response.forEach(async (element) => {
          const { id, image_url, created_at, title, description } = element
          await noteCard(id, image_url, created_at, title, description)
        })
      } catch (error) {
        console.error("Error fetching notes by category:", error)
      }
    } else if (event.target.innerHTML === "All") {
      // Populate notecard for "All" category
      notesContainer.innerHTML = ""
      navbar.innerHTML = ""
      await populateNoteCard()
    }
  })
}

getNotesByCategory()
populateNoteCard()
