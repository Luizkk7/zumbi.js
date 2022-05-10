const prompt = require("prompt-sync")();
const colors = require("colors");
const inquirer = require("inquirer")


prompt("Tecle ENTER para começar o jogo . ");
console.clear();


let player = {
  nome: "player",
  fome: 50,
  saude: 80,
  hidratacao: 50,
  madeira: 0,
  gasolina: 0,
};

function display() {
  console.log(
    `Nome: ${player.nome} | Fome: ${player.fome} | Saúde: ${player.saude} | Hidratação: ${player.hidratacao} | Madeira: ${player.madeira} | Gasolina: ${player.gasolina} `
      .yellow
  );
  console.log();
}

let tempo = {
  dia: 1,
  periodos: ["manhã", "tarde", "noite"],
  periodoatual: 0,
  avancatempo: function () {
    this.periodoatual++;
  },
  zeratempo: function () {
    this.periodoatual = 0;
  },
};

// Para parar o jogo caso um dos status zerarem
function status(player) {
  if (player.saude < 1 || player.fome < 1 || player.hidratacao < 1) {
    console.log(
      `${player.nome} um dos seus status vitais zeraram, você morreu. Fim de jogo.`
    );
    prompt("Tecle enter para continuar. ".red);
    process.exit();
  }
}

player.nome = prompt("Qual o seu nome? ");

console.log(`Você mora longe das grandes cidades, cercado por florestas, e agora costuma conseguir alguns suprimentos aqui. Os recursos tornam-se escassos, os ataques tornam-se mais frequentes e a sobrevivência torna-se mais difícil.
Você mora sozinho em uma casa instável. Hordas de zumbis às vezes atacam sua propriedade, deixando buracos em cercas e paredes. Seu taco de beisebol favorito é coberto com pregos e estilhaços para protegê-lo, esteja você dentro ou fora de casa. Algumas semanas atrás, ele captou sinais de outros sobreviventes em seu velho rádio movido a bateria. Eles anunciaram que tinham abrigo, comida e água em uma cidade próxima. Agora sua última esperança é encontrar gasolina para encontrar essa zona segura. Você tem uma moto que pretende viajar, mas ainda não tem gasolina suficiente. Sua rotina vai se repetir, sua dor vai aumentar... todo dia parece ser o mesmo: acordar, caçar, buscar água, procurar gasolina.... `);
console.log();
prompt("Tecle ENTER para continuar. ".bgRed);

