import { useState } from "react";
import DropdownOption from "./DropdownOption";

const toolOptions = {
    Pencil: ['Sketch', 'Draw', 'Shade'],
    Brush: ['Watercolor', 'Oil', 'Acrylic'],
    Eraser: ['Soft Eraser', 'Hard Eraser', 'Kneaded Eraser'],
};

const toolPayloadButtonOptions = {
    Pencil: {
        Sketch: [
            { label: 'Sketch Button 1', rosTopic: '/sketch1' },
            { label: 'Sketch Button 2', rosTopic: '/sketch2' },
        ],
        Draw: [
            { label: 'Draw Button 1', rosTopic: '/draw1' },
            { label: 'Draw Button 2', rosTopic: '/draw2' },
        ],
        Shade: [
            { label: 'Shade Button 1', rosTopic: '/shade1' },
            { label: 'Shade Button 2', rosTopic: '/shade2' },
        ],
    },
    Brush: {
        Watercolor: [
            { label: 'Watercolor Button 1', rosTopic: '/watercolor1' },
            { label: 'Watercolor Button 2', rosTopic: '/watercolor2' },
        ],
        Oil: [
            { label: 'Oil Button 1', rosTopic: '/oil1' },
            { label: 'Oil Button 2', rosTopic: '/oil2' },
        ],
        Acrylic: [
            { label: 'Acrylic Button 1', rosTopic: '/acrylic1' },
            { label: 'Acrylic Button 2', rosTopic: '/acrylic2' },
        ],
    },
    Eraser: {
        'Soft Eraser': [
            { label: 'Soft Eraser Button 1', rosTopic: '/soft_eraser1' },
            { label: 'Soft Eraser Button 2', rosTopic: '/soft_eraser2' },
        ],
        'Hard Eraser': [
            { label: 'Hard Eraser Button 1', rosTopic: '/hard_eraser1' },
            { label: 'Hard Eraser Button 2', rosTopic: '/hard_eraser2' },
        ],
        'Kneaded Eraser': [
            { label: 'Kneaded Eraser Button 1', rosTopic: '/kneaded_eraser1' },
            { label: 'Kneaded Eraser Button 2', rosTopic: '/kneaded_eraser2' },
        ],
    },
};

type Tool = keyof typeof toolOptions;
type PayloadOptions = typeof toolPayloadButtonOptions[Tool];

const Card = () => {
    const toolOptionsKeys = Object.keys(toolOptions) as Array<keyof typeof toolOptions>;

    const [currentTool, setCurrentTool] = useState<Tool>('Pencil');
    const [payloadOptions, setPayloadOptions] = useState<string[]>(toolOptions[currentTool]);
    const [currentPayload, setCurrentPayload] = useState('');
    const [buttonOptions, setButtonOptions] = useState<{ label: string; rosTopic: string }[]>([]); // Specify the type for buttonOptions

    const handleToolSelect = (option: typeof toolOptionsKeys[number]) => {
        setCurrentTool(option);
        setPayloadOptions(toolOptions[option]); // Update payload options based on selected tool
        setCurrentPayload(''); // Reset payload to empty when tool changes
        setButtonOptions([]); // Reset button options when tool changes
    };

    const handlePayloadSelect = (option: string) => {
        setCurrentPayload(option); // Update the current payload selection
        setButtonOptions(toolPayloadButtonOptions[currentTool][option as keyof PayloadOptions] || []); // Update button options based on selected payload
    };

    return (
        <div className="max-w-sm rounded overflow-auto shadow-lg border-2 border-gray-300 p-4 h-96">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">Select Tool</div>
            </div>
            {/* Tool selection */}
            <div className="flex justify-center flex-col gap-2 space-y-2 mb-4">
                <div className="flex justify-between flex-row no-wrap">
                    <span>Current tool:</span>
                    <DropdownOption
                        onSelect={handleToolSelect as (option: string) => void}
                        options={Object.keys(toolOptions)}
                        label={currentTool} // Show current tool
                    />
                </div>
                <div className="flex justify-between">
                    Payload tool:
                    <span className="font-bold">
                        <DropdownOption
                            onSelect={handlePayloadSelect}
                            options={payloadOptions}
                            label={currentPayload || 'Select an option'} // Show current payload option or placeholder
                        />
                    </span>
                </div>
            </div>
            {/* Button options */}
            <div className="flex justify-center flex-col gap-2 space-y-2 mb-4">
                <h2 className="text-center">Button Options</h2>
                {buttonOptions.map((button, index) => (
                    <button key={index} className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" onClick={() => console.log(`ROS Topic: ${button.rosTopic}`)}>
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Card;