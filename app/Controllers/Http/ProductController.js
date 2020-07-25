"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Products = use("App/Models/Product");
class ProductController {
 
  async index() {
    const products = await Products.all();
    if (!products) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    return products;
  }

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

 
  async show({ params, response }) {
    const products = await Products.findOrFail(params.id);
    if (!products) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    return products;
  }

  async update({ params, request, response }) {
    const products = await Products.findOrFail(params.id);
    const { codigo, nome, price_c, price_v, und } = request.all();
    if (!products) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }

    products.codigo = codigo;
    products.nome = nome;
    products.price_c = price_c;
    products.price_v = price_v;
    products.und = und;

    await products.save();
    return products;
  }

  async destroy({ params, response }) {
    const products = await Products.findOrFail(params.id);
    if (!products) {
      return response
        .status(404)
        .send({ message: "Nemhum registro encontrado" });
    }
    await products.delete();
  }
}

module.exports = ProductController;
