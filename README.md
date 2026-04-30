# 💰 Meu Painel Financeiro

Um sistema completo, responsivo e inteligente para controle financeiro pessoal. Construído com **Google Apps Script**, utilizando o Google Sheets como banco de dados em tempo real.

## 🚀 Funcionalidades

O projeto evoluiu de um simples formulário para uma aplicação financeira de alto nível. Aqui estão os principais recursos:

* **📊 Dashboard Interativo:** Gráfico de rosca dinâmico (Google Charts) que mostra a distribuição das suas despesas no mês.
* **💳 Gestão de Metas:** Defina limites de gastos personalizados para cada categoria (Contas, Cartão, Moto, Pessoal, Outros). As metas ficam salvas localmente no navegador e avisam se você estourar o orçamento.
* **🤖 Categorização Inteligente (IA):** O formulário lê o que você digita na descrição e sugere automaticamente a categoria e o tipo (Entrada/Saída).
* **📆 Controle por Competência:** Lançamentos vinculados ao "Mês de Referência", permitindo pagar contas adiantadas ou atrasadas sem bagunçar o caixa do mês atual.
* **✅ Status em Um Clique:** Alternância rápida entre `⏳ Pendente` e `✅ Pago` direto no histórico, com atualização instantânea no banco de dados.
* **✏️ Edição Dinâmica:** Edite qualquer valor, data ou categoria do seu histórico rapidamente sem precisar apagar a linha.
* **🔍 Busca Rápida:** Filtre seus lançamentos do mês em tempo real digitando na barra de pesquisa.
* **🌙 Modo Escuro:** Suporte nativo a Dark Mode para uso confortável à noite.

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3, JavaScript Vanilla
* **Back-end:** Google Apps Script (JavaScript)
* **Banco de Dados:** Google Sheets
* **Gráficos:** Google Charts API

## ⚙️ Como instalar e usar no seu Google Drive

Caso queira replicar este projeto:

1. Crie uma nova planilha no Google Sheets.
2. Acesse o menu **Extensões > Apps Script**.
3. Cole o código do arquivo `Codigo.gs` no arquivo `.gs` padrão do editor.
4. Crie um arquivo HTML chamado `index.html` e cole o código correspondente.
5. Clique em **Implantar > Nova implantação**.
6. Selecione o tipo de engrenagem **App da Web**.
7. Defina a execução como "Eu" e quem pode acessar como "Qualquer pessoa" (ou apenas você).
8. Clique em **Implantar** e acesse o link gerado! O sistema criará as colunas na planilha automaticamente no primeiro uso.

---
*Projeto desenvolvido para facilitar a gestão financeira do dia a dia, transformando planilhas em interfaces poderosas.*
