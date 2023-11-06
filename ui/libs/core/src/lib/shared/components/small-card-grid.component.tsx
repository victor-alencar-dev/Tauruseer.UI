import React from 'react';
import { SmallCard, TSmallCardProps } from './small-card.component';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export type TSmallCardGridData = TSmallCardProps & { categories: string[]; id: string };

export type TSmallCardGridProps = {
  data: TSmallCardGridData[];
  hideFilterDropdown?: boolean;
  placeholder?: string;
  dropDownCaption?: string;
};

export const SmallCardGrid: React.FC<TSmallCardGridProps> = ({
  data,
  dropDownCaption = '',
  placeholder = '',
  hideFilterDropdown = false,
}) => {
  //gets unique values from data
  const hasCategories = data.every((item: any) => item?.categories?.length > 0);
  const getUniqueValues = (data: TSmallCardProps[]) => {
    const uniqueValues = data.map((item: any) => item?.categories).flat();
    return [placeholder, ...new Set(uniqueValues)];
  };

  const [filter, setFilter] = React.useState<string>(placeholder);

  const filteredData = React.useMemo(() => {
    return filter !== placeholder
      ? data.filter((item: TSmallCardGridData) =>
          item?.categories.some((category) => category === filter),
        )
      : data.filter((item: TSmallCardGridData) => item?.categories);
  }, [data, filter]);

  return (
    <article className="small-card-grid">
      <p className="small-card-grid__copy">{dropDownCaption}</p>
      {hasCategories && !hideFilterDropdown && (
        <DropDownList
          className="small-card-grid__filter"
          style={{ width: '300px' }}
          data={getUniqueValues(data)}
          defaultValue={placeholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      )}
      <section className="small-card-grid__grid">
        {filteredData.map((item, index) => (
          <SmallCard {...item} key={index} />
        ))}
      </section>
    </article>
  );
};
