// src/rosService.ts
import ROSLIB from "roslib";

let ros: ROSLIB.Ros | null = null;

const initializeRos = (url: string): Promise<ROSLIB.Ros> => {
  return new Promise((resolve, reject) => {
    const rosInstance = new ROSLIB.Ros({ url });

    rosInstance.on("connection", () => {
      console.log("Connected to ROS");
      ros = rosInstance;
      resolve(rosInstance);
    });

    rosInstance.on("error", (error: Error) => {
      console.error("Error connecting to ROS:", error);
      reject(error);
    });

    rosInstance.on("close", () => {
      console.log("Connection to ROS closed");
      ros = null;
    });
  });
};

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

interface PayloadData {
  mass: number;
  cog: {
    x: number;
    y: number;
    z: number;
  };
}

const createRequestPayload = (payloadData: PayloadData) => {
  return new ROSLIB.ServiceRequest({
    data: {
      mass: payloadData.mass,
      cog: [payloadData.cog.x, payloadData.cog.y, payloadData.cog.z],
    },
  });
};

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

export {
  initializeRos,
  callService,
  createRequestPayload,
  publishJoystickData,
};