// Variável para contar a madeira
let dias = 0;
//O jogo roda até o for ser true, se encontrar a gasolina, acaba
for (; player.gasolina === 0; ) {
  console.clear();
  //ALEATÓRIO
  const aleat = () => Math.floor(Math.random() * 3 + 1);
  const aleatgas = () => Math.floor(Math.random() * 4 + 1);
  //aleatório zumbis
  let aleatorio = aleat();
  //aleatório gasolina
  let aleatoriogas = aleatgas();

  function floresta() {
    console.clear();
    display();
    console.log(
      `Dia: ${tempo.dia}, ${tempo.periodos[tempo.periodoatual]}. ${
        player.nome
      } Você não pode dar mole vc tem que  ir explorar a floresta para adquirir recursos, você deseja: [1] Buscar comida [2] Pegar água [3] Cortar madeira. `
    );
    action = +prompt();
    while (action > 3 || action == 0 || isNaN(action)) {
      console.log(
        "Escolha inválida. Escolha: [1] Buscar comida [2] Pegar água [3] Cortar madeira "
      );
      action = +prompt();
      console.clear();
    }
    if (action == 1) {
      console.clear();
      action = +prompt("Buscar comida: [1]Caçar [2] Colher frutas. ");
      console.clear();
      while (action > 2 || action == 0 || isNaN(action)) {
        console.log("Escolha inválida. Escolha: [1]Caçar [2] Colher frutas. ");
        action = +prompt();
        console.clear();
      }
      if (action == 1) {
        console.log(
          `Um filhote de cervo atravessou seu caminho. Você o caçou e o levou para casa em suas costas, pois estava muito pesado e poderia te atrasar, em vez disso, você tirou uma parte da carne e deixou o resto na floresta. \nVocê encontrou um ninho em uma árvore próxima, os ovos irão servir para fazer algumas receitas. `
        );
        prompt("Tecle enter para continuar. ".red);
        console.clear();
        player.fome += 35;
        player.saude += 5;
        aleatorio = aleat();
        if (aleatorio == 3) {
          console.log(
            "Você começou a escutar sons estranhos atrás dos arbustos e de repente se depara com um zumbi. Ele te agarra, o que faz você tropeçar e cair no chão. Após uma breve luta, você consegue empurra-lo para longe, o que dá a você tempo para pegar seu taco que está preso em suas costas e atingir a criatura na cabeça.  "
          );
          prompt("Tecle enter para continuar. ".red);
          player.saude -= 35;
          player.hidratacao -= 20;
          player.fome -= 20;
        }
      } else if (action == 2) {
        console.log(
          `Você encontrou amoras e colhe algumas. Os pêssegos parecem suculentos, você colhe alguns para fazer suco. `
        );
        prompt("Tecle enter para continuar. ".red);
        console.clear();
        player.fome += 25;
        player.hidratacao += 10;
        player.saude += 5;
        aleatorio = aleat();
        if (aleatorio == 3) {
          console.log(
            "Durante sua colheita, você percebe pegadas próximas a plantação. Zumbis parecem estar por perto, e para que não estraguem suas frutas, você vai atrás deles segurando o seu taco. Eles acabam escutando seus passos e correm até você, são apenas dois zumbis, mas o susto faz com que você se esconda nós arbustos e se machuque com os galhos afiados. Você espera eles se separarem e vai corre até o primeiro, o acertando rapidamente na cabeça e depois faz o mesmo com o segundo.  "
          );
          prompt("Tecle enter para continuar. ".red);
          console.clear();
          player.saude -= 35;
          player.hidratacao -= 20;
          player.fome -= 20;
        }
      }
    } else if (action == 2) {
      console.clear();
      console.log(`Você foi até o poço improvisado e pegou um pouco de água. `);
      prompt("Tecle enter para continuar. ".red);
      player.hidratacao += 30;
      player.saude += 5;
      aleatorio = aleat();
      if (aleatorio == 3) {
        console.clear();
        console.log(
          "Com o barulho da água, você não escutou um zumbi se aproximando por trás de você. Ele quase consegue arranhar o seu braço, mas você se abaixa e rapidamente pega uma pedra grande e o acerta na cabeça. "
        );
        prompt("Tecle enter para continuar. ".red);
        player.saude -= 35;
        player.hidratacao -= 20;
        player.fome -= 20;
      }
    } else if (action == 3) {
      console.clear();
      console.log(
        `Você pegou seu machado para coletar madeira. Os pedaços menores servem para acender sua fogueira e os maiores para fazer melhorias na casa e deixa-la mais segura contra zumbis. `
      );
      prompt("Tecle enter para continuar. ".red);
      player.madeira += 25;
      player.fome -= 15;
      player.saude -= 15;
      player.hidratacao -= 15;
      aleatorio = aleat();
      if (aleatorio == 3) {
        console.clear();
        console.log(
          "O barulho do seu machado contra a madeira atraiu muitos zumbis, você teve que lutar contra alguns e correr de volta para casa. Por sorte, saiu com vida da floresta. "
        );
        prompt("Tecle enter para continuar. ".red);
        player.saude -= 35;
        player.hidratacao -= 20;
        player.fome -= 20;
      }
    }
  }
  //para zerar toda vez que um novo dia começar
  tempo.zeratempo();
  // Chamar a função para explorar a floresta 1ª vez
  floresta();
  console.clear();
  status(player);
  tempo.avancatempo();
  // Chamar a função para explorar a floresta 2ª vez
  floresta();
  console.clear();
  status(player);
  display();
  //Para explorar a cidade
  console.log(
    `Dia: ${tempo.dia}, ${tempo.periodos[tempo.periodoatual]}. ${
      player.nome
    }, onde vai explorar pela cidade? [1] Explorar casas abandonadas, [2] Lojas abandonadas `
  );
  action2 = +prompt(" ");
  while (action2 > 2 || action2 == 0 || isNaN(action2)) {
    console.log(
      "Escolha inválida. Escolha: [1] Explorar casas abandonadas, [2] Lojas abandonadas. "
    );
    action2 = +prompt();
    console.log;
  }
  if (action2 == 1) {
    console.clear();
    player.fome += 20;
    player.hidratacao += 20;
    player.saude += 10;
    console.log(
      "Você explorou uma casa abandonada e encontrou remédios e barras de cereal.  "
    );
    prompt("Tecle enter para continuar. ".red);
    aleatorio = aleat();
    if (aleatorio == 3) {
      console.clear();
      console.log(
        "Um dos quartos da casa estava com a porta fechada e ao abri-la, uma família de zumbis saiu de lá. Você precisou correr da frente para a porta principal e tranca-la, isso evitou uma mordida, mas você acabou se machucando no caminho. "
      );
      prompt("Tecle enter para continuar. ".red);
      player.saude -= 35;
      player.hidratacao -= 20;
      player.fome -= 20;
    }
  } else if (action2 == 2) {
    console.clear();
    player.fome += 20;
    player.hidratacao += 20;
    player.saude += 5;
    console.log();
    console.log("Você explorou uma loja e encontrou comida enlatada.  ");
    prompt("Tecle enter para continuar. ".red);
    aleatorio = aleat();
    aleatoriogas = aleatgas();
    if (aleatorio == 3) {
      console.clear();
      console.log(
        "Um zumbi veio correndo até você quando tentou sair da loja, você precisou empurra-lo para trás e acerta-lo com seu taco. "
      );
      prompt("Tecle enter para continuar. ".red);
      console.log();
      player.saude -= 35;
      player.hidratacao -= 20;
      player.fome -= 20;
    }
    if (aleatoriogas == 3) {
      console.clear();
      console.log(`Ao sair da loja, você encontra um galão de gasolina, felizmente está cheio, e agora você finalmente tem a chance de sair da cidade. Você vai para casa, embala seus pertences mais importantes, suprimentos que pode precisar em sua viagem e segue para Orizon. \nQuando chegou lá, encontrou algo melhor do que pensava. A cidade é protegida por uma grande muralha e vários sobreviventes lhe dão as boas-vindas. Finalmente ${player.nome}! Você se sente segur${oae}. `);
      console.log();
      process.exit();
    }
  }

  tempo.avancatempo();
  console.clear();
  display();
  console.log(
    `Dia: ${tempo.dia}, ${
      tempo.periodos[tempo.periodoatual]
    }. Começou a anoitecer, permanecer fora de casa pode ser bem perigoso, voltando para a casa.. `
  );
  console.log();

  if (player.madeira < 99) {
    dias++;
    console.log(
      `Sua casa irá se deteriorar em ${
        5 - dias
      } dia(s), não deixe de recolher madeira para fazer a manutenção da casa. `
        .yellow
    );
    console.log();
  } else if (player.madeira >= 100) {
    dias = 0;
    player.madeira = 0;
    console.log(
      `Conseguiu a quantidade de madeiras necessárias para o reparo da casa, você está segur${oae} por enquanto. `
        .yellow
    );
    console.log();
  }
  //Se a cada 5 dias não seguir com o reparo da casa, ocorre a invasão
  if (dias >= 5) {
    console.clear();
    console.log(
      "Você estava dormindo quando escutou grunhidos e barulhos de madeira se partindo. Mal teve tempo de se arrepender por não ter feito melhorias nas paredes antes dos zumbis invadirem a casa e te atacarem. Eram muitos zumbis e seu taco de basebol não foi suficiente para controla-los. Fim de jogo. "
    );
    console.log();
    process.exit();
  }
  status(player);
  console.log(`Fim do dia ${tempo.dia}. `);
  prompt("Tecle enter para continuar. ".red);

  player.saude += 30;
  player.fome -= 20;
  player.hidratacao -= 20;
  //contador de dias
  tempo.dia++;
}
