import { TitlePage } from "@/modules/shared";

import { NewUserForm } from "@/modules/users/components/NewUserForm";
import { PreviousPageButton } from "@/modules/shared/components/PreviousPageButton";


export default function NewUserPage() {
    return (
        <>
            <header className="new-user__header">
                <div className="new-user__header--container">
                    <PreviousPageButton/>
                    <TitlePage
                        title="Nuevo producto"
                        subTitle="Agrega un nuevo producto a tu inventario"
                    />
                </div>
            </header>

            <section>
                <div className="container">
                    <NewUserForm/>
                </div>
            </section>

        </>
    );
}