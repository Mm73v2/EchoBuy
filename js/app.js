// TOGGLING ELEMENT FUNCTIONS

// Selecting the shopping cart for toggling
const shoppingCartToggle = document.getElementById("shopping-cart-toggle");
const shoppingCartDropdown = document.getElementById("shopping-cart-dropdown");

// Toggle navbar menu on small screen
const toggleNavMenu = () => {
  const toggleOpen = document.getElementById("toggleOpen");
  const toggleClose = document.getElementById("toggleClose");
  const collapseMenu = document.getElementById("collapseMenu");

  function toggleNavbar() {
    if (collapseMenu.style.display === "block") {
      collapseMenu.style.display = "none";
    } else {
      collapseMenu.style.display = "block";

      // Closing the shopping cart if the navbar menu is open.
      shoppingCartDropdown.classList.add("hidden");
      shoppingCartDropdown.classList.remove("block");
    }
  }

  toggleOpen.addEventListener("click", toggleNavbar);
  toggleClose.addEventListener("click", toggleNavbar);
};

// Toggle the shopping cart
const toggleShoppingCart = () => {
  if (shoppingCartDropdown.className.includes("block")) {
    shoppingCartDropdown.classList.add("hidden");
    shoppingCartDropdown.classList.remove("block");
  } else {
    shoppingCartDropdown.classList.add("block");
    shoppingCartDropdown.classList.remove("hidden");
  }
  shoppingCartToggle.addEventListener("click", toggleShoppingCart);
};

// Toggle modals
const closeLoginModal = document.getElementById("close-login-modal");
const toggleModal = (element) => {
  if (element.classList.contains("flex")) {
    document.body.classList.remove("overflow-hidden");
    element.classList.remove("flex");
    element.classList.add("hidden");
  } else {
    document.body.classList.add("overflow-hidden");
    element.classList.remove("hidden");
    element.classList.add("flex");
  }
};

if (closeLoginModal) {
  closeLoginModal.addEventListener("click", () =>
    toggleModal(document.getElementById("login-modal"))
  );
}

// Toggle the toaster after adding a product to the cart.
const toggleToaster = () => {
  const toaster = document.getElementById("toaster");
  toaster.classList.remove("hidden");
  toaster.classList.add("flex");
  setTimeout(() => {
    toaster.classList.remove("flex");
    toaster.classList.add("hidden");
  }, 2000);
};

// DISPLAYING DATA FUNCTIONS

// List of products to show on the website. assuming it's coming from a backend.
const productsList = [
  {
    id: 1,
    image: "../images/product6.jpg",
    title: "Ultra HD Laptop",
    price: 1299.99,
    category: "Electronics",
    quantity: 1,
    description:
      "A powerful laptop with Ultra HD display, perfect for gaming, video editing, and work.",
  },
  {
    id: 2,
    image: "../images/product2.png",
    title: "Smartphone",
    price: 999.99,
    category: "Electronics",
    quantity: 1,
    description:
      "A high-end smartphone with the latest features, stunning camera, and a sleek design.",
  },
  {
    id: 3,
    image: "../images/product3.webp",
    title: "Running Sneakers",
    price: 89.99,
    category: "Fashion",
    quantity: 1,
    description:
      "Comfortable and durable running sneakers, designed for maximum performance and style.",
  },
  {
    id: 4,
    image: "../images/product4.jpg",
    title: "Leather Jacket",
    price: 149.99,
    category: "Fashion",
    quantity: 1,
    description:
      "A stylish and timeless leather jacket that complements any outfit, ideal for any season.",
  },
  {
    id: 5,
    image: "../images/product1.jpg",
    title: "Wireless Headphones",
    price: 599.99,
    category: "Electronics",
    quantity: 1,
    description:
      "Premium wireless headphones with noise cancellation and superior sound quality.",
  },
  {
    id: 6,
    image: "../images/product5.jpeg",
    title: "Smart Wristwatch",
    price: 249.99,
    category: "Accessories",
    quantity: 1,
    description:
      "A sleek and modern smartwatch that keeps you connected and tracks your fitness.",
  },
  {
    id: 7,
    image: "../images/product7.jpeg",
    title: "4K Ultra HD Monitor",
    price: 399.99,
    category: "Electronics",
    quantity: 1,
    description:
      "An immersive 4K Ultra HD monitor with vibrant colors, perfect for work or play.",
  },
  {
    id: 8,
    image: "../images/product8.jpeg",
    title: "Leather Wallet",
    price: 59.99,
    category: "Accessories",
    quantity: 1,
    description:
      "A premium leather wallet with multiple compartments, perfect for everyday use.",
  },
];

