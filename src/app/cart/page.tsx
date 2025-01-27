'use client'

import styles from '@/widgets/cart-total/cartTotal.module.scss'
import CartList from "@/widgets/cart-list/cartList";
import CartTotal from "@/widgets/cart-total/cartTotal";
import BtnApp from "@/shared/ui/button/btnApp";
import product from "@/entities/product/product";

export default function Page() {
    const handleCard = () => {

    }

    return (
        <main>
            <section className={styles['card-wrapper']}>
                <div className={styles['card-total__block']}>
                    <CartTotal />
                    <BtnApp text={"Оформить заказ"} type={'button'} onClick={handleCard}/>
                </div>
                <CartList products={product.productData}/>
            </section>
        </main>
    );
}