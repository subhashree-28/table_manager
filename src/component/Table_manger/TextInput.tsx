import _ from "lodash";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";
import "./form.css";

type TextInputProps = ComponentProps<"input"> & {
  control: Control<any>;
  name: string;
  required: boolean;
  inputPattern: RegExp;
  label: string;
};

export function TextInput(props: TextInputProps) {
  const { control, name, required, label, inputPattern } = props;

  const {
    formState: { errors },
  } = useController({ control, name });

  const msg = _.toString(errors[name]?.message);

  return (
    <div>
      <input
        type="text"
        {...control.register(name, {
          required: required && `${label} is required`,
          pattern: { value: inputPattern, message: "Invalid" },
        })}
        name={name}
        placeholder={label}
      />
      {errors[name] && <div className="error_message">{msg}</div>}
    </div>
  );
}

// type RadioInputProps = ComponentProps<"input"> & {
//   control: Control<any>;
//   name: string;
// };

// export function RadioInput({ control, name, ...inputProps }: RadioInputProps) {
//   // const {formState: {errors}} = useController({control, name})

//   return (
//     <div>
//       <div className="should_cook">
//         Should Cook:
//         <label>
//           <input
//             type="radio"
//             value="yes"
//             {...control.register(name)}
//             placeholder="should_cook"
//           />
//           Yes
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="no"
//             {...control.register(name)}
//             placeholder="should_cook"
//           />
//           No
//         </label>
//       </div>
//     </div>
//   );
// }
