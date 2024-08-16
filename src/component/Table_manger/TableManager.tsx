import React, { useReducer } from "react";
import { Data } from "./types";
import "./table_manger.css";
import { headers, initialState, items } from "./config";
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
      name: state.name,
      description: state.description,
      link: state.link,
      should_cook: state.should_cook,
      nutritions: state.nutritions,
      max_intake: state.max_intake,
      completed: false,
    };

    dispatch({
      type: "add_item",
      payload: newItem,
    });
  };

  // const handle = ["name", "description", "link", "should cook", "max_intake"];

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   handle.forEach((type) => {
  //     if (e.target.name === type) {
  //       dispatch({ type: { type }, payload: e.target.value });
  //     }
  //   });
  // };
  
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

  const handleMaxIntake = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "max_intake", payload: e.target.value });
  };

  // const handleNutrition = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch({ type: "nutritions", payload: e.target.value });
  // };
  const handleNutritions = (selectedValues: string[]) => {
    dispatch({ type: "nutritions", payload: selectedValues });
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
    dispatch({ type: "notdelete_if_no" });
  };

  return (
    <div>
      <div className="table_manager">
        <table className="header">
          <thead>
            <tr>
              {_.map(headers, (header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_.map(state.data, (item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheck(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <a href={item.link}>{item.link}</a>
                </td>
                <td>{item.should_cook}</td>
                <td>{item.nutritions.join(",")}</td>
                <td>{item.max_intake}</td>
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
                  name="name"
                  onChange={handleName}
                  value={state.name}
                />
              </td>
              <td>
                <input
                  className="description"
                  type="text"
                  name="description"
                  onChange={handleDescription}
                  value={state.description}
                />
              </td>
              <td>
                <input
                  className="link_textbox"
                  type="text"
                  onChange={handleLink}
                  value={state.link}
                />
                <a
                  href={`https://en.wikipedia.org/wiki/${state.link}#Nutrition`}
                >
                  `https://en.wikipedia.org/wiki/${state.name}#Nutrition`
                </a>
              </td>
              <td>
                <div className="radio_button">
                  <div>
                    <input
                      type="radio"
                      name="should Cook Yes"
                      value="Yes"
                      checked={state.should_cook === "Yes"}
                      onChange={handleShouldCook}
                    />
                    Yes
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="should Cook No"
                      value="No"
                      checked={state.should_cook === "No"}
                      onChange={handleShouldCook}
                    />
                    No
                  </div>
                </div>
              </td>
              {/* <td className="nutrition">
                <Checklist
                  items={items}
                  selectedValues={state.nutritions}
                  onChange={handleNutritions}
                />
              </td> */}
              <td>
                <input
                  className="max_intake_textbox"
                  type="text"
                  name="max intake"
                  onChange={handleMaxIntake}
                  value={state.max_intake}
                />
              </td>
              {/* <td>
                <button className="add_button" onClick={handleAdd}>
                  Add
                </button>
              </td> */}
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
                {state.filteredItem.length < 2 &&
                  _.map(state.filteredItem, (item) => (
                    <div key={item.id} className="content_display">
                      <p>Id: {item.id}</p>
                      <p>name: {item.name}</p>
                      <p>description: {item.description}</p>
                      <p>
                        link: <a href={state.link}>{item.link}</a>
                      </p>
                      <p>Should Cook: {item.should_cook}</p>
                      <p>Nutritions: {item.nutritions.join(",")}</p>
                      <p>Max Intake per day: {item.max_intake}</p>
                    </div>
                  ))}
              </div>
            )}
            <div className="log"></div>
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
