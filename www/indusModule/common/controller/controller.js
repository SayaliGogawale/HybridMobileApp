app.controller("homeController", function($scope, $state) {
	// var deviceWindow = window.localStorage.getItem("device_token");
	// console.log("FCM WINDOW : " + deviceWindow);
    $scope.loginPage = function() {
		console.log("HomePage" );
        $state.go("login");
    };

	$scope.getFacebookPage = function(){
		$state.go("facebook");
	};
	
	$scope.getIndusitePaymentPage = function(){
		$state.go("indusites");
	};
	
	$scope.makeAPhoneCall =function(){
		window.location.href = 'tel:0-90490-33333';
	};
	
	$scope.comboOfferHomePage =function(){
		$state.go("comboHome");         
		};

});

function allTitleCase(Str){
	return Str.replace(/\w\S*/g, 
	function(tStr){
	return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
 });
}

app.controller("loginController", [
    "$scope",
    "$state",
    "$http",
    "profileDataService",
	"$mdDialog",
	"environmentPointingService",
    function($scope, $state, $http, profileDataService,$mdDialog,environmentPointingService) {
	// window.ga.trackView('Login Page');
	var serverUrl = environmentPointingService.getEnvUrl();
	console.log("Server Environment : " + serverUrl);
        $scope.signPage = function() { 	
		$scope.prograssing = true;
		
            var username = $scope.loginName;
            var passwords = $scope.loginPassword;
			console.log("Password : " + passwords);		
			console.log("Username : " + username);
			  $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'username='+username+'&password='+passwords,
					url : serverUrl + "LoginApi.html",
            }).success(function (data, status, headers, config) 
		    {	
			$scope.prograssing = false;       		
				var getPassword = window.localStorage.getItem("password");		
					if(!(data == 'Failure'))
						{
							console.log("LoginPAge : " + data); 
							for(i in data){
							$state.go("dashBord");			 
							profileDataService.setSelectedData(data);		
							window.localStorage.setItem("userId", data[i].memberID);							
							window.localStorage.setItem("password", passwords); 
							var result = allTitleCase(data[i].firstName);
							window.localStorage.setItem("username", result);
							window.localStorage.setItem("address", data[i].memberAdd1 + " " + data[i].memberAdd2);
							window.localStorage.setItem("city", data[i].memCity);
							//window.localStorage.setItem("cell", data[i].memCellPhone);
							// window.localStorage.setItem("cell", "3423423254352");
							window.localStorage.setItem("email", data[i].memEmail);
							window.localStorage.setItem("role", data[i].userRole);
							window.localStorage.setItem("joindate", data[i].memJoinDate);
						}
					}
					else{
						console.log("LoginPAge : " + data); 
							if(username == ""){
								alert = $mdDialog.alert()
								.content('Please enter Username.')
								.ok('Close');
								$mdDialog.show( alert )
							}
							else if(passwords == ""){
								alert = $mdDialog.alert()
								.content('Please enter Password.')
								.ok('Close');
								$mdDialog.show( alert )
							}else{
								alert = $mdDialog.alert()
								.title('Error, ')
								.content('Please enter correct Indusite ID/Password')
								.ok('Close');
								$mdDialog.show( alert )
							}
						}
				
					 
            }).error(function (data, status, headers, config) {	
				console.log("LoginPAge : " + data); 
				$scope.prograssing = false;
				alert = $mdDialog.alert()
						.title('Error, ')
						.content('Server Error during login')
						.ok('Close');

					$mdDialog
						.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
			});
           
        }
		
		$scope.loginCancelButton = function(){
			 $state.go("index");
		}
		

    }
]);

app.controller("renewalIVPController",function($scope, $state, $http, profileDataService,$mdDialog,environmentPointingService) {
//	 window.ga.trackView('Renewal IVP Page');
	var serverUrl = environmentPointingService.getEnvUrl();
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//	

	$scope.renewalCalc = function(){
		 $state.go("renewalIncentiveCalculator");
	}
 
		var userId = window.localStorage.getItem("userId");
		console.log("Renewal : " + userId );
			  $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'memberId='+userId,

			  url: serverUrl + "RenewalIVPApi.html",
            }).success(function (data, status, headers, config) 
		    {	 	
				$scope.prograssing = false;			
				for(i in data){
					if(!(data == 'Failure'))
						{
							vm.renewalIvp = data;	
						}
					else{
						 alert = $mdDialog.alert()
						.title('Error, ')
						.content('No IVPs to display')
						.ok('Close');

					$mdDialog.show( alert )
						}
				}
					 
            }).error(function (data, status, headers, config) {
		   $scope.prograssing = false;
			   alert = $mdDialog.alert()
						.title('Error, ')
						.content('IVP status not available')
						.ok('Close');

					$mdDialog.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
			});

    }

);

