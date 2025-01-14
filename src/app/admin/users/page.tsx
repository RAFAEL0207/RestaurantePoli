import { TitlePage } from "@/modules/shared";
import { getUsers } from "@/modules/users/actions/get-users";
import { CreateUserLink } from "@/modules/users/components/CreateUserLink";
import { UserTable } from "@/modules/users/components/UserTable";

export default async function UsersPage() {

    const { data, error } = await getUsers();

    return (
        <>
            <header className="users__header">
                <div className="users__header--container">
                    <TitlePage
                        title="Gestion de usuarios"
                        subTitle="Aqui podras gestionar los usuarios de la aplicacion"
                    />

                    <CreateUserLink/>
                </div>
            </header>

            <section>
                <div className="container">
                    <UserTable users={data}/>
                </div>
            </section>

        </>
    );
}