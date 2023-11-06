import { LoaderFunction } from '@remix-run/node';
import { getSuggestions, tokenInterceptor } from '@tauruseer/api';
import { checkAuth } from '../auth/auth.service.server';
export const loader: LoaderFunction = async ({ request }) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const url = new URL(request.url);
  const query = url.searchParams.get('query') ?? '';
  const { data } = await getSuggestions(query);
  if (data) {
    const result = data.map((r: { document: any }) => r.document);
    return result;
  }

  return [];
};
