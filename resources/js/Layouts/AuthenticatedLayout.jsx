import React, { useState } from 'react';
import { Navbar, Sidebar, Dropdown, Avatar } from 'flowbite-react';
import { usePage, Link, router } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Guest', role: 'guest' };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Generic Icon component
    const Icon = ({ d }) => (
        <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d={d}></path>
        </svg>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <header>
                <Navbar fluid rounded className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-20">
                    <div className="flex items-center">
                        <button 
                            onClick={toggleSidebar} 
                            className="mr-3 p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        <Navbar.Brand as={Link} href="/dashboard">
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                Apotek App
                            </span>
                        </Navbar.Brand>
                    </div>
                    
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img="https://ui-avatars.com/api/?name=User&background=random" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm font-semibold">{user.name}</span>
                                <span className="block truncate text-sm text-gray-500 font-medium">{user.role}</span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </Navbar>
            </header>

            <div className="flex overflow-hidden flex-1 relative">
                <aside 
                    id="sidebar" 
                    className={`absolute top-0 left-0 z-10 w-64 h-full transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 lg:translate-x-0 lg:static lg:h-auto lg:pt-0 dark:bg-gray-800 dark:border-gray-700`} 
                    aria-label="Sidebar"
                >
                    <Sidebar className="w-full h-full">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item as={Link} href="/dashboard" icon={() => <Icon d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />} active={window.location.pathname === '/dashboard'}>
                                    Dashboard
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href="#" icon={() => <Icon d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />}>
                                    Kasir (POS)
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href="#" icon={() => <Icon d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />}>
                                    Master Obat
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href="#" icon={() => <Icon d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4zM4 9a2 2 0 100 4h12a2 2 0 100-4H4zM4 15a2 2 0 100 4h12a2 2 0 100-4H4z" />}>
                                    Inventory
                                </Sidebar.Item>
                                <Sidebar.Item as={Link} href="#" icon={() => <Icon d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />}>
                                    Laporan
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </aside>
                
                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 z-0 bg-gray-900/50 dark:bg-gray-900/80 lg:hidden" 
                        onClick={toggleSidebar}
                    ></div>
                )}

                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
