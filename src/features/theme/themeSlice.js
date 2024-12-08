import { createSlice } from '@reduxjs/toolkit';

const themes = {
  sunTheme: 'sunTheme',
  moonTheme: 'moonTheme',
};

const getTheme = () => {
  // from local storage
  const localStorageTheme = localStorage.getItem('theme');

  // from prefers-color-scheme in the browser
  const colorSchemePreference = window.matchMedia(
    '(prefers-color-scheme:dark)'
  );
  const preferTheme = colorSchemePreference.matches
    ? themes.moonTheme
    : themes.sunTheme;

  return localStorageTheme || preferTheme;
};

const initialState = { theme: getTheme() };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state) => {
      document.documentElement.setAttribute('data-theme', state.theme);
      document.querySelector('body').classList.add('bg-primary');
    },
    toggleTheme: (state) => {
      const isDarkTheme = state.theme === themes.moonTheme;
      state.theme = isDarkTheme ? themes.sunTheme : themes.moonTheme;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
