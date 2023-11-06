import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyTextToClipboard } from './copy-text-to-clipboard.component';
interface IMarkdownProps {
  markdown: string;
  language?: string;
}

export const Markdown: React.FC<IMarkdownProps> = ({ markdown, language }) => {
  return (
    <ReactMarkdown
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="position-relative">
              <SyntaxHighlighter
                style={obsidian as any}
                language={match[1]}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
              <CopyTextToClipboard
                copyText={String(children).replace(/\n$/, '')}
                alertMessage={'Copied to clipboard'}
                style={{ position: 'absolute', top: '4px', right: '4px' }}
              >
                <span
                  title="Copy to clipboard"
                  className="text-sm font-bolder mt-2"
                  style={{ fontSize: 14 }}
                >
                  <i
                    className="fa-regular fa-copy me-1 text-secondary"
                    style={{ color: '#4231B4' }}
                  />
                </span>
              </CopyTextToClipboard>
            </div>
          ) : !inline && language ? (
            <div className="position-relative">
              <SyntaxHighlighter
                style={obsidian as any}
                language={language}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
              <CopyTextToClipboard
                copyText={String(children).replace(/\n$/, '')}
                alertMessage={'Copied to clipboard'}
                style={{ position: 'absolute', top: '4px', right: '4px' }}
              >
                <span
                  title="Copy to clipboard"
                  className="text-sm font-bolder mt-2"
                  style={{ fontSize: 14 }}
                >
                  <i
                    className="fa-regular fa-copy me-1 text-secondary"
                    style={{ color: '#4231B4' }}
                  />
                </span>
              </CopyTextToClipboard>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      children={markdown}
    />
  );
};
