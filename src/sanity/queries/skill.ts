import { defineQuery } from "next-sanity";

// All active skills, including their related technologies
export const allSkillsQuery = defineQuery(`
  *[_type == "skill" && isActive == true]
  | order(category asc, order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    "relatedTechnologies": relatedTechnologies[]->{
      _id,
      name,
      category,
      icon,
      website
    },
    order
  }
`);
