window.addEventListener("load", init);

import { div_keszit, td_keszit, osszeallit, tablazat } from "./keszito.js";
import { rendezes } from "./rendezes.js";
import { urlapSubmit } from "./urlap.js";
import { formazas } from "./formazo.js";
let kosarNyitva = false;
let kutyaLista = [
  {
    kep: "kepek/foxterrier.jfif",
    nev: "Maci",
    fajta: "foxterrier",
    kor: 7,
    nem: "kan",
    marmagassag: 31,
  },
  {
    kep: "kepek/kuvasz.jpg",
    nev: "Kicsi",
    fajta: "kuvasz",
    kor: 5,
    nem: "szuka",
    marmagassag: 63,
  },
  {
    kep: "kepek/puli.jfif",
    nev: "Dió",
    fajta: "puli",
    kor: 9,
    nem: "szuka",
    marmagassag: 52,
  },
  {
    kep: "kepek/agar.jpg",
    nev: "Negró",
    fajta: "agár",
    kor: 11,
    nem: "kan",
    marmagassag: 59,
  },
  {
    kep: "kepek/ujfullandi.jfif",
    nev: "Max",
    fajta: "újfullandi",
    kor: 3,
    nem: "kan",
    marmagassag: 69,
  },
];
export const alapKep =
  "https://vectorsart.com/vectors-images/vectorsart_10504.jpg";
const torolt = [];

function init() {
  oldalOsszeallit();
}

export function oldalOsszeallit() {
  const ART = document.querySelector("article");
  const SEC = document.querySelector("section");
  let txt = osszeallit(kutyaLista);
  ART.innerHTML = txt;
  let tabla = tablazat(kutyaLista);
  SEC.innerHTML = tabla;
  formazas();
  urlap();
  gomb();
  rendezoGombok();
  kiolvasKosar();
  kosarGomb();
  kosarKatt();
  // kosarbolTorloGomb()
}

export function gomb() {
  let gomb = document.querySelectorAll(
    "button:not(.sort):not(.submit):not(.visszahiv):not(.kosar):not(.kosarTorles)"
  );
  for (let i = 0; i < gomb.length; i++) {
    gomb[i].addEventListener("click", figyelmeztet);
  }
  let visszahivok = document.querySelectorAll(".visszahiv");
  for (let i = 0; i < visszahivok.length; i++) {
    visszahivok[i].addEventListener("click", visszahiv);
  }
}
function visszahiv(event) {
  let gombok = document.querySelectorAll("aside button:not(.kosarTorles)");
  let kutya = event.target.classList[1];

  for (let i = 0; i < torolt.length; i++) {
    if (torolt[i].nev == kutya) kutyaLista.push(torolt[i]);
    for (let j = 0; j < gombok.length; j++) {
      if (gombok[j].classList[1] == kutya) {
        gombok[j].style.display = "none";
      }
    }
    oldalOsszeallit();
  }
}
function figyelmeztet(event) {
  let cel = event.target.parentElement;
  if (cel.tagName == "TD") {
    let cel2 = cel.parentElement;
    if (
      confirm(`Biztos, hogy törlöd ${cel2.classList[0]}-t a listából?`) == true
    ) {
      torles(cel2);
    }
  } else {
    if (
      confirm(`Biztos, hogy törlöd ${cel.classList[0]}-t a listából?`) == true
    ) {
      torles(cel);
    }
  }
}
function torles(cel) {
  let szulo = cel;

  if (szulo.tagName == "DIV") {
    let osztalyLista = Array.from(szulo.classList);
    let tableRows = document.querySelectorAll("tr");

    for (let i = 0; i < tableRows.length; i++) {
      if (tableRows[i].getAttribute("class") == osztalyLista[0]) {
        for (let j = 0; j < kutyaLista.length; j++) {
          if (kutyaLista[j].nev == osztalyLista[0]) {
            tableRows[i].remove();
            torol(j, kutyaLista[j].nev);

            oldalOsszeallit();
          }
        }
        szulo.remove();
      }
    }
  } else {
    let tableRow = cel;
    tableRow.remove();
    let divek = document.querySelectorAll("div");
    let osztalyLista = Array.from(tableRow.classList);

    for (let i = 0; i < divek.length; i++) {
      if (divek[i].classList[0] == osztalyLista[0]) {
        for (let x = 0; x < kutyaLista.length; x++) {
          if (kutyaLista[x].nev == osztalyLista[0]) {
            torol(x, kutyaLista[x].nev);
            divek[i].remove();
            oldalOsszeallit();
          }
        }
      }
    }
  }
}

