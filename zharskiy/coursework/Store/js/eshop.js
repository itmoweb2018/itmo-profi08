var goods;
var goodsRightNow;
var cart = [];
var catalog = document.getElementsByClassName('catalog')[0];
var showAllGoods = document.createElement('span');

//Сортировка массива goods по категориям
function sortCats(a, b) {
    return +a.category.charAt(1) - +b.category.charAt(1);
}

//Товары в каталоге
function clearCatalogHTML() {
    var catalog = document.getElementsByClassName('catalog')[0];
    var divs = catalog.children;
    var len = divs.length;
    for (i = 0; i < len; i++) {
        divs[0].remove();
    }
}

function printCatalog(gds, catalog) {
    var arr = [];
    gds.forEach(function(el) {
        var container = document.createElement('div');
        var name = document.createElement('span');
        var img = document.createElement('img');
        var cost = document.createElement('span');
        var weight = document.createElement('span');
        var vogue = document.createElement('span');
        var toCart = document.createElement('span');

        container.className = 'catalog__item';
        name.className = 'catalog__item-name';
        img.className = 'catalog__item-preview';
        img.setAttribute('src', 'images/' + el.img);
        img.setAttribute('data-action', 'show-good');
        cost.className = 'catalog__item-cost';

        toCart.innerHTML = '<button class="cart_button" data-action="add-cart">Купить</button>'
        name.innerHTML = el.name;
        cost.innerHTML = el.cost;
        weight.innerHTML = 'Вес = ' + el.weight;
        vogue.innerHTML = 'Популярность = ' + el.vogue;
        container.appendChild(name);
        container.appendChild(img);
        container.appendChild(weight);
        container.appendChild(vogue);
        container.appendChild(cost);
        container.appendChild(toCart);
        catalog.appendChild(container);
    });
}

//Категории
function clearCategoryListHTML() {
    var ul = document.getElementsByClassName('filter__categories')[0];
    var lis = ul.children;
    var len = lis.length;
    for (i = 0; i < len; i++) {
        lis[0].remove();
    }
}

function getCatsByGoods() {
    var arr = [];

    goods.forEach(function(el) {
        if (arr[el.category] == undefined) {
            arr[el.category] = 1;
        } else {
            arr[el.category]++;
        }
    });

    for (key in arr) {
        var li = document.createElement('li');
        var span = document.createElement('span');

        li.innerHTML = '<a href="#" class="filter__categories__a">' + key + ':<span> ' + arr[key] + '</span></a>';
        li.id = 'category_' + key;
        document.getElementsByClassName('filter__categories')[0].appendChild(li);
    }
}

//Цены
function clearCostListHTML() {
    var ul = document.getElementsByClassName('filter__cost')[0];
    var lis = ul.children;
    var len = lis.length;
    for (i = 0; i < len; i++) {
        lis[0].remove();
    }
}

function getCostByGoods() {
    var arr = [];

    goods.forEach(function(el) {
        arr.push(el.cost);
    });
    var costLess = document.createElement('li');
    var costMore = document.createElement('li');

    costLess.innerHTML = '<a href="#" class="filter__categories__costLess">Цена меньше 10 000</a>';
    costMore.innerHTML = '<a href="#" class="filter__categories__costMore">Цена больше 10 000</a>';
    document.getElementsByClassName('filter__cost')[0].appendChild(costLess);
    document.getElementsByClassName('filter__cost')[0].appendChild(costMore);
}

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
}

// Сортировка по стоимости
function sortCostUp(a, b) {
    return a.cost < b.cost;
}
function sortCostDown(a, b) {
    return a.cost > b.cost;
}

function eventSortCostUp() {
    catalog.innerHTML = ' ';
    goodsRightNow = sort(goodsRightNow, sortCostUp);
    printCatalog(goodsRightNow, catalog);
}
function eventSortCostDown() {
    catalog.innerHTML = ' ';
    goodsRightNow = sort(goodsRightNow, sortCostDown);
    printCatalog(goodsRightNow, catalog);
}

// Сортировка по весу 
function sortWeightUp(a, b) {
    return a.weight < b.weight;
}
function sortWeightDown(a, b) {
    return a.weight > b.weight;
}

