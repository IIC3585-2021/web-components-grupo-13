const template = document.createElement("template");
template.innerHTML = /*html*/`
<div class="item-card">
  <img class="product-image" />
  <div class="product-info">
    <p class="product-name"><slot name="product-name"></p>
    <div class="price">
      <span class="discount invisible"></span>
      <div class="price-values">
        <span class="final-price"></span>
        <span class="original-price"></span>
      </div>
    </div>
    <div class="rating-wrapper">
      <span class="star-icon"></span>
      <slot class="rating" name="rating">
    </div>
  </div>
</div>`

const style = /*css*/`
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
`

const sheet = new CSSStyleSheet();
sheet.replace(style);

class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  static get observedAttributes() {
    return ["rating"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'rating') {
      if (newValue !== null) {
        this.shadowRoot.querySelector('.rating').textContent = newValue;
        this.shadowRoot.querySelector('.star-icon').textContent = '★';
        // this.shadowRoot.querySelector('.star-icon').className = 'bi-star-fill::before';
      }
    } else if (name === 'price') {
      this.shadowRoot.querySelector('.final-price').textContent = '$' + newValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else if (name === 'original-price') {
      this.shadowRoot.querySelector('.original-price').textContent = '$' + newValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      console.log(this.price)
    }

  }

  connectedCallback() {
    let toPrice = number => {
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    this.shadowRoot.querySelector('img').src = this.getAttribute('image-path');
    this.shadowRoot.querySelector('.final-price').textContent = '$' + toPrice(this.getAttribute('price'));
    if (this.getAttribute('original-price') !== null) {
      let price = this.getAttribute('price');
      let originalPrice = this.getAttribute('original-price');
      console.log(price);
      this.shadowRoot.querySelector('.original-price').textContent = '$' + toPrice(originalPrice);
      let discount = Math.round((parseInt(originalPrice) - parseInt(price))/parseInt(originalPrice) * 100);
      this.shadowRoot.querySelector('.discount').textContent = -1 * discount + '%';
      this.shadowRoot.querySelector('.discount').classList.remove('invisible');
    }
  }
}

window.customElements.define('product-card', ProductCard);