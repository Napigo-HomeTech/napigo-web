import { useEffect, useState } from "react";

/**
 *
 * @returns
 */
export const useThemeLogo = () => {
    const [logoTheme, setLogoTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        const html = document.getElementsByTagName("html")[0] as HTMLElement;
        setLogoTheme(html.classList.contains("dark") ? "dark" : "light");
    }, []);

    return logoTheme;
};
