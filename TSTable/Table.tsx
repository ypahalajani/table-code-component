import * as React from "react";
import { Table as InnovaccerTable } from "@innovaccer/design-system";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

type TableProps = InnovaccerTable["props"];

export interface IProps extends Partial<TableProps> {
  id: string;
  context: ComponentFramework.Context<IInputs>;
}

class Table extends React.PureComponent<IProps> {
  private filterList = {
    name: ["h-r", "s-z"],
  };

  private headerOptions = {
    withSearch: true,
  };

  static defaultProps: TableProps = {
    data: [],
    fetchData: () =>
      Promise.resolve({
        count: 0,
        data: [],
        schema: [],
      }),
    schema: [
      {
        cellType: "AVATAR_WITH_TEXT",
        displayName: "Name",
        filters: [],
        name: "name",
        width: 300,
      },
      {
        cellType: "WITH_META_LIST",
        displayName: "Email",
        name: "email",
        width: 350,
      },
      {
        cellType: "STATUS_HINT",
        displayName: "Gender",
        name: "gender",
        width: 200,
      },
      { cellType: "ICON", displayName: "Icon", name: "icon", width: 100 },
      {
        displayName: "Custom Cell",
        name: "customCell",
        separator: true,
        width: 200,
      },
    ],
  };

  public render() {
    const { id, context, data, fetchData, schema, ...restProps } = this.props;
    return (
      <>
        <InnovaccerTable
          data={data!}
          fetchData={fetchData!}
          schema={schema!}
          draggable
          filterList={this.filterList}
          headerOptions={this.headerOptions}
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
      </>
    );
  }
}

export default Table;
