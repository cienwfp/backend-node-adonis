'use strict'

const Person = use('App/Models/Person')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Address = use('App/Models/Address')
const vehicle = use('App/Models/Vehicle')
const Arma = use('App/Models/Arma')
const Photo = use('App/Models/Photo')
const RelationshipPeopleToPerson = use('App/Models/RelationshipPeopleToPerson')

const Env = use("Env")

class CreateController {

  async data() {

    if (Env.get("DEV")) {

      people = [

        {
          "name": "Wanderson de Freitas Pereira Neto",
          "tipo_logradouro": null,
          "created_at": "2021-08-20 02:39:37",
          "updated_at": "2021-08-23 14:38:09",
          "sexo": null,
          "mae": "Marcia",
          "pai": null,
          "nacionalidade": null,
          "data_nascimento": null,
          "uf_nascimento": null,
          "municipio_nascimento": null,
          "cpf": "00000000000",
          "rg": null,
          "uf_rg": null,
          "orgao_rg": null,
          "obito": null,
          "organico": null,
          "codinome": null,
          "obs": null,
          "restritivo": "A",
          "posicional": "90",
        },
        {
          "name": "Wanderson",
          "tipo_logradouro": null,
          "created_at": "2021-08-20 02:39:37",
          "updated_at": "2021-08-23 14:38:09",
          "sexo": null,
          "mae": "Marcia",
          "pai": null,
          "nacionalidade": null,
          "data_nascimento": null,
          "uf_nascimento": null,
          "municipio_nascimento": null,
          "cpf": "00000000000",
          "rg": null,
          "uf_rg": null,
          "orgao_rg": null,
          "obito": null,
          "organico": null,
          "codinome": null,
          "obs": null,
          "restritivo": "A",
          "posicional": "90",
        }
      ]

    }
  }
}
