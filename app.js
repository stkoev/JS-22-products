// console.log("products starter");
const url = "https://course-api.com/javascript-store-products";

const productsDom = document.querySelector(".products-center");
const loading = '<div class="loading"></div>';

async function fetchProducts(url) {
  productsDom.innerHTML = loading;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    console.log(error);
    productsDom.innerHTML = `<p class="error">there was an error: ${error}</p>`;
  }
}

async function displayProducts(products) {
  const result = products
    .map((product) => {
      const { id } = product;
      const { name, price } = product.fields;
      const { url } = product.fields.image[0];
      const formatPrice = price / 100;
      //   console.log(item.fields.image[0].url);
      //   console.log(item.fields.name);
      //   console.log(item.fields.price);
      return `
        <a href="product.html?id=${id}" class="single-product">
            <img
            src="${url}"
            class="single-product-img img"
            />
            <footer>
            <h5 class="name">${name}</h5>
            <span class="price">$${formatPrice}</span>
            </footer>
        </a>`;
    })
    .join("");
  productsDom.innerHTML = `<div class="products-container">${result}</div>`;
}

const start = async function () {
  const items = await fetchProducts(url);
  displayProducts(items);
};
document.addEventListener("DOMContentLoaded", () => {
  start();
});
