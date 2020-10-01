package com.sensorsmodule

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.lang.Exception

class SensorsModuleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), SensorEventListener {

  private var context: ReactApplicationContext? = null
  private var sensorManager: SensorManager? = null
  private var accelerometer: Sensor? = null

  init {
    this.context = reactContext
    sensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    accelerometer = sensorManager!!.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
  }

  override fun getName(): String {
    return "SensorsModule"
  }

  private fun sendEvent(eventData: WritableMap) {
    try {
      context?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("onSensorChanged", eventData)
    } catch (e: Exception) {
      Log.e("ERROR", e.message.toString());
    }
  }

  // SensorEventListener methods

  override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
    // ctx?.getJSModule(RCTDeviceEventEmitter::class.java)?.emit("onAccuracyChanged", accuracy)
  }

  override fun onSensorChanged(event: SensorEvent?) {
    if (event !== null) {
      try {
        val values = Arguments.fromList(event.values.map { value -> value.toDouble() })
        val eventData = Arguments.createMap()
        eventData.putString("name", event.sensor.name)
        eventData.putArray("values", values)
        sendEvent(eventData)
      } catch (e: Exception) {
        Log.e("ERROR", e.message.toString());
      }
    }
  }

  // React native methods

  @ReactMethod
  fun ready(promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  fun register() {
    sensorManager!!.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_GAME)
  }

  @ReactMethod
  fun unregister() {
    sensorManager!!.unregisterListener(this)
  }
}
