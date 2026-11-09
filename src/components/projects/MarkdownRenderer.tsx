import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          pre: ({ ...props }) => (
            <pre
              {...props}
              className="bg-surface-muted overflow-x-auto rounded-lg p-4"
            />
          ),
          code: ({ className, ...props }) => (
            <code
              className={`${className ?? ""} bg-surface-muted rounded px-1 py-0.5`}
              {...props}
            />
          ),
          img: ({ src, alt }) => {
            if (typeof src !== "string" || !src) return null;

            return (
              <Image
                src={src}
                alt={alt ?? ""}
                width={1200}
                height={800}
                className="h-auto max-w-full rounded-lg"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
