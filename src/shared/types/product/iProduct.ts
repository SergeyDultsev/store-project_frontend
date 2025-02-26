interface IProduct {
    product_id: string;
    product_name: string;
    product_price: number;
    product_state: 'in_cart' | 'available';
    image_url: string;
}

export default IProduct;