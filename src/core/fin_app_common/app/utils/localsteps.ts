export const useLocalStepsData = (module: string, realm: string) => defineStore(`local-${module}.${realm}`, () => {
  const data = ref<any>({});

  const reset = () => {
    data.value = {};
  }
  const clear = reset;

  return { data, clear };
})();