var app = angular.module("MyFirstApp", []);
app.controller("FirstController", ["$scope", function($scope) {

    $scope.items = ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5'];
    $scope.draggedElement = null;
    $scope.draggedIndex = null;
    $scope.overIndex = null;

    $scope.dragStart = function(event) {
        console.log('dragStart');
        console.log(event.target);
        $scope.draggedElement = event.target;
        $scope.draggedIndex = getIndex($scope.draggedElement);
    };

    $scope.dragEnd = function(event) {
        console.log('dragEnd');
        if ($scope.overIndex !== null) {
            $scope.items.splice($scope.overIndex, 0, $scope.items.splice($scope.draggedIndex, 1)[0]);
        }
        $scope.draggedElement.style.position = 'inherit';
        $scope.draggedElement = null;
        $scope.draggedIndex = null;
        $scope.overIndex = null;
    }

    $scope.drag = function(event) {
        // console.log('drag');
        if ($scope.draggedElement !== null) {
            let mousePos = getMousePos(event);
            console.log($scope.draggedElement.style);
            $scope.draggedElement.style.position = 'absolute';
            $scope.draggedElement.style.top = mousePos.y + 'px';
            $scope.draggedElement.style.left = mousePos.x + 'px';

            var elements = document.getElementsByClassName('element');
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element !== $scope.draggedElement) {
                    var elementPos = element.getBoundingClientRect();
                    if (mousePos.x > elementPos.left && mousePos.x < elementPos.right && mousePos.y > elementPos.top && mousePos.y < elementPos.bottom) {
                        $scope.overIndex = getIndex(element);
                        break;
                    }
                }
            }
        }
    }

    function getIndex(element) {
        var index = null;
        var siblings = element.parentNode.children;
        for (var i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
            index = i;
            break;
            }
        }
        return index;
    }

    function getMousePos(event) {
        var pos = {x: 0, y: 0};
        pos.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pos.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        return pos;
    }
}])