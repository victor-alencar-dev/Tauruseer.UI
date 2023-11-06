import { ActionArgs, ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getProductsDetail,
  getTeamMembersByProduct,
  setConfigureProduct,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { ConfigureProductForm } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';
import { getSession } from 'apps/web-app/app/auth/session.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { product: productFormEntry } = Object.fromEntries(params);
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  const {
    extraParams: { userInfo },
  } = user;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (productFormEntry) {
    const productData = JSON.parse(productFormEntry.toString());
    const payload = {
      ...productData,
      accountId: userInfo.accountId,
    };
    const data = await setConfigureProduct(JSON.stringify(payload)).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
    if (data.status === 400) {
      return { error: data.data };
    }
    if (!payload.id) {
      return {
        successCreated: true,
        message: 'Product created successfully',
        data: { productId: data.productId },
      };
    } else {
      return {
        successUpdate: true,
        message: 'Product updated successfully',
        data: { productId: data.productId },
      };
    }
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (isNaN(parseInt(`${productId}`))) {
    return { product: { name: '' }, teamList: [] };
  } else {
    const { data } = await getProductsDetail(`${productId}`);
    const teams = await getTeamMembersByProduct(`${productId}`);
    return { product: data, teamList: teams };
  }
};

export default function ProductsDetail() {
  const { product, teamList } = useLoaderData();
  return (
    <ConfigureProductForm isNew={Boolean(product.name)} product={product} teamList={teamList} />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
