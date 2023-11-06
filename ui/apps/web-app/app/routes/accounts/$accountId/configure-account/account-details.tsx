import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Error } from '@tauruseer/core';
import { ConfigureAccountForm } from '@tauruseer/module';

export const loader: LoaderFunction = async() => {
  return {};
};

export default function AccountsDetail() {
  const data = useLoaderData();
  return <ConfigureAccountForm account={data} showMessage={false} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}