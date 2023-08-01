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
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: { target: { value: string } }) => {
    const text = event.target.value;
    onChangeText(text);

    const [newErrors, newErrorMessage] = validateInput(text, validations);
    setErrors(newErrors);
    setErrorMessage(newErrorMessage);
    setIsValid(newErrors.length === 0);
  };

  return (
    <div className="space-y-2">
      <input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        className={`py-5 px-5 bg-slate-800 text-slate-200 rounded-xl w-full min-w-full font-medium placeholder:font-semibold placeholder:text-slate-600 focus:ring focus:ring-slate-600 focus:outline-none ${
          className || ""
        }`}
        type={secureTextEntry ? "password" : "text"}
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