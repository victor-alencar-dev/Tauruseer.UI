import { AutoComplete } from "@progress/kendo-react-dropdowns";

export function PolicyRulesGridHeader() {
  return (
    <div className="d-flex justify-content-between p-4">
      <div className="d-flex">
        <div>
          <label className="d-block typography-h1">Rules</label>
          <label className="d-block typography-h2 text-muted">5 rules</label>
        </div>
      </div>
      <label className="text-end me-2 typography-h1 text-muted configure-product-text">
        <AutoComplete data={[]} placeholder="Filter Rules" />
      </label>
    </div>
  );
}