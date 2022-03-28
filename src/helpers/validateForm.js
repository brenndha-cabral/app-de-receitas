const validateForm = ({ email, password }) => {
  const PASSWORD_LENGTH = 6;
  const emailPattern = /\S+@\S+\.\S+/;

  // Validação de email - Referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  return emailPattern.test(email) && password.length > PASSWORD_LENGTH;
};

export default validateForm;
