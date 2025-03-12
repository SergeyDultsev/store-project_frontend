import IProduct from "@/entities/product/model/types/iProduct";

interface ICartProduct extends IProduct{
    cart_id: string;
    product_state: 'in_cart';
    quantity: number
}

export default ICartProduct;