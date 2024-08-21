import { useState } from "react";
import { useForm } from "react-hook-form";
import { Data } from "./types";
import { TextInput } from "./TextInput";
import Checklist from "./MultiSelect";
import { items, option, patterns } from "./config";
import "./form.css";
import _ from "lodash";
import { useTableManagerContext } from "./TableManagerProvider";

interface FormProps {
  onSubmitData: (newItem: Data) => void;
}

export default function Form(props: FormProps) {
  const { data } = useTableManagerContext();
  const { onSubmitData } = props;

  const { control, handleSubmit, setValue, reset } = useForm<Data>();

  const onSubmit = (datas: Data) => {
    const highestId = data.length;
    onSubmitData({ ...datas, id: highestId + 1 });
    reset();
    setShouldCook("");
    setNutritions([]);
  };

  const [nutritions, setNutritions] = useState<string[]>([]);

  const handleSelectOption = (selected: string[] | string) => {
    if (_.isArray(selected)) {
      setNutritions(selected);
      setValue("nutritions", selected, { shouldValidate: true });
    }
  };

  const [shouldCook, setShouldCook] = useState<string>("");

  const handleSelectItem = (selected: string | string[]) => {
    if (_.isString(selected)) {
      setShouldCook(selected);
      setValue("should_cook", selected);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="name">
        <TextInput
          control={control}
          name="name"
          required
          inputPattern={patterns.name}
          label="Name"
        />
      </div>

      <div className="description">
        <TextInput
          control={control}
          name="description"
          label="Description"
          required
          inputPattern={patterns.description}
        />
      </div>

      <TextInput
        control={control}
        name="link"
        required
        inputPattern={patterns.link}
        label="Link"
      />

      <a href={`https://en.wikipedia.org/wiki/#Nutrition`}> </a>

      <div className="should_cook">
        <Checklist
          items={option}
          selectedValue={shouldCook}
          onChange={handleSelectItem}
          control={control}
          type="radio"
          name="Should Cook"
          placeholder="Should Cook"
          required
        />
      </div>

      <div className="nutrition">
        <Checklist
          items={items}
          selectedValues={nutritions}
          onChange={handleSelectOption}
          control={control}
          type="checkbox"
          name="Nutritions"
          placeholder="Select Nutritions"
          required
        />
      </div>

      <div className="intake">
        <TextInput
          control={control}
          name="max_intake"
          required
          inputPattern={patterns.max_intake}
          label="intake"
        />
      </div>

      <button className="form_add" type="submit">
        Add
      </button>
    </form>
  );
}
