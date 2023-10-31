import { cn } from "@/lib/utils";
import CopyButton from "../copy-button";
import { Highlight, themes } from "prism-react-renderer";

function CodeBlock({
  value,
  className,
  copyable = true,
}: {
  value: string;
  className?: string;
  codeClass?: string;
  copyable?: boolean;
  codeWrap?: boolean;
  noCodeFont?: boolean;
  noMask?: boolean;
}) {
  value = value || "";

  return (
    <Highlight theme={themes.oneDark} code={value} language="tsx">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={cn(
            `relative h-full w-full whitespace-pre-wrap rounded-lg p-4 text-sm
          } `,
            className
          )}
        >
          <CopyButton value={value} copyable={copyable} />

          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="mr-6">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default CodeBlock;
