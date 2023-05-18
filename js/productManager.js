class appManagerProducts {
  //TABLE
  tableProducts = [];

  // MODAL
  // List of products
  products;

  // Currently clicked product
  product;

  // Background of modal
  modalBackground;

  // Modal
  modal;
  buttonSave;
  buttonCancel;

  // Product title of clicked product
  productTitle;

  // Product price of clicked product
  productPrice;

  // Product discount price => contains price of product if already previous price exists
  productDiscountPrice;

  selectedCurrency;

  constructor() {
    this.products = document.querySelectorAll(".product-to-buy");
    this.init();
  }

  // Saving inserted data from modal
  saveNewData = () => {
    const newTitle = document.querySelector("#name").value;
    const newPrice = document.querySelector("#price").value;
    const newDiscountPrice = document.querySelector("#discount-price").value;
    const newCurrency = document.querySelector("#currency").value;

    this.productTitle.textContent = newTitle;
    this.productPrice.innerHTML = `${newPrice} <span class="product-to-buy__curr">${newCurrency}</span>`;

    if (newDiscountPrice) this.createDiscount(newDiscountPrice, newCurrency);

    // Update product in the table
    this.reRenderTableProduct();

    this.deleteModal();
  };

  createDiscount = (newDiscountPrice, newCurrency) => {
    // If discount price is lower than current price => don't create discount
    if (newDiscountPrice >= parseInt(this.productPrice.textContent, 10)) return;

    if (this.product.querySelector(".product-to-buy__discount")) {
      // If disount already exists => clear it
      if (+newDiscountPrice !== 0 && newDiscountPrice.trim() !== "")
        this.resetDiscount();
      else {
        // If discount price equlas 0 => delete it
        this.resetDiscount();
        return;
      }
    }

    // Add old price with line-through after new price
    this.product

      .querySelector(".product-to-buy__price")
      .insertAdjacentHTML(
        "afterend",
        `<p class="product-to-buy__price-prev">${parseInt(
          this.productPrice.textContent,
          10
        )} ${this.selectedCurrency.textContent}</p>`
      );

    // Create discount band in top-left corner
    this.product.insertAdjacentHTML(
      "afterbegin",
      `<div class="product-to-buy__discount">-${Math.ceil(
        100 -
          (newDiscountPrice * 100) / parseInt(this.productPrice.textContent, 10)
      )}%</div>`
    );

    // Insert new price with new/old currency
    this.productPrice.innerHTML = `${newDiscountPrice} <span class="product-to-buy__curr">${newCurrency}</span>`;
  };

  resetDiscount = () => {
    // Remove old price with line-through after new price
    this.product.querySelector(".product-to-buy__price-prev").remove();

    // Remove discount band in top-left corner
    this.product.querySelector(".product-to-buy__discount").remove();
  };

  // Collecting data about clicked product, creating markup, creating container and returing final markup
  createModal = (e) => {
    const clickedProduct = this.product;

    this.productTitle = clickedProduct.querySelector(".product-to-buy__title");

    const productImage = clickedProduct.querySelector(
      ".product-to-buy__image"
    ).src;

    this.productPrice = clickedProduct.querySelector(".product-to-buy__price");

    if (clickedProduct.querySelector(".product-to-buy__price-prev"))
      this.productDiscountPrice = clickedProduct.querySelector(
        ".product-to-buy__price"
      );

    this.selectedCurrency = clickedProduct.querySelector(
      ".product-to-buy__curr"
    );

    // Create markup with collected data
    const markup = this.createMarkup(
      this.productTitle.textContent,
      productImage,
      parseInt(this.productPrice.textContent, 10),
      this.selectedCurrency.textContent,
      parseInt(this.productDiscountPrice?.textContent, 10)
    );

    // Inserting container to HTML
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `<div class="modal-background"></div>
    <div class="modal"></div>`
    );

    return markup;
  };

  createMarkup = (title, image, price, currency, discount) => {
    return `
    <h2 class="modal-title">Edycja produktu: ${title}</h2>
    <div class="modal-image">
      <div class="modal-image-circle">
        <img
          class="modal-image"
          src="${image}"
          alt="${title}"
        />
      </div>
    </div>

    <div class="modal-menu">
      <ul class="modal-menu__list">
        <li class="modal-menu__list-item">
          <label for="name">Nazwa produktu</label>
          <input id="name" type="text" value="${title}"/>
        </li>

        <li class="modal-menu__list-item">
          <label for="price">Cena</label>
          <input id="price" type="number" value="${price}"/>
        </li>

        <li class="modal-menu__list-item">
          <label for="discount-price">Promocyjna cena</label>
          <input id="discount-price" type="number" value="${
            discount ? discount : ""
          }"/>
        </li>

        <li class="modal-menu__list-item">
          <label for="currency">Waluta</label>
          <select name="currency-name" id="currency">
          ${
            currency === "$"
              ? `<option value='$'>$</option>
                <option value='PLN'>PLN</option>
                    <option value='EUR'>EUR</option>`
              : currency === "PLN"
              ? `<option value='PLN'>PLN</option>
              <option value='$'>$</option>
                  <option value='EUR'>EUR</option>`
              : `<option value='EUR'>EUR</option>
                  <option value='PLN'>PLN</option>
                      <option value='$'>$</option>`
          }
          </select>
        </li>
      </ul>

      <div class="modal-menu__buttons">
        <button type="button" class="modal-menu__button-save">Zapisz</button>
        <button type="button" class="modal-menu__button-cancel">Anuluj</button>
      </div>
    </div>
    
    `;
  };

  addEventListenersToModal = () => {
    this.modalBackground = document.querySelector(".modal-background");
    this.buttonSave = document.querySelector(".modal-menu__button-save");
    this.buttonCancel = document.querySelector(".modal-menu__button-cancel");

    // If clicked outside modal => close it
    this.modalBackground.addEventListener("click", this.deleteModal);

    // If key "ESC" is clicked => close it
    document.addEventListener("keydown", this.deleteModalButton);

    // Saving new data from user
    this.buttonSave.addEventListener("click", this.saveNewData);

    // Closing modal if "Analuj" button is clicked
    this.buttonCancel.addEventListener("click", this.deleteModal);
  };

  // Function creating container and markup of modal
  activateModal = (e) => {
    this.product = e.target.closest(".product-to-buy");

    // Function is creating container and returning markup
    const markup = this.createModal(e);

    // Inserting markup to modal container
    this.modal = document.querySelector(".modal");
    this.modal.innerHTML = markup;

    // Add listeners to modal
    this.addEventListenersToModal();
  };

  // MODAL ACTIVATION/DISACTIVATION
  deleteModal = () => {
    this.modalBackground.remove();
    this.modal.remove();
  };

  deleteModalButton = (e) => {
    if (e.key === "Escape") this.deleteModal();
    return;
  };

  // Rendering initial products in table based on products
  renderTableProducts = () => {
    this.products.forEach((product, i) => {
      // Create row markup of each product
      const tableRowMarkup = this.createTableRowMarkup(product, i);

      // Insert markup into table
      document
        .querySelector("tbody")
        .insertAdjacentHTML("beforeend", tableRowMarkup);
    });

    // Add table rows to global array
    this.tableProducts.push(document.querySelectorAll(".table-product"));
  };

  // Returns markup of table row
  createTableRowMarkup = (product, index) => {
    const productTitle = product.querySelector(
      ".product-to-buy__title"
    ).textContent;

    const productCurrency = product.querySelector(
      ".product-to-buy__curr"
    ).textContent;

    const productPrice = product.querySelector(".product-to-buy__price-prev")
      ? `${parseInt(
          product.querySelector(".product-to-buy__price-prev").textContent,
          10
        )}`
      : `${parseInt(
          product.querySelector(".product-to-buy__price").textContent,
          10
        )}`;

    const productDiscountPrice = product.querySelector(
      ".product-to-buy__price-prev"
    )
      ? parseInt(
          product.querySelector(".product-to-buy__price").textContent,
          10
        )
      : "";

    return `<tr class="table-product" data-id="${index}">
    <td>${index}</td>
    <td class="table-product-title">${productTitle}</td>
    <td class="table-product-discount__price">${productDiscountPrice}</td>
    <td class="table-product-price">${productPrice}</td>
    <td class="table-product-currency">${productCurrency}</td>
  </tr>`;
  };

  reRenderTableProduct = () => {
    const tableRowIndex = this.product.dataset.productToBuy;

    this.tableProducts[0][tableRowIndex].innerHTML = this.createTableRowMarkup(
      this.product,
      tableRowIndex
    );
  };

  // Initalization of app
  init = () => {
    // Adding event listeners to list of prodcuts
    this.products.forEach((product) =>
      product.addEventListener("click", this.activateModal)
    );

    // Render table products
    document.addEventListener("DOMContentLoaded", this.renderTableProducts);
  };
}

const productsManager = new appManagerProducts();
