document.addEventListener("DOMContentLoaded", function() {
    

    // 🟢 Lista de cargos disponíveis (index.html)
    const cargos = [
        { nome: "Recepcionista", url: "cargos/recepcionista.html" },
        { nome: "Médico", url: "cargos/medico.html" },
        { nome: "Enfermeiro", url: "cargos/enfermeiro.html" },
        { nome: "Dentista", url: "cargos/dentista.html" },
        { nome: "Farmacêutico", url: "cargos/farmaceutico.html" },
        { nome: "Vigilância Sanitária", url: "cargos/vigilancia.html" },
        { nome: "Assistente Social", url: "cargos/assistente_social.html" },
        { nome: "Agente Comunitário de Saúde", url: "cargos/agente_saude.html" },
        { nome: "Aux./Técnico em Enfermagem", url: "cargos/tecnico_enfermagem.html" }
    ];

    // 🔹 Adiciona botões de cargos na página principal (index.html)
    const cargoLinks = document.querySelectorAll(".cargo a");
    if (cargoLinks.length > 0) {
        console.log("Criando botões para os cargos...");

        cargoLinks.forEach(link => {
            const destino = link.getAttribute("href");
            const cargo = cargos.find(c => destino.includes(c.url));

            if (cargo) {
                const botao = document.createElement("button");
                botao.textContent = cargo.nome;

                botao.addEventListener("click", function(event) {
                    event.preventDefault();
                    window.location.href = destino;
                });
                
                link.appendChild(botao);
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript carregado!"); // Depuração

    // 🔹 Lista de ações específicas para cada página de cargo
    const acoes = {
        "recepcionista.html": [
            { nome: "Pesquisar Usuário", url: "./action/pesquisar_usuario.html" },
            { nome: "Importar Usuário", url: "./action/importar_usuario.html" },
            { nome: "Cadastrar Usuário", url: "./action/cadastro_de_usuario.html"},
            { nome: "Atualizar Dados", url: "./action/atualizar_dados.html"},
            { nome: "Fila de Atendimento", url: "./action/fila_atendimento.html"},
            { nome: "Agendamento", url: "./action/agendamento.html"},
            { nome: "Marcar Consulta", url: "./action/marcar_consulta.html"}

        ],
        "medico.html": [
            { nome: "Consultar Paciente", url: "./action/consultar_paciente.html" },
            { nome: "Prescrever Medicamento", url: "./action/prescrever_medicamento.html" }
        ]
        // Adicione mais cargos conforme necessário
    };

    // 🔹 Detectar qual página estamos
    const currentPage = window.location.pathname.split("/").pop();

    if (acoes[currentPage]) {
        console.log(`Criando botões de ações para ${currentPage}...`);

        // Selecionar todas as divs `.ação`
        const acaoDivs = document.querySelectorAll(".ação");

        // Iterar sobre cada ação definida no objeto `acoes`
        acoes[currentPage].forEach((acao, index) => {
            if (acaoDivs[index]) { // Garante que existe uma div correspondente
                const link = acaoDivs[index].querySelector("a"); // Encontra o <a> dentro da div
                
                if (link) {
                    link.setAttribute("href", acao.url); // Define o href correto

                    const botaoAcao = document.createElement("button");
                    botaoAcao.textContent = acao.nome;

                    botaoAcao.addEventListener("click", function(event) {
                        event.preventDefault();
                        window.location.href = acao.url;
                    });

                    link.appendChild(botaoAcao);
                }
            }
        });
    }
});
