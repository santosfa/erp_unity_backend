const path = require("path");

class GenericModelService {

  // O construtor recebe o nome do modelo e carrega o modelo correspondente com base no caminho fornecido.
  constructor(modelName) {
    const modelPath = path.join(__dirname, `../model/${modelName}/${modelName}Model`);
    this.model = require(modelPath);
  }

  // Lista todos os documentos do modelo com opções de paginação (pular e limitar).
  // Parâmetros de entrada: skip (número de documentos a pular), limit (número máximo de documentos a serem retornados).
  // Retorna uma lista de documentos do modelo.
  async listAll(skip, limit) {
    try {
      const items = await this.model
        .find()
        .select("-__v")
        .skip(skip)
        .limit(limit)
        .lean();
  
      return items;
    } catch (error) {
      throw error;
    }
  }

  // Lista documentos do modelo com base em uma consulta fornecida.
  // Parâmetro de entrada: query (consulta para filtrar documentos).
  // Retorna uma lista de documentos do modelo que correspondem à consulta.
  async listByField(query) {
    try {
      const items = query._id
        ? await this.model.findOne({ _id: query._id }).select("-__v").lean()
        : await this.model.find(query).select("-__v").lean();

      return items || null;
    } catch (error) {
      console.error(`Error listing items:`, error);
      throw error;
    }
  }

  // Obtém o número total de documentos no modelo.
  // Retorna o número total de documentos no modelo.
  async getTotalCount() {
    try {
      const totalCount = await this.model.countDocuments();
      return totalCount;
    } catch (error) {
      console.error("Error getting total count:", error);
      throw error;
    }
  }

  // Obtém o número total de documentos no modelo com base em uma consulta fornecida.
  // Parâmetro de entrada: query (consulta para filtrar documentos).
  // Retorna o número total de documentos no modelo que correspondem à consulta.
  async getTotalCountByField(query) {
    try {
      const totalCount = await this.model.countDocuments(query);
      return totalCount;
    } catch (error) {
      console.error("Error getting total count by field:", error);
      throw error;
    }
  }

  // Cria um novo documento no modelo com base nos dados fornecidos.
  // Parâmetro de entrada: data (dados para criar o novo documento).
  // Retorna o novo documento criado.
  async create(data) {
    try {
      const newItem = await this.model.create(data);
      return newItem;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  // Atualiza um documento no modelo com base no ID fornecido e nos dados atualizados.
  // Parâmetros de entrada: itemId (ID do documento a ser atualizado), updatedData (dados atualizados).
  // Retorna o documento atualizado.
  async update(itemId, updatedData) {
    try {
      const updatedItem = await this.model.findOneAndUpdate(
        { _id: itemId },
        { $set: updatedData },
        { new: true }
      );
      return updatedItem;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  // Exclui um documento no modelo com base no ID fornecido.
  // Parâmetro de entrada: itemId (ID do documento a ser excluído).
  // Retorna o documento excluído.
  async delete(itemId) {
    try {
      const deletedItem = await this.model.findOneAndDelete({ _id: itemId });
      return deletedItem;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}

module.exports = GenericModelService;
