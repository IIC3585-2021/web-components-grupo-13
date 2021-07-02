import {html, render} from 'https://unpkg.com/lit-html?module';

const productsTemplateArray = [];

const catalog = () => html`${productsTemplateArray}`

const productTemplate = ({imgPath, productName, price, originalPrice = null, rating = null}) => html`
  <style>
    .item-card {
      font-family: 'Open Sans', 'Arial', 'sans-serif';
      width: 250px;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(160,160,160);
      border-radius: 10px;
      flex: 0 0 auto;
      margin: 10px;
      pointer-events: none;
    }

    .item-card img {
      height: auto;
      width: 100%;
      display: block;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .discount {
      border-radius: 5px;
      background: #d11b1b;
      color: white;
      padding: 2px;
      float: right;
    }

    .invisible {
      visibility: hidden;
    }

    .product-info {
      height: 7.3rem;
      border-top-style: solid;
      border-width: 1px;
      border-color: rgb(160,160,160);
      padding: 10px;
      padding-top: 0px;
      background-color: white;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .product-name {
      height: 2rem;
      font-size: 1rem;
      font-weight: 200;
    }

    .final-price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #00734b;
    }

    .original-price {
      padding-left: 10px;
      font-size: 1.25rem;
      color: rgb(160,160,160);
      font-weight: lighter;
      text-decoration: line-through;
    }

    .star-icon {
      font-family: 'bootstrap-icons';
      color: #ffc107;
    }

    .rating-wrapper {
      padding-top: 10px;
    }
  </style>
  <div class="item-card">
    <img class="product-image" src=${imgPath}>
    <div class="product-info">
      <p class="product-name">${productName}</p>
      ${priceTemplate(price, originalPrice)}
      ${ratingTemplate(rating)}
    </div>
  </div>`;

const ratingTemplate = rating => html`
 ${rating
    ? html`
      <div class="rating-wrapper">
        <span class="star-icon">★</span>
        <span class="rating" name="rating">${rating}</span>
      </div>
      `
    : null
  }
`;

const priceTemplate = (price, originalPrice) => html`
  <div class="price">
    ${originalPrice
      ? html`<span class="discount">-${discount(price, originalPrice)}%</span>`
      : null
    }
    <div class="price-values">
    <span class="final-price">${toPrice(price)}</span>
    ${originalPrice
      ? html`<span class="original-price">${toPrice(originalPrice)}</span>`
      : null
    }
    </div>
  </div>
`

const discount = (price, originalPrice) => {
  let discount = Math.round((parseInt(originalPrice) - parseInt(price))/parseInt(originalPrice) * 100);
  return discount;
}

const toPrice = number => {
  return '$' + String(number).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

let product1 = {
  imgPath: './img/products/1.jpg',
  productName: 'Monitor Análogo Monocromático',
  price: 56990,
  originalPrice: 90000,
  rating: 4.5
}

let product2 = {
  imgPath: './img/products/2.jpg',
  productName: 'Juego Poleras Café',
  price: 23990,
  originalPrice: 30000
}

let product3 = {
  imgPath: './img/products/3.jpg',
  productName: 'Base con Batería para Amazon Alexa',
  price: 72990,
  rating: 3.5
}

let product4 = {
  imgPath: './img/products/4.jpg',
  productName: 'Destapador Multiuso',
  price: 7990
}

for (const product of [product1, product2, product3, product4]) {
  productsTemplateArray.push(html`${productTemplate(product)}`)
}

render(catalog(productsTemplateArray), document.getElementById("catalog"));