import { NavBarInv } from "@/modules/navs";

export default function InventoryLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBarInv/>
            { children }
        </>
    );
}