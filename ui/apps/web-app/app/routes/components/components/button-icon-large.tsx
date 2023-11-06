import { ButtonIconLarge, ExternalService } from '@tauruseer/core';
import { Card } from 'react-bootstrap';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

export default function ButtonIconLargePage() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        <h1>Button Icon Large</h1>
        <hr />
        <Card className="p-4">
          <ButtonIconLarge
            icon={ExternalService.GitHub}
            label="label"
            modifier={{ icon: 'circle-exclamation', color: '#F00' }}
            url="/components"
          />
        </Card>
      </div>
    );
  } else {
    return null;
  }
}