function eventSortWeightUp() {
    catalog.innerHTML = ' ';
    goodsRightNow = sort(goodsRightNow, sortWeightUp);
    printCatalog(goodsRightNow, catalog);
}
function eventSortWeightDown() {
    catalog.innerHTML = ' ';
    goodsRightNow = sort(goodsRightNow, sortWeightDown);
    printCatalog(goodsRightNow, catalog);
}

//Сортировка по популярности 
function sortVogueUp(a, b) {
    return a.vogue < b.vogue;
}
function sortVogueDown(a, b) {
    return a.vogue > b.vogue;
}

function eventSortVogueUp() {
    catalog.innerHTML = ' ';
    goodsRightNow = sort(goodsRightNow, sortVogueUp);
    printCatalog(goodsRightNow, catalog);
}
function eventSortVogueDown() {
    catalog.innerHTML = ' ';
    goodsRightNow = sort(goodsRightNow, sortVogueDown);
    printCatalog(goodsRightNow, catalog);
}

//Добавим элемент filter__showAllGoods
function createShowAllGoods() {
    showAllGoods.className = 'filter__showAllGoods';
    showAllGoods.innerHTML = '<a href="#">Показать все товары</a>';
    showAllGoods.style.display = 'none';
    document.getElementsByClassName('filter')[0].appendChild(showAllGoods);
}

//Функция фильтра для категорий
function filterCats(arr, cat) {
    var newArr = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].category == cat) newArr.push(arr[i])
    }
    goodsRightNow = newArr;
    catalog.innerHTML = ' ';
    printCatalog(goodsRightNow, catalog);
}

//Функция фильтра для цены
function filterCost(arr, rule) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (rule(arr[i])) newArr.push(arr[i]);
    }
    return newArr;
}

//Фильтрация по цене
function filterCostLess(a) {
    return a.cost <= 10000;
}
function filterCostMore(a) {
    return a.cost > 10000;
}
function eventFilterCostLess() {
    catalog.innerHTML = ' ';
    goodsRightNow = filterCost(goods, filterCostLess);
    printCatalog(goodsRightNow, catalog);
}
function eventFilterCostMore() {
    catalog.innerHTML = ' ';
    goodsRightNow = filterCost(goods, filterCostMore);
    printCatalog(goodsRightNow, catalog);
}

//Наведение на товар
function onMouse() {
    for (let i = 0; i < document.getElementsByClassName('catalog__item').length; i++) {
        document.getElementsByClassName('catalog__item')[i].addEventListener('mouseover', function(e) {
            document.getElementsByClassName('catalog__item')[i].style.border = '1px solid';
            document.getElementsByClassName('catalog__item')[i].style.padding = '9px';
            document.getElementsByClassName('catalog__item')[i].style.margin = '0';
            document.getElementsByClassName('catalog__item')[i].style.cursor = 'pointer';
        });
    };
    for (let i = 0; i < document.getElementsByClassName('catalog__item').length; i++) {
        document.getElementsByClassName('catalog__item')[i].addEventListener('mouseout', function(e) {
            document.getElementsByClassName('catalog__item')[i].style.border = '0';
            document.getElementsByClassName('catalog__item')[i].style.padding = '0';
            document.getElementsByClassName('catalog__item')[i].style.margin = '10px';
        });
    };
}

//Выводим корзину
function drawCart() {
    catalog.style.display = 'none';
    var header = document.createElement('h1');
    header.innerText = 'Корзина';

    var cartHTML = document.getElementsByClassName('cart')[0];
    cartHTML.appendChild(header);

    var table = document.createElement('table');
    table.className = 'cart-table';
    table.innerHTML = '<tr> <th>Название</th> <th>Кол-во</th> <th>Цена</th> <th>Стоимость</th> <th>Х</th> </tr>';

    for (key in cart) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + key + '</td>' + '<td>' + '<a href="#" data-action="minus-good">- </a>' + cart[key].count + '<a href="#" data-action="plus-good"> +</a>' + '</td>' + '<td>' + cart[key].cost + '</td>' + '<td>' + cart[key].price + '</td>';
        table.appendChild(tr);
    };

    var buttonBack = document.createElement('button');
    var buttonClean = document.createElement('button');
    buttonBack.innerText = 'Вернуться к товарам';
    buttonClean.innerText = 'Очистить корзину';
    buttonBack.setAttribute('data-action', 'back-cart');
    buttonClean.setAttribute('data-action', 'clean-cart');

    cartHTML.appendChild(table);
    cartHTML.appendChild(buttonBack);
    cartHTML.appendChild(buttonClean);
}

