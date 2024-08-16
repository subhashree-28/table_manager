import produce from "immer";
import { Action, State } from "./types";
import _ from "lodash";

export const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    // case "set_input":
    //   state.input = action.payload;
    //   break;

    case "set_completed":
      state.data = _.map(state.data, (item, i) =>
        i === action.payload ? { ...item, completed: !item.completed } : item
      );
      state.filteredItem = state.data.filter((item) => item.completed);
      break;

    case "add_item":
      state.data = [...state.data, action.payload];
      // state.data.push(action.payload);
      // state.completed = false;
      // state.name = "";
      // state.description = "";
      // state.link = "";
      // state.should_cook = "";
      // state.Nutritions = [];
      // state.max_intake = "";
      break;

    case "name":
      state.name = action.payload;
      break;

    case "description":
      state.description = action.payload;
      break;

    case "link":
      state.link = action.payload;
      break;

    case "should_cook":
      state.should_cook = action.payload;
      break;

    case "nutritions":
      state.nutritions = action.payload;
      break;

    case "max_intake":
      state.max_intake = action.payload;
      break;

    case "delete":
      state.data = state.data.filter((item) => item.id !== action.payload);
      break;

    case "display_details":
      state.display = !state.display;
      state.log = false;
      state.delete = false;
      state.add = false;
      break;

    case "log":
      state.log = !state.log;
      state.filteredItem = state.data.filter((item) => item.completed);
      console.log(state.filteredItem);
      state.display = false;
      state.delete = false;
      state.add = false;
      break;

    case "add":
      state.add = !state.add;
      state.display = false;
      state.log = false;
      state.delete = false;
      break;

    case "deleted_item":
      state.delete = !state.delete;
      state.display = false;
      state.log = false;
      state.add = false;
      break;

    case "delete_if_yes":
      const delete_item = _.filter(state.data, (item) => !item.completed);
      state.data = delete_item;
      break;

    case "notdelete_if_no":
      state.delete = !state.delete;
  }
});
