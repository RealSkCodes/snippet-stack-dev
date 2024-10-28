export const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date))
}
