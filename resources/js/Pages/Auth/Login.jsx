import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Card, Label, TextInput, Button } from 'flowbite-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Head title="Login" />
            <Card className="w-full max-w-md shadow-lg">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Access your Apotek Dashboard</p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput 
                            id="email" 
                            type="email" 
                            placeholder="name@apotek.com" 
                            required 
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            color={errors.email ? "failure" : "gray"}
                            helperText={errors.email && <span className="font-medium">{errors.email}</span>}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput 
                            id="password" 
                            type="password" 
                            required 
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            color={errors.password ? "failure" : "gray"}
                            helperText={errors.password && <span className="font-medium">{errors.password}</span>}
                        />
                    </div>
                    <Button type="submit" disabled={processing} className="mt-2 w-full" color="blue">
                        {processing ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
