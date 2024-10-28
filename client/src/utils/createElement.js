export const createElement = (
  tag,
  {
    id = null,
    className = null,
    innerHTML = null,
    textContent = null,
    placeholder = null,
    src = null,
    href = null,
    style = {},
    type = null,
  } = {}
) => {
  const element = document.createElement(tag)

  if (id) element.id = id
  if (className) element.className = className
  if (innerHTML) element.innerHTML = innerHTML
  if (textContent) element.textContent = textContent
  if (placeholder) element.placeholder = placeholder
  if (src) element.src = src
  if (href) element.href = href
  Object.assign(element.style, style)
  if (type) element.type = type

  return element
}
