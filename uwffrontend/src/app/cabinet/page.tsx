// // // // // // 'use client';
// // // // // //
// // // // // // import { useEffect, useState } from "react";
// // // // // // import styles from "./Cabinet.module.css";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import RegisterForm from "@/components/RegisterForm";
// // // // // //
// // // // // // export default function Cabinet() {
// // // // // //     const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
// // // // // //     const [showRegisterForm, setShowRegisterForm] = useState(false);
// // // // // //     const [successMessage, setSuccessMessage] = useState("");
// // // // // //     const router = useRouter();
// // // // // //
// // // // // //     useEffect(() => {
// // // // // //         const token = localStorage.getItem("accessToken");
// // // // // //         if (!token) {
// // // // // //             router.push("/");
// // // // // //             return;
// // // // // //         }
// // // // // //
// // // // // //         // Для демонстрації, у реальному проекті потрібно отримати дані користувача з бекенду
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
// // // // // //         setTimeout(() => setSuccessMessage(""), 3000); // Прибрати повідомлення через 3 секунди
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
// // // // // //                     {showRegisterForm && (
// // // // // //                         <div className={styles.formWrapper}>
// // // // // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // // // // //                         </div>
// // // // // //                     )}
// // // // // //                 </>
// // // // // //             )}
// // // // // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // // //                 Вийти
// // // // // //             </button>
// // // // // //         </div>
// // // // // //     );
// // // // // // }
// // // // //
// // // // // 'use client';
// // // // //
// // // // // import { useEffect, useState } from "react";
// // // // // import styles from "./Cabinet.module.css";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { getAllUsers, updateUser } from "@/services/api.service";
// // // // // import { UserDTO } from "@/types/auth";
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
// // // // //     const [editError, setEditError] = useState("");
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
// // // // //         setEditPassword(user.password || "");
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
// // // // //             setEditError(error.message || "Не вдалося оновити користувача");
// // // // //         }
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
// // // // //                             {editError && <p className={styles.error}>{editError}</p>}
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
// // // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // // //                 Вийти
// // // // //             </button>
// // // // //         </div>
// // // // //     );
// // // // // }
// // // //
// // // // 'use client';
// // // //
// // // // import { useEffect, useState } from "react";
// // // // import styles from "./Cabinet.module.css";
// // // // import { useRouter } from "next/navigation";
// // // // import { getAllUsers, updateUser } from "@/services/api.service";
// // // // import { UserDTO } from "@/types/auth";
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
// // // //     const [editError, setEditError] = useState("");
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
// // // //             setEditError(message);
// // // //         }
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
// // // //                             {editError && <p className={styles.error}>{editError}</p>}
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
// // // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // // //                 Вийти
// // // //             </button>
// // // //         </div>
// // // //     );
// // // // }
// // //
// // //
// // // 'use client';
// // //
// // // import { useEffect, useState } from "react";
// // // import styles from "./Cabinet.module.css";
// // // import { useRouter } from "next/navigation";
// // // import { getAllUsers, updateUser } from "@/services/api.service";
// // // import { UserDTO } from "@/types/auth";
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
// // //     const [editError, setEditError] = useState("");
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
// // //             console.log("Fetched users:", usersData);
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
// // //             setEditError(message);
// // //         }
// // //     };
// // //
// // //     const handleAddAthlete = () => {
// // //         console.log("Додати атлета до бази");
// // //     };
// // //
// // //     const handleNonContactApplication = () => {
// // //         console.log("Заповнити заявку (не контактні види)");
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
// // //             <h1>Особистий кабінет</h1>
// // //             <p>Вітаємо, {user.username}!</p>
// // //             <p>Ролі: {user.roles.join(", ")}</p>
// // //             {user.roles.includes("ROLE_SUPERADMIN") && (
// // //                 <>
// // //                     <p>Ви маєте права супер адміністратора!</p>
// // //                     <button
// // //                         className={styles.registerButton}
// // //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// // //                     >
// // //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// // //                     </button>
// // //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// // //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// // //                     </button>
// // //                     {showRegisterForm && (
// // //                         <div className={styles.formWrapper}>
// // //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// // //                         </div>
// // //                     )}
// // //                     {showUsersTable && (
// // //                         <table className={styles.usersTable}>
// // //                             <thead>
// // //                             <tr>
// // //                                 <th>Ім'я користувача</th>
// // //                                 <th>Ролі</th>
// // //                                 <th>Дії</th>
// // //                             </tr>
// // //                             </thead>
// // //                             <tbody>
// // //                             {users.map((u) => (
// // //                                 <tr key={u.username}>
// // //                                     <td>{u.username}</td>
// // //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// // //                                     <td>
// // //                                         <button
// // //                                             className={styles.editButton}
// // //                                             onClick={() => handleEditUser(u)}
// // //                                         >
// // //                                             Редагувати
// // //                                         </button>
// // //                                     </td>
// // //                                 </tr>
// // //                             ))}
// // //                             </tbody>
// // //                         </table>
// // //                     )}
// // //                 </>
// // //             )}
// // //             {user.roles.includes("ROLE_USER") && (
// // //                 <>
// // //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// // //                         Додати атлета до бази
// // //                     </button>
// // //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// // //                         Заповнити заявку (не контактні види)
// // //                     </button>
// // //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// // //                         Заповнити заявку (контактні види)
// // //                     </button>
// // //                 </>
// // //             )}
// // //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// // //             {editUser && (
// // //                 <div className={styles.formWrapper}>
// // //                     <div className={styles.editFormContainer}>
// // //                         <h3>Редагувати користувача: {editUser.username}</h3>
// // //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// // //                             <div className={styles.inputGroup}>
// // //                                 <label htmlFor="editPassword">Новий пароль</label>
// // //                                 <input
// // //                                     type="password"
// // //                                     id="editPassword"
// // //                                     value={editPassword}
// // //                                     onChange={(e) => setEditPassword(e.target.value)}
// // //                                     required
// // //                                 />
// // //                             </div>
// // //                             {editError && <p className={styles.error}>{editError}</p>}
// // //                             <button type="submit" className={styles.submitButton}>
// // //                                 Зберегти
// // //                             </button>
// // //                             <button
// // //                                 type="button"
// // //                                 className={styles.cancelButton}
// // //                                 onClick={() => setEditUser(null)}
// // //                             >
// // //                                 Скасувати
// // //                             </button>
// // //                         </form>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //             <button className={styles.logoutButton} onClick={handleLogout}>
// // //                 Вийти
// // //             </button>
// // //         </div>
// // //     );
// // // }
// //
// //
// //
// // 'use client';
// //
// // import { useEffect, useState } from "react";
// // import styles from "./Cabinet.module.css";
// // import { useRouter } from "next/navigation";
// // import { getAllUsers, updateUser, createAthlete } from "@/services/api.service";
// // import { UserDTO, AthleteDTO } from "@/types/auth";
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
// //     const [editError, setEditError] = useState("");
// //     const [showAthleteForm, setShowAthleteForm] = useState(false);
// //     const [athleteCount, setAthleteCount] = useState(1);
// //     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
// //     const [athleteError, setAthleteError] = useState("");
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
// //             console.log("Fetched users:", usersData);
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
// //             setEditError(message);
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
// //     const handleNonContactApplication = () => {
// //         console.log("Заповнити заявку (не контактні види)");
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
// //             <h1>Особистий кабінет</h1>
// //             <p>Вітаємо, {user.username}!</p>
// //             <p>Ролі: {user.roles.join(", ")}</p>
// //             {user.roles.includes("ROLE_SUPERADMIN") && (
// //                 <>
// //                     <p>Ви маєте права супер адміністратора!</p>
// //                     <button
// //                         className={styles.registerButton}
// //                         onClick={() => setShowRegisterForm(!showRegisterForm)}
// //                     >
// //                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
// //                     </button>
// //                     <button className={styles.usersButton} onClick={handleShowUsers}>
// //                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
// //                     </button>
// //                     {showRegisterForm && (
// //                         <div className={styles.formWrapper}>
// //                             <RegisterForm onSuccess={handleRegisterSuccess} />
// //                         </div>
// //                     )}
// //                     {showUsersTable && (
// //                         <table className={styles.usersTable}>
// //                             <thead>
// //                             <tr>
// //                                 <th>Ім'я користувача</th>
// //                                 <th>Ролі</th>
// //                                 <th>Дії</th>
// //                             </tr>
// //                             </thead>
// //                             <tbody>
// //                             {users.map((u) => (
// //                                 <tr key={u.username}>
// //                                     <td>{u.username}</td>
// //                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
// //                                     <td>
// //                                         <button
// //                                             className={styles.editButton}
// //                                             onClick={() => handleEditUser(u)}
// //                                         >
// //                                             Редагувати
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                             </tbody>
// //                         </table>
// //                     )}
// //                 </>
// //             )}
// //             {user.roles.includes("ROLE_USER") && (
// //                 <>
// //                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
// //                         Додати атлета до бази
// //                     </button>
// //                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
// //                         Заповнити заявку (не контактні види)
// //                     </button>
// //                     <button className={styles.contactButton} onClick={handleContactApplication}>
// //                         Заповнити заявку (контактні види)
// //                     </button>
// //                 </>
// //             )}
// //             {successMessage && <p className={styles.success}>{successMessage}</p>}
// //             {editUser && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.editFormContainer}>
// //                         <h3>Редагувати користувача: {editUser.username}</h3>
// //                         <form onSubmit={handleUpdateUser} className={styles.form}>
// //                             <div className={styles.inputGroup}>
// //                                 <label htmlFor="editPassword">Новий пароль</label>
// //                                 <input
// //                                     type="password"
// //                                     id="editPassword"
// //                                     value={editPassword}
// //                                     onChange={(e) => setEditPassword(e.target.value)}
// //                                     required
// //                                 />
// //                             </div>
// //                             {editError && <p className={styles.error}>{editError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Зберегти
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={() => setEditUser(null)}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             {showAthleteForm && (
// //                 <div className={styles.formWrapper}>
// //                     <div className={styles.athleteFormContainer}>
// //                         <h3>Додати атлетів</h3>
// //                         <div className={styles.inputGroup}>
// //                             <label htmlFor="athleteCount">Кількість атлетів</label>
// //                             <input
// //                                 type="number"
// //                                 id="athleteCount"
// //                                 min="1"
// //                                 value={athleteCount}
// //                                 onChange={handleAthleteCountChange}
// //                                 className={styles.countInput}
// //                             />
// //                         </div>
// //                         <form onSubmit={handleAddAthletes}>
// //                             <table className={styles.athleteTable}>
// //                                 <thead>
// //                                 <tr>
// //                                     <th>Ім'я</th>
// //                                     <th>Прізвище</th>
// //                                     <th>Дата народження</th>
// //                                     <th>Тип програми</th>
// //                                 </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                 {athletes.map((athlete, index) => (
// //                                     <tr key={index}>
// //                                         <td>
// //                                             <input
// //                                                 type="text"
// //                                                 value={athlete.firstName}
// //                                                 onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
// //                                                 required
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <input
// //                                                 type="text"
// //                                                 value={athlete.lastName}
// //                                                 onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
// //                                                 required
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <input
// //                                                 type="date"
// //                                                 value={athlete.birthDate}
// //                                                 onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
// //                                                 required
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <select
// //                                                 value={athlete.programType}
// //                                                 onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
// //                                                 required
// //                                             >
// //                                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
// //                                                 <option value="CONTACT">Контактні види</option>
// //                                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
// //                                             </select>
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                                 </tbody>
// //                             </table>
// //                             {athleteError && <p className={styles.error}>{athleteError}</p>}
// //                             <button type="submit" className={styles.submitButton}>
// //                                 Додати атлетів
// //                             </button>
// //                             <button
// //                                 type="button"
// //                                 className={styles.cancelButton}
// //                                 onClick={() => setShowAthleteForm(false)}
// //                             >
// //                                 Скасувати
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //             <button className={styles.logoutButton} onClick={handleLogout}>
// //                 Вийти
// //             </button>
// //         </div>
// //     );
// // }
//
//
// 'use client';
//
// import { useEffect, useState } from "react";
// import styles from "./Cabinet.module.css";
// import { useRouter } from "next/navigation";
// import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete } from "@/services/api.service";
// import { UserDTO, AthleteDTO } from "@/types/auth";
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
//     const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
//     const [athleteError, setAthleteError] = useState("");
//     const [showMyAthletes, setShowMyAthletes] = useState(false);
//     const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
//     const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
//     const [editAthleteError, setEditAthleteError] = useState("");
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
//             return;
//         }
//
//         try {
//             const usersData = await getAllUsers();
//             console.log("Fetched users:", usersData);
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
//     };
//
//     const handleUpdateUser = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editUser) return;
//
//         try {
//             const updatedUser = await updateUser(editUser.username, {
//                 username: editUser.username,
//                 password: editPassword,
//             });
//             setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
//             setEditUser(null);
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
//     const handleAddAthlete = () => {
//         setShowAthleteForm(true);
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
//             return;
//         }
//
//         try {
//             const athletesData = await getMyAthletes();
//             console.log("Fetched my athletes:", athletesData);
//             setMyAthletes(athletesData);
//             setShowMyAthletes(true);
//         } catch (error: any) {
//             setSuccessMessage(`Помилка: ${error.message}`);
//             setTimeout(() => setSuccessMessage(""), 3000);
//         }
//     };
//
//     const handleEditAthlete = (athlete: AthleteDTO) => {
//         setEditAthlete(athlete);
//     };
//
//     const handleUpdateAthlete = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editAthlete || !editAthlete.id) return;
//
//         try {
//             const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
//             setMyAthletes(myAthletes.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a)));
//             setEditAthlete(null);
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
//     const handleNonContactApplication = () => {
//         console.log("Заповнити заявку (не контактні види)");
//     };
//
//     const handleContactApplication = () => {
//         console.log("Заповнити заявку (контактні види)");
//     };
//
//     if (!user) {
//         return <div>Завантаження...</div>;
//     }
//
//     return (
//         <div className={styles.container}>
//             <h1>Особистий кабінет</h1>
//             <p>Вітаємо, {user.username}!</p>
//             <p>Ролі: {user.roles.join(", ")}</p>
//             {user.roles.includes("ROLE_SUPERADMIN") && (
//                 <>
//                     <p>Ви маєте права супер адміністратора!</p>
//                     <button
//                         className={styles.registerButton}
//                         onClick={() => setShowRegisterForm(!showRegisterForm)}
//                     >
//                         {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
//                     </button>
//                     <button className={styles.usersButton} onClick={handleShowUsers}>
//                         {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
//                     </button>
//                     {showRegisterForm && (
//                         <div className={styles.formWrapper}>
//                             <RegisterForm onSuccess={handleRegisterSuccess} />
//                         </div>
//                     )}
//                     {showUsersTable && (
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
//                                 <tr key={u.username}>
//                                     <td>{u.username}</td>
//                                     <td>{u.roles?.join(", ") || "Немає ролей"}</td>
//                                     <td>
//                                         <button
//                                             className={styles.editButton}
//                                             onClick={() => handleEditUser(u)}
//                                         >
//                                             Редагувати
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </>
//             )}
//             {user.roles.includes("ROLE_USER") && (
//                 <>
//                     <button className={styles.athleteButton} onClick={handleAddAthlete}>
//                         Додати атлета до бази
//                     </button>
//                     <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
//                         {showMyAthletes ? "Приховати моїх атлетів" : "Мої атлети"}
//                     </button>
//                     <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
//                         Заповнити заявку (не контактні види)
//                     </button>
//                     <button className={styles.contactButton} onClick={handleContactApplication}>
//                         Заповнити заявку (контактні види)
//                     </button>
//                 </>
//             )}
//             {successMessage && <p className={styles.success}>{successMessage}</p>}
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
//                                 onClick={() => setEditUser(null)}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
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
//                             <table className={styles.athleteTable}>
//                                 <thead>
//                                 <tr>
//                                     <th>Ім'я</th>
//                                     <th>Прізвище</th>
//                                     <th>Дата народження</th>
//                                     <th>Тип програми</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {athletes.map((athlete, index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={athlete.firstName}
//                                                 onChange={(e) => handleAthleteChange(index, "firstName", e.target.value)}
//                                                 required
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={athlete.lastName}
//                                                 onChange={(e) => handleAthleteChange(index, "lastName", e.target.value)}
//                                                 required
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="date"
//                                                 value={athlete.birthDate}
//                                                 onChange={(e) => handleAthleteChange(index, "birthDate", e.target.value)}
//                                                 required
//                                             />
//                                         </td>
//                                         <td>
//                                             <select
//                                                 value={athlete.programType}
//                                                 onChange={(e) => handleAthleteChange(index, "programType", e.target.value)}
//                                                 required
//                                             >
//                                                 <option value="TAOLU_TRADITIONAL">Традиційне таолу</option>
//                                                 <option value="CONTACT">Контактні види</option>
//                                                 <option value="TAOLU_SPORT">Спортивне таолу</option>
//                                             </select>
//                                         </td>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
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
//                                 onClick={() => setEditAthlete(null)}
//                             >
//                                 Скасувати
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             <button className={styles.logoutButton} onClick={handleLogout}>
//                 Вийти
//             </button>
//         </div>
//     );
// }



'use client';

import { useEffect, useState } from "react";
import styles from "./Cabinet.module.css";
import { useRouter } from "next/navigation";
import { getAllUsers, updateUser, createAthlete, getMyAthletes, updateAthlete, deleteAthlete } from "@/services/api.service";
import { UserDTO, AthleteDTO } from "@/types/auth";
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
    const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
    const [athleteError, setAthleteError] = useState("");
    const [showMyAthletes, setShowMyAthletes] = useState(false);
    const [myAthletes, setMyAthletes] = useState<AthleteDTO[]>([]);
    const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
    const [editAthleteError, setEditAthleteError] = useState("");
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
            return;
        }

        try {
            const usersData = await getAllUsers();
            console.log("Fetched users:", usersData);
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
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editUser) return;

        try {
            const updatedUser = await updateUser(editUser.username, {
                username: editUser.username,
                password: editPassword,
            });
            setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
            setEditUser(null);
            setSuccessMessage("Користувача оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Користувача не знайдено")
                ? "Користувача не знайдено"
                : error.message || "Не вдалося оновити користувача";
            setEditUserError(message);
        }
    };

    const handleAddAthlete = () => {
        setShowAthleteForm(true);
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
            return;
        }

        try {
            const athletesData = await getMyAthletes();
            console.log("Fetched my athletes:", athletesData);
            setMyAthletes(athletesData);
            setShowMyAthletes(true);
        } catch (error: any) {
            setSuccessMessage(`Помилка: ${error.message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleEditAthlete = (athlete: AthleteDTO) => {
        setEditAthlete(athlete);
    };

    const handleUpdateAthlete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editAthlete || !editAthlete.id) return;

        try {
            const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
            setMyAthletes(myAthletes.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a)));
            setEditAthlete(null);
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
            setSuccessMessage(`Помилка: ${message}`);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleNonContactApplication = () => {
        console.log("Заповнити заявку (не контактні види)");
    };

    const handleContactApplication = () => {
        console.log("Заповнити заявку (контактні види)");
    };

    if (!user) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Особистий кабінет</h1>
            <p>Вітаємо, {user.username}!</p>
            <p>Ролі: {user.roles.join(", ")}</p>
            {user.roles.includes("ROLE_SUPERADMIN") && (
                <>
                    <p>Ви маєте права супер адміністратора!</p>
                    <button
                        className={styles.registerButton}
                        onClick={() => setShowRegisterForm(!showRegisterForm)}
                    >
                        {showRegisterForm ? "Скасувати" : "Реєстрація нового користувача"}
                    </button>
                    <button className={styles.usersButton} onClick={handleShowUsers}>
                        {showUsersTable ? "Приховати користувачів" : "Всі користувачі"}
                    </button>
                    {showRegisterForm && (
                        <div className={styles.formWrapper}>
                            <RegisterForm onSuccess={handleRegisterSuccess} />
                        </div>
                    )}
                    {showUsersTable && (
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
                                <tr key={u.username}>
                                    <td>{u.username}</td>
                                    <td>{u.roles?.join(", ") || "Немає ролей"}</td>
                                    <td>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditUser(u)}
                                        >
                                            Редагувати
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
            {user.roles.includes("ROLE_USER") && (
                <>
                    <button className={styles.athleteButton} onClick={handleAddAthlete}>
                        Додати атлета до бази
                    </button>
                    <button className={styles.myAthletesButton} onClick={handleShowMyAthletes}>
                        {showMyAthletes ? "Приховати моїх атлетів" : "Мої атлети"}
                    </button>
                    <button className={styles.nonContactButton} onClick={handleNonContactApplication}>
                        Заповнити заявку (не контактні види)
                    </button>
                    <button className={styles.contactButton} onClick={handleContactApplication}>
                        Заповнити заявку (контактні види)
                    </button>
                </>
            )}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
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
                                onClick={() => setEditUser(null)}
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
                                    onChange={(e) => setEditAthlete({ ...editAthlete, programType: e.target.value as any })}
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
                                onClick={() => setEditAthlete(null)}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <button className={styles.logoutButton} onClick={handleLogout}>
                Вийти
            </button>
        </div>
    );
}