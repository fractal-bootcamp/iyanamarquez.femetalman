# ROSlibjs GUI 



## Left and Right Cards
The Tool card (currently labeled as Arm cards) dropdown options are generated using the tool.yaml file. They call the services that were indicated in the tool.yaml
<br></br>
![Screenshot 2024-08-30 at 6 15 36 PM](https://github.com/user-attachments/assets/58ab93a2-ed94-473a-b59c-ef4ca856f223)

ToolCard.tsx
<br></br>
Each button option on the card calls a ROS service
```js
 onClick={() => callService(service.name, service.class, {})}
```
rosService.ts
```js
const callService = (name: string, serviceName: string, requestData: any) => {
  if (ros) {
    console.log("Calling service:", name, serviceName, requestData);
    const service = new ROSLIB.Service({
      ros: ros,
      name: name,
      serviceType: serviceName,
    });
    // ... rest of the function
  } else {
    console.warn("No ROS connection");
  }
};
```
src/Components/ArmCard/ArmCard.tsx
<br></br>
The Arm cards are connected to dummyROSServices
![Screenshot 2024-08-30 at 6 13 39 PM](https://github.com/user-attachments/assets/b0be0797-9f4e-4f56-98d1-48c91e8fd62b)

```js
    { label: 'Resend program', onClick: () => dummyROSService('resendProgram') },
    { label: 'Unlock protective stop', onClick: () => dummyROSService('unlockProtectiveStop') },
    { label: 'Rest joints', onClick: () => dummyROSService('restJoints') },
    { label: 'Stow joints', onClick: () => dummyROSService('stowJoints') },
    // { label: 'Freedrive', onClick: () => dummyROSService('freedrive') },
];
```
src/Components/GridTable/Joystick.tsx
<br></br>
The Joystick records x,y coordinates and publishes them to a fake ROS Topic. Right now the Z coordinate is set to 0 by default. 
```js
// TODO: what is the message type?
const publishJoystickData = (x: number, y: number) => {
  if (ros) {
    // TODO CHANGE TO MESSAGE TYPE
    const publisher = new ROSLIB.Topic({
      ros: ros,
      name: "/publish_joystick", // The ROS topic you want to publish to
      messageType: "geometry_msgs/Vector3", // The type of message you're publishing
    });
    // TODO: Update what should Z be?
    const message = new ROSLIB.Message({
      x: x,
      y: y,
      z: 0,
    });
    publisher.publish(message);
  } else {
    console.warn("No ROS connection");
  }
};
```

