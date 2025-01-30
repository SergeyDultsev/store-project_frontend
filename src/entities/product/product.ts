import {makeAutoObservable} from "mobx";
import IProduct from "@/types/product/iProduct";

class product{
    productData: IProduct[] = [
        {id: '1', title: 'Оперативная память Kingston FURY Beast Black [KF432C16BBK2/16] 16 ГБ [DDR4, 8 ГБx2 шт, 3200 МГц, 16(CL)-18-18-32]', price: 4499, state: 'available'},
        {id: '2', title: '14.1" Ноутбук DEXP Aquilon серебристый [английская/русская раскладка, 1920x1080, IPS, Intel Celeron N4020C, ядра: 2 х 1.1 ГГц, RAM 8 ГБ, SSD 256 ГБ, Intel UHD Graphics 600, Windows 11', price: 19999, state: 'available'},
        {id: '3', title: '21.45" Монитор DEXP DF22N2 черный [1920x1080@100 Гц, VA, LED, 3000:1, 250 Кд/м², 178°/178°, HDMI 1.4, VGA (D-Sub)]', price: 20999, state: 'available'},
        {id: '4', title: 'PC', price: 19999, state: 'available'},
        {id: '5', title: 'PC', price: 19999, state: 'available'},
        {id: '6', title: 'PC', price: 19999, state: 'available'},
        {id: '7', title: 'PC', price: 19999, state: 'available'},
        {id: '8', title: 'PC', price: 19999, state: 'available'},
        {id: '9', title: 'PC', price: 19999, state: 'available'},
        {id: '10', title: 'PC', price: 19999, state: 'available'},
    ];

    constructor() {
        makeAutoObservable(this);
    }

    changeStateProduct(productId: string){
        const productItem = this.productData.find((item) => item.id === productId);
        productItem.state === 'in_cart' ? productItem.state = 'available' : productItem.state = 'in_cart';
    }
}

export default new product;