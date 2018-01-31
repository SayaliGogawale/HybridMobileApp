var app = angular.module('app', ["ui.router", "ngMaterial","ui.bootstrap","angularSpinkit","ui.swiper"])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('index', {
                url: "",
                templateUrl: "indusModule/common/template/home.html",
                controller: "homeController",
                controllerAs: "first"
            })
            .state('login', {
                url: "login",
                templateUrl: "indusModule/common/template/login.html",
                controller: "loginController"
            })
            .state('dashBord', {
                url: "dashBord",
                templateUrl: "indusModule/common/template/dashBord.html",
                controller: "dashBordController"
            })
            .state('demo', {
                url: "demo",
                templateUrl: "indusModule/common/template/demo.html",
                controller: "demoController"
            })
			.state('renewalIVP', {
                url: "renewalIVP",
                templateUrl: "indusModule/common/template/renewalDivIVP.html",
                controller: "renewalIVPController"
            })
			.state('centerLocator', {
                url: "centerLocator",
                templateUrl: "indusModule/common/template/centerLocator.html",
                controller: "centerLocatorController"
            })
			.state('seminarTraining', {
                url: "seminarTraining",
                templateUrl: "indusModule/common/template/sem-trn.html",
                controller: "semtrnCntrl"
            })
			.state('inboxMsg', {
                url: "inboxMsg",
                templateUrl: "indusModule/common/template/inboxMsgs.html",
                controller: "inboxMsgsController"
            })
			.state('composeMsg', {
                url: "composeMsg",
                templateUrl: "indusModule/common/template/message.html",
                controller: "composeMsgController"
            })
			.state('userAppointments', {
                url: "userAppointments",
                templateUrl: "indusModule/common/template/userAppointment.html",
                controller: "userAppointmentController"
            })
			.state('renewalDistribution', {
                url: "renewalDistribution",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "renewalDistributorshipController"
            })
			.state('exclusiveHospitalization', {
                url: "exclusiveHospitalization",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "exclusiveHospitalisationController"
            })	
			.state('renewalCheckup', {
                url: "renewalCheckup",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "renewalCheckupController"
            })	
			.state('feedback', {
                url: "feedback",
                templateUrl: "indusModule/common/template/feedback.html",
                controller: "feedbackController"
            })	
			.state('reportData', {
                url: "reportData",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "reportController"
            })
			// Then configure $stateChangeStart in your state & handle redirection part there.(See at last)		
			.state('facebook', {
                url: "https://www.facebook.com/beingindusites",
                external: true
            })
			.state('indusites', {
                url: "https://iconnect.indushealthplus.com/IHP/ISPG.jsp",
                external: true
            })
			.state('comboOffer', {
                url: "comboOffer",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "comboOfferController"
            })
			.state('newSale', {
                url: "newSale",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "newSaleController"
            })
			.state('buyPackage', {
                url: "buyPackage",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "buyPacakgeController"
            })
			.state('discountCoupon', {
                url: "discountCoupon",
                templateUrl: "indusModule/common/template/renewalIframe.html",
                controller: "discountCouponController"
            })
			.state('incentive', {
                url: "incentive",
                templateUrl: "indusModule/common/template/incentive.html",
                controller: "incentiveController"
            })
			.state('myIVPs', {
                url: "myIVPs",
                templateUrl: "indusModule/common/template/myIVPs.html",
                controller: "myIVPController"
            })
			.state('renewalIncentiveCalculator', {
                url: "renewalIncentiveCalculator",
                templateUrl: "indusModule/common/template/renewalCalculator.html",
                controller: "renewalCalculator"
            })
			.state('incentiveCalculator', {
                url: "incentiveCalculator",
                templateUrl: "indusModule/common/template/myIVPCalculator.html",
                controller: "incentiveCalculator"
            })
			.state('example', {
                url: "example",
                templateUrl: "indusModule/common/template/example.html",
                controller: "feedbController"
            })
			.state('eventM', {
                url: "eventM",
                templateUrl: "indusModule/common/template/sampleEvent.html",
                controller: "eventController"
            })
			.state('targetModule', {
                url: "targetModule",
                templateUrl: "indusModule/common/template/target.html",
                controller: "targetController"
            })
			.state('indusitesConference', {
                url: "http://www.indusites.com/conference.html",
                external: true
            })
			.state('comboHome', {
                url: "comboHome",
                templateUrl: "indusModule/common/template/comboIframe.html",
                controller: "comboHomePage"
            })
			;

    }])
	
