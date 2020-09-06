"use strict";
const { validateAll } = use("Validator");
const OrdensServices = use("App/Models/OrdensService");
const Database = use("Database");
//desfazendo merda
class OrdensServiceController {
  async index({ request, response }) {
    try {
      var ordensServices = await OrdensServices.all();
      var osJSON = ordensServices.toJSON();
      var arrayOS = [];
      for (let index = 0; index < osJSON.length; index++) {
        var client = await Database.table("clients").where(
          "id",
          osJSON[index].client_id
        );
        var colaborator = await Database.table("collaborators").where(
          "id",
          osJSON[index].colaborator_id
        );
        var service = await Database.table("services").where(
          "id",
          osJSON[index].service_id
        );
        var adress = await Database.table("adresses").where(
          "client_id",
          osJSON[index].client_id
        );
        var obj = {
          id: osJSON[index].id,
          client: client[0],
          colaborator: colaborator[0],
          service: service[0],
          adress: adress[0],
          data: osJSON[index].data,
          hora: osJSON[index].hora,
          tempo: osJSON[index].tempo,
          obs: osJSON[index].obs,
        };
        arrayOS.push(obj);
      }
      return arrayOS;
    } catch (error) {
      return response.status(404).send({ error: `Erro: OS's not exists` });
    }
  }
  async show({ params, response }) {
    try {
      const ordensServices = await OrdensServices.findOrFail(params.id);
      var client = await Database.table("clients").where(
        "id",
        ordensServices.client_id
      );
      var colaborator = await Database.table("collaborators").where(
        "id",
        ordensServices.colaborator_id
      );
      var service = await Database.table("services").where(
        "id",
        ordensServices.service_id
      );
      var adress = await Database.table("adresses").where(
        "client_id",
        ordensServices.client_id
      );
      var obj = {
        id: ordensServices.id,
        client: client[0],
        colaborator: colaborator[0],
        service: service[0],
        adress: adress[0],
        data: ordensServices.data,
        hora: ordensServices.hora,
        tempo: ordensServices.tempo,
        obs: ordensServices.obs,
      };
      return obj;
    } catch (error) {
      return response.status(404).send({ error: `Erro: OS not exists` });
    }
  }
  async store({ request, response }) {
    try {
      const errorMessage = {
        "client_id.required": "Esse campo é obrigatório.",
        "colaborator_id.required": "Esse campo é obrigatório.",
        "adress_id.required": "Esse campo é obrigatório.",
        "data.required": "Esse campo é obrigatório.",
        "hora.required": "Esse campo é obrigatório.",
      };
      const validation = await validateAll(
        request.all(),
        {
          client_id: "required",
          colaborator_id: "required",
          adress_id: "required",
          data: "required",
          hora: "required",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const data = request.all();
      // console.log(data.service.id);

      // return [];
      const obj = {
        client_id: data.client_id,
        colaborator_id: data.colaborator_id,
        adress_id: data.adress_id,
        service_id: data.service.id,
        data: data.data,
        hora: data.hora,
        tempo: data.tempo,
        obs: data.obs,
      };
      const ordensServices = await OrdensServices.create(obj);
      return ordensServices;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Not is possibled` });
    }
  }

  async update({ params, request, response }) {
    try {
      const ordensServices = await OrdensServices.findOrFail(params.id);
      const errorMessage = {
        "client_id.required": "Esse campo é obrigatório.",
        "colaborator_id.required": "Esse campo é obrigatório.",
        "adress_id.required": "Esse campo é obrigatório.",
        "data.required": "Esse campo é obrigatório.",
        "hora.required": "Esse campo é obrigatório.",
      };
      const validation = await validateAll(
        request.all(),
        {
          client_id: "required",
          colaborator_id: "required",
          adress_id: "required",
          data: "required",
          hora: "required",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      //updating OS
      const {
        client_id,
        colaborator_id,
        adress_id,
        service,
        data,
        hora,
        tempo,
        obs,
      } = request.all();
      ordensServices.client_id = client_id;
      ordensServices.colaborator_id = colaborator_id;
      ordensServices.adress_id = adress_id;
      ordensServices.service_id = service.id;
      ordensServices.data = data;
      ordensServices.hora = hora;
      ordensServices.tempo = tempo;
      ordensServices.obs = obs;

      await ordensServices.save();

      return ordensServices;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Client not exists` });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const ordensServices = await OrdensServices.findOrFail(params.id);
      await ordensServices.delete();
      return response.status(200).send({ sucess: `Deleted Sucess` });
    } catch (error) {
      return response.status(404).send({ error: `Erro: OS not exists` });
    }
  }
}

module.exports = OrdensServiceController;