// Find product by id.
const findProductById = (id) => {
  const productIndex = productsList.findIndex((el) => el.id === id);
  const productData = productsList[productIndex];
  return productData;
};

// Find product from user cart.
const findProductFromCart = (id, userCart) => {
  const productIndex = userCart.findIndex((product) => product.id === id);
  const product = userCart[productIndex];
  return { productIndex, product };
};

// Filter products based on their category.
const filterProducts = () => {
  let category = "all";
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach(function (tab) {
        tab.classList.remove("text-white", "font-bold", "bg-blue-600");
        tab.classList.add("text-gray-600", "font-semibold");
      });
      // Add active class to the clicked tab
      tab.classList.add("text-white", "font-bold", "bg-blue-600");
      tab.classList.remove("text-gray-600", "font-semibold");
      category = tab.getAttribute("data-category");
      showProductsList(productsList.length, category);
    });
  });
};

// showing the products on the page by looping on each one and creating it's html & adding the add to cart functionality.
const showProductsList = (length = productsList.length, category = "all") => {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  const filteredProducts =
    category === "all"
      ? productsList
      : productsList.filter((product) => product.category === category);

  filteredProducts.forEach((product, index) => {
    if (index < length) {
      const newProduct = document.createElement("div");
      newProduct.classList.add(
        "bg-gray-50",
        "shadow-md",
        "overflow-hidden",
        "rounded-lg",
        "hover:-translate-y-2",
        "transition-all",
        "relative"
      );
      newProduct.innerHTML = `
    <a href="product-info.html?id=${product.id}"
    class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 block"
  >
    <img
      src="${product.image}"
      alt="Product 1"
      class="h-full w-full object-contain"
    />
  </a>
  <div class="p-6 bg-white">
    <h3 class="text-lg font-bold text-gray-800">${product.title}</h3>
    <h4 class="text-lg text-gray-800 font-bold mt-2">$${product.price}</h4>
    <p class="text-gray-600 text-sm mt-2 flex gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="25"
        height="25"
        fill="#2563eb"
        viewBox="0 0 256 256"
        xml:space="preserve"
      >
        <defs></defs>
        <g
          style="
            stroke: none;
            stroke-width: 0;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: #2563eb;
            fill-rule: nonzero;
            opacity: 1;
          "
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 88.516 50.879 H 4.156 c -0.82 0 -1.484 -0.664 -1.484 -1.484 c 0 -0.819 0.664 -1.484 1.484 -1.484 h 84.36 c 0.819 0 1.484 0.664 1.484 1.484 C 90 50.215 89.336 50.879 88.516 50.879 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: #2563eb;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
          <path
            d="M 88.516 75.495 H 4.156 c -0.82 0 -1.484 -0.664 -1.484 -1.484 c 0 -0.819 0.664 -1.484 1.484 -1.484 h 84.36 c 0.819 0 1.484 0.664 1.484 1.484 C 90 74.831 89.336 75.495 88.516 75.495 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: #2563eb;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
          <path
            d="M 88.516 26.263 H 35.999 c -0.82 0 -1.484 -0.664 -1.484 -1.484 s 0.664 -1.484 1.484 -1.484 h 52.517 c 0.819 0 1.484 0.664 1.484 1.484 S 89.336 26.263 88.516 26.263 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: #2563eb;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
          <path
            d="M 10.275 35.054 C 4.609 35.054 0 30.445 0 24.779 s 4.609 -10.275 10.275 -10.275 S 20.55 19.114 20.55 24.779 S 15.941 35.054 10.275 35.054 z M 10.275 17.471 c -4.029 0 -7.308 3.279 -7.308 7.308 s 3.279 7.308 7.308 7.308 s 7.308 -3.279 7.308 -7.308 S 14.304 17.471 10.275 17.471 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: #2563eb;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
        </g>
      </svg>
      ${product.category}
    </p>
  </div>
  <div class="p-3 pb-4">
    <button
      type="button"
      class="add-to-cart w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold rounded-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25px"
        height="25px"
        fill="#fff"
        viewBox="0 0 512 512"
      >
        <path
          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
          data-original="#000000"
        ></path>
      </svg>
      Add to cart
    </button>
  </div>
    `;
      newProduct.setAttribute("data-id", `${product.id}`);
      productsContainer.appendChild(newProduct);
      const addToCartBtn = newProduct.querySelector(".add-to-cart");
      addToCartBtn.addEventListener("click", () =>
        addProductToCart(product.id)
      );
    }
  });
};