app.run(function($rootScope,$mdSidenav,$state,$mdDialog,$location,$window) {

// Back button Functionality 

	$rootScope.goBackSimon = function() {
			console.log('Go Back SIMON.........');
			$state.go("dashBord");
	}
	$rootScope.goBackToLoginPage = function() {
			console.log('Go Back Login Page.........');
			$state.go("login");
	}
	// Common functionality for External Links :
	$rootScope.getExternalFacebookPage = function() {
			window.open('https://www.facebook.com/beingindusites', '_system');
	}
	
	$rootScope.getExternalIndusitesPage = function() {
			window.open('http://indusites.com/', '_system');
	}
	
	$rootScope.getExternalIPGPage = function() {
			window.open('https://iconnect.indushealthplus.com/IHP/ISPG.jsp', '_system');
	}
	
	// var history = [];

    // $rootScope.$on('$routeChangeSuccess', function() {
        // history.push($location.$$path);
    // });

    // $rootScope.goBackSimon = function () {
        // var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
		// console.log("History condition true : " + history.length );
		// console.log("Back button : " + prevUrl);
		// console.log("History : " + history);
        // $location.path(prevUrl);
    // };

// Navigation Menu Functionality
	$rootScope.openLeftMenu = function() {
			console.log('Navigation Menu Click..........');
			$mdSidenav('left').toggle();
	  }
	  $rootScope.openRightMenu = function() {
			$mdSidenav('right').toggle();
			console.log('Navigation Menu Right Click..........');
			$mdSidenav('right').toggle();
	  }
			
	$rootScope.records = [{
            "name": "Home",
            SubMenu: [{
                name: "Home",
                "icon": "home.png",
                "state": "home",
                "id": "1",
            }]
        },
        {
            "name": "Seminars & Trainings",
            SubMenu: [{
                name: "Seminar & Trainings",
                "icon": "account.png",
                "state": "SeminarAndTraining",
                "id": "2",

            }]
        },
        {
            "name": "My Account",
            SubMenu: [{
                    name: "My IVP",
                    icon: "ivp.png",
                    "state": "myIvp",
                    "id": "3",
                },
                {
                    name: "Renewal IVP",
                    icon: "ivp.png",
                    "state": "renewalIvp",
                    "id": "4",
                },
                {
                    name: "Incentive",
                    icon: "currency-inr.png",
                    "state": "incentive",
                    "id": "5",
                },
                {
                    name: "Appointment",
                    icon: "account-multiple.png",
                    "state": "appointment",
                    "id": "6",
                },
                {
                    name: "Inbox",
                    icon: "message-text-outline.png",
                    "state": "inbox",
                    "id": "7",
                },
                {
                    name: "Profile",
                    icon: "account-edit.png",
                    "state": "profile",
                    "id": "8",
                }
            ]
        },
        {
            "name": "Update",

            SubMenu: [{
                    name: "Event",
                    icon: "developer-board.png",
					 "id": "9",
                },
                {
                    name: "Target/ Offers",
                    icon: "message-video.png",
					 "id": "10",
                },
                {
                    name: "Centre Locator",
                    icon: "home-map-marker.png",
					 "id": "11",
					
                }
            ]
        },
        {
            "name": "Online Sale",

            SubMenu: [{
                    name: "Combo Offers",
                    icon: "sale.png",
					 "id": "12",
                },
                {
                    name: "New Sale",
                    icon: "cart-plus.png",
					 "id": "13",
                },
				{
                    name: "Buy Package",
                    icon: "cart-plus.png",
					 "id": "14",
                },
                {
                    name: "Discount Coupon",
                    icon: "Price Tag Filled-50.png",
					 "id": "15",
                }
            ]
        },
		{
            "name": "Renewal",

            SubMenu: [{
                    name: "Renewal Distributorship",
                    icon: "sale.png",
					 "id": "16",
                },
                {
                    name: "Exclusive Hospitalization",
                    icon: "cart-plus.png",
					 "id": "17",
                },
                {
                    name: "Renewal Checkup",
                    icon: "cart-outline.png",
					 "id": "18",
                },
				{
                    name: "Report",
                    icon: "cart-outline.png",
					 "id": "19",
                }
            ]
        },
        {
            "name": "Support",
            SubMenu: [{
                    name: "Feedback",
                    icon: "Feedback-48.png",
					 "id": "20",
                },
                {
                    name: "Call Us",
                    icon: "phone-classic.png",
					 "id": "21",
                },
                {
                    name: "Join Facebook",
                    icon: "facebook.png",
					 "id": "22",
                },
            ]
        },
        {
            "name": "Logout",

            SubMenu: [{
                name: "Logout",
                "icon": "lock-outline.png",
				 "id": "23",
            }]
        }
    ];
     
	console.log("App folder Record : ",$rootScope.records);
	 
	$rootScope.clickFun = function(city) {
		//var pageName =city.detail.page.name;
		//alert("Page Name : " + pageName);
		 $mdSidenav('left').toggle();
	        switch (city) {
            case '1':
				console.log("City : " + city);
                // $mdSidenav('left').toggle();
				$rootScope.getDashboard();
                break;
				
			case '2':
                $rootScope.getTrainingSeminar();
                break;
				
			case '3':
				$rootScope.myIVP();
				break;
				
			case '4':
				$rootScope.getUserRenewalIvp();
				break;
				
			case '5':
				$rootScope.getIncentive();
				break;
				
			case '6':
				$rootScope.getUserAppointments();
				break;
				
			case '7':
				$rootScope.populateMyInbox();
				break;
			
            case '8':
                 $rootScope.abc();
                break;
				
			case '9':
                 $rootScope.eventModule();
                break;
				
			case '10':
                 $rootScope.targetModule();
                break;
				
			case '11':
				$rootScope.centerLocator();
				break;
				
			case '12':
				$rootScope.comboOfferData();
				break;
				
			case '13':
				$rootScope.newSaleData();
				break;
				
			case '14':
				$rootScope.buyPackageData();
				break;
				
			case '15':
				$rootScope.discountCouponData();
				break;
				
			case '16':
				$rootScope.renewalDistributionData();
				break;
				
			case '17':
				$rootScope.exclusiveHospData();
				break;
				
			case '18':
				$rootScope.renewalCheckupData();
				break;
				
			case '19':
				$rootScope.reportData();
				break;
				
			case '20':
				$rootScope.feedbackForm();
				break;

			case '21':
				$rootScope.makeAPhoneCall();
				break
				
			case '22':
				$rootScope.getFacebookPage();
				break;
				
			case '23':
				$rootScope.showLogoutDialog();
				break;
				
            default:

        }
    };
	
	$rootScope.getTrainingSeminar = function(){
		$state.go("seminarTraining");
	};
	
	$rootScope.getDashboard = function(){
		$state.go("dashBord");
	};
	
	$rootScope.getUserAppointments = function(){
		$state.go("userAppointments");
	}
//**********************************************************
	$rootScope.myIVP =function(){
		$state.go("myIVPs");
	};
	
	$rootScope.centerLocator =function(){
		$state.go("centerLocator");
	};
	
	$rootScope.renewalDistributionData =function(){
		$state.go("renewalDistribution");
	};
	
	$rootScope.exclusiveHospData =function(){
		$state.go("exclusiveHospitalization");
	};
	
	$rootScope.renewalCheckupData =function(){
		$state.go("renewalCheckup");
	};
	
	$rootScope.reportData =function(){
		$state.go("reportData");
	};
	
	$rootScope.feedbackForm =function(){
		$state.go("feedback");
	};
	
	$rootScope.makeAPhoneCall =function(){
		window.location.href = 'tel:0-90490-33333';
	};
	
	$rootScope.comboOfferData =function(){
		$state.go("comboOffer");
	};
	
	$rootScope.newSaleData =function(){
		$state.go("newSale");
	};
	
	$rootScope.buyPackageData =function(){
		$state.go("buyPackage");
	};
	
	$rootScope.discountCouponData =function(){
		$state.go("discountCoupon");
	};
	
	$rootScope.getUserRenewalIvp = function(){	
		//var userId = window.localStorage.getItem("userId");
		//alert("Renewal : " + userId );
		$state.go("renewalIVP");
	};
	
	$rootScope.getIncentive = function(){	
		$state.go("incentive");
	};
	
	$rootScope.populateMyInbox = function(){	
		$state.go("inboxMsg");
	};
	
	$rootScope.eventModule = function(){	
		$state.go("eventM");
	};
	
	$rootScope.targetModule = function(){	
		$state.go("targetModule");
	};
	
	$rootScope.createMessage = function(){	
		$state.go("composeMsg");
	};
		
	$rootScope.getFacebookPage = function(){
		//$state.go("facebook");
		window.open('https://www.facebook.com/beingindusites', '_system');
	};
	
	$rootScope.getIndusitePaymentPage = function(){
		$state.go("indusites");
	};
			
	$rootScope.showLogoutDialog = function() {
		// window.localStorage.clear(); //try that 
		// window.location.replace("index.html");

		var confirmLogout = $mdDialog.confirm()
          .title('Logout')
          .textContent('Do you want to exit?')
          .ariaLabel('Lucky day')
          .ok('Ok')
          .cancel('Cancel');

			$mdDialog.show(confirmLogout).then(function() {
				window.localStorage.clear(); //try that 
				window.location.replace("index.html");
			}, function() {
			  // Do nothing
			});
		
		
    };
	
		
	$rootScope.comboOfferHomePage =function(){
		$state.go("comboHome");
	};
	
	$rootScope.demo = function() {
        $state.go("demo");
    };
	
	$rootScope.example = function() {
        $state.go("example");
    };

	$rootScope.abc = function() {
        $mdSidenav('right').toggle();
    };
//For adding external URL redirecion part is handled here
	$rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
          if (toState.external) {
            event.preventDefault(); 
            $window.open(toState.url, '_self');
          }
        });
//**********************************************************
//**********************************************************  
});

	
