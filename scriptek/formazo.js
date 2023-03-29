import {gomb} from "./script.js"
export function formazas() {
    let gombok = document.querySelectorAll("button");
    for (let i = 0; i < gombok.length; i++) {
      gombok[i].classList.add("formazottGomb");
    }
  
    let divek = document.querySelectorAll("div");
    for (let i = 0; i < divek.length; i++) {
      divek[i].classList.add("formazottDiv");
    }
  
    let inputok = document.querySelectorAll("input");
    for (let i = 0; i < inputok.length; i++) {
      inputok[i].style.height = "20px";
    }
    document.querySelector("table").classList.add("formTabla");
    document.querySelector("table").classList.add("tablara");
    document.querySelector("input#szuka").style.height = "20px";
    document.querySelector("input#szuka").style.width = "20px";
    document.querySelector("input#kan").style.height = "20px";
    document.querySelector("input#kan").style.width = "20px";
  }