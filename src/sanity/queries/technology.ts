import { defineQuery } from "next-sanity";

// All active technologies, ordered by category and name
export const allTechnologiesQuery = defineQuery(`
  *[_type == "technology" && isActive == true]
  | order(category asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    icon,
    website
  }
`);
