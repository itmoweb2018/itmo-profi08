var goods;
var goodsRightNow;
var cart = [];
var catalog = $('.catalog');

//Сортировка массива goods по категориям
function sortCats(a, b) {
    return +a.category[1] - +b.category[1];
};

//Очистка HTML товаров в каталоге
function clearCatalogHTML() {
    catalog.children().remove();
};

//Выводим товары, полученные из массива
function printCatalog(gds, catalog) {
    gds.forEach(function(el) {
        var name = $('<span>', {
            class: 'catalog__item-name',
            text: el.name
        });

        var img = $('<img>', {
            class: 'catalog__item-preview',
            src: 'images/' + el.img
        }).attr('data-action', 'show-good');

        var cost = $('<span>', {
            class: 'catalog__item-cost',
            text: el.cost
        });

        var weight = $('<span>', {
            text: 'Вес = ' + el.weight
        });

        var vogue = $('<span>', {
            text: 'Популярность = ' + el.vogue
        });

        var toCart = $('<button>', {
            class: 'cart_button',
            text: 'Купить'
        }).attr('data-action', 'add-cart');

        var container = $('<div>').addClass('catalog__item').append(name, img, cost, weight, vogue, toCart);
        catalog.append(container);
    });
};

//Очистка HTML категорий
function clearCategoryListHTML() {
    $('.filter__categories').children().remove();
};

//Получаем категории из массива
function getCats(gds) {
    var arr = [];

    gds.forEach(function(el) {
        if (arr[el.category] == undefined) {
            arr[el.category] = 1;
        } else {
            arr[el.category]++;
        };
    });

    for (key in arr) {
        var li = $('<li>');
        $('<a>', {
            href: '#',
            class: 'filter__categories__a',
            text: key + ': ' + arr[key]
        }).attr('data-action', 'filter-cat').appendTo(li);

        $('.filter__categories').append(li);
    };
};

//Очистка HTML цен
function clearCostListHTML() {
    $('.filter__cost').children().remove();
};

//Получаем цены из массива
function getCost(gds) {
    var arr = [];

    gds.forEach(function(el) {
        arr.push(el.cost);
    });
    var costLess = $('<li>');
    var costMore = $('<li>');
    $('<a>', {
        href: '#',
        class: 'filter__categories__costLess',
        text: 'Цена меньше 10 000'
    }).attr('data-action', 'filter-cost-less').appendTo(costLess);
    $('<a>', {
        href: '#',
        class: 'filter__categories__costMore',
        text: 'Цена больше 10 000'
    }).attr('data-action', 'filter-cost-more').appendTo(costMore);
    $('.filter__cost').append(costLess, costMore);
};

//Функция для сортировки. Сортировка пузырьком
function sort(arr, rule) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (!rule(arr[i], arr[j])) {
                var a = arr[i];
                arr[i] = arr[j];
                arr[j] = a;
            }
        }
    }
    return arr;
};

//Сортировка по стоимости
function sortCostUp(a, b) {
    return a.cost < b.cost;
};
function sortCostDown(a, b) {
    return a.cost > b.cost;
};

function eventSortCostUp() {
    clearCatalogHTML();
    goodsRightNow = sort(goodsRightNow, sortCostUp);
    printCatalog(goodsRightNow, catalog);
};
function eventSortCostDown() {
    clearCatalogHTML();
    goodsRightNow = sort(goodsRightNow, sortCostDown);
    printCatalog(goodsRightNow, catalog);
};

//Сортировка по весу 
function sortWeightUp(a, b) {
    return a.weight < b.weight;
};
function sortWeightDown(a, b) {
    return a.weight > b.weight;
};

function eventSortWeightUp() {
    clearCatalogHTML();
    goodsRightNow = sort(goodsRightNow, sortWeightUp);
    printCatalog(goodsRightNow, catalog);
};
function eventSortWeightDown() {
    clearCatalogHTML();
    goodsRightNow = sort(goodsRightNow, sortWeightDown);
    printCatalog(goodsRightNow, catalog);
};

//Сортировка по популярности 
function sortVogueUp(a, b) {
    return a.vogue < b.vogue;
};
function sortVogueDown(a, b) {
    return a.vogue > b.vogue;
};

