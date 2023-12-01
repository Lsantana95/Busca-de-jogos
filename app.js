// Chave da API na página de desenvolvedores da Rawg API
const apiKey = "f3874e7fda39484693728d4408d50ac6";

// Manipulando elementos HTML com o DOM
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

// Adicionando um evento de clique no botão de busca
searchButton.addEventListener("click", () => {
  // Capturando o termo de pesquisa do usuário, e removendo os espaços em branco extras e transformando as letras em minúsculas
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm) {
    // Função fetch() para chamar a API Rawg
    fetch(`https://api.rawg.io/api/games?search=${searchTerm}&key=${apiKey}`)
      .then((response) => response.json()) // Analisando a resposta da API para obter dados JSON
      .then((data) => {
        // Limpando qualquer resultado anterior antes de renderizar novos resultados de pesquisa
        resultsContainer.innerHTML = "";
        // Iterando sobre cada objeto do jogo pesquisado retornado pela API e gerando um HTML para exibi-los
        data.results.forEach((result) => {
          // Criando um elemento div para cada jogo encontrado
          const resultCard = document.createElement("div");
          resultCard.classList.add("result-card");

          // Criando um elemento img para exibir a imagem em miniatura do jogo
          const imageElement = document.createElement("img");
          imageElement.src = result.background_image;

          // Criando um elemento h2 para exibir o título do jogo
          const titleElement = document.createElement("h2");
          titleElement.innerText = result.name;

          // Criando um elemento p para exibir uma descrição resumida do jogo
          const descriptionElement = document.createElement("p");
          descriptionElement.innerText = result.description_raw
            ? result.description_raw.substr(0, 200) + "..."
            : "";

          // Adicionando os elementos criados à div principal do jogo e renderizando-o no contêiner de resultados na página HTML
          resultCard.appendChild(imageElement);
          resultCard.appendChild(titleElement);
          resultCard.appendChild(descriptionElement);

          resultsContainer.appendChild(resultCard);
        });
      })
      .catch((error) => console.log(error));
  }
});
