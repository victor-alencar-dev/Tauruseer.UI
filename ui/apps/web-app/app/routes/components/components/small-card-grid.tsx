import { ExternalService, SmallCard, SmallCardGrid } from '@tauruseer/core';

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
        <h1>Small Card Grid</h1>
        <hr />
        <SmallCardGrid
          placeholder="All Sources"
          data={[
            {
              icon: ExternalService.GitHub,
              copy: 'Github Repository',
              url: '/components/',
              status: 'active',
              categories: ['A', 'B'],
              enabled: true,
              id: '3',
            },
            {
              icon: ExternalService.JIRA,
              enabled: false,
              id: '2',
              copy: 'Jira',
              url: '/components/',
              status: 'inactive',
              categories: ['B'],
            },
            {
              icon: ExternalService.DocioScanner,
              enabled: true,
              id: '1',
              copy: 'Start Left Scanner',
              url: '/components/',
              status: 'error',
              categories: ['C'],
            },
          ]}
        />
        <hr />
        <SmallCardGrid
          placeholder="All Sources"
          data={[
            {
              id: '1',
              enabled: true,
              icon: ExternalService.GitHub,
              copy: 'Github Repository',
              url: '/components/',
              status: 'active',
              categories: ['All'],
            },
            {
              id: '2',
              enabled: true,
              icon: ExternalService.JIRA,
              copy: 'Jira',
              url: '/components/',
              status: 'inactive',
              categories: ['All'],
            },
            {
              id: '3',
              enabled: true,
              icon: ExternalService.DocioScanner,
              copy: 'Start Left Scanner',
              url: '/components/',
              status: 'error',
              categories: ['All'],
            },
          ]}
        />
        <hr />
        <SmallCardGrid
          placeholder="All Sources"
          data={[
            {
              icon: ExternalService.GitHub,
              id: '1',
              enabled: true,
              copy: 'Github Repository',
              url: '/components/',
              status: 'active',
              categories: ['All'],
            },
            {
              icon: ExternalService.JIRA,
              copy: 'Jira',
              url: '/components/',
              status: 'inactive',
              categories: ['All'],
              id: '2',
              enabled: true,
            },
            // @ts-ignore-next-line
            {
              icon: ExternalService.DocioScanner,
              copy: 'Start Left Scanner',
              url: '/components/',
              status: 'error',
              // categories: ['All'], // this is commented out on purpose
            },
          ]}
        />
      </div>
    );
  } else {
    return null;
  }
}
