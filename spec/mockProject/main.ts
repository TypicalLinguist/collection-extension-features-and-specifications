const array = [1, 2, 4, [5, [6, 7, [{car: 'things'}]]], 3, 'string', {}];
const flatArray = array.flatten();
const flatArrayDepth2 = array.flatten({depth: 1});
const flatArrayDeep = array.flatten({deep: true});

console.log(`
StartArray: ${array}
__________________________________
FlatArray: ${flatArray}
FlatArrayDepth2: ${flatArrayDepth2}
FlatArrayDeep" ${flatArrayDeep}

`);