app.controller("inboxMsgsController",function($scope, $state, $http, profileDataService,$mdDialog,environmentPointingService) {
	// window.ga.trackView('Inbox Page');
	var serverUrl = environmentPointingService.getEnvUrl();
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//	
		$scope.composeMsgClick = function(){
		 $state.go("composeMsg");
	}
		
		var userId = window.localStorage.getItem("userId");
			  $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'member='+userId,

				url : serverUrl + "PopulateInbox.html",
            }).success(function (data, status, headers, config) 
		    { 
					if(data == "Failure"){
						   alert = $mdDialog.alert()
							.content('No message to display.')
							.ok('Close');
						$mdDialog.show( alert )
					}else{
						$scope.prograssing = false;
						var a = data;
						// .replace(/(<([^>]+)>)/ig,"")
						vm.msgInboxData = data;		
					}
	
            }).error(function (data, status, headers, config) {
			   			$scope.prograssing = false;   
			   alert = $mdDialog.alert()
						.title('Error, ')
						.content('Msgs not available')
						.ok('Close');

					$mdDialog
						.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
			});

    }
);

app.filter('removeHTMLTags', function() {
	return function(text) {
		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
});

app.filter('newlines', function () {
    return function(text) {
        // return text.replace(/\"newLine\"/g, '<br/>');
		return text.replace(/<span class=\"newLine\">/g, '</br>');
    }
})
	
app.controller("centerLocatorController",function($scope, $state, $http,$mdDialog,profileDataService,$window,environmentPointingService) {
//	 window.ga.trackView('Center Locator Page');
	var serverUrl = environmentPointingService.getEnvUrl();
	//preloader();
	
	//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
$scope.titleVisibility = false;
$scope.mapVisibility = false;
	var cityCodeId ="";
    GetStates();
	var vm = this;
    // $scope.setSemtrnSrch = function() 
    // { 
//reset function call
 reset();
		 GetStates();
    // }	
	function GetStates() {
		
		//preloader();
        $http({
               method: 'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					},

				url: serverUrl +"GetCentreDetailsState.html",
        }).success(function (data, status, headers, config) 
		{  
			

				// for(i in data){
					if(!(data == "Failure"))
						{
							// for (i in data)
							 // {					
								// var statesArray = new Array ();

								// $scope.states= data[i].stateDesc;				
								$scope.states= data;
								// statesArray = Object.keys(data);
								// $scope.states = statesArray;						 
							 // }
						}else{
						   alert = $mdDialog.alert()
						.title('Error, ')
						.content('No States available')
						.ok('Close');

					$mdDialog.show( alert )
						}
				// }
		}).error(function (data, status, headers, config) {
               // $scope.failure = true;
			 //  console.log("Center locator error function....")
			   			   alert = $mdDialog.alert()
						.title('Error, ')
						.content('Center locator error function....')
						.ok('Close');

					$mdDialog.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
        });
    }
	
	$scope.GetCities = function() {
	   // $scope.selectedCity = "";
	   resetOnStateChange();
	   
	   $scope.cities = $scope.selectedState;
	 $http({
               method: 'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'state='+$scope.cities,

					url: serverUrl +"GetCentreDetailsCity.html",
        }).success(function (data, status, headers, config) 
		{  
					if(!(data == '"Failure"'))
						{
							for(i in data){
								cityCodeId = data[i].cityCode;						
								$scope.cities= data;
							}
					
						}else{
						 alert = $mdDialog.alert()
						.title('Error, ')
						.content('Center locator error function....')
						.ok('Close');

					$mdDialog
						.show( alert )
						}

		}).error(function (data, status, headers, config) {
               // $scope.failure = true;
			  // console.log("Center locator error function....")
			   			alert = $mdDialog.alert()
						.title('Error, ')
						.content('No Cities to display')
						.ok('Close');

					$mdDialog
						.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
        });
    }
		
$scope.getCentersList = function (){
	$scope.titleVisibility = true;
	$scope.mapVisibility = false;
		var cityCode = $scope.selectedCity;

				$http({
					method: 'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					},					 
					data :'city='+cityCode,
					//data :'city='+$scope.detailedCityCode,

				url: serverUrl +"CentresListDetail.html",
				}).success(function (data, status, headers, config){ 					
					vm.centersListData = data;		
					// console.log("Center list success 2 : " + vm.centersListData);
				}).error(function (data, status, headers,config) {
				alert = $mdDialog.alert()
						.title('Error, ')
						.content('Center locator error function....')
						.ok('Close');

					$mdDialog
						.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
				});
			}
	
    function reset(){
           $scope.states = "";
	       $scope.cities = "";
	       $scope.selectedState = "";
	       $scope.selectedCity = "";	

        }

	function resetOnStateChange(){
		$scope.cities = "";
		$scope.selectedCity = "";	
		$scope.titleVisibility=false;
		$scope.mapVisibility = false;
	}
		
	$scope.showMapRoute = function(lati,longi){
		
		$scope.mapVisibility = true;
		//console.log("Lati : " + lati + "Longi : " + longi);		
		  $window.currentLatitude = lati;
		  $window.currentLongitude = longi;
				sampleFunction();
		}		
	
	function sampleFunction(){
		 var lati1 = $window.currentLatitude;
		   var longi1 = $window.currentLongitude;
		    var destLati = lati1;
	       var destLongi= longi1;
				if (navigator.geolocation) {	   
					navigator.geolocation.getCurrentPosition(function (p) {
					var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);				
					var mapBounds = new google.maps.LatLngBounds();
					var latitudes= destLati;
					var lonitudes= destLongi;
					//console.log("Final Values : " +  latitudes + "   " + lonitudes );
					showmap(LatLng);
					mapBounds.extend(LatLng);
					map.fitBounds(mapBounds);
			
					navigation(map,latitudes,lonitudes,LatLng);
		});
		
	function showmap(LatLng){
		                myOptions = {
						zoom:10,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: LatLng,
					 },
					map = new google.maps.Map(document.getElementById("dvMap"), myOptions),
					    marker = new google.maps.Marker({
							position: LatLng,
							map: map,
							animation:google.maps.Animation.BOUNCE
							});
				}
				
	function navigation(map,latitudes,lonitudes,LatLng){
					 // console.log("navigation() : " + latitudes + " " + lonitudes + " " + map);
					var current_postion =LatLng;
					// console.log("current Posi : " + current_postion);
					var dest =new google.maps.LatLng(latitudes,lonitudes);
					// console.log("Destination posi : " + dest);
					
					var directionsService = new google.maps.DirectionsService();
					var directionsDisplay = new google.maps.DirectionsRenderer();
							
							directionsDisplay.setMap(map);
					var request = {
							origin:current_postion, 
							destination:dest ,
							travelMode: google.maps.DirectionsTravelMode.DRIVING
					};
					// console.log("request : " + request);
					   directionsService.route(request, function(response, status) {
							   if (status == google.maps.DirectionsStatus.OK) {
								directionsDisplay.setDirections(response);
					}
					 });
        
        
				}	
			}else{
				alert = $mdDialog.alert()
						.title('Error, ')
						.content('Geo Location feature is not supported in this browser.')
						.ok('Close');

					$mdDialog.show( alert )
					// console.log('Geo Location feature is not supported in this browser.');		
				}
		}
		
    });


app.controller("dashBordController", function($scope, $state, $mdSidenav, profileDataService,$mdDialog) {
	//	 window.ga.trackView('DAshboard Page');
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
//********** **********//		
//********** Added call back function for navigation menu **********//
	 $scope.openLeftMenu();
	 $scope.records;
	 $scope.clickFun();
	 $scope.openRightMenu();
	// $scope.getTrainingSeminar(); 
	// Removed openLeftMenu function and added in app.js folder
	// Removed all $scope.onItemClickNavigation() function and added in app.js folder
	//********** Previously here $scope.records () was there which is now moved to app.js folder 
	//********** Previously here $scope.clickFun () was there which is now moved to app.js folder 	

//********************//
    $scope.newSale = function() {
       console.log("New sale from home page ")
    };
});

app.controller("composeMsgController",function($scope, $state, $http,$mdDialog,profileDataService,environmentPointingService) {
//	 window.ga.trackView('Compose Message Page');
	var serverUrl = environmentPointingService.getEnvUrl();
 	var userId = window.localStorage.getItem("userId");
		//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	// $scope.headerTitle = "Seminar and Training";
	//$scope.prograssing = true;
//********** **********//
				$scope.formData = {};

				$scope.formData = { member: userId };	
				$scope.processForm = function() {

					$http({
						method: 'POST',
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
						},		
						data :$.param($scope.formData),				

						url: serverUrl+"message.html",
					
					}).success(function (data, status, headers, config) 
					{ 	
				//	$scope.prograssing = false;
						  if(data=="INVALIDMEMBERID")
						 {	
							 alert = $mdDialog.alert()
							.title('Error, ')
							.content('Enter a valid Member Id')
							.ok('Close');

							$mdDialog.show( alert )
						 }
						 else{
								alert = $mdDialog.alert()
								.title('Error, ')
								.content('Message sent sucessfully')
								.ok('Close');
								$mdDialog.show( alert )
						   }	
						        $scope.formData = {};
						   $scope.formValidation.$setPristine();
						  // $scope.formData = '';
					}).error(function (data, status, headers, config) {
			//			$scope.prograssing = false;
					   	alert = $mdDialog.alert()
						.title('Error, ')
						.content('Msgs not available')
						.ok('Close');
						$mdDialog.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });
					});
				};
				// $scope.formData = '';
				// $scope.formValidation.$setPristine();  
    });

