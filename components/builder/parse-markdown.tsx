import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import CodeBlock from "./code-block";
import rehypeSanitize from "rehype-sanitize";

interface ComponentTypes {
  className?: string;
  href?: string;
  [key: string]: any;
}

function ParseMarkdown({
  code,
  codeCopyable = false,
  codeClass = "",
  className,
}: {
  code: string;
  codeCopyable?: boolean;
  codeClass?: string;
  className?: string;
}) {
  const components = {
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const blobURLMatch = code.match(/!\[Site Logo\]\((.*?)\)/);
      const blobURL = blobURLMatch ? blobURLMatch[1] : "";
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={cn(
            "my-2 inline-flex rounded-md border min-w-full object-contain",
            className
          )}
          alt={alt}
          src={blobURL}
          {...props}
        />
      );
    },
    pre: ({ className, ...props }: ComponentTypes) => (
      <pre className={cn("mt-5 flex w-full", className)} {...props} />
    ),
    code({ inline, className, children, ...props }: ComponentTypes) {
      return (
        <CodeBlock
          value={children}
          {...props}
          copyable={codeCopyable}
          codeClass={codeClass}
        />
      );
    },
  };

  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[rehypeSanitize]}
      className={cn("markdown", className)}
    >
      {code}
    </ReactMarkdown>
  );
}

export default ParseMarkdown;
