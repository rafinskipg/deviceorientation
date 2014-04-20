Device Orientation
---------------

The device orientation events are useful for knowing what is the user doing with the device.
You can use them for developing games or creating motion patterns.

Here's a little example that can be tested on your device using cordova or other webview.

On Chrome you can enable devicerotation simulation.

###The deviceorientation event

````
window.addEventListener('deviceorientation',function(e){
  acceleration.x = e.gamma;
  acceleration.y = e.beta;
});
````

###Run the example on your device

````
cordova run android
````

[Further readign](http://stackoverflow.com/questions/153507/calculate-the-position-of-an-accelerating-body-after-a-certain-time)