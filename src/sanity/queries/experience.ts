import { defineQuery } from "next-sanity";

// Active work experience, ordered by most recent first
export const allExperienceQuery = defineQuery(`
  *[_type == "experience" && isActive == true]
  | order(isCurrent desc, startDate desc, order asc) {
    _id,
    jobTitle,
    organization,
    employmentType,
    workArrangement,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    responsibilities,
    achievements,
    "technologies": technologies[]->{
      _id,
      name,
      category,
      icon
    },
    "skills": skills[]->{
      _id,
      name,
      category
    },
    organizationLogo,
    order
  }
`);
