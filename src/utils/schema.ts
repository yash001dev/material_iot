export interface LoaderSchema {
  color: "primary" | "secondary" | "inherit";
}

export interface DataTableSchema {
  type: string;
}

export interface StateSchema {
  level: number;
  switch_state: string;
}

export interface TablePanelSchema {
  //   value={activeTab}
  children: JSX.Element;
  value: number;
  index: number;
  key: string;
}

export interface DevicesSchema {
  id: number;
  name: string;
  capabilities: Array<string>;
  model: string;
  status: string;
  state: StateSchema;
  schedule: string;
  type: string;
}

export interface ActionDataSchema {
  data: DevicesSchema;
}
