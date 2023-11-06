import { AutoComplete, AutoCompleteChangeEvent } from '@progress/kendo-react-dropdowns';
import { FaIcon, Header } from '@tauruseer/core';
import { cloneElement, useState } from 'react';
import { CognitionsListDescription } from '../components/congnitions-description-list';
import { Cognitions } from '../model/cognition.model';

interface IProps {
  cognitionsList: Array<Cognitions>;
}

export const ManageCognitions = ({ cognitionsList }: IProps) => {
  const [cognitionsDisplayList, setCognitionsDisplayList] =
    useState<Array<Cognitions>>(cognitionsList);
  const [resetPaging, setResetPaging] = useState<boolean>(false);

  const onChange = (event: AutoCompleteChangeEvent) => {
    if (event.value.length === 0) {
      setResetPaging(false);
      setCognitionsDisplayList(cognitionsList);
    }
    // enter selection
    if (event.nativeEvent.type === 'keydown') {
      setResetPaging(true);
      setCognitionsDisplayList(cognitionsList.filter((c) => c.title === event.value));
    }
  };

  // custom display and click selection
  const CustomAutoCompleteSearchList = (el: React.ReactElement<any>, values: any) => {
    const { dataItem } = values;
    return cloneElement(el, el.props, <CustomSearchItem title={dataItem.title} />);
  };

  const CustomSearchItem = ({ title }: any) => {
    const onClickEvent = () => {
      setResetPaging(true);
      setCognitionsDisplayList(cognitionsList.filter((c) => c.title === title));
    };
    return (
      <span className="d-flex ms-2 w-100 align-items-center">
        <div className="p-2" onClick={onClickEvent}>
          <label className="ff-ubuntu text-md font-medium"> {title}</label>
        </div>
      </span>
    );
  };
  const FilterOptions = (
    <div className="grid-container__filter" style={{ width: '500px' }}>
      <FaIcon icon="search" size={16} classes="grid-container__filter-icon" />
      <AutoComplete
        data={cognitionsList}
        itemRender={CustomAutoCompleteSearchList}
        className="grid-container__filter-input"
        textField="title"
        placeholder="Find a cognition"
        clearButton
        onChange={onChange}
      />
    </div>
  );
  return (
    <>
      <Header title="Cognitions" buttons={[]} filterOption={FilterOptions} />
      <CognitionsListDescription
        descriptionList={cognitionsDisplayList}
        resetPaging={resetPaging}
      />
    </>
  );
};
