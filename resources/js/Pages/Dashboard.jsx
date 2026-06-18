import React from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Card } from 'flowbite-react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Admin', role: 'owner' };

    const metrics = [
        {
            title: 'Total Penjualan Hari Ini',
            value: 'Rp 0',
            subtitle: 'Belum ada penjualan',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-blue-600',
            bgLight: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-600 dark:text-blue-400',
        },
        {
            title: 'Obat Hampir Habis',
            value: '—',
            subtitle: 'Data akan tersedia',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            ),
            gradient: 'from-amber-500 to-orange-500',
            bgLight: 'bg-amber-50 dark:bg-amber-900/20',
            textColor: 'text-amber-600 dark:text-amber-400',
        },
        {
            title: 'Transaksi Hari Ini',
            value: '0',
            subtitle: 'Belum ada transaksi',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            gradient: 'from-emerald-500 to-green-500',
            bgLight: 'bg-emerald-50 dark:bg-emerald-900/20',
            textColor: 'text-emerald-600 dark:text-emerald-400',
        },
    ];

    const getRoleBadge = (role) => {
        switch (role) {
            case 'owner':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                        Owner
                    </span>
                );
            case 'cashier':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Kasir
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {role}
                    </span>
                );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Welcome Banner */}
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-white/5 rounded-full translate-y-1/2"></div>

                <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">
                            Selamat Datang, {user.name}!
                        </h1>
                        {getRoleBadge(user.role)}
                    </div>
                    <p className="text-blue-100/80 text-sm">
                        Berikut ringkasan aktivitas apotek Anda hari ini. Data akan diperbarui secara real-time.
                    </p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {metrics.map((metric, index) => (
                    <Card key={index} className="!border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    {metric.title}
                                </p>
                                <h3 className={`text-2xl font-bold ${metric.textColor}`}>
                                    {metric.value}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {metric.subtitle}
                                </p>
                            </div>
                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${metric.bgLight}`}>
                                <span className={metric.textColor}>
                                    {metric.icon}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quick Info */}
            <div className="mt-6">
                <Card className="!border-0 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Fitur Segera Hadir</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Modul Kasir (POS), Master Obat, Inventory, dan Laporan sedang dalam pengembangan.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
