var sa = '<a href="';
var ea = '</a>';
var scriptTag = document.currentScript; // get the current script tag
var parentElement = scriptTag.parentNode; // get the parent element of the script tag
var classes = parentElement.className.split(' ');
switch (true) {
    case classes.includes("cont-tg"):
        var middle = 'https://t.me/Militore"><img class="no-expand" src="img/t_logo_2x.png">';
        break;
    case classes.includes("cont-wa"):
        var middle = 'https://wa.me/89202303555"><img class="no-expand" src="img/whatsapp.png">';
        break;
}
text = sa+middle+ea

document.write(text);