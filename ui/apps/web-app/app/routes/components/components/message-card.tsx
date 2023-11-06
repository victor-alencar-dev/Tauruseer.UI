import { MessageCard } from '@tauruseer/core';
import { LinkAssetDList } from '@tauruseer/ui';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

export default function MessageCardPage() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        <h1>Message Card</h1>
        <hr />
        <MessageCard
          title={'This is the card title'}
          icon="fa-message-exclamation"
          message="this is the body of the message"
          button={{
            label: 'Refresh this page',
            onClick: () => {
              alert('clicked');
            },
            icon: 'fa-rotate-right',
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}

export const links = () => LinkAssetDList;
