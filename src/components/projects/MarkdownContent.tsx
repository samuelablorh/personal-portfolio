import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article
      // className="prose prose-slate dark:prose-invert max-w-none"
      className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-emerald-600 prose-h2:text-teal-600 prose-h3:text-orange-600 prose-h4:text-rose-600 prose-h5:text-slate-700 prose-h6:text-stone-600 prose-a:text-cyan-600 prose-a:hover:text-cyan-700 dark:prose-h1:text-emerald-400 dark:prose-h2:text-teal-400 dark:prose-h3:text-orange-400 dark:prose-h4:text-rose-400 dark:prose-h5:text-slate-300 dark:prose-h6:text-stone-400 dark:prose-a:text-cyan-400 dark:prose-a:hover:text-cyan-300 max-w-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),

          strong: ({ ...props }) => (
            <strong {...props} className="text-red-700" />
          ),

          pre: ({ ...props }) => (
            <pre {...props} className="overflow-x-auto rounded-lg p-4" />
          ),

          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className?.includes("language-"));

            return (
              <code
                {...props}
                className={
                  isBlock
                    ? className
                    : "rounded px-1.5 py-0.5 font-mono text-sm"
                }
              >
                {children}
              </code>
            );
          },

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
