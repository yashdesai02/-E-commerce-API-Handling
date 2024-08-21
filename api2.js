var limit = 10;
var skip = 0;
var apiUrl = "https://dummyjson.com/";
var apiProducts = "products?";
var apiLimit = `limit=${limit}&skip=${skip}`;
var api = `${apiUrl}${apiProducts}${apiLimit}`;
var row = document.getElementById("row");
var search = document.getElementById("search").value;
let  arrData = "";
console.log(limit);
// data limit
function showdata() {
  limit = parseInt(document.getElementById("limit").value);
  apiLimit = `limit=${limit}&skip=${skip}`;
  api = `${apiUrl}${apiProducts}${apiLimit}`;
  apiCall();
}

// api call
async function apiCall() {
  const response = await fetch(api);
  const data = await response.json();
  arrData = data.products;

  row.innerHTML = "";
  card = "";
  for (let i = 0; i < arrData.length; i++) {
    card += `
          <div class="card_main" id="cardMain">
            <div class="authorName">${arrData[i].availabilityStatus}</div>
            <div class="details_box">
              <h2 class="title">${arrData[i].brand}</h2>
              <img class="urlToImage" id="images" src="${arrData[i].thumbnail || "./download.jpeg"}" alt="">
              <h2 class="category">${arrData[i].category}</h2>
              <p class="description">${arrData[i].description}</p>
              <h4 class="discount">Discount : ${
                arrData[i].discountPercentage
              }%</h4>
              <h4 class="price">price : ${arrData[i].price} $</h4>
              <h4 class="rating">Rating : ${arrData[i].rating}</h4>
              <h4 class="warranty">${arrData[i].warrantyInformation}</h4>
              <p class="returnPolicy">${arrData[i].returnPolicy}</p>
            </div>
          </div>
    `;
  }
  row.innerHTML = card;
}

// search product
function serProduct() {
  search = document.getElementById("search").value;
  api = `https://dummyjson.com/products/search?q=${search}`;
  if (arrData == 0 || arrData == null) {
    alert("not available");
  }
  apiCall();
}

// select cetegory
function cetegory() {
  var selcetegory = document.getElementById("selcetegory").value;
  console.log(selcetegory);
  api = `https://dummyjson.com/products/category/${selcetegory}`;
  apiCall();
}

// next-previous
function nxt() {    
  document.getElementById("previous").style.display = "inline-block";
  skip += limit;
  apiLimit = `limit=${limit}&skip=${skip}`;
  api = `${apiUrl}${apiProducts}${apiLimit}`;
  apiCall();
}
function prev() {
  skip -= limit;
  apiLimit = `limit=${limit}&skip=${skip}`;
  api = `${apiUrl}${apiProducts}${apiLimit}`;
  apiCall();
}

apiCall();