'use client'

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import product from "@/entities/product/model/product";
import cart from "@/entities/cart/model/cart";
import order from "@/entities/order/model/order";


const useInfiniteScroll = (): void => {
    const pathName = usePathname();

    useEffect(() => {
            const handleScroll = (): void => {
                if(
                    window.innerHeight + window.scrollY >=  document.documentElement.scrollHeight - 200
                    && !product.isLoading && product.hasMore
                ) {
                    if (pathName.includes('/profile')) {
                        order.getOrders();
                    } else if (pathName.includes('/cart')) {
                        cart.getCartProducts();
                    } else {
                        product.getProducts();
                    }
                }
            }

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
    }, [pathName]);
}

export default useInfiniteScroll;