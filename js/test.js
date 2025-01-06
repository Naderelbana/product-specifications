var proName = document.getElementById("proName");
var proPrice = document.getElementById("proPrice");
var proCategory = document.getElementById("proCategory");
var proDesc = document.getElementById("proDesc");
var proSearch = document.getElementById("proSearch");
var btn = document.getElementById("btn");
var proContainer;
var currIndex = 0;
const priceRegex = /^([1-9])/

if (localStorage.getItem("conProducts")) {
  proContainer = JSON.parse(localStorage.getItem("conProducts"));
  disProduct();
} else {
  proContainer = [];
}
// Dom select / add event / action

btn.addEventListener("click", function () {
  if (btn.innerHTML == "Add Product") {
    addProduct();
  } else {
    updatePro();
  }
  localStorage.setItem("conProducts", JSON.stringify(proContainer));
  disProduct();
});

function addProduct() {
  var product = {
    name: proName.value,
    price: proPrice.value,
    category: proCategory.value,
    desc: proDesc.value,
  };
  if(product.name){
    if(priceRegex.test(product.price) == false && product.price){
      window.alert("Product price must not start with 0.")
    }
    else{
      proContainer.push(product);
      proName.value = "";
      proPrice.value = "";
      proCategory.value = "";
      proDesc.value = "";
    }
  }else{
    window.alert("You must enter the product name.")
  }
}

function disProduct() {
  var prods = ``;
  for (let i = 0; i < proContainer.length; i++) {
    prods += `
        <tr>
            <td>${i + 1}</td>
            <td>${proContainer[i].name}</td>
            <td>${proContainer[i].price}</td>
            <td>${proContainer[i].category}</td>
            <td>${proContainer[i].desc}</td>
            <td>
                <button class="btn delete" onclick="deleteProduct(${i})">Delete</button>
                <button class="btn update" onclick="reProData(${i})">Update</button>
            </td>
        </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = prods;
}
function deleteProduct(index) {
  proContainer.splice(index, 1);
  localStorage.setItem("conProducts", JSON.stringify(proContainer));
  disProduct();
}

function reProData(index) {
  var currPro = proContainer[index];
  proName.value = currPro.name;
  proPrice.value = currPro.price;
  proCategory.value = currPro.category;
  proDesc.value = currPro.desc;
  btn.innerHTML = "Update Product";
  currIndex = index;
}

function updatePro() {
  var product = {
    name: proName.value,
    price: proPrice.value,
    category: proCategory.value,
    desc: proDesc.value,
  };
  
  if(product.name){
    if(JSON.stringify(product) == JSON.stringify(proContainer[currIndex])){
    window.alert("The product has not been updated because you have not changed anything.")
    /* btn.innerHTML = "Add Product";
    proName.value = "";
    proPrice.value = "";
    proCategory.value = "";
    proDesc.value = ""; */
    }
    else if(priceRegex.test(product.price) == false && product.price){
      window.alert("Product price must not start with 0.")
    }
    else{
    proContainer[currIndex] = product;
    btn.innerHTML = "Add Product";
    proName.value = "";
    proPrice.value = "";
    proCategory.value = "";
    proDesc.value = "";
    }
  }
  else{
    window.alert("You must enter the product name.")
  }
  
  
}

proSearch.addEventListener("keyup", function () {
  searchPro(proSearch.value);
});

function searchPro(term) {
  var prods = ``;
  for (let i = 0; i < proContainer.length; i++) {
    if (proContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
        prods += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${proContainer[i].name}</td>
                    <td>${proContainer[i].price}</td>
                    <td>${proContainer[i].category}</td>
                    <td>${proContainer[i].desc}</td>
                    <td>
                        <button class="btn delete" onclick="deleteProduct(${i})">Delete</button>
                        <button class="btn update" onclick="reProData(${i})">Update</button>
                    </td>
                </tr>
            `;
        }
  }
  document.getElementById("tbody").innerHTML = prods;
}
