//Глобальные переменные
var e_catalog, // Ссылка на html-элемент, в котором лежит каталог
    e_cart, // Ссылка на html-элемент, в котором лежит отображение корзины
    e_cart_mini, // Мини-корзина вверху экрана
    e_goods, // Ссылка на html-элемент, в котором лежит отображение страницы товара
    goods, // глобальный массив с товарами
    sort_goods, //обработанный массив с товарами
    catalog = $('.catalog'),
    cart = []; // глобальный массив с корзиной

// Жду загрузки DOM, загружаю AJAXом товары, определяю обработчики событий
document.addEventListener(
    'DOMContentLoaded', // Ожидаем события "ДОМ-дерево сформировано"
    function(e) {
        // ДОМ-дерево сформировано и мы можем сохранить в соответствующие переменные
        // ссылки на основные элементы ДОМ-дерева, которые понадобятся нам в дальнейшей работе
        e_cart_mini = $('#Cart');
        e_cart = $('.cart');
        e_goods = $('.goods');
        // Очищаем элементы от лишних тегов
        $('.filter__categories').html("");
        $(catalog).html('');
        // catalog.innerHTML = "";
        // Через аякс отправляем запрос на загрузку товаров
        $.post('http://r2ls.ru', // адрес страницы сервера с товарами
            {}, // параметры, которые передаются серверу - мы ничего не передаём, но можем
            // Например, сервер умеет отдавать различное количество товаров по параметру count
            // Задать этот параметр можно следующим образом: {count: 10}
            // Список параметров:
            // count - количество возвращаемых товаров
            // cat_count - количество разных категорий
            // cat_name - принцип формирования названий категорий (приер: {cat_name: "old-name"}. Два принципа:
                // old-name - старый формат "C" + номер
                // любое другое значение - рандомное предложение из 1-2 слов
            function(data) { // Когда от сервера придёт ответ, запустится эта функция. Здесь мы и разместим все описание нашей программы.
                // Преобразуем ответ из json-формата в обычный массив и сохраняем в глобальной переменной goods
                goods = JSON.parse(data);
                sort_goods = goods;
                // Отрисовываем каталог товаров
                printCatalog(goods, catalog);
                // Формируем список категорий из товаров и отрисовываем его
                printCategories();
                // Формируем и выводим ссылки для фильтрации по цене
                printCostFilter();
            }
        );

        // обработчики нажатий на клавиши сортировки (вызывают соответствующие функции)
        $("#CostUp").click(function() {
            eventSortByCostUp();
        });
        $("#CostDown").click(function() {
            eventSortByCostDown();
        });
        $("#WeightUp").click(function() {
            eventSortByWeightUp();
        });
        $("#WeightDown").click(function() {
            eventSortByWeightDown();
        });
        $("#VogueUp").click(function() {
            eventSortByVogueUp();
        });
        $("#VogueDown").click(function() {
            eventSortByVogueDown();
        });
        // Обработчик открытия корзины
        $("#Cart").click(function() {
            drawCart();
        });
        document.onclick = processlinks;
    });

// Отобразить список категорий
function printCategories () {
    var ul = $('.filter__categories'),
        categories = getCategories ();
    for(k in categories) {
        var li = $('<li>', {
            html: '<a href="#" data-action="filter" data-type="equal" data-filter="category" data-value="'
                  + k + '">' + k + ' <span class="badge">' + categories[k] + '</span></a>',
        });
        $(li).appendTo(ul);
    }
}
// Получить список категорий с количеством товаров
function getCategories () {
    var categories = [];
    // для каждого товара выполняем действие
    goods.forEach(function(el) {
        // Есть ли категория данного товара в массиве категорий
        if(categories[el.category] == undefined) {
            // нет: добавляем новый элемент
            // название категории => 1
            categories[el.category] = 1;
        } else {
            // да: увеличиваем значение счетчика товаров в этой категории
            categories[el.category]++;
        }
    });
    return categories;
}
// фильтры по цене
function printCostFilter () {
    var ul = $('.filter__cost'),
        i = 0; 
    // Подсчет количества товарных позиций со стоимостью до 10000 включительно
    goods.forEach(function(el) {
        if(el.cost <= 10000) i++;
    });
    // вывожу ссылки
    ul.html('<li><a href="#" data-action="filter" data-type="less" data-filter="cost" data-value="10000">До 10000р <span class="badge">' + i + '</span></a></li>'
        + '<li><a href="#" data-action="filter" data-type="greater" data-filter="cost" data-value="10000">От 10000р <span class="badge">' + (goods.length - i) + '</span></a></li>');
}

