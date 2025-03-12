import IProduct from "@/entities/product/model/types/iProduct";

interface IOrderProduct extends IProduct{
    order_id: string,
    quantity: number
}

export default IOrderProduct;