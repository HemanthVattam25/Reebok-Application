let cartArr = JSON.parse(sessionStorage.getItem("cartList")) || [];

function updateBill() {
  let totalQuantity = 0;
  let totalPrice = 0;

  cartArr.forEach((item) => {
    const itemQuantity = item.quantity || 1;
    const itemPrice = parseInt(item.productPrice.replace("₹", ""));

    totalQuantity = totalQuantity + itemQuantity;
    totalPrice += itemQuantity * itemPrice;
    document.querySelector(
      "#cartQty"
    ).innerText = ` Cart (${totalQuantity}) 🛒`;
  });

  document.querySelector("#bill").innerText = `Total: (${totalQuantity} items)`;
  document.querySelector(
    "#finalPrice"
  ).innerText = `Total Amount:  ₹ ${totalPrice}`;
}

// Call updated bill initially to display total before applying promo
updateBill();

// Promo Code
let applyPromo = document.querySelector("#apply");
applyPromo.addEventListener("click", promoValue);

function promoValue() {
  let promoCode = document
    .querySelector("#promoCode")
    .value.trim()
    .toUpperCase();
  let totalPrice = parseFloat(
    document
      .querySelector("#finalPrice")
      .innerText.replace("Total Amount: ₹", "")
  );
  if (promoCode === "GET30") {
    alert("Promo Applied Successfully");
    let discountedPrice = 0.7 * totalPrice;
    document.querySelector(
      "#discount"
    ).innerText = `Bill Amount after Discount:  ₹ ${discountedPrice.toFixed(
      2
    )}`;
    document.querySelector("#apply").innerText = "Promo Applied";
    applyPromo.style.backgroundColor = " lightgreen";
  } else {
    document.querySelector("#promoCode").value = "";
    alert("Promo Code is incorrect. Please Check");
  }
}
// Function to delete an item from the cart
function deleteItem(index) {
  cartArr.splice(index, 1);
  sessionStorage.setItem("cartList", JSON.stringify(cartArr));
  window.location.reload();
}

// Iterate over each item in the cart array
cartArr.forEach((element, index) => {
  let cartItems = document.createElement("div");
  cartItems.setAttribute("class", "cart-items");

  // Create category and item name elements
  let cat = document.createElement("div");
  cat.setAttribute("class", "cat");
  cat.innerText = "Item Type: ";

  let itemImg = document.createElement("img");
  itemImg.src = element.productImg;
  itemImg.setAttribute("class", "itemPic");
  let itemCategory = document.createElement("h4");
  itemCategory.setAttribute("class", "category");
  itemCategory.innerText = element.productCategory;
  cat.append(itemCategory, itemImg);

  let type = document.createElement("div");
  type.setAttribute("class", "type");
  type.innerText = "Item Category: ";

  let itemName = document.createElement("h4");
  itemName.setAttribute("class", "itemName");
  itemName.innerText = element.productName;
  type.append(itemName);

  // Price display
  let pr = document.createElement("div");
  pr.setAttribute("class", "pr");
  pr.innerText = "Item Price: ";

  let itemPrice = document.createElement("h4");
  itemPrice.setAttribute("class", "price");
  itemPrice.innerText = element.productPrice;
  pr.append(itemPrice);

  // Quantity controls
  let itemOps = document.createElement("div");
  itemOps.classList.add("item-opt");

  let qty = document.createElement("div");
  qty.innerText = "Quantity: ";
  qty.classList.add("qty");

  let dec = document.createElement("button");
  dec.innerText = "-";

  let count = document.createElement("p");
  count.innerText = "1"; // Initial quantity is set to 1

  let inc = document.createElement("button");
  inc.innerText = "+";

  // Base price for calculations (extracted from the element object)
  let basePrice = parseInt(element.productPrice.replace("₹", ""));

  //Initialize quantity on load if not present
  element.quantity = element.quantity || 1;

  // Function to update displayed price and recalculate total quantity and price

  function updateQuantity(newCount) {
    element.quantity = newCount;
    count.innerText = newCount;
    itemPrice.innerText = "₹" + newCount * basePrice;
    updateBill(); // Update the bill each time quantity changes
  }

  // Function to decrement quantity and update price
  function decrementQuantity() {
    let currentCount = element.quantity;
    if (currentCount > 1) updateQuantity(currentCount - 1);
  }

  // Function to increment quantity and update price
  function incrementQuantity() {
    let currentCount = element.quantity;
    updateQuantity(currentCount + 1);
  }

  // Event listeners for increment and decrement
  dec.addEventListener("click", decrementQuantity);
  inc.addEventListener("click", incrementQuantity);

  qty.append(dec, count, inc);
  itemOps.append(qty);

  // Delete button
  let btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete Item";
  btnDelete.classList.add("btn-delete");
  btnDelete.addEventListener("click", function () {
    deleteItem(index);
  });

  itemOps.append(btnDelete);

  // Append all elements to cartItems container
  cartItems.append(cat, type, pr);
  document.querySelector("#cart-list").append(cartItems, itemOps);
  updateBill();
});

let proceed = document.querySelector("#proceed");
proceed.addEventListener("click", proceedPayment);

function proceedPayment() {
  window.location.href = "../PaymentPage/payment.html";
}
