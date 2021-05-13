window.addEventListener("load", loadData)
var total = 0

function loadData() {

    let display = document.getElementById("display")

    let store_details = localStorage.getItem("cart_items")
    if(store_details == null) {
        store_details_obj = []
    } else {
        store_details_obj = JSON.parse(store_details)
    }
    
    let output = ""
    let sum = 0
    store_details_obj.forEach(function(item, index) {

        // Cart product details
        // var cart_product_display = document.createElement("div")
        // cart_product_display.className = "cart_product_display"

        output += `<div class="cart_product_display">
                        <div class="remove_item" onclick="removeItem(${index})">&#10006</div>
                        <div><img src = "${item.img_url}"></div>
                        <div class="name_color">
                            <p>${item.name}</p>
                            <div class="prod_color" style="background-color:${item.color}"></div>
                        </div>
                        <div>
                            <p class="prod_price" id="prod_price">Rs. <span id="item_price${index}">${item.price}</span></p>
                        </div>
                        <div class="change_quantity">
                            <div class="decrease" onclick="decreaseValue(${index})" id="decrease">-</div>
                            <input class="number" id="${index}" value=${item.quantity}>
                            <div class="increase" onclick="increaseValue(${index})" id="increase">+</div>
                        </div>
                        <div class="total_cost" id="cost${index}">Rs. <span id="final_cost${index}" class="fin_cost">${item.total}</span></div>
                    </div>
                    <div class="prod_line" style="margin-top:-15px"></div>`
    })

    display.innerHTML = output
    displayBill()
}

function removeItem(index) {
    let val = localStorage.getItem("cart_items")
    let store_details_obj = JSON.parse(val)
    store_details_obj.splice(index, 1)
    localStorage.setItem("cart_items", JSON.stringify(store_details_obj))
    loadData()

}



function increaseValue(index) {
    let final = document.getElementById(`final_cost${index}`)
    let item_price = document.getElementById(`item_price${index}`)
    let item = item_price.textContent
    final.innerHTML = ""

    var value = parseInt(document.getElementById(index).value, 10)
    value = isNaN(value) ? 0 : value
    value++
    document.getElementById(index).value = value
    final.innerHTML = Number(value) * Number(item)
    
    displayBill()
    // arr.push(Number(final.innerHTML))
  }
  
  function decreaseValue(index) {
  
    let item_price = document.getElementById(`item_price${index}`)
    let item = item_price.textContent
    let final = document.getElementById(`final_cost${index}`)
    final.innerHTML = ""
    var value = parseInt(document.getElementById(index).value, 10)
    value = isNaN(value) ? 0 : value
    value < 1 ? value = 1 : ''
    if(value > 1) {
        value--
    }
    
    document.getElementById(index).value = value
    final.innerHTML = Number(value) * Number(item)
    displayBill()
    // arr.push(Number(final.innerHTML))
  }
  
function displayBill () {
    
    let display = document.getElementById("display")
    var total = document.createElement("div")
    total.className = "total_bill"
    total.id = "total_bill"
    total.innerHTML = ""
    display.append(total)
    total.onclick = calculate()
    
}

function calculate() {
    let display = document.getElementById("display")
    let tot = document.getElementById("total_bill")
    tot.innerHTML = ""
    let sum = 0
    let store_details = localStorage.getItem("cart_items")
if(store_details == null) {
    store_details_obj = []
} else {
    store_details_obj = JSON.parse(store_details)
}

for(let i=0 ; i<store_details_obj.length ; i++) {
    let price = document.getElementById(`final_cost${i}`)
    let val = Number(price.innerHTML)
    sum = sum + val
}
console.log(sum)
tot.innerHTML = "Total: Rs. " + sum

var checkout = document.createElement("div")
checkout.textContent = "CHECKOUT"
checkout.className = "checkout"
checkout.id = "checkout"

display.append(checkout)

let goBack = document.getElementById("checkout")
goBack.addEventListener("click", function() {
    location = "basshead.html"
})
}

