document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os botões dentro da classe 'cargo'
    const botoes = document.querySelectorAll(".cargo button");
    
    botoes.forEach(botao => {
        botao.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o comportamento padrão do botão
            
            const link = this.parentElement.getAttribute("href"); // Obtém o link do botão
            
            if (link) {
                window.location.href = link; // Redireciona para a página correspondente
                console.log("botão clicado")
            } else {
                console.log("Botão sem link definido");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todas as tags <a> dentro de .cargo
    const links = document.querySelectorAll(".cargo a");

    links.forEach(link => {
        // Criar botão
        const botao = document.createElement("button");
        botao.textContent = link.getAttribute("href").split("/").pop().replace(".html", ""); // Nome baseado no arquivo
        
        // Estiliza o nome para ficar amigável
        botao.textContent = botao.textContent.charAt(0).toUpperCase() + botao.textContent.slice(1);

        // Adiciona evento de clique no botão
        botao.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = link.getAttribute("href");
        });

        // Insere o botão dentro do <a>
        link.appendChild(botao);
    });
});