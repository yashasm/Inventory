var inventoryApp = angular.module('inventoryApp', [ 'ngMaterial', 'ngAnimate',
		'ngAria', 'ngRoute' ])

inventoryApp.config(function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when('/', {
		templateUrl : 'views/chassis_tab.html'
	}).when('/drives', {
		templateUrl : 'views/drives.html'
	}).when('/management', {
		templateUrl : 'views/management.html'
	}).when('/controller', {
		templateUrl : 'views/controller.html'
	}).when('/add', {
		templateUrl : 'views/add_chassis.html'
	})
	

});

inventoryApp.controller('chassis_tab_controller', [ '$scope', '$http',
		function($scope, $http) {
			console.log("Inside chassis_tab_controller controller");
			$scope.sortType = 'run_id';
			$scope.sortReverse = false;
			$scope.limit = 20;

			$scope.test = function() {

				$scope.limit = $scope.limit + 20;
			}

			$scope.$on('$routeChangeSuccess', function() {
				console.log("executed now");

				$scope.values = [];

				// Simple GET request example:
				$http({
					method : 'GET',
					url : '/getAllChassisMaster'
				}).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.values = response.data.result;
					console.log(response.data.result);
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log("Failed");
				});

			});

		} ]);

inventoryApp.controller('drives_tab_controller', [ '$scope', '$http',
		function($scope, $http) {
			console.log("Inside drives_tab_controller controller");
			
			$scope.sortType = 'run_id';
			$scope.sortReverse = false;
			$scope.limit = 20;

			$scope.LoadMore = function() {

				$scope.limit = $scope.limit + 20;
			}
			
			$scope.$on('$routeChangeSuccess', function() {
				console.log("executed now");

				$scope.values = [];

				// Simple GET request example:
				$http({
					method : 'GET',
					url : '/getAllDrivesMaster'
				}).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.values = response.data.result;
					console.log(response.data.result);
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log("Failed");
				});

			});
			
		} ]);

inventoryApp.controller('controller_tab_controller', [ '$scope', '$http',
	function($scope, $http) {
		console.log("Inside controller_tab_controller controller");
		
		$scope.sortType = 'run_id';
		$scope.sortReverse = false;
		$scope.limit = 20;

		$scope.LoadMore = function() {

			$scope.limit = $scope.limit + 20;
		}
		
		$scope.$on('$routeChangeSuccess', function() {
			console.log("executed now");

			$scope.values = [];

			// Simple GET request example:
			$http({
				method : 'GET',
				url : '/getAllControllerMaster'
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.values = response.data.result;
				console.log(response.data.result);
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log("Failed");
			});

		});
		
	} ]);


inventoryApp.controller('management_tab_controller', [ '$scope', '$http',
	function($scope, $http) {
		console.log("Inside management_tab_controller controller");
		
		$scope.sortType = 'run_id';
		$scope.sortReverse = false;
		$scope.limit = 20;

		$scope.LoadMore = function() {

			$scope.limit = $scope.limit + 20;
		}
		
		$scope.$on('$routeChangeSuccess', function() {
			console.log("executed now");

			$scope.values = [];

			// Simple GET request example:
			$http({
				method : 'GET',
				url : '/getAllManagementMaster'
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.values = response.data.result;
				console.log(response.data.result);
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log("Failed");
			});

		});
		
	
} ]);


inventoryApp.controller('add_modify_controller', [ '$scope', '$http',
	function($scope, $http) {
		console.log("Inside management_tab_controller controller");
		
		$scope.$on('$routeChangeSuccess', function() {
			console.log("executed now");

			$scope.values = [];

			// Simple GET request example:
			$http({
				method : 'GET',
				url : '/getAllRegisteredChassis'
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.values = response.data.result;
				console.log(response.data.result);
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log("Failed");
			});

		});
		
} ]);
