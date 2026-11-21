import { sanityFetch } from "@/sanity/lib/live";
import { allProjectsQuery } from "@/sanity/queries";
import Link from "next/link";

export default async function TestIntegrationPage() {
  "use cache";

  const { data: projects } = await sanityFetch({
    query: allProjectsQuery,
  });

  if (!projects?.length) {
    return <p>No projects found in Sanity.</p>;
  }

  console.log("Retrieved projects from Sanity:", projects);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 p-8">
      <header>
        Link to <Link href="/test-integration">Test Integration Home</Link>
        <h1 className="text-3xl font-bold">Sanity Integration Test</h1>
        <p>Projects retrieved: {projects.length}</p>
      </header>

      {projects.map((project) => (
        <section key={project._id} className="space-y-4 rounded-lg border p-6">
          <div>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p>{project.description}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <p>Status: {project.status}</p>
            <p>Project Type: {project.projectType}</p>
            <p>Featured: {project.featured ? "Yes" : "No"}</p>
            <p>Order: {project.order}</p>
            <p>Slug: {project.slug}</p>
          </div>

          <div>
            <h3 className="font-semibold">Disciplines</h3>
            <ul className="list-inside list-disc">
              {project.disciplines?.map((item) => (
                <li key={item._id}>{item.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Specializations</h3>
            <ul className="list-inside list-disc">
              {project.specializations?.map((item) => (
                <li key={item._id}>{item.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Technologies</h3>
            <ul className="list-inside list-disc">
              {project.technologies?.map((item) => (
                <li key={item._id}>
                  {item.name} ({item.category})
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Skills</h3>
            <ul className="list-inside list-disc">
              {project.skills?.map((item) => (
                <li key={item._id}>
                  {item.name} ({item.category})
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Links</h3>
            {project.links?.length ? (
              <ul className="list-inside list-disc">
                {project.links.map((link, index) => (
                  <li key={`${link.url}-${index}`}>
                    <a
                      href={link.url ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {link.label}
                    </a>{" "}
                    ({link.type})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No links configured.</p>
            )}
          </div>

          <p>Cover Image: {project.coverImage ? "Configured" : "Missing"}</p>
        </section>
      ))}
    </main>
  );
}