app.controller("userAppointmentController",function($scope, $state, $http,$mdDialog,profileDataService,environmentPointingService) {
	// window.ga.trackView('Appointment Page');
	var serverUrl = environmentPointingService.getEnvUrl();
		//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//	
		var userId = window.localStorage.getItem("userId");
	
		    //This will hide the DIV by default.
            $scope.IsVisible = false;
		
			  $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'member='+userId,

				url : serverUrl + "Appointment.html",
            }).success(function (data, status, headers, config) 
		    { 
			$scope.prograssing = false;
			//default view is hidden
			//If response is failure then hide the appointment table orelse display it
			
				var ternaryCondition = data=="Failure" ? $scope.IsVisible :  !$scope.IsVisible ;
				$scope.IsVisible = ternaryCondition;
				
				// console.log("TernaryConditions : " + ternaryCondition + " Ternary View : " + $scope.IsVisible);
					if(!(data == 'Failure'))
						{
							 vm.appointmentData = data;					
						}
					else{	
							var  confirmDialogValue = $mdDialog.alert()
							.content('No pending appointmentsssssss	.')
							.ok('Close');

							$mdDialog.show(confirmDialogValue).then(function() {
								// Redirect to dashboard page
								$state.go("dashBord");
								$mdDialog.hide();
							}, function() {
							  // Do nothing
							});				
						}

            }).error(function (data, status, headers, config) {
				//Hide View if it's server error
				$scope.prograssing = false;
				$scope.IsVisible = false;
  
			   // console.log("Server error occured. Please retry : " + data);	
					
					    alert = $mdDialog.alert()
						.title('Error, ')
						.content('Server error occured. Please retry.')
						.ok('Close');

					$mdDialog.show( alert );
						// .finally(function() {
							// alert = undefined;
						// });			   
			});

});

