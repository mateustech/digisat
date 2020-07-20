"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Products = use("App/Models/Product");
class ProductController {
  // GET tools
  async index() {
    const products = await Products.all();
    return products;
  }
  //POST tools
  async store({ request }) {
    const data = request.only([
      "codigo",
      "nome",
      "price_custo",
      "price_venda",
      "und_medida",
    ]);
    const products = await Products.create(data);

    return products;
  }

  // GET tools/:id
  async show({ params }) {
    const products = await Products.findOrFail(params.id);

    return products;
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
    const products = await Products.findOrFail(params.id);
    await products.delete();
  }
}

module.exports = ProductController;
