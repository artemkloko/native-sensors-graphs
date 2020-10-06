import { useCallback, useState } from 'react';
import { NativeEventEmitter } from 'react-native';

import { SensorsModule } from './SensorsModule';

export type SensorsEvent = {
  name: string;
  values: number[];
};

export const useSensors = (onSensorChanged: (event: SensorsEvent) => void) => {
  const [state, setState] = useState<{
    emitter?: NativeEventEmitter;
    registered: boolean;
  }>({ registered: false });

  const register = useCallback(async () => {
    await SensorsModule.ready();
    let { emitter } = state;
    if (!emitter) {
      emitter = new NativeEventEmitter(SensorsModule);
      setState((state) => ({ ...state, emitter }));
    }
    SensorsModule.register();
    emitter.addListener('onSensorChanged', onSensorChanged);
    setState((state) => ({ ...state, registered: true }));
  }, [state, setState, onSensorChanged]);

  const unregister = useCallback(() => {
    state.emitter?.removeAllListeners('onSensorChanged');
    SensorsModule.unregister();
    setState((state) => ({ ...state, registered: false }));
  }, [state]);

  return { register, unregister, registered: state.registered };
};
