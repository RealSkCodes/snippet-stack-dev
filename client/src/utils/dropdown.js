export const dropdown = (elemToAppend, options) => {
  // Create Category selection dropdown
  const createCategory = document.createElement("select")
  elemToAppend.append(createCategory)
  createCategory.id = `options-append-${elemToAppend.id}`
  options.forEach(() => {
    createCategory.innerHTML = `<option value="select" disabled selected>Select Category</option>`
  })
  options.forEach((element) => {
    createCategory.innerHTML += `<option value="${element}">${element}</option>`
  })
  return createCategory
}
