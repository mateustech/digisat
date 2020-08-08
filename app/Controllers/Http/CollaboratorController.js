"use strict";

const { validateAll } = use("Validator");
const Collaborator = use("App/Models/Collaborator");
// const Adress = use("App/Models/Adress");
const Database = use("Database");

class CollaboratorController {
  async index({ response }) {
    try {
      var colaborators = await Collaborator.all();
      //convertendo clientes em json
      // var colaboratorJSON = colaborator.toJSON();
      // var arrayColaborator = [];
      // for (let index = 0; index < colaboratorJSON.length; index++) {
      //   var adress = await Database.table("adresses").where(
      //     "client_id",
      //     colaboratorJSON[index].id
      //   );
      //   adress = adress[0];
      //   var obj = {
      //     id: colaboratorJSON[index].id,
      //     name: colaboratorJSON[index].name,
      //     cpf: colaboratorJSON[index].cpf,
      //     apelido: colaboratorJSON[index].rg,
      //     contato: colaboratorJSON[index].contato,
      //     contato: colaboratorJSON[index].cargo,
      //     adress: adress,
      //   };
      //   arrayColaborator.push(obj);
      // }
      // console.log("asd");
      // return arrayColaborator;
      return colaborators;
    } catch (error) {
      return response
        .status(404)
        .send({ error: `Erro: Colaborators not exists` });
    }
  }
  async store({ request, response }) {
    try {
      const errorMessage = {
        "name.required": "Esse campo é obrigatório.",
        "cpf.unique": "Esse campo ja existe.",
        "cpf.min": "Mínimo 11 caracteres.",
        "contato.required": "Esse campo é obrigatório.",
        "contato.unique": "Esse campo ja existe.",
        "contato.min": "Mínimo 11 caracteres.",
        "password.required": "Esse campo é obrigatório.",
        "password.min": "Mínimo 6 caracteres.",
      };
      const validation = await validateAll(
        request.all(),
        {
          name: "required",
          contato: "required|min:11|unique:collaborators",
          cpf: "unique:collaborators|min:11",
          password: "required|min:6",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const data = request.only([
        "name",
        "cpf",
        "rg",
        "contato",
        "password",
        "cargo",
      ]);
      // var adress = request.only(["adress"]); // pegando adress do body
      var colaborator = await Collaborator.create(data);
      // adress.adress.client_id = await colaborator.id; //pegando id do usuario
      // const adressSaved = await Adress.create(adress.adress);

      // clients.adress = adressSaved;
      return colaborator;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Not is possibled` });
    }
  }
  async show({ params, response }) {
    try {
      const colaborator = await Collaborator.findOrFail(params.id);
      // var clientJSON = clients.toJSON();
      // var adress = await Database.table("adresses").where(
      //   "client_id",
      //   clientJSON.id
      // );
      // adress = adress[0];
      // var objClient = {
      //   id: clientJSON.id,
      //   name: clientJSON.name,
      //   cpf: clientJSON.cpf,
      //   apelido: clientJSON.apelido,
      //   contato: clientJSON.contato,
      //   adress: adress,
      // };
      //return objClient;
      return colaborator;
    } catch (error) {
      return response
        .status(404)
        .send({ error: `Erro: Collaborator not exists` });
    }
  }
  async update({ params, request, response }) {
    try {
      const colaborator = await Collaborator.findOrFail(params.id);
      try {
        const errorMessage = {
          "name.required": "Esse campo é obrigatório.",
          // "cpf.unique": "Esse campo ja existe.",
          "cpf.min": "Mínimo 11 caracteres.",
          "contato.required": "Esse campo é obrigatório.",
          // "contato.unique": "Esse campo ja existe.",
          "contato.min": "Mínimo 11 caracteres.",
          "password.required": "Esse campo é obrigatório.",
          "password.min": "Mínimo 6 caracteres.",
        };
        const validation = await validateAll(
          request.all(),
          {
            name: "required",
            contato: "required|min:11",
            cpf: "min:11",
            password: "required|min:6",
          },
          errorMessage
        );
        if (validation.fails()) {
          return response.status(401).send({ message: validation.messages() });
        }
        //updating client
        const { name, cpf, rg, contato, cargo } = request.all();
        colaborator.name = name;
        colaborator.cpf = cpf;
        colaborator.rg = rg;
        colaborator.contato = contato;
        colaborator.cargo = cargo;
        await colaborator.save();

        //updating adress
        // const adressCadastrado = await Database.table("adresses").where(
        //   "client_id",
        //   clientJSON.id
        // );
        // adressCadastrado.cep = adress.cep;
        // adressCadastrado.longradouro = adress.longradouro;
        // adressCadastrado.complemento = adress.complemento;
        // adressCadastrado.numero = adress.numero;
        // adressCadastrado.pont_ref = adress.pont_ref;
        // adressCadastrado.bairro = adress.bairro;
        // adressCadastrado.cidade = adress.cidade;
        // adressCadastrado.estado = adress.estado;
        // adressCadastrado.lat = adress.lat;
        // adressCadastrado.long = adress.long;
        // adressCadastrado.zone = adress.zone;
        // await adressCadastrado.save()
        return colaborator;
      } catch (error) {}
    } catch (error) {
      return response.status(404).send({ error: `Erro: Colaborator not exists` });
    }
  }
  async destroy({ params, response }) {
    try {
      // const clients = await Client.findOrFail(params.id);
      // var clientJSON = clients.toJSON();
      // var adress = await Database.table("adresses").where(
      //   "client_id",
      //   clientJSON.id
      // );
      // await clients.delete(); //deleted client
      // await adress.delete(); //deleted adress

      const colaborator = await Collaborator.findOrFail(params.id);
      await colaborator.delete();
    } catch (error) {
      return response
        .status(404)
        .send({ error: `Erro: Colaborator not exists` });
    }
  }
}

module.exports = CollaboratorController;