app.controller("renewalDistributorshipController", function($scope, $sce,profileDataService) {
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");
  
    var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "RENEWAL" + '&version=' + "4";

	$scope.iframeTitle = "Renewal Distributorship";
	
	$scope.trustSrc = function(src) {
	return $sce.trustAsResourceUrl(src);
	}
	//$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("exclusiveHospitalisationController", function($scope, $sce,profileDataService) {
	//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "HEALTHCARE_CHECKUP" + '&version=' + "4";
	
	$scope.iframeTitle = "Exclusive Hospitalization";
	
	$scope.trustSrc = function(src) {
	return $sce.trustAsResourceUrl(src);
	}
//	$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("renewalCheckupController", function($scope, $sce,profileDataService) {
	//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "RENEWAL_CHECKUP" + '&version=' + "4";

	$scope.iframeTitle = "Renewal Checkup";
	
	$scope.trustSrc = function(src) {
	return $sce.trustAsResourceUrl(src);
	}
	//$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("reportController", function($scope, $sce,profileDataService) {
	//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
//	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "dashboard" + '&version=' + "4";
	// console.log("Marketing Report : " + url);
	
	$scope.iframeTitle = "Report";
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
//	$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("newSaleController", function($scope, $sce,profileDataService) {
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
//	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "N" + '&version=' + "4";
	// console.log("New Sale : " + url);
	
	$scope.iframeTitle = "New Sale";
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	//$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("buyPacakgeController", function($scope, $sce,profileDataService) {
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "ADDON_PACKAGE" + '&version=' + "4";
	// console.log("New Sale : " + url);
	
	$scope.iframeTitle = "Buy Package";
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
//	$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("discountCouponController", function($scope, $sce,profileDataService) {
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
//	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = loginURL + '?u=' + uid + '&p=' + pwd + '&SaleType='+ "D" + '&version=' + "4";
	// console.log("New Sale : " + url);
	
	$scope.iframeTitle = "Discount Coupon";
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	//$scope.prograssing = false;
	$scope.renewal = {src:url};  
});

app.controller("comboOfferController", function($scope, $sce,profileDataService) {
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = "http://induslink.indushealthplus.com/IM/Offers.aspx?Member=Y";
	// console.log("Combo Offer : " + url);
	
	$scope.iframeTitle = "Combo Offer";
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	$scope.renewal = {src:url};  
		 //$scope.prograssing = false;
});

app.controller("comboHomePage", function($scope, $sce,profileDataService) {
"Seminar and Training";
//********** **********//
//$scope.prograssing = true;
	var loginURL = 'http://www.indusites.com/app/login.html';
	uid = window.localStorage.getItem("userId");
	pwd = window.localStorage.getItem("password");

	var url = "http://induslink.indushealthplus.com/IM/Offers.aspx?Member=Y";
	// console.log("Combo Offer : " + url);
	
	$scope.iframeTitle = "Combo Offer";
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	//$scope.prograssing = false;
	$scope.renewal = {src:url};  
});


