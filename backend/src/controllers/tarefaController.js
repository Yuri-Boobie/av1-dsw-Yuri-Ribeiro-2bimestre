// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Lista todas as tarefas
 * @route GET /tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ erro: "Erro ao listar tarefas" });
  }
}

/**
 * Busca uma tarefa pelo ID
 * @route GET /tarefas/:id
 */
export async function buscarPorId(req, res) {
  try {
    const id = Number(req.params.id);

    // Valida se o ID é um número válido
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: "ID deve ser um número válido" });
    }

    const tarefa = await TarefaModel.buscarPorId(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criar(req, res) {
  try {
    const { title, description, categoryId } = req.body;

    // Valida campo obrigatório
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "titulo é obrigatório" });
    }

    // Valida description se fornecido
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res.status(400).json({ erro: "description deve ser string" });
    }

    // Valida categoryId se fornecido
    if (categoryId !== undefined && categoryId !== null) {
      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return res
          .status(400)
          .json({ erro: "categoryId deve ser um número inteiro válido" });
      }
    }

    const novaTarefa = await TarefaModel.criar(title, description, categoryId);

    res.status(201).json({
      mensagem: "Tarefa criada com sucesso",
      tarefa: novaTarefa
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

/**
 * Atualiza uma tarefa
 * @route PUT /tarefas/:id
 */
export async function atualizar(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, description, completed, categoryId } = req.body;

    // Valida se o ID é um número válido
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: "ID deve ser um número válido" });
    }

    // Valida title se fornecido
    if (title !== undefined && typeof title !== "string") {
      return res.status(400).json({ erro: "title deve ser string" });
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ erro: "title não pode ser vazio" });
    }

    // Valida description se fornecido
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res.status(400).json({ erro: "description deve ser string" });
    }

    // Valida completed se fornecido
    if (completed !== undefined && typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ erro: "completed deve ser boolean (true/false)" });
    }

    // Valida categoryId se fornecido
    if (categoryId !== undefined && categoryId !== null) {
      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return res
          .status(400)
          .json({ erro: "categoryId deve ser um número inteiro válido" });
      }
    }

    const tarefaAtualizada = await TarefaModel.atualizar(id, {
      title,
      description,
      completed,
      categoryId
    });

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa atualizada com sucesso",
      tarefa: tarefaAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

/**
 * Exclui uma tarefa
 * @route DELETE /tarefas/:id
 */
export async function excluir(req, res) {
  try {
    const id = Number(req.params.id);

    // Valida se o ID é um número válido
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: "ID deve ser um número válido" });
    }

    const tarefaRemovida = await TarefaModel.excluir(id);

    if (!tarefaRemovida) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa excluída com sucesso",
      tarefa: tarefaRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
}
