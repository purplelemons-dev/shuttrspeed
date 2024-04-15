import type { User } from "$lib";

interface Settings extends User {
    theme: string;
    language: string;
}

export const getSettings = (user: User): Settings => {
    const settings = JSON.parse(localStorage.getItem('settings') as string);
    return {
        ...settings,
        ...user,
        theme: localStorage.getItem("theme") || "light"
    };
};
