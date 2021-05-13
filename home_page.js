// Top Images Slider

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}


// Comments image slider
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides2");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000); // Change image every 5 seconds
}




let logo1 = document.getElementById("logo1")
let logo2 = document.getElementById("logo2")
let logo3 = document.getElementById("logo3")
let logo4 = document.getElementById("logo4")
let logo5 = document.getElementById("logo5")

logo1.addEventListener("mouseover", function() {
  let display_comment = document.getElementById("display_comment")
  display_comment.innerHTML = ""
  // <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078">
  //                   <p>Warburg invests $100 mn in boAt</p>
  let img = document.createElement("img")
  img.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078")
  let comment = document.createElement("p")
  comment.textContent = "Warburg invests $100 mn in boAt"

  display_comment.append(img, comment)
})

logo2.addEventListener("mouseover", function() {
  let display_comment = document.getElementById("display_comment")
  display_comment.innerHTML = ""
  // <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078">
  //                   <p>Warburg invests $100 mn in boAt</p>
  let img = document.createElement("img")
  img.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078")
  let comment = document.createElement("p")
  comment.textContent = "How India's boAt became the fifth largest wearable brand in the world"

  display_comment.append(img, comment)
})

logo3.addEventListener("mouseover", function() {
  let display_comment = document.getElementById("display_comment")
  display_comment.innerHTML = ""
  // <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078">
  //                   <p>Warburg invests $100 mn in boAt</p>
  let img = document.createElement("img")
  img.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078")
  let comment = document.createElement("p")
  comment.textContent = "The Airdopes 441 is sweat proof and packs in crisp audio. Great for fitness enthusiasts."

  display_comment.append(img, comment)
})

logo4.addEventListener("mouseover", function() {
  let display_comment = document.getElementById("display_comment")
  display_comment.innerHTML = ""
  // <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078">
  //                   <p>Warburg invests $100 mn in boAt</p>
  let img = document.createElement("img")
  img.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078")
  let comment = document.createElement("p")
  comment.textContent = "IPL 2020: boAt becomes the official audio partner for six teams"

  display_comment.append(img, comment)
})

logo5.addEventListener("mouseover", function() {
  let display_comment = document.getElementById("display_comment")
  display_comment.innerHTML = ""
  // <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078">
  //                   <p>Warburg invests $100 mn in boAt</p>
  let img = document.createElement("img")
  img.setAttribute("src", "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/quote.png?v=1610085078")
  let comment = document.createElement("p")
  comment.textContent = "TWS Earbuds Shipments in India Up 723 Percent YoY in Q3, Boat Emerged as Leading Player: Counterpoint"

  display_comment.append(img, comment)
})