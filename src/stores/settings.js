import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  //check if theme already set, light default
  const theme = ref(readTheme());
  const language = ref("");

  function updateTheme() {
    //swap value
    theme.value === "dark-theme"
      ? (theme.value = "light-theme")
      : (theme.value = "dark-theme");

    //reset current classes
    document.body.classList.remove("light-theme");
    document.body.classList.remove("dark-theme");

    //set current class and set local storage
    document.body.classList.add(theme.value);
    localStorage.setItem("theme", theme.value);
  }

  function updateLanguage(newLanguage) {
    language.value = newLanguage;

    //update in local storage
    localStorage.setItem("language", language.value);

    //update modal
  }

  function readTheme () {
    let local = localStorage.getItem("theme");
    if (local != null) return local;

    const browser = window.matchMedia("(prefers-color-scheme: dark)");
    if (browser.matches) return "dark-theme"; else return "light-theme";
  }

  return { theme, language, updateTheme, updateLanguage };
});
