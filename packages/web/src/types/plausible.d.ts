declare global {
  interface Window {
    plausible: (
      eventName: string,
      options?: {
        props?: Record<string, any>;
        u?: string;
      }
    ) => void;
  }
}

export {};
