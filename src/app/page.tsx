"use client";

import BtnApp from "@/shared/ui/button/btnApp";
export default function Catalog() {
    return (
        <main>
            <BtnApp type="button" text="Получить" onClick={getNew}/>
        </main>
    );
}
