import { useState } from "react";
import "./multiselect.css";
import _ from "lodash";
import { Control, useController } from "react-hook-form";

interface Props {
  items: {
    id: number;
    label: string;
    value: string;
  }[];
  selectedValues?: string[];
  selectedValue?: string;
  onChange: (selected: string[] | string) => void;
  control: Control<any>;
  name: string;
  placeholder: string;
  type: "radio" | "checkbox";
  required: boolean;
}

function Checklist(props: Props) {
  const {
    items,
    selectedValues = [],
    selectedValue,
    onChange,
    control,
    name,
    placeholder,
    type,
    required,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = (item: string) => {
    if (type === "radio") {
      onChange(item);
    } else if (type === "checkbox") {
      const updatedSelectedItems = _.includes(selectedValues, item)
        ? _.filter(selectedValues, (i) => i !== item)
        : [...selectedValues, item];
      onChange(updatedSelectedItems);
    }
  };

  const filteredItems = _.filter(items, (item) =>
    _.includes(item.label.toLowerCase(), search.toLowerCase())
  );

  const {
    formState: { errors },
  } = useController({ control, name });

  const msg = _.toString(errors[name]?.message);

  return (
    <div className="multiselect--dropdown">
      <input
        className="selected-options"
        placeholder={placeholder}
        onClick={() => setOpen(!open)}
        value={type === "radio" ? selectedValue : _.join(selectedValues, ", ")}
        {...control.register(name, {
          required: required && `${name} is required`,
        })}
      />
      {errors[name] && <div className="error_message">{msg}</div>}

      {open && (
        <div className="options--list">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="searchbar"
          />
          <br />
          {_.map(filteredItems, (item) => (
            <label className="option" key={item.label}>
              <input
                type={type}
                checked={
                  type === "radio"
                    ? selectedValue === item.label
                    : _.includes(selectedValues, item.label)
                }
                onChange={() => handleClick(item.label)}
              />
              {item.label}
              <br />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Checklist;
