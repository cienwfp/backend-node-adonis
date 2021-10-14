const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  user: String,
  tipoDocumento: String,
  assunto: String,
  origem: String,
  referencia: String,
  nomeDocumentoOriginador: String,
  documentoOriginador: String,
  grauUrgencia: String,
  indicadorOrigem: String,
  indicadorDestino: String,
  indicadorAplicacao: String,
  sigiloDocumento: String,
  julgamentoFonte: String,
  julgamentoConteudo: String,
  anexo: String,
  descricao: String,
  posicional: String,
  restritivo: String,
  aprovadorPrimario: String,
  assinadorPrimario: String,
  assinadorSecundario: String,
  document: Object
})

module.exports = model("Document", Document)
