import * as React from "react";
import { Table as InnovaccerTable } from "@innovaccer/design-system";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

type TableProps = InnovaccerTable["props"];
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface IProps extends Writeable<TableProps> {
  id: string;
  context: ComponentFramework.Context<IInputs>;
}

const Table: React.FC<IProps> = (props) => {
  const filterList = {
    name: ["h-r", "s-z"],
  };

  const headerOptions = {
    withSearch: true,
  };

  const { id, context, ...restProps } = props;

  return (
    <React.Fragment>
      <InnovaccerTable
        key={`id=${new Date().valueOf()}`}
        draggable
        filterList={filterList}
        headerOptions={headerOptions}
        onPageChange={function () {}}
        onRowClick={function (_) {}}
        onSelect={function (_) {}}
        pageSize={12}
        paginationType="jump"
        showHead
        showMenu
        size="comfortable"
        sortingList={[{ name: "name", type: "desc" }]}
        type="resource"
        withCheckbox
        withHeader
        withPagination
        {...restProps}
      />
    </React.Fragment>
  );
};

export default Table;
