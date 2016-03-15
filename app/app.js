(function (angular) {

	var app = angular.module('MyApp', []);

	app.controller('TestController', [function () {

		var vm = this;
		vm.nhsNumber = '';
		vm.email = '';

	}]);

	app.directive('applyBsClasses', [function () {

		return {
			restrict: 'A',
			require: '^form',
			link: function ($scope, $element, $attrs, $ctrl) {

				var thisName = $element.find('input').attr('name');
				$scope.$watch(function () {
					return $ctrl[thisName].$viewValue;
				}, function () {

					$element.removeClass('has-error has-success');

					if ($ctrl[thisName].$valid === true && $ctrl[thisName].$pristine !== true) {
						$element.addClass('has-success');
					}

					if ($ctrl[thisName].$invalid === true) {
						$element.addClass('has-error');
					}

				});
			}
		};

	}]);

	app.directive('validateNhsNumber', [function () {

		var regex = /^\d\d\d \d\d\d \d\d\d\d$/;
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function ($scope, $element, $attrs, $ctrl) {

				$ctrl.$validators.nhsNumber = function (modelValue, viewValue) {

					if (viewValue.length === 0) return true;

					return regex.test(viewValue);
				}
			}
		};

	}]);

})(angular);