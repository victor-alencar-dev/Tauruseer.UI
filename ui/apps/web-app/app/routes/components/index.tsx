import { Link } from '@remix-run/react';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

export default function Markdown() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        Components:
        <ul>
          <li>
            <Link to="/components/components/button-icon-large">Button Icon</Link>
          </li>
          <li>
            <Link to="/components/components/chip">Chip</Link>
          </li>
          <li>
            <Link to="/components/components/icon">Icon</Link>
          </li>
          <li>
            <Link to="/components/components/info-card">Info Card</Link>
          </li>
          <li>
            <Link to="/components/components/markdown">Markdown</Link>
          </li>
          <li>
            <Link to="/components/components/message-card">Message Card</Link>
          </li>
          <li>
            <Link to="/components/components/small-card">Small Card</Link>
          </li>
          <li>
            <Link to="/components/components/small-card-grid">Small Card Grid</Link>
          </li>
        </ul>
        Modules:
        <ul>
          <li>
            <Link to="/components/modules/ai-vulnerability-remediation">
              AI Vulnerability Remediation
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
