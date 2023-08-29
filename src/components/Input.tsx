import React, { useState } from "react";
import { validateInput } from "../helpers/inputValidators";

interface InputProps {
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  validations?: string[];
  onChangeText: (text: string) => void;
  onChangePaste?: (text: React.ClipboardEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  rows?: number; 
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
    rows = 1, // Valor predeterminado de 1 fila para <textarea>
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = event.target.value;
    onChangeText(text);

    if (validations) {
      const [newErrors, newErrorMessage] = validateInput(text, validations);
      setErrorMessage(newErrorMessage);
      setIsValid(newErrors.length === 0);
    }
  };

  return (
    <div className="space-y-2">
      {type === "textarea" ? (
        <textarea
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          className={`p-4 bg-slate-800 text-slate-200 resize-none rounded-lg w-full min-w-full font-medium placeholder:font-semibold placeholder:text-slate-600 focus:ring focus:ring-slate-600 focus:outline-none ${
            className || ""
          }`}
          rows={rows} // Utiliza la propiedad rows para controlar el número de filas
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onPaste={onChangePaste}
          className={`p-4 bg-slate-800 text-slate-200 rounded-lg w-full min-w-full font-medium placeholder:font-semibold placeholder:text-slate-600 focus:ring focus:ring-slate-600 focus:outline-none ${
            className || ""
          }`}
        />
      )}

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
