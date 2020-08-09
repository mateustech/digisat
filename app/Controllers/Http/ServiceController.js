"use strict";

const { validateAll } = use("Validator");
const Services = use("App/Models/Service");
class ServiceController {
  async index({ response }) {
    try {
      const services = await Services.all();
      return services;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Services not exists` });
    }
  }
  //POST service
  async store({ request, response }) {
    try {
      const errorMessage = {
        "name.required": "Esse campo é obrigatório.",
      };
      const validation = await validateAll(
        request.all(),
        {
          name: "required",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(400).send({ message: validation.messages() });
      }
      const data = request.all();
      const service = await Services.create(data);

      return service;
    } catch (error) {
      return response.status(404).send({ error: `Erro: ${err.message}` });
    }
  }
  // GET service/:id
  async show({ params, response }) {
    try {
      const service = await Services.findOrFail(params.id);
      return service;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Service not exists` });
    }
  }

  //PUT or PATCH service/:id

  async update({ params, request, response }) {
    try {
      const service = await Services.findOrFail(params.id);
      try {
        const errorMessage = {
          "name.required": "Esse campo é obrigatório.",
        };
        const validation = await validateAll(
          request.all(),
          {
            name: "required",
          },
          errorMessage
        );
        if (validation.fails()) {
          return response.status(400).send({ message: validation.messages() });
        }
        const { name } = request.all();
        service.name = name;
        await service.save();
        return service;
      } catch (error) {}
    } catch (error) {
      return response.status(404).send({ error: `Erro: Service not exists` });
    }
  }
  // DELETE service/:id
  async destroy({ params, response }) {
    try {
      const service = await Services.findOrFail(params.id);
      await service.delete();
      return response.status(200).send({ sucess: `Deleted Sucess` });
    } catch (error) {
      return response.status(404).send({ error: `Erro: Service not exists` });
    }
  }
}

module.exports = ServiceController;