//Счетчик товаров в корзине
function countGoodsInCart() {
    var totalCount = 0, totalPrice = 0;
    for (name in cart) {
        totalCount += cart[name].count;
        totalPrice += cart[name].count * cart[name].cost;
    }
    document.getElementById('cart').innerHTML = 'Корзина (' + totalCount + ', ' + totalPrice + ')';  
}

//Действия при нажатии на элементы
function processlinks(e) {
    var el = e.target;
    var action = el.attributes.getNamedItem('data-action');
    if (action == null) return;
    switch (action.value) {
        case 'open-cart':
            if (document.getElementById('cart').innerHTML == 'Корзина') {
                alert('Корзина пуста');
            } else { 
                if (document.getElementsByClassName('cart-table')[0] == undefined) drawCart();
            }
            break;
        case 'add-cart':
            var g_item = el.parentElement.parentElement;
            var g_name = g_item.getElementsByClassName('catalog__item-name')[0];
            var g_cost = g_item.getElementsByClassName('catalog__item-cost')[0];

            if (cart[g_name.innerText] == undefined) {
                cart[g_name.innerText] = {
                    count: 1,
                    cost: g_cost.innerText,
                    price: g_cost.innerText
                }
            } else {
                cart[g_name.innerText].count++;
                cart[g_name.innerText].price = +cart[g_name.innerText].price + +cart[g_name.innerText].cost;
            }
            countGoodsInCart();
            break;
        case 'back-cart':
            document.getElementsByClassName('cart')[0].innerHTML = '';
            catalog.style.display = 'flex';
            clearCatalogHTML();
            if (goodsRightNow == goods) {
                printCatalog(goods, catalog);
                onMouse();
            } else {
                printCatalog(goodsRightNow, catalog);
                onMouse();
            }
            break;
        case 'clean-cart':
            cart = [];
            document.getElementById('cart').innerHTML = 'Корзина';
            document.getElementsByClassName('cart')[0].innerHTML = '';
            catalog.style.display = 'flex';
            clearCatalogHTML();
            if (goodsRightNow == goods) {
                showAllGoods.style.display = 'none';
                printCatalog(goods, catalog);
                onMouse();
            } else {
                printCatalog(goodsRightNow, catalog);
                onMouse();
            }
            break;
        case 'minus-good':
            var goodName = el.parentElement.parentElement.firstChild.innerText;
            for (key in cart) {
                if (goodName == key) {
                    if (cart[key].count > 1) {
                        cart[key].count--;
                        cart[key].price -= cart[key].cost;
                    } else {
                        delete cart[key];
                    }
                    document.getElementsByClassName('cart')[0].innerHTML = '';
                    drawCart();
                    countGoodsInCart();
                };
                if (cart[key] == undefined) {
                    catalog.style.display = 'flex';
                    document.getElementById('cart').innerHTML = 'Корзина';
                    document.getElementsByClassName('cart')[0].innerHTML = '';
                };
            }
            break;
        case 'plus-good':
            var goodName = el.parentElement.parentElement.firstChild.innerText;
            for (key in cart) {
                if (goodName == key) {
                    cart[key].count++;
                    cart[key].price = +cart[key].price + +cart[key].cost;
                }
            }
            document.getElementsByClassName('cart')[0].innerHTML = '';
            drawCart();
            countGoodsInCart();
            break;
        case 'show-good':
            clearCatalogHTML();

            var goodName = el.parentElement.firstChild.innerText;
            goodsRightNow.forEach(function(item) {
                if (goodName == item.name) {
                    var div = document.createElement('div');
                    var name = document.createElement('h1');
                    var category = document.createElement('span');
                    var cost = document.createElement('span');
                    var weight = document.createElement('span');
                    var vogue = document.createElement('span');
                    var desc = document.createElement('p');
                    var img = document.createElement('img');
                    var button = document.createElement('button');

                    name.innerHTML = item.name;
                    category.innerHTML = 'Категория: ' + item.category;
                    cost.innerHTML = 'Стоимость: ' + item.cost;
                    weight.innerHTML = 'Вес: ' + item.weight;
                    vogue.innerHTML = 'Популярность: ' + item.vogue;
                    desc.innerHTML = 'Описание: ' + item.description;
                    img.setAttribute('src', 'images/' + item.img);
                    button.setAttribute('data-action', 'show-all-goods');
                    button.innerHTML = 'Вернуться к товарам';

                    div.appendChild(name);
                    div.appendChild(img);
                    div.appendChild(category);
                    div.appendChild(cost);
                    div.appendChild(weight);
                    div.appendChild(vogue);
                    div.appendChild(desc);
                    div.appendChild(button);
                    catalog.appendChild(div);
                }
            })
            break;
        case 'show-all-goods':
            clearCatalogHTML();
            printCatalog(goodsRightNow, catalog);
            onMouse();
            break;
    }
}

