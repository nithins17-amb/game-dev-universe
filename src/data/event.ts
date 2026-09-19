export const event = {
  institution: "Madras Engineering College",
  department: "Department of Artificial Intelligence and Data Science",
  title: "One Day Workshop on Game Development",
  tagline: ["Design", "Develop", "Play"],
  date: "25 September 2026",
  day: "Friday",
  time: "9:00 AM onwards",
  venue: "First Floor, Computer Lab-1",
  fee: "₹300",
  address: "Tambaram Road, Vellarai-602105",
  registrationUrl: "https://forms.gle/Lnu5N8EabaNK62Ua5",
  website: "https://www.madrascollege.ac.in",
  startsAt: "2026-09-25T09:00:00+05:30",
} as const;

export const levels = [
  { id: "idea", number: "01", label: "The Idea" },
  { id: "design", number: "02", label: "Game Design" },
  { id: "unity", number: "03", label: "Unity" },
  { id: "code", number: "04", label: "C#" },
  { id: "animation", number: "05", label: "Animation" },
  { id: "build", number: "06", label: "Build" },
] as const;