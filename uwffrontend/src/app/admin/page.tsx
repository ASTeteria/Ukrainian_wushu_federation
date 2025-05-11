'use client';

import { useEffect, useState } from "react";
import styles from "./AdminCabinet.module.css";
import { useRouter } from "next/navigation";
import { getAllAthletes, updateAthlete, deleteAthlete, getAllApplications, updateApplication, deleteApplication, getAllContactApplications, updateContactApplication, deleteContactApplication } from "@/services/api.service";
import { AthleteDTO, CompetitionApplicationDTO, ContactCompetitionApplicationDTO, ProgramType, Gender, AgeCategory, ContactAgeCategory, WeaponlessProgram, ShortWeaponProgram, LongWeaponProgram, ContactProgram, WeightCategory } from "@/types/auth";

export default function AdminCabinet() {
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showAthletes, setShowAthletes] = useState(false);
    const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
    const [editAthlete, setEditAthlete] = useState<AthleteDTO | null>(null);
    const [editAthleteError, setEditAthleteError] = useState("");
    const [showNonContactApplications, setShowNonContactApplications] = useState(false);
    const [nonContactApplications, setNonContactApplications] = useState<CompetitionApplicationDTO[]>([]);
    const [editNonContactApplication, setEditNonContactApplication] = useState<CompetitionApplicationDTO | null>(null);
    const [editNonContactError, setEditNonContactError] = useState("");
    const [showContactApplications, setShowContactApplications] = useState(false);
    const [contactApplications, setContactApplications] = useState<ContactCompetitionApplicationDTO[]>([]);
    const [editContactApplication, setEditContactApplication] = useState<ContactCompetitionApplicationDTO | null>(null);
    const [editContactError, setEditContactError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/");
            return;
        }

        const decodedToken = parseJwt(token);
        if (!decodedToken.roles?.includes("ROLE_ADMIN")) {
            router.push("/cabinet");
            return;
        }
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

    const handleShowAthletes = async () => {
        if (showAthletes) {
            setShowAthletes(false);
            setEditAthlete(null);
            return;
        }

        try {
            const athletesData = await getAllAthletes();
            const formattedAthletes = athletesData.map((athlete: AthleteDTO) => ({
                ...athlete,
                birthDate: formatDate(athlete.birthDate),
            }));
            setAthletes(formattedAthletes);
            setShowAthletes(true);
            setShowNonContactApplications(false);
            setShowContactApplications(false);
            setEditNonContactApplication(null);
            setEditContactApplication(null);
        } catch (error: any) {
            setErrorMessage(error.message || "Не вдалося завантажити атлетів");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    const handleEditAthlete = (athlete: AthleteDTO) => {
        setEditAthlete({ ...athlete, birthDate: formatDate(athlete.birthDate) });
        setShowAthletes(false);
    };

    const handleUpdateAthlete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editAthlete) return;

        try {
            if (editAthlete.id) {
                const updatedAthlete = await updateAthlete(editAthlete.id, editAthlete);
                setAthletes(
                    athletes.map((a) =>
                        a.id === updatedAthlete.id ? { ...updatedAthlete, birthDate: formatDate(updatedAthlete.birthDate) } : a
                    )
                );
            }
            setEditAthlete(null);
            setShowAthletes(true);
            setSuccessMessage("Дані атлета оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Athlete not found")
                ? "Атлета не знайдено"
                : error.message || "Не вдалося оновити атлета";
            setEditAthleteError(message);
        }
    };

    const handleCancelEditAthlete = () => {
        setEditAthlete(null);
        setEditAthleteError("");
        setShowAthletes(true);
    };

    const handleDeleteAthlete = async (id: number) => {
        try {
            await deleteAthlete(id);
            setAthletes(athletes.filter((a) => a.id !== id));
            setSuccessMessage("Атлета видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Athlete not found")
                ? "Атлета не знайдено"
                : error.message || "Не вдалося видалити атлета";
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    const handleShowNonContactApplications = async () => {
        if (showNonContactApplications) {
            setShowNonContactApplications(false);
            setEditNonContactApplication(null);
            return;
        }

        try {
            const applicationsData = await getAllApplications();
            const formattedApplications = applicationsData.map((app: CompetitionApplicationDTO) => ({
                ...app,
                birthDate: formatDate(app.birthDate),
            }));
            setNonContactApplications(formattedApplications);
            setShowNonContactApplications(true);
            setShowAthletes(false);
            setShowContactApplications(false);
            setEditAthlete(null);
            setEditContactApplication(null);
        } catch (error: any) {
            setErrorMessage(error.message || "Не вдалося завантажити заявки");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    const handleEditNonContactApplication = (application: CompetitionApplicationDTO) => {
        setEditNonContactApplication({ ...application, birthDate: formatDate(application.birthDate) });
        setShowNonContactApplications(false);
    };

    const handleUpdateNonContactApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editNonContactApplication) return;

        try {
            if (editNonContactApplication.id) {
                const updatedApplication = await updateApplication(editNonContactApplication.id, editNonContactApplication);
                setNonContactApplications(
                    nonContactApplications.map((a) =>
                        a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
                    )
                );
            }
            setEditNonContactApplication(null);
            setShowNonContactApplications(true);
            setSuccessMessage("Дані заявки оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message || "Не вдалося оновити заявку";
            setEditNonContactError(message);
        }
    };

    const handleCancelEditNonContactApplication = () => {
        setEditNonContactApplication(null);
        setEditNonContactError("");
        setShowNonContactApplications(true);
    };

    const handleDeleteNonContactApplication = async (id: number) => {
        try {
            await deleteApplication(id);
            setNonContactApplications(nonContactApplications.filter((a) => a.id !== id));
            setSuccessMessage("Заявку видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message || "Не вдалося видалити заявку";
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    const handleShowContactApplications = async () => {
        if (showContactApplications) {
            setShowContactApplications(false);
            setEditContactApplication(null);
            return;
        }

        try {
            const applicationsData = await getAllContactApplications();
            const formattedApplications = applicationsData.map((app: ContactCompetitionApplicationDTO) => ({
                ...app,
                birthDate: formatDate(app.birthDate),
            }));
            setContactApplications(formattedApplications);
            setShowContactApplications(true);
            setShowAthletes(false);
            setShowNonContactApplications(false);
            setEditAthlete(null);
            setEditNonContactApplication(null);
        } catch (error: any) {
            setErrorMessage(error.message || "Не вдалося завантажити заявки");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    const handleEditContactApplication = (application: ContactCompetitionApplicationDTO) => {
        setEditContactApplication({ ...application, birthDate: formatDate(application.birthDate) });
        setShowContactApplications(false);
    };

    const handleUpdateContactApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editContactApplication) return;

        try {
            if (editContactApplication.id) {
                const updatedApplication = await updateContactApplication(editContactApplication.id, editContactApplication);
                setContactApplications(
                    contactApplications.map((a) =>
                        a.id === updatedApplication.id ? { ...updatedApplication, birthDate: formatDate(updatedApplication.birthDate) } : a
                    )
                );
            }
            setEditContactApplication(null);
            setShowContactApplications(true);
            setSuccessMessage("Дані заявки оновлено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message || "Не вдалося оновити заявку";
            setEditContactError(message);
        }
    };

    const handleCancelEditContactApplication = () => {
        setEditContactApplication(null);
        setEditContactError("");
        setShowContactApplications(true);
    };

    const handleDeleteContactApplication = async (id: number) => {
        try {
            await deleteContactApplication(id);
            setContactApplications(contactApplications.filter((a) => a.id !== id));
            setSuccessMessage("Заявку видалено");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error: any) {
            const message = error.message.includes("Competition application not found")
                ? "Заявку не знайдено"
                : error.message || "Не вдалося видалити заявку";
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    if (!user) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className={styles.container}>
            {!editAthlete && !editNonContactApplication && !editContactApplication && (
                <>
                    <h1>Кабінет адміністратора</h1>
                    <p>Вітаємо, {user.username}!</p>
                    <p>Ролі: {user.roles.join(", ")}</p>
                    <div className={styles.buttonRow}>
                        <button className={styles.athleteButton} onClick={handleShowAthletes}>
                            {showAthletes ? "Приховати базу атлетів" : "База атлетів"}
                        </button>
                        <button className={styles.nonContactButton} onClick={handleShowNonContactApplications}>
                            {showNonContactApplications ? "Приховати заявки" : "Заявки (неконтактні види)"}
                        </button>
                        <button className={styles.contactButton} onClick={handleShowContactApplications}>
                            {showContactApplications ? "Приховати заявки" : "Заявки (контактні види)"}
                        </button>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Вийти
                        </button>
                    </div>
                    {successMessage && <p className={styles.success}>{successMessage}</p>}
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </>
            )}

            {showAthletes && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>База атлетів</h3>
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
                            {athletes.map((athlete) => (
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
                            onClick={() => setShowAthletes(false)}
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

            {showNonContactApplications && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Заявки (неконтактні види)</h3>
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
                            {nonContactApplications.map((application) => (
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
                                            onClick={() => handleEditNonContactApplication(application)}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteNonContactApplication(application.id!)}
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
                            onClick={() => setShowNonContactApplications(false)}
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            )}

            {editNonContactApplication && (
                <div className={styles.formWrapper}>
                    <div className={styles.editFormContainer}>
                        <h3>Редагувати заявку: {editNonContactApplication.athleteFirstName} {editNonContactApplication.athleteLastName}</h3>
                        <form onSubmit={handleUpdateNonContactApplication} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editCompetitionName">Назва змагання</label>
                                <input
                                    type="text"
                                    id="editCompetitionName"
                                    value={editNonContactApplication.competitionName}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, competitionName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAthleteFirstName">Ім'я</label>
                                <input
                                    type="text"
                                    id="editAthleteFirstName"
                                    value={editNonContactApplication.athleteFirstName}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, athleteFirstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editAthleteLastName">Прізвище</label>
                                <input
                                    type="text"
                                    id="editAthleteLastName"
                                    value={editNonContactApplication.athleteLastName}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, athleteLastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editBirthDate">Дата народження</label>
                                <input
                                    type="date"
                                    id="editBirthDate"
                                    value={editNonContactApplication.birthDate}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, birthDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="editGender">Стать</label>
                                <select
                                    id="editGender"
                                    value={editNonContactApplication.gender}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, gender: e.target.value as Gender })}
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
                                    value={editNonContactApplication.ageCategory}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, ageCategory: e.target.value as AgeCategory })}
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
                                    value={editNonContactApplication.weaponlessProgram || ""}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, weaponlessProgram: e.target.value as WeaponlessProgram || undefined })}
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
                                    value={editNonContactApplication.shortWeaponProgram || ""}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, shortWeaponProgram: e.target.value as ShortWeaponProgram || undefined })}
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
                                    value={editNonContactApplication.longWeaponProgram || ""}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, longWeaponProgram: e.target.value as LongWeaponProgram || undefined })}
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
                                    value={editNonContactApplication.duilian}
                                    onChange={(e) => setEditNonContactApplication({ ...editNonContactApplication, duilian: e.target.value })}
                                />
                            </div>
                            {editNonContactError && <p className={styles.error}>{editNonContactError}</p>}
                            <button type="submit" className={styles.submitButton}>
                                Зберегти
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelEditNonContactApplication}
                            >
                                Скасувати
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showContactApplications && (
                <div className={styles.formWrapper}>
                    <div className={styles.athleteFormContainer}>
                        <h3>Заявки (контактні види)</h3>
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
                            {contactApplications.map((application) => (
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
                                    <td>{application.contactProgram || "--"}</td>
                                    <td>
                                        {application.weightCategory === "UNDER_50" ? "До 50 кг" :
                                            application.weightCategory === "FROM_50_TO_55" ? "50-55 кг" :
                                                application.weightCategory === "FROM_55_TO_60" ? "55-60 кг" :
                                                    application.weightCategory === "FROM_60_TO_65" ? "60-65 кг" :
                                                        application.weightCategory === "FROM_65_TO_70" ? "65-70 кг" :
                                                            application.weightCategory === "FROM_70_TO_75" ? "70-75 кг" :
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
                            onClick={() => setShowContactApplications(false)}
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
                            {editContactError && <p className={styles.error}>{editContactError}</p>}
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

