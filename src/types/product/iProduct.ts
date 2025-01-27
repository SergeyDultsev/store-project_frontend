interface IProduct {
    id: string;
    title: string;
    price: number;
    state: 'in_cart' | 'available';
}

export default IProduct;