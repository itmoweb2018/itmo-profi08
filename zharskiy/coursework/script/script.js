document.getElementById("menu_btn-open").addEventListener("click",function(){
    document.getElementById("overlay").classList.add("show")
})
document.getElementById("menu_btn-close").addEventListener("click",function(){
    document.getElementById("overlay").classList.remove("show")
})

document.getElementById("menu_btn-open").addEventListener("click",function(){
    document.getElementById("blur-bg").classList.add("blur-bg")
})
document.getElementById("menu_btn-close").addEventListener("click",function(){
    document.getElementById("blur-bg").classList.remove("blur-bg")
})

var open = document.getElementById("menu_btn-open")
open.onmouseover = function(){
    document.getElementById("hover1").classList.toggle("hover1")
}
open.onmouseout = function(){
    document.getElementById("hover1").classList.remove("hover1")
}

var close = document.getElementById("menu_btn-close")
close.onmouseover = function(){
    document.getElementById("hover2").classList.toggle("hover2")
}
close.onmouseout = function(){
    document.getElementById("hover2").classList.remove("hover2")
}