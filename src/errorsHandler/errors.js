export const selectErrors = error => {
  const serverErrors = error?.response?.data?.status?.message;
  const customError = error.message;
  const networkOrCodeError = error?.message;

  return (
    serverErrors ||
    networkOrCodeError ||
    customError   
  );
};