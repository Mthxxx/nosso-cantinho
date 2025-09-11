// Elementos principais
const signupBtn = document.getElementById("signup-btn");
const signupContainer = document.getElementById("signup-container");
const createBtn = document.getElementById("create-btn");
const loginContainer = document.getElementById("login-container");
const backBtn = document.getElementById("back-btn");
const titulo = document.getElementById("titulo");
const texto = titulo.textContent;
titulo.textContent = "";
let i = 0;
const caracteres = texto.split("")
const btnSaudade = document.getElementById("saudade-btn");
const containerSaudade = document.getElementById("saudade-heart-container");

document.getElementById("letter-container").classList.add("hidden");

// Função de login
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const timestamp = sessionStorage.getItem("timestamp");

    if(!timestamp) {
        alert("Faça o cadastro antes");S
        return;
    }

    if(Date.now() - timestamp > 10*60*1000) { // 10 minutos
        alert("Sua senha expirou! Cadastre novamente");
        sessionStorage.clear();
        signupContainer.classList.remove("hidden");
        loginContainer.style.display = "none";
        return;
    }

    if(user === sessionStorage.getItem("user") && pass === sessionStorage.getItem("pass")) {
        loginContainer.style.display = "none";
        document.getElementById("content").classList.remove("hidden");

        // esconde o botão de cadastro
        document.getElementById("signup-btn").style.display = "none";
        
        // libera fotos, contador e carta
        document.querySelectorAll(".gallery img").forEach(img => img.classList.remove("blurred"));
        calcularDias();
        document.getElementById("letter-container").classList.remove("hidden");

        document.getElementById("footer").classList.remove("hidden");
    
        //chama a funcao da petala //
        for (let i = 0; i < 30; i++) {
            setTimeout(criarPetala, i * 150);
        }

    } else {
        alert("Usuário ou senha incorretos!");
    }

    // chama a funçao de digitar //
    digitar();
}

// Mostrar tela de cadastro
signupBtn.addEventListener("click", () => {
    signupContainer.classList.remove("hidden");
    loginContainer.style.display = "none";
});

// Botão de voltar
backBtn.addEventListener("click", () => {
    signupContainer.classList.add("hidden"); 
    loginContainer.style.display = "block"; 
});

// Cadastro temporário
createBtn.addEventListener("click", () => {
    const newUser = document.getElementById("signup-username").value;
    const newPass = document.getElementById("signup-password").value;

    if(newUser && newPass) {
        sessionStorage.setItem("user", newUser);
        sessionStorage.setItem("pass", newPass);
        sessionStorage.setItem("timestamp", Date.now());

        alert("Cadastro realizado! Agora faça login");
        signupContainer.classList.add("hidden");
        loginContainer.style.display = "block";
    } else {
        alert("Preencha usuário e senha!");
    }
});

// Função para calcular dias juntos
    function calcularDias() {
    const dataInicio = new Date("2024-06-22");
    const hoje = new Date();
    const diffTime = Math.abs(hoje - dataInicio);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const diasEl = document.getElementById("dias");
    diasEl.textContent = 0; // começa de 0
    document.getElementById("contador-dias").classList.remove("hidden");

    let contador = 0;
    const stepTime = Math.max(10, 2000 / diffDays);

    const interval = setInterval(() => {
        contador++;
        diasEl.textContent = contador;
        if (contador >= diffDays) {
            clearInterval(interval);
        }
    }, stepTime);
}

// Função para abrir a carta
function openLetter() {
    const letter = document.querySelector(".letter");
    const message = document.getElementById("letter-message");

    letter.style.transform = "translateY(-200px)";
    letter.style.zIndex = "10";

    setTimeout(() => {
        message.classList.remove("hidden");

        // corações ao abrir carta
        for(let i=0; i<25; i++){
            setTimeout(createHeart, i*200);
        }

    }, 800);
}

// Função para fechar a carta
function closeLetter() {
    const message = document.getElementById("letter-message");
    const letter = document.querySelector(".letter");
    
    // esconde a mensagem
    message.classList.add("hidden");

    // reseta a carta para posição original
    if(letter) {
        letter.style.transform = "translateY(0)";
        letter.style.zIndex = "-1";
    }
}

// Evento no botão de fechar carta
document.getElementById("close-btn").addEventListener("click", closeLetter);

// Função para criar corações
function createHeart(){
    const container = document.getElementById("hearts-container");
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    container.appendChild(heart);

    setTimeout(()=> heart.remove(), 4000);
}

const foto11 = document.querySelector(".blur-on-hover");

if (foto11) {
    foto11.addEventListener("mouseenter", () => {
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 200);
        }
    });
}

function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    star.style.left = Math.random() * window.innerWidth + "px";

    document.body.appendChild(star);

    setTimeout (() => {
        star.remove();
    }, 2000);
}

setInterval(createShootingStar, 5000);

function digitar() {
    if (i < caracteres.length) {
        titulo.textContent += caracteres[i];
        i++;
        setTimeout(digitar, 100);
    }
}

// Função da petala //

    function criarPetala() {
    const petala = document.createElement("div");
    petala.classList.add("petala-emoji");
    petala.textContent = "🌸";

    petala.style.left = Math.random() * window.innerWidth + "px";
    const tamanho = 20 + Math.random() * 20;
    petala.style.fontSize = tamanho + "px";

    document.body.appendChild(petala);

    const duracao = 4000 + Math.random() * 2000;
    const deslocamentoX = (Math.random() - 0.5) * 100;

    // animação usando animate
    petala.animate(
        [
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${deslocamentoX}px, 100vh) rotate(${Math.random()*360}deg)`, opacity: 0 }
        ],
        { duration: duracao, easing: "linear" }
    );

    setTimeout(() => petala.remove(), duracao);
}

// botao da saudade //

btnSaudade.addEventListener("click", () => {
    const heart = document.createElement("div");
    heart.classList.add("heart-pulsando");
    heart.textContent = "❤️";

    containerSaudade.appendChild(heart);

     // corações ao abrir carta
    for(let i=0; i<25; i++){
        setTimeout(createHeart, i*200);
    }

    setTimeout (() => {
        heart.remove();
    }, 800);
});
