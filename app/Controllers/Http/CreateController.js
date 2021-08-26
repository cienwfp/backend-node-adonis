'use strict'

const Database = use('Database')

const Person = use("App/Models/Person")
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Address = use('App/Models/Address')
const vehicle = use('App/Models/Vehicle')
const Arma = use('App/Models/Arma')
const Photo = use('App/Models/Photo')
const RelationshipPeopleToPerson = use('App/Models/RelationshipPeopleToPerson')

const Env = use("Env")
const _ = use("lodash")

class CreateController {

  async create() {

    if (Env.get("MODE_DEV")) {

      var result = {}

      const peopleInsert = [

          {
            "name": "ANTONIO JOSE",
            "sexo": 'MASCULINO',
            "mae": "MARIA JOSÉ",
            "pai": "MARCOS JOSÉ",
            "nacionalidade": "BRASIL",
            "data_nascimento": "2000-01-01",
            "uf_nascimento": "RJ",
            "municipio_nascimento": "RIO DE JANEIRO",
            "cpf": "00000000000",
            "rg": null,
            "uf_rg": null,
            "orgao_rg": null,
            "obito": null,
            "organico": null,
            "codinome": null,
            "obs": "O PROCESSO DE ESCRAVIZAÇÃO DE UM POVO SE ETERNIZA NO TEMPO, EM CASA NEGRO QUE TEM A SUA VIA CEIFADA",
            "restritivo": "A",
            "posicional": "10",
          },
          {
            "name": "CELINO DUTRA",
            "sexo": "MASCULINO",
            "mae": "MARCIA AMARAL",
            "pai": null,
            "nacionalidade": "ARGENTINA",
            "data_nascimento": "1978-03-27",
            "uf_nascimento": "BA",
            "municipio_nascimento": "RECOLETA",
            "cpf": "00000000000",
            "rg": null,
            "uf_rg": null,
            "orgao_rg": null,
            "obito": null,
            "organico": null,
            "codinome": null,
            "obs": null,
            "restritivo": "A",
            "posicional": "20",
          },
          {
            "name": "ISRAEL TALIBÃ",
            "sexo": "FEMININO",
            "mae": null,
            "pai": "BIN LADEN",
            "nacionalidade": "ISRAEL",
            "data_nascimento": "1984-01-22",
            "uf_nascimento": "TV",
            "municipio_nascimento": "BAIRRO",
            "cpf": "00000000000",
            "rg": null,
            "uf_rg": null,
            "orgao_rg": null,
            "obito": null,
            "organico": null,
            "codinome": null,
            "obs": null,
            "restritivo": "Z",
            "posicional": "90",
          }
      ]

      var enderecoPerson = [
        {
          "tipo_logradouro":"PRAÇA",
          "logradouro":"CRISTIANO OTONI",
          "numero":1,
          "complemento":"PRÉDIO DA CENTRAL DO BRASIL",
          "bairro":"CENTRO",
          "cidade":"RIO DE JANEIRO",
          "uf":"RJ",
          "cep":"00000000",
          "obs":"PRÉDIO DA SECRETARIA DE ESTADUAL DE ADMIINSTAÇÃO PENITENCIÁRIA"
        }
      ]

      peopleInsert.forEach(

        async (person) => {

          const people = await Person.create(person)

          const id = {"PersonId": people.$attributes.id}

          _.merge(enderecoPerson, id)

          const address = await Address.create(enderecoPerson[0])

          console.log(address)

        }
      )

    }
  }
}

module.exports = CreateController
