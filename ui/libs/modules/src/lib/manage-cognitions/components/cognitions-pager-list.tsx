// TODO: find a way to reuse the grid pager, since the code is the same
import classNames from 'classnames';

enum ActionPager {
  First = 'first',
  Back = 'back',
  Next = 'next',
  Last = 'last',
}
interface IPagerProps {
  total: number;
  take: number;
  skip: number;
  onPageChange?: (event: any) => void;
}
export const CognitionPagerList = (props: IPagerProps) => {
  let page: number;
  let currentPage = 0;
  const { total, take, skip } = props;
  const totalPages = Math.ceil((total || 0) / take);
  if (totalPages > 0) {
    currentPage = Math.floor(skip / take) + 1;
  }
  const handlePageSizeChange = (e: any) => {
    if (e.target.id === ActionPager.First) {
      page = 0;
    }
    if (e.target.id === ActionPager.Back) {
      page = skip - take;
    }
    if (e.target.id === ActionPager.Next) {
      page = currentPage * take;
    }
    if (e.target.id === ActionPager.Last) {
      page = (totalPages - 1) * take;
    }
    if (props.onPageChange) {
      props.onPageChange({
        skip: page,
        take: take,
      });
    }
  };
  const backwardsAction = currentPage > 1 && totalPages > 0 ? handlePageSizeChange : () => {};
  const forwardAction =
    currentPage !== totalPages && totalPages > 0 ? handlePageSizeChange : () => {};
  const handleActionStyles = (actionType: ActionPager) => {
    const baseClass = 'k-icon';
    switch (actionType) {
      case ActionPager.First:
        return classNames(`${baseClass} k-i-arrow-end-left`, {
          'action-pager': currentPage > 1,
          'action-pager-disabled': currentPage === 1 || totalPages === 0,
        });
      case ActionPager.Back:
        return classNames(`${baseClass} k-i-arrow-chevron-left ms-3`, {
          'action-pager': currentPage > 1,
          'action-pager-disabled': currentPage === 1 || totalPages === 0,
        });
      case ActionPager.Next:
        return classNames(`${baseClass} k-i-arrow-chevron-right me-3`, {
          'action-pager': currentPage !== totalPages,
          'action-pager-disabled': currentPage === totalPages || totalPages === 0,
        });
      case ActionPager.Last:
        return classNames(`${baseClass} k-i-arrow-end-right `, {
          'action-pager': currentPage !== totalPages,
          'action-pager-disabled': currentPage === totalPages || totalPages === 0,
        });
    }
  };
  return (
    <div className="cognition-pager">
      <div className="row justify-content-between page-grid">
        <div className="col-4 d-flex align-items-center">
          {total > take
            ? `Items ${take * (currentPage - 1) + 1} - ${
                take * currentPage > total ? total : take * currentPage
              } of ${total}`
            : `Items ${currentPage} - ${total} of ${total}`}
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <span
            className={handleActionStyles(ActionPager.First)}
            id={ActionPager.First}
            onClick={backwardsAction}
          ></span>
          <span
            className={handleActionStyles(ActionPager.Back)}
            id={ActionPager.Back}
            onClick={backwardsAction}
          ></span>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <span
            className={handleActionStyles(ActionPager.Next)}
            id={ActionPager.Next}
            onClick={forwardAction}
          ></span>
          <span
            className={handleActionStyles(ActionPager.Last)}
            id={ActionPager.Last}
            onClick={forwardAction}
          ></span>
        </div>
      </div>
    </div>
  );
};
