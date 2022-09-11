import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  //check if theme already set, light default
  const theme = ref(localStorage.getItem("theme") ?? "light-theme");
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

  return { theme, language, updateTheme, updateLanguage };
});
