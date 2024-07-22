import {cart, addToCart} from "../data/cart.js";
import {products} from "../data/products.js";


let productsHTML = '';

products.forEach((product) => {
   productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

console.log(productsHTML);

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

const addedMessageTimeouts = {};



function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
   cartQuantity += cartItem.quantity
  });

  document.querySelector('.cart-quantity')
   .innerHTML = cartQuantity;
}

function buttonMessage(productId) {
  document.querySelector(`.added-to-cart-${productId}`).classList.add('message-active');
      
  setTimeout(() => {
    const prevTimeout = addedMessageTimeouts[productId];
    if (prevTimeout){
      clearTimeout(prevTimeout);
    }

    const timeout = setTimeout(() => {
      document.querySelector(`.added-to-cart-${productId}`).classList.remove('message-active');
    },2000)

    addedMessageTimeouts[productId] = timeout;})
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
    const {productId} = button.dataset;
      addToCart(productId);
      updateCartQuantity();
      buttonMessage(productId);

    });
  });

    
    

document.querySelector('.js-toggle-button')
  .addEventListener('click', () => {
    const darkThemeLink1 = document.querySelector('link[href="styles/shared/general-dark.css"]');
    const darkThemeLink2 = document.querySelector('link[href="styles/pages/amazon-dark.css"]');

    if (darkThemeLink1 && darkThemeLink2) {
      darkThemeLink1.remove();
      darkThemeLink2.remove();

      let Lightlink = document.createElement('link');
      Lightlink.rel = 'stylesheet';
      Lightlink.href = 'styles/shared/general.css';

      let Lightlink2 = document.createElement('link');
      Lightlink2.rel = "stylesheet";
      Lightlink2.href = "styles/pages/amazon.css"

      document.head.appendChild(Lightlink2);
      document.head.appendChild(Lightlink);
    } else{ 
      const lightThemeLink1 = document.querySelector('link[href="styles/shared/general.css"]');
      const lightThemeLink2 = document.querySelector('link[href="styles/pages/amazon.css"]')

      if (lightThemeLink1) lightThemeLink1.remove();
      if (lightThemeLink2) lightThemeLink2.remove();

      let Darklink = document.createElement('link');
      Darklink.rel = 'stylesheet';
      Darklink.href = 'styles/shared/general-dark.css';

      let Darklink2 = document.createElement('link');
      Darklink2.rel = 'stylesheet';
      Darklink2.href = 'styles/pages/amazon-dark.css';

      document.head.appendChild(Darklink);
      document.head.appendChild(Darklink2);
    }

  })