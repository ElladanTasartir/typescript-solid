import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistenceProtocol } from './interfaces/persistence-protocol';

// Order é uma classe de alto nível, mas está dependendo de classes de baixo nível
// O que fere o DIP e deixa o nosso código acoplado, pois uma classe precisa da outra
// Por isso, vamos mudar para que ocorra a inversão de dependências

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistence: PersistenceProtocol,
    // Nesse caso, não estamos dependendo de uma classe de baixo nível
    // Mas sim, de uma abstração, pois CustomerOrder é uma interface
    // O que categoriza uma inversão de dependência
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de R$${this.cart.totalWithDiscount()} foi recebido`,
    );
    this.persistence.saveOrder();
    this.cart.clear();
    console.log(
      'O cliente é: ',
      this.customer.getName(),
      this.customer.getIDN(),
    );
  }
}
