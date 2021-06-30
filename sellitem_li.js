import {html, render} from 'lit-html';

const productTemplate = (imgPath, productName, price, originalPrice = null, rating = null) => html`
  <div class="item-card">
  <img class="product-image" src=${imgPath}>
  <div class="product-info">
    <p class="product-name"><slot name=${productName}></slot></p>
    <div class="price">
      <span class="discount" ?invisible=${!rating}></span>
      <div class="price-values">
        <span class="final-price">${price}</span>
        <span class="original-price">${originalPrice}</span>
      </div>
    </div>
    <div class="rating-wrapper">
      <span class="star-icon">★</span>
      <slot class="rating" name="rating">4.5</slot></div>
  </div>
</div>`;

let product1 = {
  imgPath: "img/products/1.jpg",
  productName: "Monitor Análogo Monocromático",
  price: 56990,
  originalPrice: 90000,
  rating: 4.5
}

render(productTemplate(product1), document.body);