// создаю и отображаю каталог товаров
function printCatalog(gds, catalog) {
    $(catalog).html(''),
    // if ($('.cart').html !== "") {$('.cart').html(''); console.log('yyy')};
    // итерирую входной массив goods, для каждого элемента выполняю функцию
    gds.forEach(function(el) {
        // создаю объекты, задаю в них html, к которому добавляю класс, стиль, данные массива, css свойства
        var 
            items_box = $('<div>', {
                class: 'catalog__item',
            }),
            item_name = $('<span>', {
                class: 'catalog__item-name',
                text: el.name,
            }),
            item_cost = $('<span>', {
                class: 'catalog__item-cost',
                text: el.cost,
            }),
            item_vogue = $('<span>', {
                class: 'catalog__item-vogue',
                text: el.vogue,
            }),
            item_description = $('<span>', {
                class: 'catalog__item-description',
                text: el.description,
                css: {
                    display: 'none',
                },
            }),
            item_weight = $('<span>', {
                class: 'catalog__item-weight',
                text: el.weight,
            }),
            item_category = $('<span>', {
                class: 'catalog__item-category',
                text: el.category,
                css: {
                    display: 'none',
                },
            }),
            get_item_dsc = $('<span>', {
                class: 'catalog__item-buttonGetDescription',
                text: 'Описание товара',
            }).attr('data-action', "show-description"),
            item_img = $('<img>', {
                class: 'catalog__item-preview',
                src: "images/" + el.img,
            }),
            buy_btn = $('<button>', {
                class: "BuyButton",
                text: 'Добавить в корзину',
            }).attr('data-action', "add-cart").attr('data-value', el.name);
            //добавляю к div items_box все созданные объекты (с appendTo не работает)
            $(items_box).append(item_name, item_img, item_cost, item_weight, item_vogue, item_description, item_category, get_item_dsc, buy_btn);
            //добавляю к catalog заполненный ранее div с элементами
            // $(catalog).append(items_box);
            $(items_box).appendTo(catalog);
        onMouse();
    })
}

//Отобразить корзину
function drawCart() {
    // Очищаем все контейнеры: каталог, страницу товара, саму корзину
    $(catalog).html('');
    $(e_cart).html('');
    $(e_goods).html('');
    //делаю обратно видимыми сортировки и фильтры
    $('#DivSorting').css('visibility', 'hidden');
    $('.filter').css('visibility', 'hidden');
    // Создаем таблицу. Добавляем шапку таблицы
    var cartHTML = $('.cart'),
        table = $('<table>', {
            class: 'cart-table',
            html: "<tr> <th>Название</th> <th>Количество, шт</th> <th>Вес, кг</th> <th>Цена</th> <th>Стоимость</th> </tr>",
        }),
        total_count = 0, total_sum = 0, total_weight = 0, row;
    // Выводим все товары из корзины на страницу (добавляем в таблицу)
    // При этом, заодно, подсчитываем сводные данные
    for(k in cart) {
        total_count += cart[k]['count'];
        total_sum += cart[k]['count'] * cart[k]['cost'];
        total_weight += cart[k]['weight'] * cart[k]['count'];
        row = $('<tr>', {
            html: '<td>' + k + '</td>' + '<td>' + '<button data-action="minusItemCart">- </button> ' + cart[k].count + ' <button data-action="plusItemCart"> +</button>' + '</td>' +   '<td>' + cart[k].weight + '</td>'   + '<td>' + cart[k].cost + '</td>' + '<td>' + cart[k].price + '</td>',
        });
        $(table).append(row);
    }
    // Завершаем таблицу сводных итоговых данных
    row = $('<tr>', {
        html: "<td> <b>Итого</b> </td>" + "<td>" + total_count + "</td>" +
              "<td>" + total_weight +"</td>" + "<td></td>" + "<td>" + total_sum + "</td>",
    });
    // Выводим само содержимое корзины, которое мы сформировали
    $(table).append(row);
    e_cart.append(table);
    var buttonClean = $('<button>', {
            class: 'cart__btn-clean',
            text: 'Очистить корзину',
        }).attr('data-action', 'CleanCart'),
        buttonBack = $('<button>', {
            class: 'cart__btn-back',
            text: 'Закрыть корзину',
        }).attr('data-action', 'CloseCart'),
        DivCartBtn = $('<div>', {
            class: 'cart__divbtn',
        });
    $(cartHTML).append(DivCartBtn);
    $(DivCartBtn).append(buttonBack);
    $(DivCartBtn).append(buttonClean);
};

