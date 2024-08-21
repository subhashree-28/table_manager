import "./tablemanager.css";
import { headers } from "./config";
import _ from "lodash";
import Form from "./Form";
import { useTableManagerContext } from "./TableManagerProvider";
import { Data } from "./types";

function Table() {
  const { new_data, checkedId, setSelectRow, setDeleteRow } =
    useTableManagerContext();

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
          {_.map(new_data, (item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={_.includes(checkedId, item.id)}
                  onChange={() => setSelectRow(item.id)}
                />
              </td>
              <td>{item.id}</td>
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
                  onClick={() => setDeleteRow(item.id)}
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

function TableControl() {
  const {
    new_data,
    checkedId,
    table_tab,
    setTableAction,
    setSelect,
    setAddData,
  } = useTableManagerContext();

  const filteredData = _.filter(new_data, (data) =>
    _.includes(checkedId, data.id)
  );

  function AddItem(data: Data) {
    setAddData(data);
  }

  if (table_tab === "log") {
    console.log(filteredData);
  }
  return (
    <div className="button">
      <div className="table_tab">
        <button className="details" onClick={() => setTableAction("display")}>
          Details
        </button>
        <button className="log" onClick={() => setTableAction("log")}>
          Log
        </button>
        <button
          className="delete"
          onClick={() => setTableAction("remove_data")}
        >
          Delete
        </button>
        <button className="add" onClick={() => setTableAction("add")}>
          Add
        </button>
      </div>
      <div className="content">
        {table_tab === "display" && (
          <div>
            {_.size(filteredData) < 2 &&
              _.map(filteredData, (item) => (
                <div key={item.id} className="content_display">
                  <p>Id: {item.id}</p>
                  <p>Name: {item.name}</p>
                  <p>Description: {item.description}</p>
                  <p>
                    Link: <a href={item.link}>{item.link}</a>
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
        {_.size(filteredData) >= 1 && table_tab === "remove_data" && (
          <div>
            <p>Do you want to delete the selected item ?</p>
            <button onClick={() => setSelect(true)} className="yes_button">
              Yes
            </button>
            <button onClick={() => setSelect(false)} className="no_button">
              No
            </button>
          </div>
        )}
      </div>
      <div>
        {table_tab === "add" && (
          <div className="form">
            <Form onSubmitData={AddItem} />
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
        <TableControl />
      </div>
    </div>
  );
}
