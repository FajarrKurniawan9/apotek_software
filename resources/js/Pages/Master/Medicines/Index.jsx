import React, { useState } from 'react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Modal, Button, TextInput, Label, Select, ToggleSwitch, HelperText } from 'flowbite-react';
import { formatRupiah } from '../../../utils/currency';

export default function Index({ medicines, categories, units }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        code: '',
        name: '',
        category_id: '',
        unit_id: '',
        base_price: '',
        sell_price: '',
        min_stock_alert: '0',
        is_active: true,
    });

    const openModal = (medicine = null) => {
        clearErrors();
        if (medicine) {
            setEditingId(medicine.id);
            setData({
                code: medicine.code,
                name: medicine.name,
                category_id: medicine.category_id,
                unit_id: medicine.unit_id,
                base_price: medicine.base_price,
                sell_price: medicine.sell_price,
                min_stock_alert: medicine.min_stock_alert || 0,
                is_active: medicine.is_active,
            });
        } else {
            setEditingId(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(`/medicines/${editingId}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/medicines', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus obat ini?')) {
            destroy(`/medicines/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Master Obat" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Master Obat</h2>
                <Button color="info" onClick={() => openModal()}>Tambah Obat</Button>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell>Kode</TableHeadCell>
                        <TableHeadCell>Nama</TableHeadCell>
                        <TableHeadCell>Kategori</TableHeadCell>
                        <TableHeadCell>Satuan</TableHeadCell>
                        <TableHeadCell>Harga Beli</TableHeadCell>
                        <TableHeadCell>Harga Jual</TableHeadCell>
                        <TableHeadCell>Total Stok</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell>Aksi</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {medicines.map((medicine) => (
                            <TableRow key={medicine.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="font-medium text-gray-900 dark:text-white">{medicine.code}</TableCell>
                                <TableCell>{medicine.name}</TableCell>
                                <TableCell>{medicine.category?.name}</TableCell>
                                <TableCell>{medicine.unit?.name}</TableCell>
                                <TableCell>{formatRupiah(medicine.base_price)}</TableCell>
                                <TableCell>{formatRupiah(medicine.sell_price)}</TableCell>
                                <TableCell>
                                    <span className={`font-semibold ${medicine.total_stock <= medicine.min_stock_alert ? 'text-red-500' : 'text-green-500'}`}>
                                        {medicine.total_stock || 0}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${medicine.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {medicine.is_active ? 'Aktif' : 'Non-aktif'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" color="warning" onClick={() => openModal(medicine)}>Edit</Button>
                                        <Button size="sm" color="failure" onClick={() => handleDelete(medicine.id)}>Hapus</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {medicines.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-4 text-gray-500">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} size="xl">
                <form onSubmit={submit}>
                    <Modal.Header>{editingId ? 'Edit Obat' : 'Tambah Obat'}</Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="code" value="Kode Obat" />
                                <TextInput id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} color={errors.code ? 'failure' : 'gray'} />
                                {errors.code && <HelperText color="failure">{errors.code}</HelperText>}
                            </div>
                            <div>
                                <Label htmlFor="name" value="Nama Obat" />
                                <TextInput id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} color={errors.name ? 'failure' : 'gray'} />
                                {errors.name && <HelperText color="failure">{errors.name}</HelperText>}
                            </div>
                            <div>
                                <Label htmlFor="category_id" value="Kategori" />
                                <Select id="category_id" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} color={errors.category_id ? 'failure' : 'gray'}>
                                    <option value="">Pilih Kategori</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Select>
                                {errors.category_id && <HelperText color="failure">{errors.category_id}</HelperText>}
                            </div>
                            <div>
                                <Label htmlFor="unit_id" value="Satuan" />
                                <Select id="unit_id" value={data.unit_id} onChange={(e) => setData('unit_id', e.target.value)} color={errors.unit_id ? 'failure' : 'gray'}>
                                    <option value="">Pilih Satuan</option>
                                    {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </Select>
                                {errors.unit_id && <HelperText color="failure">{errors.unit_id}</HelperText>}
                            </div>
                            <div>
                                <Label htmlFor="base_price" value="Harga Beli Dasar" />
                                <TextInput id="base_price" type="number" min="0" step="0.01" value={data.base_price} onChange={(e) => setData('base_price', e.target.value)} color={errors.base_price ? 'failure' : 'gray'} />
                                {errors.base_price && <HelperText color="failure">{errors.base_price}</HelperText>}
                            </div>
                            <div>
                                <Label htmlFor="sell_price" value="Harga Jual" />
                                <TextInput id="sell_price" type="number" min="0" step="0.01" value={data.sell_price} onChange={(e) => setData('sell_price', e.target.value)} color={errors.sell_price ? 'failure' : 'gray'} />
                                {errors.sell_price && <HelperText color="failure">{errors.sell_price}</HelperText>}
                            </div>
                            <div>
                                <Label htmlFor="min_stock_alert" value="Batas Stok Minimum" />
                                <TextInput id="min_stock_alert" type="number" min="0" value={data.min_stock_alert} onChange={(e) => setData('min_stock_alert', e.target.value)} color={errors.min_stock_alert ? 'failure' : 'gray'} />
                                {errors.min_stock_alert && <HelperText color="failure">{errors.min_stock_alert}</HelperText>}
                            </div>
                            <div className="flex items-center mt-6">
                                <ToggleSwitch
                                    checked={data.is_active}
                                    label="Obat Aktif"
                                    onChange={(checked) => setData('is_active', checked)}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" processing={processing} color="info">Simpan</Button>
                        <Button color="gray" onClick={closeModal}>Batal</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
