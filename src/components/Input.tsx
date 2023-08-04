import { useState } from "react";
import { validateInput } from "../helpers/inputValidators";

interface InputProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  validations?: string[];
  onChangeText: (text: string) => void;
  onChangePaste?: (text: React.ClipboardEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

const Input = (props: InputProps) => {
  const {
    placeholder = "Ingresar dato",
    value = "",
    disabled = false,
    validations,
    onChangeText,
    className,
    onChangePaste,
    type = "text",
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    onChangeText(text);

    if (validations) {
      const [newErrors, newErrorMessage] = validateInput(text, validations);
      setErrorMessage(newErrorMessage);
      setIsValid(newErrors.length === 0);
    }
  };

  // const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
  //   const pastedText = event.clipboardData.getData("text/plain");

  //   if (validations) {
  //     const [newErrors, newErrorMessage] = validateInput(
  //       pastedText,
  //       validations
  //     );
  //     setErrorMessage(newErrorMessage);
  //     setIsValid(newErrors.length === 0);
  //   }
  // };

  return (
    <div className="space-y-2">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        onPaste={onChangePaste}
        className={`p-4 bg-slate-800 text-slate-200 rounded-lg w-full min-w-full font-medium placeholder:font-semibold placeholder:text-slate-600 focus:ring focus:ring-slate-600 focus:outline-none ${
          className || ""
        }`}
      />

      {!isValid && errorMessage && (
        <div className="w-full animate-fadeIn">
          <p className="pl-4 text-sm text-rose-500 font-semibold opacity-50">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
