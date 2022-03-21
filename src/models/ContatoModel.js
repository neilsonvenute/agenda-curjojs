const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now() },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body
    this.errors = []
    this.contato = null
  }

  register = async () => {
    this.valida()
    if (this.errors.length > 0) return
    this.contato = await ContatoModel.create(this.body)
    return this.contato
  }

  valida = () => {
    this.cleanUp();
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório')
    if (!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone')
  };

  cleanUp = () => {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    }
  }

  edit = async (id) => {
    if (typeof id !== 'string') return
    this.valida()
    if (this.errors.length > 0) return
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { upsert: true })
    return this.contato
  }

  buscaPorId = async (id) => {
    if (typeof id !== "string") return
    try {
      return await ContatoModel.findById({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }

  buscaContatos = async () => {
    try {
      return await ContatoModel.find().sort({ criadoEm: -1 })
    } catch (e) {
      console.log(e)
    }
  }

  delete = async (id) => {
    if (typeof id !== "string") return
    try {
      return await ContatoModel.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Contato;