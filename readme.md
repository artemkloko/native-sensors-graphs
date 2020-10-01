# native-sensors-graphs

This an example implementation of a basic react native module that reads acceleration sensor data. 

When the whole project is up and running you can see the acceleration sensor data produced by the smartphone in a browser real time. 

The communication of the clients is done with websockets.

## Layout of the project

`sensors-module` - a react native module that reads the acceleration sensor data

`client` - a react native mobile app that utilizes the `sensors-module` and transmits that data to the `socker-server`

`socket-server` - a websocket server that receives the acceleration sensor data and re-trasmits it to the rest of the connected clients

`web-app` - a react app that listens to `socket-server` for acceleration sensor data and displays it by utilizing `<canvas />`

## Device support

Only the Android version is implemented. Also it is implemented in a very basic manner because of lack of time.

## Prerequisites

Android device connected to localhost and setup to work with `adb`

Free ports on localhost: `4000`, `3000`, `8081`.

## Prepare the stack

```
./prepare.sh
```

## Start the stack:

```
./start.sh
```

## Use it

By now you should get the "native sensors graphs client" mobile app opened automatically on your Android device.

Also a browser window pointing to `http://localhost:3000/` should have been opened automatically.

Press "START MONITORING" in the "native sensors graphs client" mobile app.

You should see 3 graphical bars scaling up and down in the browser window.
