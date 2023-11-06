import { Slide } from '@progress/kendo-react-animation';
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import classNames from 'classnames';
import React from 'react';

interface IProps {
  dataInfo: Array<string> | [];
  limit: number;
}

export const CollapsibleCollection = ({ dataInfo, limit }: IProps) => {
  const [toggle, setToggle] = React.useState<boolean>(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const iconClsName = classNames('fa-solid', {
    'fa-chevron-down': !toggle,
    'fa-chevron-up': toggle,
  });

  const activeItems = dataInfo.slice(0, limit);
  const hiddenItems = dataInfo.slice(limit);

  return (
    <div className="d-flex flex-column mt-1">
      <div className="d-flex">
        {activeItems.map((d: string, i) => {
          if (limit === i + 1 && dataInfo.length - limit > 0) {
            return (
              <React.Fragment key={i}>
                <span className="chip chip-secondary chip-small me-2" key={i + 'a'}>
                  {d}
                </span>
                <BadgeContainer key={i + 'b'}>
                  <span
                    className="chip chip-secondary chip-small"
                    style={{ cursor: 'pointer' }}
                    onClick={onToggle}
                  >
                    <i className={iconClsName}></i>
                  </span>
                  {!toggle && <Badge rounded="full">{dataInfo.length - limit}</Badge>}
                </BadgeContainer>
              </React.Fragment>
            );
          }
          return (
            <span className="chip chip-secondary me-2 chip-small" key={i + 'C'}>
              {d}
            </span>
          );
        })}
      </div>

      <Slide>
        {toggle && (
          <div className="d-flex mt-1">
            {hiddenItems.map((d: string, i) => {
              return (
                <span className="chip chip-secondary chip-small me-2" key={d + i}>
                  {d}
                </span>
              );
            })}
          </div>
        )}
      </Slide>
    </div>
  );
};
