'use client'

import React from "react";
import styles from './ProductList.module.scss';
import {observer} from "mobx-react-lite";
import IProduct from "@/entities/product/model/types/iProduct"
import ICartProduct from "@/entities/cart/model/types/iCartProduct";
import IOrderProduct from "@/entities/order/model/types/iOrderProduct";
import ProductItem from "@/entities/product/ui/product-item/ProductItem";
import CartItem from "@/entities/cart/ui/cart-item/СartItem";
import OrderItem from "@/entities/order/ui/order-item/OrderItem";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";

interface IProductListProps{
    productData?: IProduct[],
    cartData?: ICartProduct[],
    orderData?: IOrderProduct[],
    type: 'product' | 'cart' | 'order'
}

const ProductList: React.FC<IProductListProps> = observer((
        {productData = [],  cartData= [], orderData = [], type},
    ) => {

    // Хук бесконченого скролла
    useInfiniteScroll()

    return (
        <section className={styles["product-list"]}>
            {type === 'product' && productData.length !== 0 && productData.map((product: IProduct) => (
                <ProductItem key={product.product_id} product={product} />
            ))}

            {type === 'cart' && cartData.length !== 0 && cartData.map((cartProduct: ICartProduct) => (
                <CartItem key={cartProduct.cart_id} product={cartProduct} />
            ))}

            {type === 'order' && orderData.length !== 0 && orderData.map((orderProduct: IOrderProduct) => (
                <OrderItem key={orderProduct.order_id} product={orderProduct} />
            ))}
        </section>
    );
});

export default ProductList;