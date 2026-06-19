import React, { useState } from 'react';
import { Sidebar, Dropdown, DropdownHeader, DropdownDivider, DropdownItem } from 'flowbite-react';
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

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const menuItems = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
        },
        {
            label: 'Kasir (POS)',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
            ),
        },
        {
            label: 'Obat',
            href: '/medicines',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
        },
        {
            label: 'Kategori',
            href: '/categories',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
        },
        {
            label: 'Satuan',
            href: '/units',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            ),
        },
        {
            label: 'Inventory',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
        {
            label: 'Laporan',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
    ];

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'owner': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'cashier': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className="mr-3 p-2 text-gray-500 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                                id="toggle-sidebar-btn"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <Link href="/dashboard" className="flex items-center gap-2.5">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 shadow-sm">
                                    <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <span className="self-center whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
                                    Apotek App
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <Dropdown
                                arrowIcon={false}
                                renderTrigger={() => (
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                            {getInitials(user.name)}
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{user.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize leading-tight">{user.role}</p>
                                        </div>
                                        <svg className="w-4 h-4 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                )}
                            >
                                <DropdownHeader>
                                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">{user.name}</span>
                                    <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${getRoleBadgeColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </DropdownHeader>
                                <DropdownDivider />
                                <DropdownItem
                                    id="logout-btn"
                                    onClick={handleLogout}
                                >
                                    <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign out
                                    </span>
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="flex overflow-hidden flex-1 relative">
                {/* Sidebar */}
                <aside
                    id="sidebar"
                    className={`fixed top-[57px] left-0 z-20 w-64 h-[calc(100vh-57px)] transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 lg:translate-x-0 lg:static lg:h-auto dark:bg-gray-800 dark:border-gray-700`}
                    aria-label="Sidebar"
                >
                    <div className="overflow-y-auto h-full px-3 py-4">
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = currentPath === item.href;
                                return (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                                isActive
                                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <span className={`flex-shrink-0 transition-colors ${
                                                isActive
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
                                            }`}>
                                                {item.icon}
                                            </span>
                                            <span>{item.label}</span>
                                            {isActive && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Sidebar footer */}
                        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="px-2.5 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
                                <p className="text-xs font-medium text-blue-800 dark:text-blue-300">Apotek App v1.0</p>
                                <p className="text-xs text-blue-600/60 dark:text-blue-400/60 mt-0.5">Pharmacy Management</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/80 lg:hidden transition-opacity"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 xl:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
