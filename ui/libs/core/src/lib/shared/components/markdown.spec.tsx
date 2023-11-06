import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Markdown } from './markdown.component';

const markdownContent = `
# Example Markdown Content

\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

Some regular text here.

\`\`\`bash
npm install -g @tauruseer/cli
\`\`\`
`;

describe('Markdown', () => {
  test('should render with empty props', () => {
    const { container } = render(<Markdown markdown={''} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render with props', () => {
    const { container } = render(<Markdown markdown={markdownContent} />);
    // we expect the container to have a heading with text Example Markdown Content
    expect(screen.getByRole('heading')).toHaveTextContent('Example Markdown Content');
    // we expect the container to have a pre tag with text npm install -g @tauruseer/cli
    expect(container.querySelectorAll('pre')).toHaveLength(2);
    expect(container.querySelectorAll('pre')[1]).toHaveTextContent('npm install -g @tauruseer/cli');
  });
});
