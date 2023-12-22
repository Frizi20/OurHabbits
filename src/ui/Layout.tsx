import { NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { GrYoga } from 'react-icons/gr';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { IoGameControllerOutline } from 'react-icons/io5';
import { MdOutlineLeaderboard } from 'react-icons/md';

import Header from './Header';

function Layout() {

    return (
        <div className="  text-black bg-white  relative">
            <div className="lg:m-auto lg:max-w-[100]">
                
                <Header />

                <div>
                    <div className="fixed bottom-0 top-16 hidden w-52 overflow-auto py-6 pl-3 pr-3 lg:block border-r border-gray-100">
                        <ul className="list-none cursor-pointer">
                            <NavLink className="group" to={'/'}>
                                <li className="p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-white group-[.active]:bg-red-500 font-semibold flex items-center gap-3">
                                    <span>
                                        <FaHome />
                                    </span>
                                    <span>Home</span>
                                </li>
                            </NavLink>
                            <NavLink className="group" to={'/habbits'}>
                                <li className="p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-white group-[.active]:bg-red-500 font-semibold flex items-center gap-3">
                                    <span>
                                        <GrYoga />
                                    </span>
                                    <span>Habbits</span>
                                </li>
                            </NavLink>
                            <NavLink className="group" to={'/chat'}>
                                <li className="p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-white group-[.active]:bg-red-500 font-semibold flex items-center gap-3">
                                    <span>
                                        <IoChatboxEllipsesOutline />
                                    </span>
                                    <span>Chat</span>
                                </li>
                            </NavLink>
                            <NavLink className="group" to={'/leaderbord'}>
                                <li className="p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-white group-[.active]:bg-red-500 font-semibold flex items-center gap-3">
                                    <span>
                                        <MdOutlineLeaderboard />
                                    </span>
                                    <span>Leaderbord</span>
                                </li>
                            </NavLink>
                            <NavLink className="group" to={'/games'}>
                                <li className="p-3 text-gray-900 border-gray-900 rounded-lg hover:bg-gray-50 group-[.active]:text-white group-[.active]:bg-red-500 font-semibold flex items-center gap-3">
                                    <span>
                                        {' '}
                                        <IoGameControllerOutline />{' '}
                                    </span>
                                    <span>Games</span>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className="min-h-[80vh]  ">
                        <div className="xl:flex xl:w-full xl:gap-8  border-solid border-0 border-r min-h-[calc(100vh-4rem)]">
                            <div className="px-4 pb-4 pt-8 lg:ml-52 lg:pl-12 lg:pr-8  xl:flex-grow border-solid border-0 border-r  !p-0">
                                <div className="markdown w-full">
                                    <Outlet />
                                </div>
                            </div>
                            {/* <div className="hidden xl:sticky xl:top-28 xl:order-1 xl:mt-10 xl:block xl:max-h-[calc(100vh-10rem)] xl:w-56 xl:flex-shrink-0 xl:self-start xl:overflow-auto ">
                                <nav className="mb-2 text-sm font-bold">
                                    Details header
                                </nav>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
