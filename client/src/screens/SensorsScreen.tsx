import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';

import {useSensors} from 'sensors-module';

import {ClientType} from '../@types';
import {useSocketContext} from '../stores/SocketContext';
import {useAppState} from '../hooks/useAppState';
import {useClientPool} from '../hooks/useClientPool';

export const SensorsScreen = () => {
  const {socket} = useSocketContext();
  const clientPool = useClientPool(ClientType.mobile);
  const appState = useAppState();
  const sensors = useSensors((event) => {
    socket && socket.emit('sensorEvent', event);
  });

  const register = () => {
    sensors.register();
  };

  const unregister = () => {
    sensors.unregister();
  };

  useEffect(() => {
    if (
      appState.status === 'active' &&
      clientPool.state.clientPool[ClientType.webApp].length > 0 &&
      !sensors.registered
    ) {
      register();
    } else if (
      (appState.status !== 'active' ||
        clientPool.state.clientPool[ClientType.webApp].length === 0) &&
      sensors.registered
    ) {
      unregister();
    }
  }, [appState, clientPool.state, sensors.registered]);

  useEffect(() => {
    if (appState.status === 'active' && !clientPool.state.connected) {
      clientPool.connect();
    } else if (appState.status === 'background' && clientPool.state.connected) {
      clientPool.disconnect();
    }
  }, [appState.status, clientPool.state]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{height: '100%'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>
          <View style={styles.body}>
            {clientPool.state.clientPool[ClientType.webApp].length === 0 ? (
              <Text>Web app is not connected. Waiting...</Text>
            ) : (
              <Text>Transmitting data.</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    marginTop: 40,
  },
});
