window.addEventListener("load", loadPage)
let load = document.getElementById("load")

// Loader animation
function loadPage() {
    let gif = document.createElement("img")
    gif.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/t/11/assets/286.gif?11553")
    load.append(gif)
    let container = document.getElementById("container")
    container.style.opacity = 0.75
    container.append(load)
    setTimeout(display, 2000)
}

function display() {

    let container = document.getElementById("container")
    container.style.opacity = 1
    container.prepend(load) 
    load.innerHTML = ""
    
    let loc = window.location.search
    let urlSearchParams = new URLSearchParams(loc)
    let query = urlSearchParams.get("id")
    let url = `http://localhost:3000/basshead_products?id=${query}`
    fetch(url)
    .then(res => res.json())
    .then(res => displayDetails(res))
}

function displayDetails(data) {

    let display = document.getElementById("display")

    for(i in data) {
        let img_part = document.createElement("div")
        img_part.className = "img_part"
        img_part.id = "img_part"

        let details_part = document.createElement("div")
        details_part.className = "details_part"

        let img = document.createElement("img")
        img.setAttribute("src", data[i].img_url_hover)
        img.className = "bounce-2"
        img_part.append(img)

        let name = document.createElement("h1")
        name.innerHTML = data[i].product_name

        // ---------------------stars and review--------------------
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

        let save_price_box = document.createElement("div")
        save_price_box.className = "save_price_box"
        let saved_price = document.createElement("p")
        saved_price.className = "save_price"
        saved_price.innerHTML = "You save "
        let save_span = document.createElement("span")
        save_span.className = "save_span"
        save_span.style.color = "red"
        save_span.innerHTML = data[i].price_saved
        save_price_box.append(saved_price, save_span)

        let ul = document.createElement("ul")
        for(let j in data[i].features[i]) {
            let li = document.createElement("li")
            li.innerHTML = "✓ " + data[i].features[i][j]
            ul.append(li)
        }

        let detail_line = document.createElement("div")
        detail_line.className = "detail_line"

        let color_circles = document.createElement("div")
        color_circles.className = "color_circles"

        let output = ""
        for(let k in data[i].colors) {
            output += `<div class="circles" id="${data[i].colors[k].id}" onclick="changeColor(this)" style="background-color:${data[i].colors[k].color}"></div>`   
            var color_selected = data[i].colors[0].color
            var url_selected = data[i].colors[0].url
        }
        color_circles.innerHTML = output

        let quantity = document.createElement("p")
        quantity.textContent = "Quantity"

        let change_quantity = document.createElement("div")
        change_quantity.className = "change_quantity"
        let decrease = document.createElement("div")
        decrease.className = "decrease"
        decrease.id = "decrease"
        decrease.onclick = decreaseValue
        decrease.textContent = "-"
        let number = document.createElement("input")
        number.value = 1
        number.className = "number"
        number.id = "number"
        let increase = document.createElement("div")
        increase.textContent = "+"
        increase.className = "increase"
        increase.id = "increase"
        increase.onclick = increaseValue
        change_quantity.append(decrease, number, increase)

        let btn_div = document.createElement("div")
        btn_div.className = "cart_buy_btn"
        let add_to_cart_btn = document.createElement("input")
        add_to_cart_btn.type = "submit"
        add_to_cart_btn.value = "Add to Cart"
        add_to_cart_btn.className = "add_to_cart_btn"
        add_to_cart_btn.id = "add_to_cart_btn"

        let buy_it_btn = document.createElement("input")
        buy_it_btn.type = "submit"
        buy_it_btn.value = "Buy it now"
        buy_it_btn.className = "buy_it_btn"
        buy_it_btn.id = "buy_it_btn"

        btn_div.append(add_to_cart_btn, buy_it_btn)

        let warranty = document.createElement("img")
        warranty.className = "warranty"
        warranty.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon4.png?v=1605003218")

        let detail_line2 = document.createElement("div")
        detail_line2.className = "detail_line"

        details_part.append(name, stars_rev, cost, save_price_box, ul, detail_line, color_circles, quantity, change_quantity, btn_div, warranty, detail_line2)
        
        display.append(img_part, details_part)

        let cart_btn = document.getElementById("add_to_cart_btn")
        cart_btn.addEventListener("click", function() {

            let obj = {
                "id": data[i].id,
                "name": data[i].product_name,
                "color": color_selected,
                "price": data[i].curr_price,
                "quantity": number.value,
                "total": Number(data[i].curr_price * number.value),
                "img_url": url_selected
            }
            console.log(obj)

            let store_details = localStorage.getItem("cart_items")
            if(store_details == null) {
                store_details_obj = []
            } else {
                store_details_obj = JSON.parse(store_details)
            }

            store_details_obj.push(obj)
            localStorage.setItem("cart_items", JSON.stringify(store_details_obj))

            location = "my_cart.html"

        })
    }

    
}


