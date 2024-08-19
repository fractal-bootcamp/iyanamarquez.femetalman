declare module './mockRoslib' {
    export class Ros {
        constructor();
        on(event: string, callback: (...args: any[]) => void): void;
        close(): void;
    }

    export class Topic {
        constructor(options: { ros: Ros; name: string; messageType: string });
        subscribe(callback: (msg: any) => void): void;
        unsubscribe(): void;
        name: string;
    }
}
class MockRos {
  constructor() {
    console.log("Mock ROS instance created");
  }
  on(event, callback) {
    if (event === "connection") {
      console.log("Mock: Connected to ROS");
      callback();
    } else if (event === "error") {
      console.log("Mock: Error connecting to ROS");
    } else if (event === "close") {
      console.log("Mock: Connection to ROS closed");
    }
  }
  close() {
    console.log("Mock: ROS connection closed");
  }
}

class MockTopic {
  constructor({ ros, name, messageType }) {
    this.name = name;
    this.messageType = messageType;
    this.subscribers = []; // Track subscribers
    // console.log(`Mock Topic created: ${name}`);
  }
  subscribe(callback) {
    console.log("Mock: Subscribed to topic", callback);
    this.subscribers.push(callback);
    // Simulate receiving a message after 2 seconds
    setTimeout(() => {
      callback({ data: "Hello from Mock ROS!" });
    }, 2000);
  }
  unsubscribe() {
    console.log("Mock: Unsubscribed from topic");
    this.subscribers = []; // Clear subscribers
  }
  publish(message) {
    console.log("Mock: Published message:", message);
    // Notify all subscribers with the message
    this.subscribers.forEach((callback) => callback(message));
  }
}

export default {
  Ros: MockRos,
  Topic: MockTopic,
};