// Обработчики событий
function eventSortByCostUp() {
    catalog.innerHTML = "";
    sort_goods = sort(sort_goods, sortCostUp);
    printCatalog(sort_goods, catalog);
}
function eventSortByCostDown() {
    catalog.innerHTML = "";
    sort_goods = sort(sort_goods, sortCostDown);
    printCatalog(sort_goods, catalog);
}
function eventSortByWeightUp() {
    catalog.innerHTML = "";
    sort_goods = sort(sort_goods, sortWeightUp);
    printCatalog(sort_goods, catalog);
}
function eventSortByWeightDown() {
    catalog.innerHTML = "";
    sort_goods = sort(sort_goods, sortWeightDown);
    printCatalog(sort_goods, catalog);
}
function eventSortByVogueUp() {
    catalog.innerHTML = "";
    sort_goods = sort(sort_goods, sortVogueUp);
    printCatalog(sort_goods, catalog);
}
function eventSortByVogueDown() {
    catalog.innerHTML = "";
    sort_goods = sort(sort_goods, sortVogueDown);
    printCatalog(sort_goods, catalog);
}

// СЛУЖЕБНЫЕ ФУНКЦИИ
// Ядро сортировки
function sort(arr, rule) {
    for(var i =0; i < arr.length; i++ ) {
        for(j = i + 1; j < arr.length; j++) {
            if(!rule(arr[i], arr[j])) {
                var a = arr[i];
                arr[i] = arr[j];
                arr[j] = a;
            }
        }
    }
    return arr;
}

// Ядро фильтрации
// получает исходный массив arr
// фильтрует по значению поля с именем field
// сравнивает у каждого элемента массива это поле со значением value в соответствии с правилом rule
// если правило возвращает true, то элемент массива остается, иначе - отфильтровывается
// т.е. правило получает конкретное значение поля элемента массива и эталонное значение и должно вернуть
// true, если элемент надо оставить, false - если надо отфильтровать, т.е. выводить не надо
function filter(arr, field, rule, value) {
    var result = [];
    // перебор всех элементов исходного массива
    for (k in arr) {
        // если правило возвращает true для кокретного элемента массива, то добавляем
        // этот массив в результирующий массив
        if(rule(arr[k][field], value)) result.push(arr[k]);
    }
    return result;
}

//Правила фильтров
// Фильтрация "больше" значения:
function is_greater(a, b) {
    return a > b;
}
// Фильтрация "меньше или равно" значению:
function is_less(a, b) {
    return a <= b;
}
// Фильтрация "равно" значения:
function is_equal(a, b) {
    return a == b;
}
// Правила сортировок
// сортировака по возрастанию цены
function sortCostUp(a, b) {
    return a.cost < b.cost;
}
// сортировака по убыванию цены
function sortCostDown(a, b) {
    return a.cost > b.cost;
}
// сортировака по возрастанию веса
function sortWeightUp(a, b) {
    return a.weight < b.weight;
}
// сортировака по убыванию веса
function sortWeightDown(a, b) {
    return a.weight > b.weight;
}
// сортировака по возрастанию попуряности
function sortVogueUp(a, b) {
    return a.vogue < b.vogue;
}
// сортировака по убыванию попуряности
function sortVogueDown(a, b) {
    return a.vogue > b.vogue;
}