function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10)
    value = isNaN(value) ? 0 : value
    value++
    document.getElementById('number').value = value
  }
  
  function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10)
    value = isNaN(value) ? 0 : value
    value < 1 ? value = 1 : ''
    if(value > 1) {
        value--
    }
    
    document.getElementById('number').value = value
  }

//   ------------------------------------------------change color--------------------------------

function changeColor(e) {

    // console.log(e.id)
    if(e.id == "1") {
        changeColor1()
    } else if(e.id == "2") {
        changeColor2()
    } else {
        changeColor3()
    }

}


function changeColor1() {
    window.addEventListener("load", loadPage)
        let load = document.getElementById("load")
        let displayyy = document.getElementById("display")
        displayyy.innerHTML = ""
        
        // Loader animation
        function loadPage() {
            let gif = document.createElement("img")
            gif.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/t/11/assets/286.gif?11553")
            load.append(gif)
            let container = document.getElementById("container")
            container.style.opacity = 0.75
            container.append(load)
            setTimeout(display, 2000)
        }
        display()
        
        function display() {
        
            // let container = document.getElementById("container")
            container.style.opacity = 1
            container.prepend(load) 
            load.innerHTML = ""
            
            let loc = window.location.search
            let urlSearchParams = new URLSearchParams(loc)
            let query = urlSearchParams.get("id")
            let url = `http://localhost:3000/basshead_products?id=${query}`
            fetch(url)
            .then(res => res.json())
            .then(res => displayDetails(res))
        }
        
        function displayDetails(data) {
    
            for(i in data) {
                let img_part = document.createElement("div")
                img_part.className = "img_part"
                img_part.id = "img_part"
        
                let details_part = document.createElement("div")
                details_part.className = "details_part"
        
                let img = document.createElement("img")
                img.setAttribute("src", data[i].colors[0].url)
                img.className = "bounce-2"
                img_part.append(img)
        
        
                let name = document.createElement("h1")
                name.innerHTML = data[i].product_name
        
                // ---------------------stars and review--------------------
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
        
                let save_price_box = document.createElement("div")
                save_price_box.className = "save_price_box"
                let saved_price = document.createElement("p")
                saved_price.className = "save_price"
                saved_price.innerHTML = "You save "
                let save_span = document.createElement("span")
                save_span.className = "save_span"
                save_span.style.color = "red"
                save_span.innerHTML = data[i].price_saved
                save_price_box.append(saved_price, save_span)
        
                let ul = document.createElement("ul")
                for(let j in data[i].features[i]) {
                    let li = document.createElement("li")
                    li.innerHTML = "✓ " + data[i].features[i][j]
                    ul.append(li)
                }
        
                let detail_line = document.createElement("div")
                detail_line.className = "detail_line"
        
                let color_circles = document.createElement("div")
                color_circles.className = "color_circles"
        
                let output = ""
                for(let k in data[i].colors) {
                    output += `<div class="circles" id="${data[i].colors[k].id}" onclick="changeColor(this)" style="background-color:${data[i].colors[k].color}"></div>`   
                    var color_selected = data[i].colors[0].color
                    var url_selected = data[i].colors[0].url
                }
                color_circles.innerHTML = output
        
                let quantity = document.createElement("p")
                quantity.textContent = "Quantity"
        
                let change_quantity = document.createElement("div")
                change_quantity.className = "change_quantity"
                let decrease = document.createElement("div")
                decrease.className = "decrease"
                decrease.id = "decrease"
                decrease.onclick = decreaseValue
                decrease.textContent = "-"
                let number = document.createElement("input")
                number.value = 1
                number.className = "number"
                number.id = "number"
                let increase = document.createElement("div")
                increase.textContent = "+"
                increase.className = "increase"
                increase.id = "increase"
                increase.onclick = increaseValue
                change_quantity.append(decrease, number, increase)
        
                let btn_div = document.createElement("div")
                btn_div.className = "cart_buy_btn"
                let add_to_cart_btn = document.createElement("input")
                add_to_cart_btn.type = "submit"
                add_to_cart_btn.value = "Add to Cart"
                add_to_cart_btn.className = "add_to_cart_btn"
                add_to_cart_btn.id = "add_to_cart_btn"
        
                let buy_it_btn = document.createElement("input")
                buy_it_btn.type = "submit"
                buy_it_btn.value = "Buy it now"
                buy_it_btn.className = "buy_it_btn"
                buy_it_btn.id = "buy_it_btn"
        
                btn_div.append(add_to_cart_btn, buy_it_btn)
        
                let warranty = document.createElement("img")
                warranty.className = "warranty"
                warranty.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon4.png?v=1605003218")
        
                let detail_line2 = document.createElement("div")
                detail_line2.className = "detail_line"
        
                details_part.append(name, stars_rev, cost, save_price_box, ul, detail_line, color_circles, quantity, change_quantity, btn_div, warranty, detail_line2)
                
                displayyy.append(img_part, details_part)

                let cart_btn = document.getElementById("add_to_cart_btn")
                cart_btn.addEventListener("click", function() {

                let obj = {
                    "id": data[i].id,
                    "name": data[i].product_name,
                    "color": color_selected,
                    "price": data[i].curr_price,
                    "quantity": number.value,
                    "total": Number(data[i].curr_price * number.value),
                    "img_url": url_selected
                }

                console.log(obj)

                let store_details = localStorage.getItem("cart_items")
                if(store_details == null) {
                    store_details_obj = []
                } else {
                    store_details_obj = JSON.parse(store_details)
                }

                store_details_obj.push(obj)
                localStorage.setItem("cart_items", JSON.stringify(store_details_obj))

                location = "my_cart.html"
            })
            }
        }
    }


