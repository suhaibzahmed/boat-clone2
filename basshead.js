window.addEventListener("load", loadData)

let sort_btn = document.getElementById("sort_btn")
sort_btn.addEventListener("click", function() {
    let select_op = document.getElementById("sort_order")
    console.log(select_op.value)

    if(select_op.value == "featured") {
        loadData()
    } else if(select_op.value == "low_to_high") {
        loadDataLowToHigh()
    } else if(select_op.value == "high_to_low") {
        loadDataHighToLow()
    }
})

async function loadDataLowToHigh() {
    let products = document.getElementById("products")
    products.innerHTML = ""
    try {
        fetch("http://localhost:3000/basshead_products?_sort=curr_price&_order=asc")
        .then(response => response.json())
        .then(result => displayData(result))
    } catch(err) {
        console.log("Error occured " + err)
    } 
}

async function loadDataHighToLow() {
    let products = document.getElementById("products")
    products.innerHTML = ""
    try {
        fetch("http://localhost:3000/basshead_products?_sort=curr_price&_order=desc")
        .then(response => response.json())
        .then(result => displayData(result))
    } catch(err) {
        console.log("Error occurred " + err)
    }
}

async function loadData() {
    try {
        fetch("http://localhost:3000/basshead_products")
        .then(res => res.json())
        .then(res => displayData(res))
    }
    catch(err) {
        console.log("Error occured " + err)
    }
}

function displayData(data) {

    let products = document.getElementById("products")
    products.innerHTML = ""
    for(i in data) {
        let card = document.createElement("card")
        card.className = "card"
        card.id = data[i].id
        card.addEventListener("click", function() {
            let params = new URLSearchParams()
            params.append("id", card.id)
            let url = "basshead_item_detail.html"
            window.location.assign(url + "?" + params.toString())
        })

        let img_url = document.createElement("img")
        img_url.setAttribute("src", data[i].img_url)

        let prod_name = document.createElement("h2")
        prod_name.textContent = data[i].product_name

        let stars_rev = document.createElement("div")
        stars_rev.className = "stars_review"

        let stars = document.createElement("div")
        stars.className = "all_stars"
        let s1 = document.createElement("i")
        s1.className = "fa fa-star checked"
        let s2 = document.createElement("i")
        s2.className = "fa fa-star checked"
        let s3 = document.createElement("i")
        s3.className = "fa fa-star checked"
        let s4 = document.createElement("i")
        s4.className = "fa fa-star checked"
        let s5 = document.createElement("i")
        s5.className = "fa fa-star checked"

        let s11 = document.createElement("i")
        s11.className = "fa fa-star"
        let s21 = document.createElement("i")
        s21.className = "fa fa-star"
        let s31 = document.createElement("i")
        s31.className = "fa fa-star"
        let s41 = document.createElement("i")
        s41.className = "fa fa-star"
        let s51 = document.createElement("i")
        s51.className = "fa fa-star"

        let review = document.createElement("p")
        review.textContent = data[i].reviews + " reviews"

        if(data[i].stars == 1) {
            stars.append(s1, s11, s21, s31, s41)
        } else if(data[i].stars == 2) {
            stars.append(s1, s2, s11, s21, s31)
        } else if(data[i].stars == 3) {
            stars.append(s1, s2, s3, s11, s21)
        } else if(data[i].stars == 4) {
            stars.append(s1, s2, s3, s4, s11)
        } else if(data[i].stars == 5) {
            stars.append(s1, s2, s3, s4, s5)
        }

        stars_rev.append(stars, review)

        let cost = document.createElement("div")
        cost.className = "cost"
        let curr_price = document.createElement("p")
        curr_price.className = "current_price"
        curr_price.textContent = "Rs. " + data[i].curr_price
        let old_price = document.createElement("p")
        old_price.className = "old_price"
        old_price.textContent = "Rs. " + data[i].old_price
        cost.append(curr_price, old_price)
        
        card.append(img_url, prod_name, stars_rev, cost)

        products.append(card)
    }

}