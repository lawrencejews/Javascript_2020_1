var mapReducer = curry(2, function mapReducer(mappingFn, combineFn){
    return function reducer (list, v){
        return combineFn(list, mappingFn(v));
    }
});

var filterReducer = curry(2, function filterReducer(predicateFn, combineFn){
    return function reducer(list, v){
        if(predicateFn(v)) return combineFn(list, v);
        return list;
    }
});

var transducer = compose( mapReducer(add1), filterReducer(isOdd));

var list = [1, 3, 4, 6, 9, 12, 13, 16, 21];

list.reduce(transducer( sum), 0)