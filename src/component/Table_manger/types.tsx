import produce from "immer";

export interface Data {
  completed: any;
  id: number;
  Name: string;
  Description: string;
  Link: string;
  Should_Cook: string;
  Nutritions: string[];
  Max_Intake_per_day: string;
}

export interface State {
  log: boolean;
  delete: boolean;
  selectedItems: Data[];
  filteredItem: Data[];
  completed: boolean;
  display: boolean;
  input: string;
  data: Data[];
  Name: string;
  Description: string;
  Link: string;
  Should_Cook: string;
  Nutritions: string[];
  Max_Intake_per_day: string;
  selectedNutrition: string[];
}

export type Action =
  | { type: "set_input"; payload: string }
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
  | { type: "deleted_item" };
