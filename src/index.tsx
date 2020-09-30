import { NativeModules } from 'react-native';

type SensorsModuleType = {
  multiply(a: number, b: number): Promise<number>;
};

const { SensorsModule } = NativeModules;

export default SensorsModule as SensorsModuleType;
