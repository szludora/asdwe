import {kiir} from "./keszito.js"
import {gomb, oldalOsszeallit} from "./script.js"
 
export function urlapSubmit(lista, alapKep, event) {
    let kutya = {
      kep: document.querySelector("input#url").value,
      nev: document.querySelector("input#nev").value,
      fajta: document.querySelector("input#fajta").value,
      kor: document.querySelector("input#kor").value,
      nem: "",
      marmagassag: document.querySelector("input#marmagassag").value,
    };
    if(kutya['kep']==""){
      kutya['kep'] = alapKep
    }
    if (document.querySelector("input#szuka").checked) {
      kutya["nem"] = "szuka";
    } else if (document.querySelector("input#kan").checked) {
      kutya["nem"] = "kan";
    }
    lista.push(kutya);
    kiir(lista, lista.length - 1);
    gomb();
    event.preventDefault();
  }