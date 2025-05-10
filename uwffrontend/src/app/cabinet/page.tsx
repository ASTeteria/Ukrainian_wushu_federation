// // // // // // // // // // // 'use client';
// // // // // // // // // // //
// // // // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // // // import styles from "./Cabinet.module.css";
// // // // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // // // // // // //
// // // // // // // // // // // export default function Cabinet() {
// // // // // // // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // // // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // // // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // // //     const router = useRouter();
// // // // // // // // // // //
// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         const token = localStorage.getItem("accessToken");
// // // // // // // // // // //         if (!token) {
// // // // // // // // // // //             router.push("/");
// // // // // // // // // // //             return;
// // // // // // // // // // //         }
// // // // // // // // // // //
// // // // // // // // // // //         // Для демонстрації, у реальному проекті потрібно отримати дані користувача з бекенду
// // // // // // // // // // //         const decodedToken = parseJwt(token);
// // // // // // // // // // //         setUser({
// // // // // // // // // // //             username: decodedToken.sub,
// // // // // // // // // // //             roles: decodedToken.roles || [],
// // // // // // // // // // //         });
// // // // // // // // // // //     }, [router]);
// // // // // // // // // // //
// // // // // // // // // // //     const parseJwt = (token: string) => {
// // // // // // // // // // //         try {
// // // // // // // // // // //             const base64Url = token.split(".")[1];
// // // // // // // // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // // // // // // // //             const jsonPayload = decodeURIComponent(
// // // // // // // // // // //                 atob(base64)
// // // // // // // // // // //                     .split("")
// // // // // // // // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // // // // // // // //                     .join("")
// // // // // // // // // // //             );
// // // // // // // // // // //             return JSON.parse(jsonPayload);
// // // // // // // // // // //         } catch (e) {
// // // // // // // // // // //             return {};
// // // // // // // // // // //         }
// // // // // // // // // // //     };
// // // // // // // // // // //
// // // // // // // // // // //     const handleLogout = () => {
// // // // // // // // // // //         localStorage.removeItem("accessToken");
// // // // // // // // // // //         localStorage.removeItem("refreshToken");
// // // // // // // // // // //         router.push("/");
// // // // // // // // // // //     };
// // // // // // // // // // //
// // // // // // // // // // //     const handleRegisterSuccess = () => {
// // // // // // // // // // //         setSuccessMessage("Нового користувача створено");
// // // // // // // // // // //         setShowRegisterForm(false);
// // // // // // // // // // //         setTimeout(() => setSuccessMessage(""), 3000); // Прибрати повідомлення через 3 секунди
// // // // // // // // // // //     };
// // // // // // // // // // //
// // // // // // // // // // //     if (!user) {
// // // // // // // // // // //         return <div>Завантаження...</div>;
// // // // // // // // // // //     }
// // // // // // // // // // //
// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className={styles.container}>
// // // // // // // // // // //             <h1>Особистий кабінет</h1>
// // // // // // // // // // //             <p>Вітаємо, {user.username}!</p>
// // // // // // // // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // // // // // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // // // // // // // //                 <>
// // // // // // // // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // // // // // // // //                     <button
// // // // // // // // // // //                         className={styles.registerButton}
// // // // // // // // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // // // // // // // //                     >
// // // // // // // // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                     {showRegisterForm && (
// // // // // // // // // // //                         <div className={styles.formWrapper}>
// // // // // // // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                 </>
// // // // // // // // // // //             )}
// // // // // // // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // // // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // // // // // // //                 Вийти
// // // // // // // // // // //             </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // }
// // // // // // // // // //
// // // // // // // // // // 'use client';
// // // // // // // // // //
// // // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // // import styles from "./Cabinet.module.css";
// // // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // // import { getAllUsers, updateUser } from "@/services/api.service";
// // // // // // // // // // import { UserDTO } from "@/types/auth";
// // // // // // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // // // // // //
// // // // // // // // // // export default function Cabinet() {
// // // // // // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // // // // // // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // // // // // // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // // // // // // // //     const [editPassword, setEditPassword] = useState("");
// // // // // // // // // //     const [editError, setEditError] = useState("");
// // // // // // // // // //     const router = useRouter();
// // // // // // // // // //
// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         const token = localStorage.getItem("accessToken");
// // // // // // // // // //         if (!token) {
// // // // // // // // // //             router.push("/");
// // // // // // // // // //             return;
// // // // // // // // // //         }
// // // // // // // // // //
// // // // // // // // // //         const decodedToken = parseJwt(token);
// // // // // // // // // //         setUser({
// // // // // // // // // //             username: decodedToken.sub,
// // // // // // // // // //             roles: decodedToken.roles || [],
// // // // // // // // // //         });
// // // // // // // // // //     }, [router]);
// // // // // // // // // //
// // // // // // // // // //     const parseJwt = (token: string) => {
// // // // // // // // // //         try {
// // // // // // // // // //             const base64Url = token.split(".")[1];
// // // // // // // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // // // // // // //             const jsonPayload = decodeURIComponent(
// // // // // // // // // //                 atob(base64)
// // // // // // // // // //                     .split("")
// // // // // // // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // // // // // // //                     .join("")
// // // // // // // // // //             );
// // // // // // // // // //             return JSON.parse(jsonPayload);
// // // // // // // // // //         } catch (e) {
// // // // // // // // // //             return {};
// // // // // // // // // //         }
// // // // // // // // // //     };
// // // // // // // // // //
// // // // // // // // // //     const handleLogout = () => {
// // // // // // // // // //         localStorage.removeItem("accessToken");
// // // // // // // // // //         localStorage.removeItem("refreshToken");
// // // // // // // // // //         router.push("/");
// // // // // // // // // //     };
// // // // // // // // // //
// // // // // // // // // //     const handleRegisterSuccess = () => {
// // // // // // // // // //         setSuccessMessage("Нового користувача створено");
// // // // // // // // // //         setShowRegisterForm(false);
// // // // // // // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // // // //     };
// // // // // // // // // //
// // // // // // // // // //     const handleShowUsers = async () => {
// // // // // // // // // //         if (showUsersTable) {
// // // // // // // // // //             setShowUsersTable(false);
// // // // // // // // // //             return;
// // // // // // // // // //         }
// // // // // // // // // //
// // // // // // // // // //         try {
// // // // // // // // // //             const usersData = await getAllUsers();
// // // // // // // // // //             setUsers(usersData);
// // // // // // // // // //             setShowUsersTable(true);
// // // // // // // // // //         } catch (error: any) {
// // // // // // // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // // // //         }
// // // // // // // // // //     };
// // // // // // // // // //
// // // // // // // // // //     const handleEditUser = (user: UserDTO) => {
// // // // // // // // // //         setEditUser(user);
// // // // // // // // // //         setEditPassword(user.password || "");
// // // // // // // // // //     };
// // // // // // // // // //
// // // // // // // // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // // // // // // // //         e.preventDefault();
// // // // // // // // // //         if (!editUser) return;
// // // // // // // // // //
// // // // // // // // // //         try {
// // // // // // // // // //             const updatedUser = await updateUser(editUser.username, {
// // // // // // // // // //                 username: editUser.username,
// // // // // // // // // //                 password: editPassword,
// // // // // // // // // //             });
// // // // // // // // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // // // // // // // //             setEditUser(null);
// // // // // // // // // //             setSuccessMessage("Користувача оновлено");
// // // // // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // // // //         } catch (error: any) {
// // // // // // // // // //             setEditError(error.message || "Не вдалося оновити користувача");
// // // // // // // // // //         }
// // // // // // // // // //     };
// // // // // // // // // //
// // // // // // // // // //     if (!user) {
// // // // // // // // // //         return <div>Завантаження...</div>;
// // // // // // // // // //     }
// // // // // // // // // //
// // // // // // // // // //     return (
// // // // // // // // // //         <div className={styles.container}>
// // // // // // // // // //             <h1>Особистий кабінет</h1>
// // // // // // // // // //             <p>Вітаємо, {user.username}!</p>
// // // // // // // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // // // // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // // // // // // //                 <>
// // // // // // // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // // // // // // //                     <button
// // // // // // // // // //                         className={styles.registerButton}
// // // // // // // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // // // // // // //                     >
// // // // // // // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // // // // // // //                     </button>
// // // // // // // // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // // // // // // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // // // // // // // //                     </button>
// // // // // // // // // //                     {showRegisterForm && (
// // // // // // // // // //                         <div className={styles.formWrapper}>
// // // // // // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}
// // // // // // // // // //                     {showUsersTable && (
// // // // // // // // // //                         <table className={styles.usersTable}>
// // // // // // // // // //                             <thead>
// // // // // // // // // //                             <tr>
// // // // // // // // // //                                 <th>Ім'я користувача</th>
// // // // // // // // // //                                 <th>Ролі</th>
// // // // // // // // // //                                 <th>Дії</th>
// // // // // // // // // //                             </tr>
// // // // // // // // // //                             </thead>
// // // // // // // // // //                             <tbody>
// // // // // // // // // //                             {users.map((u) => (
// // // // // // // // // //                                 <tr key={u.username}>
// // // // // // // // // //                                     <td>{u.username}</td>
// // // // // // // // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // // // // // // // //                                     <td>
// // // // // // // // // //                                         <button
// // // // // // // // // //                                             className={styles.editButton}
// // // // // // // // // //                                             onClick={() => handleEditUser(u)}
// // // // // // // // // //                                         >
// // // // // // // // // //                                             Редагувати
// // // // // // // // // //                                         </button>
// // // // // // // // // //                                     </td>
// // // // // // // // // //                                 </tr>
// // // // // // // // // //                             ))}
// // // // // // // // // //                             </tbody>
// // // // // // // // // //                         </table>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </>
// // // // // // // // // //             )}
// // // // // // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // // // // // //             {editUser && (
// // // // // // // // // //                 <div className={styles.formWrapper}>
// // // // // // // // // //                     <div className={styles.editFormContainer}>
// // // // // // // // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // // // // // // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // // // // // // // //                             <div className={styles.inputGroup}>
// // // // // // // // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // // // // // // // //                                 <input
// // // // // // // // // //                                     type="password"
// // // // // // // // // //                                     id="editPassword"
// // // // // // // // // //                                     value={editPassword}
// // // // // // // // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // // // // // // // //                                     required
// // // // // // // // // //                                 />
// // // // // // // // // //                             </div>
// // // // // // // // // //                             {editError && <p className={styles.error}>{editError}</p>}
// // // // // // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // // // // // //                                 Зберегти
// // // // // // // // // //                             </button>
// // // // // // // // // //                             <button
// // // // // // // // // //                                 type="button"
// // // // // // // // // //                                 className={styles.cancelButton}
// // // // // // // // // //                                 onClick={() => setEditUser(null)}
// // // // // // // // // //                             >
// // // // // // // // // //                                 Скасувати
// // // // // // // // // //                             </button>
// // // // // // // // // //                         </form>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             )}
// // // // // // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // // // // // //                 Вийти
// // // // // // // // // //             </button>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }
// // // // // // // // //
// // // // // // // // // 'use client';
// // // // // // // // //
// // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // import styles from "./Cabinet.module.css";
// // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // import { getAllUsers, updateUser } from "@/services/api.service";
// // // // // // // // // import { UserDTO } from "@/types/auth";
// // // // // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // // // // //
// // // // // // // // // export default function Cabinet() {
// // // // // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // // // // // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // // // // // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // // // // // // //     const [editPassword, setEditPassword] = useState("");
// // // // // // // // //     const [editError, setEditError] = useState("");
// // // // // // // // //     const router = useRouter();
// // // // // // // // //
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const token = localStorage.getItem("accessToken");
// // // // // // // // //         if (!token) {
// // // // // // // // //             router.push("/");
// // // // // // // // //             return;
// // // // // // // // //         }
// // // // // // // // //
// // // // // // // // //         const decodedToken = parseJwt(token);
// // // // // // // // //         setUser({
// // // // // // // // //             username: decodedToken.sub,
// // // // // // // // //             roles: decodedToken.roles || [],
// // // // // // // // //         });
// // // // // // // // //     }, [router]);
// // // // // // // // //
// // // // // // // // //     const parseJwt = (token: string) => {
// // // // // // // // //         try {
// // // // // // // // //             const base64Url = token.split(".")[1];
// // // // // // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // // // // // //             const jsonPayload = decodeURIComponent(
// // // // // // // // //                 atob(base64)
// // // // // // // // //                     .split("")
// // // // // // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // // // // // //                     .join("")
// // // // // // // // //             );
// // // // // // // // //             return JSON.parse(jsonPayload);
// // // // // // // // //         } catch (e) {
// // // // // // // // //             return {};
// // // // // // // // //         }
// // // // // // // // //     };
// // // // // // // // //
// // // // // // // // //     const handleLogout = () => {
// // // // // // // // //         localStorage.removeItem("accessToken");
// // // // // // // // //         localStorage.removeItem("refreshToken");
// // // // // // // // //         router.push("/");
// // // // // // // // //     };
// // // // // // // // //
// // // // // // // // //     const handleRegisterSuccess = () => {
// // // // // // // // //         setSuccessMessage("Нового користувача створено");
// // // // // // // // //         setShowRegisterForm(false);
// // // // // // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // // //     };
// // // // // // // // //
// // // // // // // // //     const handleShowUsers = async () => {
// // // // // // // // //         if (showUsersTable) {
// // // // // // // // //             setShowUsersTable(false);
// // // // // // // // //             return;
// // // // // // // // //         }
// // // // // // // // //
// // // // // // // // //         try {
// // // // // // // // //             const usersData = await getAllUsers();
// // // // // // // // //             console.log("Fetched users:", usersData);
// // // // // // // // //             setUsers(usersData);
// // // // // // // // //             setShowUsersTable(true);
// // // // // // // // //         } catch (error: any) {
// // // // // // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // // //         }
// // // // // // // // //     };
// // // // // // // // //
// // // // // // // // //     const handleEditUser = (user: UserDTO) => {
// // // // // // // // //         setEditUser(user);
// // // // // // // // //         setEditPassword("");
// // // // // // // // //     };
// // // // // // // // //
// // // // // // // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // // // // // // //         e.preventDefault();
// // // // // // // // //         if (!editUser) return;
// // // // // // // // //
// // // // // // // // //         try {
// // // // // // // // //             const updatedUser = await updateUser(editUser.username, {
// // // // // // // // //                 username: editUser.username,
// // // // // // // // //                 password: editPassword,
// // // // // // // // //             });
// // // // // // // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // // // // // // //             setEditUser(null);
// // // // // // // // //             setSuccessMessage("Користувача оновлено");
// // // // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // // //         } catch (error: any) {
// // // // // // // // //             const message = error.message.includes("Користувача не знайдено")
// // // // // // // // //                 ? "Користувача не знайдено"
// // // // // // // // //                 : error.message || "Не вдалося оновити користувача";
// // // // // // // // //             setEditError(message);
// // // // // // // // //         }
// // // // // // // // //     };
// // // // // // // // //
// // // // // // // // //     if (!user) {
// // // // // // // // //         return <div>Завантаження...</div>;
// // // // // // // // //     }
// // // // // // // // //
// // // // // // // // //     return (
// // // // // // // // //         <div className={styles.container}>
// // // // // // // // //             <h1>Особистий кабінет</h1>
// // // // // // // // //             <p>Вітаємо, {user.username}!</p>
// // // // // // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // // // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // // // // // //                 <>
// // // // // // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // // // // // //                     <button
// // // // // // // // //                         className={styles.registerButton}
// // // // // // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // // // // // //                     >
// // // // // // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // // // // // //                     </button>
// // // // // // // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // // // // // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // // // // // // //                     </button>
// // // // // // // // //                     {showRegisterForm && (
// // // // // // // // //                         <div className={styles.formWrapper}>
// // // // // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // // // // //                         </div>
// // // // // // // // //                     )}
// // // // // // // // //                     {showUsersTable && (
// // // // // // // // //                         <table className={styles.usersTable}>
// // // // // // // // //                             <thead>
// // // // // // // // //                             <tr>
// // // // // // // // //                                 <th>Ім'я користувача</th>
// // // // // // // // //                                 <th>Ролі</th>
// // // // // // // // //                                 <th>Дії</th>
// // // // // // // // //                             </tr>
// // // // // // // // //                             </thead>
// // // // // // // // //                             <tbody>
// // // // // // // // //                             {users.map((u) => (
// // // // // // // // //                                 <tr key={u.username}>
// // // // // // // // //                                     <td>{u.username}</td>
// // // // // // // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // // // // // // //                                     <td>
// // // // // // // // //                                         <button
// // // // // // // // //                                             className={styles.editButton}
// // // // // // // // //                                             onClick={() => handleEditUser(u)}
// // // // // // // // //                                         >
// // // // // // // // //                                             Редагувати
// // // // // // // // //                                         </button>
// // // // // // // // //                                     </td>
// // // // // // // // //                                 </tr>
// // // // // // // // //                             ))}
// // // // // // // // //                             </tbody>
// // // // // // // // //                         </table>
// // // // // // // // //                     )}
// // // // // // // // //                 </>
// // // // // // // // //             )}
// // // // // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // // // // //             {editUser && (
// // // // // // // // //                 <div className={styles.formWrapper}>
// // // // // // // // //                     <div className={styles.editFormContainer}>
// // // // // // // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // // // // // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // // // // // // //                             <div className={styles.inputGroup}>
// // // // // // // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // // // // // // //                                 <input
// // // // // // // // //                                     type="password"
// // // // // // // // //                                     id="editPassword"
// // // // // // // // //                                     value={editPassword}
// // // // // // // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // // // // // // //                                     required
// // // // // // // // //                                 />
// // // // // // // // //                             </div>
// // // // // // // // //                             {editError && <p className={styles.error}>{editError}</p>}
// // // // // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // // // // //                                 Зберегти
// // // // // // // // //                             </button>
// // // // // // // // //                             <button
// // // // // // // // //                                 type="button"
// // // // // // // // //                                 className={styles.cancelButton}
// // // // // // // // //                                 onClick={() => setEditUser(null)}
// // // // // // // // //                             >
// // // // // // // // //                                 Скасувати
// // // // // // // // //                             </button>
// // // // // // // // //                         </form>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}
// // // // // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // // // // //                 Вийти
// // // // // // // // //             </button>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }
// // // // // // // //
// // // // // // // //
// // // // // // // // 'use client';
// // // // // // // //
// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import styles from "./Cabinet.module.css";
// // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // import { getAllUsers, updateUser } from "@/services/api.service";
// // // // // // // // import { UserDTO } from "@/types/auth";
// // // // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // // // //
// // // // // // // // export default function Cabinet() {
// // // // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // // // // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // // // // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // // // // // //     const [editPassword, setEditPassword] = useState("");
// // // // // // // //     const [editError, setEditError] = useState("");
// // // // // // // //     const router = useRouter();
// // // // // // // //
// // // // // // // //     useEffect(() => {
// // // // // // // //         const token = localStorage.getItem("accessToken");
// // // // // // // //         if (!token) {
// // // // // // // //             router.push("/");
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //
// // // // // // // //         const decodedToken = parseJwt(token);
// // // // // // // //         setUser({
// // // // // // // //             username: decodedToken.sub,
// // // // // // // //             roles: decodedToken.roles || [],
// // // // // // // //         });
// // // // // // // //     }, [router]);
// // // // // // // //
// // // // // // // //     const parseJwt = (token: string) => {
// // // // // // // //         try {
// // // // // // // //             const base64Url = token.split(".")[1];
// // // // // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // // // // //             const jsonPayload = decodeURIComponent(
// // // // // // // //                 atob(base64)
// // // // // // // //                     .split("")
// // // // // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // // // // //                     .join("")
// // // // // // // //             );
// // // // // // // //             return JSON.parse(jsonPayload);
// // // // // // // //         } catch (e) {
// // // // // // // //             return {};
// // // // // // // //         }
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleLogout = () => {
// // // // // // // //         localStorage.removeItem("accessToken");
// // // // // // // //         localStorage.removeItem("refreshToken");
// // // // // // // //         router.push("/");
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleRegisterSuccess = () => {
// // // // // // // //         setSuccessMessage("Нового користувача створено");
// // // // // // // //         setShowRegisterForm(false);
// // // // // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleShowUsers = async () => {
// // // // // // // //         if (showUsersTable) {
// // // // // // // //             setShowUsersTable(false);
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //
// // // // // // // //         try {
// // // // // // // //             const usersData = await getAllUsers();
// // // // // // // //             console.log("Fetched users:", usersData);
// // // // // // // //             setUsers(usersData);
// // // // // // // //             setShowUsersTable(true);
// // // // // // // //         } catch (error: any) {
// // // // // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // //         }
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleEditUser = (user: UserDTO) => {
// // // // // // // //         setEditUser(user);
// // // // // // // //         setEditPassword("");
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         if (!editUser) return;
// // // // // // // //
// // // // // // // //         try {
// // // // // // // //             const updatedUser = await updateUser(editUser.username, {
// // // // // // // //                 username: editUser.username,
// // // // // // // //                 password: editPassword,
// // // // // // // //             });
// // // // // // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // // // // // //             setEditUser(null);
// // // // // // // //             setSuccessMessage("Користувача оновлено");
// // // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // // //         } catch (error: any) {
// // // // // // // //             const message = error.message.includes("Користувача не знайдено")
// // // // // // // //                 ? "Користувача не знайдено"
// // // // // // // //                 : error.message || "Не вдалося оновити користувача";
// // // // // // // //             setEditError(message);
// // // // // // // //         }
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleAddAthlete = () => {
// // // // // // // //         console.log("Додати атлета до бази");
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleNonContactApplication = () => {
// // // // // // // //         console.log("Заповнити заявку (не контактні види)");
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     const handleContactApplication = () => {
// // // // // // // //         console.log("Заповнити заявку (контактні види)");
// // // // // // // //     };
// // // // // // // //
// // // // // // // //     if (!user) {
// // // // // // // //         return <div>Завантаження...</div>;
// // // // // // // //     }
// // // // // // // //
// // // // // // // //     return (
// // // // // // // //         <div className={styles.container}>
// // // // // // // //             <h1>Особистий кабінет</h1>
// // // // // // // //             <p>Вітаємо, {user.username}!</p>
// // // // // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // // // // //                 <>
// // // // // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // // // // //                     <button
// // // // // // // //                         className={styles.registerButton}
// // // // // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // // // // //                     >
// // // // // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // // // // //                     </button>
// // // // // // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // // // // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // // // // // //                     </button>
// // // // // // // //                     {showRegisterForm && (
// // // // // // // //                         <div className={styles.formWrapper}>
// // // // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // // // //                         </div>
// // // // // // // //                     )}
// // // // // // // //                     {showUsersTable && (
// // // // // // // //                         <table className={styles.usersTable}>
// // // // // // // //                             <thead>
// // // // // // // //                             <tr>
// // // // // // // //                                 <th>Ім'я користувача</th>
// // // // // // // //                                 <th>Ролі</th>
// // // // // // // //                                 <th>Дії</th>
// // // // // // // //                             </tr>
// // // // // // // //                             </thead>
// // // // // // // //                             <tbody>
// // // // // // // //                             {users.map((u) => (
// // // // // // // //                                 <tr key={u.username}>
// // // // // // // //                                     <td>{u.username}</td>
// // // // // // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // // // // // //                                     <td>
// // // // // // // //                                         <button
// // // // // // // //                                             className={styles.editButton}
// // // // // // // //                                             onClick={() => handleEditUser(u)}
// // // // // // // //                                         >
// // // // // // // //                                             Редагувати
// // // // // // // //                                         </button>
// // // // // // // //                                     </td>
// // // // // // // //                                 </tr>
// // // // // // // //                             ))}
// // // // // // // //                             </tbody>
// // // // // // // //                         </table>
// // // // // // // //                     )}
// // // // // // // //                 </>
// // // // // // // //             )}
// // // // // // // //             {user.roles.includes("ROLE_USER") && (
// // // // // // // //                 <>
// // // // // // // //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // // // // // // //                         Додати атлета до бази
// // // // // // // //                     </button>
// // // // // // // //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // // // // // // //                         Заповнити заявку (не контактні види)
// // // // // // // //                     </button>
// // // // // // // //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// // // // // // // //                         Заповнити заявку (контактні види)
// // // // // // // //                     </button>
// // // // // // // //                 </>
// // // // // // // //             )}
// // // // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // // // //             {editUser && (
// // // // // // // //                 <div className={styles.formWrapper}>
// // // // // // // //                     <div className={styles.editFormContainer}>
// // // // // // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // // // // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // // // // // //                             <div className={styles.inputGroup}>
// // // // // // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // // // // // //                                 <input
// // // // // // // //                                     type="password"
// // // // // // // //                                     id="editPassword"
// // // // // // // //                                     value={editPassword}
// // // // // // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // // // // // //                                     required
// // // // // // // //                                 />
// // // // // // // //                             </div>
// // // // // // // //                             {editError && <p className={styles.error}>{editError}</p>}
// // // // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // // // //                                 Зберегти
// // // // // // // //                             </button>
// // // // // // // //                             <button
// // // // // // // //                                 type="button"
// // // // // // // //                                 className={styles.cancelButton}
// // // // // // // //                                 onClick={() => setEditUser(null)}
// // // // // // // //                             >
// // // // // // // //                                 Скасувати
// // // // // // // //                             </button>
// // // // // // // //                         </form>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}
// // // // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // // // //                 Вийти
// // // // // // // //             </button>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }
// // // // // // //
// // // // // // //
// // // // // // //
// // // // // // // 'use client';
// // // // // // //
// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import styles from "./Cabinet.module.css";
// // // // // // // import { useRouter } from "next/navigation";
// // // // // // // import { getAllUsers, updateUser, createAthlete } from "@/services/api.service";
// // // // // // // import { UserDTO, AthleteDTO } from "@/types/auth";
// // // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // // //
// // // // // // // export default function Cabinet() {
// // // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // // // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // // // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // // // // //     const [editPassword, setEditPassword] = useState("");
// // // // // // //     const [editError, setEditError] = useState("");
// // // // // // //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// // // // // // //     const [athleteCount, setAthleteCount] = useState(1);
// // // // // // //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// // // // // // //     const [athleteError, setAthleteError] = useState("");
// // // // // // //     const router = useRouter();
// // // // // // //
// // // // // // //     useEffect(() => {
// // // // // // //         const token = localStorage.getItem("accessToken");
// // // // // // //         if (!token) {
// // // // // // //             router.push("/");
// // // // // // //             return;
// // // // // // //         }
// // // // // // //
// // // // // // //         const decodedToken = parseJwt(token);
// // // // // // //         setUser({
// // // // // // //             username: decodedToken.sub,
// // // // // // //             roles: decodedToken.roles || [],
// // // // // // //         });
// // // // // // //     }, [router]);
// // // // // // //
// // // // // // //     const parseJwt = (token: string) => {
// // // // // // //         try {
// // // // // // //             const base64Url = token.split(".")[1];
// // // // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // // // //             const jsonPayload = decodeURIComponent(
// // // // // // //                 atob(base64)
// // // // // // //                     .split("")
// // // // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // // // //                     .join("")
// // // // // // //             );
// // // // // // //             return JSON.parse(jsonPayload);
// // // // // // //         } catch (e) {
// // // // // // //             return {};
// // // // // // //         }
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleLogout = () => {
// // // // // // //         localStorage.removeItem("accessToken");
// // // // // // //         localStorage.removeItem("refreshToken");
// // // // // // //         router.push("/");
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleRegisterSuccess = () => {
// // // // // // //         setSuccessMessage("Нового користувача створено");
// // // // // // //         setShowRegisterForm(false);
// // // // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleShowUsers = async () => {
// // // // // // //         if (showUsersTable) {
// // // // // // //             setShowUsersTable(false);
// // // // // // //             return;
// // // // // // //         }
// // // // // // //
// // // // // // //         try {
// // // // // // //             const usersData = await getAllUsers();
// // // // // // //             console.log("Fetched users:", usersData);
// // // // // // //             setUsers(usersData);
// // // // // // //             setShowUsersTable(true);
// // // // // // //         } catch (error: any) {
// // // // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // //         }
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleEditUser = (user: UserDTO) => {
// // // // // // //         setEditUser(user);
// // // // // // //         setEditPassword("");
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!editUser) return;
// // // // // // //
// // // // // // //         try {
// // // // // // //             const updatedUser = await updateUser(editUser.username, {
// // // // // // //                 username: editUser.username,
// // // // // // //                 password: editPassword,
// // // // // // //             });
// // // // // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // // // // //             setEditUser(null);
// // // // // // //             setSuccessMessage("Користувача оновлено");
// // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // //         } catch (error: any) {
// // // // // // //             const message = error.message.includes("Користувача не знайдено")
// // // // // // //                 ? "Користувача не знайдено"
// // // // // // //                 : error.message || "Не вдалося оновити користувача";
// // // // // // //             setEditError(message);
// // // // // // //         }
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleAddAthlete = () => {
// // // // // // //         setShowAthleteForm(true);
// // // // // // //         setAthleteCount(1);
// // // // // // //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const count = parseInt(e.target.value) || 1;
// // // // // // //         setAthleteCount(Math.max(1, count));
// // // // // // //         setAthletes(
// // // // // // //             Array(count)
// // // // // // //                 .fill(null)
// // // // // // //                 .map((_, i) =>
// // // // // // //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// // // // // // //                 )
// // // // // // //         );
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// // // // // // //         const newAthletes = [...athletes];
// // // // // // //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// // // // // // //         setAthletes(newAthletes);
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleAddAthletes = async (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         setAthleteError("");
// // // // // // //
// // // // // // //         try {
// // // // // // //             for (const athlete of athletes) {
// // // // // // //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// // // // // // //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// // // // // // //                 }
// // // // // // //                 await createAthlete(athlete);
// // // // // // //             }
// // // // // // //             setSuccessMessage("Атлетів додано");
// // // // // // //             setShowAthleteForm(false);
// // // // // // //             setAthleteCount(1);
// // // // // // //             setAthletes([]);
// // // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // // //         } catch (error: any) {
// // // // // // //             setAthleteError(error.message || "Не вдалося додати атлетів");
// // // // // // //         }
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleNonContactApplication = () => {
// // // // // // //         console.log("Заповнити заявку (не контактні види)");
// // // // // // //     };
// // // // // // //
// // // // // // //     const handleContactApplication = () => {
// // // // // // //         console.log("Заповнити заявку (контактні види)");
// // // // // // //     };
// // // // // // //
// // // // // // //     if (!user) {
// // // // // // //         return <div>Завантаження...</div>;
// // // // // // //     }
// // // // // // //
// // // // // // //     return (
// // // // // // //         <div className={styles.container}>
// // // // // // //             <h1>Особистий кабінет</h1>
// // // // // // //             <p>Вітаємо, {user.username}!</p>
// // // // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // // // //                 <>
// // // // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // // // //                     <button
// // // // // // //                         className={styles.registerButton}
// // // // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // // // //                     >
// // // // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // // // //                     </button>
// // // // // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // // // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // // // // //                     </button>
// // // // // // //                     {showRegisterForm && (
// // // // // // //                         <div className={styles.formWrapper}>
// // // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // // //                         </div>
// // // // // // //                     )}
// // // // // // //                     {showUsersTable && (
// // // // // // //                         <table className={styles.usersTable}>
// // // // // // //                             <thead>
// // // // // // //                             <tr>
// // // // // // //                                 <th>Ім'я користувача</th>
// // // // // // //                                 <th>Ролі</th>
// // // // // // //                                 <th>Дії</th>
// // // // // // //                             </tr>
// // // // // // //                             </thead>
// // // // // // //                             <tbody>
// // // // // // //                             {users.map((u) => (
// // // // // // //                                 <tr key={u.username}>
// // // // // // //                                     <td>{u.username}</td>
// // // // // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // // // // //                                     <td>
// // // // // // //                                         <button
// // // // // // //                                             className={styles.editButton}
// // // // // // //                                             onClick={() => handleEditUser(u)}
// // // // // // //                                         >
// // // // // // //                                             Редагувати
// // // // // // //                                         </button>
// // // // // // //                                     </td>
// // // // // // //                                 </tr>
// // // // // // //                             ))}
// // // // // // //                             </tbody>
// // // // // // //                         </table>
// // // // // // //                     )}
// // // // // // //                 </>
// // // // // // //             )}
// // // // // // //             {user.roles.includes("ROLE_USER") && (
// // // // // // //                 <>
// // // // // // //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // // // // // //                         Додати атлета до бази
// // // // // // //                     </button>
// // // // // // //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // // // // // //                         Заповнити заявку (не контактні види)
// // // // // // //                     </button>
// // // // // // //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// // // // // // //                         Заповнити заявку (контактні види)
// // // // // // //                     </button>
// // // // // // //                 </>
// // // // // // //             )}
// // // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // // //             {editUser && (
// // // // // // //                 <div className={styles.formWrapper}>
// // // // // // //                     <div className={styles.editFormContainer}>
// // // // // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // // // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // // // // //                             <div className={styles.inputGroup}>
// // // // // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // // // // //                                 <input
// // // // // // //                                     type="password"
// // // // // // //                                     id="editPassword"
// // // // // // //                                     value={editPassword}
// // // // // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // // // // //                                     required
// // // // // // //                                 />
// // // // // // //                             </div>
// // // // // // //                             {editError && <p className={styles.error}>{editError}</p>}
// // // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // // //                                 Зберегти
// // // // // // //                             </button>
// // // // // // //                             <button
// // // // // // //                                 type="button"
// // // // // // //                                 className={styles.cancelButton}
// // // // // // //                                 onClick={() => setEditUser(null)}
// // // // // // //                             >
// // // // // // //                                 Скасувати
// // // // // // //                             </button>
// // // // // // //                         </form>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}
// // // // // // //             {showAthleteForm && (
// // // // // // //                 <div className={styles.formWrapper}>
// // // // // // //                     <div className={styles.athleteFormContainer}>
// // // // // // //                         <h3>Додати атлетів</h3>
// // // // // // //                         <div className={styles.inputGroup}>
// // // // // // //                             <label htmlFor="athleteCount">Кількість атлетів</label>
// // // // // // //                             <input
// // // // // // //                                 type="number"
// // // // // // //                                 id="athleteCount"
// // // // // // //                                 min="1"
// // // // // // //                                 value={athleteCount}
// // // // // // //                                 onChange={handleAthleteCountChange}
// // // // // // //                                 className={styles.countInput}
// // // // // // //                             />
// // // // // // //                         </div>
// // // // // // //                         <form onSubmit={handleAddAthletes}>
// // // // // // //                             <table className={styles.athleteTable}>
// // // // // // //                                 <thead>
// // // // // // //                                 <tr>
// // // // // // //                                     <th>Ім'я</th>
// // // // // // //                                     <th>Прізвище</th>
// // // // // // //                                     <th>Дата народження</th>
// // // // // // //                                     <th>Тип програми</th>
// // // // // // //                                 </tr>
// // // // // // //                                 </thead>
// // // // // // //                                 <tbody>
// // // // // // //                                 {athletes.map((athlete, index) => (
// // // // // // //                                     <tr key={index}>
// // // // // // //                                         <td>
// // // // // // //                                             <input
// // // // // // //                                                 type="text"
// // // // // // //                                                 value={athlete.firstName}
// // // // // // //                                                 onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// // // // // // //                                                 required
// // // // // // //                                             />
// // // // // // //                                         </td>
// // // // // // //                                         <td>
// // // // // // //                                             <input
// // // // // // //                                                 type="text"
// // // // // // //                                                 value={athlete.lastName}
// // // // // // //                                                 onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// // // // // // //                                                 required
// // // // // // //                                             />
// // // // // // //                                         </td>
// // // // // // //                                         <td>
// // // // // // //                                             <input
// // // // // // //                                                 type="date"
// // // // // // //                                                 value={athlete.birthDate}
// // // // // // //                                                 onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// // // // // // //                                                 required
// // // // // // //                                             />
// // // // // // //                                         </td>
// // // // // // //                                         <td>
// // // // // // //                                             <select
// // // // // // //                                                 value={athlete.programType}
// // // // // // //                                                 onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// // // // // // //                                                 required
// // // // // // //                                             >
// // // // // // //                                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // // // // //                                                 <option value="CONTACT">Контактні види</option>
// // // // // // //                                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // // // // //                                             </select>
// // // // // // //                                         </td>
// // // // // // //                                     </tr>
// // // // // // //                                 ))}
// // // // // // //                                 </tbody>
// // // // // // //                             </table>
// // // // // // //                             {athleteError && <p className={styles.error}>{athleteError}</p>}
// // // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // // //                                 Додати атлетів
// // // // // // //                             </button>
// // // // // // //                             <button
// // // // // // //                                 type="button"
// // // // // // //                                 className={styles.cancelButton}
// // // // // // //                                 onClick={() => setShowAthleteForm(false)}
// // // // // // //                             >
// // // // // // //                                 Скасувати
// // // // // // //                             </button>
// // // // // // //                         </form>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}
// // // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // // //                 Вийти
// // // // // // //             </button>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }
// // // // // //
// // // // // //
// // // // // // 'use client';
// // // // // //
// // // // // // import { useEffect, useState } from "react";
// // // // // // import styles from "./Cabinet.module.css";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete } from "@/services/api.service";
// // // // // // import { UserDTO, AthleteDTO } from "@/types/auth";
// // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // //
// // // // // // export default function Cabinet() {
// // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // // // //     const [editPassword, setEditPassword] = useState("");
// // // // // //     const [editUserError, setEditUserError] = useState("");
// // // // // //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// // // // // //     const [athleteCount, setAthleteCount] = useState(1);
// // // // // //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// // // // // //     const [athleteError, setAthleteError] = useState("");
// // // // // //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// // // // // //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// // // // // //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// // // // // //     const [editAthleteError, setEditAthleteError] = useState("");
// // // // // //     const router = useRouter();
// // // // // //
// // // // // //     useEffect(() => {
// // // // // //         const token = localStorage.getItem("accessToken");
// // // // // //         if (!token) {
// // // // // //             router.push("/");
// // // // // //             return;
// // // // // //         }
// // // // // //
// // // // // //         const decodedToken = parseJwt(token);
// // // // // //         setUser({
// // // // // //             username: decodedToken.sub,
// // // // // //             roles: decodedToken.roles || [],
// // // // // //         });
// // // // // //     }, [router]);
// // // // // //
// // // // // //     const parseJwt = (token: string) => {
// // // // // //         try {
// // // // // //             const base64Url = token.split(".")[1];
// // // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // // //             const jsonPayload = decodeURIComponent(
// // // // // //                 atob(base64)
// // // // // //                     .split("")
// // // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // // //                     .join("")
// // // // // //             );
// // // // // //             return JSON.parse(jsonPayload);
// // // // // //         } catch (e) {
// // // // // //             return {};
// // // // // //         }
// // // // // //     };
// // // // // //
// // // // // //     const handleLogout = () => {
// // // // // //         localStorage.removeItem("accessToken");
// // // // // //         localStorage.removeItem("refreshToken");
// // // // // //         router.push("/");
// // // // // //     };
// // // // // //
// // // // // //     const handleRegisterSuccess = () => {
// // // // // //         setSuccessMessage("Нового користувача створено");
// // // // // //         setShowRegisterForm(false);
// // // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //     };
// // // // // //
// // // // // //     const handleShowUsers = async () => {
// // // // // //         if (showUsersTable) {
// // // // // //             setShowUsersTable(false);
// // // // // //             return;
// // // // // //         }
// // // // // //
// // // // // //         try {
// // // // // //             const usersData = await getAllUsers();
// // // // // //             console.log("Fetched users:", usersData);
// // // // // //             setUsers(usersData);
// // // // // //             setShowUsersTable(true);
// // // // // //         } catch (error: any) {
// // // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //         }
// // // // // //     };
// // // // // //
// // // // // //     const handleEditUser = (user: UserDTO) => {
// // // // // //         setEditUser(user);
// // // // // //         setEditPassword("");
// // // // // //     };
// // // // // //
// // // // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!editUser) return;
// // // // // //
// // // // // //         try {
// // // // // //             const updatedUser = await updateUser(editUser.username, {
// // // // // //                 username: editUser.username,
// // // // // //                 password: editPassword,
// // // // // //             });
// // // // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // // // //             setEditUser(null);
// // // // // //             setSuccessMessage("Користувача оновлено");
// // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //         } catch (error: any) {
// // // // // //             const message = error.message.includes("Користувача не знайдено")
// // // // // //                 ? "Користувача не знайдено"
// // // // // //                 : error.message || "Не вдалося оновити користувача";
// // // // // //             setEditUserError(message);
// // // // // //         }
// // // // // //     };
// // // // // //
// // // // // //     const handleAddAthlete = () => {
// // // // // //         setShowAthleteForm(true);
// // // // // //         setAthleteCount(1);
// // // // // //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// // // // // //     };
// // // // // //
// // // // // //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const count = parseInt(e.target.value) || 1;
// // // // // //         setAthleteCount(Math.max(1, count));
// // // // // //         setAthletes(
// // // // // //             Array(count)
// // // // // //                 .fill(null)
// // // // // //                 .map((_, i) =>
// // // // // //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// // // // // //                 )
// // // // // //         );
// // // // // //     };
// // // // // //
// // // // // //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// // // // // //         const newAthletes = [...athletes];
// // // // // //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// // // // // //         setAthletes(newAthletes);
// // // // // //     };
// // // // // //
// // // // // //     const handleAddAthletes = async (e: React.FormEvent) => {
// // // // // //         e.preventDefault();
// // // // // //         setAthleteError("");
// // // // // //
// // // // // //         try {
// // // // // //             for (const athlete of athletes) {
// // // // // //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// // // // // //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// // // // // //                 }
// // // // // //                 await createAthlete(athlete);
// // // // // //             }
// // // // // //             setSuccessMessage("Атлетів додано");
// // // // // //             setShowAthleteForm(false);
// // // // // //             setAthleteCount(1);
// // // // // //             setAthletes([]);
// // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //         } catch (error: any) {
// // // // // //             setAthleteError(error.message || "Не вдалося додати атлетів");
// // // // // //         }
// // // // // //     };
// // // // // //
// // // // // //     const handleShowMyAthletes = async () => {
// // // // // //         if (showMyAthletes) {
// // // // // //             setShowMyAthletes(false);
// // // // // //             return;
// // // // // //         }
// // // // // //
// // // // // //         try {
// // // // // //             const athletesData = await getMyAthletes();
// // // // // //             console.log("Fetched my athletes:", athletesData);
// // // // // //             setMyAthletes(athletesData);
// // // // // //             setShowMyAthletes(true);
// // // // // //         } catch (error: any) {
// // // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //         }
// // // // // //     };
// // // // // //
// // // // // //     const handleEditAthlete = (athlete: AthleteDTO) => {
// // // // // //         setEditAthlete(athlete);
// // // // // //     };
// // // // // //
// // // // // //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!editAthlete || !editAthlete.id) return;
// // // // // //
// // // // // //         try {
// // // // // //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// // // // // //             setMyAthletes(myAthletes.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a)));
// // // // // //             setEditAthlete(null);
// // // // // //             setSuccessMessage("Дані атлета оновлено");
// // // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //         } catch (error: any) {
// // // // // //             const message = error.message.includes("Athlete not found")
// // // // // //                 ? "Атлета не знайдено"
// // // // // //                 : error.message.includes("Athlete is owned by another user")
// // // // // //                     ? "Ви не можете редагувати цього атлета"
// // // // // //                     : error.message || "Не вдалося оновити атлета";
// // // // // //             setEditAthleteError(message);
// // // // // //         }
// // // // // //     };
// // // // // //
// // // // // //     const handleNonContactApplication = () => {
// // // // // //         console.log("Заповнити заявку (не контактні види)");
// // // // // //     };
// // // // // //
// // // // // //     const handleContactApplication = () => {
// // // // // //         console.log("Заповнити заявку (контактні види)");
// // // // // //     };
// // // // // //
// // // // // //     if (!user) {
// // // // // //         return <div>Завантаження...</div>;
// // // // // //     }
// // // // // //
// // // // // //     return (
// // // // // //         <div className={styles.container}>
// // // // // //             <h1>Особистий кабінет</h1>
// // // // // //             <p>Вітаємо, {user.username}!</p>
// // // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // // //                 <>
// // // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // // //                     <button
// // // // // //                         className={styles.registerButton}
// // // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // // //                     >
// // // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // // //                     </button>
// // // // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // // // //                     </button>
// // // // // //                     {showRegisterForm && (
// // // // // //                         <div className={styles.formWrapper}>
// // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // //                         </div>
// // // // // //                     )}
// // // // // //                     {showUsersTable && (
// // // // // //                         <table className={styles.usersTable}>
// // // // // //                             <thead>
// // // // // //                             <tr>
// // // // // //                                 <th>Ім'я користувача</th>
// // // // // //                                 <th>Ролі</th>
// // // // // //                                 <th>Дії</th>
// // // // // //                             </tr>
// // // // // //                             </thead>
// // // // // //                             <tbody>
// // // // // //                             {users.map((u) => (
// // // // // //                                 <tr key={u.username}>
// // // // // //                                     <td>{u.username}</td>
// // // // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // // // //                                     <td>
// // // // // //                                         <button
// // // // // //                                             className={styles.editButton}
// // // // // //                                             onClick={() => handleEditUser(u)}
// // // // // //                                         >
// // // // // //                                             Редагувати
// // // // // //                                         </button>
// // // // // //                                     </td>
// // // // // //                                 </tr>
// // // // // //                             ))}
// // // // // //                             </tbody>
// // // // // //                         </table>
// // // // // //                     )}
// // // // // //                 </>
// // // // // //             )}
// // // // // //             {user.roles.includes("ROLE_USER") && (
// // // // // //                 <>
// // // // // //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // // // // //                         Додати атлета до бази
// // // // // //                     </button>
// // // // // //                     <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// // // // // //                         {showMyAthletes ? "Приховати моїх атлетів" : "Мої атлети"}
// // // // // //                     </button>
// // // // // //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // // // // //                         Заповнити заявку (не контактні види)
// // // // // //                     </button>
// // // // // //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// // // // // //                         Заповнити заявку (контактні види)
// // // // // //                     </button>
// // // // // //                 </>
// // // // // //             )}
// // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // //             {editUser && (
// // // // // //                 <div className={styles.formWrapper}>
// // // // // //                     <div className={styles.editFormContainer}>
// // // // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // // // //                             <div className={styles.inputGroup}>
// // // // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // // // //                                 <input
// // // // // //                                     type="password"
// // // // // //                                     id="editPassword"
// // // // // //                                     value={editPassword}
// // // // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // // // //                                     required
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                             {editUserError && <p className={styles.error}>{editUserError}</p>}
// // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // //                                 Зберегти
// // // // // //                             </button>
// // // // // //                             <button
// // // // // //                                 type="button"
// // // // // //                                 className={styles.cancelButton}
// // // // // //                                 onClick={() => setEditUser(null)}
// // // // // //                             >
// // // // // //                                 Скасувати
// // // // // //                             </button>
// // // // // //                         </form>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //             {showAthleteForm && (
// // // // // //                 <div className={styles.formWrapper}>
// // // // // //                     <div className={styles.athleteFormContainer}>
// // // // // //                         <h3>Додати атлетів</h3>
// // // // // //                         <div className={styles.inputGroup}>
// // // // // //                             <label htmlFor="athleteCount">Кількість атлетів</label>
// // // // // //                             <input
// // // // // //                                 type="number"
// // // // // //                                 id="athleteCount"
// // // // // //                                 min="1"
// // // // // //                                 value={athleteCount}
// // // // // //                                 onChange={handleAthleteCountChange}
// // // // // //                                 className={styles.countInput}
// // // // // //                             />
// // // // // //                         </div>
// // // // // //                         <form onSubmit={handleAddAthletes}>
// // // // // //                             <table className={styles.athleteTable}>
// // // // // //                                 <thead>
// // // // // //                                 <tr>
// // // // // //                                     <th>Ім'я</th>
// // // // // //                                     <th>Прізвище</th>
// // // // // //                                     <th>Дата народження</th>
// // // // // //                                     <th>Тип програми</th>
// // // // // //                                 </tr>
// // // // // //                                 </thead>
// // // // // //                                 <tbody>
// // // // // //                                 {athletes.map((athlete, index) => (
// // // // // //                                     <tr key={index}>
// // // // // //                                         <td>
// // // // // //                                             <input
// // // // // //                                                 type="text"
// // // // // //                                                 value={athlete.firstName}
// // // // // //                                                 onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// // // // // //                                                 required
// // // // // //                                             />
// // // // // //                                         </td>
// // // // // //                                         <td>
// // // // // //                                             <input
// // // // // //                                                 type="text"
// // // // // //                                                 value={athlete.lastName}
// // // // // //                                                 onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// // // // // //                                                 required
// // // // // //                                             />
// // // // // //                                         </td>
// // // // // //                                         <td>
// // // // // //                                             <input
// // // // // //                                                 type="date"
// // // // // //                                                 value={athlete.birthDate}
// // // // // //                                                 onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// // // // // //                                                 required
// // // // // //                                             />
// // // // // //                                         </td>
// // // // // //                                         <td>
// // // // // //                                             <select
// // // // // //                                                 value={athlete.programType}
// // // // // //                                                 onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// // // // // //                                                 required
// // // // // //                                             >
// // // // // //                                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // // // //                                                 <option value="CONTACT">Контактні види</option>
// // // // // //                                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // // // //                                             </select>
// // // // // //                                         </td>
// // // // // //                                     </tr>
// // // // // //                                 ))}
// // // // // //                                 </tbody>
// // // // // //                             </table>
// // // // // //                             {athleteError && <p className={styles.error}>{athleteError}</p>}
// // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // //                                 Додати атлетів
// // // // // //                             </button>
// // // // // //                             <button
// // // // // //                                 type="button"
// // // // // //                                 className={styles.cancelButton}
// // // // // //                                 onClick={() => setShowAthleteForm(false)}
// // // // // //                             >
// // // // // //                                 Скасувати
// // // // // //                             </button>
// // // // // //                         </form>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //             {showMyAthletes && (
// // // // // //                 <div className={styles.formWrapper}>
// // // // // //                     <div className={styles.athleteFormContainer}>
// // // // // //                         <h3>Мої атлети</h3>
// // // // // //                         <table className={styles.athleteTable}>
// // // // // //                             <thead>
// // // // // //                             <tr>
// // // // // //                                 <th>Ім'я</th>
// // // // // //                                 <th>Прізвище</th>
// // // // // //                                 <th>Дата народження</th>
// // // // // //                                 <th>Тип програми</th>
// // // // // //                                 <th>Дії</th>
// // // // // //                             </tr>
// // // // // //                             </thead>
// // // // // //                             <tbody>
// // // // // //                             {myAthletes.map((athlete) => (
// // // // // //                                 <tr key={athlete.id}>
// // // // // //                                     <td>{athlete.firstName}</td>
// // // // // //                                     <td>{athlete.lastName}</td>
// // // // // //                                     <td>{athlete.birthDate}</td>
// // // // // //                                     <td>
// // // // // //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// // // // // //                                             ? "Традиційне таолу"
// // // // // //                                             : athlete.programType === "CONTACT"
// // // // // //                                                 ? "Контактні види"
// // // // // //                                                 : "Спортивне таолу"}
// // // // // //                                     </td>
// // // // // //                                     <td>
// // // // // //                                         <button
// // // // // //                                             className={styles.editButton}
// // // // // //                                             onClick={() => handleEditAthlete(athlete)}
// // // // // //                                         >
// // // // // //                                             Редагувати
// // // // // //                                         </button>
// // // // // //                                     </td>
// // // // // //                                 </tr>
// // // // // //                             ))}
// // // // // //                             </tbody>
// // // // // //                         </table>
// // // // // //                         <button
// // // // // //                             className={styles.cancelButton}
// // // // // //                             onClick={() => setShowMyAthletes(false)}
// // // // // //                         >
// // // // // //                             Закрити
// // // // // //                         </button>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //             {editAthlete && (
// // // // // //                 <div className={styles.formWrapper}>
// // // // // //                     <div className={styles.editFormContainer}>
// // // // // //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// // // // // //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// // // // // //                             <div className={styles.inputGroup}>
// // // // // //                                 <label htmlFor="editFirstName">Ім'я</label>
// // // // // //                                 <input
// // // // // //                                     type="text"
// // // // // //                                     id="editFirstName"
// // // // // //                                     value={editAthlete.firstName}
// // // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// // // // // //                                     required
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                             <div className={styles.inputGroup}>
// // // // // //                                 <label htmlFor="editLastName">Прізвище</label>
// // // // // //                                 <input
// // // // // //                                     type="text"
// // // // // //                                     id="editLastName"
// // // // // //                                     value={editAthlete.lastName}
// // // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// // // // // //                                     required
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                             <div className={styles.inputGroup}>
// // // // // //                                 <label htmlFor="editBirthDate">Дата народження</label>
// // // // // //                                 <input
// // // // // //                                     type="date"
// // // // // //                                     id="editBirthDate"
// // // // // //                                     value={editAthlete.birthDate}
// // // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// // // // // //                                     required
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                             <div className={styles.inputGroup}>
// // // // // //                                 <label htmlFor="editProgramType">Тип програми</label>
// // // // // //                                 <select
// // // // // //                                     id="editProgramType"
// // // // // //                                     value={editAthlete.programType}
// // // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// // // // // //                                     required
// // // // // //                                 >
// // // // // //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // // // //                                     <option value="CONTACT">Контактні види</option>
// // // // // //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // // // //                                 </select>
// // // // // //                             </div>
// // // // // //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// // // // // //                             <button type="submit" className={styles.submitButton}>
// // // // // //                                 Зберегти
// // // // // //                             </button>
// // // // // //                             <button
// // // // // //                                 type="button"
// // // // // //                                 className={styles.cancelButton}
// // // // // //                                 onClick={() => setEditAthlete(null)}
// // // // // //                             >
// // // // // //                                 Скасувати
// // // // // //                             </button>
// // // // // //                         </form>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // //                 Вийти
// // // // // //             </button>
// // // // // //         </div>
// // // // // //     );
// // // // // // }
// // // // //
// // // // //
// // // // //
// // // // // 'use client';
// // // // //
// // // // // import { useEffect, useState } from "react";
// // // // // import styles from "./Cabinet.module.css";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete } from "@/services/api.service";
// // // // // import { UserDTO, AthleteDTO } from "@/types/auth";
// // // // // import RegisterForm from "@/components/RegisterForm";
// // // // //
// // // // // export default function Cabinet() {
// // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // // //     const [editPassword, setEditPassword] = useState("");
// // // // //     const [editUserError, setEditUserError] = useState("");
// // // // //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// // // // //     const [athleteCount, setAthleteCount] = useState(1);
// // // // //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// // // // //     const [athleteError, setAthleteError] = useState("");
// // // // //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// // // // //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// // // // //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// // // // //     const [editAthleteError, setEditAthleteError] = useState("");
// // // // //     const router = useRouter();
// // // // //
// // // // //     useEffect(() => {
// // // // //         const token = localStorage.getItem("accessToken");
// // // // //         if (!token) {
// // // // //             router.push("/");
// // // // //             return;
// // // // //         }
// // // // //
// // // // //         const decodedToken = parseJwt(token);
// // // // //         setUser({
// // // // //             username: decodedToken.sub,
// // // // //             roles: decodedToken.roles || [],
// // // // //         });
// // // // //     }, [router]);
// // // // //
// // // // //     const parseJwt = (token: string) => {
// // // // //         try {
// // // // //             const base64Url = token.split(".")[1];
// // // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // // //             const jsonPayload = decodeURIComponent(
// // // // //                 atob(base64)
// // // // //                     .split("")
// // // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // // //                     .join("")
// // // // //             );
// // // // //             return JSON.parse(jsonPayload);
// // // // //         } catch (e) {
// // // // //             return {};
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleLogout = () => {
// // // // //         localStorage.removeItem("accessToken");
// // // // //         localStorage.removeItem("refreshToken");
// // // // //         router.push("/");
// // // // //     };
// // // // //
// // // // //     const handleRegisterSuccess = () => {
// // // // //         setSuccessMessage("Нового користувача створено");
// // // // //         setShowRegisterForm(false);
// // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // //     };
// // // // //
// // // // //     const handleShowUsers = async () => {
// // // // //         if (showUsersTable) {
// // // // //             setShowUsersTable(false);
// // // // //             return;
// // // // //         }
// // // // //
// // // // //         try {
// // // // //             const usersData = await getAllUsers();
// // // // //             console.log("Fetched users:", usersData);
// // // // //             setUsers(usersData);
// // // // //             setShowUsersTable(true);
// // // // //         } catch (error: any) {
// // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleEditUser = (user: UserDTO) => {
// // // // //         setEditUser(user);
// // // // //         setEditPassword("");
// // // // //     };
// // // // //
// // // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // // //         e.preventDefault();
// // // // //         if (!editUser) return;
// // // // //
// // // // //         try {
// // // // //             const updatedUser = await updateUser(editUser.username, {
// // // // //                 username: editUser.username,
// // // // //                 password: editPassword,
// // // // //             });
// // // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // // //             setEditUser(null);
// // // // //             setSuccessMessage("Користувача оновлено");
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         } catch (error: any) {
// // // // //             const message = error.message.includes("Користувача не знайдено")
// // // // //                 ? "Користувача не знайдено"
// // // // //                 : error.message || "Не вдалося оновити користувача";
// // // // //             setEditUserError(message);
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleAddAthlete = () => {
// // // // //         setShowAthleteForm(true);
// // // // //         setAthleteCount(1);
// // // // //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// // // // //     };
// // // // //
// // // // //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const count = parseInt(e.target.value) || 1;
// // // // //         setAthleteCount(Math.max(1, count));
// // // // //         setAthletes(
// // // // //             Array(count)
// // // // //                 .fill(null)
// // // // //                 .map((_, i) =>
// // // // //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// // // // //                 )
// // // // //         );
// // // // //     };
// // // // //
// // // // //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// // // // //         const newAthletes = [...athletes];
// // // // //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// // // // //         setAthletes(newAthletes);
// // // // //     };
// // // // //
// // // // //     const handleAddAthletes = async (e: React.FormEvent) => {
// // // // //         e.preventDefault();
// // // // //         setAthleteError("");
// // // // //
// // // // //         try {
// // // // //             for (const athlete of athletes) {
// // // // //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// // // // //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// // // // //                 }
// // // // //                 await createAthlete(athlete);
// // // // //             }
// // // // //             setSuccessMessage("Атлетів додано");
// // // // //             setShowAthleteForm(false);
// // // // //             setAthleteCount(1);
// // // // //             setAthletes([]);
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         } catch (error: any) {
// // // // //             setAthleteError(error.message || "Не вдалося додати атлетів");
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleShowMyAthletes = async () => {
// // // // //         if (showMyAthletes) {
// // // // //             setShowMyAthletes(false);
// // // // //             return;
// // // // //         }
// // // // //
// // // // //         try {
// // // // //             const athletesData = await getMyAthletes();
// // // // //             console.log("Fetched my athletes:", athletesData);
// // // // //             setMyAthletes(athletesData);
// // // // //             setShowMyAthletes(true);
// // // // //         } catch (error: any) {
// // // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleEditAthlete = (athlete: AthleteDTO) => {
// // // // //         setEditAthlete(athlete);
// // // // //     };
// // // // //
// // // // //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// // // // //         e.preventDefault();
// // // // //         if (!editAthlete || !editAthlete.id) return;
// // // // //
// // // // //         try {
// // // // //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// // // // //             setMyAthletes(myAthletes.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a)));
// // // // //             setEditAthlete(null);
// // // // //             setSuccessMessage("Дані атлета оновлено");
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         } catch (error: any) {
// // // // //             const message = error.message.includes("Athlete not found")
// // // // //                 ? "Атлета не знайдено"
// // // // //                 : error.message.includes("Athlete is owned by another user")
// // // // //                     ? "Ви не можете редагувати цього атлета"
// // // // //                     : error.message || "Не вдалося оновити атлета";
// // // // //             setEditAthleteError(message);
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleDeleteAthlete = async (id: number) => {
// // // // //         try {
// // // // //             await deleteAthlete(id);
// // // // //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// // // // //             setSuccessMessage("Атлета видалено");
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         } catch (error: any) {
// // // // //             const message = error.message.includes("Athlete not found")
// // // // //                 ? "Атлета не знайдено"
// // // // //                 : error.message.includes("Athlete is owned by another user")
// // // // //                     ? "Ви не можете видалити цього атлета"
// // // // //                     : error.message || "Не вдалося видалити атлета";
// // // // //             setSuccessMessage(`Помилка: ${message}`);
// // // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // // //         }
// // // // //     };
// // // // //
// // // // //     const handleNonContactApplication = () => {
// // // // //         console.log("Заповнити заявку (не контактні види)");
// // // // //     };
// // // // //
// // // // //     const handleContactApplication = () => {
// // // // //         console.log("Заповнити заявку (контактні види)");
// // // // //     };
// // // // //
// // // // //     if (!user) {
// // // // //         return <div>Завантаження...</div>;
// // // // //     }
// // // // //
// // // // //     return (
// // // // //         <div className={styles.container}>
// // // // //             <h1>Особистий кабінет</h1>
// // // // //             <p>Вітаємо, {user.username}!</p>
// // // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // // //                 <>
// // // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // // //                     <button
// // // // //                         className={styles.registerButton}
// // // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // // //                     >
// // // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // // //                     </button>
// // // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // // //                     </button>
// // // // //                     {showRegisterForm && (
// // // // //                         <div className={styles.formWrapper}>
// // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // //                         </div>
// // // // //                     )}
// // // // //                     {showUsersTable && (
// // // // //                         <table className={styles.usersTable}>
// // // // //                             <thead>
// // // // //                             <tr>
// // // // //                                 <th>Ім'я користувача</th>
// // // // //                                 <th>Ролі</th>
// // // // //                                 <th>Дії</th>
// // // // //                             </tr>
// // // // //                             </thead>
// // // // //                             <tbody>
// // // // //                             {users.map((u) => (
// // // // //                                 <tr key={u.username}>
// // // // //                                     <td>{u.username}</td>
// // // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // // //                                     <td>
// // // // //                                         <button
// // // // //                                             className={styles.editButton}
// // // // //                                             onClick={() => handleEditUser(u)}
// // // // //                                         >
// // // // //                                             Редагувати
// // // // //                                         </button>
// // // // //                                     </td>
// // // // //                                 </tr>
// // // // //                             ))}
// // // // //                             </tbody>
// // // // //                         </table>
// // // // //                     )}
// // // // //                 </>
// // // // //             )}
// // // // //             {user.roles.includes("ROLE_USER") && (
// // // // //                 <>
// // // // //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // // // //                         Додати атлета до бази
// // // // //                     </button>
// // // // //                     <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// // // // //                         {showMyAthletes ? "Приховати моїх атлетів" : "Мої атлети"}
// // // // //                     </button>
// // // // //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // // // //                         Заповнити заявку (не контактні види)
// // // // //                     </button>
// // // // //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// // // // //                         Заповнити заявку (контактні види)
// // // // //                     </button>
// // // // //                 </>
// // // // //             )}
// // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // //             {editUser && (
// // // // //                 <div className={styles.formWrapper}>
// // // // //                     <div className={styles.editFormContainer}>
// // // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // // //                             <div className={styles.inputGroup}>
// // // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // // //                                 <input
// // // // //                                     type="password"
// // // // //                                     id="editPassword"
// // // // //                                     value={editPassword}
// // // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // // //                                     required
// // // // //                                 />
// // // // //                             </div>
// // // // //                             {editUserError && <p className={styles.error}>{editUserError}</p>}
// // // // //                             <button type="submit" className={styles.submitButton}>
// // // // //                                 Зберегти
// // // // //                             </button>
// // // // //                             <button
// // // // //                                 type="button"
// // // // //                                 className={styles.cancelButton}
// // // // //                                 onClick={() => setEditUser(null)}
// // // // //                             >
// // // // //                                 Скасувати
// // // // //                             </button>
// // // // //                         </form>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
// // // // //             {showAthleteForm && (
// // // // //                 <div className={styles.formWrapper}>
// // // // //                     <div className={styles.athleteFormContainer}>
// // // // //                         <h3>Додати атлетів</h3>
// // // // //                         <div className={styles.inputGroup}>
// // // // //                             <label htmlFor="athleteCount">Кількість атлетів</label>
// // // // //                             <input
// // // // //                                 type="number"
// // // // //                                 id="athleteCount"
// // // // //                                 min="1"
// // // // //                                 value={athleteCount}
// // // // //                                 onChange={handleAthleteCountChange}
// // // // //                                 className={styles.countInput}
// // // // //                             />
// // // // //                         </div>
// // // // //                         <form onSubmit={handleAddAthletes}>
// // // // //                             <table className={styles.athleteTable}>
// // // // //                                 <thead>
// // // // //                                 <tr>
// // // // //                                     <th>Ім'я</th>
// // // // //                                     <th>Прізвище</th>
// // // // //                                     <th>Дата народження</th>
// // // // //                                     <th>Тип програми</th>
// // // // //                                 </tr>
// // // // //                                 </thead>
// // // // //                                 <tbody>
// // // // //                                 {athletes.map((athlete, index) => (
// // // // //                                     <tr key={index}>
// // // // //                                         <td>
// // // // //                                             <input
// // // // //                                                 type="text"
// // // // //                                                 value={athlete.firstName}
// // // // //                                                 onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// // // // //                                                 required
// // // // //                                             />
// // // // //                                         </td>
// // // // //                                         <td>
// // // // //                                             <input
// // // // //                                                 type="text"
// // // // //                                                 value={athlete.lastName}
// // // // //                                                 onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// // // // //                                                 required
// // // // //                                             />
// // // // //                                         </td>
// // // // //                                         <td>
// // // // //                                             <input
// // // // //                                                 type="date"
// // // // //                                                 value={athlete.birthDate}
// // // // //                                                 onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// // // // //                                                 required
// // // // //                                             />
// // // // //                                         </td>
// // // // //                                         <td>
// // // // //                                             <select
// // // // //                                                 value={athlete.programType}
// // // // //                                                 onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// // // // //                                                 required
// // // // //                                             >
// // // // //                                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // // //                                                 <option value="CONTACT">Контактні види</option>
// // // // //                                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // // //                                             </select>
// // // // //                                         </td>
// // // // //                                     </tr>
// // // // //                                 ))}
// // // // //                                 </tbody>
// // // // //                             </table>
// // // // //                             {athleteError && <p className={styles.error}>{athleteError}</p>}
// // // // //                             <button type="submit" className={styles.submitButton}>
// // // // //                                 Додати атлетів
// // // // //                             </button>
// // // // //                             <button
// // // // //                                 type="button"
// // // // //                                 className={styles.cancelButton}
// // // // //                                 onClick={() => setShowAthleteForm(false)}
// // // // //                             >
// // // // //                                 Скасувати
// // // // //                             </button>
// // // // //                         </form>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
// // // // //             {showMyAthletes && (
// // // // //                 <div className={styles.formWrapper}>
// // // // //                     <div className={styles.athleteFormContainer}>
// // // // //                         <h3>Мої атлети</h3>
// // // // //                         <table className={styles.athleteTable}>
// // // // //                             <thead>
// // // // //                             <tr>
// // // // //                                 <th>Ім'я</th>
// // // // //                                 <th>Прізвище</th>
// // // // //                                 <th>Дата народження</th>
// // // // //                                 <th>Тип програми</th>
// // // // //                                 <th>Дії</th>
// // // // //                             </tr>
// // // // //                             </thead>
// // // // //                             <tbody>
// // // // //                             {myAthletes.map((athlete) => (
// // // // //                                 <tr key={athlete.id}>
// // // // //                                     <td>{athlete.firstName}</td>
// // // // //                                     <td>{athlete.lastName}</td>
// // // // //                                     <td>{athlete.birthDate}</td>
// // // // //                                     <td>
// // // // //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// // // // //                                             ? "Традиційне таолу"
// // // // //                                             : athlete.programType === "CONTACT"
// // // // //                                                 ? "Контактні види"
// // // // //                                                 : "Спортивне таолу"}
// // // // //                                     </td>
// // // // //                                     <td>
// // // // //                                         <button
// // // // //                                             className={styles.editButton}
// // // // //                                             onClick={() => handleEditAthlete(athlete)}
// // // // //                                         >
// // // // //                                             Редагувати
// // // // //                                         </button>
// // // // //                                         <button
// // // // //                                             className={styles.deleteButton}
// // // // //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// // // // //                                         >
// // // // //                                             Видалити
// // // // //                                         </button>
// // // // //                                     </td>
// // // // //                                 </tr>
// // // // //                             ))}
// // // // //                             </tbody>
// // // // //                         </table>
// // // // //                         <button
// // // // //                             className={styles.cancelButton}
// // // // //                             onClick={() => setShowMyAthletes(false)}
// // // // //                         >
// // // // //                             Закрити
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
// // // // //             {editAthlete && (
// // // // //                 <div className={styles.formWrapper}>
// // // // //                     <div className={styles.editFormContainer}>
// // // // //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// // // // //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// // // // //                             <div className={styles.inputGroup}>
// // // // //                                 <label htmlFor="editFirstName">Ім'я</label>
// // // // //                                 <input
// // // // //                                     type="text"
// // // // //                                     id="editFirstName"
// // // // //                                     value={editAthlete.firstName}
// // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// // // // //                                     required
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <div className={styles.inputGroup}>
// // // // //                                 <label htmlFor="editLastName">Прізвище</label>
// // // // //                                 <input
// // // // //                                     type="text"
// // // // //                                     id="editLastName"
// // // // //                                     value={editAthlete.lastName}
// // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// // // // //                                     required
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <div className={styles.inputGroup}>
// // // // //                                 <label htmlFor="editBirthDate">Дата народження</label>
// // // // //                                 <input
// // // // //                                     type="date"
// // // // //                                     id="editBirthDate"
// // // // //                                     value={editAthlete.birthDate}
// // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// // // // //                                     required
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <div className={styles.inputGroup}>
// // // // //                                 <label htmlFor="editProgramType">Тип програми</label>
// // // // //                                 <select
// // // // //                                     id="editProgramType"
// // // // //                                     value={editAthlete.programType}
// // // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// // // // //                                     required
// // // // //                                 >
// // // // //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // // //                                     <option value="CONTACT">Контактні види</option>
// // // // //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // // //                                 </select>
// // // // //                             </div>
// // // // //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// // // // //                             <button type="submit" className={styles.submitButton}>
// // // // //                                 Зберегти
// // // // //                             </button>
// // // // //                             <button
// // // // //                                 type="button"
// // // // //                                 className={styles.cancelButton}
// // // // //                                 onClick={() => setEditAthlete(null)}
// // // // //                             >
// // // // //                                 Скасувати
// // // // //                             </button>
// // // // //                         </form>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
// // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // //                 Вийти
// // // // //             </button>
// // // // //         </div>
// // // // //     );
// // // // // }
// // // //
// // // //
// // // // 'use client';
// // // //
// // // // import { useEffect, useState } from "react";
// // // // import styles from "./Cabinet.module.css";
// // // // import { useRouter } from "next/navigation";
// // // // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication } from "@/services/api.service";
// // // // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // // // import RegisterForm from "@/components/RegisterForm";
// // // //
// // // // export default function Cabinet() {
// // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // //     const [successMessage, setSuccessMessage] = useState("");
// // // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // // //     const [editPassword, setEditPassword] = useState("");
// // // //     const [editUserError, setEditUserError] = useState("");
// // // //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// // // //     const [athleteCount, setAthleteCount] = useState(1);
// // // //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// // // //     const [athleteError, setAthleteError] = useState("");
// // // //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// // // //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// // // //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// // // //     const [editAthleteError, setEditAthleteError] = useState("");
// // // //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// // // //     const [nonContactCount, setNonContactCount] = useState(1);
// // // //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// // // //     const [nonContactError, setNonContactError] = useState("");
// // // //     const [showMyApplications, setShowMyApplications] = useState(false);
// // // //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// // // //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// // // //     const [editApplicationError, setEditApplicationError] = useState("");
// // // //     const router = useRouter();
// // // //
// // // //     useEffect(() => {
// // // //         const token = localStorage.getItem("accessToken");
// // // //         if (!token) {
// // // //             router.push("/");
// // // //             return;
// // // //         }
// // // //
// // // //         const decodedToken = parseJwt(token);
// // // //         setUser({
// // // //             username: decodedToken.sub,
// // // //             roles: decodedToken.roles || [],
// // // //         });
// // // //     }, [router]);
// // // //
// // // //     const parseJwt = (token: string) => {
// // // //         try {
// // // //             const base64Url = token.split(".")[1];
// // // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // // //             const jsonPayload = decodeURIComponent(
// // // //                 atob(base64)
// // // //                     .split("")
// // // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // // //                     .join("")
// // // //             );
// // // //             return JSON.parse(jsonPayload);
// // // //         } catch (e) {
// // // //             return {};
// // // //         }
// // // //     };
// // // //
// // // //     const handleLogout = () => {
// // // //         localStorage.removeItem("accessToken");
// // // //         localStorage.removeItem("refreshToken");
// // // //         router.push("/");
// // // //     };
// // // //
// // // //     const handleRegisterSuccess = () => {
// // // //         setSuccessMessage("Нового користувача створено");
// // // //         setShowRegisterForm(false);
// // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // //     };
// // // //
// // // //     const handleShowUsers = async () => {
// // // //         if (showUsersTable) {
// // // //             setShowUsersTable(false);
// // // //             return;
// // // //         }
// // // //
// // // //         try {
// // // //             const usersData = await getAllUsers();
// // // //             console.log("Fetched users:", usersData);
// // // //             setUsers(usersData);
// // // //             setShowUsersTable(true);
// // // //         } catch (error: any) {
// // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         }
// // // //     };
// // // //
// // // //     const handleEditUser = (user: UserDTO) => {
// // // //         setEditUser(user);
// // // //         setEditPassword("");
// // // //     };
// // // //
// // // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         if (!editUser) return;
// // // //
// // // //         try {
// // // //             const updatedUser = await updateUser(editUser.username, {
// // // //                 username: editUser.username,
// // // //                 password: editPassword,
// // // //             });
// // // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // // //             setEditUser(null);
// // // //             setSuccessMessage("Користувача оновлено");
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             const message = error.message.includes("Користувача не знайдено")
// // // //                 ? "Користувача не знайдено"
// // // //                 : error.message || "Не вдалося оновити користувача";
// // // //             setEditUserError(message);
// // // //         }
// // // //     };
// // // //
// // // //     const handleAddAthlete = () => {
// // // //         setShowAthleteForm(true);
// // // //         setAthleteCount(1);
// // // //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// // // //     };
// // // //
// // // //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const count = parseInt(e.target.value) || 1;
// // // //         setAthleteCount(Math.max(1, count));
// // // //         setAthletes(
// // // //             Array(count)
// // // //                 .fill(null)
// // // //                 .map((_, i) =>
// // // //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// // // //                 )
// // // //         );
// // // //     };
// // // //
// // // //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// // // //         const newAthletes = [...athletes];
// // // //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// // // //         setAthletes(newAthletes);
// // // //     };
// // // //
// // // //     const handleAddAthletes = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         setAthleteError("");
// // // //
// // // //         try {
// // // //             for (const athlete of athletes) {
// // // //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// // // //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// // // //                 }
// // // //                 await createAthlete(athlete);
// // // //             }
// // // //             setSuccessMessage("Атлетів додано");
// // // //             setShowAthleteForm(false);
// // // //             setAthleteCount(1);
// // // //             setAthletes([]);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             setAthleteError(error.message || "Не вдалося додати атлетів");
// // // //         }
// // // //     };
// // // //
// // // //     const handleShowMyAthletes = async () => {
// // // //         if (showMyAthletes) {
// // // //             setShowMyAthletes(false);
// // // //             return;
// // // //         }
// // // //
// // // //         try {
// // // //             const athletesData = await getMyAthletes();
// // // //             console.log("Fetched my athletes:", athletesData);
// // // //             setMyAthletes(athletesData);
// // // //             setShowMyAthletes(true);
// // // //         } catch (error: any) {
// // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         }
// // // //     };
// // // //
// // // //     const handleEditAthlete = (athlete: AthleteDTO) => {
// // // //         setEditAthlete(athlete);
// // // //     };
// // // //
// // // //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         if (!editAthlete || !editAthlete.id) return;
// // // //
// // // //         try {
// // // //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// // // //             setMyAthletes(myAthletes.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a)));
// // // //             setEditAthlete(null);
// // // //             setSuccessMessage("Дані атлета оновлено");
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             const message = error.message.includes("Athlete not found")
// // // //                 ? "Атлета не знайдено"
// // // //                 : error.message.includes("Athlete is owned by another user")
// // // //                     ? "Ви не можете редагувати цього атлета"
// // // //                     : error.message || "Не вдалося оновити атлета";
// // // //             setEditAthleteError(message);
// // // //         }
// // // //     };
// // // //
// // // //     const handleDeleteAthlete = async (id: number) => {
// // // //         try {
// // // //             await deleteAthlete(id);
// // // //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// // // //             setSuccessMessage("Атлета видалено");
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             const message = error.message.includes("Athlete not found")
// // // //                 ? "Атлета не знайдено"
// // // //                 : error.message.includes("Athlete is owned by another user")
// // // //                     ? "Ви не можете видалити цього атлета"
// // // //                     : error.message || "Не вдалося видалити атлета";
// // // //             setSuccessMessage(`Помилка: ${message}`);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         }
// // // //     };
// // // //
// // // //     const handleNonContactApplication = () => {
// // // //         setShowNonContactForm(true);
// // // //         setNonContactCount(1);
// // // //         setNonContactApplications([{
// // // //             competitionName: "",
// // // //             athleteFirstName: "",
// // // //             athleteLastName: "",
// // // //             birthDate: "",
// // // //             gender: "MALE",
// // // //             ageCategory: "YOUNGER_JUNIORS_6_8",
// // // //             weaponlessProgram: undefined,
// // // //             shortWeaponProgram: undefined,
// // // //             longWeaponProgram: undefined,
// // // //             duilian: ""
// // // //         }]);
// // // //     };
// // // //
// // // //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const count = parseInt(e.target.value) || 1;
// // // //         setNonContactCount(Math.max(1, count));
// // // //         setNonContactApplications(
// // // //             Array(count)
// // // //                 .fill(null)
// // // //                 .map((_, i) =>
// // // //                         nonContactApplications[i] || {
// // // //                             competitionName: "",
// // // //                             athleteFirstName: "",
// // // //                             athleteLastName: "",
// // // //                             birthDate: "",
// // // //                             gender: "MALE",
// // // //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// // // //                             weaponlessProgram: undefined,
// // // //                             shortWeaponProgram: undefined,
// // // //                             longWeaponProgram: undefined,
// // // //                             duilian: ""
// // // //                         }
// // // //                 )
// // // //         );
// // // //     };
// // // //
// // // //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// // // //         const newApplications = [...nonContactApplications];
// // // //         newApplications[index] = { ...newApplications[index], [field]: value };
// // // //         setNonContactApplications(newApplications);
// // // //     };
// // // //
// // // //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         setNonContactError("");
// // // //
// // // //         try {
// // // //             for (const application of nonContactApplications) {
// // // //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// // // //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// // // //                 }
// // // //                 await createApplication(application);
// // // //             }
// // // //             setSuccessMessage("Заявки подано");
// // // //             setShowNonContactForm(false);
// // // //             setNonContactCount(1);
// // // //             setNonContactApplications([]);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             setNonContactError(error.message || "Не вдалося подати заявки");
// // // //         }
// // // //     };
// // // //
// // // //     const handleShowMyApplications = async () => {
// // // //         if (showMyApplications) {
// // // //             setShowMyApplications(false);
// // // //             return;
// // // //         }
// // // //
// // // //         try {
// // // //             const applicationsData = await getMyApplications();
// // // //             console.log("Fetched my applications:", applicationsData);
// // // //             setMyApplications(applicationsData);
// // // //             setShowMyApplications(true);
// // // //         } catch (error: any) {
// // // //             setSuccessMessage(`Помилка: ${error.message}`);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         }
// // // //     };
// // // //
// // // //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// // // //         setEditApplication(application);
// // // //     };
// // // //
// // // //     const handleUpdateApplication = async (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         if (!editApplication || !editApplication.id) return;
// // // //
// // // //         try {
// // // //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// // // //             setMyApplications(myApplications.map((a) => (a.id === updatedApplication.id ? updatedApplication : a)));
// // // //             setEditApplication(null);
// // // //             setSuccessMessage("Дані заявки оновлено");
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             const message = error.message.includes("Competition application not found")
// // // //                 ? "Заявку не знайдено"
// // // //                 : error.message.includes("Application is owned by another user")
// // // //                     ? "Ви не можете редагувати цю заявку"
// // // //                     : error.message || "Не вдалося оновити заявку";
// // // //             setEditApplicationError(message);
// // // //         }
// // // //     };
// // // //
// // // //     const handleDeleteApplication = async (id: number) => {
// // // //         try {
// // // //             await deleteApplication(id);
// // // //             setMyApplications(myApplications.filter((a) => a.id !== id));
// // // //             setSuccessMessage("Заявку видалено");
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         } catch (error: any) {
// // // //             const message = error.message.includes("Competition application not found")
// // // //                 ? "Заявку не знайдено"
// // // //                 : error.message.includes("Application is owned by another user")
// // // //                     ? "Ви не можете видалити цю заявку"
// // // //                     : error.message || "Не вдалося видалити заявку";
// // // //             setSuccessMessage(`Помилка: ${message}`);
// // // //             setTimeout(() => setSuccessMessage(""), 3000);
// // // //         }
// // // //     };
// // // //
// // // //     const handleContactApplication = () => {
// // // //         console.log("Заповнити заявку (контактні види)");
// // // //     };
// // // //
// // // //     if (!user) {
// // // //         return <div>Завантаження...</div>;
// // // //     }
// // // //
// // // //     return (
// // // //         <div className={styles.container}>
// // // //             <h1>Особистий кабінет</h1>
// // // //             <p>Вітаємо, {user.username}!</p>
// // // //             <p>Ролі: {user.roles.join(", ")}</p>
// // // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // // //                 <>
// // // //                     <p>Ви маєте права супер адміністратора!</p>
// // // //                     <button
// // // //                         className={styles.registerButton}
// // // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // // //                     >
// // // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // // //                     </button>
// // // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // // //                     </button>
// // // //                     {showRegisterForm && (
// // // //                         <div className={styles.formWrapper}>
// // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // //                         </div>
// // // //                     )}
// // // //                     {showUsersTable && (
// // // //                         <table className={styles.usersTable}>
// // // //                             <thead>
// // // //                             <tr>
// // // //                                 <th>Ім'я користувача</th>
// // // //                                 <th>Ролі</th>
// // // //                                 <th>Дії</th>
// // // //                             </tr>
// // // //                             </thead>
// // // //                             <tbody>
// // // //                             {users.map((u) => (
// // // //                                 <tr key={u.username}>
// // // //                                     <td>{u.username}</td>
// // // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // // //                                     <td>
// // // //                                         <button
// // // //                                             className={styles.editButton}
// // // //                                             onClick={() => handleEditUser(u)}
// // // //                                         >
// // // //                                             Редагувати
// // // //                                         </button>
// // // //                                     </td>
// // // //                                 </tr>
// // // //                             ))}
// // // //                             </tbody>
// // // //                         </table>
// // // //                     )}
// // // //                 </>
// // // //             )}
// // // //             {user.roles.includes("ROLE_USER") && (
// // // //                 <>
// // // //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // // //                         Додати атлета до бази
// // // //                     </button>
// // // //                     <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// // // //                         {showMyAthletes ? "Приховати моїх атлетів" : "Мої атлети"}
// // // //                     </button>
// // // //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // // //                         Заповнити заявку (не контактні види)
// // // //                     </button>
// // // //                     <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// // // //                         {showMyApplications ? "Приховати заявки" : "Перевірити заявку"}
// // // //                     </button>
// // // //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// // // //                         Заповнити заявку (контактні види)
// // // //                     </button>
// // // //                 </>
// // // //             )}
// // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // //             {editUser && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.editFormContainer}>
// // // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // // //                                 <input
// // // //                                     type="password"
// // // //                                     id="editPassword"
// // // //                                     value={editPassword}
// // // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             {editUserError && <p className={styles.error}>{editUserError}</p>}
// // // //                             <button type="submit" className={styles.submitButton}>
// // // //                                 Зберегти
// // // //                             </button>
// // // //                             <button
// // // //                                 type="button"
// // // //                                 className={styles.cancelButton}
// // // //                                 onClick={() => setEditUser(null)}
// // // //                             >
// // // //                                 Скасувати
// // // //                             </button>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             {showAthleteForm && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.athleteFormContainer}>
// // // //                         <h3>Додати атлетів</h3>
// // // //                         <div className={styles.inputGroup}>
// // // //                             <label htmlFor="athleteCount">Кількість атлетів</label>
// // // //                             <input
// // // //                                 type="number"
// // // //                                 id="athleteCount"
// // // //                                 min="1"
// // // //                                 value={athleteCount}
// // // //                                 onChange={handleAthleteCountChange}
// // // //                                 className={styles.countInput}
// // // //                             />
// // // //                         </div>
// // // //                         <form onSubmit={handleAddAthletes}>
// // // //                             <table className={styles.athleteTable}>
// // // //                                 <thead>
// // // //                                 <tr>
// // // //                                     <th>Ім'я</th>
// // // //                                     <th>Прізвище</th>
// // // //                                     <th>Дата народження</th>
// // // //                                     <th>Тип програми</th>
// // // //                                 </tr>
// // // //                                 </thead>
// // // //                                 <tbody>
// // // //                                 {athletes.map((athlete, index) => (
// // // //                                     <tr key={index}>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 value={athlete.firstName}
// // // //                                                 onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 value={athlete.lastName}
// // // //                                                 onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="date"
// // // //                                                 value={athlete.birthDate}
// // // //                                                 onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <select
// // // //                                                 value={athlete.programType}
// // // //                                                 onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// // // //                                                 required
// // // //                                             >
// // // //                                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // //                                                 <option value="CONTACT">Контактні види</option>
// // // //                                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // //                                             </select>
// // // //                                         </td>
// // // //                                     </tr>
// // // //                                 ))}
// // // //                                 </tbody>
// // // //                             </table>
// // // //                             {athleteError && <p className={styles.error}>{athleteError}</p>}
// // // //                             <button type="submit" className={styles.submitButton}>
// // // //                                 Додати атлетів
// // // //                             </button>
// // // //                             <button
// // // //                                 type="button"
// // // //                                 className={styles.cancelButton}
// // // //                                 onClick={() => setShowAthleteForm(false)}
// // // //                             >
// // // //                                 Скасувати
// // // //                             </button>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             {showMyAthletes && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.athleteFormContainer}>
// // // //                         <h3>Мої атлети</h3>
// // // //                         <table className={styles.athleteTable}>
// // // //                             <thead>
// // // //                             <tr>
// // // //                                 <th>Ім'я</th>
// // // //                                 <th>Прізвище</th>
// // // //                                 <th>Дата народження</th>
// // // //                                 <th>Тип програми</th>
// // // //                                 <th>Дії</th>
// // // //                             </tr>
// // // //                             </thead>
// // // //                             <tbody>
// // // //                             {myAthletes.map((athlete) => (
// // // //                                 <tr key={athlete.id}>
// // // //                                     <td>{athlete.firstName}</td>
// // // //                                     <td>{athlete.lastName}</td>
// // // //                                     <td>{athlete.birthDate}</td>
// // // //                                     <td>
// // // //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// // // //                                             ? "Традиційне таолу"
// // // //                                             : athlete.programType === "CONTACT"
// // // //                                                 ? "Контактні види"
// // // //                                                 : "Спортивне таолу"}
// // // //                                     </td>
// // // //                                     <td>
// // // //                                         <button
// // // //                                             className={styles.editButton}
// // // //                                             onClick={() => handleEditAthlete(athlete)}
// // // //                                         >
// // // //                                             Редагувати
// // // //                                         </button>
// // // //                                         <button
// // // //                                             className={styles.deleteButton}
// // // //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// // // //                                         >
// // // //                                             Видалити
// // // //                                         </button>
// // // //                                     </td>
// // // //                                 </tr>
// // // //                             ))}
// // // //                             </tbody>
// // // //                         </table>
// // // //                         <button
// // // //                             className={styles.cancelButton}
// // // //                             onClick={() => setShowMyAthletes(false)}
// // // //                         >
// // // //                             Закрити
// // // //                         </button>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             {editAthlete && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.editFormContainer}>
// // // //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// // // //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editFirstName">Ім'я</label>
// // // //                                 <input
// // // //                                     type="text"
// // // //                                     id="editFirstName"
// // // //                                     value={editAthlete.firstName}
// // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editLastName">Прізвище</label>
// // // //                                 <input
// // // //                                     type="text"
// // // //                                     id="editLastName"
// // // //                                     value={editAthlete.lastName}
// // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editBirthDate">Дата народження</label>
// // // //                                 <input
// // // //                                     type="date"
// // // //                                     id="editBirthDate"
// // // //                                     value={editAthlete.birthDate}
// // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editProgramType">Тип програми</label>
// // // //                                 <select
// // // //                                     id="editProgramType"
// // // //                                     value={editAthlete.programType}
// // // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// // // //                                     required
// // // //                                 >
// // // //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // // //                                     <option value="CONTACT">Контактні види</option>
// // // //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// // // //                                 </select>
// // // //                             </div>
// // // //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// // // //                             <button type="submit" className={styles.submitButton}>
// // // //                                 Зберегти
// // // //                             </button>
// // // //                             <button
// // // //                                 type="button"
// // // //                                 className={styles.cancelButton}
// // // //                                 onClick={() => setEditAthlete(null)}
// // // //                             >
// // // //                                 Скасувати
// // // //                             </button>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             {showNonContactForm && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.athleteFormContainer}>
// // // //                         <h3>Заповнити заявку (не контактні види)</h3>
// // // //                         <div className={styles.inputGroup}>
// // // //                             <label htmlFor="nonContactCount">Кількість атлетів</label>
// // // //                             <input
// // // //                                 type="number"
// // // //                                 id="nonContactCount"
// // // //                                 min="1"
// // // //                                 value={nonContactCount}
// // // //                                 onChange={handleNonContactCountChange}
// // // //                                 className={styles.countInput}
// // // //                             />
// // // //                         </div>
// // // //                         <form onSubmit={handleAddNonContactApplications}>
// // // //                             <table className={styles.athleteTable}>
// // // //                                 <thead>
// // // //                                 <tr>
// // // //                                     <th>Назва змагання</th>
// // // //                                     <th>Ім'я</th>
// // // //                                     <th>Прізвище</th>
// // // //                                     <th>Дата народження</th>
// // // //                                     <th>Стать</th>
// // // //                                     <th>Вікова категорія</th>
// // // //                                     <th>Програма без зброї</th>
// // // //                                     <th>Коротка зброя</th>
// // // //                                     <th>Довга зброя</th>
// // // //                                     <th>Дуйлянь</th>
// // // //                                 </tr>
// // // //                                 </thead>
// // // //                                 <tbody>
// // // //                                 {nonContactApplications.map((application, index) => (
// // // //                                     <tr key={index}>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 value={application.competitionName}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 value={application.athleteFirstName}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 value={application.athleteLastName}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="date"
// // // //                                                 value={application.birthDate}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// // // //                                                 required
// // // //                                             />
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <select
// // // //                                                 value={application.gender}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// // // //                                                 required
// // // //                                             >
// // // //                                                 <option value="MALE">Чоловік</option>
// // // //                                                 <option value="FEMALE">Жінка</option>
// // // //                                             </select>
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <select
// // // //                                                 value={application.ageCategory}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// // // //                                                 required
// // // //                                             >
// // // //                                                 <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// // // //                                                 <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// // // //                                                 <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// // // //                                                 <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// // // //                                                 <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// // // //                                             </select>
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <select
// // // //                                                 value={application.weaponlessProgram || ""}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// // // //                                             >
// // // //                                                 <option value="">--</option>
// // // //                                                 <option value="CHANG_QUAN">Чан цюань</option>
// // // //                                                 <option value="NAN_QUAN">Нань цюань</option>
// // // //                                                 <option value="TAIJI_QUAN">Тайцзі цюань</option>
// // // //                                             </select>
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <select
// // // //                                                 value={application.shortWeaponProgram || ""}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// // // //                                             >
// // // //                                                 <option value="">--</option>
// // // //                                                 <option value="DAO_SHU">Дао шу</option>
// // // //                                                 <option value="JIAN_SHU">Цзянь шу</option>
// // // //                                                 <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// // // //                                                 <option value="NAN_DAO">Нань дао</option>
// // // //                                                 <option value="TAIJI_SHAN">Тайцзі шань</option>
// // // //                                             </select>
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <select
// // // //                                                 value={application.longWeaponProgram || ""}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// // // //                                             >
// // // //                                                 <option value="">--</option>
// // // //                                                 <option value="GUN_SHU">Гунь шу</option>
// // // //                                                 <option value="QIANG_SHU">Цян шу</option>
// // // //                                                 <option value="NAN_GUN">Нань гунь</option>
// // // //                                             </select>
// // // //                                         </td>
// // // //                                         <td>
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 value={application.duilian}
// // // //                                                 onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// // // //                                             />
// // // //                                         </td>
// // // //                                     </tr>
// // // //                                 ))}
// // // //                                 </tbody>
// // // //                             </table>
// // // //                             {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// // // //                             <button type="submit" className={styles.submitButton}>
// // // //                                 Подати заявку
// // // //                             </button>
// // // //                             <button
// // // //                                 type="button"
// // // //                                 className={styles.cancelButton}
// // // //                                 onClick={() => setShowNonContactForm(false)}
// // // //                             >
// // // //                                 Скасувати
// // // //                             </button>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             {showMyApplications && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.athleteFormContainer}>
// // // //                         <h3>Мої заявки</h3>
// // // //                         <table className={styles.athleteTable}>
// // // //                             <thead>
// // // //                             <tr>
// // // //                                 <th>Назва змагання</th>
// // // //                                 <th>Ім'я</th>
// // // //                                 <th>Прізвище</th>
// // // //                                 <th>Дата народження</th>
// // // //                                 <th>Стать</th>
// // // //                                 <th>Вікова категорія</th>
// // // //                                 <th>Програма без зброї</th>
// // // //                                 <th>Коротка зброя</th>
// // // //                                 <th>Довга зброя</th>
// // // //                                 <th>Дуйлянь</th>
// // // //                                 <th>Дії</th>
// // // //                             </tr>
// // // //                             </thead>
// // // //                             <tbody>
// // // //                             {myApplications.map((application) => (
// // // //                                 <tr key={application.id}>
// // // //                                     <td>{application.competitionName}</td>
// // // //                                     <td>{application.athleteFirstName}</td>
// // // //                                     <td>{application.athleteLastName}</td>
// // // //                                     <td>{application.birthDate}</td>
// // // //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// // // //                                     <td>
// // // //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// // // //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// // // //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// // // //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// // // //                                                         "Дорослі: 18 років і старше"}
// // // //                                     </td>
// // // //                                     <td>{application.weaponlessProgram || "--"}</td>
// // // //                                     <td>{application.shortWeaponProgram || "--"}</td>
// // // //                                     <td>{application.longWeaponProgram || "--"}</td>
// // // //                                     <td>{application.duilian || "--"}</td>
// // // //                                     <td>
// // // //                                         <button
// // // //                                             className={styles.editButton}
// // // //                                             onClick={() => handleEditApplication(application)}
// // // //                                         >
// // // //                                             Редагувати
// // // //                                         </button>
// // // //                                         <button
// // // //                                             className={styles.deleteButton}
// // // //                                             onClick={() => handleDeleteApplication(application.id!)}
// // // //                                         >
// // // //                                             Видалити
// // // //                                         </button>
// // // //                                     </td>
// // // //                                 </tr>
// // // //                             ))}
// // // //                             </tbody>
// // // //                         </table>
// // // //                         <button
// // // //                             className={styles.cancelButton}
// // // //                             onClick={() => setShowMyApplications(false)}
// // // //                         >
// // // //                             Закрити
// // // //                         </button>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             {editApplication && (
// // // //                 <div className={styles.formWrapper}>
// // // //                     <div className={styles.editFormContainer}>
// // // //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// // // //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// // // //                                 <input
// // // //                                     type="text"
// // // //                                     id="editCompetitionName"
// // // //                                     value={editApplication.competitionName}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// // // //                                 <input
// // // //                                     type="text"
// // // //                                     id="editAthleteFirstName"
// // // //                                     value={editApplication.athleteFirstName}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// // // //                                 <input
// // // //                                     type="text"
// // // //                                     id="editAthleteLastName"
// // // //                                     value={editApplication.athleteLastName}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editBirthDate">Дата народження</label>
// // // //                                 <input
// // // //                                     type="date"
// // // //                                     id="editBirthDate"
// // // //                                     value={editApplication.birthDate}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// // // //                                     required
// // // //                                 />
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editGender">Стать</label>
// // // //                                 <select
// // // //                                     id="editGender"
// // // //                                     value={editApplication.gender}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// // // //                                     required
// // // //                                 >
// // // //                                     <option value="MALE">Чоловік</option>
// // // //                                     <option value="FEMALE">Жінка</option>
// // // //                                 </select>
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// // // //                                 <select
// // // //                                     id="editAgeCategory"
// // // //                                     value={editApplication.ageCategory}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// // // //                                     required
// // // //                                 >
// // // //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// // // //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// // // //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// // // //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// // // //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// // // //                                 </select>
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// // // //                                 <select
// // // //                                     id="editWeaponlessProgram"
// // // //                                     value={editApplication.weaponlessProgram || ""}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// // // //                                 >
// // // //                                     <option value="">--</option>
// // // //                                     <option value="CHANG_QUAN">Чан цюань</option>
// // // //                                     <option value="NAN_QUAN">Нань цюань</option>
// // // //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// // // //                                 </select>
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// // // //                                 <select
// // // //                                     id="editShortWeaponProgram"
// // // //                                     value={editApplication.shortWeaponProgram || ""}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// // // //                                 >
// // // //                                     <option value="">--</option>
// // // //                                     <option value="DAO_SHU">Дао шу</option>
// // // //                                     <option value="JIAN_SHU">Цзянь шу</option>
// // // //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// // // //                                     <option value="NAN_DAO">Нань дао</option>
// // // //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// // // //                                 </select>
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// // // //                                 <select
// // // //                                     id="editLongWeaponProgram"
// // // //                                     value={editApplication.longWeaponProgram || ""}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// // // //                                 >
// // // //                                     <option value="">--</option>
// // // //                                     <option value="GUN_SHU">Гунь шу</option>
// // // //                                     <option value="QIANG_SHU">Цян шу</option>
// // // //                                     <option value="NAN_GUN">Нань гунь</option>
// // // //                                 </select>
// // // //                             </div>
// // // //                             <div className={styles.inputGroup}>
// // // //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// // // //                                 <input
// // // //                                     type="text"
// // // //                                     id="editDuilian"
// // // //                                     value={editApplication.duilian}
// // // //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// // // //                                 />
// // // //                             </div>
// // // //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// // // //                             <button type="submit" className={styles.submitButton}>
// // // //                                 Зберегти
// // // //                             </button>
// // // //                             <button
// // // //                                 type="button"
// // // //                                 className={styles.cancelButton}
// // // //                                 onClick={() => setEditApplication(null)}
// // // //                             >
// // // //                                 Скасувати
// // // //                             </button>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // //                 Вийти
// // // //             </button>
// // // //         </div>
// // // //     );
// // // // }
// // //
// // // 'use client';
// // //
// // // import { useEffect, useState } from "react";
// // // import styles from "./Cabinet.module.css";
// // // import { useRouter } from "next/navigation";
// // // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication } from "@/services/api.service";
// // // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // // import RegisterForm from "@/components/RegisterForm";
// // //
// // // export default function Cabinet() {
// // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // //     const [successMessage, setSuccessMessage] = useState("");
// // //     const [showUsersTable, setShowUsersTable] = useState(false);
// // //     const [users, setUsers] = useState<UserDTO[]>([]);
// // //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// // //     const [editPassword, setEditPassword] = useState("");
// // //     const [editUserError, setEditUserError] = useState("");
// // //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// // //     const [athleteCount, setAthleteCount] = useState(1);
// // //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// // //     const [athleteError, setAthleteError] = useState("");
// // //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// // //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// // //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// // //     const [editAthleteError, setEditAthleteError] = useState("");
// // //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// // //     const [nonContactCount, setNonContactCount] = useState(1);
// // //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// // //     const [nonContactError, setNonContactError] = useState("");
// // //     const [showMyApplications, setShowMyApplications] = useState(false);
// // //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// // //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// // //     const [editApplicationError, setEditApplicationError] = useState("");
// // //     const router = useRouter();
// // //
// // //     useEffect(() => {
// // //         const token = localStorage.getItem("accessToken");
// // //         if (!token) {
// // //             router.push("/");
// // //             return;
// // //         }
// // //
// // //         const decodedToken = parseJwt(token);
// // //         setUser({
// // //             username: decodedToken.sub,
// // //             roles: decodedToken.roles || [],
// // //         });
// // //     }, [router]);
// // //
// // //     const parseJwt = (token: string) => {
// // //         try {
// // //             const base64Url = token.split(".")[1];
// // //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // //             const jsonPayload = decodeURIComponent(
// // //                 atob(base64)
// // //                     .split("")
// // //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// // //                     .join("")
// // //             );
// // //             return JSON.parse(jsonPayload);
// // //         } catch (e) {
// // //             return {};
// // //         }
// // //     };
// // //
// // //     const handleLogout = () => {
// // //         localStorage.removeItem("accessToken");
// // //         localStorage.removeItem("refreshToken");
// // //         router.push("/");
// // //     };
// // //
// // //     const handleRegisterSuccess = () => {
// // //         setSuccessMessage("Нового користувача створено");
// // //         setShowRegisterForm(false);
// // //         setTimeout(() => setSuccessMessage(""), 3000);
// // //     };
// // //
// // //     const handleShowUsers = async () => {
// // //         if (showUsersTable) {
// // //             setShowUsersTable(false);
// // //             return;
// // //         }
// // //
// // //         try {
// // //             const usersData = await getAllUsers();
// // //             setUsers(usersData);
// // //             setShowUsersTable(true);
// // //         } catch (error: any) {
// // //             setSuccessMessage(`Помилка: ${error.message}`);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         }
// // //     };
// // //
// // //     const handleEditUser = (user: UserDTO) => {
// // //         setEditUser(user);
// // //         setEditPassword("");
// // //     };
// // //
// // //     const handleUpdateUser = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!editUser) return;
// // //
// // //         try {
// // //             const updatedUser = await updateUser(editUser.username, {
// // //                 username: editUser.username,
// // //                 password: editPassword,
// // //             });
// // //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// // //             setEditUser(null);
// // //             setSuccessMessage("Користувача оновлено");
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             const message = error.message.includes("Користувача не знайдено")
// // //                 ? "Користувача не знайдено"
// // //                 : error.message || "Не вдалося оновити користувача";
// // //             setEditUserError(message);
// // //         }
// // //     };
// // //
// // //     const handleAddAthlete = () => {
// // //         setShowAthleteForm(true);
// // //         setAthleteCount(1);
// // //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// // //     };
// // //
// // //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const count = parseInt(e.target.value) || 1;
// // //         setAthleteCount(Math.max(1, count));
// // //         setAthletes(
// // //             Array(count)
// // //                 .fill(null)
// // //                 .map((_, i) =>
// // //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// // //                 )
// // //         );
// // //     };
// // //
// // //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// // //         const newAthletes = [...athletes];
// // //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// // //         setAthletes(newAthletes);
// // //     };
// // //
// // //     const handleAddAthletes = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         setAthleteError("");
// // //
// // //         try {
// // //             for (const athlete of athletes) {
// // //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// // //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// // //                 }
// // //                 await createAthlete(athlete);
// // //             }
// // //             setSuccessMessage("Атлетів додано");
// // //             setShowAthleteForm(false);
// // //             setAthleteCount(1);
// // //             setAthletes([]);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             setAthleteError(error.message || "Не вдалося додати атлетів");
// // //         }
// // //     };
// // //
// // //     const handleShowMyAthletes = async () => {
// // //         if (showMyAthletes) {
// // //             setShowMyAthletes(false);
// // //             setEditAthlete(null);
// // //             return;
// // //         }
// // //
// // //         try {
// // //             const athletesData = await getMyAthletes();
// // //             setMyAthletes(athletesData);
// // //             setShowMyAthletes(true);
// // //             setShowAthleteForm(false);
// // //             setShowNonContactForm(false);
// // //             setShowMyApplications(false);
// // //             setShowUsersTable(false);
// // //             setEditUser(null);
// // //         } catch (error: any) {
// // //             setSuccessMessage(`Помилка: ${error.message}`);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         }
// // //     };
// // //
// // //     const handleEditAthlete = (athlete: AthleteDTO) => {
// // //         setEditAthlete(athlete);
// // //     };
// // //
// // //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!editAthlete || !editAthlete.id) return;
// // //
// // //         try {
// // //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// // //             setMyAthletes(myAthletes.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a)));
// // //             setEditAthlete(null);
// // //             setSuccessMessage("Дані атлета оновлено");
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             const message = error.message.includes("Athlete not found")
// // //                 ? "Атлета не знайдено"
// // //                 : error.message.includes("Athlete is owned by another user")
// // //                     ? "Ви не можете редагувати цього атлета"
// // //                     : error.message || "Не вдалося оновити атлета";
// // //             setEditAthleteError(message);
// // //         }
// // //     };
// // //
// // //     const handleDeleteAthlete = async (id: number) => {
// // //         try {
// // //             await deleteAthlete(id);
// // //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// // //             setSuccessMessage("Атлета видалено");
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             const message = error.message.includes("Athlete not found")
// // //                 ? "Атлета не знайдено"
// // //                 : error.message.includes("Athlete is owned by another user")
// // //                     ? "Ви не можете видалити цього атлета"
// // //                     : error.message || "Не вдалося видалити атлета";
// // //             setSuccessMessage(`Помилка: ${message}`);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         }
// // //     };
// // //
// // //     const handleNonContactApplication = () => {
// // //         setShowNonContactForm(true);
// // //         setNonContactCount(1);
// // //         setNonContactApplications([{
// // //             competitionName: "",
// // //             athleteFirstName: "",
// // //             athleteLastName: "",
// // //             birthDate: "",
// // //             gender: "MALE",
// // //             ageCategory: "YOUNGER_JUNIORS_6_8",
// // //             weaponlessProgram: undefined,
// // //             shortWeaponProgram: undefined,
// // //             longWeaponProgram: undefined,
// // //             duilian: ""
// // //         }]);
// // //     };
// // //
// // //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const count = parseInt(e.target.value) || 1;
// // //         setNonContactCount(Math.max(1, count));
// // //         setNonContactApplications(
// // //             Array(count)
// // //                 .fill(null)
// // //                 .map((_, i) =>
// // //                         nonContactApplications[i] || {
// // //                             competitionName: "",
// // //                             athleteFirstName: "",
// // //                             athleteLastName: "",
// // //                             birthDate: "",
// // //                             gender: "MALE",
// // //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// // //                             weaponlessProgram: undefined,
// // //                             shortWeaponProgram: undefined,
// // //                             longWeaponProgram: undefined,
// // //                             duilian: ""
// // //                         }
// // //                 )
// // //         );
// // //     };
// // //
// // //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// // //         const newApplications = [...nonContactApplications];
// // //         newApplications[index] = { ...newApplications[index], [field]: value };
// // //         setNonContactApplications(newApplications);
// // //     };
// // //
// // //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         setNonContactError("");
// // //
// // //         try {
// // //             for (const application of nonContactApplications) {
// // //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// // //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// // //                 }
// // //                 await createApplication(application);
// // //             }
// // //             setSuccessMessage("Заявки подано");
// // //             setShowNonContactForm(false);
// // //             setNonContactCount(1);
// // //             setNonContactApplications([]);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             setNonContactError(error.message || "Не вдалося подати заявки");
// // //         }
// // //     };
// // //
// // //     const handleShowMyApplications = async () => {
// // //         if (showMyApplications) {
// // //             setShowMyApplications(false);
// // //             return;
// // //         }
// // //
// // //         try {
// // //             const applicationsData = await getMyApplications();
// // //             setMyApplications(applicationsData);
// // //             setShowMyApplications(true);
// // //         } catch (error: any) {
// // //             setSuccessMessage(`Помилка: ${error.message}`);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         }
// // //     };
// // //
// // //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// // //         setEditApplication(application);
// // //     };
// // //
// // //     const handleUpdateApplication = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!editApplication || !editApplication.id) return;
// // //
// // //         try {
// // //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// // //             setMyApplications(myApplications.map((a) => (a.id === updatedApplication.id ? updatedApplication : a)));
// // //             setEditApplication(null);
// // //             setSuccessMessage("Дані заявки оновлено");
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             const message = error.message.includes("Competition application not found")
// // //                 ? "Заявку не знайдено"
// // //                 : error.message.includes("Application is owned by another user")
// // //                     ? "Ви не можете редагувати цю заявку"
// // //                     : error.message || "Не вдалося оновити заявку";
// // //             setEditApplicationError(message);
// // //         }
// // //     };
// // //
// // //     const handleDeleteApplication = async (id: number) => {
// // //         try {
// // //             await deleteApplication(id);
// // //             setMyApplications(myApplications.filter((a) => a.id !== id));
// // //             setSuccessMessage("Заявку видалено");
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         } catch (error: any) {
// // //             const message = error.message.includes("Competition application not found")
// // //                 ? "Заявку не знайдено"
// // //                 : error.message.includes("Application is owned by another user")
// // //                     ? "Ви не можете видалити цю заявку"
// // //                     : error.message || "Не вдалося видалити заявку";
// // //             setSuccessMessage(`Помилка: ${message}`);
// // //             setTimeout(() => setSuccessMessage(""), 3000);
// // //         }
// // //     };
// // //
// // //     const handleContactApplication = () => {
// // //         console.log("Заповнити заявку (контактні види)");
// // //     };
// // //
// // //     if (!user) {
// // //         return <div>Завантаження...</div>;
// // //     }
// // //
// // //     return (
// // //         <div className={styles.container}>
// // //             {!showMyAthletes && (
// // //                 <>
// // //                     <h1>Особистий кабінет</h1>
// // //                     <p>Вітаємо, {user.username}!</p>
// // //                     <p>Ролі: {user.roles.join(", ")}</p>
// // //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// // //                         <>
// // //                             <button
// // //                                 className={styles.registerButton}
// // //                                 onClick={() => setShowRegisterForm(!showRegisterForm)}
// // //                             >
// // //                                 {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // //                             </button>
// // //                             <button className={styles.usersButton} onClick={handleShowUsers}>
// // //                                 {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // //                             </button>
// // //                             {showRegisterForm && (
// // //                                 <div className={styles.formWrapper}>
// // //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// // //                                 </div>
// // //                             )}
// // //                             {showUsersTable && (
// // //                                 <table className={styles.usersTable}>
// // //                                     <thead>
// // //                                     <tr>
// // //                                         <th>Ім'я користувача</th>
// // //                                         <th>Ролі</th>
// // //                                         <th>Дії</th>
// // //                                     </tr>
// // //                                     </thead>
// // //                                     <tbody>
// // //                                     {users.map((u) => (
// // //                                         <tr key={u.username}>
// // //                                             <td>{u.username}</td>
// // //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // //                                             <td>
// // //                                                 <button
// // //                                                     className={styles.editButton}
// // //                                                     onClick={() => handleEditUser(u)}
// // //                                                 >
// // //                                                     Редагувати
// // //                                                 </button>
// // //                                             </td>
// // //                                         </tr>
// // //                                     ))}
// // //                                     </tbody>
// // //                                 </table>
// // //                             )}
// // //                         </>
// // //                     )}
// // //                     {user.roles.includes("ROLE_USER") && (
// // //                         <>
// // //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // //                                 Додати атлета до бази
// // //                             </button>
// // //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// // //                                 Мої атлети
// // //                             </button>
// // //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // //                                 Заповнити заявку (неконтактні види)
// // //                             </button>
// // //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// // //                                 {showMyApplications ? "Приховати заявки" : "Перевірити заявку"}
// // //                             </button>
// // //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// // //                                 Заповнити заявку (контактні види)
// // //                             </button>
// // //                         </>
// // //                     )}
// // //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// // //                     {editUser && (
// // //                         <div className={styles.formWrapper}>
// // //                             <div className={styles.editFormContainer}>
// // //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// // //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editPassword">Новий пароль</label>
// // //                                         <input
// // //                                             type="password"
// // //                                             id="editPassword"
// // //                                             value={editPassword}
// // //                                             onChange={(e) => setEditPassword(e.target.value)}
// // //                                             required
// // //                                         />
// // //                                     </div>
// // //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// // //                                     <button type="submit" className={styles.submitButton}>
// // //                                         Зберегти
// // //                                     </button>
// // //                                     <button
// // //                                         type="button"
// // //                                         className={styles.cancelButton}
// // //                                         onClick={() => setEditUser(null)}
// // //                                     >
// // //                                         Скасувати
// // //                                     </button>
// // //                                 </form>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     {showAthleteForm && (
// // //                         <div className={styles.formWrapper}>
// // //                             <div className={styles.athleteFormContainer}>
// // //                                 <h3>Додати атлетів</h3>
// // //                                 <div className={styles.inputGroup}>
// // //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// // //                                     <input
// // //                                         type="number"
// // //                                         id="athleteCount"
// // //                                         min="1"
// // //                                         value={athleteCount}
// // //                                         onChange={handleAthleteCountChange}
// // //                                         className={styles.countInput}
// // //                                     />
// // //                                 </div>
// // //                                 <form onSubmit={handleAddAthletes}>
// // //                                     <table className={styles.athleteTable}>
// // //                                         <thead>
// // //                                         <tr>
// // //                                             <th>Ім'я</th>
// // //                                             <th>Прізвище</th>
// // //                                             <th>Дата народження</th>
// // //                                             <th>Тип програми</th>
// // //                                         </tr>
// // //                                         </thead>
// // //                                         <tbody>
// // //                                         {athletes.map((athlete, index) => (
// // //                                             <tr key={index}>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="text"
// // //                                                         value={athlete.firstName}
// // //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="text"
// // //                                                         value={athlete.lastName}
// // //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="date"
// // //                                                         value={athlete.birthDate}
// // //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <select
// // //                                                         value={athlete.programType}
// // //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// // //                                                         required
// // //                                                     >
// // //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // //                                                         <option value="CONTACT">Контактні види</option>
// // //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// // //                                                     </select>
// // //                                                 </td>
// // //                                             </tr>
// // //                                         ))}
// // //                                         </tbody>
// // //                                     </table>
// // //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// // //                                     <button type="submit" className={styles.submitButton}>
// // //                                         Додати атлетів
// // //                                     </button>
// // //                                     <button
// // //                                         type="button"
// // //                                         className={styles.cancelButton}
// // //                                         onClick={() => setShowAthleteForm(false)}
// // //                                     >
// // //                                         Скасувати
// // //                                     </button>
// // //                                 </form>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     {showNonContactForm && (
// // //                         <div className={styles.formWrapper}>
// // //                             <div className={styles.athleteFormContainer}>
// // //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// // //                                 <div className={styles.inputGroup}>
// // //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// // //                                     <input
// // //                                         type="number"
// // //                                         id="nonContactCount"
// // //                                         min="1"
// // //                                         value={nonContactCount}
// // //                                         onChange={handleNonContactCountChange}
// // //                                         className={styles.countInput}
// // //                                     />
// // //                                 </div>
// // //                                 <form onSubmit={handleAddNonContactApplications}>
// // //                                     <table className={styles.athleteTable}>
// // //                                         <thead>
// // //                                         <tr>
// // //                                             <th>Назва змагання</th>
// // //                                             <th>Ім'я</th>
// // //                                             <th>Прізвище</th>
// // //                                             <th>Дата народження</th>
// // //                                             <th>Стать</th>
// // //                                             <th>Вікова категорія</th>
// // //                                             <th>Програма без зброї</th>
// // //                                             <th>Коротка зброя</th>
// // //                                             <th>Довга зброя</th>
// // //                                             <th>Дуйлянь</th>
// // //                                         </tr>
// // //                                         </thead>
// // //                                         <tbody>
// // //                                         {nonContactApplications.map((application, index) => (
// // //                                             <tr key={index}>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="text"
// // //                                                         value={application.competitionName}
// // //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="text"
// // //                                                         value={application.athleteFirstName}
// // //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="text"
// // //                                                         value={application.athleteLastName}
// // //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="date"
// // //                                                         value={application.birthDate}
// // //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// // //                                                         required
// // //                                                     />
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <select
// // //                                                         value={application.gender}
// // //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// // //                                                         required
// // //                                                     >
// // //                                                         <option value="MALE">Чоловік</option>
// // //                                                         <option value="FEMALE">Жінка</option>
// // //                                                     </select>
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <select
// // //                                                         value={application.ageCategory}
// // //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// // //                                                         required
// // //                                                     >
// // //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// // //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// // //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// // //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// // //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// // //                                                     </select>
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <select
// // //                                                         value={application.weaponlessProgram || ""}
// // //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// // //                                                     >
// // //                                                         <option value="">--</option>
// // //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// // //                                                         <option value="NAN_QUAN">Нань цюань</option>
// // //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// // //                                                     </select>
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <select
// // //                                                         value={application.shortWeaponProgram || ""}
// // //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// // //                                                     >
// // //                                                         <option value="">--</option>
// // //                                                         <option value="DAO_SHU">Дао шу</option>
// // //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// // //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// // //                                                         <option value="NAN_DAO">Нань дао</option>
// // //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// // //                                                     </select>
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <select
// // //                                                         value={application.longWeaponProgram || ""}
// // //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// // //                                                     >
// // //                                                         <option value="">--</option>
// // //                                                         <option value="GUN_SHU">Гунь шу</option>
// // //                                                         <option value="QIANG_SHU">Цян шу</option>
// // //                                                         <option value="NAN_GUN">Нань гунь</option>
// // //                                                     </select>
// // //                                                 </td>
// // //                                                 <td>
// // //                                                     <input
// // //                                                         type="text"
// // //                                                         value={application.duilian}
// // //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// // //                                                     />
// // //                                                 </td>
// // //                                             </tr>
// // //                                         ))}
// // //                                         </tbody>
// // //                                     </table>
// // //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// // //                                     <button type="submit" className={styles.submitButton}>
// // //                                         Подати заявку
// // //                                     </button>
// // //                                     <button
// // //                                         type="button"
// // //                                         className={styles.cancelButton}
// // //                                         onClick={() => setShowNonContactForm(false)}
// // //                                     >
// // //                                         Скасувати
// // //                                     </button>
// // //                                 </form>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     {showMyApplications && (
// // //                         <div className={styles.formWrapper}>
// // //                             <div className={styles.athleteFormContainer}>
// // //                                 <h3>Мої заявки</h3>
// // //                                 <table className={styles.athleteTable}>
// // //                                     <thead>
// // //                                     <tr>
// // //                                         <th>Назва змагання</th>
// // //                                         <th>Ім'я</th>
// // //                                         <th>Прізвище</th>
// // //                                         <th>Дата народження</th>
// // //                                         <th>Стать</th>
// // //                                         <th>Вікова категорія</th>
// // //                                         <th>Програма без зброї</th>
// // //                                         <th>Коротка зброя</th>
// // //                                         <th>Довга зброя</th>
// // //                                         <th>Дуйлянь</th>
// // //                                         <th>Дії</th>
// // //                                     </tr>
// // //                                     </thead>
// // //                                     <tbody>
// // //                                     {myApplications.map((application) => (
// // //                                         <tr key={application.id}>
// // //                                             <td>{application.competitionName}</td>
// // //                                             <td>{application.athleteFirstName}</td>
// // //                                             <td>{application.athleteLastName}</td>
// // //                                             <td>{application.birthDate}</td>
// // //                                             <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// // //                                             <td>
// // //                                                 {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// // //                                                     application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// // //                                                         application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// // //                                                             application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// // //                                                                 "Дорослі: 18 років і старше"}
// // //                                             </td>
// // //                                             <td>{application.weaponlessProgram || "--"}</td>
// // //                                             <td>{application.shortWeaponProgram || "--"}</td>
// // //                                             <td>{application.longWeaponProgram || "--"}</td>
// // //                                             <td>{application.duilian || "--"}</td>
// // //                                             <td>
// // //                                                 <button
// // //                                                     className={styles.editButton}
// // //                                                     onClick={() => handleEditApplication(application)}
// // //                                                 >
// // //                                                     Редагувати
// // //                                                 </button>
// // //                                                 <button
// // //                                                     className={styles.deleteButton}
// // //                                                     onClick={() => handleDeleteApplication(application.id!)}
// // //                                                 >
// // //                                                     Видалити
// // //                                                 </button>
// // //                                             </td>
// // //                                         </tr>
// // //                                     ))}
// // //                                     </tbody>
// // //                                 </table>
// // //                                 <button
// // //                                     className={styles.cancelButton}
// // //                                     onClick={() => setShowMyApplications(false)}
// // //                                 >
// // //                                     Закрити
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     {editApplication && (
// // //                         <div className={styles.formWrapper}>
// // //                             <div className={styles.editFormContainer}>
// // //                                 <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// // //                                 <form onSubmit={handleUpdateApplication} className={styles.form}>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editCompetitionName">Назва змагання</label>
// // //                                         <input
// // //                                             type="text"
// // //                                             id="editCompetitionName"
// // //                                             value={editApplication.competitionName}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// // //                                             required
// // //                                         />
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editAthleteFirstName">Ім'я</label>
// // //                                         <input
// // //                                             type="text"
// // //                                             id="editAthleteFirstName"
// // //                                             value={editApplication.athleteFirstName}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// // //                                             required
// // //                                         />
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editAthleteLastName">Прізвище</label>
// // //                                         <input
// // //                                             type="text"
// // //                                             id="editAthleteLastName"
// // //                                             value={editApplication.athleteLastName}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// // //                                             required
// // //                                         />
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editBirthDate">Дата народження</label>
// // //                                         <input
// // //                                             type="date"
// // //                                             id="editBirthDate"
// // //                                             value={editApplication.birthDate}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// // //                                             required
// // //                                         />
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editGender">Стать</label>
// // //                                         <select
// // //                                             id="editGender"
// // //                                             value={editApplication.gender}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// // //                                             required
// // //                                         >
// // //                                             <option value="MALE">Чоловік</option>
// // //                                             <option value="FEMALE">Жінка</option>
// // //                                         </select>
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editAgeCategory">Вікова категорія</label>
// // //                                         <select
// // //                                             id="editAgeCategory"
// // //                                             value={editApplication.ageCategory}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// // //                                             required
// // //                                         >
// // //                                             <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// // //                                             <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// // //                                             <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// // //                                             <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// // //                                             <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// // //                                         </select>
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// // //                                         <select
// // //                                             id="editWeaponlessProgram"
// // //                                             value={editApplication.weaponlessProgram || ""}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// // //                                         >
// // //                                             <option value="">--</option>
// // //                                             <option value="CHANG_QUAN">Чан цюань</option>
// // //                                             <option value="NAN_QUAN">Нань цюань</option>
// // //                                             <option value="TAIJI_QUAN">Тайцзі цюань</option>
// // //                                         </select>
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// // //                                         <select
// // //                                             id="editShortWeaponProgram"
// // //                                             value={editApplication.shortWeaponProgram || ""}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// // //                                         >
// // //                                             <option value="">--</option>
// // //                                             <option value="DAO_SHU">Дао шу</option>
// // //                                             <option value="JIAN_SHU">Цзянь шу</option>
// // //                                             <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// // //                                             <option value="NAN_DAO">Нань дао</option>
// // //                                             <option value="TAIJI_SHAN">Тайцзі шань</option>
// // //                                         </select>
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// // //                                         <select
// // //                                             id="editLongWeaponProgram"
// // //                                             value={editApplication.longWeaponProgram || ""}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// // //                                         >
// // //                                             <option value="">--</option>
// // //                                             <option value="GUN_SHU">Гунь шу</option>
// // //                                             <option value="QIANG_SHU">Цян шу</option>
// // //                                             <option value="NAN_GUN">Нань гунь</option>
// // //                                         </select>
// // //                                     </div>
// // //                                     <div className={styles.inputGroup}>
// // //                                         <label htmlFor="editDuilian">Дуйлянь</label>
// // //                                         <input
// // //                                             type="text"
// // //                                             id="editDuilian"
// // //                                             value={editApplication.duilian}
// // //                                             onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// // //                                         />
// // //                                     </div>
// // //                                     {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// // //                                     <button type="submit" className={styles.submitButton}>
// // //                                         Зберегти
// // //                                     </button>
// // //                                     <button
// // //                                         type="button"
// // //                                         className={styles.cancelButton}
// // //                                         onClick={() => setEditApplication(null)}
// // //                                     >
// // //                                         Скасувати
// // //                                     </button>
// // //                                 </form>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     <button className={styles.logoutButton} onClick={handleLogout}>
// // //                         Вийти
// // //                     </button>
// // //                 </>
// // //             )}
// // //             {showMyAthletes && (
// // //                 <div className={styles.formWrapper}>
// // //                     <div className={styles.athleteFormContainer}>
// // //                         <h3>Мої атлети</h3>
// // //                         <table className={styles.athleteTable}>
// // //                             <thead>
// // //                             <tr>
// // //                                 <th>Ім'я</th>
// // //                                 <th>Прізвище</th>
// // //                                 <th>Дата народження</th>
// // //                                 <th>Тип програми</th>
// // //                                 <th>Дії</th>
// // //                             </tr>
// // //                             </thead>
// // //                             <tbody>
// // //                             {myAthletes.map((athlete) => (
// // //                                 <tr key={athlete.id}>
// // //                                     <td>{athlete.firstName}</td>
// // //                                     <td>{athlete.lastName}</td>
// // //                                     <td>{athlete.birthDate}</td>
// // //                                     <td>
// // //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// // //                                             ? "Традиційне таолу"
// // //                                             : athlete.programType === "CONTACT"
// // //                                                 ? "Контактні види"
// // //                                                 : "Спортивне таолу"}
// // //                                     </td>
// // //                                     <td>
// // //                                         <button
// // //                                             className={styles.editButton}
// // //                                             onClick={() => handleEditAthlete(athlete)}
// // //                                         >
// // //                                             Редагувати
// // //                                         </button>
// // //                                         <button
// // //                                             className={styles.deleteButton}
// // //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// // //                                         >
// // //                                             Видалити
// // //                                         </button>
// // //                                     </td>
// // //                                 </tr>
// // //                             ))}
// // //                             </tbody>
// // //                         </table>
// // //                         <button
// // //                             className={styles.cancelButton}
// // //                             onClick={() => setShowMyAthletes(false)}
// // //                         >
// // //                             Закрити
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //             {editAthlete && (
// // //                 <div className={styles.formWrapper}>
// // //                     <div className={styles.editFormContainer}>
// // //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// // //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// // //                             <div className={styles.inputGroup}>
// // //                                 <label htmlFor="editFirstName">Ім'я</label>
// // //                                 <input
// // //                                     type="text"
// // //                                     id="editFirstName"
// // //                                     value={editAthlete.firstName}
// // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// // //                                     required
// // //                                 />
// // //                             </div>
// // //                             <div className={styles.inputGroup}>
// // //                                 <label htmlFor="editLastName">Прізвище</label>
// // //                                 <input
// // //                                     type="text"
// // //                                     id="editLastName"
// // //                                     value={editAthlete.lastName}
// // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// // //                                     required
// // //                                 />
// // //                             </div>
// // //                             <div className={styles.inputGroup}>
// // //                                 <label htmlFor="editBirthDate">Дата народження</label>
// // //                                 <input
// // //                                     type="date"
// // //                                     id="editBirthDate"
// // //                                     value={editAthlete.birthDate}
// // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// // //                                     required
// // //                                 />
// // //                             </div>
// // //                             <div className={styles.inputGroup}>
// // //                                 <label htmlFor="editProgramType">Тип програми</label>
// // //                                 <select
// // //                                     id="editProgramType"
// // //                                     value={editAthlete.programType}
// // //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// // //                                     required
// // //                                 >
// // //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// // //                                     <option value="CONTACT">Контактні види</option>
// // //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// // //                                 </select>
// // //                             </div>
// // //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// // //                             <button type="submit" className={styles.submitButton}>
// // //                                 Зберегти
// // //                             </button>
// // //                             <button
// // //                                 type="button"
// // //                                 className={styles.cancelButton}
// // //                                 onClick={() => setEditAthlete(null)}
// // //                             >
// // //                                 Скасувати
// // //                             </button>
// // //                         </form>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }
// //
// //
// // //----------
// //
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0]; // Відрізаємо час, залишаємо лише YYYY-MM-DD
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //             return;
// //         }
// //
// //         try {
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //     };
// //
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 username: editUser.username,
// //                 password: editPassword,
// //             });
// //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //             setEditUser(null);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             // Форматуємо дати при отриманні
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!showMyAthletes && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <button
// //                                 className={styles.registerButton}
// //                                 onClick={() => setShowRegisterForm(!showRegisterForm)}
// //                             >
// //                                 {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                             </button>
// //                             <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                 {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                             </button>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.username}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 {showMyApplications ? "Приховати заявки" : "Перевірити заявку"}
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                         </>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showMyApplications && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Мої заявки</h3>
// //                                 <table className={styles.athleteTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Назва змагання</th>
// //                                         <th>Ім'я</th>
// //                                         <th>Прізвище</th>
// //                                         <th>Дата народження</th>
// //                                         <th>Стать</th>
// //                                         <th>Вікова категорія</th>
// //                                         <th>Програма без зброї</th>
// //                                         <th>Коротка зброя</th>
// //                                         <th>Довга зброя</th>
// //                                         <th>Дуйлянь</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {myApplications.map((application) => (
// //                                         <tr key={application.id}>
// //                                             <td>{application.competitionName}</td>
// //                                             <td>{application.athleteFirstName}</td>
// //                                             <td>{application.athleteLastName}</td>
// //                                             <td>{application.birthDate}</td>
// //                                             <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                             <td>
// //                                                 {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                                     application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                         application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                             application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                                 "Дорослі: 18 років і старше"}
// //                                             </td>
// //                                             <td>{application.weaponlessProgram || "--"}</td>
// //                                             <td>{application.shortWeaponProgram || "--"}</td>
// //                                             <td>{application.longWeaponProgram || "--"}</td>
// //                                             <td>{application.duilian || "--"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditApplication(application)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                                 <button
// //                                                     className={styles.deleteButton}
// //                                                     onClick={() => handleDeleteApplication(application.id!)}
// //                                                 >
// //                                                     Видалити
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                                 <button
// //                                     className={styles.cancelButton}
// //                                     onClick={() => setShowMyApplications(false)}
// //                                 >
// //                                     Закрити
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {editApplication && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                                 <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                         <input
// //                                             type="text"
// //                                             id="editCompetitionName"
// //                                             value={editApplication.competitionName}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                         <input
// //                                             type="text"
// //                                             id="editAthleteFirstName"
// //                                             value={editApplication.athleteFirstName}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                         <input
// //                                             type="text"
// //                                             id="editAthleteLastName"
// //                                             value={editApplication.athleteLastName}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editBirthDate">Дата народження</label>
// //                                         <input
// //                                             type="date"
// //                                             id="editBirthDate"
// //                                             value={editApplication.birthDate}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editGender">Стать</label>
// //                                         <select
// //                                             id="editGender"
// //                                             value={editApplication.gender}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                             required
// //                                         >
// //                                             <option value="MALE">Чоловік</option>
// //                                             <option value="FEMALE">Жінка</option>
// //                                         </select>
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                         <select
// //                                             id="editAgeCategory"
// //                                             value={editApplication.ageCategory}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                             required
// //                                         >
// //                                             <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                             <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                             <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                             <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                             <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                         </select>
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                         <select
// //                                             id="editWeaponlessProgram"
// //                                             value={editApplication.weaponlessProgram || ""}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                         >
// //                                             <option value="">--</option>
// //                                             <option value="CHANG_QUAN">Чан цюань</option>
// //                                             <option value="NAN_QUAN">Нань цюань</option>
// //                                             <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                         </select>
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                         <select
// //                                             id="editShortWeaponProgram"
// //                                             value={editApplication.shortWeaponProgram || ""}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                         >
// //                                             <option value="">--</option>
// //                                             <option value="DAO_SHU">Дао шу</option>
// //                                             <option value="JIAN_SHU">Цзянь шу</option>
// //                                             <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                             <option value="NAN_DAO">Нань дао</option>
// //                                             <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                         </select>
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                         <select
// //                                             id="editLongWeaponProgram"
// //                                             value={editApplication.longWeaponProgram || ""}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                         >
// //                                             <option value="">--</option>
// //                                             <option value="GUN_SHU">Гунь шу</option>
// //                                             <option value="QIANG_SHU">Цян шу</option>
// //                                             <option value="NAN_GUN">Нань гунь</option>
// //                                         </select>
// //                                     </div>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editDuilian">Дуйлянь</label>
// //                                         <input
// //                                             type="text"
// //                                             id="editDuilian"
// //                                             value={editApplication.duilian}
// //                                             onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                         />
// //                                     </div>
// //                                     {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditApplication(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     <button className={styles.logoutButton} onClick={handleLogout}>
// //                         Вийти
// //                     </button>
// //                 </>
// //             )}
// //             {showMyAthletes && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editFirstName"
// //                                     value={editAthlete.firstName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editLastName"
// //                                     value={editAthlete.lastName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editAthlete.birthDate}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editProgramType">Тип програми</label>
// //                                 <select
// //                                     id="editProgramType"
// //                                     value={editAthlete.programType}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                     <option value="CONTACT">Контактні види</option>
// //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                 </select>
// //                             </div>
// //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={() => setEditAthlete(null)}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
//
//
//
// //-------
// //
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0];
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //             return;
// //         }
// //
// //         try {
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //     };
// //
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 username: editUser.username,
// //                 password: editPassword,
// //             });
// //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //             setEditUser(null);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setShowNonContactForm(false);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditApplication(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //         setShowMyAthletes(false);
// //         setShowMyApplications(false);
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setShowMyAthletes(true);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleCancelEditAthlete = () => {
// //         setEditAthlete(null);
// //         setShowMyAthletes(true);
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setShowAthleteForm(false);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             setEditApplication(null);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyAthletes(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditAthlete(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //         setShowMyApplications(false);
// //         setShowMyAthletes(false);
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setShowMyApplications(true);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleCancelEditApplication = () => {
// //         setEditApplication(null);
// //         setShowMyApplications(true);
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!editAthlete && !editApplication && !showMyAthletes && !showMyApplications && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <button
// //                                 className={styles.registerButton}
// //                                 onClick={() => setShowRegisterForm(!showRegisterForm)}
// //                             >
// //                                 {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                             </button>
// //                             <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                 {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                             </button>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.username}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 Перевірити заявку
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                         </>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     <button className={styles.logoutButton} onClick={handleLogout}>
// //                         Вийти
// //                     </button>
// //                 </>
// //             )}
// //             {showMyAthletes && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editFirstName"
// //                                     value={editAthlete.firstName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editLastName"
// //                                     value={editAthlete.lastName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editAthlete.birthDate}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editProgramType">Тип програми</label>
// //                                 <select
// //                                     id="editProgramType"
// //                                     value={editAthlete.programType}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                     <option value="CONTACT">Контактні види</option>
// //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                 </select>
// //                             </div>
// //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditAthlete}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showMyApplications && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої заявки</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Назва змагання</th>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Стать</th>
// //                                 <th>Вікова категорія</th>
// //                                 <th>Програма без зброї</th>
// //                                 <th>Коротка зброя</th>
// //                                 <th>Довга зброя</th>
// //                                 <th>Дуйлянь</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myApplications.map((application) => (
// //                                 <tr key={application.id}>
// //                                     <td>{application.competitionName}</td>
// //                                     <td>{application.athleteFirstName}</td>
// //                                     <td>{application.athleteLastName}</td>
// //                                     <td>{application.birthDate}</td>
// //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                     <td>
// //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                         "Дорослі: 18 років і старше"}
// //                                     </td>
// //                                     <td>{application.weaponlessProgram || "--"}</td>
// //                                     <td>{application.shortWeaponProgram || "--"}</td>
// //                                     <td>{application.longWeaponProgram || "--"}</td>
// //                                     <td>{application.duilian || "--"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditApplication(application)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteApplication(application.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyApplications(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editCompetitionName"
// //                                     value={editApplication.competitionName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteFirstName"
// //                                     value={editApplication.athleteFirstName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteLastName"
// //                                     value={editApplication.athleteLastName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editApplication.birthDate}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editGender">Стать</label>
// //                                 <select
// //                                     id="editGender"
// //                                     value={editApplication.gender}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="MALE">Чоловік</option>
// //                                     <option value="FEMALE">Жінка</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                 <select
// //                                     id="editAgeCategory"
// //                                     value={editApplication.ageCategory}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                 <select
// //                                     id="editWeaponlessProgram"
// //                                     value={editApplication.weaponlessProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="CHANG_QUAN">Чан цюань</option>
// //                                     <option value="NAN_QUAN">Нань цюань</option>
// //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                 <select
// //                                     id="editShortWeaponProgram"
// //                                     value={editApplication.shortWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="DAO_SHU">Дао шу</option>
// //                                     <option value="JIAN_SHU">Цзянь шу</option>
// //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                     <option value="NAN_DAO">Нань дао</option>
// //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                 <select
// //                                     id="editLongWeaponProgram"
// //                                     value={editApplication.longWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="GUN_SHU">Гунь шу</option>
// //                                     <option value="QIANG_SHU">Цян шу</option>
// //                                     <option value="NAN_GUN">Нань гунь</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editDuilian"
// //                                     value={editApplication.duilian}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                 />
// //                             </div>
// //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditApplication}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
//
// //============
// //
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0];
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //             return;
// //         }
// //
// //         try {
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //     };
// //
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 username: editUser.username,
// //                 password: editPassword,
// //             });
// //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //             setEditUser(null);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setShowNonContactForm(false);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditApplication(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //         setShowMyAthletes(false);
// //         setShowMyApplications(false);
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setShowMyAthletes(true);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleCancelEditAthlete = () => {
// //         setEditAthlete(null);
// //         setShowMyAthletes(true);
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setShowAthleteForm(false);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             setEditApplication(null);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyAthletes(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditAthlete(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //         setShowMyApplications(false);
// //         setShowMyAthletes(false);
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setShowMyApplications(true);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleCancelEditApplication = () => {
// //         setEditApplication(null);
// //         setShowMyApplications(true);
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!editAthlete && !editApplication && !showMyAthletes && !showMyApplications && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <button
// //                                 className={styles.registerButton}
// //                                 onClick={() => setShowRegisterForm(!showRegisterForm)}
// //                             >
// //                                 {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                             </button>
// //                             <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                 {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                             </button>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.username}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <div className={styles.buttonRow}>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 Перевірити заявку
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                         </div>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //             {showMyAthletes && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editFirstName"
// //                                     value={editAthlete.firstName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editLastName"
// //                                     value={editAthlete.lastName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editAthlete.birthDate}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editProgramType">Тип програми</label>
// //                                 <select
// //                                     id="editProgramType"
// //                                     value={editAthlete.programType}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                     <option value="CONTACT">Контактні види</option>
// //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                 </select>
// //                             </div>
// //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditAthlete}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showMyApplications && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої заявки</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Назва змагання</th>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Стать</th>
// //                                 <th>Вікова категорія</th>
// //                                 <th>Програма без зброї</th>
// //                                 <th>Коротка зброя</th>
// //                                 <th>Довга зброя</th>
// //                                 <th>Дуйлянь</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myApplications.map((application) => (
// //                                 <tr key={application.id}>
// //                                     <td>{application.competitionName}</td>
// //                                     <td>{application.athleteFirstName}</td>
// //                                     <td>{application.athleteLastName}</td>
// //                                     <td>{application.birthDate}</td>
// //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                     <td>
// //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                         "Дорослі: 18 років і старше"}
// //                                     </td>
// //                                     <td>{application.weaponlessProgram || "--"}</td>
// //                                     <td>{application.shortWeaponProgram || "--"}</td>
// //                                     <td>{application.longWeaponProgram || "--"}</td>
// //                                     <td>{application.duilian || "--"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditApplication(application)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteApplication(application.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyApplications(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editCompetitionName"
// //                                     value={editApplication.competitionName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteFirstName"
// //                                     value={editApplication.athleteFirstName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteLastName"
// //                                     value={editApplication.athleteLastName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editApplication.birthDate}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editGender">Стать</label>
// //                                 <select
// //                                     id="editGender"
// //                                     value={editApplication.gender}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="MALE">Чоловік</option>
// //                                     <option value="FEMALE">Жінка</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                 <select
// //                                     id="editAgeCategory"
// //                                     value={editApplication.ageCategory}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                 <select
// //                                     id="editWeaponlessProgram"
// //                                     value={editApplication.weaponlessProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="CHANG_QUAN">Чан цюань</option>
// //                                     <option value="NAN_QUAN">Нань цюань</option>
// //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                 <select
// //                                     id="editShortWeaponProgram"
// //                                     value={editApplication.shortWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="DAO_SHU">Дао шу</option>
// //                                     <option value="JIAN_SHU">Цзянь шу</option>
// //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                     <option value="NAN_DAO">Нань дао</option>
// //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                 <select
// //                                     id="editLongWeaponProgram"
// //                                     value={editApplication.longWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="GUN_SHU">Гунь шу</option>
// //                                     <option value="QIANG_SHU">Цян шу</option>
// //                                     <option value="NAN_GUN">Нань гунь</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editDuilian"
// //                                     value={editApplication.duilian}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                 />
// //                             </div>
// //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditApplication}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication, deleteUser } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0];
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //             return;
// //         }
// //
// //         try {
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //     };
// //
// //     const handleDeleteUser = async (username: string) => {
// //         try {
// //             await deleteUser(username);
// //             setUsers(users.filter((u) => u.username !== username));
// //             setSuccessMessage("Користувача видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("User not found")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося видалити користувача";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 username: editUser.username,
// //                 password: editPassword,
// //             });
// //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //             setEditUser(null);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setShowNonContactForm(false);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditApplication(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //         setShowMyAthletes(false);
// //         setShowMyApplications(false);
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setShowMyAthletes(true);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleCancelEditAthlete = () => {
// //         setEditAthlete(null);
// //         setShowMyAthletes(true);
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setShowAthleteForm(false);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             setEditApplication(null);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyAthletes(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditAthlete(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //         setShowMyApplications(false);
// //         setShowMyAthletes(false);
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setShowMyApplications(true);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleCancelEditApplication = () => {
// //         setEditApplication(null);
// //         setShowMyApplications(true);
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!editAthlete && !editApplication && !showMyAthletes && !showMyApplications && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <button
// //                                 className={styles.registerButton}
// //                                 onClick={() => {
// //                                     setShowRegisterForm(!showRegisterForm);
// //                                     setShowUsersTable(false);
// //                                 }}
// //                             >
// //                                 {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                             </button>
// //                             <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                 {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.username}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                                 <button
// //                                                     className={styles.deleteButton}
// //                                                     onClick={() => handleDeleteUser(u.username)}
// //                                                 >
// //                                                     Видалити
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <div className={styles.buttonRow}>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 Перевірити заявку
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                         </div>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //             {showMyAthletes && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editFirstName"
// //                                     value={editAthlete.firstName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editLastName"
// //                                     value={editAthlete.lastName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editAthlete.birthDate}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editProgramType">Тип програми</label>
// //                                 <select
// //                                     id="editProgramType"
// //                                     value={editAthlete.programType}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                     <option value="CONTACT">Контактні види</option>
// //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                 </select>
// //                             </div>
// //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditAthlete}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showMyApplications && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої заявки</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Назва змагання</th>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Стать</th>
// //                                 <th>Вікова категорія</th>
// //                                 <th>Програма без зброї</th>
// //                                 <th>Коротка зброя</th>
// //                                 <th>Довга зброя</th>
// //                                 <th>Дуйлянь</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myApplications.map((application) => (
// //                                 <tr key={application.id}>
// //                                     <td>{application.competitionName}</td>
// //                                     <td>{application.athleteFirstName}</td>
// //                                     <td>{application.athleteLastName}</td>
// //                                     <td>{application.birthDate}</td>
// //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                     <td>
// //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                         "Дорослі: 18 років і старше"}
// //                                     </td>
// //                                     <td>{application.weaponlessProgram || "--"}</td>
// //                                     <td>{application.shortWeaponProgram || "--"}</td>
// //                                     <td>{application.longWeaponProgram || "--"}</td>
// //                                     <td>{application.duilian || "--"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditApplication(application)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteApplication(application.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyApplications(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editCompetitionName"
// //                                     value={editApplication.competitionName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteFirstName"
// //                                     value={editApplication.athleteFirstName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteLastName"
// //                                     value={editApplication.athleteLastName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editApplication.birthDate}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editGender">Стать</label>
// //                                 <select
// //                                     id="editGender"
// //                                     value={editApplication.gender}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="MALE">Чоловік</option>
// //                                     <option value="FEMALE">Жінка</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                 <select
// //                                     id="editAgeCategory"
// //                                     value={editApplication.ageCategory}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                 <select
// //                                     id="editWeaponlessProgram"
// //                                     value={editApplication.weaponlessProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="CHANG_QUAN">Чан цюань</option>
// //                                     <option value="NAN_QUAN">Нань цюань</option>
// //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                 <select
// //                                     id="editShortWeaponProgram"
// //                                     value={editApplication.shortWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="DAO_SHU">Дао шу</option>
// //                                     <option value="JIAN_SHU">Цзянь шу</option>
// //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                     <option value="NAN_DAO">Нань дао</option>
// //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                 <select
// //                                     id="editLongWeaponProgram"
// //                                     value={editApplication.longWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="GUN_SHU">Гунь шу</option>
// //                                     <option value="QIANG_SHU">Цян шу</option>
// //                                     <option value="NAN_GUN">Нань гунь</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editDuilian"
// //                                     value={editApplication.duilian}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                 />
// //                             </div>
// //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditApplication}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
//
// //=======
// //
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication, deleteUser } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0];
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //
// //             return;
// //         }
// //
// //         try {
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //             setShowRegisterForm(false);
// //
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //     };
// //
// //     const handleDeleteUser = async (username: string) => {
// //         try {
// //             await deleteUser(username);
// //             setUsers(users.filter((u) => u.username !== username));
// //             setSuccessMessage("Користувача видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("User not found")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося видалити користувача";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 username: editUser.username,
// //                 password: editPassword,
// //             });
// //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //             setEditUser(null);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setShowNonContactForm(false);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditApplication(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //         setShowMyAthletes(false);
// //         setShowMyApplications(false);
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setShowMyAthletes(true);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleCancelEditAthlete = () => {
// //         setEditAthlete(null);
// //         setShowMyAthletes(true);
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setShowAthleteForm(false);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             setEditApplication(null);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyAthletes(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditAthlete(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //         setShowMyApplications(false);
// //         setShowMyAthletes(false);
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setShowMyApplications(true);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleCancelEditApplication = () => {
// //         setEditApplication(null);
// //         setShowMyApplications(true);
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!editAthlete && !editApplication && !showMyAthletes && !showMyApplications && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <button
// //                                 className={styles.registerButton}
// //                                 onClick={() => {
// //                                     setShowRegisterForm(!showRegisterForm);
// //                                     setShowUsersTable(false);
// //                                 }}
// //                             >
// //                                 {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                             </button>
// //                             <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                 {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.username}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                                 <button
// //                                                     className={styles.deleteButton}
// //                                                     onClick={() => handleDeleteUser(u.username)}
// //                                                 >
// //                                                     Видалити
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <div className={styles.buttonRow}>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 Перевірити заявку
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                         </div>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //             {showMyAthletes && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editFirstName"
// //                                     value={editAthlete.firstName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editLastName"
// //                                     value={editAthlete.lastName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editAthlete.birthDate}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editProgramType">Тип програми</label>
// //                                 <select
// //                                     id="editProgramType"
// //                                     value={editAthlete.programType}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                     <option value="CONTACT">Контактні види</option>
// //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                 </select>
// //                             </div>
// //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditAthlete}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showMyApplications && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої заявки</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Назва змагання</th>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Стать</th>
// //                                 <th>Вікова категорія</th>
// //                                 <th>Програма без зброї</th>
// //                                 <th>Коротка зброя</th>
// //                                 <th>Довга зброя</th>
// //                                 <th>Дуйлянь</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myApplications.map((application) => (
// //                                 <tr key={application.id}>
// //                                     <td>{application.competitionName}</td>
// //                                     <td>{application.athleteFirstName}</td>
// //                                     <td>{application.athleteLastName}</td>
// //                                     <td>{application.birthDate}</td>
// //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                     <td>
// //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                         "Дорослі: 18 років і старше"}
// //                                     </td>
// //                                     <td>{application.weaponlessProgram || "--"}</td>
// //                                     <td>{application.shortWeaponProgram || "--"}</td>
// //                                     <td>{application.longWeaponProgram || "--"}</td>
// //                                     <td>{application.duilian || "--"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditApplication(application)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteApplication(application.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyApplications(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editCompetitionName"
// //                                     value={editApplication.competitionName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteFirstName"
// //                                     value={editApplication.athleteFirstName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteLastName"
// //                                     value={editApplication.athleteLastName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editApplication.birthDate}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editGender">Стать</label>
// //                                 <select
// //                                     id="editGender"
// //                                     value={editApplication.gender}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="MALE">Чоловік</option>
// //                                     <option value="FEMALE">Жінка</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                 <select
// //                                     id="editAgeCategory"
// //                                     value={editApplication.ageCategory}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                 <select
// //                                     id="editWeaponlessProgram"
// //                                     value={editApplication.weaponlessProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="CHANG_QUAN">Чан цюань</option>
// //                                     <option value="NAN_QUAN">Нань цюань</option>
// //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                 <select
// //                                     id="editShortWeaponProgram"
// //                                     value={editApplication.shortWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="DAO_SHU">Дао шу</option>
// //                                     <option value="JIAN_SHU">Цзянь шу</option>
// //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                     <option value="NAN_DAO">Нань дао</option>
// //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                 <select
// //                                     id="editLongWeaponProgram"
// //                                     value={editApplication.longWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="GUN_SHU">Гунь шу</option>
// //                                     <option value="QIANG_SHU">Цян шу</option>
// //                                     <option value="NAN_GUN">Нань гунь</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editDuilian"
// //                                     value={editApplication.duilian}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                 />
// //                             </div>
// //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditApplication}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
// //=================================================
// //
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication, deleteUser } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0];
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //             return;
// //         }
// //
// //         try {
// //             setShowRegisterForm(false);
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //     };
// //
// //     const handleDeleteUser = async (username: string) => {
// //         try {
// //             await deleteUser(username);
// //             setUsers(users.filter((u) => u.username !== username));
// //             setSuccessMessage("Користувача видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("User not found")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося видалити користувача";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 username: editUser.username,
// //                 password: editPassword,
// //             });
// //             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //             setEditUser(null);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setShowNonContactForm(false);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditApplication(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //         setShowMyAthletes(false);
// //         setShowMyApplications(false);
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setShowMyAthletes(true);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleCancelEditAthlete = () => {
// //         setEditAthlete(null);
// //         setShowMyAthletes(true);
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setShowAthleteForm(false);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             setEditApplication(null);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyAthletes(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditAthlete(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //         setShowMyApplications(false);
// //         setShowMyAthletes(false);
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setShowMyApplications(true);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleCancelEditApplication = () => {
// //         setEditApplication(null);
// //         setShowMyApplications(true);
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!editAthlete && !editApplication && !showMyAthletes && !showMyApplications && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <div className={styles.buttonRow}>
// //                                 <button
// //                                     className={styles.registerButton}
// //                                     onClick={() => {
// //                                         setShowRegisterForm(!showRegisterForm);
// //                                         setShowUsersTable(false);
// //                                     }}
// //                                 >
// //                                     {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                                 </button>
// //                                 <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                     {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                                 </button>
// //                                 <button className={styles.logoutButton} onClick={handleLogout}>
// //                                     Вийти
// //                                 </button>
// //                             </div>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.username}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                                 <button
// //                                                     className={styles.deleteButton}
// //                                                     onClick={() => handleDeleteUser(u.username)}
// //                                                 >
// //                                                     Видалити
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <div className={styles.buttonRow}>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 Перевірити заявку
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                         </div>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //             {showMyAthletes && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         -                        <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                         <div className={styles.inputGroup}>
// //                             <label htmlFor="editFirstName">Ім'я</label>
// //                             <input
// //                                 type="text"
// //                                 id="editFirstName"
// //                                 value={editAthlete.firstName}
// //                                 onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                 required
// //                             />
// //                         </div>
// //                         <div className={styles.inputGroup}>
// //                             <label htmlFor="editLastName">Прізвище</label>
// //                             <input
// //                                 type="text"
// //                                 id="editLastName"
// //                                 value={editAthlete.lastName}
// //                                 onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                 required
// //                             />
// //                         </div>
// //                         <div className={styles.inputGroup}>
// //                             <label htmlFor="editBirthDate">Дата народження</label>
// //                             <input
// //                                 type="date"
// //                                 id="editBirthDate"
// //                                 value={editAthlete.birthDate}
// //                                 onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                 required
// //                             />
// //                         </div>
// //                         <div className={styles.inputGroup}>
// //                             <label htmlFor="editProgramType">Тип програми</label>
// //                             <select
// //                                 id="editProgramType"
// //                                 value={editAthlete.programType}
// //                                 onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                 required
// //                             >
// //                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                 <option value="CONTACT">Контактні види</option>
// //                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                             </select>
// //                         </div>
// //                         {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                         <button type="submit" className={styles.submitButton}>
// //                             Зберегти
// //                         </button>
// //                         <button
// //                             type="button"
// //                             className={styles.cancelButton}
// //                             onClick={handleCancelEditAthlete}
// //                         >
// //                             Скасувати
// //                         </button>
// //                     </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showMyApplications && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої заявки</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Назва змагання</th>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Стать</th>
// //                                 <th>Вікова категорія</th>
// //                                 <th>Програма без зброї</th>
// //                                 <th>Коротка зброя</th>
// //                                 <th>Довга зброя</th>
// //                                 <th>Дуйлянь</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myApplications.map((application) => (
// //                                 <tr key={application.id}>
// //                                     <td>{application.competitionName}</td>
// //                                     <td>{application.athleteFirstName}</td>
// //                                     <td>{application.athleteLastName}</td>
// //                                     <td>{application.birthDate}</td>
// //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                     <td>
// //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                         "Дорослі: 18 років і старше"}
// //                                     </td>
// //                                     <td>{application.weaponlessProgram || "--"}</td>
// //                                     <td>{application.shortWeaponProgram || "--"}</td>
// //                                     <td>{application.longWeaponProgram || "--"}</td>
// //                                     <td>{application.duilian || "--"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditApplication(application)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteApplication(application.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyApplications(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editCompetitionName"
// //                                     value={editApplication.competitionName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteFirstName"
// //                                     value={editApplication.athleteFirstName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteLastName"
// //                                     value={editApplication.athleteLastName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editApplication.birthDate}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editGender">Стать</label>
// //                                 <select
// //                                     id="editGender"
// //                                     value={editApplication.gender}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="MALE">Чоловік</option>
// //                                     <option value="FEMALE">Жінка</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                 <select
// //                                     id="editAgeCategory"
// //                                     value={editApplication.ageCategory}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                 <select
// //                                     id="editWeaponlessProgram"
// //                                     value={editApplication.weaponlessProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="CHANG_QUAN">Чан цюань</option>
// //                                     <option value="NAN_QUAN">Нань цюань</option>
// //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                 <select
// //                                     id="editShortWeaponProgram"
// //                                     value={editApplication.shortWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="DAO_SHU">Дао шу</option>
// //                                     <option value="JIAN_SHU">Цзянь шу</option>
// //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                     <option value="NAN_DAO">Нань дао</option>
// //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                 <select
// //                                     id="editLongWeaponProgram"
// //                                     value={editApplication.longWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="GUN_SHU">Гунь шу</option>
// //                                     <option value="QIANG_SHU">Цян шу</option>
// //                                     <option value="NAN_GUN">Нань гунь</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editDuilian"
// //                                     value={editApplication.duilian}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                 />
// //                             </div>
// //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditApplication}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
//
//
// //====================================================
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication, deleteUser } from "@/services/api.service";
// // import { UserDTO, AthleteDTO, CompetitionApplicationDTO } from "@/types/auth";
// // import RegisterForm from "@/components/RegisterForm";
// //
// // export default function Cabinet() {
// //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// //     const [successMessage, setSuccessMessage] = useState("");
// //     const [showUsersTable, setShowUsersTable] = useState(false);
// //     const [users, setUsers] = useState<UserDTO[]>([]);
// //     const [editUser, setEditUser] = useState<UserDTO | null>(null);
// //     const [editPassword, setEditPassword] = useState("");
// //     const [editUserError, setEditUserError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
// //     const [showMyAthletes, setShowMyAthletes] = useState(false);
// //     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
// //     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
// //     const [editAthleteError, setEditAthleteError] = useState("");
// //     const [showNonContactForm, setShowNonContactForm] = useState(false);
// //     const [nonContactCount, setNonContactCount] = useState(1);
// //     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [nonContactError, setNonContactError] = useState("");
// //     const [showMyApplications, setShowMyApplications] = useState(false);
// //     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
// //     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
// //     const [editApplicationError, setEditApplicationError] = useState("");
// //     const router = useRouter();
// //
// //     useEffect(() => {
// //         const token = localStorage.getItem("accessToken");
// //         if (!token) {
// //             router.push("/");
// //             return;
// //         }
// //
// //         const decodedToken = parseJwt(token);
// //         setUser({
// //             username: decodedToken.sub,
// //             roles: decodedToken.roles || [],
// //         });
// //     }, [router]);
// //
// //     const parseJwt = (token: string) => {
// //         try {
// //             const base64Url = token.split(".")[1];
// //             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //             const jsonPayload = decodeURIComponent(
// //                 atob(base64)
// //                     .split("")
// //                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
// //                     .join("")
// //             );
// //             return JSON.parse(jsonPayload);
// //         } catch (e) {
// //             return {};
// //         }
// //     };
// //
// //     const formatDate = (dateString: string): string => {
// //         if (!dateString) return "";
// //         return dateString.split("T")[0];
// //     };
// //
// //     const handleLogout = () => {
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");
// //         router.push("/");
// //     };
// //
// //     const handleRegisterSuccess = () => {
// //         setSuccessMessage("Нового користувача створено");
// //         setShowRegisterForm(false);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //     };
// //
// //     const handleShowUsers = async () => {
// //         if (showUsersTable) {
// //             setShowUsersTable(false);
// //             return;
// //         }
// //
// //         try {
// //             setShowRegisterForm(false);
// //             const usersData = await getAllUsers();
// //             setUsers(usersData);
// //             setShowUsersTable(true);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditUser = (user: UserDTO) => {
// //         setEditUser(user);
// //         setEditPassword("");
// //         setShowUsersTable(false);
// //     };
// //
// //     const handleDeleteUser = async (id: number) => {
// //         try {
// //             await deleteUser(id);
// //             setUsers(users.filter((u) => u.id !== id));
// //             setSuccessMessage("Користувача видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("User not found")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося видалити користувача";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     // const handleUpdateUser = async (e: React.FormEvent) => {
// //     //     e.preventDefault();
// //     //     if (!editUser) return;
// //     //
// //     //     try {
// //     //         const updatedUser = await updateUser(editUser.username, {
// //     //             username: editUser.username,
// //     //             password: editPassword,
// //     //         });
// //     //         setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
// //     //         setEditUser(null);
// //     //         setSuccessMessage("Користувача оновлено");
// //     //         setTimeout(() => setSuccessMessage(""), 3000);
// //     //     } catch (error: any) {
// //     //         const message = error.message.includes("Користувача не знайдено")
// //     //             ? "Користувача не знайдено"
// //     //             : error.message || "Не вдалося оновити користувача";
// //     //         setEditUserError(message);
// //     //     }
// //     // };
// //     const handleUpdateUser = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editUser) return;
// //
// //         try {
// //             const updatedUser = await updateUser(editUser.username, {
// //                 id: editUser.id,
// //                 username: editUser.username,
// //                 password: editPassword,
// //                 roles: editUser.roles || [],
// //             });
// //             setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
// //             setEditUser(null);
// //             setShowUsersTable(true);
// //             setSuccessMessage("Користувача оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Користувача не знайдено")
// //                 ? "Користувача не знайдено"
// //                 : error.message || "Не вдалося оновити користувача";
// //             setEditUserError(message);
// //         }
// //     };
// //
// //     const handleAddAthlete = () => {
// //         setShowAthleteForm(true);
// //         setShowNonContactForm(false);
// //         setAthleteCount(1);
// //         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
// //     };
// //
// //     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setAthleteCount(Math.max(1, count));
// //         setAthletes(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
// //                 )
// //         );
// //     };
// //
// //     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
// //         const newAthletes = [...athletes];
// //         newAthletes[index] = { ...newAthletes[index], [field]: value };
// //         setAthletes(newAthletes);
// //     };
// //
// //     const handleAddAthletes = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setAthleteError("");
// //
// //         try {
// //             for (const athlete of athletes) {
// //                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
// //                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
// //                 }
// //                 await createAthlete(athlete);
// //             }
// //             setSuccessMessage("Атлетів додано");
// //             setShowAthleteForm(false);
// //             setAthleteCount(1);
// //             setAthletes([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setAthleteError(error.message || "Не вдалося додати атлетів");
// //         }
// //     };
// //
// //     const handleShowMyAthletes = async () => {
// //         if (showMyAthletes) {
// //             setShowMyAthletes(false);
// //             setEditAthlete(null);
// //             return;
// //         }
// //
// //         try {
// //             const athletesData = await getMyAthletes();
// //             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
// //                 ...athlete,
// //                 birthDate: formatDate(athlete.birthDate),
// //             }));
// //             setMyAthletes(formattedAthletes);
// //             setShowMyAthletes(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyApplications(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditApplication(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditAthlete = (athlete: AthleteDTO) => {
// //         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
// //         setShowMyAthletes(false);
// //         setShowMyApplications(false);
// //     };
// //
// //     const handleUpdateAthlete = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editAthlete || !editAthlete.id) return;
// //
// //         try {
// //             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
// //             setMyAthletes(
// //                 myAthletes.map((a) =>
// //                     a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
// //                 )
// //             );
// //             setEditAthlete(null);
// //             setShowMyAthletes(true);
// //             setSuccessMessage("Дані атлета оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете редагувати цього атлета"
// //                     : error.message || "Не вдалося оновити атлета";
// //             setEditAthleteError(message);
// //         }
// //     };
// //
// //     const handleCancelEditAthlete = () => {
// //         setEditAthlete(null);
// //         setShowMyAthletes(true);
// //     };
// //
// //     const handleDeleteAthlete = async (id: number) => {
// //         try {
// //             await deleteAthlete(id);
// //             setMyAthletes(myAthletes.filter((a) => a.id !== id));
// //             setSuccessMessage("Атлета видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Athlete not found")
// //                 ? "Атлета не знайдено"
// //                 : error.message.includes("Athlete is owned by another user")
// //                     ? "Ви не можете видалити цього атлета"
// //                     : error.message || "Не вдалося видалити атлета";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleNonContactApplication = () => {
// //         setShowNonContactForm(true);
// //         setShowAthleteForm(false);
// //         setNonContactCount(1);
// //         setNonContactApplications([{
// //             competitionName: "",
// //             athleteFirstName: "",
// //             athleteLastName: "",
// //             birthDate: "",
// //             gender: "MALE",
// //             ageCategory: "YOUNGER_JUNIORS_6_8",
// //             weaponlessProgram: undefined,
// //             shortWeaponProgram: undefined,
// //             longWeaponProgram: undefined,
// //             duilian: ""
// //         }]);
// //     };
// //
// //     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const count = parseInt(e.target.value) || 1;
// //         setNonContactCount(Math.max(1, count));
// //         setNonContactApplications(
// //             Array(count)
// //                 .fill(null)
// //                 .map((_, i) =>
// //                         nonContactApplications[i] || {
// //                             competitionName: "",
// //                             athleteFirstName: "",
// //                             athleteLastName: "",
// //                             birthDate: "",
// //                             gender: "MALE",
// //                             ageCategory: "YOUNGER_JUNIORS_6_8",
// //                             weaponlessProgram: undefined,
// //                             shortWeaponProgram: undefined,
// //                             longWeaponProgram: undefined,
// //                             duilian: ""
// //                         }
// //                 )
// //         );
// //     };
// //
// //     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
// //         const newApplications = [...nonContactApplications];
// //         newApplications[index] = { ...newApplications[index], [field]: value };
// //         setNonContactApplications(newApplications);
// //     };
// //
// //     const handleAddNonContactApplications = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setNonContactError("");
// //
// //         try {
// //             for (const application of nonContactApplications) {
// //                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
// //                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
// //                 }
// //                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //             }
// //             setSuccessMessage("Заявки подано");
// //             setShowNonContactForm(false);
// //             setNonContactCount(1);
// //             setNonContactApplications([]);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             setNonContactError(error.message || "Не вдалося подати заявки");
// //         }
// //     };
// //
// //     const handleShowMyApplications = async () => {
// //         if (showMyApplications) {
// //             setShowMyApplications(false);
// //             setEditApplication(null);
// //             return;
// //         }
// //
// //         try {
// //             const applicationsData = await getMyApplications();
// //             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
// //                 ...app,
// //                 birthDate: formatDate(app.birthDate),
// //             }));
// //             setMyApplications(formattedApplications);
// //             setShowMyApplications(true);
// //             setShowAthleteForm(false);
// //             setShowNonContactForm(false);
// //             setShowMyAthletes(false);
// //             setShowUsersTable(false);
// //             setEditUser(null);
// //             setEditAthlete(null);
// //         } catch (error: any) {
// //             setSuccessMessage(`Помилка: ${error.message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleEditApplication = (application: CompetitionApplicationDTO) => {
// //         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
// //         setShowMyApplications(false);
// //         setShowMyAthletes(false);
// //     };
// //
// //     const handleUpdateApplication = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!editApplication || !editApplication.id) return;
// //
// //         try {
// //             const updatedApplication = await updateApplication(editApplication.id, editApplication);
// //             setMyApplications(
// //                 myApplications.map((a) =>
// //                     a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
// //                 )
// //             );
// //             setEditApplication(null);
// //             setShowMyApplications(true);
// //             setSuccessMessage("Дані заявки оновлено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете редагувати цю заявку"
// //                     : error.message || "Не вдалося оновити заявку";
// //             setEditApplicationError(message);
// //         }
// //     };
// //
// //     const handleCancelEditApplication = () => {
// //         setEditApplication(null);
// //         setShowMyApplications(true);
// //     };
// //
// //     const handleDeleteApplication = async (id: number) => {
// //         try {
// //             await deleteApplication(id);
// //             setMyApplications(myApplications.filter((a) => a.id !== id));
// //             setSuccessMessage("Заявку видалено");
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         } catch (error: any) {
// //             const message = error.message.includes("Competition application not found")
// //                 ? "Заявку не знайдено"
// //                 : error.message.includes("Application is owned by another user")
// //                     ? "Ви не можете видалити цю заявку"
// //                     : error.message || "Не вдалося видалити заявку";
// //             setSuccessMessage(`Помилка: ${message}`);
// //             setTimeout(() => setSuccessMessage(""), 3000);
// //         }
// //     };
// //
// //     const handleContactApplication = () => {
// //         console.log("Заповнити заявку (контактні види)");
// //     };
// //
// //     if (!user) {
// //         return <div>Завантаження...</div>;
// //     }
// //
// //     return (
// //         <div className={styles.container}>
// //             {!editAthlete && !editApplication && !showMyAthletes && !showMyApplications && (
// //                 <>
// //                     <h1>Особистий кабінет</h1>
// //                     <p>Вітаємо, {user.username}!</p>
// //                     <p>Ролі: {user.roles.join(", ")}</p>
// //                     {user.roles.includes("ROLE_SUPERADMIN") && (
// //                         <>
// //                             <div className={styles.buttonRow}>
// //                                 <button
// //                                     className={styles.registerButton}
// //                                     onClick={() => {
// //                                         setShowRegisterForm(!showRegisterForm);
// //                                         setShowUsersTable(false);
// //                                     }}
// //                                 >
// //                                     {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                                 </button>
// //                                 <button className={styles.usersButton} onClick={handleShowUsers}>
// //                                     {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                                 </button>
// //                                 <button className={styles.logoutButton} onClick={handleLogout}>
// //                                     Вийти
// //                                 </button>
// //                             </div>
// //                             {showRegisterForm && (
// //                                 <div className={styles.formWrapper}>
// //                                     <RegisterForm onSuccess={handleRegisterSuccess} />
// //                                 </div>
// //                             )}
// //                             {showUsersTable && (
// //                                 <table className={styles.usersTable}>
// //                                     <thead>
// //                                     <tr>
// //                                         <th>Ім'я користувача</th>
// //                                         <th>Ролі</th>
// //                                         <th>Дії</th>
// //                                     </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                     {users.map((u) => (
// //                                         <tr key={u.id}>
// //                                             <td>{u.username}</td>
// //                                             <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                             <td>
// //                                                 <button
// //                                                     className={styles.editButton}
// //                                                     onClick={() => handleEditUser(u)}
// //                                                 >
// //                                                     Редагувати
// //                                                 </button>
// //                                                 <button
// //                                                     className={styles.deleteButton}
// //                                                     onClick={() => handleDeleteUser(u.id)}
// //                                                 >
// //                                                     Видалити
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                     </tbody>
// //                                 </table>
// //                             )}
// //                         </>
// //                     )}
// //                     {user.roles.includes("ROLE_USER") && (
// //                         <div className={styles.buttonRow}>
// //                             <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                                 Додати атлета до бази
// //                             </button>
// //                             <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
// //                                 Мої атлети
// //                             </button>
// //                             <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                                 Заповнити заявку (неконтактні види)
// //                             </button>
// //                             <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
// //                                 Перевірити заявку
// //                             </button>
// //                             <button className={styles.contactButton} onClick={handleContactApplication}>
// //                                 Заповнити заявку (контактні види)
// //                             </button>
// //                             <button className={styles.logoutButton} onClick={handleLogout}>
// //                                 Вийти
// //                             </button>
// //                         </div>
// //                     )}
// //                     {successMessage && <p className={styles.success}>{successMessage}</p>}
// //                     {editUser && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.editFormContainer}>
// //                                 <h3>Редагувати користувача: {editUser.username}</h3>
// //                                 <form onSubmit={handleUpdateUser} className={styles.form}>
// //                                     <div className={styles.inputGroup}>
// //                                         <label htmlFor="editPassword">Новий пароль</label>
// //                                         <input
// //                                             type="password"
// //                                             id="editPassword"
// //                                             value={editPassword}
// //                                             onChange={(e) => setEditPassword(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     {editUserError && <p className={styles.error}>{editUserError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Зберегти
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setEditUser(null)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showAthleteForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Додати атлетів</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="athleteCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="athleteCount"
// //                                         min="1"
// //                                         value={athleteCount}
// //                                         onChange={handleAthleteCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddAthletes}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Тип програми</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {athletes.map((athlete, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.firstName}
// //                                                         onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={athlete.lastName}
// //                                                         onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={athlete.birthDate}
// //                                                         onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={athlete.programType}
// //                                                         onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                         <option value="CONTACT">Контактні види</option>
// //                                                         <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                                     </select>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Додати атлетів
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowAthleteForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                     {showNonContactForm && (
// //                         <div className={styles.formWrapper}>
// //                             <div className={styles.athleteFormContainer}>
// //                                 <h3>Заповнити заявку (неконтактні види)</h3>
// //                                 <div className={styles.inputGroup}>
// //                                     <label htmlFor="nonContactCount">Кількість атлетів</label>
// //                                     <input
// //                                         type="number"
// //                                         id="nonContactCount"
// //                                         min="1"
// //                                         value={nonContactCount}
// //                                         onChange={handleNonContactCountChange}
// //                                         className={styles.countInput}
// //                                     />
// //                                 </div>
// //                                 <form onSubmit={handleAddNonContactApplications}>
// //                                     <table className={styles.athleteTable}>
// //                                         <thead>
// //                                         <tr>
// //                                             <th>Назва змагання</th>
// //                                             <th>Ім'я</th>
// //                                             <th>Прізвище</th>
// //                                             <th>Дата народження</th>
// //                                             <th>Стать</th>
// //                                             <th>Вікова категорія</th>
// //                                             <th>Програма без зброї</th>
// //                                             <th>Коротка зброя</th>
// //                                             <th>Довга зброя</th>
// //                                             <th>Дуйлянь</th>
// //                                         </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                         {nonContactApplications.map((application, index) => (
// //                                             <tr key={index}>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.competitionName}
// //                                                         onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteFirstName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.athleteLastName}
// //                                                         onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="date"
// //                                                         value={application.birthDate}
// //                                                         onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
// //                                                         required
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.gender}
// //                                                         onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="MALE">Чоловік</option>
// //                                                         <option value="FEMALE">Жінка</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.ageCategory}
// //                                                         onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
// //                                                         required
// //                                                     >
// //                                                         <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                                         <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                                         <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                                         <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                                         <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.weaponlessProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="CHANG_QUAN">Чан цюань</option>
// //                                                         <option value="NAN_QUAN">Нань цюань</option>
// //                                                         <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.shortWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="DAO_SHU">Дао шу</option>
// //                                                         <option value="JIAN_SHU">Цзянь шу</option>
// //                                                         <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                                         <option value="NAN_DAO">Нань дао</option>
// //                                                         <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <select
// //                                                         value={application.longWeaponProgram || ""}
// //                                                         onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
// //                                                     >
// //                                                         <option value="">--</option>
// //                                                         <option value="GUN_SHU">Гунь шу</option>
// //                                                         <option value="QIANG_SHU">Цян шу</option>
// //                                                         <option value="NAN_GUN">Нань гунь</option>
// //                                                     </select>
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         value={application.duilian}
// //                                                         onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
// //                                                     />
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                         </tbody>
// //                                     </table>
// //                                     {nonContactError && <p className={styles.error}>{nonContactError}</p>}
// //                                     <button type="submit" className={styles.submitButton}>
// //                                         Подати заявку
// //                                     </button>
// //                                     <button
// //                                         type="button"
// //                                         className={styles.cancelButton}
// //                                         onClick={() => setShowNonContactForm(false)}
// //                                     >
// //                                         Скасувати
// //                                     </button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //             {showMyAthletes && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої атлети</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Тип програми</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myAthletes.map((athlete) => (
// //                                 <tr key={athlete.id}>
// //                                     <td>{athlete.firstName}</td>
// //                                     <td>{athlete.lastName}</td>
// //                                     <td>{athlete.birthDate}</td>
// //                                     <td>
// //                                         {athlete.programType === "TAOLU_TRADITIONAL"
// //                                             ? "Традиційне таолу"
// //                                             : athlete.programType === "CONTACT"
// //                                                 ? "Контактні види"
// //                                                 : "Спортивне таолу"}
// //                                     </td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditAthlete(athlete)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteAthlete(athlete.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyAthletes(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editAthlete && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
// //                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editFirstName"
// //                                     value={editAthlete.firstName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editLastName"
// //                                     value={editAthlete.lastName}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editAthlete.birthDate}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editProgramType">Тип програми</label>
// //                                 <select
// //                                     id="editProgramType"
// //                                     value={editAthlete.programType}
// //                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                     <option value="CONTACT">Контактні види</option>
// //                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                 </select>
// //                             </div>
// //                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditAthlete}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showMyApplications && !editAthlete && !editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Мої заявки</h3>
// //                         <table className={styles.athleteTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Назва змагання</th>
// //                                 <th>Ім'я</th>
// //                                 <th>Прізвище</th>
// //                                 <th>Дата народження</th>
// //                                 <th>Стать</th>
// //                                 <th>Вікова категорія</th>
// //                                 <th>Програма без зброї</th>
// //                                 <th>Коротка зброя</th>
// //                                 <th>Довга зброя</th>
// //                                 <th>Дуйлянь</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {myApplications.map((application) => (
// //                                 <tr key={application.id}>
// //                                     <td>{application.competitionName}</td>
// //                                     <td>{application.athleteFirstName}</td>
// //                                     <td>{application.athleteLastName}</td>
// //                                     <td>{application.birthDate}</td>
// //                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
// //                                     <td>
// //                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
// //                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
// //                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
// //                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
// //                                                         "Дорослі: 18 років і старше"}
// //                                     </td>
// //                                     <td>{application.weaponlessProgram || "--"}</td>
// //                                     <td>{application.shortWeaponProgram || "--"}</td>
// //                                     <td>{application.longWeaponProgram || "--"}</td>
// //                                     <td>{application.duilian || "--"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditApplication(application)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                         <button
// //                                             className={styles.deleteButton}
// //                                             onClick={() => handleDeleteApplication(application.id!)}
// //                                         >
// //                                             Видалити
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                         <button
// //                             className={styles.cancelButton}
// //                             onClick={() => setShowMyApplications(false)}
// //                         >
// //                             Закрити
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //             {editApplication && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
// //                         <form onSubmit={handleUpdateApplication} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editCompetitionName">Назва змагання</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editCompetitionName"
// //                                     value={editApplication.competitionName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteFirstName"
// //                                     value={editApplication.athleteFirstName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAthleteLastName">Прізвище</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editAthleteLastName"
// //                                     value={editApplication.athleteLastName}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editBirthDate">Дата народження</label>
// //                                 <input
// //                                     type="date"
// //                                     id="editBirthDate"
// //                                     value={editApplication.birthDate}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
// //                                     required
// //                                 />
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editGender">Стать</label>
// //                                 <select
// //                                     id="editGender"
// //                                     value={editApplication.gender}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="MALE">Чоловік</option>
// //                                     <option value="FEMALE">Жінка</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
// //                                 <select
// //                                     id="editAgeCategory"
// //                                     value={editApplication.ageCategory}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
// //                                     required
// //                                 >
// //                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
// //                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
// //                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
// //                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
// //                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
// //                                 <select
// //                                     id="editWeaponlessProgram"
// //                                     value={editApplication.weaponlessProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="CHANG_QUAN">Чан цюань</option>
// //                                     <option value="NAN_QUAN">Нань цюань</option>
// //                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
// //                                 <select
// //                                     id="editShortWeaponProgram"
// //                                     value={editApplication.shortWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="DAO_SHU">Дао шу</option>
// //                                     <option value="JIAN_SHU">Цзянь шу</option>
// //                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
// //                                     <option value="NAN_DAO">Нань дао</option>
// //                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
// //                                 <select
// //                                     id="editLongWeaponProgram"
// //                                     value={editApplication.longWeaponProgram || ""}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
// //                                 >
// //                                     <option value="">--</option>
// //                                     <option value="GUN_SHU">Гунь шу</option>
// //                                     <option value="QIANG_SHU">Цян шу</option>
// //                                     <option value="NAN_GUN">Нань гунь</option>
// //                                 </select>
// //                             </div>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editDuilian">Дуйлянь</label>
// //                                 <input
// //                                     type="text"
// //                                     id="editDuilian"
// //                                     value={editApplication.duilian}
// //                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
// //                                 />
// //                             </div>
// //                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={handleCancelEditApplication}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
//
//
// //==========================
//
//
//
// 'use client';
//
// import { useEffect, useState } from "react";
// import styles from "./Cabinet.module.css";
// import { useRouter } from "next/navigation";
// import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication, deleteUser, createContactApplication, getMyContactApplications, updateContactApplication, deleteContactApplication } from "@/services/api.service";
// import { UserDTO, AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO } from "@/types/auth";
// import RegisterForm from "@/components/RegisterForm";
//
// export default function Cabinet() {
//     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
//     const [showRegisterForm, setShowRegisterForm] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");
//     const [showUsersTable, setShowUsersTable] = useState(false);
//     const [users, setUsers] = useState<UserDTO[]>([]);
//     const [editUser, setEditUser] = useState<UserDTO | null>(null);
//     const [editPassword, setEditPassword] = useState("");
//     const [editUserError, setEditUserError] = useState("");
//     const [showAthleteForm, setShowAthleteForm] = useState(false);
//     const [athleteCount, setAthleteCount] = useState(1);
//     const [athletes, setAthletes] = useState<AthleteDTO[]>([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
//     const [athleteError, setAthleteError] = useState("");
//     const [showMyAthletes, setShowMyAthletes] = useState(false);
//     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
//     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
//     const [editAthleteError, setEditAthleteError] = useState("");
//     const [showNonContactForm, setShowNonContactForm] = useState(false);
//     const [nonContactCount, setNonContactCount] = useState(1);
//     const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([{
//         competitionName: "",
//         athleteFirstName: "",
//         athleteLastName: "",
//         birthDate: "",
//         gender: "MALE",
//         ageCategory: "YOUNGER_JUNIORS_6_8",
//         weaponlessProgram: undefined,
//         shortWeaponProgram: undefined,
//         longWeaponProgram: undefined,
//         duilian: ""
//     }]);
//     const [nonContactError, setNonContactError] = useState("");
//     const [showMyApplications, setShowMyApplications] = useState(false);
//     const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
//     const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
//     const [editApplicationError, setEditApplicationError] = useState("");
//     const [showContactForm, setShowContactForm] = useState(false);
//     const [contactCount, setContactCount] = useState(1);
//     const [contactApplications, setContactApplications] = useState<ContactCompetitionApplicationDTO[]>([{
//         competitionName: "",
//         athleteFirstName: "",
//         athleteLastName: "",
//         birthDate: "",
//         gender: "MALE",
//         ageCategory: "AGE_6_7",
//         contactProgram: undefined,
//         weightCategory: undefined,
//     }]);
//     const [contactError, setContactError] = useState("");
//     const [showMyContactApplications, setShowMyContactApplications] = useState(false);
//     const [myContactApplications, setMyContactApplications] = useState<ContactCompetitionApplicationDTO[]>([]);
//     const [editContactApplication, setEditContactApplication] = useState<ContactCompetitionApplicationDTO | null>(null);
//     const [editContactApplicationError, setEditContactApplicationError] = useState("");
//     const router = useRouter();
//
//     useEffect(() => {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             router.push("/");
//             return;
//         }
//
//         const decodedToken = parseJwt(token);
//         setUser({
//             username: decodedToken.sub,
//             roles: decodedToken.roles || [],
//         });
//     }, [router]);
//
//     const parseJwt = (token: string) => {
//         try {
//             const base64Url = token.split(".")[1];
//             const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//             const jsonPayload = decodeURIComponent(
//                 atob(base64)
//                     .split("")
//                     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//                     .join("")
//             );
//             return JSON.parse(jsonPayload);
//         } catch (e) {
//             return {};
//         }
//     };
//
//     const formatDate = (dateString: string): string => {
//         if (!dateString) return "";
//         return dateString.split("T")[0];
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         router.push("/");
//     };
//
//     const handleRegisterSuccess = () => {
//         setSuccessMessage("Нового користувача створено");
//         setShowRegisterForm(false);
//         setTimeout(() => setSuccessMessage(""), 3000);
//     };
//
//     const handleShowUsers = async () => {
//         if (showUsersTable) {
//             setShowUsersTable(false);
//             setEditUser(null);
//             return;
//         }
//
//         try {
//             setShowRegisterForm(false);
//             setEditUser(null);
//             const usersData = await getAllUsers();
//             setUsers(usersData);
//             setShowUsersTable(true);
//         } catch (error: any) {
//             setSuccessMessage(`Помилка: ${error.message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleEditUser = (user: UserDTO) => {
//         setEditUser(user);
//         setEditPassword("");
//         setShowUsersTable(false);
//     };
//
//     const handleDeleteUser = async (id: number) => {
//         try {
//             await deleteUser(id);
//             setUsers(users.filter((u) => u.id !== id));
//             setSuccessMessage("Користувача видалено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("User not found")
//                 ? "Користувача не знайдено"
//                 : error.message || "Не вдалося видалити користувача";
//             setSuccessMessage(`Помилка: ${message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleUpdateUser = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editUser) return;
//
//         try {
//             const updatedUser = await updateUser(editUser.username, {
//                 id: editUser.id,
//                 username: editUser.username,
//                 password: editPassword || undefined,
//                 roles: editUser.roles || [],
//             });
//             setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
//             setEditUser(null);
//             setShowUsersTable(true);
//             setSuccessMessage("Користувача оновлено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Користувача не знайдено")
//                 ? "Користувача не знайдено"
//                 : error.message || "Не вдалося оновити користувача";
//             setEditUserError(message);
//         }
//     };
//
//     const handleCancelEditUser = () => {
//         setEditUser(null);
//         setEditPassword("");
//         setEditUserError("");
//         setShowUsersTable(true);
//     };
//
//     const handleAddAthlete = () => {
//         setShowAthleteForm(true);
//         setShowNonContactForm(false);
//         setShowContactForm(false);
//         setAthleteCount(1);
//         setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
//     };
//
//     const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const count = parseInt(e.target.value) || 1;
//         setAthleteCount(Math.max(1, count));
//         setAthletes(
//             Array(count)
//                 .fill(null)
//                 .map((_, i) =>
//                     athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
//                 )
//         );
//     };
//
//     const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
//         const newAthletes = [...athletes];
//         newAthletes[index] = { ...newAthletes[index], [field]: value };
//         setAthletes(newAthletes);
//     };
//
//     const handleAddAthletes = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setAthleteError("");
//
//         try {
//             for (const athlete of athletes) {
//                 if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
//                     throw new Error("Усі поля для кожного атлета мають бути заповнені");
//                 }
//                 await createAthlete(athlete);
//             }
//             setSuccessMessage("Атлетів додано");
//             setShowAthleteForm(false);
//             setAthleteCount(1);
//             setAthletes([]);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             setAthleteError(error.message || "Не вдалося додати атлетів");
//         }
//     };
//
//     const handleShowMyAthletes = async () => {
//         if (showMyAthletes) {
//             setShowMyAthletes(false);
//             setEditAthlete(null);
//             return;
//         }
//
//         try {
//             const athletesData = await getMyAthletes();
//             const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
//                 ...athlete,
//                 birthDate: formatDate(athlete.birthDate),
//             }));
//             setMyAthletes(formattedAthletes);
//             setShowMyAthletes(true);
//             setShowAthleteForm(false);
//             setShowNonContactForm(false);
//             setShowContactForm(false);
//             setShowMyApplications(false);
//             setShowMyContactApplications(false);
//             setShowUsersTable(false);
//             setEditUser(null);
//             setEditApplication(null);
//             setEditContactApplication(null);
//         } catch (error: any) {
//             setSuccessMessage(`Помилка: ${error.message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleEditAthlete = (athlete: AthleteDTO) => {
//         setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
//         setShowMyAthletes(false);
//         setShowMyApplications(false);
//         setShowMyContactApplications(false);
//     };
//
//     const handleUpdateAthlete = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editAthlete) return;
//
//         try {
//             if (editAthlete.id) {
//                 const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
//                 setMyAthletes(
//                     myAthletes.map((a) =>
//                         a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
//                     )
//                 );
//             }
//             setEditAthlete(null);
//             setShowMyAthletes(true);
//             setShowAthleteForm(false);
//             setSuccessMessage("Дані атлета оновлено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Athlete not found")
//                 ? "Атлета не знайдено"
//                 : error.message.includes("Athlete is owned by another user")
//                     ? "Ви не можете редагувати цього атлета"
//                     : error.message || "Не вдалося оновити атлета";
//             setEditAthleteError(message);
//         }
//     };
//
//     const handleCancelEditAthlete = () => {
//         setEditAthlete(null);
//         setShowMyAthletes(true);
//         setShowAthleteForm(false);
//     };
//
//     const handleDeleteAthlete = async (id: number) => {
//         try {
//             await deleteAthlete(id);
//             setMyAthletes(myAthletes.filter((a) => a.id !== id));
//             setSuccessMessage("Атлета видалено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Athlete not found")
//                 ? "Атлета не знайдено"
//                 : error.message.includes("Athlete is owned by another user")
//                     ? "Ви не можете видалити цього атлета"
//                     : error.message || "Не вдалося видалити атлета";
//             setSuccessMessage(`Помилка: ${message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleNonContactApplication = () => {
//         setShowNonContactForm(true);
//         setShowAthleteForm(false);
//         setShowContactForm(false);
//         setNonContactCount(1);
//         setNonContactApplications([{
//             competitionName: "",
//             athleteFirstName: "",
//             athleteLastName: "",
//             birthDate: "",
//             gender: "MALE",
//             ageCategory: "YOUNGER_JUNIORS_6_8",
//             weaponlessProgram: undefined,
//             shortWeaponProgram: undefined,
//             longWeaponProgram: undefined,
//             duilian: ""
//         }]);
//     };
//
//     const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const count = parseInt(e.target.value) || 1;
//         setNonContactCount(Math.max(1, count));
//         setNonContactApplications(
//             Array(count)
//                 .fill(null)
//                 .map((_, i) =>
//                         nonContactApplications[i] || {
//                             competitionName: "",
//                             athleteFirstName: "",
//                             athleteLastName: "",
//                             birthDate: "",
//                             gender: "MALE",
//                             ageCategory: "YOUNGER_JUNIORS_6_8",
//                             weaponlessProgram: undefined,
//                             shortWeaponProgram: undefined,
//                             longWeaponProgram: undefined,
//                             duilian: ""
//                         }
//                 )
//         );
//     };
//
//     const handleNonContactChange = (index: number, field: keyof CompetitionApplicationDTO, value: any) => {
//         const newApplications = [...nonContactApplications];
//         newApplications[index] = { ...newApplications[index], [field]: value };
//         setNonContactApplications(newApplications);
//     };
//
//     const handleAddNonContactApplications = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setNonContactError("");
//
//         try {
//             for (const application of nonContactApplications) {
//                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
//                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
//                 }
//                 await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
//             }
//             setSuccessMessage("Заявки подано");
//             setShowNonContactForm(false);
//             setNonContactCount(1);
//             setNonContactApplications([]);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             setNonContactError(error.message || "Не вдалося подати заявки");
//         }
//     };
//
//     const handleShowMyApplications = async () => {
//         if (showMyApplications) {
//             setShowMyApplications(false);
//             setEditApplication(null);
//             return;
//         }
//
//         try {
//             const applicationsData = await getMyApplications();
//             const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
//                 ...app,
//                 birthDate: formatDate(app.birthDate),
//             }));
//             setMyApplications(formattedApplications);
//             setShowMyApplications(true);
//             setShowAthleteForm(false);
//             setShowNonContactForm(false);
//             setShowContactForm(false);
//             setShowMyAthletes(false);
//             setShowMyContactApplications(false);
//             setShowUsersTable(false);
//             setEditUser(null);
//             setEditAthlete(null);
//             setEditContactApplication(null);
//         } catch (error: any) {
//             setSuccessMessage(`Помилка: ${error.message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleEditApplication = (application: CompetitionApplicationDTO) => {
//         setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
//         setShowMyApplications(false);
//         setShowMyAthletes(false);
//         setShowMyContactApplications(false);
//     };
//
//     const handleUpdateApplication = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editApplication) return;
//
//         try {
//             if (editApplication.id) {
//                 const updatedApplication = await updateApplication(editApplication.id, editApplication);
//                 setMyApplications(
//                     myApplications.map((a) =>
//                         a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
//                     )
//                 );
//             }
//             setEditApplication(null);
//             setShowMyApplications(true);
//             setShowNonContactForm(false);
//             setSuccessMessage("Дані заявки оновлено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Competition application not found")
//                 ? "Заявку не знайдено"
//                 : error.message.includes("Application is owned by another user")
//                     ? "Ви не можете редагувати цю заявку"
//                     : error.message || "Не вдалося оновити заявку";
//             setEditApplicationError(message);
//         }
//     };
//
//     const handleCancelEditApplication = () => {
//         setEditApplication(null);
//         setShowMyApplications(true);
//         setShowNonContactForm(false);
//     };
//
//     const handleDeleteApplication = async (id: number) => {
//         try {
//             await deleteApplication(id);
//             setMyApplications(myApplications.filter((a) => a.id !== id));
//             setSuccessMessage("Заявку видалено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Competition application not found")
//                 ? "Заявку не знайдено"
//                 : error.message.includes("Application is owned by another user")
//                     ? "Ви не можете видалити цю заявку"
//                     : error.message || "Не вдалося видалити заявку";
//             setSuccessMessage(`Помилка: ${message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleContactApplication = () => {
//         setShowContactForm(true);
//         setShowAthleteForm(false);
//         setShowNonContactForm(false);
//         setContactCount(1);
//         setContactApplications([{
//             competitionName: "",
//             athleteFirstName: "",
//             athleteLastName: "",
//             birthDate: "",
//             gender: "MALE",
//             ageCategory: "AGE_6_7",
//             contactProgram: undefined,
//             weightCategory: undefined,
//         }]);
//     };
//
//     const handleContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const count = parseInt(e.target.value) || 1;
//         setContactCount(Math.max(1, count));
//         setContactApplications(
//             Array(count)
//                 .fill(null)
//                 .map((_, i) =>
//                         contactApplications[i] || {
//                             competitionName: "",
//                             athleteFirstName: "",
//                             athleteLastName: "",
//                             birthDate: "",
//                             gender: "MALE",
//                             ageCategory: "YOUNGER_JUNIORS_6_8",
//                             contactProgram: undefined,
//                             weightCategory: undefined,
//                         }
//                 )
//         );
//     };
//
//     const handleContactChange = (index: number, field: keyof ContactCompetitionApplicationDTO, value: any) => {
//         const newApplications = [...contactApplications];
//         newApplications[index] = { ...newApplications[index], [field]: value };
//         setContactApplications(newApplications);
//     };
//
//     const handleAddContactApplications = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setContactError("");
//
//         try {
//             for (const application of contactApplications) {
//                 if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory || !application.contactProgram) {
//                     throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
//                 }
//                 await createContactApplication({ ...application, birthDate: formatDate(application.birthDate) });
//             }
//             setSuccessMessage("Заявки подано");
//             setShowContactForm(false);
//             setContactCount(1);
//             setContactApplications([]);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             setContactError(error.message || "Не вдалося подати заявки");
//         }
//     };
//
//     const handleShowMyContactApplications = async () => {
//         if (showMyContactApplications) {
//             setShowMyContactApplications(false);
//             setEditContactApplication(null);
//             return;
//         }
//
//         try {
//             const applicationsData = await getMyContactApplications();
//             const formattedApplications = applicationsData.map((app: ContactCompetitionApplicationDTO) => ({
//                 ...app,
//                 birthDate: formatDate(app.birthDate),
//             }));
//             setMyContactApplications(formattedApplications);
//             setShowMyContactApplications(true);
//             setShowAthleteForm(false);
//             setShowNonContactForm(false);
//             setShowContactForm(false);
//             setShowMyAthletes(false);
//             setShowMyApplications(false);
//             setShowUsersTable(false);
//             setEditUser(null);
//             setEditAthlete(null);
//             setEditApplication(null);
//         } catch (error: any) {
//             setSuccessMessage(`Помилка: ${error.message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleEditContactApplication = (application: ContactCompetitionApplicationDTO) => {
//         setEditContactApplication({ ...application, birthDate: formatDate(application.birthDate) });
//         setShowMyContactApplications(false);
//         setShowMyAthletes(false);
//         setShowMyApplications(false);
//     };
//
//     const handleUpdateContactApplication = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editContactApplication) return;
//
//         try {
//             if (editContactApplication.id) {
//                 const updatedApplication = await updateContactApplication(editContactApplication.id, editContactApplication);
//                 setMyContactApplications(
//                     myContactApplications.map((a) =>
//                         a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
//                     )
//                 );
//             }
//             setEditContactApplication(null);
//             setShowMyContactApplications(true);
//             setShowContactForm(false);
//             setSuccessMessage("Дані заявки оновлено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Competition application not found")
//                 ? "Заявку не знайдено"
//                 : error.message.includes("Application is owned by another user")
//                     ? "Ви не можете редагувати цю заявку"
//                     : error.message || "Не вдалося оновити заявку";
//             setEditContactApplicationError(message);
//         }
//     };
//
//     const handleCancelEditContactApplication = () => {
//         setEditContactApplication(null);
//         setShowMyContactApplications(true);
//         setShowContactForm(false);
//     };
//
//     const handleDeleteContactApplication = async (id: number) => {
//         try {
//             await deleteContactApplication(id);
//             setMyContactApplications(myContactApplications.filter((a) => a.id !== id));
//             setSuccessMessage("Заявку видалено");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error: any) {
//             const message = error.message.includes("Competition application not found")
//                 ? "Заявку не знайдено"
//                 : error.message.includes("Application is owned by another user")
//                     ? "Ви не можете видалити цю заявку"
//                     : error.message || "Не вдалося видалити заявку";
//             setSuccessMessage(`Помилка: ${message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     if (!user) {
//         return <div>Завантаження...</div>;
//     }
//
//     return (
//         <div className={styles.container}>
//             {!editAthlete && !editApplication && !editContactApplication && !showMyAthletes && !showMyApplications && !showMyContactApplications && (
//                 <>
//                     <h1>Особистий кабінет</h1>
//                     <p>Вітаємо, {user.username}!</p>
//                     <p>Ролі: {user.roles.join(", ")}</p>
//                     <div className={styles.buttonRow}>
//                         {user.roles.includes("ROLE_SUPERADMIN") && (
//                             <>
//                                 <button
//                                     className={styles.registerButton}
//                                     onClick={() => {
//                                         setShowRegisterForm(!showRegisterForm);
//                                         setShowUsersTable(false);
//                                     }}
//                                 >
//                                     {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
//                                 </button>
//                                 <button className={styles.usersButton} onClick={handleShowUsers}>
//                                     {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
//                                 </button>
//                             </>
//                         )}
//                         {user.roles.includes("ROLE_USER") && (
//                             <>
//                                 <button className={styles.athleteButton} onClick={handleAddAthlete}>
//                                     Додати атлета до бази
//                                 </button>
//                                 <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
//                                     Мої атлети
//                                 </button>
//                                 <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
//                                     Заповнити заявку (неконтактні види)
//                                 </button>
//                                 <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
//                                     Перевірити заявку
//                                 </button>
//                                 <button className={styles.contactButton} onClick={handleContactApplication}>
//                                     Заповнити заявку (контактні види)
//                                 </button>
//                                 <button className={styles.checkContactApplicationButton} onClick={handleShowMyContactApplications}>
//                                     Перевірити контактні заявки
//                                 </button>
//                             </>
//                         )}
//                         <button className={styles.logoutButton} onClick={handleLogout}>
//                             Вийти
//                         </button>
//                     </div>
//                     {showRegisterForm && (
//                         <div className={styles.formWrapper}>
//                             <RegisterForm onSuccess={handleRegisterSuccess} />
//                         </div>
//                     )}
//                     {successMessage && <p className={successMessage.includes("Помилка") ? styles.error : styles.success}>{successMessage}</p>}
//                 </>
//             )}
//
//             {showUsersTable && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Користувачі</h3>
//                         <table className={styles.usersTable}>
//                             <thead>
//                             <tr>
//                                 <th>Ім'я користувача</th>
//                                 <th>Ролі</th>
//                                 <th>Дії</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {users.map((u) => (
//                                 <tr key={u.id}>
//                                     <td>{u.username}</td>
//                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
//                                     <td>
//                                         <button
//                                             className={styles.editButton}
//                                             onClick={() => handleEditUser(u)}
//                                         >
//                                             Редагувати
//                                         </button>
//                                         <button
//                                             className={styles.deleteButton}
//                                             onClick={() => handleDeleteUser(u.id)}
//                                         >
//                                             Видалити
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                         <button
//                             className={styles.cancelButton}
//                             onClick={() => setShowUsersTable(false)}
//                         >
//                             Закрити
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             {editUser && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.editFormContainer}>
//                         <h3>Редагувати користувача: {editUser.username}</h3>
//                         <form onSubmit={handleUpdateUser} className={styles.form}>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editPassword">Новий пароль</label>
//                                 <input
//                                     type="password"
//                                     id="editPassword"
//                                     value={editPassword}
//                                     onChange={(e) => setEditPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             {editUserError && <p className={styles.error}>{editUserError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Зберегти
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={handleCancelEditUser}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {showAthleteForm && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Додати атлетів</h3>
//                         <div className={styles.inputGroup}>
//                             <label htmlFor="athleteCount">Кількість атлетів</label>
//                             <input
//                                 type="number"
//                                 id="athleteCount"
//                                 min="1"
//                                 value={athleteCount}
//                                 onChange={handleAthleteCountChange}
//                                 className={styles.countInput}
//                             />
//                         </div>
//                         <form onSubmit={handleAddAthletes}>
//                             <div className={styles.athleteTableWrapper}>
//                                 <table className={styles.athleteTable}>
//                                     <thead>
//                                     <tr>
//                                         <th>Ім'я</th>
//                                         <th>Прізвище</th>
//                                         <th>Дата народження</th>
//                                         <th>Тип програми</th>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {athletes.map((athlete, index) => (
//                                         <tr key={index}>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={athlete.firstName}
//                                                     onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={athlete.lastName}
//                                                     onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="date"
//                                                     value={athlete.birthDate}
//                                                     onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={athlete.programType}
//                                                     onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
//                                                     required
//                                                 >
//                                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
//                                                     <option value="CONTACT">Контактні види</option>
//                                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
//                                                 </select>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             {athleteError && <p className={styles.error}>{athleteError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Додати атлетів
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={() => setShowAthleteForm(false)}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {showMyAthletes && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Мої атлети</h3>
//                         <table className={styles.athleteTable}>
//                             <thead>
//                             <tr>
//                                 <th>Ім'я</th>
//                                 <th>Прізвище</th>
//                                 <th>Дата народження</th>
//                                 <th>Тип програми</th>
//                                 <th>Дії</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {myAthletes.map((athlete) => (
//                                 <tr key={athlete.id}>
//                                     <td>{athlete.firstName}</td>
//                                     <td>{athlete.lastName}</td>
//                                     <td>{athlete.birthDate}</td>
//                                     <td>
//                                         {athlete.programType === "TAOLU_TRADITIONAL"
//                                             ? "Традиційне таолу"
//                                             : athlete.programType === "CONTACT"
//                                                 ? "Контактні види"
//                                                 : "Спортивне таолу"}
//                                     </td>
//                                     <td>
//                                         <button
//                                             className={styles.editButton}
//                                             onClick={() => handleEditAthlete(athlete)}
//                                         >
//                                             Редагувати
//                                         </button>
//                                         <button
//                                             className={styles.deleteButton}
//                                             onClick={() => handleDeleteAthlete(athlete.id!)}
//                                         >
//                                             Видалити
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                         <button
//                             className={styles.cancelButton}
//                             onClick={() => setShowMyAthletes(false)}
//                         >
//                             Закрити
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             {editAthlete && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.editFormContainer}>
//                         <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
//                         <form onSubmit={handleUpdateAthlete} className={styles.form}>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editFirstName">Ім'я</label>
//                                 <input
//                                     type="text"
//                                     id="editFirstName"
//                                     value={editAthlete.firstName}
//                                     onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editLastName">Прізвище</label>
//                                 <input
//                                     type="text"
//                                     id="editLastName"
//                                     value={editAthlete.lastName}
//                                     onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editBirthDate">Дата народження</label>
//                                 <input
//                                     type="date"
//                                     id="editBirthDate"
//                                     value={editAthlete.birthDate}
//                                     onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editProgramType">Тип програми</label>
//                                 <select
//                                     id="editProgramType"
//                                     value={editAthlete.programType}
//                                     onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
//                                     required
//                                 >
//                                     <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
//                                     <option value="CONTACT">Контактні види</option>
//                                     <option value="TAOLU_SPORT">Спортивне таолу</option>
//                                 </select>
//                             </div>
//                             {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Зберегти
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={handleCancelEditAthlete}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {showNonContactForm && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Заповнити заявку (неконтактні види)</h3>
//                         <div className={styles.inputGroup}>
//                             <label htmlFor="nonContactCount">Кількість атлетів</label>
//                             <input
//                                 type="number"
//                                 id="nonContactCount"
//                                 min="1"
//                                 value={nonContactCount}
//                                 onChange={handleNonContactCountChange}
//                                 className={styles.countInput}
//                             />
//                         </div>
//                         <form onSubmit={handleAddNonContactApplications}>
//                             <div className={styles.athleteTableWrapper}>
//                                 <table className={styles.athleteTable}>
//                                     <thead>
//                                     <tr>
//                                         <th>Назва змагання</th>
//                                         <th>Ім'я</th>
//                                         <th>Прізвище</th>
//                                         <th>Дата народження</th>
//                                         <th>Стать</th>
//                                         <th>Вікова категорія</th>
//                                         <th>Програма без зброї</th>
//                                         <th>Коротка зброя</th>
//                                         <th>Довга зброя</th>
//                                         <th>Дуйлянь</th>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {nonContactApplications.map((application, index) => (
//                                         <tr key={index}>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.competitionName}
//                                                     onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.athleteFirstName}
//                                                     onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.athleteLastName}
//                                                     onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="date"
//                                                     value={application.birthDate}
//                                                     onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.gender}
//                                                     onChange={(e) => handleNonContactChange(index, "gender", e.target.value)}
//                                                     required
//                                                 >
//                                                     <option value="MALE">Чоловік</option>
//                                                     <option value="FEMALE">Жінка</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.ageCategory}
//                                                     onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value)}
//                                                     required
//                                                 >
//                                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
//                                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
//                                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
//                                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
//                                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.weaponlessProgram || ""}
//                                                     onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value || undefined)}
//                                                 >
//                                                     <option value="">--</option>
//                                                     <option value="CHANG_QUAN">Чан цюань</option>
//                                                     <option value="NAN_QUAN">Нань цюань</option>
//                                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.shortWeaponProgram || ""}
//                                                     onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value || undefined)}
//                                                 >
//                                                     <option value="">--</option>
//                                                     <option value="DAO_SHU">Дао шу</option>
//                                                     <option value="JIAN_SHU">Цзянь шу</option>
//                                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
//                                                     <option value="NAN_DAO">Нань дао</option>
//                                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.longWeaponProgram || ""}
//                                                     onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value || undefined)}
//                                                 >
//                                                     <option value="">--</option>
//                                                     <option value="GUN_SHU">Гунь шу</option>
//                                                     <option value="QIANG_SHU">Цян шу</option>
//                                                     <option value="NAN_GUN">Нань гунь</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.duilian}
//                                                     onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             {nonContactError && <p className={styles.error}>{nonContactError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Подати заявку
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={() => setShowNonContactForm(false)}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {showMyApplications && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Мої заявки</h3>
//                         <table className={styles.athleteTable}>
//                             <thead>
//                             <tr>
//                                 <th>Назва змагання</th>
//                                 <th>Ім'я</th>
//                                 <th>Прізвище</th>
//                                 <th>Дата народження</th>
//                                 <th>Стать</th>
//                                 <th>Вікова категорія</th>
//                                 <th>Програма без зброї</th>
//                                 <th>Коротка зброя</th>
//                                 <th>Довга зброя</th>
//                                 <th>Дуйлянь</th>
//                                 <th>Дії</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {myApplications.map((application) => (
//                                 <tr key={application.id}>
//                                     <td>{application.competitionName}</td>
//                                     <td>{application.athleteFirstName}</td>
//                                     <td>{application.athleteLastName}</td>
//                                     <td>{application.birthDate}</td>
//                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
//                                     <td>
//                                         {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "Молодші юнаки: 6-8 років" :
//                                             application.ageCategory === "OLDER_JUNIORS_9_11" ? "Старші юнаки: 9-11 років" :
//                                                 application.ageCategory === "YOUNGER_YOUTH_12_14" ? "Молодші юніори: 12-14 років" :
//                                                     application.ageCategory === "OLDER_YOUTH_15_17" ? "Старші юніори: 15-17 років" :
//                                                         "Дорослі: 18 років і старше"}
//                                     </td>
//                                     <td>{application.weaponlessProgram || "--"}</td>
//                                     <td>{application.shortWeaponProgram || "--"}</td>
//                                     <td>{application.longWeaponProgram || "--"}</td>
//                                     <td>{application.duilian || "--"}</td>
//                                     <td>
//                                         <button
//                                             className={styles.editButton}
//                                             onClick={() => handleEditApplication(application)}
//                                         >
//                                             Редагувати
//                                         </button>
//                                         <button
//                                             className={styles.deleteButton}
//                                             onClick={() => handleDeleteApplication(application.id!)}
//                                         >
//                                             Видалити
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                         <button
//                             className={styles.cancelButton}
//                             onClick={() => setShowMyApplications(false)}
//                         >
//                             Закрити
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             {editApplication && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.editFormContainer}>
//                         <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
//                         <form onSubmit={handleUpdateApplication} className={styles.form}>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editCompetitionName">Назва змагання</label>
//                                 <input
//                                     type="text"
//                                     id="editCompetitionName"
//                                     value={editApplication.competitionName}
//                                     onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
//                                 <input
//                                     type="text"
//                                     id="editAthleteFirstName"
//                                     value={editApplication.athleteFirstName}
//                                     onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editAthleteLastName">Прізвище</label>
//                                 <input
//                                     type="text"
//                                     id="editAthleteLastName"
//                                     value={editApplication.athleteLastName}
//                                     onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editBirthDate">Дата народження</label>
//                                 <input
//                                     type="date"
//                                     id="editBirthDate"
//                                     value={editApplication.birthDate}
//                                     onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editGender">Стать</label>
//                                 <select
//                                     id="editGender"
//                                     value={editApplication.gender}
//                                     onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as any })}
//                                     required
//                                 >
//                                     <option value="MALE">Чоловік</option>
//                                     <option value="FEMALE">Жінка</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
//                                 <select
//                                     id="editAgeCategory"
//                                     value={editApplication.ageCategory}
//                                     onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as any })}
//                                     required
//                                 >
//                                     <option value="YOUNGER_JUNIORS_6_8">Молодші юнаки: 6-8 років</option>
//                                     <option value="OLDER_JUNIORS_9_11">Старші юнаки: 9-11 років</option>
//                                     <option value="YOUNGER_YOUTH_12_14">Молодші юніори: 12-14 років</option>
//                                     <option value="OLDER_YOUTH_15_17">Старші юніори: 15-17 років</option>
//                                     <option value="ADULTS_18_PLUS">Дорослі: 18 років і старше</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
//                                 <select
//                                     id="editWeaponlessProgram"
//                                     value={editApplication.weaponlessProgram || ""}
//                                     onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value || undefined })}
//                                 >
//                                     <option value="">--</option>
//                                     <option value="CHANG_QUAN">Чан цюань</option>
//                                     <option value="NAN_QUAN">Нань цюань</option>
//                                     <option value="TAIJI_QUAN">Тайцзі цюань</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
//                                 <select
//                                     id="editShortWeaponProgram"
//                                     value={editApplication.shortWeaponProgram || ""}
//                                     onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value || undefined })}
//                                 >
//                                     <option value="">--</option>
//                                     <option value="DAO_SHU">Дао шу</option>
//                                     <option value="JIAN_SHU">Цзянь шу</option>
//                                     <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
//                                     <option value="NAN_DAO">Нань дао</option>
//                                     <option value="TAIJI_SHAN">Тайцзі шань</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editLongWeaponProgram">Довга зброя</label>
//                                 <select
//                                     id="editLongWeaponProgram"
//                                     value={editApplication.longWeaponProgram || ""}
//                                     onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value || undefined })}
//                                 >
//                                     <option value="">--</option>
//                                     <option value="GUN_SHU">Гунь шу</option>
//                                     <option value="QIANG_SHU">Цян шу</option>
//                                     <option value="NAN_GUN">Нань гунь</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editDuilian">Дуйлянь</label>
//                                 <input
//                                     type="text"
//                                     id="editDuilian"
//                                     value={editApplication.duilian}
//                                     onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
//                                 />
//                             </div>
//                             {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Зберегти
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={handleCancelEditApplication}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {showContactForm && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Заповнити заявку (контактні види)</h3>
//                         <div className={styles.inputGroup}>
//                             <label htmlFor="contactCount">Кількість атлетів</label>
//                             <input
//                                 type="number"
//                                 id="contactCount"
//                                 min="1"
//                                 value={contactCount}
//                                 onChange={handleContactCountChange}
//                                 className={styles.countInput}
//                             />
//                         </div>
//                         <form onSubmit={handleAddContactApplications}>
//                             <div className={styles.athleteTableWrapper}>
//                                 <table className={styles.athleteTable}>
//                                     <thead>
//                                     <tr>
//                                         <th>Назва змагання</th>
//                                         <th>Ім'я</th>
//                                         <th>Прізвище</th>
//                                         <th>Дата народження</th>
//                                         <th>Стать</th>
//                                         <th>Вікова категорія</th>
//                                         <th>Контактна програма</th>
//                                         <th>Вагова категорія</th>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {contactApplications.map((application, index) => (
//                                         <tr key={index}>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.competitionName}
//                                                     onChange={(e) => handleContactChange(index, "competitionName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.athleteFirstName}
//                                                     onChange={(e) => handleContactChange(index, "athleteFirstName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     value={application.athleteLastName}
//                                                     onChange={(e) => handleContactChange(index, "athleteLastName", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="date"
//                                                     value={application.birthDate}
//                                                     onChange={(e) => handleContactChange(index, "birthDate", e.target.value)}
//                                                     required
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.gender}
//                                                     onChange={(e) => handleContactChange(index, "gender", e.target.value)}
//                                                     required
//                                                 >
//                                                     <option value="MALE">Чоловік</option>
//                                                     <option value="FEMALE">Жінка</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.ageCategory}
//                                                     onChange={(e) => handleContactChange(index, "ageCategory", e.target.value)}
//                                                     required
//                                                 >
//                                                     <option value="AGE_6_7">6-7 років</option>
//                                                     <option value="AGE_8_9">8-9 років</option>
//                                                     <option value="AGE_10_11">10-11 років</option>
//                                                     <option value="AGE_12_13">12-13 років</option>
//                                                     <option value="AGE_14_15">14-15 років</option>
//                                                     <option value="AGE_16_17">16-17 років</option>
//                                                     <option value="AGE_18_PLUS">18 років і старше</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.contactProgram || ""}
//                                                     onChange={(e) => handleContactChange(index, "contactProgram", e.target.value || undefined)}
//                                                     required
//                                                 >
//                                                     <option value="">--</option>
//                                                     <option value="SANDA">Санда</option>
//                                                     <option value="LIGHT_SANDA">Лайт Санда</option>
//                                                     <option value="TUI_SHOW">Туй Шоу</option>
//                                                     <option value="WING_CHUN">Він Чун</option>
//                                                     <option value="SHUAI_JIAO">Шуай Цзяо</option>
//                                                 </select>
//                                             </td>
//                                             <td>
//                                                 <select
//                                                     value={application.weightCategory || ""}
//                                                     onChange={(e) => handleContactChange(index, "weightCategory", e.target.value || undefined)}
//                                                 >
//                                                     <option value="">--</option>
//                                                     <option value="UNDER_50">До 50 кг</option>
//                                                     <option value="FROM_50_TO_55">50-55 кг</option>
//                                                     <option value="FROM_55_TO_60">55-60 кг</option>
//                                                     <option value="FROM_60_TO_65">60-65 кг</option>
//                                                     <option value="FROM_65_TO_70">65-70 кг</option>
//                                                     <option value="FROM_70_TO_75">70-75 кг</option>
//                                                     <option value="FROM_75_TO_80">75-80 кг</option>
//                                                     <option value="FROM_80_TO_85">80-85 кг</option>
//                                                     <option value="FROM_85_TO_90">85-90 кг</option>
//                                                     <option value="OVER_90">Понад 90 кг</option>
//                                                 </select>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             {contactError && <p className={styles.error}>{contactError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Подати заявку
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={() => setShowContactForm(false)}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {showMyContactApplications && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.athleteFormContainer}>
//                         <h3>Мої контактні заявки</h3>
//                         <table className={styles.athleteTable}>
//                             <thead>
//                             <tr>
//                                 <th>Назва змагання</th>
//                                 <th>Ім'я</th>
//                                 <th>Прізвище</th>
//                                 <th>Дата народження</th>
//                                 <th>Стать</th>
//                                 <th>Вікова категорія</th>
//                                 <th>Контактна програма</th>
//                                 <th>Вагова категорія</th>
//                                 <th>Дії</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {myContactApplications.map((application) => (
//                                 <tr key={application.id}>
//                                     <td>{application.competitionName}</td>
//                                     <td>{application.athleteFirstName}</td>
//                                     <td>{application.athleteLastName}</td>
//                                     <td>{application.birthDate}</td>
//                                     <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
//                                     <td>
//                                         {application.ageCategory === "AGE_6_7" ? "Молодші юнаки: 6-7 років" :
//                                             application.ageCategory === "AGE_8_9" ? "Старші юнаки: 8-9 років" :
//                                                 application.ageCategory === "AGE_10_11" ? "Молодші юніори: 10-11 років" :
//                                                     application.ageCategory === "AGE_12_13" ? "Старші юніори: 12-13 років" :
//                                                         application.ageCategory === "AGE_14_15" ? "Старші юніори: 14-15 років" :
//                                                             application.ageCategory === "AGE_16_17" ? "Старші юніори: 16-17 років" :
//                                                                 application.ageCategory === "AGE_18_PLUS" ? "Дорослі: 18 років і старше":"--"}
//
//
//
//                                     </td>
//                                     <td>
//                                         {application.contactProgram === "SANDA" ? "Санда" :
//                                             application.contactProgram === "LIGHT_SANDA" ? "Лайт Санда" :
//                                                 application.contactProgram === "TUI_SHOW" ? "Туй Шоу" :
//                                                     application.contactProgram === "WING_CHUN" ? "Він Чун" :
//                                                         application.contactProgram === "SHUAI_JIAO" ? "Шуай Цзяо" : "--"}
//                                     </td>
//                                     <td>
//                                         {application.weightCategory === "UNDER_50" ? "До 50 кг" :
//                                             application.weightCategory === "FROM_50_TO_55" ? "50-55 кг" :
//                                                 application.weightCategory === "FROM_55_TO_60" ? "55-60 кг" :
//                                                     application.weightCategory === "FROM_60_TO_65" ? "60-65 кг" :
//                                                         application.weightCategory === "FROM_65_TO_70" ? "65-70 кг" :
//                                                             application.weightCategory === "FROM_70_TO_75" ? "Д70-75 кг" :
//                                                                 application.weightCategory === "FROM_75_TO_80" ? "75-80 кг" :
//                                                                     application.weightCategory === "FROM_80_TO_85" ? "80-85 кг" :
//                                                                         application.weightCategory === "FROM_85_TO_90" ? "85-90 кг" :
//                                                                                 application.weightCategory === "OVER_90" ? "Понад 90 кг" : "--"}
//                                     </td>
//                                     <td>
//                                         <button
//                                             className={styles.editButton}
//                                             onClick={() => handleEditContactApplication(application)}
//                                         >
//                                             Редагувати
//                                         </button>
//                                         <button
//                                             className={styles.deleteButton}
//                                             onClick={() => handleDeleteContactApplication(application.id!)}
//                                         >
//                                             Видалити
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                         <button
//                             className={styles.cancelButton}
//                             onClick={() => setShowMyContactApplications(false)}
//                         >
//                             Закрити
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             {editContactApplication && (
//                 <div className={styles.formWrapper}>
//                     <div className={styles.editFormContainer}>
//                         <h3>Редагувати заявку: {editContactApplication.athleteFirstName} {editContactApplication.athleteLastName}</h3>
//                         <form onSubmit={handleUpdateContactApplication} className={styles.form}>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editCompetitionName">Назва змагання</label>
//                                 <input
//                                     type="text"
//                                     id="editCompetitionName"
//                                     value={editContactApplication.competitionName}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, competitionName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editAthleteFirstName">Ім'я</label>
//                                 <input
//                                     type="text"
//                                     id="editAthleteFirstName"
//                                     value={editContactApplication.athleteFirstName}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, athleteFirstName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editAthleteLastName">Прізвище</label>
//                                 <input
//                                     type="text"
//                                     id="editAthleteLastName"
//                                     value={editContactApplication.athleteLastName}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, athleteLastName: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editBirthDate">Дата народження</label>
//                                 <input
//                                     type="date"
//                                     id="editBirthDate"
//                                     value={editContactApplication.birthDate}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, birthDate: e.target.value })}
//                                     required
//                                 />
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editGender">Стать</label>
//                                 <select
//                                     id="editGender"
//                                     value={editContactApplication.gender}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, gender: e.target.value as any })}
//                                     required
//                                 >
//                                     <option value="MALE">Чоловік</option>
//                                     <option value="FEMALE">Жінка</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editAgeCategory">Вікова категорія</label>
//                                 <select
//                                     id="editAgeCategory"
//                                     value={editContactApplication.ageCategory}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, ageCategory: e.target.value as any })}
//                                     required
//                                 >
//                                     <option value="AGE_6_7">6-7 років</option>
//                                     <option value="AGE_8_9">8-9 років</option>
//                                     <option value="AGE_10_11">10-11 років</option>
//                                     <option value="AGE_12_13">12-13 років</option>
//                                     <option value="AGE_14_15">14-15 років</option>
//                                     <option value="AGE_16_17">16-17 років</option>
//                                     <option value="AGE_18_PLUS">18 років і старше</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editContactProgram">Контактна програма</label>
//                                 <select
//                                     id="editContactProgram"
//                                     value={editContactApplication.contactProgram || ""}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, contactProgram: e.target.value || undefined })}
//                                     required
//                                 >
//                                     <option value="">--</option>
//                                     <option value="SANDA">Санда</option>
//                                     <option value="LIGHT_SANDA">Лайт Санда</option>
//                                     <option value="TUI_SHOW">Туй Шоу</option>
//                                     <option value="WING_CHUN">Він Чун</option>
//                                     <option value="SHUAI_JIAO">Шуай Цзяо</option>
//                                 </select>
//                             </div>
//                             <div className={styles.inputGroup}>
//                                 <label htmlFor="editWeightCategory">Вагова категорія</label>
//                                 <select
//                                     id="editWeightCategory"
//                                     value={editContactApplication.weightCategory || ""}
//                                     onChange={(e) => setEditContactApplication({ ...editContactApplication, weightCategory: e.target.value || undefined })}
//                                 >
//                                     <option value="">--</option>
//                                     <option value="UNDER_50">До 50 кг</option>
//                                     <option value="FROM_50_TO_55">50-55 кг</option>
//                                     <option value="FROM_55_TO_60">55-60 кг</option>
//                                     <option value="FROM_60_TO_65">60-65 кг</option>
//                                     <option value="FROM_65_TO_70">65-70 кг</option>
//                                     <option value="FROM_70_TO_75">70-75 кг</option>
//                                     <option value="FROM_75_TO_80">75-80 кг</option>
//                                     <option value="FROM_80_TO_85">80-85 кг</option>
//                                     <option value="FROM_85_TO_90">85-90 кг</option>
//                                     <option value="OVER_90">Понад 90 кг</option>
//                                 </select>
//                             </div>
//                             {editContactApplicationError && <p className={styles.error}>{editContactApplicationError}</p>}
//                             <button type="submit" className={styles.submitButton}>
//                                 Зберегти
//                             </button>
//                             <button
//                                 type="button"
//                                 className={styles.cancelButton}
//                                 onClick={handleCancelEditContactApplication}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

//===========
'use client';

import { useEffect, useState } from "react";
import styles from "./Cabinet.module.css";
import { useRouter } from "next/navigation";
import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete, createApplication, getMyApplications, updateApplication, deleteApplication, deleteUser, createContactApplication, getMyContactApplications, updateContactApplication, deleteContactApplication } from "@/services/api.service";
import { UserDTO, AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO, ProgramType, Gender, AgeCategory, ContactAgeCategory, WeaponlessProgram, ShortWeaponProgram, LongWeaponProgram, ContactProgram, WeightCategory, NonContactFieldValue, ContactFieldValue } from "@/types/auth";
import RegisterForm from "@/components/RegisterForm";

export default function Cabinet() {
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showUsersTable, setShowUsersTable] = useState(false);
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [editUser, setEditUser] = useState<UserDTO | null>(null);
    const [editPassword, setEditPassword] = useState("");
    const [editUserError, setEditUserError] = useState("");
    const [showAthleteForm, setShowAthleteForm] = useState(false);
    const [athleteCount, setAthleteCount] = useState(1);
    const [athletes, setAthletes] = useState<AthleteDTO[]>([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
    const [athleteError, setAthleteError] = useState("");
    const [showMyAthletes, setShowMyAthletes] = useState(false);
    const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
    const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
    const [editAthleteError, setEditAthleteError] = useState("");
    const [showNonContactForm, setShowNonContactForm] = useState(false);
    const [nonContactCount, setNonContactCount] = useState(1);
    const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([{
        competitionName: "",
        athleteFirstName: "",
        athleteLastName: "",
        birthDate: "",
        gender: "MALE",
        ageCategory: "YOUNGER_JUNIORS_6_8",
        weaponlessProgram: undefined,
        shortWeaponProgram: undefined,
        longWeaponProgram: undefined,
        duilian: ""
    }]);
    const [nonContactError, setNonContactError] = useState("");
    const [showMyApplications, setShowMyApplications] = useState(false);
    const [myApplications, setMyApplications] = useState<CompetitionApplicationDTO[]>([]);
    const [editApplication, setEditApplication] = useState<CompetitionApplicationDTO | null>(null);
    const [editApplicationError, setEditApplicationError] = useState("");
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactCount, setContactCount] = useState(1);
    const [contactApplications, setContactApplications] = useState<ContactCompetitionApplicationDTO[]>([{
        competitionName: "",
        athleteFirstName: "",
        athleteLastName: "",
        birthDate: "",
        gender: "MALE",
        ageCategory: "AGE_6_7",
        contactProgram: undefined,
        weightCategory: undefined,
    }]);
    const [contactError, setContactError] = useState("");
    const [showMyContactApplications, setShowMyContactApplications] = useState(false);
    const [myContactApplications, setMyContactApplications] = useState<ContactCompetitionApplicationDTO[]>([]);
    const [editContactApplication, setEditContactApplication] = useState<ContactCompetitionApplicationDTO | null>(null);
    const [editContactApplicationError, setEditContactApplicationError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/");
            return;
        }

        const decodedToken = parseJwt(token);
        setUser({
            username: decodedToken.sub,
            roles: decodedToken.roles || [],
        });
    }, [router]);

    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            return {};
        }
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
    };

    const handleRegisterSuccess = () => {
        setSuccessMessage("Нового користувача створено");
        setShowRegisterForm(false);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const handleShowUsers = async () => {
        if (showUsersTable) {
            setShowUsersTable(false);
            setEditUser(null);
            return;
        }

        try {
            setShowRegisterForm(false);
            setEditUser(null);
            const usersData = await getAllUsers();
            setUsers(usersData);
            setShowUsersTable(true);
        } catch (error: any) {
            setSuccessMessage(`Помилка: ${error.message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleEditUser = (user: UserDTO) => {
        setEditUser(user);
        setEditPassword("");
        setShowUsersTable(false);
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((u) => u.id !== id));
            setSuccessMessage("Користувача видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("User not found")
                ? "Користувача не знайдено"
                : error.message || "Не вдалося видалити користувача";
            setSuccessMessage(`Помилка: ${message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editUser) return;

        try {
            const updatedUser = await updateUser(editUser.username, {
                id: editUser.id,
                username: editUser.username,
                password: editPassword,
                roles: editUser.roles || [],
            });
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            setEditUser(null);
            setShowUsersTable(true);
            setSuccessMessage("Користувача оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Користувача не знайдено")
                ? "Користувача не знайдено"
                : error.message || "Не вдалося оновити користувача";
            setEditUserError(message);
        }
    };

    const handleCancelEditUser = () => {
        setEditUser(null);
        setEditPassword("");
        setEditUserError("");
        setShowUsersTable(true);
    };

    const handleAddAthlete = () => {
        setShowAthleteForm(true);
        setShowNonContactForm(false);
        setShowContactForm(false);
        setAthleteCount(1);
        setAthletes([{ firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }]);
    };

    const handleAthleteCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 1;
        setAthleteCount(Math.max(1, count));
        setAthletes(
            Array(count)
                .fill(null)
                .map((_, i) =>
                    athletes[i] || { firstName: "", lastName: "", birthDate: "", programType: "TAOLU_TRADITIONAL" }
                )
        );
    };

    const handleAthleteChange = (index: number, field: keyof AthleteDTO, value: string) => {
        const newAthletes = [...athletes];
        newAthletes[index] = { ...newAthletes[index], [field]: value };
        setAthletes(newAthletes);
    };

    const handleAddAthletes = async (e: React.FormEvent) => {
        e.preventDefault();
        setAthleteError("");

        try {
            for (const athlete of athletes) {
                if (!athlete.firstName || !athlete.lastName || !athlete.birthDate || !athlete.programType) {
                    throw new Error("Усі поля для кожного атлета мають бути заповнені");
                }
                await createAthlete(athlete);
            }
            setSuccessMessage("Атлетів додано");
            setShowAthleteForm(false);
            setAthleteCount(1);
            setAthletes([]);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            setAthleteError(error.message || "Не вдалося додати атлетів");
        }
    };

    const handleShowMyAthletes = async () => {
        if (showMyAthletes) {
            setShowMyAthletes(false);
            setEditAthlete(null);
            return;
        }

        try {
            const athletesData = await getMyAthletes();
            const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
                ...athlete,
                birthDate: formatDate(athlete.birthDate),
            }));
            setMyAthletes(formattedAthletes);
            setShowMyAthletes(true);
            setShowAthleteForm(false);
            setShowNonContactForm(false);
            setShowContactForm(false);
            setShowMyApplications(false);
            setShowMyContactApplications(false);
            setShowUsersTable(false);
            setEditUser(null);
            setEditApplication(null);
            setEditContactApplication(null);
        } catch (error: any) {
            setSuccessMessage(`Помилка: ${error.message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleEditAthlete = (athlete: AthleteDTO) => {
        setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
        setShowMyAthletes(false);
        setShowMyApplications(false);
        setShowMyContactApplications(false);
    };

    const handleUpdateAthlete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editAthlete) return;

        try {
            if (editAthlete.id) {
                const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
                setMyAthletes(
                    myAthletes.map((a) =>
                        a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
                    )
                );
            }
            setEditAthlete(null);
            setShowMyAthletes(true);
            setShowAthleteForm(false);
            setSuccessMessage("Дані атлета оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Athlete not found")
                ? "Атлета не знайдено"
                : error.message.includes("Athlete is owned by another user")
                    ? "Ви не можете редагувати цього атлета"
                    : error.message || "Не вдалося оновити атлета";
            setEditAthleteError(message);
        }
    };

    const handleCancelEditAthlete = () => {
        setEditAthlete(null);
        setShowMyAthletes(true);
        setShowAthleteForm(false);
    };

    const handleDeleteAthlete = async (id: number) => {
        try {
            await deleteAthlete(id);
            setMyAthletes(myAthletes.filter((a) => a.id !== id));
            setSuccessMessage("Атлета видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Athlete not found")
                ? "Атлета не знайдено"
                : error.message.includes("Athlete is owned by another user")
                    ? "Ви не можете видалити цього атлета"
                    : error.message || "Не вдалося видалити атлета";
            setAthleteError(message);
        }
    };

    const handleNonContactApplication = () => {
        setShowNonContactForm(true);
        setShowAthleteForm(false);
        setShowContactForm(false);
        setNonContactCount(1);
        setNonContactApplications([{
            competitionName: "",
            athleteFirstName: "",
            athleteLastName: "",
            birthDate: "",
            gender: "MALE",
            ageCategory: "YOUNGER_JUNIORS_6_8",
            weaponlessProgram: undefined,
            shortWeaponProgram: undefined,
            longWeaponProgram: undefined,
            duilian: ""
        }]);
    };

    const handleNonContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 1;
        setNonContactCount(Math.max(1, count));
        setNonContactApplications(
            Array(count)
                .fill(null)
                .map((_, i) =>
                        nonContactApplications[i] || {
                            competitionName: "",
                            athleteFirstName: "",
                            athleteLastName: "",
                            birthDate: "",
                            gender: "MALE",
                            ageCategory: "YOUNGER_JUNIORS_6_8",
                            weaponlessProgram: undefined,
                            shortWeaponProgram: undefined,
                            longWeaponProgram: undefined,
                            duilian: ""
                        }
                )
        );
    };

    const handleNonContactChange = (
        index: number,
        field: keyof CompetitionApplicationDTO,
        value: NonContactFieldValue
    ) => {
        const newApplications = [...nonContactApplications];
        newApplications[index] = { ...newApplications[index], [field]: value };
        setNonContactApplications(newApplications);
    };

    const handleAddNonContactApplications = async (e: React.FormEvent) => {
        e.preventDefault();
        setNonContactError("");

        try {
            for (const application of nonContactApplications) {
                if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory) {
                    throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
                }
                await createApplication({ ...application, birthDate: formatDate(application.birthDate) });
            }
            setSuccessMessage("Заявки подано");
            setShowNonContactForm(false);
            setNonContactCount(1);
            setNonContactApplications([]);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            setNonContactError(error.message || "Не вдалося подати заявки");
        }
    };

    const handleShowMyApplications = async () => {
        if (showMyApplications) {
            setShowMyApplications(false);
            setEditApplication(null);
            return;
        }

        try {
            const applicationsData = await getMyApplications();
            const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
                ...app,
                birthDate: formatDate(app.birthDate),
            }));
            setMyApplications(formattedApplications);
            setShowMyApplications(true);
            setShowAthleteForm(false);
            setShowNonContactForm(false);
            setShowContactForm(false);
            setShowMyAthletes(false);
            setShowMyContactApplications(false);
            setShowUsersTable(false);
            setEditUser(null);
            setEditAthlete(null);
            setEditContactApplication(null);
        } catch (error: any) {
            setSuccessMessage(`Помилка: ${error.message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleEditApplication = (application: CompetitionApplicationDTO) => {
        setEditApplication({ ...application, birthDate: formatDate(application.birthDate) });
        setShowMyApplications(false);
        setShowMyAthletes(false);
        setShowMyContactApplications(false);
    };

    const handleUpdateApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editApplication) return;

        try {
            if (editApplication.id) {
                const updatedApplication = await updateApplication(editApplication.id, editApplication);
                setMyApplications(
                    myApplications.map((a) =>
                        a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
                    )
                );
            }
            setEditApplication(null);
            setShowMyApplications(true);
            setShowNonContactForm(false);
            setSuccessMessage("Дані заявки оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message.includes("Application is owned by another user")
                    ? "Ви не можете редагувати цю заявку"
                    : error.message || "Не вдалося оновити заявку";
            setEditApplicationError(message);
        }
    };

    const handleCancelEditApplication = () => {
        setEditApplication(null);
        setShowMyApplications(true);
        setShowNonContactForm(false);
    };

    const handleDeleteApplication = async (id: number) => {
        try {
            await deleteApplication(id);
            setMyApplications(myApplications.filter((a) => a.id !== id));
            setSuccessMessage("Заявку видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message.includes("Application is owned by another user")
                    ? "Ви не можете видалити цю заявку"
                    : error.message || "Не вдалося видалити заявку";
            setSuccessMessage(`Помилка: ${message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleContactApplication = () => {
        setShowContactForm(true);
        setShowAthleteForm(false);
        setShowNonContactForm(false);
        setContactCount(1);
        setContactApplications([{
            competitionName: "",
            athleteFirstName: "",
            athleteLastName: "",
            birthDate: "",
            gender: "MALE",
            ageCategory: "AGE_6_7",
            contactProgram: undefined,
            weightCategory: undefined,
        }]);
    };

    const handleContactCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 1;
        setContactCount(Math.max(1, count));
        setContactApplications(
            Array(count)
                .fill(null)
                .map((_, i) =>
                        contactApplications[i] || {
                            competitionName: "",
                            athleteFirstName: "",
                            athleteLastName: "",
                            birthDate: "",
                            gender: "MALE",
                            ageCategory: "AGE_6_7",
                            contactProgram: undefined,
                            weightCategory: undefined,
                        }
                )
        );
    };

    const handleContactChange = (
        index: number,
        field: keyof ContactCompetitionApplicationDTO,
        value: ContactFieldValue
    ) => {
        const newApplications = [...contactApplications];
        newApplications[index] = { ...newApplications[index], [field]: value };
        setContactApplications(newApplications);
    };

    const handleAddContactApplications = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactError("");

        try {
            for (const application of contactApplications) {
                if (!application.competitionName || !application.athleteFirstName || !application.athleteLastName || !application.birthDate || !application.gender || !application.ageCategory || !application.contactProgram) {
                    throw new Error("Усі обов’язкові поля для кожної заявки мають бути заповнені");
                }
                await createContactApplication({ ...application, birthDate: formatDate(application.birthDate) });
            }
            setSuccessMessage("Заявки подано");
            setShowContactForm(false);
            setContactCount(1);
            setContactApplications([]);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            setContactError(error.message || "Не вдалося подати заявки");
        }
    };

    const handleShowMyContactApplications = async () => {
        if (showMyContactApplications) {
            setShowMyContactApplications(false);
            setEditContactApplication(null);
            return;
        }

        try {
            const applicationsData = await getMyContactApplications();
            const formattedApplications = applicationsData.map((app: ContactCompetitionApplicationDTO) => ({
                ...app,
                birthDate: formatDate(app.birthDate),
            }));
            setMyContactApplications(formattedApplications);
            setShowMyContactApplications(true);
            setShowAthleteForm(false);
            setShowNonContactForm(false);
            setShowContactForm(false);
            setShowMyAthletes(false);
            setShowMyApplications(false);
            setShowUsersTable(false);
            setEditUser(null);
            setEditAthlete(null);
            setEditApplication(null);
        } catch (error: any) {
            setSuccessMessage(`Помилка: ${error.message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleEditContactApplication = (application: ContactCompetitionApplicationDTO) => {
        setEditContactApplication({ ...application, birthDate: formatDate(application.birthDate) });
        setShowMyContactApplications(false);
        setShowMyAthletes(false);
        setShowMyApplications(false);
    };

    const handleUpdateContactApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editContactApplication) return;

        try {
            if (editContactApplication.id) {
                const updatedApplication = await updateContactApplication(editContactApplication.id, editContactApplication);
                setMyContactApplications(
                    myContactApplications.map((a) =>
                        a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
                    )
                );
            }
            setEditContactApplication(null);
            setShowMyContactApplications(true);
            setShowContactForm(false);
            setSuccessMessage("Дані заявки оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message.includes("Application is owned by another user")
                    ? "Ви не можете редагувати цю заявку"
                    : error.message || "Не вдалося оновити заявку";
            setEditContactApplicationError(message);
        }
    };

    const handleCancelEditContactApplication = () => {
        setEditContactApplication(null);
        setShowMyContactApplications(true);
        setShowContactForm(false);
    };

    const handleDeleteContactApplication = async (id: number) => {
        try {
            await deleteContactApplication(id);
            setMyContactApplications(myContactApplications.filter((a) => a.id !== id));
            setSuccessMessage("Заявку видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message.includes("Application is owned by another user")
                    ? "Ви не можете видалити цю заявку"
                    : error.message || "Не вдалося видалити заявку";
            setSuccessMessage(`Помилка: ${message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    if (!user) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className={styles.container}>
            {!editAthlete && !editApplication && !editContactApplication && !showMyAthletes && !showMyApplications && !showMyContactApplications && (
                <>
                    <h1>Особистий кабінет</h1>
                    <p>Вітаємо, {user.username}!</p>
                    <p>Ролі: {user.roles.join(", ")}</p>
                    <div className={styles.buttonRow}>
                        {user.roles.includes("ROLE_SUPERADMIN") && (
                            <>
                                <button
                                    className={styles.registerButton}
                                    onClick={() => {
                                        setShowRegisterForm(!showRegisterForm);
                                        setShowUsersTable(false);
                                    }}
                                >
                                    {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
                                </button>
                                <button className={styles.usersButton} onClick={handleShowUsers}>
                                    {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
                                </button>
                            </>
                        )}
                        {user.roles.includes("ROLE_USER") && (
                            <>
                                <button className={styles.athleteButton} onClick={handleAddAthlete}>
                                    Додати атлета до бази
                                </button>
                                <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
                                    Мої атлети
                                </button>
                                <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
                                    Заповнити заявку (неконтактні види)
                                </button>
                                <button className={styles.checkApplicationButton} onClick={handleShowMyApplications}>
                                    Перевірити заявку
                                </button>
                                <button className={styles.contactButton} onClick={handleContactApplication}>
                                    Заповнити заявку (контактні види)
                                </button>
                                <button className={styles.checkContactApplicationButton} onClick={handleShowMyContactApplications}>
                                    Перевірити контактні заявки
                                </button>
                            </>
                        )}
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Вийти
                        </button>
                    </div>
                    {showRegisterForm && (
                        <div className={styles.formWrapper}>
                            <RegisterForm onSuccess={handleRegisterSuccess} />
                        </div>
                    )}
                    {successMessage && <p className={successMessage.includes("Помилка") ? styles.error : styles.success}>{successMessage}</p>}
                </>
            )}

            {showUsersTable && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Користувачі</h3>
                        <table className={styles.usersTable}>
                            <thead>
                            <tr>
                                <th>Ім'я користувача</th>
                                <th>Ролі</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.username}</td>
                                    <td>{u.roles?.join(", ") || "Немає ролей"}</td>
                                    <td>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditUser(u)}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteUser(u.id)}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setShowUsersTable(false)}
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            )}

            {editUser && (
                <div className={styles.formWrapper}>
                    <div className={styles.editFormContainer}>
                        <h3>Редагувати користувача: {editUser.username}</h3>
                        <form onSubmit={handleUpdateUser} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editPassword">Новий пароль</label>
                                <input
                                    type="password"
                                    id="editPassword"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {editUserError && <p className={styles.error}>{editUserError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Зберегти
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelEditUser}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showAthleteForm && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Додати атлетів</h3>
                        <div className={styles.inputGroup}>
                            <label htmlFor="athleteCount">Кількість атлетів</label>
                            <input
                                type="number"
                                id="athleteCount"
                                min="1"
                                value={athleteCount}
                                onChange={handleAthleteCountChange}
                                className={styles.countInput}
                            />
                        </div>
                        <form onSubmit={handleAddAthletes}>
                            <div className={styles.athleteTableWrapper}>
                                <table className={styles.athleteTable}>
                                    <thead>
                                    <tr>
                                        <th>Ім'я</th>
                                        <th>Прізвище</th>
                                        <th>Дата народження</th>
                                        <th>Тип програми</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {athletes.map((athlete, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={athlete.firstName}
                                                    onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={athlete.lastName}
                                                    onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={athlete.birthDate}
                                                    onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    value={athlete.programType}
                                                    onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
                                                    required
                                                >
                                                    <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
                                                    <option value="CONTACT">Контактні види</option>
                                                    <option value="TAOLU_SPORT">Спортивне таолу</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {athleteError && <p className={styles.error}>{athleteError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Додати атлетів
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => setShowAthleteForm(false)}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showMyAthletes && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Мої атлети</h3>
                        <table className={styles.athleteTable}>
                            <thead>
                            <tr>
                                <th>Ім'я</th>
                                <th>Прізвище</th>
                                <th>Дата народження</th>
                                <th>Тип програми</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {myAthletes.map((athlete) => (
                                <tr key={athlete.id}>
                                    <td>{athlete.firstName}</td>
                                    <td>{athlete.lastName}</td>
                                    <td>{athlete.birthDate}</td>
                                    <td>
                                        {athlete.programType === "TAOLU_TRADITIONAL"
                                            ? "Традиційне таолу"
                                            : athlete.programType === "CONTACT"
                                                ? "Контактні види"
                                                : "Спортивне таолу"}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditAthlete(athlete)}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteAthlete(athlete.id!)}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setShowMyAthletes(false)}
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            )}

            {editAthlete && (
                <div className={styles.formWrapper}>
                    <div className={styles.editFormContainer}>
                        <h3>Редагувати атлета: {editAthlete.firstName} {editAthlete.lastName}</h3>
                        <form onSubmit={handleUpdateAthlete} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editFirstName">Ім'я</label>
                                <input
                                    type="text"
                                    id="editFirstName"
                                    value={editAthlete.firstName}
                                    onChange={(e) => setEditAthlete({ ...editAthlete, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editLastName">Прізвище</label>
                                <input
                                    type="text"
                                    id="editLastName"
                                    value={editAthlete.lastName}
                                    onChange={(e) => setEditAthlete({ ...editAthlete, lastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editBirthDate">Дата народження</label>
                                <input
                                    type="date"
                                    id="editBirthDate"
                                    value={editAthlete.birthDate}
                                    onChange={(e) => setEditAthlete({ ...editAthlete, birthDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editProgramType">Тип програми</label>
                                <select
                                    id="editProgramType"
                                    value={editAthlete.programType}
                                    onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as ProgramType })}
                                    required
                                >
                                    <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
                                    <option value="CONTACT">Контактні види</option>
                                    <option value="TAOLU_SPORT">Спортивне таолу</option>
                                </select>
                            </div>
                            {editAthleteError && <p className={styles.error}>{editAthleteError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Зберегти
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelEditAthlete}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showNonContactForm && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Заповнити заявку (неконтактні види)</h3>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nonContactCount">Кількість атлетів</label>
                            <input
                                type="number"
                                id="nonContactCount"
                                min="1"
                                value={nonContactCount}
                                onChange={handleNonContactCountChange}
                                className={styles.countInput}
                            />
                        </div>
                        <form onSubmit={handleAddNonContactApplications}>
                            <div className={styles.athleteTableWrapper}>
                                <table className={styles.athleteTable}>
                                    <thead>
                                    <tr>
                                        <th>Назва змагання</th>
                                        <th>Ім'я</th>
                                        <th>Прізвище</th>
                                        <th>Дата народження</th>
                                        <th>Стать</th>
                                        <th>Вікова категорія</th>
                                        <th>Програма без зброї</th>
                                        <th>Коротка зброя</th>
                                        <th>Довга зброя</th>
                                        <th>Дуйлянь</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {nonContactApplications.map((application, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.competitionName}
                                                    onChange={(e) => handleNonContactChange(index, "competitionName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.athleteFirstName}
                                                    onChange={(e) => handleNonContactChange(index, "athleteFirstName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.athleteLastName}
                                                    onChange={(e) => handleNonContactChange(index, "athleteLastName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={application.birthDate}
                                                    onChange={(e) => handleNonContactChange(index, "birthDate", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    value={application.gender}
                                                    onChange={(e) => handleNonContactChange(index, "gender", e.target.value as Gender)}
                                                    required
                                                >
                                                    <option value="MALE">Чоловік</option>
                                                    <option value="FEMALE">Жінка</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.ageCategory}
                                                    onChange={(e) => handleNonContactChange(index, "ageCategory", e.target.value as AgeCategory)}
                                                    required
                                                >
                                                    <option value="YOUNGER_JUNIORS_6_8">6-8 років</option>
                                                    <option value="OLDER_JUNIORS_9_11">9-11 років</option>
                                                    <option value="YOUNGER_YOUTH_12_14">12-14 років</option>
                                                    <option value="OLDER_YOUTH_15_17">15-17 років</option>
                                                    <option value="ADULTS_18_PLUS">18 років і старше</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.weaponlessProgram || ""}
                                                    onChange={(e) => handleNonContactChange(index, "weaponlessProgram", e.target.value as WeaponlessProgram || undefined)}
                                                >
                                                    <option value="">--</option>
                                                    <option value="CHANG_QUAN">Чан цюань</option>
                                                    <option value="NAN_QUAN">Нань цюань</option>
                                                    <option value="TAIJI_QUAN">Тайцзі цюань</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.shortWeaponProgram || ""}
                                                    onChange={(e) => handleNonContactChange(index, "shortWeaponProgram", e.target.value as ShortWeaponProgram || undefined)}
                                                >
                                                    <option value="">--</option>
                                                    <option value="DAO_SHU">Дао шу</option>
                                                    <option value="JIAN_SHU">Цзянь шу</option>
                                                    <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
                                                    <option value="NAN_DAO">Нань дао</option>
                                                    <option value="TAIJI_SHAN">Тайцзі шань</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.longWeaponProgram || ""}
                                                    onChange={(e) => handleNonContactChange(index, "longWeaponProgram", e.target.value as LongWeaponProgram || undefined)}
                                                >
                                                    <option value="">--</option>
                                                    <option value="GUN_SHU">Гунь шу</option>
                                                    <option value="QIANG_SHU">Цян шу</option>
                                                    <option value="NAN_GUN">Нань гунь</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.duilian}
                                                    onChange={(e) => handleNonContactChange(index, "duilian", e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {nonContactError && <p className={styles.error}>{nonContactError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Подати заявку
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => setShowNonContactForm(false)}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showMyApplications && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Мої заявки</h3>
                        <table className={styles.athleteTable}>
                            <thead>
                            <tr>
                                <th>Назва змагання</th>
                                <th>Ім'я</th>
                                <th>Прізвище</th>
                                <th>Дата народження</th>
                                <th>Стать</th>
                                <th>Вікова категорія</th>
                                <th>Програма без зброї</th>
                                <th>Коротка зброя</th>
                                <th>Довга зброя</th>
                                <th>Дуйлянь</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {myApplications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.competitionName}</td>
                                    <td>{application.athleteFirstName}</td>
                                    <td>{application.athleteLastName}</td>
                                    <td>{application.birthDate}</td>
                                    <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
                                    <td>
                                        {application.ageCategory === "YOUNGER_JUNIORS_6_8" ? "6-8 років" :
                                            application.ageCategory === "OLDER_JUNIORS_9_11" ? "9-11 років" :
                                                application.ageCategory === "YOUNGER_YOUTH_12_14" ? "12-14 років" :
                                                    application.ageCategory === "OLDER_YOUTH_15_17" ? "15-17 років" :
                                                        "18 років і старше"}
                                    </td>
                                    <td>{application.weaponlessProgram || "--"}</td>
                                    <td>{application.shortWeaponProgram || "--"}</td>
                                    <td>{application.longWeaponProgram || "--"}</td>
                                    <td>{application.duilian || "--"}</td>
                                    <td>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditApplication(application)}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteApplication(application.id!)}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setShowMyApplications(false)}
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            )}

            {editApplication && (
                <div className={styles.formWrapper}>
                    <div className={styles.editFormContainer}>
                        <h3>Редагувати заявку: {editApplication.athleteFirstName} {editApplication.athleteLastName}</h3>
                        <form onSubmit={handleUpdateApplication} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editCompetitionName">Назва змагання</label>
                                <input
                                    type="text"
                                    id="editCompetitionName"
                                    value={editApplication.competitionName}
                                    onChange={(e) => setEditApplication({ ...editApplication, competitionName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAthleteFirstName">Ім'я</label>
                                <input
                                    type="text"
                                    id="editAthleteFirstName"
                                    value={editApplication.athleteFirstName}
                                    onChange={(e) => setEditApplication({ ...editApplication, athleteFirstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAthleteLastName">Прізвище</label>
                                <input
                                    type="text"
                                    id="editAthleteLastName"
                                    value={editApplication.athleteLastName}
                                    onChange={(e) => setEditApplication({ ...editApplication, athleteLastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editBirthDate">Дата народження</label>
                                <input
                                    type="date"
                                    id="editBirthDate"
                                    value={editApplication.birthDate}
                                    onChange={(e) => setEditApplication({ ...editApplication, birthDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editGender">Стать</label>
                                <select
                                    id="editGender"
                                    value={editApplication.gender}
                                    onChange={(e) => setEditApplication({ ...editApplication, gender: e.target.value as Gender })}
                                    required
                                >
                                    <option value="MALE">Чоловік</option>
                                    <option value="FEMALE">Жінка</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAgeCategory">Вікова категорія</label>
                                <select
                                    id="editAgeCategory"
                                    value={editApplication.ageCategory}
                                    onChange={(e) => setEditApplication({ ...editApplication, ageCategory: e.target.value as AgeCategory })}
                                    required
                                >
                                    <option value="YOUNGER_JUNIORS_6_8">6-8 років</option>
                                    <option value="OLDER_JUNIORS_9_11">9-11 років</option>
                                    <option value="YOUNGER_YOUTH_12_14">12-14 років</option>
                                    <option value="OLDER_YOUTH_15_17">15-17 років</option>
                                    <option value="ADULTS_18_PLUS">18 років і старше</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editWeaponlessProgram">Програма без зброї</label>
                                <select
                                    id="editWeaponlessProgram"
                                    value={editApplication.weaponlessProgram || ""}
                                    onChange={(e) => setEditApplication({ ...editApplication, weaponlessProgram: e.target.value as WeaponlessProgram || undefined })}
                                >
                                    <option value="">--</option>
                                    <option value="CHANG_QUAN">Чан цюань</option>
                                    <option value="NAN_QUAN">Нань цюань</option>
                                    <option value="TAIJI_QUAN">Тайцзі цюань</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editShortWeaponProgram">Коротка зброя</label>
                                <select
                                    id="editShortWeaponProgram"
                                    value={editApplication.shortWeaponProgram || ""}
                                    onChange={(e) => setEditApplication({ ...editApplication, shortWeaponProgram: e.target.value as ShortWeaponProgram || undefined })}
                                >
                                    <option value="">--</option>
                                    <option value="DAO_SHU">Дао шу</option>
                                    <option value="JIAN_SHU">Цзянь шу</option>
                                    <option value="TAIJI_JIAN_SHU">Тайцзі цзянь шу</option>
                                    <option value="NAN_DAO">Нань дао</option>
                                    <option value="TAIJI_SHAN">Тайцзі шань</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editLongWeaponProgram">Довга зброя</label>
                                <select
                                    id="editLongWeaponProgram"
                                    value={editApplication.longWeaponProgram || ""}
                                    onChange={(e) => setEditApplication({ ...editApplication, longWeaponProgram: e.target.value as LongWeaponProgram || undefined })}
                                >
                                    <option value="">--</option>
                                    <option value="GUN_SHU">Гунь шу</option>
                                    <option value="QIANG_SHU">Цян шу</option>
                                    <option value="NAN_GUN">Нань гунь</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editDuilian">Дуйлянь</label>
                                <input
                                    type="text"
                                    id="editDuilian"
                                    value={editApplication.duilian}
                                    onChange={(e) => setEditApplication({ ...editApplication, duilian: e.target.value })}
                                />
                            </div>
                            {editApplicationError && <p className={styles.error}>{editApplicationError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Зберегти
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelEditApplication}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showContactForm && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Заповнити заявку (контактні види)</h3>
                        <div className={styles.inputGroup}>
                            <label htmlFor="contactCount">Кількість атлетів</label>
                            <input
                                type="number"
                                id="contactCount"
                                min="1"
                                value={contactCount}
                                onChange={handleContactCountChange}
                                className={styles.countInput}
                            />
                        </div>
                        <form onSubmit={handleAddContactApplications}>
                            <div className={styles.athleteTableWrapper}>
                                <table className={styles.athleteTable}>
                                    <thead>
                                    <tr>
                                        <th>Назва змагання</th>
                                        <th>Ім'я</th>
                                        <th>Прізвище</th>
                                        <th>Дата народження</th>
                                        <th>Стать</th>
                                        <th>Вікова категорія</th>
                                        <th>Контактна програма</th>
                                        <th>Вагова категорія</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {contactApplications.map((application, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.competitionName}
                                                    onChange={(e) => handleContactChange(index, "competitionName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.athleteFirstName}
                                                    onChange={(e) => handleContactChange(index, "athleteFirstName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={application.athleteLastName}
                                                    onChange={(e) => handleContactChange(index, "athleteLastName", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={application.birthDate}
                                                    onChange={(e) => handleContactChange(index, "birthDate", e.target.value)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    value={application.gender}
                                                    onChange={(e) => handleContactChange(index, "gender", e.target.value as Gender)}
                                                    required
                                                >
                                                    <option value="MALE">Чоловік</option>
                                                    <option value="FEMALE">Жінка</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.ageCategory}
                                                    onChange={(e) => handleContactChange(index, "ageCategory", e.target.value as ContactAgeCategory)}
                                                    required
                                                >
                                                    <option value="AGE_6_7">6-7 років</option>
                                                    <option value="AGE_8_9">8-9 років</option>
                                                    <option value="AGE_10_11">10-11 років</option>
                                                    <option value="AGE_12_13">12-13 років</option>
                                                    <option value="AGE_14_15">14-15 років</option>
                                                    <option value="AGE_16_17">16-17 років</option>
                                                    <option value="AGE_18_PLUS">18 років і старше</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.contactProgram || ""}
                                                    onChange={(e) => handleContactChange(index, "contactProgram", e.target.value as ContactProgram || undefined)}
                                                    required
                                                >
                                                    <option value="">--</option>
                                                    <option value="SANDA">Санда</option>
                                                    <option value="LIGHT_SANDA">Лайт санда</option>
                                                    <option value="TUI_SHOW">Туй шоу</option>
                                                    <option value="WING_CHUN">Він чун</option>
                                                    <option value="SHUAI_JIAO">Шуай цзяо</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={application.weightCategory || ""}
                                                    onChange={(e) => handleContactChange(index, "weightCategory", e.target.value as WeightCategory || undefined)}
                                                >
                                                    <option value="">--</option>
                                                    <option value="UNDER_50">До 50 кг</option>
                                                    <option value="FROM_50_TO_55">50-55 кг</option>
                                                    <option value="FROM_55_TO_60">55-60 кг</option>
                                                    <option value="FROM_60_TO_65">60-65 кг</option>
                                                    <option value="FROM_65_TO_70">65-70 кг</option>
                                                    <option value="FROM_70_TO_75">70-75 кг</option>
                                                    <option value="FROM_75_TO_80">75-80 кг</option>
                                                    <option value="FROM_80_TO_85">80-85 кг</option>
                                                    <option value="FROM_85_TO_90">85-90 кг</option>
                                                    <option value="OVER_90">Понад 90 кг</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {contactError && <p className={styles.error}>{contactError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Подати заявку
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => setShowContactForm(false)}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showMyContactApplications && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Мої контактні заявки</h3>
                        <table className={styles.athleteTable}>
                            <thead>
                            <tr>
                                <th>Назва змагання</th>
                                <th>Ім'я</th>
                                <th>Прізвище</th>
                                <th>Дата народження</th>
                                <th>Стать</th>
                                <th>Вікова категорія</th>
                                <th>Контактна програма</th>
                                <th>Вагова категорія</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {myContactApplications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.competitionName}</td>
                                    <td>{application.athleteFirstName}</td>
                                    <td>{application.athleteLastName}</td>
                                    <td>{application.birthDate}</td>
                                    <td>{application.gender === "MALE" ? "Чоловік" : "Жінка"}</td>
                                    <td>
                                        {application.ageCategory === "AGE_6_7" ? "6-7 років" :
                                            application.ageCategory === "AGE_8_9" ? "8-9 років" :
                                                application.ageCategory === "AGE_10_11" ? "10-11 років" :
                                                    application.ageCategory === "AGE_12_13" ? "12-13 років" :
                                                        application.ageCategory === "AGE_14_15" ? "14-15 років" :
                                                            application.ageCategory === "AGE_16_17" ? "16-17 років" :
                                                                "18 років і старше"}
                                    </td>
                                    <td>{application.contactProgram }</td>
                                    <td>
                                        {application.weightCategory === "UNDER_50" ? "До 50 кг" :
                                            application.weightCategory === "FROM_50_TO_55" ? "50-55 кг" :
                                                application.weightCategory === "FROM_55_TO_60" ? "55-60 кг" :
                                                    application.weightCategory === "FROM_60_TO_65" ? "60-65 кг" :
                                                        application.weightCategory === "FROM_65_TO_70" ? "65-70 кг" :
                                                            application.weightCategory === "FROM_70_TO_75" ? "Д70-75 кг" :
                                                                application.weightCategory === "FROM_75_TO_80" ? "75-80 кг" :
                                                                    application.weightCategory === "FROM_80_TO_85" ? "80-85 кг" :
                                                                        application.weightCategory === "FROM_85_TO_90" ? "85-90 кг" :
                                                                            application.weightCategory === "OVER_90" ? "Понад 90 кг" : "--"}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditContactApplication(application)}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteContactApplication(application.id!)}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setShowMyContactApplications(false)}
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            )}

            {editContactApplication && (
                <div className={styles.formWrapper}>
                    <div className={styles.editFormContainer}>
                        <h3>Редагувати заявку: {editContactApplication.athleteFirstName} {editContactApplication.athleteLastName}</h3>
                        <form onSubmit={handleUpdateContactApplication} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editCompetitionName">Назва змагання</label>
                                <input
                                    type="text"
                                    id="editCompetitionName"
                                    value={editContactApplication.competitionName}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, competitionName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAthleteFirstName">Ім'я</label>
                                <input
                                    type="text"
                                    id="editAthleteFirstName"
                                    value={editContactApplication.athleteFirstName}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, athleteFirstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAthleteLastName">Прізвище</label>
                                <input
                                    type="text"
                                    id="editAthleteLastName"
                                    value={editContactApplication.athleteLastName}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, athleteLastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editBirthDate">Дата народження</label>
                                <input
                                    type="date"
                                    id="editBirthDate"
                                    value={editContactApplication.birthDate}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, birthDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editGender">Стать</label>
                                <select
                                    id="editGender"
                                    value={editContactApplication.gender}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, gender: e.target.value as Gender })}
                                    required
                                >
                                    <option value="MALE">Чоловік</option>
                                    <option value="FEMALE">Жінка</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAgeCategory">Вікова категорія</label>
                                <select
                                    id="editAgeCategory"
                                    value={editContactApplication.ageCategory}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, ageCategory: e.target.value as ContactAgeCategory })}
                                    required
                                >
                                    <option value="AGE_6_7">6-7 років</option>
                                    <option value="AGE_8_9">8-9 років</option>
                                    <option value="AGE_10_11">10-11 років</option>
                                    <option value="AGE_12_13">12-13 років</option>
                                    <option value="AGE_14_15">14-15 років</option>
                                    <option value="AGE_16_17">16-17 років</option>
                                    <option value="AGE_18_PLUS">18 років і старше</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editContactProgram">Контактна програма</label>
                                <select
                                    id="editContactProgram"
                                    value={editContactApplication.contactProgram || ""}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, contactProgram: e.target.value as ContactProgram || undefined })}
                                    required
                                >
                                    <option value="">--</option>
                                    <option value="SANDA">Санда</option>
                                    <option value="LIGHT_SANDA">Лайт санда</option>
                                    <option value="TUI_SHOW">Туй шоу</option>
                                    <option value="WING_CHUN">Він чун</option>
                                    <option value="SHUAI_JIAO">Шуай цзяо</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editWeightCategory">Вагова категорія</label>
                                <select
                                    id="editWeightCategory"
                                    value={editContactApplication.weightCategory || ""}
                                    onChange={(e) => setEditContactApplication({ ...editContactApplication, weightCategory: e.target.value as WeightCategory || undefined })}
                                >
                                    <option value="">--</option>
                                    <option value="UNDER_50">До 50 кг</option>
                                    <option value="FROM_50_TO_55">50-55 кг</option>
                                    <option value="FROM_55_TO_60">55-60 кг</option>
                                    <option value="FROM_60_TO_65">60-65 кг</option>
                                    <option value="FROM_65_TO_70">65-70 кг</option>
                                    <option value="FROM_70_TO_75">70-75 кг</option>
                                    <option value="FROM_75_TO_80">75-80 кг</option>
                                    <option value="FROM_80_TO_85">80-85 кг</option>
                                    <option value="FROM_85_TO_90">85-90 кг</option>
                                    <option value="OVER_90">Понад 90 кг</option>
                                </select>
                            </div>
                            {editContactApplicationError && <p className={styles.error}>{editContactApplicationError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Зберегти
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelEditContactApplication}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}