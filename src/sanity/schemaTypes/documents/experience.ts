import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Professional Experience",
  type: "document",

  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "fullTime" },
          { title: "Part-time", value: "partTime" },
          { title: "Contract", value: "contract" },
          { title: "Freelance", value: "freelance" },
          { title: "Internship", value: "internship" },
          { title: "Volunteer", value: "volunteer" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "workArrangement",
      title: "Work Arrangement",
      type: "string",
      options: {
        list: [
          { title: "On-site", value: "onsite" },
          { title: "Remote", value: "remote" },
          { title: "Hybrid", value: "hybrid" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City, region or country.",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Currently Working Here",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      hidden: ({ document }) => Boolean(document?.isCurrent),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          const startDate = document?.startDate as string | undefined;
          const isCurrent = document?.isCurrent as boolean | undefined;

          if (isCurrent && value) {
            return "A current position should not have an end date.";
          }

          if (!isCurrent && !value) {
            return "Add an end date or mark this as your current position.";
          }

          if (value && startDate && value < startDate) {
            return "End date cannot be earlier than the start date.";
          }

          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "technology" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "skills",
      title: "Skills Demonstrated",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "organizationLogo",
      title: "Organization Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "jobTitle",
      organization: "organization",
      startDate: "startDate",
      endDate: "endDate",
      isCurrent: "isCurrent",
      media: "organizationLogo",
    },
    prepare({ title, organization, startDate, endDate, isCurrent, media }) {
      const period = startDate
        ? `${startDate} – ${isCurrent ? "Present" : endDate || "No end date"}`
        : "";

      return {
        title,
        subtitle: [organization, period].filter(Boolean).join(" · "),
        media,
      };
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Most Recent Start Date",
      name: "recentStart",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
