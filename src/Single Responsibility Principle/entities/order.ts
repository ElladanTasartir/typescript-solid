// A Order, ou seja, o pedido, por se tratar do que engloba o serviço, pode muito bem
// Ser o responsável por finalizar O PEDIDO, porque ninguém melhor do que ele mesmo para isso
// Realizando uma responsabilidade sua, dessa forma, o pedido precisa de um carrinho para
// Conseguir realizar suas funções de ver as compras para finalizar o pedido

// sendMessage, tem a ver com order? Não, por isso delegamos isso para uma pequena classe
// Que poderia até ser uma função, que realiza o envio de mensagens

// QUANTO MENOR A CLASSE/FUNÇÃO/MÓDULO, MELHOR, POIS É MAIS FÁCIL DE DAR MANUTENÇÃO

// Dessa forma realizamos injeções de dependência dentro da classe order
// Porém, quebramos o princípio de inversão de dependência, pois o nosso código está
// Dependendo de classes concretas e não de abstrações dessas classes

import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping-cart';
import { Messaging } from '../servicies/messaging';
import { Persistence } from '../servicies/persistence';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistence: Persistence,
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
      `Seu pedido com total de R$${this.cart.total()} foi recebido`,
    );
    this.persistence.saveOrder();
    this.cart.clear();
  }
}
