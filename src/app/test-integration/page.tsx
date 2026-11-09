import { sanityFetch } from "@/sanity/lib/live";
import { fetchProjectMarkdown } from "@/sanity/lib/markdown";
import { projectBySlugQuery } from "@/sanity/queries";

import { MarkdownRenderer } from "@/components/projects/MarkdownRenderer";

export default async function TestIntegrationPage() {
  "use cache";

  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug: "taskflow" },
  });

  if (!project) {
    return <p>TaskFlow project not found in Sanity.</p>;
  }

  const markdown = project?.markdownUrl
    ? await fetchProjectMarkdown(project.markdownUrl)
    : null;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 p-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p>{project.description}</p>

        <h2 className="text-xl font-semibold">Disciplines</h2>
        <ul>
          {project.disciplines?.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold">Specializations</h2>
        <ul>
          {project.specializations?.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold">Technologies</h2>
        <ul>
          {project.technologies?.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">GitHub Markdown</h2>

        {markdown ? (
          <MarkdownRenderer content={markdown} />
        ) : (
          <p>No Markdown URL configured.</p>
        )}
      </section>
    </main>
  );
}
