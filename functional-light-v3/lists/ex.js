"use strict";

function add(x, y) {
    return x + y;
}

function add2(fn1, fn2) {
    return add(fn1(), fn2());
}

function constant(v) {
    return function f() {
        return v;
    };
}
var five = constant(5);
var nine = constant(9);

//Iterative approach
// function addn(...fns){
//    while (fns.length > 2){
//     let [fn0, fn1, ...rest] = fns;
//     fns = [
//         function f(){
//             return add2(fn0, fn1);
//         },
//         ...rest
//     ];
//    } 
//    return add2(fns[0], fns[1]);
// }

//Recursion approach
// function addn([fn0, fn1, ...rest]) {
//     if (rest.length == 0)  return add2(fn0, fn1);
//     return addn([
//         function f() {
//             return add2(fn0, fn1)
//             },
//             ...rest
//         ])
//     }


// addn([constant(3), constant(7), five, nine, constant(11)]);



function addn(fns){
    return  fns.reduce(function reducer(bigFn, fn){
        return function f(){
             return add2(bigFn, fn);
        };
     })();
 }


console.log(addn( [constant(3), constant(7), five, nine, constant(11)] ))

var numbers = [5, 2, 1, 5, 4, 2, 7, 9, 17, 6, 3, 2, 4, 8, 12, 13];

console .log (addn(numbers.reduce( function unique( newList, num){
    if(!newList.includes(num)) return [...newList, num];
    return newList;
},[])
.filter(function isEven(v){

    return v % 2 == 0;
})
.map(constant)
));
