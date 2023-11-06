import { ItemProps, MultiSelectTreeTagProps } from '@progress/kendo-react-dropdowns';
import { Avatar } from '@progress/kendo-react-layout';

export const AvatarCustomItem = (props: ItemProps) => {
  const { item } = props;
  const avatar = item.imgUrl || item.gravatarUrl;
  const backgroundColor = props.item.checkField ? '#DEDAF5' : 'transparent';
  return (
    <div
      className="d-flex justify-content-between align-items-center p-1"
      style={{
        width: '526px',
        backgroundColor: backgroundColor,
        borderRadius: '5px',
      }}
    >
      <span className="d-flex  ms-2 w-100 align-items-center">
        <Avatar type={avatar ? 'image' : 'icon'} size="small">
          {avatar ? (
            <img src={avatar} alt="team-member-avatar" />
          ) : (
            <span className="k-icon k-i-user p-0 m-0" />
          )}
        </Avatar>
        <div className="ms-3">
          <label className="ff-montserrat font-regular text-md"> {props.item.text}</label>
        </div>
      </span>
      {props.item.checkField && (
        <span className="me-2">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </div>
  );
};

export const CustomItem = (props: ItemProps) => {
  const { item } = props;
  const backgroundColor = props.item.checkField ? '#DEDAF5' : 'transparent';
  return (
    <div
      className="d-flex justify-content-between align-items-center p-1"
      style={{
        width: '526px',
        backgroundColor: backgroundColor,
        borderRadius: '5px',
      }}
    >
      <span className="d-flex  ms-2 w-100 align-items-center">
        <div className="ms-3">
          <label className="ff-montserrat font-regular text-md"> {item.text}</label>
        </div>
      </span>
      {item.checkField && (
        <span className="me-2">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </div>
  );
};

export const ProductCustomItem = (props: ItemProps) => {
  const backgroundColor = props.item.checkField ? '#DEDAF5' : 'transparent';
  return (
    <div
      className="d-flex justify-content-between align-items-center p-1"
      style={{
        width: '526px',
        backgroundColor: backgroundColor,
        borderRadius: '5px',
      }}
    >
      <span className="d-flex  ms-2 w-100 align-items-center">
        <div className="ms-3">
          <label className="ff-montserrat font-regular text-md"> {props.item.name}</label>
        </div>
      </span>
      {props.item.checkField && (
        <span className="me-2">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </div>
  );
};
const tagClassName =
  'k-button k-button-md k-rounded-md k-button-solid ts-multiselect-option-selected';
const focusedTagClassName = tagClassName + ' k-focus';
const preventDefault = (event: { preventDefault: () => any }) => event.preventDefault();
const stopPropagation = (event: { stopPropagation: () => any }) => event.stopPropagation();

export const Tag = (props: MultiSelectTreeTagProps) => {
  const { tagData, guid, focusedTag, onTagDelete } = props;
  return (
    <li
      className={tagData === focusedTag ? focusedTagClassName : tagClassName}
      id={`tag-${guid}-${tagData.text.replace(/\s+/g, '-')}`}
      onMouseDown={preventDefault}
      onClick={stopPropagation}
      aria-selected={true}
      role="option"
    >
      <span>{tagData.text}</span>
      <span
        aria-label="delete"
        className="k-select"
        onClick={(e) => onTagDelete.call(undefined, tagData.data, e)}
      >
        <span className="k-icon k-i-close" />
      </span>
    </li>
  );
};
