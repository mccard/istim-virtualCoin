var coinPage = angular.module('coin-page', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.coins = "unknown";
	$http.get('http://virtual-coin-api.jit.su/coin')
		.success(function(data) {
			$scope.coins = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}