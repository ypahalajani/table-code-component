import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Table, { IProps as ITableProps } from "./Table";
import * as React from "react";
import * as ReactDOM from "react-dom";

export class TSTable
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private componentContainer: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  private componentProps: ITableProps = {
    id: "",
    context: this._context,
    data: [],
    schema: [],
    fetchData: () => Promise.resolve({ count: 0, data: [], schema: [] }),
  };
  private _notifyOutputChanged: () => void;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    context.mode.trackContainerResize(true);
    // Add control initialization code
    let currentPageContext = context as any;
    currentPageContext = currentPageContext
      ? currentPageContext["page"]
      : undefined;
    debugger;
    if (currentPageContext && currentPageContext.entityId) {
      this.componentProps.id = currentPageContext.entityId;
      this.componentProps.context = context;
      this.componentProps.withHeader = context.parameters.withHeader.raw;
    }
    this.componentContainer = container;
    this._notifyOutputChanged = notifyOutputChanged;
  }

  private getSchema = (context: ComponentFramework.Context<IInputs>) => {
    const {
      parameters: {
        sampleDataSet: { columns },
      },
    } = context;
    return columns.map((column) => ({
      displayName: column.displayName,
      name: column.name,
    }));
  };

  private getFormattedData = (context: ComponentFramework.Context<IInputs>) => {
    const {
      parameters: {
        sampleDataSet: { columns, sortedRecordIds, records },
      },
    } = context;
    const schema = this.getSchema(context);
    const data = sortedRecordIds.map((recordId) => {
      const row = records[recordId];
      // TODO: replace any by proper type
      const fomattedRow = schema.reduce<any>((result, column) => {
        result[column.name] = row.getFormattedValue(column.name);
        return result;
      }, {});
      return fomattedRow;
    });
    return data;
  };

  private extractPropsFromContext = (
    context: ComponentFramework.Context<IInputs>
  ): ITableProps => {
    const { withHeader, sampleDataSet } = context.parameters;
    const { loading } = sampleDataSet;

    const schema = this.getSchema(context).map((item) => ({
      ...item,
      width: 300,
    }));
    const data = this.getFormattedData(context);

    return {
      withHeader: withHeader.raw,
      id: `id-${new Date().valueOf()}`,
      context,
      schema,
      data,
      loading,
      fetchData: () => Promise.resolve({ count: data.length, data, schema }),
    };
  };

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    console.log("[TSTable/index.ts] inside updateView");

    this.componentProps = this.extractPropsFromContext(context);

    ReactDOM.render(
      React.createElement(Table, this.componentProps),
      this.componentContainer
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      withHeader: this.componentProps.withHeader,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    ReactDOM.unmountComponentAtNode(this.componentContainer);
  }
}
