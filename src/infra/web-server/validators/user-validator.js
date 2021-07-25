const yup = require('yup');
require('./yup.locale.pt-br');

module.exports = yup.object().shape({
  name: yup
    .string()
    .required('Informe o nome do usuário')
    .test({
      message: 'o nome deve ter no minimo 3 digitos',
      test: (value) => (value ? String(value).length >= 3 : false),
    }),
  email: yup.string().email('Informe um e-mail válido').required('Informe o e-mail'),
  password: yup.string().required('Informe a senha').min(6),
});

