export interface CartItem {
  storeProductId: number;
  quantity: number;
}

export interface CartLine {
  storeProductId: number;
  unitPrice: number;
  quantity: number;
  line: number;
}

export interface CartQuoteResponse {
  subtotal: number;
  details: (CartLine | { storeProductId: number; error: string })[];
}