function torol(x, nev) {
  torolt.push(kutyaLista[x]);
  delete kutyaLista[x];

  kutyaLista = kutyaLista.filter(function (el) {
    return el != null;
  });
  visszaHiv(nev);
}

function visszaHiv(nev) {
  let as = document.querySelector("aside");
  as.innerHTML += `<button class="visszahiv ${nev}">${nev}</button>`;
}

function urlap() {
  let gomb = document.querySelector(".submit");
  gomb.addEventListener("click", function () {
    urlapSubmit(kutyaLista, alapKep, event);
  });
}

function rendezoGombok() {
  let gombok = document.querySelectorAll(".sort");
  for (let i = 0; i < gombok.length; i++) {
    gombok[i].addEventListener("click", function () {
      rendezes(kutyaLista, gombok[i].classList[2], gombok[i].classList[1]);
    });
  }
}

function kosarGomb() {
  let kosarak = document.querySelectorAll(".kosar");
  for (let i = 0; i < kosarak.length; i++) {
    kosarak[i].addEventListener("click", function () {
      kosarhozAdas(i);
    });
  }
}

function kosarhozAdas(i) {
  let elem = kutyaLista[i];
  localStorage.setItem(`${kutyaLista[i].nev}`, JSON.stringify(elem));
  const segedLISTA = JSON.parse(localStorage.getItem(`${kutyaLista[i].nev}`));
  let kosarIkon = document.querySelector(".asd");

  kosarIkon.innerHTML = `<i class="fa fa-shopping-cart" style="font-size: 30px"></i><p class="mennyiseg">${localStorage.length}</p>`;
}

function kiolvasKosar() {
  let kosarIkon = document.querySelector(".asd");
  kosarIkon.innerHTML = `<i class="fa fa-shopping-cart" style="font-size: 30px"></i> <p class="mennyiseg">${localStorage.length}</p>`;
}

function kosarKatt() {
  let kosarGomb = document.querySelector(".asd:not(.kosarTorles)");
  kosarGomb.addEventListener("click", function () {
    if (event.target.classList.contains("kosarTorles")) {
      kosarbolTorol(event);
    } else {
      if (!kosarNyitva) {
        tartalomMegnez();
        kosarNyitva = true;
      } else {
        gombBezar();
        kosarNyitva = false;
      }
    }
  });
}

function tartalomMegnez() {
  let gomb = document.querySelector(".asd");
  let kulcsok = Object.keys(localStorage);
  gomb.classList.add("kattintott");
  setTimeout(function () {
    let txt = "";
    for (var i = 0; i < localStorage.length; i++) {
      txt += `<p class="torles ${localStorage.key(i)}">${localStorage.key(
        i
      )}&nbsp&nbsp&nbsp&nbsp<button class="kosarTorles ${localStorage.key(
        i
      )}">Törlés</button></p>`;
    }
    gomb.innerHTML += txt;
  }, 1400);
}

function gombBezar() {
  let gomb = document.querySelector(".asd");
  gomb.innerHTML = `<i class="fa fa-shopping-cart" style="font-size: 30px"></i><p class="mennyiseg">${localStorage.length}</p>`;
  gomb.classList.remove("kattintott");
}

function kosarbolTorol(event) {
  let sorok = document.querySelectorAll(".asd p");
  let kulcs = event.target.classList[1];
  let mennyiseg = document.querySelector(".mennyiseg");

  for (let i = 0; i < sorok.length; i++) {
    if (sorok[i].classList[1] == kulcs) {
      sorok[i].remove();
    }
  }
  localStorage.removeItem(kulcs);
  mennyiseg.innerHTML = `<p class="mennyiseg">${localStorage.length}</p>`;
}
