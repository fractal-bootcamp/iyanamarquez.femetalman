// mockRoslib.js
class MockRos {
    constructor() {
        console.log('Mock ROS instance created');
    }
    on(event, callback) {
        if (event === 'connection') {
            console.log('Mock: Connected to ROS');
            callback();
        } else if (event === 'error') {
            console.log('Mock: Error connecting to ROS');
        } else if (event === 'close') {
            console.log('Mock: Connection to ROS closed');
        }
    }
    close() {
        console.log('Mock: ROS connection closed');
    }
}

class MockTopic {
    constructor({ ros, name, messageType }) {
        this.name = name;
        this.messageType = messageType;
        console.log(`Mock Topic created: ${name}`);
    }
    subscribe(callback) {
        console.log('Mock: Subscribed to topic');
        // Simulate receiving a message after 2 seconds
        setTimeout(() => {
            callback({ data: 'Hello from Mock ROS!' });
        }, 2000);
    }
    unsubscribe() {
        console.log('Mock: Unsubscribed from topic');
    }
    publish(message) {
        console.log('Mock: Published message:', message);
    }
}

export default {
    Ros: MockRos,
    Topic: MockTopic
};
