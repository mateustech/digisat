"use strict";

const { ClientBase } = require("pg");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
const Client = use("App/Models/Client");
const Adress = use("App/Models/Adress");
const Database = use("Database");
class ClientController {
  async index() {
    var clients = await Client.all();
    //convertendo clientes em json
    var clientsJSON = clients.toJSON();

    if (!clients) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
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
  }

  async store({ request }) {
    try {
      const errorMessage = {
        "name.required": "Esse campo é obrigatório.",
        "cpf.unique": "Esse campo ja existe.",
        "cpf.min": "Minino 11 caracteres.",
        "contato.required": "Esse campo é obrigatório.",
      };
      const validation = await validateAll(
        request.all(),
        {
          name: "required",
          contato: "required|unique:clients",
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
    } catch (error) {}
  }

  async show({ params, response }) {
    const clients = await Client.findOrFail(params.id);
    var clientJSON = clients.toJSON();
    if (!clients) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    var adress = await Database.table("adresses").where(
      "client_id",
      clientJSON.id
    );
    adress = adress[0];
    var objClient = {
      id: clientJSON.id,
      name: clientJSON.name,
      cpf: clientJSON.cpf,
      apelido: clientJSON.apelido,
      contato: clientJSON.contato,
      adress: adress,
    };
    return objClient;
  }

  async update({ params, request, response }) {
    const clients = await Client.findOrFail(params.id);
    const { name, cpf, apelido, contato } = request.all();
    
    if (!clients) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }

    clients.name = name;
    clients.cpf = cpf;
    clients.apelido = apelido;
    clients.contato = contato;

    await clients.save();
    return clients;
  }

  async destroy({ params, response }) {
    const clients = await Client.findOrFail(params.id);
    var clientJSON = clients.toJSON();
    var adress = await Database.table("adresses").where(
      "client_id",
      clientJSON.id
    );
    if (!clients) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    await clients.delete(); //deleted client
    await adress.delete(); //deleted adress

    //? Ver com igor a questão de deletar Clientes, se vai deixar registrado os endereços e/ou OS's.
  }
}

module.exports = ClientController;
