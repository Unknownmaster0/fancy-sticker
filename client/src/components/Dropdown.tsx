import { useTheme } from "../context/ThemeContext";

type DropdownProps = {
  label: string;
  options: string[];
  selectedValue: string;
  handleSort: (sortValue: string) => void;
};

export default function Dropdown({
  label,
  options,
  selectedValue,
  handleSort,
}: DropdownProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-2 justify-end pr-12 flex-1 font-sans">
      <label className="text-lg font-semibold text-primary-neon">{label}</label>
      <select
        className={`px-3 py-2 text-base border rounded-md transition border-primary-neon focus:ring focus:ring-primary-neon focus:outline-none w-full ${
          isDarkMode
            ? "bg-card-bg text-accent-bright"
            : "bg-card-light text-text-dark"
        }`}
        value={selectedValue}
        onChange={(event) => handleSort(event.target.value)}
      >
        {options.map((optionVal, index) => (
          <option
            key={index}
            value={optionVal}
            className={
              isDarkMode ? "bg-card-bg text-accent-bright" : "bg-card-light text-text-dark"
            }
          >
            {optionVal}
          </option>
        ))}
      </select>
    </div>
  );
}
