angular.module('calcApp')
  .controller('CalculatorCtrl', ['$scope', function ($scope) {
        $scope.clickButton = function($event) {
            window.button = $event;
            var element = $event.toElement;
            if(element.nodeName.toLowerCase() != 'button') {
                return;
            }

            if(! $scope.state) {
                $scope.state = {};
            }

            var calc = {};
            var value = element.innerText;
            if(value === '+' || value === '-' || value === 'x' || value === '/') {
                calc.operation = value;

            } else if(value === '=') {
                calc.equal = '=';

            } else if(parseInt(value, 10) == value) {
                calc.value = value;
            }

            if(calc.value !== undefined) {
                if($scope.state.operand2 !== undefined) {
                    $scope.state.operand2 = ($scope.state.operand2 || 0) * 10 + calc.value;
                } else {
                    $scope.state.operand1 = ($scope.state.operand1 || 0) * 10 + calc.value;
                }
            } else if (calc.operation !== undefined) {
                $scope.state.operation = calc.operation;
                $scope.state.operand2 = null;

            } else if (calc.equal) {
                _performeOperation();
            }


            function _performeOperation() {
                switch($scope.state.operation) {
                    case '+':
                        $scope.state.result = $scope.state.operand1 + $scope.state.operand2;
                        break;
                    case '-':
                        $scope.state.result = $scope.state.operand1 - $scope.state.operand2;
                        break;
                    case 'x':
                        $scope.state.result = $scope.state.operand1 * $scope.state.operand2;
                        break;
                    case '/':
                        $scope.state.result = $scope.state.operand1 / $scope.state.operand2;
                        break;
                }

                $scope.state.operand1 = $scope.state.result;
                delete $scope.state.operation;
                delete $scope.state.operand2;
            }

        };
  }]);
