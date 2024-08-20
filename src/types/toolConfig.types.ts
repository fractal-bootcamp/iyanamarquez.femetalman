export interface ToolConfig {
  tools: Tool[];
  changers: Changer[];
  pockets: Pocket[];
}

export interface Tool {
  name: string;
  services: Service[];
  connect_services: ServiceRequest[];
  disconnect_services: ServiceRequest[];
  payloads: Payload[];
}

export interface Service {
  name: string;
  class: string;
}

export interface ServiceRequest {
  name: string;
  request: Record<string, any>;
}

export interface Payload {
  name: string;
  mass: number;
  cog: {
    x: number;
    y: number;
    z: number;
  };
}

export interface Changer {
  name: string;
  arm_name: string;
  current_tool: string;
  services: Service[];
  payloads: Payload[];
}

export interface Pocket {
  name: number;
  current_tool: string | null;
  pose: Pose | null;
}

export interface Pose {
  header: {
    frame_id: string;
  };
  pose: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    orientation: {
      x: number;
      y: number;
      z: number;
      w: number;
    };
  };
}
