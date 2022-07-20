// chrome window size
var vw = 0;
var vh = 0;
// image origin size
var img_nature_w = 0;
var img_nature_h = 0;
// image real size in chrome
var img_w = 0;
var img_h = 0;

var json_file;

var FIRSTCALL = 1;
var FIRSTCALL_SHOPPING = 1;
var SHOW_SHOPPING = 0
var INPUT = 0

function get_json_file(){
    var path = window.location.pathname;
    var path_arr = path.split("/");

    var page = path_arr[path_arr.length-1];
    var json_filename = page.split(".")[0]
    var json_path = path_arr.slice(0, path_arr.length-1).join("/") + "/assets/ui_elements/"
                    + page.replace("html", "json");
    if (page === "w0311.html") {
        SHOW_SHOPPING = 1
    }
    if (page === "w0312.html") {
        INPUT = 1
    }
    json_path = "./assets/ui_element_jsons/"
                    + page.replace("html", "json");
    // json_path = "https://github.com/Hubert51/brushlen_json_file/tree/main/ui_element_jsons" +
    //                 page.replace("html", "json");
    //

    return json_path;
}

function resize_image() {
    vw = document.documentElement.clientWidth
    vh = document.documentElement.clientHeight
    img = document.getElementsByTagName('img')[0];
    img_nature_w = img.naturalWidth
    img_nature_h = img.naturalHeight
    img_w = img.width
    img_h = img.height

    var screen_ratio = vw / vh;
    var img_ratio = img_nature_w / img_nature_h;
    if (screen_ratio > img_ratio) {
        document.getElementsByTagName("img")[0].style.width = "";
        document.getElementsByTagName("img")[0].style.height = "100%";

    } else {
        document.getElementsByTagName("img")[0].style.width = "100%";
        document.getElementsByTagName("img")[0].style.height = "";
        // document.getElementById("start_screen").style.height = "100%";
    }
}

async function getButtons(json_file) {
    var rtn;
    $.getJSON(json_file, function(json) {
    // });
    // return
    // const response = await fetch(json_file);
    // response.json().then(value => {
        var value = json;
        var buttons = json.buttons;

        if (FIRSTCALL) {
            if ("input" in json){
                var inputBoxes = json.input;
                var inputBox;
                for (let i = 0; i < inputBoxes.length; i++) {
                    inputBox = inputBoxes[i]

                    let btn = document.createElement("input");
                    // btn.innerHTML = `Click Me ${i}`;
                    btn.id = `inputBox${i}`
                    btn.setAttribute("class", "inputBox")
                    document.getElementsByClassName("container")[0].appendChild(btn);

                    let bbox = inputBox["pos"]
                    btn.style.left = (bbox[0] * (img_w / img_nature_w)).toString() + "px";
                    btn.style.top = (bbox[1] * (img_h / img_nature_h)).toString() + "px";
                    btn.style.width = (bbox[2] * (img_w / img_nature_w)).toString() + "px";
                    btn.style.height = (bbox[3] * (img_h / img_nature_h)).toString() + "px";
                }
            }
            var button;
            for (let i = 0; i < buttons.length; i++) {
                button = buttons[i]

                let btn = document.createElement("button");
                // btn.innerHTML = `Click Me ${i}`;
                btn.id = `button${i}`
                btn.setAttribute("class", "btn")
                // const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3')
                // btn.addEventListener('click', (e) => {
                //   audio.play()
                //   audio.addEventListener('ended', function () {
                //     if (buttons[i]["link_to"] !== "") {
                //         location.href = buttons[i]["link_to"] + ".html";
                //     }
                //   });
                // })
                document.getElementsByClassName("container")[0].appendChild(btn);
                document.getElementById(btn.id).onclick = function () {
                    // location.href = "w021_menu_beverage_coffee.html";
                    const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3')
                    audio.play()
                    audio.addEventListener('ended', function () {
                        if (buttons[i]["link_to"] !== "") {
                            location.href = buttons[i]["link_to"] + ".html";
                        }
                    });
                    // if (buttons[i]["link_to"] !== "") {
                    //     location.href = buttons[i]["link_to"] + ".html";
                    // }
                };

                let bbox = button["pos"]
                btn.style.left = (bbox[0] * (img_w / img_nature_w)).toString() + "px";
                btn.style.top = (bbox[1] * (img_h / img_nature_h)).toString() + "px";
                btn.style.width = (bbox[2] * (img_w / img_nature_w)).toString() + "px";
                btn.style.height = (bbox[3] * (img_h / img_nature_h)).toString() + "px";
            }
            FIRSTCALL = 0
        } else{
            for (let i = 0; i < buttons.length; i++) {
                button = buttons[i]
                let bbox = button["pos"]
                let btn = document.getElementById(`button${i}`)
                btn.style.left = (bbox[0] * (img_w / img_nature_w)).toString() + "px";
                btn.style.top = (bbox[1] * (img_h / img_nature_h)).toString() + "px";
                btn.style.width = (bbox[2] * (img_w / img_nature_w)).toString() + "px";
                btn.style.height = (bbox[3] * (img_h / img_nature_h)).toString() + "px";
            }
            if ("input" in json){
                var inputBoxes = json.input
                for (let i = 0; i < inputBoxes.length; i++) {
                    inputBox = inputBoxes[i]

                    let bbox = inputBox["pos"]
                    let input = document.getElementById(`inputBox${i}`)

                    input.style.left = (bbox[0] * (img_w / img_nature_w)).toString() + "px";
                    input.style.top = (bbox[1] * (img_h / img_nature_h)).toString() + "px";
                    input.style.width = (bbox[2] * (img_w / img_nature_w)).toString() + "px";
                    input.style.height = (bbox[3] * (img_h / img_nature_h)).toString() + "px";
                }
            }
        }
    })
}

