module.exports = function(){
    var args = Array.prototype.slice.call(arguments, 0, -1);
    var resultFunction = Array.prototype.slice.call(arguments, -1);
    var memoizedArgs = [];
    var memoizedResult;
    var changed = false;


    function callArgsFunctionWithState(state, func, index) {
        var result = func(state);
        if(result !== memoizedArgs[index]){
            changed = true;
            memoizedArgs[index] = result;
        }
    }
    return function(state){
        args.forEach(callArgsFunctionWithState.bind(null, state));
        if(changed){
            memoizedResult = resultFunction[0].apply(null, memoizedArgs);
        }
        changed = false;
        return memoizedResult;
    }
}
