import * as React from "react";
import { Table as InnovaccerTable } from "@innovaccer/design-system";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

type TableProps = InnovaccerTable["props"];
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface IProps extends Partial<Writeable<TableProps>> {
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
        data: [
          {
            name: "Yash Pahalajani",
            gender: "Male",
          },
          {
            name: "Dhiraj Pahalajani",
            gender: "Male",
          },
          {
            name: "Aayushi Pahalajani",
            gender: "Female",
          },
        ],
        schema: [
          {
            cellType: "AVATAR_WITH_TEXT",
            displayName: "Name",
            filters: [],
            name: "name",
            width: 300,
          },
          {
            displayName: "Gender",
            name: "gender",
            width: 350,
          },
        ],
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
        displayName: "Gender",
        name: "gender",
        width: 350,
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
