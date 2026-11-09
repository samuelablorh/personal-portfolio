import { defineQuery } from "next-sanity";

// Shared project fields
const projectFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  status,
  projectType,
  featured,
  order,
  startDate,
  completionDate,
  "disciplines": disciplines[]->{
    _id,
    name,
    "slug": slug.current,
    icon
  },
  "specializations": specializations[]->{
    _id,
    name,
    "slug": slug.current
  },
  "technologies": technologies[]->{
    _id,
    name,
    category,
    icon
  },
  coverImage,
  coverImageAlt,
  links[]{
    label,
    url,
    type
  }
`;

// 1. All projects, with featured projects first
export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  | order(featured desc, order asc, title asc) {
    ${projectFields}
  }
`);

// 2. Featured projects only
export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true && defined(slug.current)]
  | order(order asc, title asc) {
    ${projectFields}
  }
`);

// 3. Projects filtered by discipline slug
export const projectsByDisciplineQuery = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    references(*[
      _type == "discipline" &&
      slug.current == $disciplineSlug
    ]._id)
  ]
  | order(featured desc, order asc, title asc) {
    ${projectFields}
  }
`);

// 4. Projects filtered by specialization slug
export const projectsBySpecializationQuery = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    references(*[
      _type == "specialization" &&
      slug.current == $specializationSlug
    ]._id)
  ]
  | order(featured desc, order asc, title asc) {
    ${projectFields}
  }
`);

// 5. A single project retrieved by slug
export const projectBySlugQuery = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug &&
    showDetailsPage == true
  ][0]{
    ${projectFields},
    markdownUrl,
    gallery[]{
      image,
      alt,
      caption
    },
    achievements,
    results,
    "relatedProjects": relatedProjects[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      coverImage,
      coverImageAlt
    }
  }
`);
