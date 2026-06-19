import React, { useState } from 'react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Modal, Button, TextInput, Label, Textarea, HelperText } from 'flowbite-react';

export default function Index({ categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
    });

    const openModal = (category = null) => {
        clearErrors();
        if (category) {
            setEditingId(category.id);
            setData({
                name: category.name,
                description: category.description || '',
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
            put(`/categories/${editingId}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/categories', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            destroy(`/categories/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kategori Obat" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Kategori Obat</h2>
                <Button color="info" onClick={() => openModal()}>Tambah Kategori</Button>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell>No</TableHeadCell>
                        <TableHeadCell>Nama</TableHeadCell>
                        <TableHeadCell>Deskripsi</TableHeadCell>
                        <TableHeadCell>Aksi</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {categories.map((category, index) => (
                            <TableRow key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {category.name}
                                </TableCell>
                                <TableCell>{category.description || '-'}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" color="warning" onClick={() => openModal(category)}>Edit</Button>
                                        <Button size="sm" color="failure" onClick={() => handleDelete(category.id)}>Hapus</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-gray-500">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} size="md">
                <form onSubmit={submit}>
                    <Modal.Header>{editingId ? 'Edit Kategori' : 'Tambah Kategori'}</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Nama Kategori" />
                                </div>
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    color={errors.name ? 'failure' : 'gray'}
                                />
                                {errors.name && <HelperText color="failure">{errors.name}</HelperText>}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Deskripsi" />
                                </div>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    color={errors.description ? 'failure' : 'gray'}
                                    rows={4}
                                />
                                {errors.description && <HelperText color="failure">{errors.description}</HelperText>}
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
