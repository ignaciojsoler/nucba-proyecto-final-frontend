import { useState } from "react";
import { validateInput } from "../helpers/inputValidators";

interface InputProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  validations?: string[];
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
}

const Input = (props: InputProps) => {
  const {
    placeholder = "Ingresar dato",
    value = "",
    disabled = false,
    validations,
    onChangeText,
    secureTextEntry = false,
    className,
  } = props;

  const [, setErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: { target: { value: string } }) => {
    const text = event.target.value;
    onChangeText(text); // Update the text value on every change, but don't validate yet.
  };

  const handleInputEndEditing = (event: { target: { value: string } }) => {
    const text = event.target.value;
    const [newErrors, errorMessage] = validateInput(text, validations);
    setErrors(newErrors);
    setErrorMessage(errorMessage);
  };

  return (
    <>
      <input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        onBlur={handleInputEndEditing}
        className={`py-5 px-5 bg-slate-800 text-slate-200 rounded-xl w-full font-medium placeholder:font-semibold placeholder:text-slate-600 focus:ring focus:ring-slate-600 focus:outline-none ${
          className || ""
        }`}
        type={secureTextEntry ? "password" : "text"}
      />

      {errorMessage && (
        <div className="w-full">
          <p className="my-1 ml-4 text-sm text-rose-500 font-semibold opacity-50">
            {errorMessage}
          </p>
        </div>
      )}
    </>
  );
};

export default Input;
