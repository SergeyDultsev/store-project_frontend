import ProductList from "@/widgets/product-list/ProductList";
import {useEffect} from "react";
import user from "@/entities/user/user";
import Cookies from "js-cookie";

export default function HomePage() {

    useEffect(() => {
        const token = Cookies.get("auth_token");
        if (!token) return;
        const response = user.authorizationCheck();
        if (!response) Cookies.remove("auth_token");
    }, []);

    return (
        <main>
            <ProductList/>
        </main>
    );
}
