import { defineQuery } from "next-sanity";

// 1. All active disciplines, ordered by display order
export const allDisciplinesQuery = defineQuery(`
  *[_type == "discipline" && isActive == true]
  | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    icon,
    order
  }
`);

// 2. A single active discipline retrieved by slug
export const disciplineBySlugQuery = defineQuery(`
  *[
    _type == "discipline" &&
    isActive == true &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    icon,
    order
  }
`);

// 3. Active specializations belonging to a discipline
export const specializationsByDisciplineQuery = defineQuery(`
  *[
    _type == "specialization" &&
    isActive == true &&
    discipline->slug.current == $disciplineSlug
  ]
  | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    order,
    "discipline": discipline->{
      _id,
      name,
      "slug": slug.current
    }
  }
`);
