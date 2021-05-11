"use strict"

const Person = use("App/Models/Person")

class PersonController {
  async create ({ request }) {
    const data = request.only([
      'user_id',
      'firstname',
      'middlename',
      'lastnamE',
      'vulgo',
      'datanascimento',
      'natutal',
      'tipologradouro',
      'logradouro',
      'numero',
      'complemento',
      'foto',
      'organic',
    ])  

    const person = await Person.create(data)

    return person
  }
}

module.exports = PersonController