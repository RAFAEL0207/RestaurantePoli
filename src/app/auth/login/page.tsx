import { LoginForm } from '../../../modules/auth';
import Image from "next/image";
import logo from '../../../assets/images/logo.png';

export default function LoginPage() {
    return (
        <>

            <header>
                <div className="container flex flex-col gap-2 text-center">
                    <Image
                        className="bg-black rounded-md mx-auto"
                        width={150}
                        height={10}
                        src={logo}
                        alt=""
                    />
                    <h2 className="text-[3rem]">Bienvenido</h2>
                    <p>Ingresa tus credenciales para acceder al sistema.</p>
                </div>
            </header>

            <section className="login-form__container">
                <LoginForm />
            </section>
        </>

    );
}