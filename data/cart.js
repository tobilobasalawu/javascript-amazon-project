export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
   if (productId === cartItem.productId){
     matchingItem = cartItem;
   }
  });

  let result = document.querySelector(`.js-quantity-selector-${productId}`);
  let quantity = Number(result.value);

  if (matchingItem) {
   //matchingItem.quantity++;
   matchingItem.quantity += quantity;
  }else {
   cart.push({ productId: productId, quantity: quantity, productId, quantity });
  }
}