// Showing each product data in the product info page by each product id & showing similar products.
const productInfoData = () => {
  const productInfoContainer = document.getElementById(
    "product-info-container"
  );
  const productId = +window.location.search.split("=")[1];
  const productData = findProductById(productId);
  const product = document.createElement("div");
  product.classList.add(
    "bg-white",
    "md:min-h-[600px]",
    "grid",
    "items-start",
    "grid-cols-1",
    "md:grid-cols-2",
    "gap-8"
  );

  product.innerHTML = `
  <div class="h-full">
  <div class="p-4 relative h-full flex items-center justify-center">
    <img
      src="${productData.image}"
      alt="Product"
      class="lg:w-4/5 w-full h-full rounded-xl object-contain"
    />
  </div>
</div>

<div
  class="bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 text-white py-6 px-8 h-full"
>
  <div>
    <h2 class="text-3xl font-semibold text-white">
      ${productData.title}
    </h2>
    <p class="text-sm text-gray-400 mt-2">Well-Versed Commerce</p>
  </div>

  <div class="flex flex-wrap gap-4 justify-between mt-8">
    <h3 class="text-white text-4xl">$${productData.price}</h3>

    <div class="flex space-x-2">
      <svg
        class="w-5 fill-[#facc15]"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
        />
      </svg>
      <svg
        class="w-5 fill-[#facc15]"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
        />
      </svg>
      <svg
        class="w-5 fill-[#facc15]"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
        />
      </svg>
      <svg
        class="w-5 fill-[#facc15]"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
        />
      </svg>
      <svg
        class="w-5 fill-[#CED5D8]"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
        />
      </svg>
    </div>
  </div>

  <div>
    <h2
      class="text-white text-2xl w-full py-3.5 px-2 mt-3 border-b-2 border-white"
    >
      Description
    </h2>
    <p class="text-gray-300 mt-4 text-base">
      ${productData.description}
    </p>
  </div>

  <div class="mt-8">
    <h3 class="text-lg font-semibold text-white">Category: ${productData.category}</h3>

    

  <div class="flex flex-wrap gap-4 mt-8">
    <button
      id='add-to-cart-info'
      type="button"
      class="min-w-[200px] px-4 py-3.5 bg-gray-800 hover:bg-gray-900 text-white text-base rounded"
    >
      Add to cart
    </button>
    <a href="/index.html" class="text-center min-w-[200px] px-4 py-3.5 border border-gray-800 bg-transparent text-white text-base rounded">Go back</a>
  </div>
</div>
  `;
  productInfoContainer.appendChild(product);
  const addToCartFromProductInfo = document.getElementById("add-to-cart-info");
  addToCartFromProductInfo.addEventListener("click", () =>
    addProductToCart(productId)
  );
  showProductsList(productsList.length, productData.category);
};

// Showing cart items in the cart page & handling quantity and removing products.
const showCartItems = () => {
  const user = getLoggedInUser();

  if (user) {
    const cartItemsContainer = document.getElementById("cart-items-container");
    cartItemsContainer.innerHTML = "";

    const totalItems = document.getElementById("total-items");
    totalItems.innerHTML = `${user.cart.length} items`;

    const totalAmount = user.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const subtotal = document.getElementById("subtotal");
    subtotal.innerHTML = `$${totalAmount.toFixed(2)}`;

    const total = document.getElementById("total");
    total.innerHTML = `$${totalAmount ? (totalAmount + 8).toFixed(2) : 0}`;

    const emptyCartFallback = document.getElementById("empty-cart-fallback");
    if (user.cart.length === 0) {
      emptyCartFallback.classList.remove("hidden");
      emptyCartFallback.classList.add("flex");
    } else {
      emptyCartFallback.classList.add("hidden");
      emptyCartFallback.classList.remove("flex");
    }

    user.cart.forEach((product) => {
      const tableRow = document.createElement("tr");

      // Product total price
      const productPrice = (product.price * product.quantity).toFixed(2);
      tableRow.innerHTML = `
      <td class="p-4" data-id=${product.id}>
                  <div class="flex items-center gap-4 w-max">
                    <div class="h-32 shrink-0">
                      <img
                        src="${product.image}"
                        class="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <p class="text-base font-bold text-gray-800">
                        ${product.title}
                      </p>
                      <button
                        type="button"
                        class="remove-btn mt-2 font-semibold text-red-400 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </td>
                <td class="p-4">
                  <div
                    class="flex divide-x border w-max rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      class="decrease-btn flex items-center justify-center bg-gray-100 w-10 h-10 font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 fill-current"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <p
                      class="bg-transparent px-4 flex items-center font-semibold text-gray-800 text-base"
                    >
                      ${product.quantity}
                    </p>
                    <button
                      type="button"
                      class="increase-btn flex justify-center items-center bg-gray-800 text-white w-10 h-10 font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 fill-current"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="p-4">
                  <h4 class="text-base font-bold text-gray-800">$${productPrice}</h4>
                </td>
      `;
      cartItemsContainer.appendChild(tableRow);

      // Remove Product
      const removeBtn = tableRow.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        handleRemoveProductModal(product.id);
      });
      removeBtn.addEventListener("click", () =>
        removeProductFromCart(product.id)
      );

      // Increase and decrease quantity buttons
      const decreaseBtn = tableRow.querySelector(".decrease-btn");
      const increaseBtn = tableRow.querySelector(".increase-btn");

      decreaseBtn.addEventListener("click", () => {
        updateProductQuantity(user, product.id, -1);
      });

      increaseBtn.addEventListener("click", () => {
        updateProductQuantity(user, product.id, 1);
      });
    });
  }
};

