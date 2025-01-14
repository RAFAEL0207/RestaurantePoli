import { menuFont } from "@/config/fonts";

export default function MenuLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={menuFont.className}>
            {children}
        </div>
    );
}