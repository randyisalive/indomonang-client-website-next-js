export function formatDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const now = new Date();
  const formattedDate = now
    .toLocaleDateString("en-US", options)
    .replace(/,/g, "");
  const time = now.toLocaleTimeString("en-US", { hour12: false });

  const formattedDateString = `${formattedDate.split(" ")[0]},${formattedDate
    .split(" ")[1]
    .split("/")
    .reverse()
    .join("-")}, ${time}`;
  return formattedDateString;
}

console.log(formatDate());
