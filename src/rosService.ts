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
  if (ros || "TEST" === "TEST") {
    console.log("Calling service:", name, serviceName, requestData);
    const service = new ROSLIB.Service({
      ros: ros,
      name: name,
      serviceType: serviceName, // Update with the actual service type
    });

    const request = new ROSLIB.ServiceRequest(requestData);

    service.callService(
      request,
      (result) => {
        console.log("Service call successful:", result);
      },
      (error) => {
        console.error("Service call error:", error);
      }
    );
  } else {
    console.warn("No ROS connection");
  }
};

export { initializeRos, callService };
