import React from "react";

export type Theme = {
    name: string,
    isDark: boolean
    backgroundColor: string,
    foregroundColor: string,
    hoverOverlayColor: string,
    selectedOverlayColor: string
}

const themes: Array<Theme> = [
    {
        name: 'light',
        isDark: false,
        backgroundColor: '245, 245, 245',
        foregroundColor: '35, 35, 35',
        hoverOverlayColor: 'rgba(255, 255, 255, 0.1)',
        selectedOverlayColor: 'rgba(0, 0, 0, 0.2)'
    },
    {
        name: 'dark',
        isDark: true,
        backgroundColor: '35, 35, 35',
        foregroundColor: '245, 245, 245',
        hoverOverlayColor: 'rgba(0, 0, 0, 0.05)',
        selectedOverlayColor: 'rgba(0, 0, 0, 0.2)'
    }
];

const accentColors: Array<string> = [
    '84, 156, 181',
    '161, 171, 116',
    '190, 104, 158',
    '0, 143, 180',
    '244, 121, 32',
    '97, 187, 50'
];

export let currentTheme: Theme = themes[0];
export let currentAccentColor: string = accentColors[0];

interface ThemeChooserProperties {
    themeChanged: (theme: Theme) => void | undefined
    accentColorChanged: (color: string) => void | undefined
}

class ThemeChooserState {
    public constructor() {
        this.theme = themes[0];
        this.customAccentColor = null;
    }

    theme: Theme;
    customAccentColor: string | null;
}

class ThemeChooser extends React.Component<ThemeChooserProperties, ThemeChooserState> {
    public static defaultProps = {
        themeChanged: undefined,
        accentColorChanged: undefined
    }

    public constructor(props: ThemeChooserProperties) {
        super(props);
    }

    public componentDidMount() {
        const currentThemeName = localStorage.getItem('theme');
        if (currentThemeName) {
            const theme = themes.find((theme) => theme.name === currentThemeName);
            if (theme) {
                this.changeTheme(theme, false);
            }
        }

        const accentColor = localStorage.getItem('accent');
        if (accentColor) {
            this.changeAccentColor(accentColor, false);
        }
    }

    public render() {
        return (
            <div className="theme-chooser">
                <div>
                    {themes.map((theme) => {
                        return (
                            <button key={theme.name} className={"theme " + theme.name} onClick={() => this.changeTheme(theme)}/>
                        )
                    })}
                    {accentColors.map((color) => {
                        return (
                            <button key={color} className="accent" style={{backgroundColor: 'rgb(' + color + ')'}} onClick={() => this.changeAccentColor(color)}/>
                        )
                    })}
                </div>
            </div>
        )
    }

    private changeTheme(theme: Theme, store: boolean = true) {
        currentTheme = theme;

        if (store) {
            localStorage.setItem('theme', theme.name);
        }
        document.documentElement.style.setProperty('--background', theme.backgroundColor);
        document.documentElement.style.setProperty('--foreground', theme.foregroundColor);
        document.documentElement.style.setProperty('--hover-overlay', theme.hoverOverlayColor);
        document.documentElement.style.setProperty('--selected-overlay', theme.selectedOverlayColor);

        document.documentElement.style.setProperty('--toastify-text-color-light', 'rgb(' + theme.backgroundColor + ')');
        document.documentElement.style.setProperty('--toastify-text-color-info', 'rgb(' + theme.backgroundColor + ')');
        document.documentElement.style.setProperty('--toastify-text-color-warning', 'rgb(' + theme.backgroundColor + ')');
        document.documentElement.style.setProperty('--toastify-text-color-error', 'rgb(' + theme.backgroundColor + ')');

        if (this.props.themeChanged !== undefined) {
            this.props.themeChanged(theme);
        }
    }

    private changeAccentColor(color: string, store: boolean = true) {
        currentAccentColor = color;

        if (store) {
            localStorage.setItem('accent', color);
        }
        document.documentElement.style.setProperty('--accent', color);

        document.documentElement.style.setProperty('--toastify-color-info', 'rgb(' + color + ')');
        document.documentElement.style.setProperty('--toastify-color-warning', 'rgb(' + color + ')');
        document.documentElement.style.setProperty('--toastify-color-error', 'rgb(' + color + ')');

        if (this.props.accentColorChanged !== undefined) {
            this.props.accentColorChanged(color);
        }
    }
}

export default ThemeChooser;
