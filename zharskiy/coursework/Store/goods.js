/**
 * Created by User on 20.11.2018.
 */
function getDescription() {
    return "Dgdf dg dfgdfg dfg.";
}

function newGood(n) {
    return {
        name: 'G' + n,
        category: 'C' + Math.ceil(Math.random() * 5),
        cost: Math.ceil(Math.random() * 20) * 1000,
        weight: Math.ceil(Math.random() * 20),
        vogue: Math.ceil(Math.random() * 100),
        description: getDescription(Math.ceil(Math.random() * 5))
    }
}
goods = [];

// $.post('http://r2ls.ru', {}, function(data) {
//     data = JSON.parse(data);
//     return goods = data;
// });
console.log(goods);

for(var i = 0; i < 20; i++)
    goods.push(newGood(i))

function sortCats(a, b) {
    return +a.category.charAt(1) - +b.category.charAt(1);
}
var newGoods = goods.sort(sortCats);


// console.log(newGoods);
// console.log(goods[1].category)