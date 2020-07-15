// Single Responsibility Principle: Cada classe/função deve ter apenas um motivo para mudar
// Em outros termos, isso pode ser lido como, uma classe deve apenas possuir uma responsabilidade
// Tipos de "responsabilidades": Regras de negócios, persistência de dados, comunicação com serviços externos,
// Godclass (classe que faz tudo), validações em grande escala em um lugar só

// Para medir a coesão de uma classe, podemos seguir a lógica do clean code:
// Uma classe só é coesa, quando ela utiliza os seus atributos em seus métodos

// Responsabilidades a mais da classe ShopppingCart:
// Status da ordem, precisa ficar dentro do carrinho?
// Devemos finalizar o pedido, dentro do carrinho de compras? Será que é uma responsabilidade dele?
// Não deveria ser só armazenar os produtos?
// Enviar mensagens, é algo que o carrinho deve fazer?
// Salvar o pedido, é responsabilidade de um carrinho de compras?
// Order pode se tornar a sua própria classe

type CartItem = {
  name: string;
  price: number;
};

type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1); // Do índice que eu quero, irei remover 1 elemento
  }

  // Readonly para garantir que nenhum dos items do array possa ser pego e alterado de fora
  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2); // toFixed retorna uma string
    // Por isso, se colocarmos um mais antes dele, ele irá converter para number
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Seu pedido com total de R$${this.total()} foi recebido`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('Mensagem enviada:', msg);
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso');
  }

  clear(): void {
    console.log('Carrinho de compras foi limpo');
    // Dessa forma, retiramos todos os itens de um array
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: 'Camiseta', price: 49.9 });
shoppingCart.addItem({ name: 'Caderno', price: 9.9 });
shoppingCart.addItem({ name: 'Lápis', price: 1.59 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.orderStatus);
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
