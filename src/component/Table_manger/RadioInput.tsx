import _ from "lodash";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";

type RadioInputProps = ComponentProps<"input"> & {
  control: Control<any>;
  required: boolean;
  value: string;
  name: string;
};

export function RadioInput({
  control,
  value,
  name,
  required,
}: RadioInputProps) {
  const {
    formState: { errors },
  } = useController({
    control,
    name,
  });

  const msg = _.toString(errors[name]?.message);

  return (
    <label>
      <input
        type="radio"
        value={value}
        {...control.register(name, {
          required: required && `${name} is required`,
        })}
      />
      {value}
      {errors[name] && <div>{msg}</div>}
    </label>
  );
}
