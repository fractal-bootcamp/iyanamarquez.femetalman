import { useState } from "react";
import { extractLastWord } from "./ToolCard";


interface DropdownOptionProps {
    onSelect: (option: string) => void;
    options: string[];
    label: string; // Prop to display the current selection

}

const DropdownOption: React.FC<DropdownOptionProps> = ({ onSelect, options, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option: string) => {
        onSelect(option); // Send selected option to parent
        setIsOpen(false); // Close dropdown
        // setCurrentTool(option);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={toggleDropdown} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded={isOpen} aria-haspopup="true">
                    {extractLastWord(label)}
                    {/* <span className="text-gray-400">{currentPayload}</span> */}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        {options.map((option, index) => (
                            <a key={index} href="#" onClick={() => handleOptionClick(option)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1}>{option}</a>
                        ))}
                    </div>
                </div>
            )}
        </div>

    )
}

export default DropdownOption;