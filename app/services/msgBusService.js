app.factory('msgBus', ['$rootScope', function($rootScope) {
    var msgBus = {};
    msgBus.emitMsg = function(msg, data) {
        data = data || {}
        $rootScope.$emit(msg, data);
        console.log('emittingfrombus')
    };
    msgBus.onMsg = function(msg, func, scope) {
        console.log(msg,'onlistening from bus')
        var unbind = $rootScope.$on(msg, func);
        if (scope) {
            scope.$on('$destroy', unbind);
        }
    };
    return msgBus;
}]);