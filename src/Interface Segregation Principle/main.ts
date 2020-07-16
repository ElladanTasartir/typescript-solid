// Interface Segregation Principle (Princípio de segregação de Interface)
// Os clientes não devem ser forçados a depender de interfaces/types/membros abstratos que não utilizam
// Ou seja, as nossas classes não podem implementar interfaces em que elas não utilizem alguma parte dela
// As duas classes de Customer, compartilham informações parecidas, mas não todas
// Por isso, não faz sentido elas implementarem uma interface/type/classes abstratas que cobra elas
// De implementarem todos os atributos/métodos, mas não utilizar todos em seu corpo
// Para envitar isso, é recomendável também, não criar interfaces muito grandes, para evitar que
// Necessitem de dados irrelevantes para o seu funcionamento

// Da forma que fizemos, na order, independente do tipo de customer que chegar
// Imprimios o nome e o IDN de forma polimórfica e sem ferir o ISP, porque temos
// Uma interface em comum nos dois que os dois utilizam

import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { Messaging } from './servicies/messaging';
import { Persistence } from './servicies/persistence';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';
import { EnterpriseCustomer } from './classes/customer';

// const individualCustomer = new IndividualCustomer(
//   'Erick',
//   'Malta',
//   '111.111.111-11',
// );
const enterpriseCustomer = new EnterpriseCustomer('Empresa 1', '22222222222');
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistence = new Persistence();
const order = new Order(
  shoppingCart,
  messaging,
  persistence,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
