// import { validateToken } from "@/modules/auth";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    
    // const validate = await validateToken();
    
    
    return (


        <div className="bg-white min-h-screen grid grid-cols-12 items-center w-full">
            <main className="col-span-12 md:col-span-5">
                {  children }
            </main>

            <div className="hidden p-8 md:col-span-7 min-h-screen md:flex">
                <div className="bg-auth min-h-min rounded-[2rem] flex-1">
                    
                </div>
            </div>
        </div>
    );
}