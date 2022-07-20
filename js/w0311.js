
function read_shopping_cart() {
    var path = "shopping_cart.txt"
    var shopping_cart = {};
    fetch(path)
        .then(response => response.text())
        .then(text => {
            var items = text.split("\n")
            console.log(items)

            for (let i = 0; i < items.length; i++) {
                if (items[i] in shopping_cart) {
                    shopping_cart[items[i]] += 1;
                } else {
                    shopping_cart[items[i]] = 1;
                }
            }

            console.log(shopping_cart)
            // add text into the html
            let div = document.createElement("div");

            for (const [key, value] of Object.entries(shopping_cart)) {
                console.log(`${key}: ${value}`);
                div.innerHTML += `<p>${key}<\p>`;
                div.setAttribute("class", "text")
                console.log(div.innerText)
            }
            document.getElementsByClassName("container")[0].appendChild(div);

        })
}

$( document ).ready(function() {
    read_shopping_cart()
});