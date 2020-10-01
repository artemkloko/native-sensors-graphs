#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd ${DIR}/socket-server && yarn
cd ${DIR}/web-app && yarn
cd ${DIR}/sensors-module && yarn && rm -rf node_modules
cd ${DIR}/client && yarn
