"use strict";
const { validateAll } = use("Validator");
const OrdensServices = use("App/Models/OrdensService");

class OrdensServiceController {
  async index({ request, response }) {
    try {
      const ordensServices = await OrdensServices.all();
      return ordensServices;
    } catch (error) {
      return response.status(404).send({ error: `Erro: OS's not exists` });
    }
  }
  async show({ params, response }) {
    try {
      const ordensServices = await OrdensServices.findOrFail(params.id);
      return ordensServices;
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

  async update({ params, request, response }) {}

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
