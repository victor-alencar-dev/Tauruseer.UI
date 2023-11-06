import { ActionArgs, ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  createProduct,
  getAssetDetail,
  getScanDetail,
  mapProduct,
  setAcceptRisk,
  setInvestigateAsset,
  setManualScan,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import {
  ASSET_DISCOVERY_ACTION,
  ASSET_DISCOVERY_ACTION_MSG,
  AssetDiscoveryDetails,
} from '@tauruseer/module';
import { LinkAssetDetail } from '@tauruseer/ui';
import { checkAuth } from '../../../auth/auth.service.server';
export const links = () => LinkAssetDetail;
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { payload: payloadFormEntry } = Object.fromEntries(params);
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (payloadFormEntry) {
    const payload = JSON.parse(payloadFormEntry.toString());
    switch (payload.action) {
      case ASSET_DISCOVERY_ACTION.CREATE_PRODUCT: {
        const payloadProduct = {
          name: payload.name,
          description: payload.description,
          assetId: payload.assetId,
        };
        const response = await createProduct(payloadProduct).catch((error) => {
          const { data, status } = error.response;
          return { data, status };
        });
        if (response.status === 400) {
          return {
            error: true,
            message: response.data || ASSET_DISCOVERY_ACTION_MSG.ACTION_ERROR,
          };
        }

        return {
          successCreated: true,
          message: `${ASSET_DISCOVERY_ACTION_MSG.MAP_PRODUCT_SUCCESS} ${payload.name} product.`,
          data: { productId: response.productId },
        };
      }
      case ASSET_DISCOVERY_ACTION.MAP_PRODUCT: {
        const payloadMap = {
          assetId: payload.assetId,
          productId: payload.id,
        };
        const response = await mapProduct(payloadMap).catch((error) => {
          const { data, status } = error.response;
          return { data, status };
        });
        if (response.status === 400) {
          return {
            error: true,
            message: response.data || ASSET_DISCOVERY_ACTION_MSG.ACTION_ERROR,
          };
        }
        return {
          successMapped: true,
          message: `${ASSET_DISCOVERY_ACTION_MSG.MAP_PRODUCT_SUCCESS} ${payload.name} product.`,
          data: { productId: payload.id },
        };
      }
      case ASSET_DISCOVERY_ACTION.ACCEPT_RISK: {
        const response = await setAcceptRisk(payload.assetId).catch((error) => {
          const { data, status } = error.response;
          return { data, status };
        });
        if (response.status === 400) {
          return {
            error: true,
            message: response.data || ASSET_DISCOVERY_ACTION_MSG.ACTION_ERROR,
          };
        }
        return {
          success: true,
          message: ASSET_DISCOVERY_ACTION_MSG.ACCEPT_RISK_SUCCESS,
        };
      }
      case ASSET_DISCOVERY_ACTION.INVESTIGATE_ASSET: {
        const response = await setInvestigateAsset(payload.assetId).catch((error) => {
          const { data, status } = error.response;
          return { data, status };
        });
        if (response.status === 400) {
          return {
            error: true,
            message: response.data || ASSET_DISCOVERY_ACTION_MSG.ACTION_ERROR,
          };
        }
        return {
          success: true,
          message: ASSET_DISCOVERY_ACTION_MSG.INVESTIGATE_ASSET_SUCCESS,
        };
      }
      case ASSET_DISCOVERY_ACTION.SET_MANUAL_SCAN: {
        const response = await setManualScan(payload.assetId);
        return {
          success: true,
          message: response.data,
        };
      }
      default:
        return { error: true, message: 'Something went wrong' };
    }
  }
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { detailId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const response = await getAssetDetail(`${detailId}`);
  const scan = await getScanDetail(`${detailId}`);
  return { asset: response?.data, scanDetails: scan?.data };
};
export default function AssetDiscoveryDetail() {
  const { asset, scanDetails } = useLoaderData();
  return <AssetDiscoveryDetails data={asset} scanDetails={scanDetails} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
