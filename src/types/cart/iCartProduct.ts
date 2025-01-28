interface ICartProduct {
    id: string;
    title: string;
    price: number;
    state: 'in_cart' | 'available';
    quantity: number;
}

export default ICartProduct;