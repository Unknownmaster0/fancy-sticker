import { useTheme } from "../context/ThemeContext";

type SearchBoxProps = {
  label: string;
  placeholder: string;
  value: string;
  handleSearch: (searchTerm: string) => void;
};

export default function SearchBox({
  label,
  placeholder,
  value,
  handleSearch,
}: SearchBoxProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-3 pl-4 flex-1 font-sans">
      <label className="text-lg font-semibold text-primary-neon">{label}</label>
      <input
        type="text"
        className={`px-4 py-2 text-base border rounded-md transition border-primary-neon focus:ring focus:ring-primary-neon focus:outline-none w-full ${
          isDarkMode
            ? "bg-card-bg text-accent-bright placeholder:text-text-muted"
            : "bg-card-light text-text-dark placeholder:text-text-light-muted"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}
