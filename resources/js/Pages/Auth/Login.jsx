import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Card, Label, TextInput, Button } from 'flowbite-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
            <Head title="Login" />

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Apotek App</h1>
                    <p className="text-blue-200/60 mt-1 text-sm">Sistem Manajemen Apotek</p>
                </div>

                <Card className="border-0 shadow-2xl shadow-black/20 !bg-white/5 backdrop-blur-xl !border-white/10">
                    <form className="flex flex-col gap-5" onSubmit={submit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Username" className="!text-blue-100/80 text-sm font-medium" />
                            </div>
                            <TextInput
                                id="username"
                                type="text"
                                placeholder="Masukkan username"
                                required
                                autoComplete="username"
                                autoFocus
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                color={errors.username ? 'failure' : undefined}
                                helperText={errors.username && <span className="font-medium">{errors.username}</span>}
                                sizing="lg"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" className="!text-blue-100/80 text-sm font-medium" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                color={errors.password ? 'failure' : undefined}
                                helperText={errors.password && <span className="font-medium">{errors.password}</span>}
                                sizing="lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={processing}
                            size="lg"
                            className="mt-1 w-full !bg-gradient-to-r !from-blue-600 !to-cyan-500 hover:!from-blue-700 hover:!to-cyan-600 focus:!ring-blue-500/50 border-0 transition-all duration-200 shadow-lg shadow-blue-500/25"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Masuk...
                                </span>
                            ) : 'Masuk'}
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-blue-200/30 text-xs mt-6">
                    &copy; {new Date().getFullYear()} Apotek App &mdash; All rights reserved
                </p>
            </div>
        </div>
    );
}
