function model_f(value1, value2) {
    var value1 = document.getElementById(value1);
    var value2 = document.getElementById(value2);
    if (value1.style.display == 'none' || value1.style.display == '') {
        value1.style.display = 'block'
        value1.style.position = 'fixed'
    }
    else {
        value1.style.display = 'none'
    }
    value2.style.display = 'none'
}