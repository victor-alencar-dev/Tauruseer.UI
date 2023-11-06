import { Breadcrumb, BreadcrumbLinkMouseEvent } from '@progress/kendo-react-layout';
import { useNavigate } from '@remix-run/react';

export interface IBreadcrumb {
  id: string;
  text?: string;
  to: string;
  disabled?: boolean;
}

export interface IBreadcrumbs {
  data: IBreadcrumb[];
  className?: string;
}

const PipeDelimiter = () => <span>|</span>;

export const Breadcrumbs = ({ data, className = 'my-2' }: IBreadcrumbs) => {
  const navigate = useNavigate();

  const handleNavigate = (event: BreadcrumbLinkMouseEvent) => {
    const link = data.find((element) => element.id === event.id);

    if (link) navigate(link.to);
  };

  return (
    <div className={className}>
      <Breadcrumb
        breadcrumbDelimiter={PipeDelimiter}
        data={data}
        onItemSelect={handleNavigate}
        style={{
          textDecoration: 'none',
        }}
      />
    </div>
  );
};
