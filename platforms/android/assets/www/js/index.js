/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
				window.localStorage.setItem("model", device.model);    
					console.log("JS Device Model : " + device.model);
				 window.localStorage.setItem("platform", device.platform);
					console.log("JS Device Platform : " + device.platform);
				 window.localStorage.setItem("uniqueid", device.uuid);
					console.log("JS Device Unique Id : " + device.uuid);
				 window.localStorage.setItem("version", device.version);
					console.log("JS Device Version : " + device.version);

        //Replace UA-XXXXXX-YY with your tracking ID UA-110368353-1
			    window.ga.startTrackerWithId('UA-110368353-1');
				window.ga.trackView('IndusHome')
				window.ga.trackEvent('IndusHome', 'DeviceReady', 'Hits', 1);
				
		//Push notification
		
			FCMPlugin.getToken(
			  function (token) {
				  console.log("FCM Token: " + token);
					  // cordova.plugins.email.open({
						  // to: 'indus.sayalii@gmail.com',
						  // subject: 'FCM token',
						  // body: token
					  // });
			  },
			  function (err) {
				  console.log("FCM Error: " + 'error retrieving token: ' + err);
			  }
			);
			
			FCMPlugin.onNotification(
			  function (data) {
				  console.log("FCM Notify: " + JSON.stringify(data));
				  if (data.wasTapped) {
					  //Notification was received on device tray and tapped by the user. 
					  console.log("FCM Wrapped Notify: " + JSON.stringify(data));
				  } else {
					  //Notification was received in foreground. Maybe the user needs to be notified. 
					  console.log("FCM Notify: " + JSON.stringify(data));
				  }
			  },
			  function (msg) {
				 console.log("FCM Msg: " + 'onNotification callback successfully registered: ' + msg);
			  },
			  function (err) {
				  console.log("FCM Error: " + 'Error registering onNotification callback: ' + err);
			  }
			);
			
    }
};

app.initialize();