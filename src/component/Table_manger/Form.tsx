import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Data } from "./types";
import { TextInput } from "./TextInput";
import Checklist from "./multiselect";
import { items, item } from "./config";
import "./form.css";
import { RadioInput } from "./RadioInput";

interface FormProps {
  onSubmitData: (newItem: Data) => void;
}

// function RadioFormField({ control }: { control: Control<any> }) {
//   return (
//     <div>
//       Should Cook:
//       <RadioInput name="should_cook" value="Yes" required control={control} />
//       <RadioInput name="should_cook" value="No" required control={control} />
//     </div>
//   );
// }

const patterns = {
  name: /^[A-Z][a-z]*.*$/,
  description: /^[A-Z][a-z]*.*$/,
  link: /\b(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})(?:\/[^\s]*)?\b/,
  max_intake: /^[0-9]+[g]+$/,
};

export default function Form(props: FormProps) {
  const { onSubmitData } = props;

  // const resetform = useForm<Data>();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Data>();

  // const onSubmit = (data: FormValues) => console.log(data);

  const onSubmit = (data: Data) => {
    onSubmitData(data);
    console.log(data);
    reset();
    setShouldCook("");
    setNutritions([]);
  };

  const [nutritions, setNutritions] = useState<string[]>([]);

  const handleNutritions = (selected: string[] | string) => {
    if (Array.isArray(selected))
    {setNutritions(selected);
    setValue("nutritions", selected, { shouldValidate: true });}
  };

  const [shouldCook, setShouldCook] = useState<string>("");

  const handleShouldCook = (selected: string | string[]) => {
    if (typeof selected === "string") {
      setShouldCook(selected);
      setValue("should_cook", selected);
    }
  }

  // console.log(errors);

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

      {/* <RadioFormField control={control} /> */}

      <div className="should_cook">
        <Checklist
          items={item}
          selectedValue={shouldCook}
          onChange={handleShouldCook}
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
          onChange={handleNutritions}
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

      <button
        className="form_add"
        type="submit"
        // onClick={() => {
        //   const existingData = getValues("data");
        //   setValue("data", existingData);
        // }}
      >
        Add
      </button>
    </form>
  );
}
