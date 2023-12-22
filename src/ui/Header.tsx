import { CiLogout } from 'react-icons/ci';
import useLogout from '../features/authentication/useLogout';

import Avatar from './Avatar';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { abreviate } from '../utils/strings';

function Header() {
    const { logout } = useLogout();
    // const { user:{id} = null } = useAuth() ?? {};
    // console.log((useAuth()));
    const { user } = useAuth();
    const { name } = user ?? {};

    const abreviatedName = abreviate(name ?? 'X');

    return (
        <header className="sticky top-0 z-20 ">
            <div className="relative z-20 flex h-16 w-full items-center justify-between  border-gray-50  px-4 py-3 text-gray-900 dark:border-gray-800 dark:bg-gray-50 dark:text-gray-100 lg:px-8">
                <div className="font-bold text-xl  text-gray-900">
                    OurHabbits
                </div>

                <div className="flex gap-3">
                    <Button
                        size="big"
                        onClick={() => {
                            logout();
                        }}
                    >
                        <CiLogout />
                    </Button>
                    <div className="cursor-pointer">
                        <Avatar> {abreviatedName} </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