async function handleLabel(label_file) {
    const response = await fetch(json_file);
    response.json().then(value => {
        var cart = value.cart;

        if (FIRSTCALL_SHOPPING) {
            // get shopping cart text
            var path = "shopping_cart.txt"
            var shopping_cart = {};
            fetch(path)
                .then(response => response.text())
                .then(text => {
                    var items = text.split("\n")

                    for (let i = 0; i < items.length; i++) {
                        if (items[i] in shopping_cart) {
                            shopping_cart[items[i]] += 1;
                        } else {
                            shopping_cart[items[i]] = 1;
                        }
                    }

                    // add text into the html
                    var innerString = ""
                    for (const [key, value] of Object.entries(shopping_cart)) {
                        innerString += key + "\ \ \ \ \ \ \ \ \ \ \ *" + value + '\n'
                    }
                    let paragraph = document.createElement("p");
                    paragraph.innerText = innerString;
                    paragraph.setAttribute("class", "text")
                    document.getElementsByClassName("container")[0].appendChild(paragraph);
                    let bbox = cart[0]["pos"]
                    paragraph.style.left = (bbox[0] * (img_w / img_nature_w)).toString() + "px";
                    paragraph.style.top = (bbox[1] * (img_h / img_nature_h)).toString() + "px";
                    paragraph.style.width = (bbox[2] * (img_w / img_nature_w)).toString() + "px";
                    paragraph.style.height = (bbox[3] * (img_h / img_nature_h)).toString() + "px";
                    FIRSTCALL_SHOPPING = 0
                    return
                })
        } else {
            let bbox = cart[0]["pos"]
            let btn = document.getElementsByClassName("text")[0]
            btn.style.left = (bbox[0] * (img_w / img_nature_w)).toString() + "px";
            btn.style.top = (bbox[1] * (img_h / img_nature_h)).toString() + "px";
            btn.style.width = (bbox[2] * (img_w / img_nature_w)).toString() + "px";
            btn.style.height = (bbox[3] * (img_h / img_nature_h)).toString() + "px";
        }
    });

}

$( document ).ready(function() {
    vw = document.documentElement.clientWidth
    vh = document.documentElement.clientHeight
    var img = document.getElementsByTagName('img')[0];
    img_nature_w = img.naturalWidth
    img_nature_h = img.naturalHeight

    img_w = img.width
    img_h = img.height

    // document.querySelector("img").naturalHeight;
    // document.querySelector("img").naturalWidth;
    // document.getElementById("demo").innerHTML = "%s and %s" % vw, vh;
    var screen_ratio = vw / vh;
    var img_ratio = vw / vh;

    resize_image();

    json_file = get_json_file();

    var buttons = getButtons(json_file);
    if (SHOW_SHOPPING) {
        handleLabel(json_file)
    }
    window.resizeTo(800, 600)

    // fetch(json_file)
    //     .then(response => response.json())
    //     .then(json => buttons = json);

    // var buttons = null;
    // var json = require("w0X11.html");

    // $.getJSON(json_file, function(json) {

    //     buttons = json
    // });
    // while (buttons == null){
    //     continue
    // }

});
window.addEventListener('resize', function(event){
    resize_image();

    getButtons(json_file);
    if (SHOW_SHOPPING) {
        handleLabel(json_file)
    }

});