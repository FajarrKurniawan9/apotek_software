import React from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Card } from 'flowbite-react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Admin', role: 'admin' };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Selamat Datang, {user.name} ({user.role || 'Admin'})
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Here is the overview of your Apotek</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="flex flex-col">
                        <dt className="mb-2 text-3xl font-extrabold text-blue-600 dark:text-blue-500">Rp 2.5M</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Total Penjualan Hari Ini</dd>
                    </div>
                </Card>
                <Card>
                    <div className="flex flex-col">
                        <dt className="mb-2 text-3xl font-extrabold text-red-600 dark:text-red-500">12</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Obat Hampir Habis</dd>
                    </div>
                </Card>
                <Card>
                    <div className="flex flex-col">
                        <dt className="mb-2 text-3xl font-extrabold text-green-600 dark:text-green-500">145</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Transaksi Hari Ini</dd>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