app.controller("feedbackController",function($scope, $state, $http,$mdDialog,profileDataService,environmentPointingService) {
	// window.ga.trackView('Feedback Page');
	var serverUrl = environmentPointingService.getEnvUrl();
 	var userId = window.localStorage.getItem("userId");
	//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
				$scope.formData = {};
				$scope.formData = {feedtype:"FEEDBACK",member: userId  };
			
				$scope.processFeedbackForm = function(isValid) {
				
				// if(isValid){
					// console.log("if isValid : " + isValid);
				// }else{
					// console.log("else isValid : " + isValid);
				// };
				
					$http({
						method: 'POST',
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
						},		
						data :$.param($scope.formData),				

					url : serverUrl+ "feed.html",
					}).success(function (data, status, headers, config) 
					{
//$scope.prograssing = false;						
						// console.log("Feedback success function : " + data);
						// These 2 lines are for to set back the fields in formData null
						   $scope.formData = {};
						   $scope.feedbackFormValidation.$setPristine();
						   
					}).error(function (data, status, headers, config) {
					//	$scope.prograssing = false;
					   // console.log("Feedback error : " + data);
					   alert = $mdDialog.alert()
						.title('Error, ')
						.content('Error during submitting feedback')
						.ok('Close');

					$mdDialog.show( alert )
					});
				};

				// $scope.formData = '';
				// $scope.formValidation.$setPristine();
	   
    });

	
app.controller("incentiveController",function($scope, $state, $http, profileDataService,$mdMedia,environmentPointingService) {
//**************************************
 //window.ga.trackView('Incentive Page');
	
	 $scope.isLoading = true;
	  
  // angular.element($window).bind("resize", function() {
    // resizeProgress();
    // $scope.$apply();
 	// });
  
  // function resizeProgress () {
     // if ($mdMedia("gt-xs")) {
        // $scope.diameter = 200;
      // }
      // else if ($mdMedia("xs")) {
        // $scope.diameter = 100;
      // }
  // }

//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()

var serverUrl = environmentPointingService.getEnvUrl();
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//
		var userId = window.localStorage.getItem("userId");
	
			  $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'memberId='+userId,

			  url : serverUrl + "FetchMemberIncentive",	  
            }).success(function (data, status, headers, config) 
		    {	 	 
			$scope.prograssing = false;
				  $scope.isLoading = false;
					if(!(data == 'Failure'))
						{
							
								$scope.firstColStrtDate = data[0].fromdate; 
								$scope.firstColEndDate = data[0].todate; 
							
								$scope.secndColStrtDate = data[1].fromdate; 
								$scope.secndColEndDate = data[1].todate; 
							
								$scope.frshincenfirst = data[0].freshincentive; 
								$scope.frshincensec = data[1].freshincentive; 

								$scope.renwincenfirst = data[0].renewincentive; 
								$scope.renwincensec = data[1].renewincentive; 

								$scope.directincenfirst = data[0].directincentive; 
								$scope.directincensec = data[1].directincentive; 

								$scope.timeincenfirst = data[0].timeincentive; 
								$scope.timeincensec = data[1].timeincentive; 

								$scope.totincenfirst = data[0].totalincentive; 
								console.log("God help me: " + data[0].totalincentive);
								console.log("God help me 2 : " + $scope.totincenfirst);
								$scope.totincensec = data[1].totalincentive; 	
								
								$scope.netincenfirst = data[0].netpaid; 
								$scope.netincensec = data[1].netpaid; 									
						}
					else{	
					   $scope.isLoading = false;
						alert = $mdDialog.alert()
						.title('Error, ')
						.content('Failure Incentive')
						.ok('Close');

					$mdDialog.show( alert )
						}
				
					 
            }).error(function (data, status, headers, config) {
				$scope.prograssing = false;
				  $scope.isLoading = false;
			   alert = $mdDialog.alert()
						.title('Error, ')
						.content('Error Function for Incentive')
						.ok('Close');

					$mdDialog.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });	
			});

    });	

