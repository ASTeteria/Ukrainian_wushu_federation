import { User } from '@/models/auth';

interface DashboardProps {
    user: User;
}

export default function Dashboard({ user }: DashboardProps) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Особистий кабінет</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                    <p><strong>Ім'я користувача:</strong> <span className="username">{user.username}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a
                        href="/athletes"
                        style={{ backgroundColor: '#1E40AF', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
                    >
                        Додати атлета
                    </a>
                    <a
                        href="/taolu"
                        style={{ backgroundColor: '#1E40AF', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
                    >
                        Подати заявку на таолу
                    </a>
                    <a
                        href="/contact"
                        style={{ backgroundColor: '#1E40AF', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
                    >
                        Подати заявку на контактні види
                    </a>
                </div>
            </div>
        </div>
    );
}