import { ChangeEvent } from "react";

interface SelectInputProps {
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
  onChange: (selectedValue: string) => void;
  value?: string;
}

const SelectInput = ({
  placeholder = "Select an option",
  className = "",
  options,
  onChange,
  value = "",
}: SelectInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className={`p-4 bg-slate-800 text-slate-200 appearance-none rounded-lg w-full min-w-full font-medium placeholder:font-semibold placeholder:text-slate-600 focus:ring focus:ring-slate-600 focus:outline-none ${className}`}
      onChange={handleChange}
      value={value}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
