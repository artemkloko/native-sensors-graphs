import { EventSubscriptionVendor, NativeModules } from 'react-native';

export const { SensorsModule } = NativeModules as {
  SensorsModule: EventSubscriptionVendor & {
    ready: () => Promise<undefined>;
    register: () => void;
    unregister: () => void;
  };
};
