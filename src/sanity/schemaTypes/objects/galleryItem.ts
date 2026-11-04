import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Describe the image for accessibility.",
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (Rule) => Rule.max(150),
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Gallery image",
        media,
      };
    },
  },
});
