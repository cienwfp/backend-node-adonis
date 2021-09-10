'use strict'

const Person = use("App/Models/Person")
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Address = use('App/Models/Address')
const Vehicle = use('App/Models/Vehicle')
const Arma = use('App/Models/Arma')
const Photo = use('App/Models/Photo')
const RelationshipPeopleToPerson = use('App/Models/RelationshipPeopleToPerson')
const {
  peopleInsert,
  photoPerson,
  enderecoPerson,
  userPerson,
  profiles,
  armas,
  vehicle } = require('../../../util/dataPhotoFalse')

const Env = use("Env")
const _ = use("lodash")

class CreateController {

  async create() {

    if (Env.get("MODE_DEV") === "1") {

      var result = {}

      for (var i = 0; i <= 2; i++) {

        var userPerson_ = {}
        var photoPerson_ = {}
        var armas_ = {}
        var vehicle_ = {}

        //Criar Pessoas
        const people = await Person.create(peopleInsert[i])

        if (people) {
          result.people = "Criado com sucesso"
        } else {
          result.people = "Problema na criação de pessoas para teste"
        }
        //################################################

        //Criar Endereços
        const peopleAddress = await Person.find(people.$attributes.id)

        const address = await Address.findOrCreate(enderecoPerson[i])

        await peopleAddress.address().attach(address.id)

        peopleAddress.address = await peopleAddress.address().fetch()

        if (peopleAddress.address) {
          result.address = "Criando com sucesso"
        } else {
          result.address = "Problema na criação de endereço para teste"
        }
        //#################################################

        const personId = { "personId": people.$attributes.id } // cria Json com personId

        //Cria os Usuários vinculados à cada pessoa gravada
        userPerson_ = _.merge(userPerson[i], personId)

        const user_ = await User.create(userPerson_)

        if (user_) {
          result.user = "Criando com sucesso"
        } else {
          result.user = "Problema na criação de user para teste"
        }
        //#################################################

        //Cria oas fotos para cada pessoa
        photoPerson_ = _.merge(photoPerson[i], personId)

        let photo_base64_

        for (photo_base64_ of photoPerson_.photo_base64) {
          await Photo
            .create(
              {
                'personId': photoPerson_.personId,
                'photo_base64': photo_base64_
              }
            )
        }
        //#################################################

        //Cria o perfil dos usuários fake
        const profile = await Profile.findOrCreate(profiles[i])

        await user_.profile().attach(profile.id)

        profile.user_ = await profile.users().fetch()


        if (profile.user_) {
          result.profile = "Criando com sucesso"
        } else {
          result.profile = "Problema na criação de perfis para teste"
        }
        //#################################################

        //Cria armas
        armas_ = _.merge(armas[i], personId)

        const arma__ = await Arma.create(armas_)

        if (i === 2){

          for (var j = 3; j <= 4; j++) {

            armas_ = {}
  
            armas_ = _.merge(armas[j], { "personId": null })
  
            const arma__ = await Arma.create(armas_)
  
          }

        }
       
        if (arma__) {
          result.arma = "Criando com sucesso"
        } else {
          result.arma = "Problema na criação de armas para teste"
        }
        //#################################################

        //Cria Veículo
        if (i === 0) {

          vehicle_ = _.merge(vehicle[i], personId)

          var vehicle__ = await Vehicle.create(vehicle_)

        } else if (i === 1) {

          vehicle_ = _.merge(vehicle[i], { "personId": null })
          
          var vehicle__ = await Vehicle.create(vehicle_)

        } else if (i === 2) {

          vehicle_ = {}

          vehicle_ = _.merge(vehicle[i], personId)

          var vehicle__ = await Vehicle.create(vehicle_)

          vehicle_ = {}

          vehicle_ = _.merge(vehicle[i+1], personId)

          var vehicle__ = await Vehicle.create(vehicle_)

        }

        if (vehicle__) {
          result.vehicle = "Criando com sucesso"
        } else {
          result.vehicle = "Problema na criação de veiculos para teste"
        }
        //#################################################

        //cria a relação entre duas pessoas


        if (i === 0) {
          var personIdFirst = people.$attributes.id
        }

        if (i === 2) {

          var personIdSecond = people.$attributes.id

          const dataConsulta = {
            'personIdFirst': personIdFirst,
            'personIdSecond': personIdSecond
          }

          const dataUpdate = {
            relation: "PAI"
          }

          var exist = await RelationshipPeopleToPerson.findBy(dataConsulta)

          if (exist) {

            exist.relation = dataUpdate

            exist.save()

          } else {

            var newRelation =
              await RelationshipPeopleToPerson
                .create({
                  'personIdFirst': personIdFirst,
                  'personIdSecond': personIdSecond,
                  'relation': dataUpdate.relation
                })

          }

          if (exist || newRelation) {
            result.Relation = "Criando com sucesso"
          } else {
            result.Relation = "Problema na criação de relação para teste"
          }

        }
      }

      return result
    
    } else {

      return ({"message": "Para utilzar esta rota deve utilizar MODE_DEV = 1"})
    }

    
  }
}

module.exports = CreateController
