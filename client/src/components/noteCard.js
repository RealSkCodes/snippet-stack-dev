import { formatDate } from "../utils/formatDate.js"
import { createElement } from "../utils/createElement.js"
const notesContainer = document.getElementById("notes-container")

export const noteCard = async (id, image, date, title, description) => {
  // Create card div to connect to notes container
  const cardDiv = createElement("div", { id: `card-id${id}`, className: "note-card" })
  notesContainer.prepend(cardDiv)
  // Insert the thumbnail image
  const thumbnail = createElement("img", { src: image })
  cardDiv.append(thumbnail)
  // Insert the date/timestamp
  const dateText = createElement("span", { innerHTML: formatDate(date) })
  cardDiv.append(dateText)
  // Insert the title
  const titleText = createElement("span", { innerHTML: title })
  cardDiv.append(titleText)

  // Create the modal full view card
  cardDiv.addEventListener("click", (event) => {
    const modalDialog = createElement("dialog", { id: `modal${id}` })
    document.body.append(modalDialog)
    modalDialog.showModal()
    // Create a container
    const imgAndCloseBtnContainer = createElement("div", { id: "img-and-close-button-container" })
    modalDialog.append(imgAndCloseBtnContainer)
    // Insert the image into modal
    const thumbnailModal = createElement("img", { src: image })
    imgAndCloseBtnContainer.append(thumbnailModal)
    // Close button
    const closeModalDialogBtn = createElement("button", {
      className: "close-modal-dialog-btn",
      innerHTML: "❌",
    })
    imgAndCloseBtnContainer.append(closeModalDialogBtn)
    closeModalDialogBtn.addEventListener("click", () => {
      modalDialog.close()
      modalDialog.remove()
    })
    // Create label for date and date field
    const dateLabel = createElement("label", { innerHTML: "Date:" })
    modalDialog.append(dateLabel)
    const dateTextModal = createElement("span", { innerHTML: formatDate(date) })
    modalDialog.append(dateTextModal)
    // Create lable for title and title field
    const titleLabel = createElement("label", { innerHTML: "Title:" })
    modalDialog.append(titleLabel)
    const titleTextModal = createElement("span", { innerHTML: title })
    modalDialog.append(titleTextModal)
    // Create label for description and description field
    const descriptionLabel = createElement("label", { innerHTML: "Description:" })
    modalDialog.append(descriptionLabel)
    const descriptionTextModal = createElement("span", { innerHTML: description })
    modalDialog.append(descriptionTextModal)
    // Delete card and data
    const deleteCard = createElement("button", {
      id: `${id}`,
      className: "delete-card",
      innerHTML: "Delete",
    })
    modalDialog.append(deleteCard)
  })
}
