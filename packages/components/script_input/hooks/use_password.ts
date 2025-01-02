import { ModelRef } from 'vue';

export function usePassword(
  showPassword: ModelRef<boolean | undefined>,
  pwd: ModelRef<string>
) {
  const setPasswordMode = (isPassword: boolean) => {
   if (showPassword.value === isPassword) {
    return;
   }
   pwd.value = '';
   showPassword.value = isPassword;
  }
  const togglePasswordMode = () => {
    setPasswordMode(!showPassword.value);
  }

  return {
    _methods: {
      setPasswordMode,
      togglePasswordMode
    }
  }
}