function changeColor2() {
window.addEventListener("load", loadPage)
    let load = document.getElementById("load")
    let displayyy = document.getElementById("display")
    displayyy.innerHTML = ""
    
    // Loader animation
    function loadPage() {
        let gif = document.createElement("img")
        gif.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/t/11/assets/286.gif?11553")
        load.append(gif)
        let container = document.getElementById("container")
        container.style.opacity = 0.75
        container.append(load)
        setTimeout(display, 2000)
    }
    display()
    
    function display() {
    
        // let container = document.getElementById("container")
        container.style.opacity = 1
        container.prepend(load) 
        load.innerHTML = ""
        
        let loc = window.location.search
        let urlSearchParams = new URLSearchParams(loc)
        let query = urlSearchParams.get("id")
        let url = `http://localhost:3000/basshead_products?id=${query}`
        fetch(url)
        .then(res => res.json())
        .then(res => displayDetails(res))
    }
    
    function displayDetails(data) {

        for(i in data) {
            let img_part = document.createElement("div")
            img_part.className = "img_part"
            img_part.id = "img_part"
    
            let details_part = document.createElement("div")
            details_part.className = "details_part"
    
            let img = document.createElement("img")
            img.setAttribute("src", data[i].colors[1].url)
            img.className = "bounce-2"
            img_part.append(img)
    
    
            let name = document.createElement("h1")
            name.innerHTML = data[i].product_name
    
            // ---------------------stars and review--------------------
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
    
            let save_price_box = document.createElement("div")
            save_price_box.className = "save_price_box"
            let saved_price = document.createElement("p")
            saved_price.className = "save_price"
            saved_price.innerHTML = "You save "
            let save_span = document.createElement("span")
            save_span.className = "save_span"
            save_span.style.color = "red"
            save_span.innerHTML = data[i].price_saved
            save_price_box.append(saved_price, save_span)
    
            let ul = document.createElement("ul")
            for(let j in data[i].features[i]) {
                let li = document.createElement("li")
                li.innerHTML = "✓ " + data[i].features[i][j]
                ul.append(li)
            }
    
            let detail_line = document.createElement("div")
            detail_line.className = "detail_line"
    
            let color_circles = document.createElement("div")
            color_circles.className = "color_circles"
    
            let output = ""
            for(let k in data[i].colors) {
                output += `<div class="circles" id="${data[i].colors[k].id}" onclick="changeColor(this)" style="background-color:${data[i].colors[k].color}"></div>`   
                var color_selected = data[i].colors[1].color
                var url_selected = data[i].colors[1].url
            }
            color_circles.innerHTML = output
    
            let quantity = document.createElement("p")
            quantity.textContent = "Quantity"
    
            let change_quantity = document.createElement("div")
            change_quantity.className = "change_quantity"
            let decrease = document.createElement("div")
            decrease.className = "decrease"
            decrease.id = "decrease"
            decrease.onclick = decreaseValue
            decrease.textContent = "-"
            let number = document.createElement("input")
            number.value = 1
            number.className = "number"
            number.id = "number"
            let increase = document.createElement("div")
            increase.textContent = "+"
            increase.className = "increase"
            increase.id = "increase"
            increase.onclick = increaseValue
            change_quantity.append(decrease, number, increase)
    
            let btn_div = document.createElement("div")
            btn_div.className = "cart_buy_btn"
            let add_to_cart_btn = document.createElement("input")
            add_to_cart_btn.type = "submit"
            add_to_cart_btn.value = "Add to Cart"
            add_to_cart_btn.className = "add_to_cart_btn"
            add_to_cart_btn.id = "add_to_cart_btn"
    
            let buy_it_btn = document.createElement("input")
            buy_it_btn.type = "submit"
            buy_it_btn.value = "Buy it now"
            buy_it_btn.className = "buy_it_btn"
            buy_it_btn.id = "buy_it_btn"
    
            btn_div.append(add_to_cart_btn, buy_it_btn)
    
            let warranty = document.createElement("img")
            warranty.className = "warranty"
            warranty.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon4.png?v=1605003218")
    
            let detail_line2 = document.createElement("div")
            detail_line2.className = "detail_line"
    
            details_part.append(name, stars_rev, cost, save_price_box, ul, detail_line, color_circles, quantity, change_quantity, btn_div, warranty, detail_line2)
            
            displayyy.append(img_part, details_part)

            let cart_btn = document.getElementById("add_to_cart_btn")
            cart_btn.addEventListener("click", function() {

                let obj = {
                    "id": data[i].id,
                    "name": data[i].product_name,
                    "color": color_selected,
                    "price": data[i].curr_price,
                    "quantity": number.value,
                    "total": Number(data[i].curr_price * number.value),
                    "img_url": url_selected
                }

            console.log(obj)

            let store_details = localStorage.getItem("cart_items")
            if(store_details == null) {
                store_details_obj = []
            } else {
                store_details_obj = JSON.parse(store_details)
            }

            store_details_obj.push(obj)
            localStorage.setItem("cart_items", JSON.stringify(store_details_obj))
            location = "my_cart.html"
        })
        }
    }
}


