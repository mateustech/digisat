"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with services
 */
const Services = use("App/Models/Service");
class ServiceController {
  async index({response}) {
    const services = await Services.all();
    if (!services) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    return services;
  }

  //POST service
  async store({ request }) {
    const data = request.all();
    const service = await Services.create(data);

    return service;
  }

  // GET service/:id
  async show({ params, response }) {
    const service = await Services.findOrFail(params.id);
    if (!service) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    return service;
  }

  //PUT or PATCH service/:id

  async update({ params, request ,response }) {
    const service = await Services.findOrFail(params.id);
    const { name } = request.all();
    if (!service) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }

    service.name = name;

    await service.save();

    return service;
  }

  // DELETE service/:id
  async destroy({ params }) {
    const service = await Services.findOrFail(params.id);
    await service.delete();
  }
}

module.exports = ServiceController;
