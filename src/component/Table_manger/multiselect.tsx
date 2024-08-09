import React, { useState } from "react";
import "./multiselect.css";
import _ from "lodash";

interface Props {
  items: {
    id: number;
    label: string,
    value: string;
  }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}

function Checklist(props: Props) {
  const { items, selectedValues, onChange } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = (item: string) => {
    const updatedSelectedItems = _.includes(selectedValues, item)
      ? selectedValues.filter((i) => i !== item)
      : [...selectedValues, item];
    onChange(updatedSelectedItems);
  };

  const filteredItems = _.filter(items, (item) =>
    _.includes(item.value.toLowerCase(), search.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedValues.length === items.length) {
      onChange([]);
    } else {
      onChange(_.map(items, (item) => item.value));
    }
  };

  return (
    <div className="multiselectoption">
      <div className="show-options" onClick={() => setOpen(!open)}>
        <div className="selecting-options">{selectedValues.join(", ")}</div>
      </div>
      {open && (
        <div className="select--item">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="searchbar"
          />
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedValues.length === items.length}
              onChange={handleSelectAll}
            />
            Select All
          </label>
          <br />
          {_.map(filteredItems, (item) => (
            <label className="multiple--option" key={item.value}>
              <input
                type="checkbox"
                checked={selectedValues.includes(item.value)}
                onChange={() => handleClick(item.value)}
              />
              {item.value}
              <br />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Checklist;
