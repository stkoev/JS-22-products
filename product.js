const productDOM = document.querySelector(".product");

const url = "https://course-api.com/javascript-store-single-product";

async function fetchProduct() {
  try {
    productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    if (!response) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    productDOM.innerHTML = `<p class="error">there was an error: ${error}</p>`;
  }
}

async function displayProduct(prd) {
  const { colors, company, description, name, price } = prd.fields;
  const displayPrice = price / 100;
  const displayColors = colors
    .map((color) => {
      return `<span class="product-color" style="background : ${color}"></span>`;
    })
    .join("");
  const { url } = prd.fields.image[0];
  document.title = name.toUpperCase();
  const result = `
  <img src="${url}" alt="${name}" class="img" />
        <div class="product-info">
          <h3>${name}</h3>
          <h5>${company}</h5>
          <span>$${displayPrice}</span>
          <div class="colors">${displayColors}</div>
          <p>${description}</p>
          <button class="btn">add to cart</button>
        </div>
  `;
  productDOM.innerHTML = `<div class="product-wrapper">${result}</div>`;
}

const start = async function () {
  const product = await fetchProduct();
  displayProduct(product);
};
start();
