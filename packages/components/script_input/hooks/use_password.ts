import { Ref } from 'vue';

export function usePassword(
  showPassword: Ref<boolean | undefined>,
  pwd: Ref<string>
) {
  const setPasswordMode = (isPassword: boolean) => {
    if (showPassword.value === isPassword) {
      return;
    }
    pwd.value = '';
    showPassword.value = isPassword;
  };

  return {
    _methods: {
      setPasswordMode,
    }
  };
}