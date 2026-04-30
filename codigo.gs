function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Meu Controle Financeiro')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function verificarCriarCabecalho(planilha) {
  if (planilha.getLastRow() === 0) {
    planilha.appendRow(["Data", "Descrição", "Categoria", "Valor", "Tipo", "Status"]);
    planilha.getRange(1, 1, 1, 6).setFontWeight("bold").setHorizontalAlignment("center");
  }
}

function limparValor(valor) {
  if (typeof valor === 'number') return valor;
  var texto = String(valor || '0').replace('R$', '').trim();
  if (texto.includes(',')) { texto = texto.split('.').join('').replace(',', '.'); }
  return parseFloat(texto) || 0;
}

function salvarGasto(dados) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    verificarCriarCabecalho(planilha);
    var valorNumerico = limparValor(dados.valor);
    planilha.appendRow(["'" + dados.data, dados.descricao, dados.categoria, valorNumerico, dados.tipo, dados.status]);
    planilha.getRange(planilha.getLastRow(), 1, 1, 6).setHorizontalAlignment("center");
    return "sucesso"; 
  } catch (erro) { throw new Error("Erro ao salvar: " + erro.message); }
}

function atualizarGasto(dados) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    planilha.getRange(dados.linha, 1, 1, 6).setValues([["'" + dados.data, dados.descricao, dados.categoria, limparValor(dados.valor), dados.tipo, dados.status]]);
    return "sucesso";
  } catch (erro) { throw new Error("Erro ao atualizar: " + erro.message); }
}

function alternarStatusRapido(linha, novoStatus) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    planilha.getRange(linha, 6).setValue(novoStatus);
    return "sucesso";
  } catch (erro) { throw new Error("Erro: " + erro.message); }
}

function excluirGasto(numeroDaLinha) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    planilha.deleteRow(numeroDaLinha);
    return "excluido";
  } catch (erro) { throw new Error("Erro ao excluir: " + erro.message); }
}

function obterResumo(mesDesejado, anoDesejado) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    verificarCriarCabecalho(planilha);
    var dados = planilha.getDataRange().getValues(); 
    var resumo = {
      totalGastos: 0, totalReceitas: 0, saldo: 0,
      categorias: { "Contas": 0, "Cartão de Crédito": 0, "Moto": 0, "Pessoal": 0, "Outros": 0, "Salário": 0 },
      historico: [] 
    };
    
    for (var i = 1; i < dados.length; i++) {
      var linhaAtual = dados[i];
      var valorData = linhaAtual[0]; 
      if (!valorData) continue;

      var mesLinha = 0, anoLinha = 0, dataFormatadaParaTela = "";

      if (valorData instanceof Date) {
        mesLinha = parseInt(Utilities.formatDate(valorData, Session.getScriptTimeZone(), "M"));
        anoLinha = parseInt(Utilities.formatDate(valorData, Session.getScriptTimeZone(), "yyyy"));
        dataFormatadaParaTela = Utilities.formatDate(valorData, Session.getScriptTimeZone(), "dd/MM/yyyy");
      } else {
        var partes = String(valorData).split("-");
        if (partes.length === 3) {
          anoLinha = parseInt(partes[0]); mesLinha = parseInt(partes[1]);
          dataFormatadaParaTela = partes[2] + "/" + partes[1] + "/" + partes[0];
        } else { continue; }
      }

      if (mesLinha == mesDesejado && anoLinha == anoDesejado) {
        var categoria = linhaAtual[2];
        var valor = limparValor(linhaAtual[3]);
        var tipo = linhaAtual[4] && String(linhaAtual[4]).trim() !== "" ? linhaAtual[4] : "Despesa";
        var status = linhaAtual[5] && String(linhaAtual[5]).trim() !== "" ? linhaAtual[5] : "Pago";

        if (tipo === "Receita") { resumo.totalReceitas += valor; } 
        else { 
          resumo.totalGastos += valor;
          if (resumo.categorias[categoria] !== undefined) resumo.categorias[categoria] += valor;
        }

        resumo.historico.push({
          linha: i + 1, 
          dataParaFormulario: String(valorData).split(" ")[0], 
          dataParaTela: dataFormatadaParaTela, 
          descricao: linhaAtual[1],
          categoria: categoria,
          valor: valor,
          tipo: tipo,
          status: status
        });
      }
    }
    resumo.saldo = resumo.totalReceitas - resumo.totalGastos;
    resumo.historico.reverse();
    return resumo; 
  } catch (erro) { throw new Error("Erro: " + erro.message); }
}
