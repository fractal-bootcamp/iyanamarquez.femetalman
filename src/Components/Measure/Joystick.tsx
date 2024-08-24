import { useState } from 'react';
import { Joystick } from 'react-joystick-component';

const JoystickComponent = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    console.log(x, y);
    return <div className='flex flex-col items-center justify-center gap-4'>
        <h1>x:{x} y:{y}</h1>

        <Joystick start={() => { }} move={(event) => { setX(event.x ?? 0); setY(event.y ?? 0); }}

            stop={() => { }} minDistance={30} />
    </div>;
};

export default JoystickComponent;