import { getSession, validateToken } from "@/modules/auth";
import { NavMenu, SideMenu } from "@/modules/shared";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const validate = await validateToken();

    if (!validate) {
        redirect('/auth/login');
    }

    const user  = await getSession();

    return (
        <>  
            <div className="dashboard__layout">

                <Toaster position="top-center" richColors closeButton style={{
                    position: 'absolute'
                }} />
                <SideMenu user={user}/>
                <main className="h-screen w-full overflow-y-auto pb-12">
                    <NavMenu user={user} />
                    {children}
                </main>
            </div>
        </>
    );
}