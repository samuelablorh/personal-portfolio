import { type SchemaTypeDefinition } from "sanity";

import { discipline } from "./documents/discipline";
import { specialization } from "./documents/specialization";
import { technology } from "./documents/technology";
import { skill } from "./documents/skill";
import { experience } from "./documents/experience";
import { project } from "./documents/project";

import { link } from "./objects/link";
import { galleryItem } from "./objects/galleryItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document Schemas
    discipline,
    specialization,
    technology,
    skill,
    experience,
    project,

    // Object Schemas
    link,
    galleryItem,
  ],
};