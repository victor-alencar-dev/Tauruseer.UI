import { LoaderArgs, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  throw new Response('Not Found', { status: 404 });
};

export default function CatchBoundary() {}
