import { Button } from '@progress/kendo-react-buttons';
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridNoRecords,
  GridPageChangeEvent,
} from '@progress/kendo-react-grid';
import { useNavigate } from '@remix-run/react';
import { PagerGrid } from '@tauruseer/core';
import useResponsive from 'libs/core/src/lib/shared/hooks/use-responsive-hook';
import { useState } from 'react';
import { AccountsGridModel, columnCustomCell } from './accounts-grid.model';

interface PageState {
  skip: number;
  take: number;
}
export function AccountsGrid({ data }: any) {
  const [page, setPage] = useState<PageState>({ skip: 0, take: 10 });
  const navigate = useNavigate();

  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  const isDownToFullHD = useResponsive('fullHD');

  const dataGridHeight = isDownToFullHD ? '65vh' : '60vh';

  const CommandCell = ({ dataItem }: any) => {
    return (
      <td className="k-command-cell">
        <Button
          fillMode="flat"
          onClick={() =>
            navigate(`/accounts/${dataItem.accountId}/configure-account/account-details`)
          }
        >
          <span className="k-icon k-i-edit"></span>
        </Button>
      </td>
    );
  };

  return (
    <div className="grid-container">
      <div className="d-flex justify-content-around p-3">
        <div className="w-50">
          <div className="d-flex">
            <div>
              <label className="d-block typography-h1">Accounts on the System</label>
              <label className="d-block typography-h2 text-muted">{data.length} Accounts</label>
            </div>
          </div>
        </div>
        <div className="align-right w-50">
          <Button
            size="large"
            themeColor={'dark'}
            fillMode="solid"
            rounded="medium"
            className="button button-primary ms-2"
            iconClass="fa-solid fa-plus"
            onClick={() => navigate('/accounts/new/configure-account/account-details')}
          >
            Add New Account
          </Button>
        </div>
      </div>

      <div className="data-grid data-grid-unshadow">
        <Grid
          data={data.slice(page.skip, page.take + page.skip)}
          pageable={true}
          pager={PagerGrid}
          skip={page.skip}
          take={page.take}
          total={data.length}
          onPageChange={pageChange}
          style={{
            maxHeight: dataGridHeight,
          }}
        >
          {AccountsGridModel.map((p: any, i: number) => {
            if (p.field === 'options') {
              return <GridColumn cell={CommandCell} title={p.title} />;
            }

            if (p.customCell) {
              const cell = (props: GridCellProps) => {
                return columnCustomCell(props, p.customCell);
              };
              return (
                <GridColumn width={p.width} field={p.field} title={p.title} key={i} cell={cell} />
              );
            }

            return <GridColumn field={p.field} key={i} title={p.title} />;
          })}
          <GridNoRecords>
            <div className="data-empty-grid">
              <span className="k-icon k-i-grid-layout"></span>
              <div className="data-empty-message">No Accounts Created yet</div>
            </div>
          </GridNoRecords>
        </Grid>
      </div>
    </div>
  );
}
