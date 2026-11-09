import { cacheLife } from "next/cache";

const GITHUB_RAW_HOST = "raw.githubusercontent.com";

export async function fetchProjectMarkdown(url: string): Promise<string> {
  "use cache";

  cacheLife("hours");

  const parsedUrl = new URL(url);

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== GITHUB_RAW_HOST
  ) {
    throw new Error("Invalid Markdown URL. Only GitHub raw URLs are allowed.");
  }

  const response = await fetch(parsedUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch project Markdown: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}
