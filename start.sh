#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

devices=$(adb devices | awk 'NR>1 {print $1}')

if [ $(wc -l <<< "$devices") != "1" ]; then
  echo "Unfortunatelly this script supports only one adb connected device :("
  echo "Please have only one physical Android device connected with adb and retry."
  exit 1
fi

adb reverse tcp:4000 tcp:4000

(trap 'kill 0' SIGINT; \
    cd ${DIR}/socket-server && yarn start & \
    cd ${DIR}/web-app && yarn start & \
    ( \
        cd ${DIR}/client && yarn android & \
        cd ${DIR}/client && yarn start \
    ) \
)