function changeColor3() {
    window.addEventListener("load", loadPage)
        let load = document.getElementById("load")
        let displayyy = document.getElementById("display")
        displayyy.innerHTML = ""
        
        // Loader animation
        function loadPage() {
            let gif = document.createElement("img")
            gif.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/t/11/assets/286.gif?11553")
            load.append(gif)
            let container = document.getElementById("container")
            container.style.opacity = 0.75
            container.append(load)
            setTimeout(display, 2000)
        }
        display()
        
        function display() {
        
            // let container = document.getElementById("container")
            container.style.opacity = 1
            container.prepend(load) 
            load.innerHTML = ""
            
            let loc = window.location.search
            let urlSearchParams = new URLSearchParams(loc)
            let query = urlSearchParams.get("id")
            let url = `http://localhost:3000/basshead_products?id=${query}`
            fetch(url)
            .then(res => res.json())
            .then(res => displayDetails(res))
        }
        
        function displayDetails(data) {
    
            for(i in data) {
                let img_part = document.createElement("div")
                img_part.className = "img_part"
                img_part.id = "img_part"
        
                let details_part = document.createElement("div")
                details_part.className = "details_part"
        
                let img = document.createElement("img")
                img.setAttribute("src", data[i].colors[2].url)
                img.className = "bounce-2"
                img_part.append(img)
        
        
                let name = document.createElement("h1")
                name.innerHTML = data[i].product_name
        
                // ---------------------stars and review--------------------
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
        
                let save_price_box = document.createElement("div")
                save_price_box.className = "save_price_box"
                let saved_price = document.createElement("p")
                saved_price.className = "save_price"
                saved_price.innerHTML = "You save "
                let save_span = document.createElement("span")
                save_span.className = "save_span"
                save_span.style.color = "red"
                save_span.innerHTML = data[i].price_saved
                save_price_box.append(saved_price, save_span)
        
                let ul = document.createElement("ul")
                for(let j in data[i].features[i]) {
                    let li = document.createElement("li")
                    li.innerHTML = "✓ " + data[i].features[i][j]
                    ul.append(li)
                }
        
                let detail_line = document.createElement("div")
                detail_line.className = "detail_line"
        
                let color_circles = document.createElement("div")
                color_circles.className = "color_circles"
        
                let output = ""
                for(let k in data[i].colors) {
                    output += `<div class="circles" id="${data[i].colors[k].id}" onclick="changeColor(this)" style="background-color:${data[i].colors[k].color}"></div>`   
                    var color_selected = data[i].colors[2].color
                    var url_selected = data[i].colors[2].url
                }
                color_circles.innerHTML = output
        
                let quantity = document.createElement("p")
                quantity.textContent = "Quantity"
        
                let change_quantity = document.createElement("div")
                change_quantity.className = "change_quantity"
                let decrease = document.createElement("div")
                decrease.className = "decrease"
                decrease.id = "decrease"
                decrease.onclick = decreaseValue
                decrease.textContent = "-"
                let number = document.createElement("input")
                number.value = 1
                number.className = "number"
                number.id = "number"
                let increase = document.createElement("div")
                increase.textContent = "+"
                increase.className = "increase"
                increase.id = "increase"
                increase.onclick = increaseValue
                change_quantity.append(decrease, number, increase)
        
                let btn_div = document.createElement("div")
                btn_div.className = "cart_buy_btn"
                let add_to_cart_btn = document.createElement("input")
                add_to_cart_btn.type = "submit"
                add_to_cart_btn.value = "Add to Cart"
                add_to_cart_btn.className = "add_to_cart_btn"
                add_to_cart_btn.id = "add_to_cart_btn"
        
                let buy_it_btn = document.createElement("input")
                buy_it_btn.type = "submit"
                buy_it_btn.value = "Buy it now"
                buy_it_btn.className = "buy_it_btn"
                buy_it_btn.id = "buy_it_btn"
        
                btn_div.append(add_to_cart_btn, buy_it_btn)
        
                let warranty = document.createElement("img")
                warranty.className = "warranty"
                warranty.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon4.png?v=1605003218")
        
                let detail_line2 = document.createElement("div")
                detail_line2.className = "detail_line"
        
                details_part.append(name, stars_rev, cost, save_price_box, ul, detail_line, color_circles, quantity, change_quantity, btn_div, warranty, detail_line2)
                
                displayyy.append(img_part, details_part)

                let cart_btn = document.getElementById("add_to_cart_btn")
                cart_btn.addEventListener("click", function() {

                    let obj = {
                        "id": data[i].id,
                        "name": data[i].product_name,
                        "color": color_selected,
                        "price": data[i].curr_price,
                        "quantity": number.value,
                        "total": Number(data[i].curr_price * number.value),
                        "img_url": url_selected
                    }

                    console.log(obj)

                    let store_details = localStorage.getItem("cart_items")
                    if(store_details == null) {
                        store_details_obj = []
                    } else {
                        store_details_obj = JSON.parse(store_details)
                    }

                    store_details_obj.push(obj)
                    localStorage.setItem("cart_items", JSON.stringify(store_details_obj))

                    location = "my_cart.html"
                })
            }
        }
    }













 




    
    
        

    
