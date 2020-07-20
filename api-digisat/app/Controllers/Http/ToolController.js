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
  async index() {
    const tools = await Tools.all();
    return tools;
  }

  //POST tools
  async store({ request }) {
    const data = request.only(["name", "marca"]);
    const tool = await Tools.create(data);

    return tool;
  }

  // GET tools/:id
  async show({ params }) {
    const tool = await Tools.findOrFail(params.id);

    return tool;
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
    const tool = await Tools.findOrFail(params.id);
    await tool.delete();
  }
}

module.exports = ToolController;
