import { ExternalService, SmallCard } from '@tauruseer/core';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

export default function () {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        <h1>Small Card</h1>
        <hr />
        <SmallCard icon={ExternalService.GitHub} copy={'Github Repository'} url={'/components/'} />
      </div>
    );
  } else {
    return null;
  }
}
