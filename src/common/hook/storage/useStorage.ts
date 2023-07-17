import { onMounted, onUnmounted, ref, type Ref } from "vue";

const getItem = (key: string, storage: Storage) => {
  let jsonObjectToReturn;
  const value = storage.getItem(key);
  if (value) {
    try {
      jsonObjectToReturn = JSON.parse(value);
    } catch (error) {
      jsonObjectToReturn = undefined;
    }
  }
  return jsonObjectToReturn;
};

export const useStorage = <T>(
  key: string,
  type: "local" | "session" = "local"
): [Ref<T>, (v: T) => void] => {
  let storage: Storage;
  switch (type) {
    case "session":
      storage = sessionStorage;
      break;
    case "local":
      storage = localStorage;
      break;
    default:
      storage = localStorage;
  }
  const value: Ref<T> = ref(getItem(key, storage));

  const setItem = (storage: Storage) => {
    return (newValue: T) => {
      value.value = newValue;
      storage.setItem(key, JSON.stringify(newValue));
    };
  };

  let intervalStorageId: number;
  onMounted(() => {
    intervalStorageId = window.setInterval(() => {
      value.value = getItem(key, storage);
    }, 5000);
  });

  onUnmounted(() => {
    window.clearInterval(intervalStorageId);
  });

  return [value, setItem(storage)];
};
