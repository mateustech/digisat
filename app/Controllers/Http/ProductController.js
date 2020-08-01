"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use("Validator");
const Products = use("App/Models/Product");
class ProductController {
  async index({ response }) {
    try {
      const products = await Products.all();
      return products;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Products not exists` });
    }
  }
  async store({ request, response }) {
    try {
      const errorMessage = {
        "nome.required": "Esse campo é obrigatório.",
        "price_venda.required": "Esse campo é obrigatório.",
        "und_medida.required": "Esse campo é obrigatório.",
      };
      const validation = await validateAll(
        request.all(),
        {
          nome: "required",
          price_venda: "required",
          und_medida: "required",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(400).send({ message: validation.messages() });
      }
      const data = request.only([
        "codigo",
        "nome",
        "price_custo",
        "price_venda",
        "und_medida",
      ]);
      const products = await Products.create(data);

      return products;
    } catch (error) {
      return response.status(404).send({ error: `Erro: ${err.message}` });
    }
  }
  async show({ params, response }) {
    try {
      const products = await Products.findOrFail(params.id);
      return products;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Product not exists` });
    }
  }
  async update({ params, request, response }) {
    try {
      const products = await Products.findOrFail(params.id);
      try {
        const errorMessage = {
          "nome.required": "Esse campo é obrigatório.",
          "price_venda.required": "Esse campo é obrigatório.",
          "und_medida.required": "Esse campo é obrigatório.",
        };
        const validation = await validateAll(
          request.all(),
          {
            nome: "required",
            price_venda: "required",
            und_medida: "required",
          },
          errorMessage
        );
        if (validation.fails()) {
          return response.status(400).send({ message: validation.messages() });
        }
        const { codigo, nome, price_c, price_v, und } = request.all();

        products.codigo = codigo;
        products.nome = nome;
        products.price_c = price_c;
        products.price_v = price_v;
        products.und = und;

        await products.save();
        return products;
      } catch (error) {}
    } catch (error) {
      return response.status(404).send({ error: `Erro: Product not exists` });
    }
  }
  async destroy({ params, response }) {
    try {
      const products = await Products.findOrFail(params.id);
      await products.delete();
    } catch (error) {
      return response.status(404).send({ error: `Erro: Product not exists` });
    }
  }
}

module.exports = ProductController;
