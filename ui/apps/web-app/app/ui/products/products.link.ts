import chips from '../../styles/core/chip.css';
import ConfigureProduct from '../../styles/modules/products/configure-product.css';
import RepositoriesTable from '../../styles/modules/products/repositories-table.css';
import ListTables from '../../styles/modules/products/list-tables.css';
import SecurityControls from '../../styles/modules/products/security-controls.css';
import ProductDetail from '../../styles/modules/products/detail.css';
import ProductList from '../../styles/modules/products/grid.css';
import HeaderDetail from '../../styles/modules/products/header.css';
import SBOMDetail from '../../styles/modules/products/sbom.css';
export const LinkProductList = [{ rel: 'stylesheet', href: ProductList }];
export const LinkProductDetail = [
  { rel: 'stylesheet', href: ProductDetail },
  { rel: 'stylesheet', href: HeaderDetail },
  { rel: 'stylesheet', href: RepositoriesTable },
  { rel: 'stylesheet', href: SecurityControls },
];

export const LinkConfigureProduct = [
  { rel: 'stylesheet', href: ProductDetail },
  { rel: 'stylesheet', href: ConfigureProduct },
];

export const LinkCommonProductStyles = [
  { rel: 'stylesheet', href: ProductDetail },
  { rel: 'stylesheet', href: ConfigureProduct },
  { rel: 'stylesheet', href: HeaderDetail },
  { rel: 'stylesheet', href: ListTables },
];
export const LinkSBOMProduct = [
  { rel: 'stylesheet', href: ProductList },
  { rel: 'stylesheet', href: SBOMDetail },
  { rel: 'stylesheet', href: chips },
];
export const MetaProductList = { title: 'Products' };
