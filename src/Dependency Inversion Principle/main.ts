// Dependency Inversion Principle (Princípio da Inversão de Dependências)
// Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações
// Dependa de abstrações, não de implementações
// Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações

// Classes de baixo nível são classes que executam tarefas (os detalhes)
// Classes de alto nível são classes que gerenciam as classes de baixo nível

import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { Persistence } from './servicies/persistence';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';
import { EnterpriseCustomer } from './classes/customer';
import { Messaging } from './servicies/messaging';

const enterpriseCustomer = new EnterpriseCustomer('Empresa 1', '22222222222');
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistence = new Persistence();

// Classe tipicamente utilizada em testes, é uma versão "falsa" da classe que realmente utilizamos
// Por exemplo, a classe messaging, se enviasse emails, toda vez que fossemos testar ela, iríamos
// Precisar enviar um email de verdade, passar para a rede e etc. Para isso, podemos criar um mock
// E esse mock vai funcionar como a classe normal, mas não efetuar esse tipo de trabalho
// Que normalmente é mais complexo e que não precisa ser feito quando a intenção não é testar
// Esse tipo de funcionalidade em questão
// class MessagingMock implements MessagingProtocol {
//   sendMessage(): void {
//     console.log('A mensagem foi enviada pelo mock');
//   }
// }

// const messagingMock = new MessagingMock();

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
