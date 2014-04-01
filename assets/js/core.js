var coinPage = angular.module('coin-page', []);
var url_default = 'http://localhost:1337/coin';
function mainController($scope, $http) {
	$scope.formData = {};
	$http.get(url_default+'/')
		.success(function(data) {
			$scope.coins = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createCoin = function() {
		$http.post(url_default+'/', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteCoin = function(userId) {
		var url = url_default+'?userId='+userId;
		$http.delete(url)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.updateCoin = function(userId) {
		var url = url_default+'?userId='+userId;
		if ($scope.formData.newUser) url +='&newUser='+$scope.formData.newUser;
		if ($scope.formData.cash) url +='&cash='+$scope.formData.cash;
		$http.put(url)
			.success(function(data){
				$scope.formData = {};
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.debitCoin = function(userId) {
		var url = url_default+'/debit?userId='+userId+'&cash='+$scope.formData.cash;
		$http.post(url)
			.success(function(data){
				$scope.formData = {};
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.creditCoin = function(userId) {
		var url = url_default+'/credit?userId='+userId+'&cash='+$scope.formData.cash;
		$http.post(url)
			.success(function(data){
				$scope.formData = {};
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

}