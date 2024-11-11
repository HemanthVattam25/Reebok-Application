let btnCart = document.querySelectorAll(".btn-cart");
btnCart.forEach((btn) => {
  btn.addEventListener("click", cartEvent);
});

let cartArr = JSON.parse(sessionStorage.getItem("cartList")) || [];

function cartEvent() {
  let allItems = document.querySelectorAll(".item");

  allItems.forEach((item) => {
    if (!item.querySelector(".go-cart")) {
      let goCart = document.createElement("button");
      goCart.classList.add("go-cart");
      goCart.innerText = "Go to Cart";
      item.append(goCart);
      goCart.addEventListener("click", () => {
        window.location.href = "../CartPage/cart.html";
      });
    }
  });

  //   goCart.addEventListener;

  let category = this.parentElement.querySelector(".Category").innerText;
  let itemName = this.parentElement.querySelector(".itemName").innerText;
  let itemPrice = this.parentElement.querySelector(".price").innerText;
  let itemImg = this.parentElement.querySelector(".pic").src;

  let cartObj = {
    productCategory: category,
    productName: itemName,
    productPrice: itemPrice,
    productImg: itemImg,
  };

  console.log(cartObj);
  cartArr.push(cartObj);
  console.log(cartArr);

  sessionStorage.setItem("cartList", JSON.stringify(cartArr));
}

// Filter function
function handleFilter() {
  let selectedValue = document.querySelector("#filter").value;
  let categories = ["caps", "topwear", "bottomwear", "footwear"];
  let h2Name = document.querySelectorAll(".products h2");

  categories.forEach((category, index) => {
    const section = document.querySelector(`.${category}`);
    section.style.display = "grid";
    h2Name[index].innerText = category.toUpperCase();
  });

  categories.forEach((category, index) => {
    const section = document.querySelector(`.${category}`);
    if (selectedValue !== category) {
      section.style.display = "none";
      h2Name[index].innerText = "";
      return;
    }
  });
}

// Sorting function

function handlePriceSort() {
  let sortedValue = document.querySelector("#sortPrice").value;
  let h2 = document.querySelectorAll("h2");
  // emptying category name
  if (sortedValue === "LTH" || "HTL") {
    h2.forEach((element) => {
      element.innerText = "";
    });
  }

  //converting Node list of h4 items into array
  let items = Array.from(document.querySelectorAll(".item"));

  // sort items based on their price in h4 tag
  items.sort((a, b) => {
    let priceA = parseFloat(a.querySelector("h4").innerText.replace("₹", ""));
    let priceB = parseFloat(b.querySelector("h4").innerText.replace("₹", ""));
    if (sortedValue === "LTH") return priceA - priceB;
    if (sortedValue === "HTL") return priceB - priceA; // Ascending order
  });

  let container = document.querySelector(".products");

  container.innerHTML = "";
  items.forEach((item) => {
    container.appendChild(item);
  });
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(4, 1fr)";
  container.style.gap = "20px";
}

function handleNameSort() {
  let sortedValue = document.querySelector("#sortName").value;
  let h2 = document.querySelectorAll("h2");

  // Emptying category name if sorting is applied
  if (sortedValue === "asc" || sortedValue === "dsc") {
    h2.forEach((element) => {
      element.innerText = ""; // Clear category names
    });
  }

  // Converting Node list of .item elements into an array
  let items = Array.from(document.querySelectorAll(".item"));

  // Sorting items by name in ascending order
  if (sortedValue === "asc") {
    items.sort((a, b) => {
      const nameA = a.querySelector(".Category").innerText.toUpperCase();
      const nameB = b.querySelector(".Category").innerText.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0; // If equal
    });
  }

  // Sorting items by name in descending order
  if (sortedValue === "dsc") {
    items.sort((a, b) => {
      const nameA = a.querySelector(".Category").innerText.toUpperCase();
      const nameB = b.querySelector(".Category").innerText.toUpperCase();

      if (nameA > nameB) return -1; // Descending order
      if (nameA < nameB) return 1; // Descending order
      return 0; // If equal
    });
  }

  // Get the container where items are displayed
  let container = document.querySelector(".products");

  // Clear the existing items and append sorted items
  container.innerHTML = "";
  items.forEach((item) => {
    container.appendChild(item);
  });

  // Apply grid layout for the container
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(4, 1fr)";
  container.style.gap = "20px";
}