// Showing cart items in the cart dropdown menu.
const showDropdownCartItems = () => {
  const user = getLoggedInUser();
  if (user) {
    const dropdownCart = document.getElementById("dropdown-cart-container");

    // fallback message if the cart is empty.
    dropdownCart.innerHTML = "";
    const checkOutBtn = dropdownCart.nextElementSibling;
    checkOutBtn.innerHTML = "";
    if (user.cart.length === 0) {
      checkOutBtn.innerHTML = "Your cart is empty";
      checkOutBtn.classList = "";
      checkOutBtn.classList.add("flex", "justify-center");
    } else {
      checkOutBtn.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      fill="#fff"
      viewBox="0 0 512 512"
    >
      <path
        d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
        data-original="#000000"
      ></path>
    </svg>
    Check out`;
      checkOutBtn.classList =
        "w-3/4 flex items-center mx-auto justify-center gap-3 mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold rounded-xl";
    }
    user.cart.forEach((product) => {
      const dropdownCartItem = document.createElement("li");
      dropdownCartItem.classList.add("p-4", "hover:bg-gray-50");
      dropdownCartItem.innerHTML = `
  <a
  class="flex flex-col sm:flex-row items-center"
  href="cart.html"
>
  <img src="${product.image}" class="w-2/4 shrink-0" />

  <div class="ml-6">
    <h3 class="text-xl text-[#333] font-semibold">
      ${product.title}
    </h3>
    <div class="flex gap-2">
      <p class="text-xs text-blue-600 mt-2">$1290.99</p>
      <p class="text-xs text-gray-500 leading-3 mt-2">
        quantity: ${product.quantity}
      </p>
    </div>
  </div>
</a>
  `;
      dropdownCart.appendChild(dropdownCartItem);
    });
  }
};

// LOCAL STORAGE FUNCTIONS & SESSION STORAGE.

// Adding new users to the usersList.
const addUserToLocalStorage = (user) => {
  let usersList;
  if (localStorage.getItem("usersList") === null) {
    usersList = [];
  } else {
    usersList = JSON.parse(localStorage.getItem("usersList"));
  }
  usersList.push(user);
  localStorage.setItem("usersList", JSON.stringify(usersList));
};

// Adding the logged in user to the localStorage and it acts like a token.
const storeLoggedInUserToLocalStorage = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

// Adding the user to session storage if he does not hit the remember me button as he logs in.
const storeLoggedInUserToSessionStorage = (user) => {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
};

// Get the users list.
const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("usersList"));
  return users;
};

// Get logged in user.
const getLoggedInUser = () => {
  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) ??
    JSON.parse(sessionStorage.getItem("loggedInUser"));
  return user;
};

// Restore user data after updates.
const restoreUserToLocalStorage = (user) => {
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  if (usersList) {
    const userIndex = usersList.findIndex((el) => el.email === user.email);
    usersList[userIndex] = user;
    localStorage.setItem("usersList", JSON.stringify(usersList));
  }
};

// Update the loggedIn user data back to localStorage | sessionStorage.
const updateLoggedInUser = (user) => {
  if (localStorage.getItem("loggedInUser") === null) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  } else {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }
};

// User Authentacation

// Main signup function & validating form data & adding the user to localStorage.
const initSignup = () => {
  const signupForm = document.getElementById("signup-form");
  // Signup form with validation and adding the user to the localstorage.
  const signup = (e) => {
    e.preventDefault();
    const userName = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const acceptTerms = document.getElementById("accept-terms");
    if (
      userName.trim().length >= 4 &&
      email.includes("@") &&
      password.trim().length >= 7 &&
      acceptTerms.checked
    ) {
      const user = {
        name: userName,
        email,
        password,
        cart: [],
      };
      addUserToLocalStorage(user);
      window.location.href = "/login.html?registerd_user";
    } else {
      return;
    }
  };
  signupForm.addEventListener("submit", signup);
};

// Chekcing if the email the users enters is already registered or not.
const checkIfEmailExists = () => {
  const email = document.getElementById("email");
  const users = getUsers();
  const emailExistsMessage = document.getElementById("email-exists");
  if (users) {
    email.addEventListener("blur", (e) => {
      const value = e.target.value;
      const emailExists = users.some((user) => user.email === value);
      if (emailExists) {
        emailExistsMessage.classList.remove("hidden");
        emailExistsMessage.classList.add("block");
      } else {
        emailExistsMessage.classList.add("hidden");
        emailExistsMessage.classList.remove("block");
      }
    });
    email.addEventListener("focus", () => {
      emailExistsMessage.classList.add("hidden");
      emailExistsMessage.classList.remove("block");
    });
  }
};

// Main login function.
const initLogin = () => {
  // Login form and checking if the user is registerd to the localStorage and if so we take the user data and store it.
  const loginForm = document.getElementById("login-form");
  const login = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me");
    const users = getUsers();
    if (!users) window.location.href = "/signup.html";
    const userRegistered = users.findIndex(
      (user) => user.email === email && user.password === password
    );
    if (userRegistered !== -1 && users.length > 0) {
      currentUser = users[userRegistered];
      if (rememberMe.checked) {
        storeLoggedInUserToLocalStorage(currentUser);
      } else {
        storeLoggedInUserToSessionStorage(currentUser);
      }
      window.location.href = "/index.html";
    } else {
      const invalidInput = document.getElementById("wrong-info");
      invalidInput.classList.remove("hidden");
      invalidInput.classList.add("block");
      setTimeout(() => {
        invalidInput.classList.remove("block");
        invalidInput.classList.add("hidden");
      }, 2000);
      return;
    }
  };
  loginForm.addEventListener("submit", login);

  if (window.location.search.split("?")[1] === "registerd_user") {
    showLoginAlert(
      "Your account has been created succesfuly, You can now login!"
    );
  } else {
    showLoginAlert("Your password is changed successfuly, you can login !");
  }
};

// After redirection from signup page or changing password this will appear to alert the user that he can login.
const showLoginAlert = (message) => {
  const loginAlert = document.getElementById("login-alert");
  if (window.location.search.split("?")[1]) {
    loginAlert.lastElementChild.textContent = message;
    loginAlert.classList.remove("hidden");
    loginAlert.classList.add("flex");
    setTimeout(() => {
      loginAlert.classList.remove("flex");
      loginAlert.classList.add("hidden");
    }, 3000);
  }
};

// Showing the password so the user can see it.
const showPassword = () => {
  const passwordInput = document.getElementById("password");
  const showPasswordBtn = document.getElementById("show-password-btn");
  showPasswordBtn.addEventListener("click", () => {
    // Toggle the type attribute between 'password' and 'text'
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
};

// Resting user password.
const forgotPassword = () => {
  const form = document.getElementById("forgot-password-form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const users = getUsers();
  const wrongEmailMessage = document.getElementById("wrong-email");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (users) {
      const userIndex = users.findIndex((user) => user.email === email.value);
      if (userIndex !== -1) {
        const currentUser = users[userIndex];
        currentUser.password = password.value;
        restoreUserToLocalStorage(currentUser);
      } else {
        wrongEmailMessage.classList.remove("hidden");
        wrongEmailMessage.classList.add("block");
        return;
      }
      window.location.href = "login.html?password_changed";
    }
  });
  email.addEventListener("focus", () => {
    wrongEmailMessage.classList.add("hidden");
    wrongEmailMessage.classList.remove("block");
  });
};

// Loggedin App State
const logoutBtn = document.getElementById("logout");
const sideLogoutBtn = document.getElementById("side-logout");
const cartIcon = document.getElementById("cart");
const authBtn = document.querySelectorAll("#loggedin-hidden-el");
const sideAuthBtn = document.querySelectorAll("#loggedin-hidden-side-el");

// Showing and hiding ui elements based on the logged in state.
const isLoggedIn = () => {
  if (
    localStorage.getItem("loggedInUser") ||
    sessionStorage.getItem("loggedInUser")
  ) {
    if (cartIcon) {
      cartIcon.classList.remove("hidden");
      cartIcon.classList.add("block");
    }

    if (logoutBtn) {
      logoutBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden", "sm:block");
    }

    if (authBtn) {
      authBtn.forEach((el) => {
        el.classList.remove("sm:block");
      });
    }

    if (sideAuthBtn) {
      sideAuthBtn.forEach((el) => {
        el.classList.remove("block", "sm:hidden");
        el.classList.add("hidden");
      });
    }
  } else {
    if (sideLogoutBtn) {
      sideLogoutBtn.classList.remove("block", "sm:hidden");
      sideLogoutBtn.classList.add("hidden");
    }
  }
};

const logout = () => {
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  if (document.getElementById("cart-items-container")) {
    document.getElementById("cart-items-container").innerHTML = "";
  }
  window.location.href = "/index.html";
  if (cartIcon) {
    cartIcon.classList.remove("block");
    cartIcon.classList.add("hidden");
  }

  if (logoutBtn) {
    logoutBtn.classList.remove("block", "sm:block");
    logoutBtn.classList.add("hidden");
  }

  if (authBtn) {
    authBtn.forEach((el) => {
      el.classList.add("sm:block");
    });
  }

  if (sideAuthBtn) {
    sideAuthBtn.forEach((el) => {
      el.classList.add("block", "sm:hidden");
      el.classList.remove("hidden");
    });
  }

  if (sideLogoutBtn) {
    sideLogoutBtn.classList.remove("block", "sm:hidden");
    sideLogoutBtn.classList.add("hidden");
  }
};

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
  sideLogoutBtn.addEventListener("click", logout);
}

// CART FUNCTIONS

// Add product to cart
const addProductToCart = (productId) => {
  const user = getLoggedInUser();
  if (user) {
    const product = findProductById(+productId);

    // Check if the product already exists in the cart
    const productInCart = findProductFromCart(productId, user.cart).product;
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      product.quantity = 1; // Set initial quantity if not already in the cart
      user.cart.push(product);
    }

    // Save the updated user data back to localStorage | session storage
    restoreUserToLocalStorage(user);

    // Update user data
    updateLoggedInUser(user);

    // Update cart ui state
    showDropdownCartItems();

    // Show the toaster.
    toggleToaster();
  } else {
    toggleModal(document.getElementById("login-modal"));
    return;
  }
};

// Remove product from cart
const removeProductFromCart = (productId) => {
  const user = getLoggedInUser();
  if (user) {
    const productToRemove = findProductFromCart(
      productId,
      user.cart
    ).productIndex;
    user.cart.splice(productToRemove, 1);

    // Update user data
    updateLoggedInUser(user);
  }

  // Updating the ui state
  showCartItems();
  showDropdownCartItems();
};

// Increase or decrease product quantity in the cart page.
const updateProductQuantity = (user, productId, change) => {
  if (user) {
    const product = findProductFromCart(productId, user.cart).product;
    if (product) {
      product.quantity += change;
      if (product.quantity <= 0 && change === -1) {
        removeProductFromCart(productId);
        return;
      }

      // Save data and update the ui.
      updateLoggedInUser(user);
      restoreUserToLocalStorage(user);
      showCartItems();
      showDropdownCartItems();
    }
  }
};
// INITIAL FUNCTION AND APP ROUTER
const init = () => {
  switch (window.location.pathname) {
    case "/":
    case "/index":
      showProductsList(8);
      break;
    case "/products":
      showProductsList();
      filterProducts();
      break;
    case "/product-info":
      productInfoData();
      break;
    case "/signup":
      initSignup();
      checkIfEmailExists();
      showPassword();
      break;
    case "/login":
      initLogin();
      showPassword();
      break;
    case "/cart":
      showCartItems();
      break;
    case "/forgot-password":
      forgotPassword();
      showPassword();
  }
  toggleNavMenu();
  toggleShoppingCart();
  isLoggedIn();
  showDropdownCartItems();
};

document.addEventListener("DOMContentLoaded", init);
