import React, { useReducer } from "react";
import produce from "immer";
import { Action, Data, State } from "./types";
import "./table_manger.css";
import { initialState, items } from "./config";
import Checklist from "./multiselect";
import _ from "lodash";
import { reducer } from "./TableReducer";

export default function TableManger() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch({ type: "set_input", payload: e.target.value });
  // };

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

  const handleYes = () => {
    dispatch({ type: "delete_if_yes" });
  };

  const handleNo = () => {
    dispatch({type: "notdelete_if_no"})
  }

  return (
    <div>
      <div className="table_manager">
        <table className="header">
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
                    onChange={() => handleCheck(index)}
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
                  <button
                    className="delete_button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>{/* <input type="checkbox" /> */}</td>

              <td>{state.data.length + 1}</td>
              <td>
                <input
                  className="name_textbox"
                  type="text"
                  name="Name"
                  onChange={handleName}
                  value={state.Name}
                />
              </td>
              <td>
                <input
                  className="description"
                  type="text"
                  name="Description"
                  onChange={handleDescription}
                  value={state.Description}
                />
              </td>
              <td>
                <input
                  className="link_textbox"
                  type="text"
                  onChange={handleLink}
                  value={state.Link}
                />
                <a
                  href={`https://en.wikipedia.org/wiki/${state.Link}#Nutrition`}
                >
                  {" "}
                </a>
              </td>
              <td>
                <div className="radio_button">
                  <div>
                    <input
                      type="radio"
                      name="should Cook Yes"
                      value="Yes"
                      checked={state.Should_Cook === "Yes"}
                      onChange={handleShouldCook}
                    />
                    Yes
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="should Cook No"
                      value="No"
                      checked={state.Should_Cook === "No"}
                      onChange={handleShouldCook}
                    />
                    No
                  </div>
                </div>
              </td>
              <td className="nutrition">
                <Checklist
                  items={items}
                  selectedValues={state.Nutritions}
                  onChange={handleNutritions}
                />
              </td>
              <td>
                <input
                  className="max_intake_textbox"
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
          <div className="footer_button">
            <button className="details" onClick={handleDetails}>
              Details
            </button>
            <button className="log" onClick={handleLog}>
              Log
            </button>
            <button className="delete" onClick={handleDeleted}>
              Delete
            </button>
          </div>
          <div className="content">
            {state.display && (
              <div>
                {state.filteredItem.length < 2 && state.filteredItem.map((item) => (
                  <div key={item.id} className="content_display">
                    <p>Id: {item.id}</p>
                    <p>Name: {item.Name}</p>
                    <p>Description: {item.Description}</p>
                    <p>
                      Link: <a href={state.Link}>{item.Link}</a>
                    </p>
                    <p>Should Cook: {item.Should_Cook}</p>
                    <p>Nutritions: {item.Nutritions.join(",")}</p>
                    <p>Max Intake per day: {item.Max_Intake_per_day}</p>
                  </div>
                ))}
              </div>
            )}
          <div className="log">
            
          </div>

          </div>
          <div className="footer">
            {state.delete && (
              <div>
                <p>Do you want to delete the selected item ?</p>
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