//функция обработки действий (добавлеине в корзину, показ описания, открытие каталога, ...)
function processlinks (e) {
    // var el = e.target;
    // var action = el.attributes.getNamedItem('data-action');
    var action = $(e.target).attr('data-action');
    if (action == null) return;
    switch (action) {

        case 'add-cart':
            //в переменную из родителя элемента беру имя товара
            var g_name = $(e.target).parent().find('.catalog__item-name').text();
            //в переменную из родителя элемента беру стоимость товара
            var g_cost = $(e.target).parent().find('.catalog__item-cost').text();
            //в переменную из родителя беру вес товара
            var g_weight = $(e.target).parent().find('.catalog__item-weight').text();
            if (cart[g_name] == undefined) {
                cart[g_name] = {
                    count: 1,
                    weight: g_weight,
                    cost: g_cost,
                    price: g_cost,
                }
            } else {
                cart[g_name].count++;
                cart[g_name].price = +cart[g_name].price + +cart[g_name].cost;
            }
            miniCart();
            break;

        case 'OpenCatalog':
            // обработчик возвращения в каталог. Очищаем все контейнеры: каталог, страницу товара, саму корзину
            e_catalog.innerHTML = "";
            e_cart.innerHTML = "";
            e_goods.innerHTML = "";
            // Выводим каталог полный каталог товаров
            printCatalog(goods, e_catalog);
            break;

        case 'filter':
            // обработчик вывода товаров по конкретной категории
            catalog.innerHTML = "";
            var action = e.target.attributes.getNamedItem('data-action'), // действие (сортировка, фильтрация, что-то еще)
            dtype = e.target.attributes.getNamedItem('data-type'), // для фильтрации - тип сравнения: больше значения, меньше значения, равно значению
            dfilter = e.target.attributes.getNamedItem('data-filter'), // имя поля, по которому фильтруем: цена, вес и т.д.
            dvalue = e.target.attributes.getNamedItem('data-value'); // конкретное значение, с которым сравниваем. например, имя конкретной категории, товары из которой надо оставить
            var new_goods; // Промежуточный массив с отфильтрованными товарами
            if (action != undefined) {
                // Обработчик всех фильтраций - атрибут "action" у ссылки имеет значение "filter"
                if(action.value == "filter") {
                    // Обработка фильтров
                    if(dtype.value == "equal") {
                        sort_goods = filter(goods, dfilter.value, is_equal, dvalue.value);
                    } else if(dtype.value == "greater") {
                        sort_goods = filter(goods, dfilter.value, is_greater, dvalue.value);
                    } else if(dtype.value == "less") {
                        sort_goods = filter(goods, dfilter.value, is_less, dvalue.value);
                    } 
                    // Очищаем все контейнеры: каталог, страницу товара, саму корзину
                    catalog.innerHTML = "";
                    e_cart.innerHTML = "";
                    e_goods.innerHTML = "";
                    // Вывод результата фильтрации
                    printCatalog(sort_goods, catalog);
            break;
            }
        }

        case 'minusItemCart':
            //удаление из корзины конкретного товара
            var goodName = $(e.target).parent().parent().children(':first').text();
            for (key in cart) {
                if (goodName == key) {
                    if (cart[key].count > 1) {
                        cart[key].count--;
                        cart[key].price -= cart[key].cost;
                    } else {
                        delete cart[key];
                    }
                    $('.cart').html('');
                    drawCart();
                    miniCart();
                };
                if (cart[key] == undefined) {
                    // catalog.style.display = 'flex';
                    $('#cart').html('Корзина');
                    $('.cart').html('');
                    drawCart();
                };
            }
            break;

        case 'plusItemCart':
            //добавление к корзине конкретного товара
            var goodName = $(e.target).parent().parent().children(':first').text();
            for (key in cart) {
                if (goodName == key) {
                    cart[key].count++;
                    cart[key].price = +cart[key].price + +cart[key].cost;
                }
            }
            $('.cart').html('');
            drawCart();
            miniCart();
            break;

            case 'CloseCart':
            //делаю обратно видимыми сортировки и фильтры
            $('#DivSorting').css('visibility', 'visible');
            $('.filter').css('visibility', 'visible');
            //закрытие корзины и отображение предыдущего каталога товаров
            $('.cart').html('');
            if (sort_goods == goods) {
                printCatalog(goods, catalog);
            } else {
                printCatalog(sort_goods, catalog);
            }
            break;

        case 'CleanCart':
            cart = [];
            $('.cart').html('');
            catalog.innerHTML = "";
            drawCart();
            miniCart();
            break;
    }
}

