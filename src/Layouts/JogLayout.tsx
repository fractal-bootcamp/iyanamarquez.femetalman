import ArmCard from "../Components/ArmCard/ArmCard";
import ToolCard from "../Components/ToolCard";

const JogLayout = () => {
    return (
        <div className="flex flex-col justify-center gap-4 xs:flex-wrap p-10">
            <div className="flex flex-row justify-center gap-4 xs:flex-wrap">
                <ArmCard armPosition="left" />
                <ArmCard armPosition="right" />
            </div>
            <div className="flex flex-row justify-center gap-4 xs:flex-wrap">
                <ToolCard toolPosition="left" />
                <ToolCard toolPosition="right" />
            </div>
        </div>
    );
};

export default JogLayout;