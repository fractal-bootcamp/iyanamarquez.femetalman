import ArmCard from "../Components/ArmCard/ArmCard";
import GridTable from "../Components/GridTable/GridTable";
import JoystickComponent from "../Components/GridTable/Joystick";

const ProgramLayout = () => {
  return (
    <div className="pt-10">
      <JoystickComponent />
      <div className="flex flex-row justify-around items-center space-x-4 ">
        <GridTable />

      </div>
    </div>
  );
};

export default ProgramLayout;
