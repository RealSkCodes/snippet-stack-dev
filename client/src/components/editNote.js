import { createElement } from "../utils/createElement.js"
import { dropdown } from "../utils/dropdown.js"
import { getUploadImageLink } from "../utils/uploadImage.js"

export const editNote = async (options, appendElement) => {
  const noteData = await new Promise((resolve) => {
    try {
      // Create modalDialog for notes creation modal
      const dialogModal = document.getElementById("modal-dialog")
      if (!dialogModal) {
        const modalDialog = createElement("dialog", { id: "modal-dialog" })
        appendElement.append(modalDialog)
        modalDialog.showModal()

        // Prevent clicks outside of dialog from closing it
        modalDialog.addEventListener("click", (event) => {
          const rect = modalDialog.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            event.stopPropagation()
          }
        })

        // Create div to contain image upload, new category button and category function dropdown
        const noteImgCateDropContainer = createElement("div", {
          id: "note-img-cate-drop-container",
        })
        modalDialog.append(noteImgCateDropContainer)

        // Image upload input
        const imageUpload = createElement("input", { type: "file", id: "image-upload" })
        noteImgCateDropContainer.append(imageUpload)
        imageUpload.accept = "image/*"

        // Category function dropdown
        let categoryDropdown = dropdown(noteImgCateDropContainer, options)

        // Create new category add button
        const createCategoryButton = createElement("button", {
          id: "create-category-button",
          innerHTML: "Create ✙",
        })
        noteImgCateDropContainer.append(createCategoryButton)

        // Add event listener to create category button
        createCategoryButton.addEventListener("click", () => {
          // Create category textbox and textbox submit button
          const createTextboxForCategoryName = createElement("textarea", {
            id: "create-textbox-for-category-name",
            placeholder: "Enter the new category name here...",
          })
          const textboxSubmitButton = createElement("button", {
            id: "textbox-submit-button",
            innerHTML: "Submit",
          })

          // Add event listener to textbox submit button
          textboxSubmitButton.addEventListener("click", () => {
            const categoryTextboxValue = createTextboxForCategoryName.value.trim()
            if (!categoryTextboxValue) return
            // Add new category and update dropdown
            options.push(categoryTextboxValue)
            categoryDropdown.replaceWith(
              (categoryDropdown = dropdown(noteImgCateDropContainer, options))
            )
            // Store the new category in localStorage
            localStorage.setItem(localStorage.length + 1, categoryTextboxValue)
            // Reset UI elements
            createTextboxForCategoryName.replaceWith(createCategoryButton)
            textboxSubmitButton.replaceWith(createCategoryButton)
          })
          // Append the textbox and submit button
          createCategoryButton.replaceWith(createTextboxForCategoryName)
          noteImgCateDropContainer.append(textboxSubmitButton)
        })

        // Title input
        const titleTextboxInput = createElement("textarea", {
          id: "title-textbox-input",
          placeholder: "Enter the title here...",
        })
        modalDialog.append(titleTextboxInput)

        // Description input
        const descriptionTextboxInput = createElement("textarea", {
          id: "description-textbox-input",
          placeholder: "Enter the details here...",
        })
        modalDialog.append(descriptionTextboxInput)

        // Create div to contain buttons
        const cancelAndSubmitBtnContainer = createElement("div", {
          id: "cancel-and-submit-btn-container",
        })
        modalDialog.append(cancelAndSubmitBtnContainer)

        // Cancel button
        const noteCancelButton = createElement("button", {
          id: "note-cancel-button",
          innerHTML: "❌",
        })
        cancelAndSubmitBtnContainer.append(noteCancelButton)
        noteCancelButton.addEventListener("click", () => {
          modalDialog.close()
          modalDialog.remove()
        })

        // Submit button
        const noteSubmitButton = createElement("button", {
          id: "note-submit-button",
          innerHTML: "Submit",
        })
        cancelAndSubmitBtnContainer.append(noteSubmitButton)

        // Add event listener to note submit button
        // Add event listener to note submit button
        noteSubmitButton.addEventListener("click", async () => {
          const file = imageUpload.files[0] // Get the selected file
          let uploadedImageUrl // Initialize variable for uploaded image URL

          if (!file) {
            // Handle the case where no file is selected
            console.warn("No image file selected.")
            uploadedImageUrl = null // Set to null or handle as needed
          } else {
            // Proceed with uploading the image if a file is selected
            uploadedImageUrl = await getUploadImageLink(imageUpload)
          }

          const categoryValue = categoryDropdown.value
          const titleTextValue = document.getElementById("title-textbox-input").value
          const descriptionTextValue = document.getElementById("description-textbox-input").value

          // Prepare the note data object, omitting empty fields
          const notePayload = {}
          if (uploadedImageUrl) notePayload.image_url = uploadedImageUrl // Add image URL if it exists
          if (categoryValue && categoryValue !== "select") notePayload.category = categoryValue // Add category if valid
          if (titleTextValue) notePayload.title = titleTextValue // Add title if not empty
          if (descriptionTextValue) notePayload.description = descriptionTextValue // Add description if not empty

          // Validate payload
          if (Object.keys(notePayload).length === 0) {
            alert("Please provide at least one field to submit.")
            return
          }

          // Resolve the promise with the populated payload
          resolve(notePayload)

          // Close modal
          modalDialog.close()
          modalDialog.remove()
        })
      }
    } catch (err) {
      console.log(`Error in editNote: ${err}`)
    }
  })
  // Return the object
  return noteData
}
