import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalsStore = defineStore("modals", () => {
  const translate = ref(false);
  const indications = ref(false);
  const info = ref(false);

  return { translate, indications, info };
});
