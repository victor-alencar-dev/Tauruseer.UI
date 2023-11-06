import { Chip } from '@tauruseer/core';
import { LinkChipComponent } from '@tauruseer/ui';

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
        <h1>Chip</h1>
        <hr />
        <h2>Type status</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="New" type="status" modifier="secondary" />
          <p>{`<Chip copy="New" type="status" modifier="secondary" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="In Progress" type="status" modifier="primary" />
          <p>{`<Chip copy="In Progress" type="status" modifier="primary" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Risk Accepted" type="status" modifier="error" />
          <p>{`<Chip copy="Risk Accepted" type="status" modifier="error" />`}</p>
        </div>
        <h2>Type badge</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Blocker" icon="circle-exclamation" type="badge" modifier="danger" />
          <p>{`<Chip copy="Blocker" icon="circle-exclamation" type="badge" modifier="danger" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Warning" icon="warning" type="badge" modifier="warning" />
          <p>{`<Chip copy="Warning" icon="warning" type="badge" modifier="warning" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Info" type="badge" modifier="info" />
          <p>{`<Chip copy="Info"  type="badge" modifier="info" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Resolve as false positive" type="badge" />
          <p>{`<Chip copy="Resolve as false positive" type="badge" />`}</p>
        </div>
        <h2>Type breadcrumb</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Darrell Steward" icon="user" type="breadcrumb" />
          <p>{`<Chip icon="user" copy="Darrell Steward" type="breadcrumb" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip
            copy="Ticket #18887"
            icon="VisualStudioOnline"
            iconRight="chevron-right"
            type="breadcrumb"
            url="www.google.com"
          />
          <p>{`<Chip
            copy="Ticket #18887"
            icon="VisualStudioOnline"
            iconRight="chevron-right"
            type="breadcrumb"
            url="www.google.com"
          />`}</p>
        </div>
        <h2>Type severity</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Critical" type="severity" modifier="critical" />
          <p>{`<Chip copy="Critical" type="severity" modifier="critical" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="High" type="severity" modifier="high" />
          <p>{`<Chip copy="High" type="severity" modifier="high" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Medium" type="severity" modifier="medium" />
          <p>{`<Chip copy="Medium" type="severity" modifier="medium" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Low" type="severity" modifier="low" />
          <p>{`<Chip copy="Low" type="severity" modifier="low" />`}</p>
        </div>
        <h2>Type general</h2>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Primary" type="general" modifier="primary" />
          <p>{`<Chip copy="Primary" type="general" modifier="primary" />`}</p>
        </div>
        <div className="d-flex gap-4 justify-content-start align-items-center mb-3">
          <Chip copy="Secondary" type="general" modifier="secondary" />
          <p>{`<Chip copy="Secondary" type="general" modifier="secondary" />`}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export const links = () => [LinkChipComponent];
