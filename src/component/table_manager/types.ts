export interface Data {
  id: number;
  name: string;
  description: string;
  link: string;
  should_cook: string;
  nutritions: string[];
  max_intake: string;
}
export type Table_Tab = "none" | "display" | "log" | "remove_data" | "add";

export interface State {
  data: Data[];
  new_data: Data[];
  table_tab: Table_Tab;
  checkedId: number[];
}

export type Action =
  | { type: "set_checked"; payload: number }
  | { type: "remove_data"; payload: number }
  | { type: "add_data"; payload: Data }
  | { type: "table_tab"; payload: Table_Tab }
  | { type: "delete_data"; payload: boolean };

export type TableManagerContextProps = {
  data: Data[];
  new_data: Data[];
  checkedId: number[];
  setSelectRow: (id: number) => void;
  setDeleteRow: (id: number) => void;
  setAddData: (newItem: Data) => void;
  setTableAction: (
    table_tab: "none" | "display" | "log" | "remove_data" | "add"
  ) => void;
  setSelect: (opt: boolean) => void;
  table_tab: Table_Tab;
};
