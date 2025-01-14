
import { IUser } from '@/modules/auth/interfaces/user';
import { Avatar } from './Avatar';
import { MenuButton } from './MenuButton';
import { SearchResource } from './SearchResource';
import { CartDrawer } from '@/modules/cart/components/CartDrawer';

interface Props {
    user: IUser;
}

export const NavMenu = ({ user }: Props) => {
    
    return (
        <nav className='navmenu'>
            <MenuButton/>
            {/* <SearchResource/> */}
            <div className='flex items-center justify-between gap-4 w-full'>
                <CartDrawer/>
                <Avatar user={ user }/>
            </div>
        </nav>
    )
}
