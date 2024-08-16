import "./tablemanager.css";
import { headers } from "./config";
import _ from "lodash";
import Form from "./Form";
import { useTableManagerContext } from "./TableManagerProvider";

function Table() {
  const { data, handleCheck, handleDelete } = useTableManagerContext();

  return (
    <div>
      <table className="header">
        <thead>
          <tr>
            {_.map(headers, (header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_.map(data.data, (item, index) => (
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
        </tbody>
      </table>
    </div>
  );
}

function Button() {
  const {
    data,
    handleDetails,
    handleLog,
    handleAdd,
    handleDeleted,
    handleNo,
    handleYes,
    handleAddItem,
  } = useTableManagerContext();

  return (
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
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="content">
        {data.display && (
          <div>
            {data.filteredItem.length < 2 &&
              _.map(data.filteredItem, (item) => (
                <div key={item.id} className="content_display">
                  <p>Id: {item.id}</p>
                  <p>name: {item.name}</p>
                  <p>description: {item.description}</p>
                  <p>
                    link: <a href={data.link}>{item.link}</a>
                  </p>
                  <p>Should Cook: {item.should_cook}</p>
                  <p>Nutritions: {item.nutritions.join(",")}</p>
                  <p>Max Intake per day: {item.max_intake}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      
      <div className="footer">
        {data.delete && (
          <div>
            <p>Do you want to delete the selected item ?</p>
            <button onClick={handleYes} className="yes_button">
              Yes
            </button>
            <button onClick={handleNo} className="no_button">
              No
            </button>
          </div>
        )}
      </div>
      <div>
        {data.add && (
          <div className="form">
            <Form onSubmitData={handleAddItem} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function TableManager() {
  return (
    <div>
      <div className="table_manager">
        <Table />
        <Button />
      </div>
    </div>
  );
}
