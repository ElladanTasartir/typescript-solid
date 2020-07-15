// Open Closed Principle:
// Entidades devem estar abertas para extensão, mas fechadas para modificação
// Isso significa que não devemos ficar constantemente mexendo no nosso source code
// Ou seja, a intenção, é mexer apenas no código sujo, no main, para que as mudanças desejadas se apliquem
// A ideia é sempre ter que fazer as alterações no main, e nunca alterações em classes já criadas, apenas adições

// Através da implementação de novas classes de desconto no exemplo, podemos perceber que não é necessário
// Modificar nenhuma classe que já tenha sido criada, mas apenas criar novas
// Esse é um tipo de alteração apenas, e essa resolução é um padrão de projeto da Gang of Four, conhecido como
// Strategy

import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { Messaging } from './servicies/messaging';
import { Persistence } from './servicies/persistence';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';

// Dessa forma, é sempre necessário trocar apenas no main essas alterações de desconto no caso

const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistence = new Persistence();
const order = new Order(shoppingCart, messaging, persistence);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
