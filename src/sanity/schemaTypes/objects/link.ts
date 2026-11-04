import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "type",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Live Demo", value: "liveDemo" },
          { title: "Repository", value: "repository" },
          { title: "Documentation", value: "documentation" },
          { title: "Prototype", value: "prototype" },
          { title: "Notebook", value: "notebook" },
          { title: "Dataset", value: "dataset" },
          { title: "Report", value: "report" },
          { title: "Model", value: "model" },
          { title: "API", value: "api" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "type",
    },
  },
});
