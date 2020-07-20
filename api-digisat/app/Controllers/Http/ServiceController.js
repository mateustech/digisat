"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with services
 */
const Services = use("App/Models/Service");
class ServiceController {
  async index() {
    const services = await Services.all();
    return services;
  }

  //POST tools
  async store({ request }) {
    const data = request.only(["name", "marca"]);
    const service = await Services.create(data);

    return service;
  }

  // GET tools/:id
  async show({ params }) {
    const service = await Services.findOrFail(params.id);

    return service;
  }

  //PUT or PATCH tools/:id

  // async update({ params, request }) {
  //   const tool = Tools.findOrFail(params.id);
  //   const toolUpdate = request.all();

  //   tool.merge({toolUpdate});
  //   await tool.save();

  //   return tool;
  // }

  // DELETE tools/:id
  async destroy({ params }) {
    const service = await Services.findOrFail(params.id);
    await service.delete();
  }
}

module.exports = ServiceController;
