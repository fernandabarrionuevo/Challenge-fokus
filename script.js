const enfocarBtn = document.getElementById("enfocar");
const descansoCortoBtn = document.getElementById("descanso-corto");
const descansoLargoBtn = document.getElementById("descanso-largo");
const iniciarBtn = document.getElementById("iniciar");
const pausarBtn = document.getElementById("pausar");
const continuarBtn = document.getElementById("continuar");
const tiempoEnfocarEnSegundos = 25 * 60;
const tiempoDescansoCortoEnSegundos = 5 * 60;
const tiempoDescansoLargoEnSegundos = 15 * 60;
let tiempoActual;
let interval;
let timer = document.getElementById("timer");

function setTiempo(tiempo) {
  tiempoActual = tiempo;
  let minutos = Math.floor(tiempo / 60);
  let segundos = tiempo % 60;
  segundos = segundos < 10 ? "0" + segundos : segundos;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  timer.innerText = `${minutos}:${segundos}`;
}

function eventoClick(elementoHtml, tiempo) {
  elementoHtml.addEventListener("click", () => {
    iniciarBtn.style.display = "block";
    pausarBtn.style.display = "none";
    pausarBtn.removeAttribute('disabled')
    continuarBtn.style.display = "none";
    setTiempo(tiempo);
    stop();
    //Cambiar el botón activo
    let elementoActivoActual = document.querySelector('.activo');
    elementoActivoActual.classList.remove('activo');
    elementoHtml.classList.add('activo');
    
  });
}

setTiempo(tiempoEnfocarEnSegundos);
eventoClick(enfocarBtn, tiempoEnfocarEnSegundos);
eventoClick(descansoCortoBtn, tiempoDescansoCortoEnSegundos);
eventoClick(descansoLargoBtn, tiempoDescansoLargoEnSegundos);

function stop() {
  clearInterval(interval);
}

function desconteo() {
  tiempoActual--;
  setTiempo(tiempoActual);

  if (tiempoActual === 0) {
      stop();
      playAudio();
      pausarBtn.setAttribute('disabled', '')
  }
}

function playAudio(){
    let audio = new Audio('./assets/audio.mp3')
    audio.play()
}

iniciarBtn.addEventListener("click", () => {
  iniciarBtn.style.display = "none";
  pausarBtn.style.display = "block";
  interval = setInterval(desconteo, 1000);
});

pausarBtn.addEventListener("click", () => {
  stop();
  pausarBtn.style.display = "none";
  continuarBtn.style.display = "block";
  console.log(tiempoActual);
});

continuarBtn.addEventListener("click", () => {
  interval = setInterval(desconteo, 1000);
  pausarBtn.style.display = "block";
  continuarBtn.style.display = "none";
});