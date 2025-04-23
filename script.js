document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript carregado!");
  
    inicializarBotoesPaginaPrincipal();
    inicializarBotoesPaginaCargo();
    carregarComponentes();
  });
  
  /**
   * Dados dos cargos disponíveis no sistema
   */
  const DADOS_CARGOS = [
    { nome: "Recepcionista", url: "cargos/recepcionista.html" },
    { nome: "Médico", url: "cargos/medico.html" },
    { nome: "Enfermeiro", url: "cargos/enfermeiro.html" },
    { nome: "Dentista", url: "cargos/dentista.html" },
    { nome: "Farmacêutico", url: "cargos/farmaceutico.html" },
    { nome: "Vigilância Sanitária", url: "cargos/vigilancia.html" },
    { nome: "Assistente Social", url: "cargos/assistente_social.html" },
    { nome: "Agente Comunitário de Saúde", url: "cargos/agente_saude.html" },
    { nome: "Aux./Técnico em Enfermagem", url: "cargos/tecnico_enfermagem.html" },
  ];
  
  /**
   * Dados das ações específicas para cada página de cargo
   */
  const DADOS_ACOES_POR_CARGO = {
    "recepcionista.html": [
        { nome: "Pesquisar Usuário", url: "./action/pesquisar_usuario.html" },
        { nome: "Importar Usuário", url: "./action/importar_usuario.html" },
        { nome: "Cadastrar Usuário", url: "./action/cadastro_de_usuario.html" },
        { nome: "Atualizar Dados", url: "./action/atualizar_dados.html" },
        { nome: "Fila de Atendimento", url: "./action/fila_atendimento.html" },
        { nome: "Agendamento", url: "./action/agendamento.html" },
        { nome: "Marcar Consulta", url: "./action/marcar_consulta.html" },
        { nome: "Recepção de serviço", url: "./action/recepcao_servico.html" },
    ],
    "medico.html": [
        { nome: "Atualizar Dados", url: "./action/atualizar_dados.html" },
        { nome: "Fila de Atendimento", url: "./action/fila_atendimento.html" },
        { nome: "Agendamento", url: "./action/agendamento.html" },
    ],
    "agente_saude.html": [
        { nome: "Cadastrar Cidadão", url: "./action/cadastrar_cidadao.html" },
        { nome: "Cadastrar Domicílio", url: "./action/cadastrar_domicilio.html" },
        { nome: "Adicionar Membro da Família", url: "./action/adicionar_membro.html" },
        { nome: "Enviar Dados", url: "./action/enviar_dados.html" },
    ],
    // Adicione mais cargos conforme necessário
  };
  
  /**
   * Inicializa os botões de cargos na página principal (index.html)
   */
  function inicializarBotoesPaginaPrincipal() {
    const elementosLinkCargo = document.querySelectorAll(".cargo a");
  
    if (elementosLinkCargo.length === 0) {
      return; // Não estamos na página principal
    }
  
    console.log("Criando botões para os cargos...");
  
    elementosLinkCargo.forEach((link) => {
      const urlDestino = link.getAttribute("href");
      const dadosCargo = DADOS_CARGOS.find((cargo) =>
        urlDestino.includes(cargo.url)
      );
  
      if (dadosCargo) {
        criarBotaoNavegacao(link, dadosCargo.nome, urlDestino);
      }
    });
  }
  
  /**
   * Inicializa os botões de ações na página específica de cargo
   */
  function inicializarBotoesPaginaCargo() {
    const paginaAtual = window.location.pathname.split("/").pop();
    const acoesDisponiveis = DADOS_ACOES_POR_CARGO[paginaAtual];
  
    if (!acoesDisponiveis) {
      return; // Não estamos em uma página de cargo conhecida
    }
  
    console.log(`Criando botões de ações para ${paginaAtual}...`);
  
    const elementosAcao = document.querySelectorAll(".ação");
  
    acoesDisponiveis.forEach((acao, indice) => {
      const elementoAcao = elementosAcao[indice];
      if (!elementoAcao) return; // Pula se não houver elemento correspondente
  
      const link = elementoAcao.querySelector("a");
      if (link) {
        link.setAttribute("href", acao.url);
        criarBotaoNavegacao(link, acao.nome, acao.url);
      }
    });
  }
  
  /**
   * Cria um botão de navegação dentro de um elemento de link
   *
   * @param {HTMLElement} elementoLink - Elemento link onde o botão será inserido
   * @param {string} textoBotao - Texto a ser exibido no botão
   * @param {string} urlDestino - URL de destino para navegação
   */
  function criarBotaoNavegacao(elementoLink, textoBotao, urlDestino) {
    const botao = document.createElement("button");
    botao.textContent = textoBotao;
  
    botao.addEventListener("click", function (evento) {
      evento.preventDefault();
      window.location.href = urlDestino;
    });
  
    elementoLink.appendChild(botao);
  }
  async function carregarComponentes() {
    const headerContainer = document.querySelector("#header-container");
    const footerContainer = document.querySelector("#footer-container");

    if (headerContainer && !sessionStorage.getItem("header")) {
        const headerResponse = await fetch("/components/header.html");
        const headerText = await headerResponse.text();
        sessionStorage.setItem("header", headerText);
        headerContainer.innerHTML = headerText;
    } else if (headerContainer) {
        headerContainer.innerHTML = sessionStorage.getItem("header");
    }

    if (footerContainer && !sessionStorage.getItem("footer")) {
        const footerResponse = await fetch("/components/footer.html");
        const footerText = await footerResponse.text();
        sessionStorage.setItem("footer", footerText);
        footerContainer.innerHTML = footerText;
    } else if (footerContainer) {
        footerContainer.innerHTML = sessionStorage.getItem("footer");
    }
}
