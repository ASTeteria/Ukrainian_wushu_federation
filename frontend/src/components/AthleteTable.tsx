// import { createAthletes } from '@/services/api.service';
// import { AthleteDTO} from '@/models/athlete';
// import { ProgramType} from '@/models/programtypes';
// import {Gender} from "@/models/gender";
//
// export default function AthleteTable() {
//     async function handleSubmit(formData: FormData) {
//         'use server';
//         const athletes: AthleteDTO[] = [];
//         const token = formData.get('token') as string;
//         const userId = parseInt(formData.get('userId') as string);
//
//         for (let i = 1; i <= 30; i++) {
//             const firstName = formData.get(`firstName${i}`);
//             const lastName = formData.get(`lastName${i}`);
//             const birthDate = formData.get(`birthDate${i}`);
//             const programType = formData.get(`programType${i}`);
//             const gender = formData.get(`gender${i}`);
//             if (firstName && lastName && gender && birthDate && programType) {
//
//                 athletes.push({
//
//                     firstName: firstName as string,
//                     lastName: lastName as string,
//                     birthDate: birthDate as string,
//                     programType: programType as ProgramType,
//                     gender: gender as Gender,
//                     userId
//                 });
//             }
//         }
//
//         try {
//             await createAthletes(athletes, token);
//             return { success: 'Атлети успішно створені' };
//         } catch (err) {
//             return { error: err instanceof Error ? err.message : 'Помилка створення атлетів' };
//         }
//     }
//
//     return (
//         <div style={{ padding: '2rem', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//                 <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Додати атлетів</h2>
//                 <form>
//                     <input type="hidden" name="token" value={typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''} />
//                     <input type="hidden" name="userId" value={typeof window !== 'undefined' ? localStorage.getItem('userId') || '0' : '0'} />
//                     <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
//                         <thead>
//                         <tr>
//                             <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Ім'я</th>
//                             <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Прізвище</th>
//                             <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Дата народження</th>
//                             <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Тип програми</th>
//                             <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Стать</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {Array.from({ length: 30 }).map((_, index) => (
//                             <tr key={index}>
//                                 <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
//                                     <input
//                                         type="text"
//                                         name={`firstName${index + 1}`}
//                                         style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
//                                     />
//                                 </td>
//                                 <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
//                                     <input
//                                         type="text"
//                                         name={`lastName${index + 1}`}
//                                         style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
//                                     />
//                                 </td>
//                                 <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
//                                     <input
//                                         type="date"
//                                         name={`birthDate${index + 1}`}
//                                         style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
//                                     />
//                                 </td>
//                                 <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
//                                     <select
//                                         name={`programType${index + 1}`}
//                                         style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
//                                     >
//                                         <option value="">Оберіть тип програми</option>
//                                         <option value="TAOLU">Таолу</option>
//                                         <option value="SANDA">Санда</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                     <button
//                         type="submit"
//                         style={{ backgroundColor: '#1E40AF', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
//                     >
//                         Додати атлетів
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import { createAthletes } from '@/services/api.service';
import { AthleteDTO } from '@/models/athlete';
import { ProgramType } from '@/models/programtypes';
import { Gender } from '@/models/gender';

export default function AthleteTable() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [token, setToken] = useState<string>('');
    const [userId, setUserId] = useState<string>('0');

    // Отримуємо token і userId із localStorage після монтування на клієнті
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token') || '');
            setUserId(localStorage.getItem('userId') || '0');
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData(event.currentTarget);
        const athletes: AthleteDTO[] = [];

        if (!token) {
            setError('Токен не знайдено. Увійдіть знову.');
            return;
        }

        for (let i = 1; i <= 30; i++) {
            const firstName = formData.get(`firstName${i}`);
            const lastName = formData.get(`lastName${i}`);
            const birthDate = formData.get(`birthDate${i}`);
            const programType = formData.get(`programType${i}`);
            const gender = formData.get(`gender${i}`);
            if (firstName && lastName && birthDate && programType && gender) {
                console.log('Athlete data:', { firstName, lastName, birthDate, programType, gender, userId });
                athletes.push({
                    id: null,
                    firstName: firstName as string,
                    lastName: lastName as string,
                    birthDate: birthDate as string, // Формат "YYYY-MM-DD"
                    programType: programType as ProgramType,
                    gender: gender as Gender,
                    userId: parseInt(userId),
                });
            }
        }

        if (athletes.length === 0) {
            setError('Не введено жодного атлета.');
            return;
        }

        try {
            await createAthletes(athletes, token);
            setSuccess('Атлети успішно створені');
            setError(null);
            event.currentTarget.reset(); // Очистити форму
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Помилка створення атлетів');
            setSuccess(null);
        }
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Додати атлетів</h2>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="token" value={token} />
                    <input type="hidden" name="userId" value={userId} />
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
                        <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Ім'я</th>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Прізвище</th>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Дата народження</th>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Тип програми</th>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Стать</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from({ length: 30 }).map((_, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                                    <input
                                        type="text"
                                        name={`firstName${index + 1}`}
                                        style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                                    <input
                                        type="text"
                                        name={`lastName${index + 1}`}
                                        style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                                    <input
                                        type="date"
                                        name={`birthDate${index + 1}`}
                                        style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                                    <select
                                        name={`programType${index + 1}`}
                                        style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    >
                                        <option value="">Оберіть тип програми</option>
                                        <option value="TAOLU_TRADITIONAL">Таолу Традиційний</option>
                                        <option value="CONTACT">Контакт</option>
                                        <option value="TAOLU_SPORT">Таолу Спортивний</option>
                                    </select>
                                </td>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                                    <select
                                        name={`gender${index + 1}`}
                                        style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    >
                                        <option value="">Оберіть стать</option>
                                        <option value="MALE">Чоловік</option>
                                        <option value="FEMALE">Жінка</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        type="submit"
                        style={{ backgroundColor: '#1E40AF', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Додати атлетів
                    </button>
                </form>
            </div>
        </div>
    );
}