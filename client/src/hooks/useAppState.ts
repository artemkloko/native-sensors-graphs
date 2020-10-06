import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const useAppState = () => {
  const [state, setState] = useState<{
    status: AppStateStatus;
  }>({
    status: AppState.currentState,
  });

  const onAppStateChange = (status: AppStateStatus) => {
    setState((state) => ({...state, status}));
  };

  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);

    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  return state;
};
