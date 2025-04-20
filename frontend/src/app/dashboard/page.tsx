import Dashboard from '@/components/Dashboard';
import { User } from '@/models/auth';

export default async function DashboardPage({ searchParams }: { searchParams: { token: string } }) {
    const token = searchParams.token;
    if (!token) {
        return <p style={{ color: 'red', textAlign: 'center' }}>Помилка: токен відсутній</p>;
    }
    const user: User = {id: 0, roles: [], username: '' };
    return (
        <>
            <Dashboard user={user} />
            <script dangerouslySetInnerHTML={{
                __html: `
          const username = localStorage.getItem('username') || 'Невідомий користувач';
          fetch('http://localhost:8080/api/users/' + encodeURIComponent(username), {
            headers: { Authorization: 'Bearer ${token}' }
          })
            .then(res => res.json())
            .then(data => {
              document.querySelector('.username').textContent = data.username;
            })
            .catch(() => {
              document.querySelector('.username').textContent = 'Помилка отримання даних';
            });
        `,
            }} />
        </>
    );
}

// import Dashboard from '@/components/Dashboard';
// import { getUser } from '@/services/api.service';
//
// export default async function DashboardPage({ searchParams }: { searchParams: { token: string } }) {
//     const token = searchParams.token;
//     if (!token) {
//         return <p style={{ color: 'red', textAlign: 'center' }}>Помилка: токен відсутній</p>;
//     }
//     return (
//         <>
//             <Dashboard user={{ username: '' }} />
//             <script dangerouslySetInnerHTML={{
//                 __html: `
//           try {
//             const username = localStorage.getItem('username');
//             if (!username) {
//               document.querySelector('.username').textContent = 'Помилка: ім’я користувача відсутнє';
//               console.error('Username not found in localStorage');
//               return;
//             }
//             fetch('/api/users/' + encodeURIComponent(username), {
//               headers: { Authorization: 'Bearer ${token}' }
//             })
//               .then(res => {
//                 if (!res.ok) throw new Error('HTTP ' + res.status);
//                 return res.json();
//               })
//               .then(data => {
//                 document.querySelector('.username').textContent = data.username || 'Невідомий користувач';
//               })
//               .catch(err => {
//                 document.querySelector('.username').textContent = 'Помилка отримання даних';
//                 console.error('Помилка запиту до /api/users/' + username + ':', err);
//               });
//           } catch (e) {
//             document.querySelector('.username').textContent = 'Помилка клієнтського скрипта';
//             console.error('Помилка в скрипті:', e);
//           }
//         `,
//             }} />
//         </>
//     );
// }