"use strict";

const { validateAll } = use("Validator");
const Tools = use("App/Models/Tool");
class ToolController {
  // GET tools
  async index({ response }) {
    try {
      const tools = await Tools.all();
      return tools;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Tools not exists` });
    }
  }

  //POST tools
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
      const data = request.only(["name", "marca"]);
      const tool = await Tools.create(data);

      return tool;
    } catch (error) {
      return response.status(404).send({ error: `Erro: ${err.message}` });
    }
  }
  // GET tools/:id
  async show({ params, response }) {
    try {
      const tool = await Tools.findOrFail(params.id);
      return tool;
    } catch (error) {
      return response.status(404).send({ error: `Erro: Tool not exists` });
    }
  }
  //PUT or PATCH tools/:id
  async update({ params, request, response }) {
    try {
      const tool = await Tools.findOrFail(params.id);
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
        const { name, marca } = request.all();
        tool.name = name;
        tool.marca = marca;
        await tool.save();

        return tool;
      } catch (error) {
        return response.status(400).send({ error: `Erro: ${err.message}` });
      }
    } catch (error) {
      return response.status(404).send({ error: `Erro: Tool not exists` });
    }
  }
  // DELETE tools/:id
  async destroy({ params, response }) {
    try {
      const tool = await Tools.findOrFail(params.id);
      await tool.delete();
      return response.status(200).send({ sucess: `Deleted Sucess` });
    } catch (error) {
      return response.status(404).send({ error: `Erro: Tool not exists` });
    }
  }
}

module.exports = ToolController;
