import { useState } from "react";
import ProgramLayout from "../../Layouts/ProgramLayout";
import JogLayout from "../../Layouts/JogLayout";
import SetupLayout from "../../Layouts/SetupLayout";
import CalibrateLayout from "../../Layouts/CalibrateLayout";
import StepLayout from "../../Layouts/StepLayout";


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Setup');

    const renderComponent = () => {
        switch (activeTab) {
            case 'Setup': return <SetupLayout />;
            case 'Program': return <ProgramLayout />;
            case 'Step': return <StepLayout />;
            case 'Jog': return <JogLayout />;
            case 'Calibrate': return <CalibrateLayout />;
            default: return null;
        }
    };

    return (
        <div>
            <div className="text-3xl font-medium text-center text-gray-500 border-b border-gray-200 ">
                <ul className="flex flex-wrap -mb-px">
                    {['Setup', 'Program', 'Step', 'Jog', 'Calibrate'].map((tab) => (
                        <li key={tab} className="me-2">
                            <a
                                href="#"
                                onClick={() => setActiveTab(tab)}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab
                                    ? 'text-green-600 border-green-600 active'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                    }`}
                                aria-current={activeTab === tab ? 'page' : undefined}
                            >
                                {tab}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-gray-200 h-screen">
                {renderComponent()}
            </div>
        </div>
    )
}

export default Dashboard