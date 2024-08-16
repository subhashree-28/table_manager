export interface Data {
  completed?: boolean;
  id: number;
  name: string;
  description: string;
  link: string;
  should_cook: string;
  nutritions: string[];
  max_intake: string;
}

export interface State {
  set_yes: boolean;
  set_no: boolean;
  log: boolean;
  delete: boolean;
  add: boolean;
  selectedItems: Data[];
  filteredItem: Data[];
  completed: boolean;
  display: boolean;
  // input: string;
  data: Data[];
  name: string;
  description: string;
  link: string;
  should_cook: string;
  nutritions: string[];
  max_intake: string;
  selectedNutrition: string[];
}

export type Action =
  // | { type: "set_input"; payload: string }
  | { type: "set_completed"; payload: number }
  | { type: "add_item"; payload: Data }
  | { type: "delete"; payload: number }
  | { type: "name"; payload: string }
  | { type: "description"; payload: string }
  | { type: "link"; payload: string }
  | { type: "should_cook"; payload: string }
  | { type: "nutritions"; payload: string[] }
  | { type: "max_intake"; payload: string }
  | { type: "display_details" }
  | { type: "log" }
  | { type: "add" }
  | { type: "deleted_item" }
  | { type: "delete_if_yes" }
  | { type: "notdelete_if_no" };

export type TableManagerContextProps = {
  data: State;
  handleCheck: (index: number) => void;
  handleDelete: (id: number) => void;
  handleAddItem: (newItem: Data) => void;
  handleAdd: () => void;
  handleDetails: () => void;
  handleLog: () => void;
  handleDeleted: () => void;
  handleYes: () => void;
  handleNo: () => void;
};
