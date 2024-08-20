import { useState, useEffect } from "react";
import jsYaml from "../../tooljs.js";
import DropdownOption from "./DropdownOption";
import { ToolConfig, Service, Payload, ServiceRequest } from '../types/toolConfig.types';

export interface Tool {
    name: string;
    services: Service[];
    connect_services: ServiceRequest[];
    disconnect_services: ServiceRequest[];
    payloads: Payload[];
}

export function extractLastWord(str: string): string | null {
    const match = str.match(/[^/]+$/);
    return match ? match[0] : null;
}


const Card = () => {
    const [toolConfig, setToolConfig] = useState<Tool[]>([]);
    const [selectedTool, setSelectedTool] = useState<string>('fastener_gripper');


    useEffect(() => {
        // Ensure jsYaml.tools is an array before setting it
        if (Array.isArray(jsYaml.tools)) {
            setToolConfig(jsYaml.tools);
        } else {
            console.error('jsYaml.tools is not an array:', jsYaml.tools);
        }
    }, []);
    console.log('toolConfig', toolConfig);

    const handleToolSelect = (toolName: string) => {
        setSelectedTool(toolName);
    };

    const currentTool = toolConfig.find(tool => tool.name === selectedTool);
    // console.log(currentTool);
    return (
        <div className="max-w-sm rounded overflow-auto shadow-lg border-2 border-gray-300 p-4 h-124">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">Select Tool</div>
            </div>
            <div className="flex flex-row justify-between">
                <span>Select Tool</span>

                <div className="mb-4">
                    <DropdownOption
                        onSelect={handleToolSelect}
                        options={toolConfig.map(tool => tool.name) || []}
                        label={selectedTool || 'Select a tool'}
                    />
                </div>
            </div>
            {currentTool && (
                <div>
                    <h2 className="text-center font-bold mb-2">Services</h2>
                    {currentTool.services.map((service: Service, index: number) => (
                        <button
                            key={index}
                            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                            onClick={() => console.log(`Service: ${service.name}`)}
                        // call service
                        >
                            {extractLastWord(service.name)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Card;
