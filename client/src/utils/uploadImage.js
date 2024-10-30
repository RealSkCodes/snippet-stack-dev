export const getUploadImageLink = async (inputFile) => {
  const file = await inputFile.files[0]
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "doc_codepen_example")
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/demo/image/upload`, {
      method: "POST",
      body: formData,
    })
    const data = await response.json()
    if (data.secure_url) {
      return data.secure_url
    } else {
      console.error("Image upload failed:", data)
    }
  } catch (error) {
    console.error("Error during image upload:", error)
  }
}
