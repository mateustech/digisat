"use strict";

const { ClientBase } = require("pg");

const { validateAll } = use("Validator");
const Client = use("App/Models/Client");
const Adress = use("App/Models/Adress");
const Database = use("Database");
class ClientController {
  async index({ response }) {
    try {
      var clients = await Client.all();
      //convertendo clientes em json
      var clientsJSON = clients.toJSON();
      var arrayClients = [];
      for (let index = 0; index < clientsJSON.length; index++) {
        var adress = await Database.table("adresses").where(
          "client_id",
          clientsJSON[index].id
        );
        adress = adress[0];
        var obj = {
          id: clientsJSON[index].id,
          name: clientsJSON[index].name,
          cpf: clientsJSON[index].cpf,
          apelido: clientsJSON[index].apelido,
          contato: clientsJSON[index].contato,
          adress: adress,
        };
        arrayClients.push(obj);
      }
      return arrayClients;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Clients not exists` });
    }
  }
  async store({ request, response }) {
    try {
      const errorMessage = {
        "name.required": "Esse campo é obrigatório.",
        "cpf.unique": "Esse campo ja existe.",
        "cpf.min": "Minino 11 caracteres.",
        "contato.required": "Esse campo é obrigatório.",
        "contato.min": "Minino 11 caracteres.",
      };
      const validation = await validateAll(
        request.all(),
        {
          name: "required",
          contato: "required|min:11",
          cpf: "unique:clients|min:11",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const data = request.only(["name", "cpf", "apelido", "contato"]);
      var adress = request.only(["adress"]); // pegando adress do body
      var clients = await Client.create(data);
      adress.adress.client_id = await clients.id; //pegando id do usuario
      const adressSaved = await Adress.create(adress.adress);

      clients.adress = adressSaved;
      return clients;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Not is possibled` });
    }
  }
  async show({ params, response }) {
    try {
      var clients = await Client.findOrFail(params.id);
      const adress = await clients.adresses().fetch();
      clients.adress = adress;
      return clients;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Client not exists` });
    }
  }
  async update({ params, request, response }) {
    try {
      const clients = await Client.findOrFail(params.id);
      try {
        const errorMessage = {
          "name.required": "Esse campo é obrigatório.",
          "cpf.min": "Minino 11 caracteres.",
          "contato.required": "Esse campo é obrigatório.",
          "contato.min": "Minino 11 caracteres.",
        };
        const validation = await validateAll(
          request.all(),
          {
            name: "required",
            contato: "required|min:11",
            cpf: "min:11",
          },
          errorMessage
        );
        if (validation.fails()) {
          return response.status(401).send({ message: validation.messages() });
        }
        //updating client
        const { name, cpf, apelido, contato, adress } = request.all();
        clients.name = name;
        clients.cpf = cpf;
        clients.apelido = apelido;
        clients.contato = contato;
        await clients.save();

        //updating adress
        var clientJSON = clients.toJSON();
        const adressCadastrado = await Database.table("adresses").where(
          "client_id",
          clientJSON.id
        );
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
        return clients;
      } catch (error) {}
    } catch (error) {
      return response.status(404).send({ error: `Erro: Client not exists` });
    }
  }
  async destroy({ params, response }) {
    try {
      const clients = await Client.findOrFail(params.id);
      // var clientJSON = clients.toJSON();
      // var adress = await Database.table("adresses").where(
      //   "client_id",
      //   clientJSON.id
      // );
      await clients.delete(); //deleted client
      //await adress.delete(); //deleted adress
      return response.status(200).send({ sucess: `Deleted Sucess` });
      //? Ver com igor a questão de deletar Clientes, se vai deixar registrado os endereços e/ou OS's.
    } catch (error) {
      return response.status(404).send({ error: `Erro: Client not exists` });
    }
  }
}

module.exports = ClientController;
