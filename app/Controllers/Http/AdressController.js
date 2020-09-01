"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use("Validator");
const Adresses = use("App/Models/Adress");
class AdressController {
  /**
   * Show a list of all adresses.
   * GET adresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new adress.
   * GET adresses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new adress.
   * POST adresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single adress.
   * GET adresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing adress.
   * GET adresses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update adress details.
   * PUT or PATCH adresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const adress = await Adresses.findOrFail(params.id);
      try {
        // const errorMessage = {
        //   "name.required": "Esse campo é obrigatório.",
        // };
        // const validation = await validateAll(
        //   request.all(),
        //   {
        //     name: "required",
        //   },
        //   errorMessage
        // );
        // if (validation.fails()) {
        //   return response.status(400).send({ message: validation.messages() });
        // }
        const {
          client_id,
          cep,
          longradouro,
          complemento,
          numero,
          pont_ref,
          bairro,
          cidade,
          estado,
          lat,
          long,
          zone,
        } = request.all();
        adress.client_id = client_id;
        adress.cep = cep;
        adress.longradouro = longradouro;
        adress.complemento = complemento;
        adress.numero = numero;
        adress.pont_ref = pont_ref;
        adress.bairro = bairro;
        adress.cidade = cidade;
        adress.estado = estado;
        adress.lat = lat;
        adress.long = long;
        adress.zone = zone;
        await adress.save();
        return adress;
      } catch (error) {}
    } catch (error) {
      return response.status(404).send({ error: `Erro: Service not exists` });
    }
  }

  /**
   * Delete a adress with id.
   * DELETE adresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = AdressController;
