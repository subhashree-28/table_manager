import produce from "immer";
import { Action, State } from "./types";
import _ from "lodash";

export const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "set_checked":
      const id = action.payload;
      const isChecked = _.includes(state.checkedId, id);
      state.checkedId = isChecked
        ? _.filter(state.checkedId, (checkedId) => checkedId !== id)
        : [...state.checkedId, id];
      break;

    case "remove_data":
      state.new_data = _.filter(
        state.new_data,
        (item) => item.id !== action.payload
      );
      break;

    case "add_data":
      state.data = [...state.data, action.payload];
      state.new_data = [...state.new_data, action.payload];
      break;

    case "delete_data":
      if (action.payload) {
        state.new_data = _.filter(
          state.new_data,
          (data) => !_.includes(state.checkedId, data.id)
        );
        state.checkedId = [];
      } else {
        state.checkedId = [];
      }
      break;

    case "table_tab":
      switch (action.payload) {
        case "display":
          state.table_tab = "display";
          break;
        case "log":
          state.table_tab = "log";
          break;
        case "remove_data":
          state.table_tab = "remove_data";
          break;
        case "add":
          state.table_tab = "add";
          break;
      }
      break;
  }
});