document.addEventListener(
    'DOMContentLoaded',
    function(e){
        //Очистка HTML страницы перед AJAX запросом
        clearCatalogHTML();
        clearCategoryListHTML();
        clearCostListHTML();

        //AJAX запросом получаем массив товаров
        $.post('http://r2ls.ru', {seed: 40, cat_name: 'old-name'}, function(data) {

            //Парсим JSON файл с сервера
            goods = JSON.parse(data);

            //Сортируем полученный массив goods по категориям
            goods.sort(sortCats);
            goodsRightNow = goods;

            //Товары в каталоге
            printCatalog(goods, catalog);
            onMouse();

            //Категории
            getCatsByGoods();

            //Цена
            getCostByGoods();

            //Создание элемента filter__showAllGoods
            createShowAllGoods();

            //Фильтрация по категориям
            document.getElementById('category_C1').firstChild.addEventListener('click', function(e) {
                filterCats(goods, 'C1');
                onMouse();
                showAllGoods.style.display = 'inline';
            });
            document.getElementById('category_C2').firstChild.addEventListener('click', function(e) {
                filterCats(goods, 'C2');
                onMouse();
                showAllGoods.style.display = 'inline';
            });
            document.getElementById('category_C3').firstChild.addEventListener('click', function(e) {
                filterCats(goods, 'C3');
                onMouse();
                showAllGoods.style.display = 'inline';
            });
            document.getElementById('category_C4').firstChild.addEventListener('click', function(e) {
                filterCats(goods, 'C4');
                onMouse();
                showAllGoods.style.display = 'inline';
            });
            document.getElementById('category_C5').firstChild.addEventListener('click', function(e) {
                filterCats(goods, 'C5');
                onMouse();
                showAllGoods.style.display = 'inline';
            });

            //Фильтрация по цене
            document.getElementsByClassName('filter__categories__costLess')[0].addEventListener('click', function(e) {
                eventFilterCostLess();
                onMouse();
                showAllGoods.style.display = 'inline';
            });
            document.getElementsByClassName('filter__categories__costMore')[0].addEventListener('click', function(e) {
                eventFilterCostMore();
                onMouse();
                showAllGoods.style.display = 'inline';
            });

            document.getElementsByClassName('filter__showAllGoods')[0].addEventListener('click', function(e) {
                clearCatalogHTML();
                printCatalog(goods, catalog);
                onMouse();
                goodsRightNow = goods;
                catalog.style.display = 'flex';
                showAllGoods.style.display = 'none';
                document.getElementsByClassName('cart')[0].innerHTML = '';
            });

            //Сортировка по цене
            document.getElementById('sortCostUp').addEventListener('click', function(e) {
                eventSortCostUp();
                onMouse();
            });
            document.getElementById('sortCostDown').addEventListener('click', function(e) {
                eventSortCostDown();
                onMouse();
            });
            
            //Сортировка по весу
            document.getElementById('sortWeightUp').addEventListener('click', function(e) {
                eventSortWeightUp();
                onMouse();
            });
            document.getElementById('sortWeightDown').addEventListener('click', function(e) {
                eventSortWeightDown();
                onMouse();
            });
            
            //Сортировка по популярности
            document.getElementById('sortVogueUp').addEventListener('click', function(e) {
                eventSortVogueUp();
                onMouse();
            });
            document.getElementById('sortVogueDown').addEventListener('click', function(e) {
                eventSortVogueDown();
                onMouse();
            });
        });
        //Программирование ссылок через атрибут data. Функция вешается на весь документ
        document.onclick = processlinks;
    }
)