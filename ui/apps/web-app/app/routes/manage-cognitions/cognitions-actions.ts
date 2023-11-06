import { ActionArgs, LoaderFunction } from '@remix-run/node';
import { setCognitionsPreference, tokenInterceptor } from '@tauruseer/api';
import { checkAuth } from '../../auth/auth.service.server';

export const loader: LoaderFunction = async ({ request }: ActionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const isActive = url.searchParams.get('isActive');
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (id) {
    await setCognitionsPreference(id, isActive);
    const msgState = isActive === 'true' ? 'Active' : 'Inactive';
    return { msg: `Congnitions set as ${msgState}`, success: true };
  } else {
    return { msg: 'something went wrong', success: false };
  }
};
