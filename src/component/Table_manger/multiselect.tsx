import React, { useState, useEffect } from "react";
import "./multiselect.css";
import _ from "lodash";

interface Props {
  items: {
    value: string;
  }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}

function Checklist(props: Props) {
  const { items, selectedValues, onChange } = props;

  const [selectedItem, setSelectedItem] = useState<string[]>(selectedValues);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = (item: string) => {
    setSelectedItem((prev) => {
      const Selection = prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item];
      onChange(Selection);
      return Selection;
    });
  };

  const selectItem = selectedValues.join(", ");
  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedValues.length === items.length) {
      onChange([]);
    } else {
      onChange(items.map((item) => item.value));
    }
  };

  return (
    <div className="multiselectoption">
      <div className="show-options" onClick={() => setOpen(!open)}>
        <input
          type="text"
          value={selectedValues}
          className="selecting-options"
        />
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
          {filteredItems.map((item) => (
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
