"use strict";

var arr = [1,2,3,4];

arr.a = 'luo xiao qing';

// arr.forEach(val => {console.log(val)})

for (let key of arr) {
    if (key === 3) break;
    // console.log(key)
}


for (let val in arr.a) {
    console.log(arr.a[val])
}

