function isHtml(content: string) {
  return /^<[a-z]/i.test(content.trim());
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function MarkdownBody({ body }: { body: string }) {
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 text-[16px] leading-[1.9] text-ink/80">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="pt-4 font-display text-[22px] font-bold text-ink">
              {block.slice(4)}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-6 font-display text-[28px] font-bold text-ink">
              {block.slice(3)}
            </h2>
          );
        }

        if (block.startsWith("- ")) {
          return (
            <ul key={index} className="space-y-3 pl-5">
              {block.split("\n").map((item) => (
                <li key={item} className="list-disc marker:text-indigo">
                  {renderInline(item.replace(/^- /, ""))}
                </li>
              ))}
            </ul>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote key={index} className="border-l-2 border-indigo/50 pl-5 text-ink/75 italic">
              {renderInline(block.replace(/^> /, ""))}
            </blockquote>
          );
        }

        if (block.startsWith("```")) {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-slate p-4 font-mono text-[13px] leading-relaxed text-ink/85"
            >
              <code>{block.replace(/^```\n?/, "").replace(/\n?```$/, "")}</code>
            </pre>
          );
        }

        return <p key={index}>{renderInline(block)}</p>;
      })}
    </div>
  );
}

export function BlogBody({ body }: { body: string }) {
  if (isHtml(body)) {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }

  return <MarkdownBody body={body} />;
}
