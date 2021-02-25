"use strict";
const User = use("App/Models/User");
const { validateAll } = use("Validator");
class AuthController {
  /**
   * @swagger
   * /api/hello:
   *   get:
   *     tags:
   *       - Test
   *     summary: Sample API
   *     parameters:
   *       - name: name
   *         description: Name of the user
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async register({ request, response }) {
    try {
      const errorMessage = {
        "username.required": "Esse campo é obrigatório.",
        "email.required": "Esse campo é obrigatório.",
        "email.unique": "Esse campo ja existe.",
        "password.required": "Esse campo é obrigatório.",
        "password.min": "Mínimo 6 caracteres.",
      };
      const validation = await validateAll(
        request.all(),
        {
          username: "required",
          email: "required|email|unique:users",
          password: "required|min:6",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const data = request.only(["username", "email", "password"]);
      const user = await User.create(data);

      return user;
    } catch (err) {
      return response.status(500).send({ error: `Erro: ${err.message}` });
    }
  }
  async authenticate({ request, response, auth }) {
    try {
      const errorMessage = {
        "email.required": "Esse campo é obrigatório.",
        "password.required": "Esse campo é obrigatório.",
        "password.min": "Mínimo 6 caracteres.",
      };
      const validation = await validateAll(
        request.all(),
        {
          email: "required",
          password: "required|min:6",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);

      return token;
    } catch (err) {
      return response.status(500).send({ error: `Erro: ${err.message}` });
    }
  }
}

module.exports = AuthController;