function eventSortVogueUp() {
    clearCatalogHTML();
    goodsRightNow = sort(goodsRightNow, sortVogueUp);
    printCatalog(goodsRightNow, catalog);
};
function eventSortVogueDown() {
    clearCatalogHTML();
    goodsRightNow = sort(goodsRightNow, sortVogueDown);
    printCatalog(goodsRightNow, catalog);
};

//Создание || удаление showAllGoods
function showAllGoods() {
    $('.cart').html('');
    if ($('.filter__showAllGoods').length == 0) {
        var showAllGoods = $('<span>', {
            class: 'filter__showAllGoods'
        });
        $('<a>', {
            href: '#',
            text: 'Показать все товары'
        }).attr('data-action', 'show-all-goods').appendTo(showAllGoods);
        showAllGoods.appendTo($('.filter'));
    } else if (goodsRightNow == goods){
        $('.filter__showAllGoods').remove();
    };
};

//Функция для фильтра товаров по категориям
function filterCats(arr, cat) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].category == cat) newArr.push(arr[i])
    };

    goodsRightNow = newArr;
    clearCatalogHTML();
    printCatalog(goodsRightNow, catalog);
};

//Функция для фильтров товаров по цене
function filterCost(arr, rule) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (rule(arr[i])) newArr.push(arr[i]);
    };
    return newArr;
};

//Правила для фильтрации по цене
function filterCostLess(a) {
    return a.cost <= 10000;
};
function filterCostMore(a) {
    return a.cost > 10000;
};

//Фильтр по цене
function eventFilterCostLess() {
    clearCatalogHTML();
    goodsRightNow = filterCost(goods, filterCostLess);
    printCatalog(goodsRightNow, catalog);
};
function eventFilterCostMore() {
    clearCatalogHTML();
    goodsRightNow = filterCost(goods, filterCostMore);
    printCatalog(goodsRightNow, catalog);
};

//Выводим корзину
function drawCart() {
    clearCatalogHTML();
    $('<h1>', {text: 'Корзина'}).appendTo('.cart');

    var table = $('<table>', {
        class: 'cart-table',
        html: '<tr> <th>Название</th> <th>Кол-во</th> <th>Цена</th> <th>Стоимость</th> </tr>'
    }).appendTo('.cart');

    for (key in cart) {
        $('<tr>', {
            html: '<td>' + key + '</td>' + '<td>' + '<a href="#" data-action="minus-good">- </a>' + cart[key].count + '<a href="#" data-action="plus-good"> +</a>' + '</td>' + '<td>' + cart[key].cost + '</td>' + '<td>' + cart[key].price + '</td>'
        }).appendTo(table);
    };

    $('<button>', {text: 'Вернуться к товарам'})
        .attr('data-action', 'back-cart')
        .appendTo(table);
    $('<button>', {text: 'Очистить корзину'})
        .attr('data-action', 'clean-cart')
        .appendTo(table);
};

//Счетчик товаров в корзине
function countGoodsInCart() {
    var totalCount = 0, totalPrice = 0;
    for (name in cart) {
        totalCount += cart[name].count;
        totalPrice += cart[name].count * cart[name].cost;
    }
    $('#cart').html('Корзина (' + totalCount + ', ' + totalPrice + ')');
}

