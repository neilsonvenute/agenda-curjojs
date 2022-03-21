const Contato = require('../models/ContatoModel')
const contato = new Contato()

exports.index = (req, res) => {
  return res.render('contato', {
    contato: {}
  })
}

exports.register = async (req, res) => {
  try {
    const novoContato = new Contato(req.body)
    const contatoSalvo = await novoContato.register()

    if (novoContato.errors.length > 0) {
      req.flash('errors', novoContato.errors)
      req.session.save(function () {
        return res.redirect(`/contato/index`)
      })
      return
    }

    req.flash('success', 'Contato registrado com sucesso')
    req.session.save(() => res.redirect(`/contato/index/${contatoSalvo._id}`))
    return
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render('404')

  const teste = await contato.buscaPorId(req.params.id)
  if (!contato) return res.render('404')
  res.render('contato', { contato: teste })
}

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404')
    const contatoEditar = new Contato(req.body)
    const contatoEditado = await contatoEditar.edit(req.params.id)
    console.log('Editou',contatoEditado)

    if (contatoEditar.errors.length > 0) {
      req.flash('errors', contatoEditar.errors)
      req.session.save(() => res.redirect(`/contato/index/${req.params.id}`))
      return
    }

    req.flash('success', 'Contato editado com sucesso')
    req.session.save(() => res.redirect(`/contato/index/${contatoEditado._id}`))
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render('404')
  const contatoExcluido = await contato.delete(req.params.id)
  if (!contatoExcluido) return res.render('404')
  req.flash('success', 'Contato removido com sucesso')
  req.session.save(() => res.redirect(`/`))
}