//обновляю свойства миникорзины
function miniCart () {
    // Обновляем сводную информацию о корзине
    var total_count = 0, total_sum = 0, total_weight = 0;
    // Вычисляем итоговое количество товаров в корзине и их общую сумму
    for(k in cart) {
        total_count += cart[k]['count'];
        total_sum += cart[k]['count'] * cart[k]['cost'];
        total_weight += cart[k]['weight'] * cart[k]['count'];
    }
    $(e_cart_mini).html("Корзина (" + total_count + "шт.,  " + total_weight + "кг.,  " + total_sum + "руб.)");
}

//Наведение на товар (перевод на jQuery слишком запутанный, нерационально)
function onMouse(e) {
    var getname,
        getcat,
        asideDescr,
        asideDiv,
        printDescr,
        g_item,
        getdescr,
        delDescr = function() { //проверяю, есть ли отображаемое описание товара, если есть, то удаляю
                        var y = document.getElementsByClassName('aside__item-description')[0] != null ? true : false;
                        if (y==true) {
                            document.getElementsByClassName('aside__item-description')[0].remove();
                            } //else {console.log('ничо нет')}
                    };
    for (let i = 0; i < document.getElementsByClassName('catalog__item-buttonGetDescription').length; i++) {
        document.getElementsByClassName('catalog__item-buttonGetDescription')[i].addEventListener('mouseover', function(e) {
            //получаю описание элемента, на который был совершен клик
            getname = document.getElementsByClassName('catalog__item-name')[i].innerText;
            getcat = document.getElementsByClassName('catalog__item-category')[i].innerText;
            //сохраняю путь до aside, куда будет отправлено описание
            asideDescr = document.getElementsByTagName('body')[0].getElementsByTagName('aside')[0];
            //создаю новый div для имени товара и его описания; создаю новый параграф с писанием товара
            asideDiv = document.createElement('div');
            printDescr = document.createElement('p');
            g_item = document.getElementsByClassName('catalog__item-buttonGetDescription')[i].parentElement.parentElement;
            getdescr = g_item.getElementsByClassName('catalog__item-description')[i].innerText;
            //удаляю предыдущий элемент с описанием
            delDescr();
            //помещаю в параграф описание товара
            printDescr.innerText = getdescr;
            //добавляю поясняния к выводу
            asideDiv.innerHTML = "<span>Описание товара - " + getname + "</span><br>" + "<span>Категория - " + getcat + "</span>";
            asideDiv.className = 'aside__item-description';
            //добавляю div в DOM и сохранаю путь до него
            asideDescr.appendChild(asideDiv);
            var asideDivDescr = document.getElementsByClassName('aside__item-description')[0];
            //добавляю к div описание товара 
            asideDivDescr.appendChild(printDescr);
            asideDivDescr.setAttribute('style', 'background:#78BBBE; margin: 0; padding: 0.5rem;');
            printDescr.setAttribute('style', 'font-style: italic;');
        })
    }
        for (let i = 0; i < document.getElementsByClassName('catalog__item-buttonGetDescription').length; i++) {
            document.getElementsByClassName('catalog__item-buttonGetDescription')[i].addEventListener('mouseout', function(e) {
                delDescr(); //срабытавает слишком много раз, todo разобраться в чём дело
            })
        }
}    