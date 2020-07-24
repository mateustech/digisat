"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tools
 */
const Tools = use("App/Models/Tool");
class ToolController {
  // GET tools
  async index({ response }) {
    const tools = await Tools.all();
    if (!tools) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    return tools;
  }

  //POST tools
  async store({ request }) {
    const data = request.only(["name", "marca"]);
    const tool = await Tools.create(data);

    return tool;
  }

  // GET tools/:id
  async show({ params, response }) {
    const tool = await Tools.findOrFail(params.id);
    if (!tool) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    return tool;
  }

  //PUT or PATCH tools/:id

  async update({ params, request ,response }) {
    const tool = await Tools.findOrFail(params.id);
    const { name, marca } = request.all();
    if (!tool) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    tool.name = name
    tool.marca = marca
    await tool.save();

    return tool;
  }

  // DELETE tools/:id
  async destroy({ params, response }) {
    const tool = await Tools.findOrFail(params.id);
    if (!tool) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    await tool.delete();
  }
}

module.exports = ToolController;
