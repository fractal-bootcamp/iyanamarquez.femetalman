import ArmCard from "../Components/ArmCard/ArmCard";
import GridTable from "../Components/GridTable/GridTable";
import JoystickComponent from "../Components/GridTable/Joystick";
import ROSImageStream from "../RosImageStream";

const ProgramLayout = () => {
  return (
    <div className="pt-10">
      <ROSImageStream streamUrl=""/>
      <JoystickComponent />
      <div className="flex flex-row justify-around items-center space-x-4 ">
        <GridTable />

      </div>
    </div>
  );
};

export default ProgramLayout;
