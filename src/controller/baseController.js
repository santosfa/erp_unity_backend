/*
File BaseController,js
*/

const path = require("path");
const { MongoServerError } = require("mongodb");
const GenericModelService = require("../service/genericModelService");

class BaseController {
  constructor() {}

  // Executa uma operação no modelo com base em uma função de operação fornecida.
  // Parâmetros de entrada: req (objeto de solicitação), res (objeto de resposta), modelName (nome do modelo), operationFn (função de operação no modelo).
  // Retorna a resposta da operação no modelo.
  async executeOperation(req, res, modelName, operationFn) {
    try {
      if (!modelName) {
        throw new Error("Model name is not provided.");
      }

      const modelService = new GenericModelService(modelName);
      const result = await operationFn(modelService);

      if (result && result.data) {
        const responseData = Array.isArray(result.data)
          ? result.data
          : [result.data];
        const totalItemCount = responseData.length;
        if (responseData.length > 0) {
          return this.sendSuccessResponse(res, {
            data: responseData,
            totalItemCount
          });
        }
      }

      return this.sendNotFoundResponse(res, "noDataFound");
    } catch (error) {
      console.error(error);
      console.error("error in executeOperation", error);
      return this.handleErrorResponse(res, error);
    }
  }

  // Envia uma resposta de sucesso para o cliente.
  // Parâmetro de entrada: res (objeto de resposta), result (resultado da operação).
  // Retorna a resposta de sucesso.
  sendSuccessResponse(res, result) {
    return res.status(200).json({
      ...result,
      message: "success",
      statusCode: 200
    });
  }

  // Envia uma resposta de não encontrado para o cliente.
  // Parâmetro de entrada: res (objeto de resposta).
  // Retorna a resposta de não encontrado.
  sendNotFoundResponse(res) {
    return res.status(404).json({
      message: "Nao ha regsitros para sua solicitacao",
      statusCode: 404
    });
  }

  // Lida com erros durante a execução da operação.
  // Retorna uma resposta de erro com base no tipo de erro.
  handleErrorResponse(res, error) {
    let statusCode = 500;

    switch (true) {
      case error instanceof MongoServerError:
        if (error.code === 11000 || error.code === 11001) {
          statusCode = 400;
          console.log("Handling duplicatedId error");
        }
        break;

      default:
        statusCode = 400;
        break;
    }

    return res.status(statusCode).json({
      message: "Algum erro aconteceu",
      statusCode
    });
  }

  // Lista todos os documentos do modelo com opções de paginação.
  // Parâmetros de entrada: req (objeto de solicitação), res (objeto de resposta), modelName (nome do modelo).
  // Retorna uma lista de documentos do modelo com informações de paginação.
  async listAll(req, res, modelName) {

    console.log(req.userId);
    
    const { page, limit } = req.query;
    const pageNumber = Math.max(parseInt(page) || 1, 1);
    const itemsPerPage = Math.max(parseInt(limit) || 10, 1);
    const skipCount = (pageNumber - 1) * itemsPerPage;

    return this.executeOperation(req, res, modelName, async model => {
      const totalItemCount = await model.getTotalCount();
      const totalPages = Math.ceil(totalItemCount / itemsPerPage);

      if (pageNumber > totalPages) {
        return {
          message: "pageNotFound",
          totalPages,
          currentPage: pageNumber
        };
      }

      const data = await model.listAll(skipCount, itemsPerPage);

      if (data.length === 0) {
        return {
          message: "not found modelName",
          totalPages,
          currentPage: pageNumber
        };
      }

      return { data, totalItemCount, totalPages, currentPage: pageNumber };
    });
  }

  // Lista documentos do modelo com base em um campo específico e valor correspondente.
  // Parâmetros de entrada: req (objeto de solicitação), res (objeto de resposta), modelName (nome do modelo), field (campo para filtrar), value (valor para comparar).
  // Retorna uma lista de documentos do modelo que correspondem ao campo e valor fornecidos.
  async listByField(req, res, modelName, field, value) {

    return this.executeOperation(req, res, modelName, async model => {
      let query = {};

      if (field === "_id") {
        query[field] = value;
      } else {
        const regexValue = value.endsWith("*")
          ? value.slice(0, -1)
          : `^${value}$`;
        query[field] = new RegExp(regexValue, "i");
      }
      try {
        const data = await model.listByField(query);
        const totalItemCount =
          field === "_id" ? 1 : await model.getTotalCountByField(query);
        const responseData = Array.isArray(data) ? data : [data];
        if (!data || responseData.length === 0) {
          return {
            message: "noDataFound",
            statusCode: 404
          };
        }
        return { data: responseData, totalItemCount };
      } catch (error) {
        if (error.message === "Invalid _id format") {
          return {
            message: "invalidIdFormat",
            statusCode: 400
          };
        }
        throw error;
      }
    });
  }



  // Cria um novo documento no modelo com base nos dados fornecidos.
  // Parâmetros de entrada: req (objeto de solicitação), res (objeto de resposta), modelName (nome do modelo).
  // Retorna o novo documento criado.
  async create(req, res, modelName) {
   
    return this.executeOperation(req, res, modelName, async model => {
      const modelData = req.body;
      const data = await model.create(modelData);
      return { data };
    });
  }

  // Atualiza um documento no modelo com base no ID fornecido e nos dados atualizados.
  // Parâmetros de entrada: req (objeto de solicitação), res (objeto de resposta), modelName (nome do modelo).
  // Retorna o documento atualizado.
  async update(req, res, modelName) {
    return this.executeOperation(req, res, modelName, async model => {
      const { modelId } = req.params;
      const { updatedData } = req.body;
      const updatedModel = await model.update(modelId, updatedData);
      if (!updatedModel) {
        return { message: "Model NotFound" };
      }

      return { updatedModel };
    });
  }

  // Exclui um documento no modelo com base no ID fornecido.
  // Parâmetros de entrada: req (objeto de solicitação), res (objeto de resposta), modelName (nome do modelo).
  // Retorna o documento excluído.
  async delete(req, res, modelName) {
    return this.executeOperation(req, res, modelName, async model => {
      const { modelId } = req.params;
      const deletedModel = await model.delete(modelId);
      if (!deletedModel) {
        return { message: "Model NotFound" };
      }
      return { deletedModel };
    });
  }





}

module.exports = BaseController;
