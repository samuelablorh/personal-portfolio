import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",

  groups: [
    { name: "basic", title: "Basic Information", default: true },
    { name: "classification", title: "Classification" },
    { name: "presentation", title: "Presentation" },
    { name: "resources", title: "Resources & Links" },
    { name: "outcomes", title: "Outcomes" },
  ],

  fields: [
    // BASIC INFORMATION
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "basic",
      description: "A brief summary displayed on project cards.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In Progress", value: "inProgress" },
          { title: "Planned", value: "planned" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Personal", value: "personal" },
          { title: "Client", value: "client" },
          { title: "Freelance", value: "freelance" },
          { title: "Academic", value: "academic" },
          { title: "Experimental", value: "experimental" },
          { title: "Open Source", value: "openSource" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      group: "basic",
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "date",
      group: "basic",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const startDate = context.document?.startDate as string | undefined;

          if (value && startDate && value < startDate) {
            return "Completion date cannot be earlier than the start date.";
          }

          return true;
        }),
    }),

    // CLASSIFICATION
    defineField({
      name: "disciplines",
      title: "Disciplines",
      type: "array",
      group: "classification",
      of: [
        {
          type: "reference",
          to: [{ type: "discipline" }],
          options: {
            disableNew: true,
          },
        },
      ],
      description: "A project can belong to multiple disciplines.",
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({
      name: "specializations",
      title: "Specializations",
      type: "array",
      group: "classification",
      of: [
        {
          type: "reference",
          to: [{ type: "specialization" }],
          options: {
            disableNew: true,
            filter: ({ document }) => {
              const disciplines = (document?.disciplines || []) as Array<{
                _ref?: string;
              }>;

              const disciplineIds = disciplines
                .map((item) => item?._ref)
                .filter((id): id is string => Boolean(id));

              if (disciplineIds.length === 0) {
                return {
                  filter: '_type == "specialization"',
                };
              }

              return {
                filter: "discipline._ref in $disciplineIds",
                params: { disciplineIds },
              };
            },
          },
        },
      ],
      description:
        "Choose specializations belonging to the selected disciplines.",
      options: {
        sortable: true,
      },
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "classification",
      of: [
        {
          type: "reference",
          to: [{ type: "technology" }],
          options: {
            disableNew: true,
          },
        },
      ],
      options: {
        sortable: true,
      },
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "skills",
      title: "Skills Demonstrated",
      type: "array",
      group: "classification",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }],
          options: {
            disableNew: true,
          },
        },
      ],
      options: {
        sortable: true,
      },
      validation: (Rule) => Rule.unique(),
    }),

    // PRESENTATION
    defineField({
      name: "showDetailsPage",
      title: "Show Project Details Page",
      type: "boolean",
      group: "presentation",
      initialValue: true,
      description: "Whether this project should have its own details page.",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      group: "presentation",
      initialValue: false,
      description: "Featured projects receive priority in project listings.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "presentation",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "coverImageAlt",
      title: "Cover Image Alternative Text",
      type: "string",
      group: "presentation",
      description: "Describe the cover image for accessibility.",
      hidden: ({ document }) => !document?.coverImage,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.coverImage && !value) {
            return "Alternative text is required when a cover image is provided.";
          }

          return true;
        }),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      group: "presentation",
      of: [{ type: "galleryItem" }],
      options: {
        sortable: true,
      },
    }),

    // RESOURCES AND LINKS
    defineField({
      name: "markdownUrl",
      title: "Markdown Content URL",
      type: "url",
      group: "resources",
      description:
        "Direct HTTPS URL to the project's Markdown file hosted on GitHub.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }),
    }),
    defineField({
      name: "links",
      title: "Project Links",
      type: "array",
      group: "resources",
      of: [{ type: "link" }],
      options: {
        sortable: true,
      },
      description:
        "Add relevant demo, repository, documentation, prototype, notebook, dataset, report, model or API links.",
    }),

    // OUTCOMES
    defineField({
      name: "achievements",
      title: "Key Achievements",
      type: "array",
      group: "outcomes",
      of: [{ type: "string" }],
      description: "Important accomplishments or contributions.",
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "results",
      title: "Results and Outcomes",
      type: "array",
      group: "outcomes",
      of: [{ type: "string" }],
      description: "Measurable results, findings or project outcomes.",
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      group: "outcomes",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
          options: {
            disableNew: true,
            filter: ({ document }) => ({
              filter: "_id != $currentId",
              params: {
                currentId: document?._id?.replace(/^drafts\./, ""),
              },
            }),
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Featured Projects First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Newest Projects",
      name: "newest",
      by: [{ field: "completionDate", direction: "desc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
