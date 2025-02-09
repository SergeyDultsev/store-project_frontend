interface ICartProduct {
    cart_id: string;
    product_id: string;
    product_name: string;
    product_price: number;
    state: 'in_cart';
    quantity: number;
}

export default ICartProduct;