import { Icon, FaIcon, externalServiceFromInt } from '@tauruseer/core';
import { ExternalService } from '@tauruseer/core';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

export default function ChipPage() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        <h1>Icon </h1>
        <hr />
        <h2>Icon (Kendo)</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Icon icon="arrow-left" size={32} />
          <pre>
            <code>{`<Icon icon="arrow-left" size={32} />`}</code>
          </pre>
        </div>
        <h2>FaIcon (FontAwesome)</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <FaIcon icon="play" size={16} />
          <pre>
            <code>{`<FaIcon icon="play" size={16} />`}</code>
          </pre>
          <FaIcon icon={ExternalService.JIRA} size={16} />
          <pre>
            <code>{`<FaIcon icon={ExternalService.JIRA} size={16} />`}</code>
          </pre>
          <FaIcon icon={ExternalService.Sonar} size={32} style={{ color: '#F00' }} />
          <pre>
            <code>{`<FaIcon icon={ExternalService.Sonar} size={32} style={{ color: '#F00' }} />`}</code>
          </pre>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