app.controller("myIVPController", function($scope, $state, $http, $mdSidenav,profileDataService,environmentPointingService) {
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
 //window.ga.trackView('My IVP Page');
var serverUrl = environmentPointingService.getEnvUrl();
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	// $scope.headerTitle = "Seminar and Training";
	
			$scope.prograssing = true;
	
//********** **********//
	$scope.myIVPCalc = function(){
		 $state.go("incentiveCalculator");
	}
		var userId = window.localStorage.getItem("userId");
		
		console.log("MyIVP Controller : " + userId);
			  $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'memberId='+userId+'&version='+"4",

			  url : serverUrl + "MemberIVPServletNew.html",		
            }).success(function (data, status, headers, config) 
		    {	
					$scope.prograssing = false;
				for(i in data){
					if(!(data == 'Failure'))
						{
							vm.myIvp = data;	 	 							
						}
					else{
						
						alert = $mdDialog.alert()
						.title('Error, ')
						.content('Failure My IVPs ')
						.ok('Close');

					$mdDialog
						.show( alert )
						}
				}
					 
            }).error(function (data, status, headers, config) {

					$scope.prograssing = false;
			    alert = $mdDialog.alert()
						.title('Error, ')
						.content('IVP status not available')
						.ok('Close');

					$mdDialog
						.show( alert )
						// .finally(function() {
							// alert = undefined;
						// });	
			});

    }
);	
	
app.controller("renewalCalculator",function($scope, $state, $http,$mdDialog,profileDataService,environmentPointingService) {
	//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	var serverUrl = environmentPointingService.getEnvUrl();
	//$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
//********** **********//

		$scope.renewCalculation = function(){
		
		var userId = window.localStorage.getItem("userId");

		var leftValue = $scope.editIVPLeft;
		var rightValue = $scope.editIVPRight;
		var stepValue = $scope.editStepLeft;
		
		// if($scope.editIVPLeft == ''& $scope.editIVPRigh == '' & $scope.editStepLeft ==''){
			// console.log("data not filled");
		// }else{
			// console.log("data  filled");
		// }
				$http({
						method: 'POST',
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
						},		
				data :  'member='+userId+
								'&ivps_left='+leftValue+
								'&ivps_right='+rightValue+
								'&step='+stepValue,		

					url : serverUrl + "incentiveRenewalCaclulator.html",		
					  }).success(function (data, status, headers, config) 
					  { 	
					//  $scope.prograssing = false;
						  if(data=="Failure")
						 {	
							alert = $mdDialog.alert()
							.content('No Data to display')
							.ok('Ok');
							$mdDialog.show( alert );
							
							document.getElementById("dispAdjustedIVPLeft").innerHTML = "-";
							document.getElementById("dispAdjustedIVPRight").innerHTML ="-";
							document.getElementById("dispIncentiveLeft").innerHTML = "-";
							document.getElementById("dispNextStepLeft").innerHTML = "-";
							document.getElementById("dispClosingLeft").innerHTML = "-";
							document.getElementById("dispClosingRight").innerHTML = "-";
							
						 }else{
							document.getElementById("dispAdjustedIVPLeft").innerHTML = data['Adjusted Left'];;
							document.getElementById("dispAdjustedIVPRight").innerHTML =data['Adjusted Right'];
							document.getElementById("dispIncentiveLeft").innerHTML = data['Total Incentive'];
							document.getElementById("dispNextStepLeft").innerHTML = data['Next Step'];
							document.getElementById("dispClosingLeft").innerHTML = data['Closing Right IVPs'];
							document.getElementById("dispClosingRight").innerHTML = data['Closing Left IVPs'];
						 }	

					}).error(function (data, status, headers, config) {
					//		$scope.prograssing = false;						
					   	alert = $mdDialog.alert()
						.content('Server error occured. Please retry.')
						.ok('Close');
						$mdDialog.show( alert );
					});
	};
	   
    });
	
	
app.controller("incentiveCalculator",function($scope, $state, $http,$mdDialog,environmentPointingService) {
	//$scope.prograssing = true;
		$scope.ivpCalculation = function(){
			var serverUrl = environmentPointingService.getEnvUrl();
		var vm = this;
			var userId = window.localStorage.getItem("userId");

			var leftValue = $scope.editIncentiveIVPLeft;
			var rightValue = $scope.editIncentiveIVPRight;
			var stepValue = $scope.editIncentiveStepLeft;
			
			// console.log("Left Value is : " + leftValue);
			// console.log("Right Value is : " + rightValue);
			// console.log("Step Value is : " + stepValue);
			
					$http({
							method: 'POST',
							headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
							},		
					data :  'member='+userId+
									'&ivps_left='+leftValue+
									'&ivps_right='+rightValue+
									'&step='+stepValue,		

						url : serverUrl + "incentiveCaclulator.html",		
						  }).success(function (data, status, headers, config) 
						  { 	
					//	  $scope.prograssing = false;
							  if(data=="Failure")
							 {	
								alert = $mdDialog.alert()
								.content('No Data to display')
								.ok('Ok');
								$mdDialog.show( alert );
								
								document.getElementById("dispIncentiveAdjustedIVPLeft").innerHTML = "-";
								document.getElementById("dispIncentiveAdjustedIVPRight").innerHTML ="-";
								document.getElementById("dispIncenLeft").innerHTML = "-";
								document.getElementById("dispIncentiveNextStepLeft").innerHTML = "-";
								document.getElementById("dispIncentiveClosingLeft").innerHTML = "-";
								document.getElementById("dispIncentiveClosingRight").innerHTML = "-";
								
							 }else{
								 
								 // vm.incentiveCalcData = data;
								document.getElementById("dispIncentiveAdjustedIVPLeft").innerHTML = data['Adjusted Left'];;
								document.getElementById("dispIncentiveAdjustedIVPRight").innerHTML =data['Adjusted Right'];
								document.getElementById("dispIncenLeft").innerHTML = data['Total Incentive'];
								document.getElementById("dispIncentiveNextStepLeft").innerHTML = data['Next Step'];
								document.getElementById("dispIncentiveClosingLeft").innerHTML = data['Closing Right IVPs'];
								document.getElementById("dispIncentiveClosingRight").innerHTML = data['Closing Left IVPs'];
							 }	

						}).error(function (data, status, headers, config) {
						//	$scope.prograssing = false;
							 alert = $mdDialog.alert()
							.content('Error function ')
							.ok('Close');
							$mdDialog.show( alert );
						});
	};
	   
    });
	
