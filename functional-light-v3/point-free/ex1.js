function printIf(shouldPrintIt) {
    return function (msg) {
        if (shouldPrintIt(msg)) {
            output(msg);
        }
    };
}

function when(fn) {
    return function (predicate) {
        return function (...args) {
            if (predicate(...args)) {
                return fn(...args);
            }
        };
    };
}

printIf(isShortEnough)(msg1);
when(output)(isShortEnough)(msg1);

var printIf = when(output);