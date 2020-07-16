// Liskov Substitution Principle (Princípio da substituição de Liskov) -
// Se Φ(x) é uma propriedade demonstrável dos objetos x de tipo T. Então Φ(y)
// Deve ser verdadeiropara objetos do y do tipo S onde S é um subtipo de T
// Ou seja, subtipos precisam ser substituíveis por seus tipos de base
// Exemplo: Se o meu programa espera um Animal, algo do tipo Cachorro (que herda de Animal)
// Deve servir como qualquer outro animal
// O que significa que, se por algum acaso, tivermos subclasses que herdam de uma classe pai
// Elas devem possuir comportamento idêntico entre elas quando esperamos como tipo o pai dela
// Porque, por exemplo, na classe desconto, temos o pai Discount que possui o método calculate
// Se por algum acaso, mudássemos o comportamento de calculate nas classes filho, estaríamos
// Indo contra a LSP, porque o nosso código pode até funcionar, mas ele não está garantino
// O uso de herança do jeito correto, e isso pode gerar problemas quando a saída
// Desse método modificado, por exemplo, for diferente do esperado pela classe pai
// Outra coisa que pode ir contra a LSP, é forçar com que toda uma família que herda de uma classe pai
// Implemente um método X, sem a utilização de abstrações, como por exemplo, jogando um erro
// Se não houver implementado tal método, pois estamos mudando a maneira com que as subclasses
// E classe pai implementam esse método

import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { Messaging } from './servicies/messaging';
import { Persistence } from './servicies/persistence';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';

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
