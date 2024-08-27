import CircleIcon from '@mui/icons-material/Circle';

type ArmCardProps = {
    armPosition: string;
};
interface ButtonConfig {
    label: string;
    onClick: () => void; // Function to be called on click
}


const dummyROSService = (serviceName: string) => {
    console.log(`${serviceName} service called`);
};

const buttonConfigs: ButtonConfig[] = [
    { label: 'Resend program', onClick: () => dummyROSService('resendProgram') },
    { label: 'Unlock protective stop', onClick: () => dummyROSService('unlockProtectiveStop') },
    { label: 'Rest joints', onClick: () => dummyROSService('restJoints') },
    { label: 'Stow joints', onClick: () => dummyROSService('stowJoints') },
    // { label: 'Freedrive', onClick: () => dummyROSService('freedrive') },
];


const ArmCard = ({ armPosition }: ArmCardProps) => {
    return (
        <div className="w-1/2 lg:w-1/3">
            <h1 className="text-center">{armPosition}</h1>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
                <div className='mb-4 text-sm'>
                    {/* TODO: UPDATE THIS */}
                    <CircleIcon color="success" />
                    robot mode: ...
                    <div>
                        <CircleIcon color="error" />
                        safety mode: ...
                    </div>
                </div>
                <div>
                    {/* 4 buttons */}
                    <div className="flex flex-col justify-between space-y-4 text-sm">
                        {buttonConfigs.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className="bg-gray-200 hover:bg-gray-300 text-black border border-gray-300 font-bold py-2 px-4 rounded transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none"
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => dummyROSService('freedrive')} className="text-sm bg-gray-200 hover:bg-gray-300 text-black border border-gray-300 font-bold py-2 px-4 mt-4 rounded transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none">
                        Freedrive
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ArmCard;