app.controller("feedbController", function($scope, $state) {});

app.controller("demoController", function($scope, $state) {});

app.controller("semtrnCntrl",function($scope, $state, $http,profileDataService,$mdDialog,environmentPointingService) {
	// window.ga.trackView('Seminar-Training Page');
		var serverUrl = environmentPointingService.getEnvUrl();
//********** Common accesing functionality for Profile module **********//	
//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	// $scope.headerTitle = "Seminar and Training";
//********** **********//		
	
	  $scope.value="";

	$scope.trndataview=false;
    $scope.semdataview=false;
    $scope.setSemtrnSrch = function() 
    { 
        reset();
		GetStates();
        $scope.trndataview=false;
	    $scope.semdataview=false;		
    }
	
	 $scope.load = function() {
		  $scope.value="sem";
		 GetStates();
     }
	
	
	function GetStates() {
		// console.log("host : "+host);
		//preloader();
        $http({
                method: 'POST',				
				headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
				 data: 'eventType='+$scope.value,

		url : serverUrl + "FetchSeminarTrainingData",		
        }).success(function (data, status, headers, config) 
		{  
		// console.log("host : "+host);
		var scopeParameter = $scope.value;
				if(!(data == "Failure"))
				{
					 $scope.statesCities = data.StateCities;
					 $scope.states = Object.keys(data.StateCities);
				}else{
					if($scope.value=="sem")
						{
						 var  noSemDialog = $mdDialog.alert()
									.content('No seminars found.')
									.ok('Ok');
						$mdDialog.show(noSemDialog).then(function() {
										// Do nothing
									}, function() {
									  // Do nothing
									});				 
						}
				else{		  
						 var  noTrnDialog = $mdDialog.alert()
									.content('No trainings found.')
									.ok('Ok');
						$mdDialog.show(noTrnDialog).then(function() {
										// Do nothing
									}, function() {
									  // Do nothing
									});	
						}
					
				}
		}).error(function (data, status, headers, config) {
                $scope.failure = true;
        });
    }
	$scope.GetCities = function() 
    {
	   $scope.selectedCity = "";
	   $scope.cities = $scope.statesCities[$scope.selectedState];
    }
	$scope.GetDetails = function () 
	{

		if(!$scope.selectedState)
		{
		   var  selectStateDialog = $mdDialog.alert()
							.content('Please select State.')
							.ok('Ok');
				$mdDialog.show(selectStateDialog).then(function() {
								// Do nothing
							}, function() {
							  // Do nothing
							});				   
		}
		else if(!$scope.selectedCity)
		{
	   		   var  selectCityDialog = $mdDialog.alert()
							.content('Please select City.')
							.ok('Ok');
				$mdDialog.show(selectCityDialog).then(function() {
								// Do nothing
							}, function() {
							  // Do nothing
							});	
		}
		else
		{
		    if($scope.value=="sem")
		    {
		       GetSemdata();
		    }
		    else
		    {
	           GetTrndata();
		    }
		}
    }
 function GetSemdata() 
	{
		//preloader();
        $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'state='+$scope.selectedState+'&city='+$scope.selectedCity,

                url : serverUrl + "SeminarSearch.html",
            }).success(function (data, status, headers, config) 
		    {
				
		        $scope.response = data;
			    $scope.semdataview=true;
			    $scope.trndataview=false;
			// $('div.content1').unblock(); 
            }).error(function (data, status, headers, config) {
				
                $scope.message = 'Unexpected Error';
			});
	} 
    function GetTrndata() 
	{
		//preloader();	
	    $http({
                method: 'POST',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'state='+$scope.selectedState+'&city='+$scope.selectedCity,

				url : serverUrl + "TrainingSearch.html",
            }).success(function (data, status, headers, config) 
		    {
			    $scope.response = data;
				$scope.semdataview=false;
				$scope.trndataview=true;
		//	$('div.content1').unblock(); 
		    }).error(function (data, status, headers, config) {
                $scope.message = 'Unexpected Error';
			});
	}  
	
        function reset() 
        {
           $scope.states = "";
	       $scope.cities = "";
	       $scope.selectedState = "";
	       $scope.selectedCity = "";	
        }
		$scope.draftShareSemData = function(mDate,mTime,mType,mVenue,mLocation){
			console.log("Sem-Trn Data : " + mDate + ", " + mTime + ", " + mType + ", " + mVenue + ", " + mLocation + ".");
			var sharetext="Hi,\n"+"You are invited for " +mType+ " on " +mDate+ " at " +mTime+ " in " +mVenue+ ","+mLocation+".\nSee you there!!!\n" + window.localStorage.getItem("username")+"\nIndus Health Plus";
			console.log("Sem-Trn Msg : " + sharetext);
			window.plugins.socialsharing.share(sharetext,'Seminars & Trainings  Invitation');
		}
	    });

	
