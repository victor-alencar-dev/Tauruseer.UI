import { ActionArgs, ActionFunction, LoaderFunction } from '@remix-run/node';
import {
  getCognitionsDetail,
  getProductsDetail,
  setCognitionsDismiss,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { CognitionDetails, ICognitionDetails, IProducts } from '@tauruseer/module';
import { LinkCommonProductStyles } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../../../auth/auth.service.server';

export const links = () => LinkCommonProductStyles;
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { dismiss: dismissFormEntry } = Object.fromEntries(params);
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (dismissFormEntry) {
    let dismissPayload = JSON.parse(dismissFormEntry.toString());
    const { productId, insightId } = dismissPayload;
    delete dismissPayload.productId;
    delete dismissPayload.insightId;
    dismissPayload = {
      ...dismissPayload,
      reason: Number(dismissPayload.reason),
    };
    const response = await setCognitionsDismiss(productId, insightId, dismissPayload).catch(
      (error) => {
        const { data, status } = error.response;
        return { data, status };
      },
    );
    if (response.status === 400 || response.status === 404) {
      return { error: true, message: response.data };
    }
    return { successUpdated: true };
  }
  return { error: true, message: 'Something went wrong' };
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId, cognitionId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(`${productId}`);
  const cognitions: ICognitionDetails = await getCognitionsDetail(`${cognitionId}`, `${productId}`);
  return { product, cognitions };
};

export default function CognitionDetailsPage() {
  const { product, cognitions }: any = useLoaderData();
  return <CognitionDetails product={product as IProducts} cognition={cognitions} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
