
const { TestCPF } = require('./cpf_validators')

module.exports.validateRegisterUser = (
  personId,
  username,
  email,
  password,
  enabled
) => {
  const errors = {};
  if (!personId || personId === null) {
    errors.personId = "Wasn't send an Id person";
  }
  if (!enabled || enabled === null) {
    errors.enabled = "Wasn't send if enable is true or false";
  }
  if (!username || username === null) {
    errors.username = "Wasn't send an username";
  }
  if (email === null) {
    errors.email = "Wasn't send an email";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Invalid email';
    } else {
      const sufix = email.slice(-17);
      if (!sufix.match('@pcivil.rj.gov.br')) {
        errors.email = 'Need an institutinal email';
      }
    }
  }

  if (password === null) {
    errors.password = "Wasn't send a password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateUpdateUserInput = (data) => {
  const errors = {};

  if (data.personId === null) {
    errors.personId = "Not accept null value";
  }

  if (data.enabled === null) {
    errors.enabled = "Not accept null value";
  }

  if (data.username === null) {
    errors.username = "Not accept null value";
  }

  if (data.password === null) {
    errors.password = "Not accept null value";
  }

  if (data.email) {
    if (data.email === null) {
      errors.email = "Not accept null value";
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!data.email.match(regEx)) {
        errors.email = 'Invalid email';
      } else {
        const sufix = data.email.slice(-17);
        if (!sufix.match('@pcivil.rj.gov.br')) {
          errors.email = 'Need an institutinal email';
        }
      }
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateloginupdate = (email, cpf, password, confirmpassword) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'Email contem espaço(s) em branco!';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email inválido!';
    } else {
      const sufix = email.slice(-17);
      if (!sufix.match('@pcivil.rj.gov.br')) {
        errors.email = 'Necessário email institucional da SEPOL!';
      }
    }
  }

  if (password === '') {
    errors.password = 'A senha possui espaço(s) em branco!';
  } else if (password !== confirmpassword) {
    errors.confirmpassword = 'Senhas diferentes!';
  }

  if (!TestCPF(cpf)) {
    errors.cpf = 'Informe um cpf válido';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.datacheck = (timeExpires) => {
  const errors = {};
  timeExpires = new Date(timeExpires)
  const today = new Date();
  //console.log(today, timeExpires)

  if (timeExpires <= today) {
    errors.date = 'Token expirou!'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }

};
