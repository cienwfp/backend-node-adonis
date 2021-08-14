
const { TestCPF } = require('./cpf_validators')

module.exports.validateRegisterUser = (
  personId,
  username,
  email,
  password
) => {
  const errors = {};
  if (personId === null) {
    errors.personId = "Wasn't send an Id person";
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

module.exports.validateLoginInput = (email) => {

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
