export default {
  tools: [
    {
      name: "fastener_gripper",
      services: [
        { name: "pneumatic/gripper/neutral", class: "std_srvs/Trigger" },
        { name: "pneumatic/gripper/close", class: "std_srvs/Trigger" },
        { name: "pneumatic/gripper/open", class: "std_srvs/Trigger" },
        { name: "rotary/start_node", class: "std_srvs/Trigger" },
        { name: "rotary/stop_node", class: "std_srvs/Trigger" },
        {
          name: "rotary/set_relative_angle",
          class: "metalman_srvs/SetArray",
        },
        {
          name: "rotary/set_absolute_angle",
          class: "metalman_srvs/SetArray",
        },
      ],
      connect_services: [
        { name: "pneumatic/gripper/neutral", request: {} },
        { name: "rotary/start_node", request: {} },
      ],
      disconnect_services: [
        { name: "pneumatic/gripper/neutral", request: {} },
        {
          name: "rotary/set_absolute_angle",
          request: { data: [30, 100, 100] },
        },
        { name: "rotary/stop_node", request: {} },
      ],
      payloads: [
        {
          name: "default",
          mass: 8.54,
          cog: { x: -0.001, y: -0.07, z: 0.169 },
        },
      ],
    },
    {
      name: "bracket_gripper",
      services: [
        { name: "pneumatic/gripper/neutral", class: "std_srvs/Trigger" },
        { name: "pneumatic/gripper/close", class: "std_srvs/Trigger" },
        { name: "pneumatic/gripper/open", class: "std_srvs/Trigger" },
      ],
      connect_services: [{ name: "pneumatic/gripper/neutral", request: {} }],
      disconnect_services: [{ name: "pneumatic/gripper/neutral", request: {} }],
      payloads: [
        {
          name: "default",
          mass: 7.96,
          cog: { x: 0.007, y: -0.148, z: 0.139 },
        },
        {
          name: "harmon_bracket",
          mass: 10.94,
          cog: { x: 0.042, y: -0.223, z: 0.229 },
        },
      ],
    },
    {
      name: "driver",
      services: [
        { name: "pneumatic/driver/neutral", class: "std_srvs/Trigger" },
        { name: "pneumatic/driver/start", class: "std_srvs/Trigger" },
      ],
      connect_services: [{ name: "pneumatic/driver/neutral", request: {} }],
      disconnect_services: [{ name: "pneumatic/driver/neutral", request: {} }],
      payloads: [
        {
          name: "default",
          mass: 7.06,
          cog: { x: -0.002, y: -0.059, z: 0.166 },
        },
      ],
    },
    {
      name: "printer",
      services: [
        { name: "printer/purge", class: "std_srvs/Trigger" },
        { name: "printer/save_line", class: "metalman_srvs/SaveLine" },
        { name: "printer/load_print", class: "metalman_srvs/LoadPrint" },
        { name: "printer/start_print", class: "std_srvs/Trigger" },
        { name: "printer/stop_print", class: "std_srvs/Trigger" },
      ],
      connect_services: [],
      disconnect_services: [],
      payloads: [
        {
          name: "default",
          mass: 7.98,
          cog: { x: 0.008, y: -0.072, z: 0.151 },
        },
      ],
    },
  ],
  changers: [
    {
      name: "right_tool",
      arm_name: "right_arm",
      current_tool: "printer",
      services: [
        { name: "pneumatic/changer/neutral", class: "std_srvs/Trigger" },
        { name: "pneumatic/changer/engage", class: "std_srvs/Trigger" },
        {
          name: "pneumatic/changer/disengage",
          class: "std_srvs/Trigger",
        },
      ],
      payloads: [
        {
          name: "default",
          mass: 5.36,
          cog: { x: -0.004, y: -0.027, z: 0.126 },
        },
      ],
    },
    {
      name: "left_tool",
      arm_name: "left_arm",
      current_tool: "bracket_gripper",
      services: [
        { name: "pneumatic/changer/neutral", class: "std_srvs/Trigger" },
        { name: "pneumatic/changer/engage", class: "std_srvs/Trigger" },
        {
          name: "pneumatic/changer/disengage",
          class: "std_srvs/Trigger",
        },
      ],
      payloads: [
        {
          name: "default",
          mass: 5.36,
          cog: { x: -0.004, y: -0.027, z: 0.126 },
        },
      ],
    },
  ],
  pockets: [
    { name: 0, current_tool: null, pose: null },
    {
      name: 1,
      current_tool: "fastener_gripper",
      pose: {
        header: { frame_id: "world" },
        pose: {
          position: {
            x: -0.22112743532704443,
            y: -1.0338241488848605,
            z: 1.8785991677048586,
          },
          orientation: {
            x: -0.018237972857738698,
            y: 0.9998308283426685,
            z: -0.002340810638404799,
            w: -0.00046005131113707726,
          },
        },
      },
    },
    {
      name: 2,
      current_tool: "driver",
      pose: {
        header: { frame_id: "world" },
        pose: {
          position: {
            x: -0.06763882557878204,
            y: -1.032491622777368,
            z: 1.8760716333881755,
          },
          orientation: {
            x: -0.014509929792118601,
            y: 0.9998113034397089,
            z: -0.01291548155645281,
            w: 0.000098933225774589,
          },
        },
      },
    },
    {
      name: 3,
      current_tool: null,
      pose: {
        header: { frame_id: "world" },
        pose: {
          position: {
            x: 0.0832569556205422,
            y: -1.0310773949496128,
            z: 1.8748931971199514,
          },
          orientation: {
            x: 0.011285318015897827,
            y: 0.9997519008785783,
            z: -0.01804210275279028,
            w: 0.006577295432561248,
          },
        },
      },
    },
    { name: 4, current_tool: null, pose: null },
    { name: 5, current_tool: null, pose: null },
  ],
};