//Действия при нажании на элементы
function processLinks(e) {
    var action = $(e.target).attr('data-action');

    if (action == null) return;
    switch (action) {
        //Сортировка
        case 'cost-up':
            eventSortCostUp();
            break;
        case 'cost-down':
            eventSortCostDown();
            break;
        case 'weight-up':
            eventSortWeightUp();
            break;
        case 'weight-down':
            eventSortWeightDown();
            break;
        case 'vogue-up':
            eventSortVogueUp();
            break;
        case 'vogue-down':
            eventSortVogueDown();
            break;

        //Фильтрация
        case 'filter-cat':
            var category = $(e.target).html()[0] + $(e.target).html()[1];
            filterCats(goods, category);
            showAllGoods();
            break;
        case 'filter-cost-less':
            eventFilterCostLess();
            showAllGoods();
            break;
        case 'filter-cost-more':
            eventFilterCostMore();
            showAllGoods();
            break;

        //Скидываем фильтры
        case 'show-all-goods':
            goodsRightNow = goods;
            clearCatalogHTML();
            $('.cart').html('');
            printCatalog(goods, catalog);
            showAllGoods();
            break;

        //Корзина
        case 'open-cart':
            if ($('#cart').html() == 'Корзина') {
                alert('Корзина пуста');
            } else {
                if ($('.cart-table').length == 0) drawCart();
            }
            break;
        case 'add-cart':
            var g_name = $(e.target).parent().find('.catalog__item-name').text();
            var g_cost_str = $(e.target).parent().find('.catalog__item-cost').text();
            var g_cost_regexp = /\d+/;
            var g_cost = g_cost_str.match(g_cost_regexp);

            if (cart[g_name] == undefined) {
                cart[g_name] = {
                    count: 1,
                    cost: g_cost,
                    price: g_cost
                }
            } else {
                cart[g_name].count++;
                cart[g_name].price = +cart[g_name].price + +cart[g_name].cost;
            }
            countGoodsInCart();
            break;
        case 'back-cart':
            $('.cart').html('');
            printCatalog(goodsRightNow, catalog);
            break;
        case 'clean-cart':
            cart = [];
            $('.cart').html('');
            $('#cart').html('Корзина');
            printCatalog(goodsRightNow, catalog);
            break;
        case 'minus-good':
            var goodName = $(e.target).parent().parent().children(':first').text();
            for (key in cart) {
                if (goodName == key) {
                    if (cart[key].count > 1) {
                        cart[key].count--;
                        cart[key].price -= cart[key].cost;
                    } else {
                        delete cart[key];
                    };
                    $('.cart').html('');
                    drawCart();
                    countGoodsInCart();
                };
                if (cart[key] == undefined) {
                    $('#cart').html('Корзина');
                    $('.cart').html('');
                    printCatalog(goodsRightNow, catalog);
                };
            };
            break;
        case 'plus-good':
            var goodName = $(e.target).parent().parent().children(':first').text();
            for (key in cart) {
                if (goodName == key) {
                    cart[key].count++;
                    cart[key].price = +cart[key].price + +cart[key].cost;
                };
            };
            $('.cart').html('');
            drawCart();
            countGoodsInCart();
            break;

        //Вывод каждого товара отдельно
        case 'show-good':
            clearCatalogHTML();
            var goodName = $(e.target).parent().children(':first').text();
            goodsRightNow.forEach(function(item) {
                if (goodName == item.name) {
                    var name = $('<h1>', {text: item.name, class: 'catalog__item-name'});
                    var img = $('<img>').attr('src', 'images/' + item.img);
                    var category = $('<span>', {text: 'Категория: ' + item.category});
                    var cost = $('<span>', {text: 'Стоимость: ' + item.cost, class: 'catalog__item-cost'});
                    var weight = $('<span>', {text: 'Вес: ' + item.weight});
                    var vogue = $('<span>', {text: 'Популярность: ' + item.vogue});
                    var desc = $('<p>', {text: 'Описание: ' + item.description});
                    var toCart = $('<button>', {text: 'Купить'}).attr('data-action', 'add-cart');
                    var button = $('<button>', {text: 'Вернуться к товарам'}).attr('data-action', 'return-goods');
                    $('<div>').append(name, img, category, cost, weight, vogue, desc, toCart, button).appendTo(catalog);
                };
            });
            break;
        case 'return-goods':
            clearCatalogHTML();
            printCatalog(goodsRightNow, catalog);
            break;
        default:
            console.log(action);
            break;
    };
};

//Dom-дерево загружено
$(function() {
    //Очистка HTML страницы перед AJAX запросом
    clearCatalogHTML();
    clearCategoryListHTML();
    clearCostListHTML();

    $.post('http://r2ls.ru', {seed: 40, cat_name: 'old-name'}, function(data) {
        //Парсим JSON файл с сервера
        goods = JSON.parse(data);

        //Сортируем полученный массив goods по категориям
        goods.sort(sortCats);
        goodsRightNow = goods;

        //Вывод товаров из goods в каталог
        printCatalog(goods, catalog);

        //Вывод категорий из goods
        getCats(goods);

        //Вывод цен из goods
        getCost(goods);
    });
    $(document).click(processLinks);
});