import Link from "next/link";

const TestIntegrationPage = () => {
  return (
    <div>
      <main className="mx-auto w-full max-w-5xl space-y-8 p-8">
        <header>
          <h1 className="text-3xl font-bold">Sanity Integration Test</h1>
          <Link
            href="/test-integration/projects"
            className="text-link hover:text-link-hover underline"
          >
            View Projects
          </Link>
        </header>
      </main>
    </div>
  );
};

export default TestIntegrationPage;
