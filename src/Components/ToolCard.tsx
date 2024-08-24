import { useState, useEffect } from "react";
import jsYaml from "../../tooljs.js";
import DropdownOption from "./DropdownOption.js";
import { Service, Payload, ServiceRequest } from '../types/toolConfig.types.js';
import { callService, createRequestPayload, initializeRos } from '../rosService.js';

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

interface ToolCardProps {
    toolPosition: string;
}

const ToolCard = ({ toolPosition }: ToolCardProps) => {
    const [toolConfig, setToolConfig] = useState<Tool[]>([]);
    const [selectedTool, setSelectedTool] = useState<Tool['name']>('fastener_gripper');
    const [selectedPayload, setSelectedPayload] = useState<Payload | null>(null);

    useEffect(() => {
        // Initialize ROS connection
        initializeRos('ws://localhost:9090').catch(console.error);

        // Ensure jsYaml.tools is an array before setting it
        if (Array.isArray(jsYaml.tools)) {
            setToolConfig(jsYaml.tools);
            setSelectedTool('fastener_gripper'); // Default to a tool
        } else {
            console.error('jsYaml.tools is not an array:', jsYaml.tools);
        }
    }, []);

    useEffect(() => {
        if (toolConfig.length > 0) {
            const tool = toolConfig.find(tool => tool.name === selectedTool);
            if (tool) {
                setSelectedPayload(tool.payloads.length > 0 ? tool.payloads[0] : null);
            }
        }
    }, [selectedTool, toolConfig]);

    console.log('payloads is :', selectedTool);

    const handleToolSelect = (toolName: string) => {
        setSelectedTool(toolName);
    };

    const handlePayloadSelect = async (payloadName: string) => {
        const tool = toolConfig.find(tool => tool.name === selectedTool);
        if (tool) {
            const payload = tool.payloads.find(payload => payload.name === payloadName);
            setSelectedPayload(payload || null);
            if (payload) {
                console.log('calling service payload isss :', payload);
                createRequestPayload({
                    mass: payload.mass,
                    cog: payload.cog
                });
            }
        }
    };
    const currentTool = toolConfig.find(tool => tool.name === selectedTool);

    return (
        <div className="max-w-sm rounded overflow-auto shadow-lg border-2 border-gray-300 p-4 h-124">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{toolPosition === 'left' ? 'Left Arm' : 'Right Arm'}</div>
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
            <div className="flex flex-row justify-between">
                <span>Select Payload</span>
                <div className="mb-4">
                    {currentTool && (
                        <DropdownOption
                            onSelect={handlePayloadSelect}
                            options={currentTool.payloads.map(payload => payload.name) || []}
                            label={selectedPayload?.name || 'Select a payload'}
                        />
                    )}
                </div>

            </div>
            {currentTool && (
                <div>
                    <h2 className="text-center font-bold mb-2">{currentTool.name}</h2>
                    {currentTool.services
                        .map((service, index) => (
                            <button
                                key={index}
                                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                                onClick={() => callService(service.name, service.class, {})}
                            >
                                {extractLastWord(service.name)}
                            </button>
                        ))
                    }
                </div>
            )}

        </div >
    );
};

export default ToolCard;
