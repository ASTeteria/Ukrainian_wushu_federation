'use client';

import { useState } from 'react';
import { login } from '@/services/api.service';
import { LoginRequestDTO } from '@/models/auth';

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);

    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            return {};
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const loginData: LoginRequestDTO = {
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        };

        try {
            const result = await login(loginData);
            const payload = parseJwt(result.accessToken);
            const userId = payload.sub || payload.id || 0;
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('username', loginData.username);
            localStorage.setItem('userId', userId.toString());
            window.location.href = `/dashboard?token=${result.accessToken}`;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Невірні облікові дані');
        }
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Вхід</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#333' }}>
                        Ім'я користувача
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        style={{ marginTop: '0.25rem', padding: '0.5rem', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#333' }}>
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        style={{ marginTop: '0.25rem', padding: '0.5rem', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', backgroundColor: '#1E40AF', color: '#fff', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Увійти
                </button>
            </form>
        </div>
    );
}