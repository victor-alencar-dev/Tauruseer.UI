import { useEffect, useState } from 'react';
import { Cognitions } from '../model/cognition.model';
import { CognitionsCardsDescription } from './cognitions-description-card';
import { CognitionPagerList } from './cognitions-pager-list';

interface IProps {
  descriptionList: Array<Cognitions>;
  resetPaging: boolean;
}

export const CognitionsListDescription = ({ descriptionList, resetPaging }: IProps) => {
  const [take, setTake] = useState<number>(7);
  const [skip, setsKip] = useState<number>(0);
  useEffect(() => {
    if (resetPaging) {
      setTake(7);
      setsKip(0);
    }
  }, [resetPaging]);
  const onPageChange = (event: any) => {
    setTake(event.take);
    setsKip(event.skip);
  };
  return (
    <div style={{ height: '1050px', position: 'relative' }}>
      <div>
        {descriptionList.slice(skip, take + skip).map((data: Cognitions) => (
          <CognitionsCardsDescription description={data} />
        ))}
      </div>
      <CognitionPagerList
        total={descriptionList.length}
        take={take}
        skip={skip}
        onPageChange={onPageChange}
      />
    </div>
  );
};
