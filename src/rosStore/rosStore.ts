// src/rosStore.ts
import { create } from "zustand";

interface RosState {
  rosConnected: boolean;
  setRosConnected: (connected: boolean) => void;
}

const useRosStore = create<RosState>((set) => ({
  rosConnected: false,
  setRosConnected: (connected) => set({ rosConnected: connected }),
}));

export default useRosStore;