app.controller("eventController", function($scope,$state,profileDataService,$http,environmentPointingService) {
	// window.ga.trackView('Events Page');
		var serverUrl = environmentPointingService.getEnvUrl();
		var currentimageurl = "";
		var eventArray = [];
	
	//********** Common accesing functionality for Profile module **********//	
		//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
	$scope.titleForUpdate= "Events";
	$scope.titleSubHeader="Latest Happenings";
	//********** **********//
			$http({
                method: 'GET',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },

				url : serverUrl + "getSliderEvent.html",
            }).success(function (response, status, headers, config) 
		    {	
				$scope.prograssing = false;
				for ( var str in response) {
						console.log("EventLog 0 : " + str);
						eventArray.push(str);
				}
				 $scope.slides = eventArray;	
            }).error(function (data, status, headers, config) {
			$scope.prograssing = false;
				alert = $mdDialog.alert()
							.content('Event Data Failure Function')
							.ok('Close');
							$mdDialog.show( alert );
				
			});
			
			$scope.viewButtonClick = function(){
				$state.go("indusitesConference");
			};
			
			//dynamically take img url n send it
			$scope.shareButtonClick = function(type){
				console.log("Type of : " + type );
				 if (type == "activity") {
					window.plugins.socialsharing.share('Shared from Indusites Mobile app','activity', "http://www.indusites.com/app/assets/img/leaflets/target-2.jpg", null);
				 }
			};

});	
		
app.controller("targetController", function($scope,$state,profileDataService,$http,environmentPointingService) {
	// window.ga.trackView('Targets/Offers Page');
	var serverUrl = environmentPointingService.getEnvUrl();
	var currentimageurl = "";
	var targetArray = [];	
	//********** Common accesing functionality for Profile module **********//	
		//inject profileDataService in function()
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	$scope.prograssing = true;
	// $scope.headerTitle = "Seminar and Training";
	$scope.titleForUpdate= "Targets/Offers";
	$scope.titleSubHeader="Achiever's Target's";
	//********** **********//
			$http({
                method: 'GET',
			    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },

				url : serverUrl + "imageloadactivity",
            }).success(function (response, status, headers, config) 
		    {	
				$scope.prograssing = false;
				for ( var str in response) {
						console.log("EventLog 0 : " + str);
						targetArray.push(str);
				}
				 $scope.slides = targetArray;	
										
            }).error(function (data, status, headers, config) {
			$scope.prograssing = false;
				alert = $mdDialog.alert()
							.content('Event Data Failure Function')
							.ok('Close');
							$mdDialog.show( alert );
				
			});
			
			$scope.viewButtonClick = function(){
				$state.go("indusitesConference");
			};
			
			//dynamically take img url n send it
			$scope.shareButtonClickTarget = function(type){
				console.log("Type of : " + type );
				 if (type == "target") {
					window.plugins.socialsharing.share('Shared from Indusites Mobile app','target', "http://www.indusites.com/app/assets/img/leaflets/target-2.jpg", null);
				 }
			};
});
		
		
app.directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            
            var clean = val.replace(/[^-0-9\.]/g, '');
            var negativeCheck = clean.split('-');
			var decimalCheck = clean.split('.');
            if(!angular.isUndefined(negativeCheck[1])) {
                negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                clean =negativeCheck[0] + '-' + negativeCheck[1];
                if(negativeCheck[0].length > 0) {
                	clean =negativeCheck[0];
                }
                
            }
              
            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });
		
app.controller("profileController", function($scope, $state,profileDataService) {
	var vm = this;
	vm.profileData = profileDataService.getSelectedData();	
	
});			
		



		
		
		
		
		
		
		
		