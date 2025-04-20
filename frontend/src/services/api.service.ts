import { LoginRequestDTO, AuthResponseDTO } from '@/models/auth';
import { AthleteDTO } from '@/models/athlete';

export async function login(data: LoginRequestDTO): Promise<AuthResponseDTO> {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Login error:', response.status, errorData);
            throw new Error(errorData.message || 'Failed to login');
        }

        return response.json();
    } catch (err) {
        console.error('Login fetch error:', err);
        throw err;
    }
}

export async function getUser(username: string, token: string) {
    const response = await fetch(`http://localhost:8080/api/users/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return response.json();
}

// export async function createAthletes(athletes: AthleteDTO[], token: string) {
//     for (const athlete of athletes) {
//         const response = await fetch('http://localhost:8080/api/athletes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(athlete),
//         });
//
//         if (!response.ok) {
//             throw new Error('Failed to create athlete');
//         }
//     }
export async function createAthletes(athletes: AthleteDTO[], token: string) {
    for (const athlete of athletes) {
        console.log('Sending athlete:', athlete);
        const response = await fetch('http://localhost:8080/api/athletes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(athlete),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Create athlete error:', response.status, errorData);
            throw new Error(errorData.message || `Failed to create athlete: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Create athlete response:', responseData);
        return responseData;
    }
}