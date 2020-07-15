import { ShoppingCart } from './entities/shopping-cart';
import { Order } from './entities/order';
import { Messaging } from './servicies/messaging';
import { Persistence } from './servicies/persistence';
import { Product } from './entities/product';

// O arquivo main no clean code é a parte mais suja do nosso projeto
// É onde ficam as istâncias e os responsáveis por iniciar o projeto
// Entities são o coração do nosso código, pode ser lido como o que traz o dinheiro para o projeto
// Servicies são os serviços externos que utilizamos

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persistence = new Persistence();
const order = new Order(shoppingCart, messaging, persistence);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
