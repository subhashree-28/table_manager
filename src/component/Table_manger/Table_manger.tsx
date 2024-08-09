import React, { useReducer } from "react";
import produce from "immer";
import { Action, Data, State } from "./types";
import "./table_manger.css";
import { initialState, items } from "./config";
import Checklist from "./multiselect";
import _ from "lodash";

const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "set_input":
      state.input = action.payload;
      break;

    case "set_completed":
      state.data = _.map(state.data, (item, i) =>
        i === action.payload ? { ...item, completed: !item.completed } : item
      );
      state.filteredItem = state.data.filter((item) => item.completed);
      break;

    case "add_item":
      state.data.push(action.payload);
      state.completed = false;
      state.Name = "";
      state.Description = "";
      state.Link = "";
      state.Should_Cook = "";
      state.Nutritions = [];
      state.Max_Intake_per_day = "";
      break;

    case "name":
      state.Name = action.payload;
      break;

    case "description":
      state.Description = action.payload;
      break;

    case "link":
      state.Link = action.payload;
      break;

    case "should_cook":
      state.Should_Cook = action.payload;
      break;

    case "nutritions":
      state.Nutritions = action.payload;
      break;

    case "max_intake":
      state.Max_Intake_per_day = action.payload;
      break;

    case "delete":
      state.data = state.data.filter((item) => item.id !== action.payload);
      break;

    case "display_details":
      state.display = !state.display;
      break;

    case "log":
      state.log = !state.log;
      state.filteredItem = state.data.filter((item) => item.completed);
      console.log(state.filteredItem);
      break;

    case "deleted_item":
      state.delete = !state.delete;
      const delete_item = _.filter(state.data, (item) => !item.completed);
      state.data = delete_item;
      break;
  }
});

export default function TableManger() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "set_input", payload: e.target.value });
  };

  const handleCheck = (index: number) => {
    dispatch({ type: "set_completed", payload: index });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "delete", payload: id });
  };

  const handleAdd = () => {
    const newItem: Data = {
      id: state.data.length + 1,
      Name: state.Name,
      Description: state.Description,
      Link: state.Link,
      Should_Cook: state.Should_Cook,
      Nutritions: state.Nutritions,
      Max_Intake_per_day: state.Max_Intake_per_day,
      completed: false,
    };

    dispatch({
      type: "add_item",
      payload: newItem,
    });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "name", payload: e.target.value });
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "description", payload: e.target.value });
  };

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "link", payload: e.target.value });
  };

  const handleShouldCook = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "should_cook", payload: e.target.value });
  };

  // const handleNutrition = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch({ type: "nutritions", payload: e.target.value });
  // };
  const handleNutritions = (selectedValues: string[]) => {
    dispatch({ type: "nutritions", payload: selectedValues });
  };

  const handleMaxIntake = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "max_intake", payload: e.target.value });
  };

  const handleDetails = () => {
    dispatch({ type: "display_details" });
  };

  const handleLog = () => {
    dispatch({ type: "log" });
  };

  const handleDeleted = () => {
    dispatch({ type: "deleted_item" });
  };

  return (
    <div>
      <div className="table_manager">
        <table>
          <thead>
            <tr>
              <th> </th>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
              <th>Should Cook</th>
              <th>Nutritions</th>
              <th>Max. Intake per day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onClick={() => handleCheck(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>
                  <a href={item.Link}>{item.Link}</a>
                </td>
                <td>{item.Should_Cook}</td>
                <td>{item.Nutritions.join(",")}</td>
                <td>{item.Max_Intake_per_day}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>{state.data.length + 1}</td>
              <td>
                <input
                  type="text"
                  name="Name"
                  onChange={handleName}
                  value={state.Name}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Description"
                  onChange={handleDescription}
                  value={state.Description}
                />
              </td>
              <td>
                <input type="text" onChange={handleLink} value={state.Link} />
                <a
                  href={`https://en.wikipedia.org/wiki/${state.Link}#Nutrition`}
                ></a>
              </td>
              <td>
                <input
                  type="radio"
                  name="should Cook Yes"
                  value="Yes"
                  checked={state.Should_Cook === "Yes"}
                  onChange={handleShouldCook}
                />
                Yes
                <input
                  type="radio"
                  name="should Cook No"
                  value="No"
                  checked={state.Should_Cook === "No"}
                  onChange={handleShouldCook}
                />
                No
              </td>
              <td>
                <Checklist
                  items={items}
                  selectedValues={state.Nutritions}
                  onChange={handleNutritions}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="max intake"
                  onChange={handleMaxIntake}
                  value={state.Max_Intake_per_day}
                />
              </td>
              <td>
                <button className="add_button" onClick={handleAdd}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button">
          <button className="details" onClick={handleDetails}>
            Details
          </button>
          {state.display && (
            <div>
              {state.filteredItem.map((item) => (
                <div key={item.id}>
                  <p>Name: {item.Name}</p>
                  <p>Description: {item.Description}</p>
                  <p>Link: {item.Link}</p>
                  <p>Should Cook: {item.Should_Cook}</p>
                  <p>Nutritions: {item.Nutritions.join(",")}</p>
                  <p>Max Intake per day: {item.Max_Intake_per_day}</p>
                </div>
              ))}
            </div>
          )}
          <button className="log" onClick={handleLog}>
            Log
          </button>
          <button className="delete" onClick={handleDeleted}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
