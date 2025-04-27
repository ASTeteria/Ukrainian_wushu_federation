'use client';

import { useState } from "react";
import styles from "./RegisterForm.module.css";
import { register } from "@/services/api.service";

interface RegisterFormProps {
    onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState<string[]>([]);
    const [error, setError] = useState("");

    const availableRoles = ["ADMIN", "MODERATOR", "USER"];

    const handleRoleChange = (role: string) => {
        if (roles.includes(role)) {
            setRoles(roles.filter((r) => r !== role));
        } else {
            setRoles([...roles, role]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await register({ username, password, roles: roles.length ? roles : ["USER"] });
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Не вдалося зареєструвати користувача");
        }
    };

    return (
        <div className={styles.container}>
            <h3>Реєстрація нового користувача</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Ім'я користувача</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Ролі</label>
                    <div className={styles.checkboxGroup}>
                        {availableRoles.map((role) => (
                            <label key={role} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={roles.includes(role)}
                                    onChange={() => handleRoleChange(role)}
                                />
                                {role}
                            </label>
                        ))}
                    </div>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submitButton}>
                    Зареєструвати
                </button>
            </form>
        </div>
    );
}