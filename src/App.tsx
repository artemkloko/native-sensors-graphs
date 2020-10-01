import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import {useSensors} from 'sensors-module';
import {useSocket} from './services/socket';

export const App = () => {
  const socket = useSocket();
  const {register, unregister} = useSensors((event) => {
    socket.send(event);
  });

  useEffect(() => {
    
    return unregister;
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{height: '100%'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <Button title={'START MONITORING'} onPress={register} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="STOP MONITORING" onPress={unregister} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    marginTop: 40,
  },
});
