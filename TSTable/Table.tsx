import * as React from "react";
import { Table as InnovaccerTable } from "@innovaccer/design-system";

type TableProps = InnovaccerTable["props"];

class Table extends React.PureComponent {
  private fetchData = () =>
    Promise.resolve({
      count: 0,
      data: [],
      schema: [],
    });
  public render() {
    const loaderSchema: TableProps["schema"] = [
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
    ];
    const filterList = {
      name: ["h-r", "s-z"],
    };
    const headerOptions = {
      withSearch: true,
    };
    return (
      <>
        <InnovaccerTable
          data={[]}
          fetchData={this.fetchData}
          draggable
          filterList={filterList}
          headerOptions={headerOptions}
          schema={loaderSchema}
          onPageChange={function (_) {}}
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
        />
      </>
    );
  }
}

export default Table;
