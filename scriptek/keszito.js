import {formazas} from "./formazo.js"

export function div_keszit(lista, i) {
    let txt = `<div class="${lista[i].nev}">`;
    for (const kulcs in lista[i]) {
      if(kulcs=="nev"){
        txt += `<h2 class="${lista[i][kulcs]}">${lista[i][kulcs]}</h2>`
        continue
      }
      else if (kulcs=="kep") {
        continue
      } else {
        
        txt += `<p class="${kulcs}">${kulcs}:&nbsp&nbsp ${lista[i][kulcs]}</p>`;
      }
    }
    txt += `<img src='${lista[i].kep}'<br><button class="kosar"><i class="fa fa-shopping-cart" style="font-size: 30px"></i></button><br><button>Törlés</button></div>`;
    
    return txt;
  }
  
  export function td_keszit(lista, i) {
    let txt = `<tr class="${lista[i].nev}"><td>`;
    for (const kulcs in lista[i]) {
      if(kulcs=="kep"){
        txt += `<img src="${lista[i][kulcs]}" style="width: 100px; height: 100px; border-radius: 40px; object-fit: cover;"></td>`;
        continue
  
      }
      txt += `<td>${lista[i][kulcs]}</td>`;
    }
    txt += `<td><button>Törlés</button></td></tr>`;
    return txt;
  }
  
  export function osszeallit(lista) {
    let txt = "";
    for (let i = 0; i < lista.length; i++) {
      txt += div_keszit(lista, i);
    }
  
    return txt;
  }

export function tablazat(lista) {
  let txt = "<table><thead>";

  for (const kulcs in lista[0]) {
    if(kulcs=="kep"){
      txt += `<th>${kulcs}</th>`;
      continue
    }

      txt += `<th>${kulcs}<button class="sort novekvo ${kulcs}">^</button><button class="sort csokkeno ${kulcs}">˅</button></th>`;
    
  }
  txt += `</thead><tbody>`;

  for (let i = 0; i < lista.length; i++) {
    txt += td_keszit(lista, i);
  }
  txt += `</tbody></table>`;

  return txt;
}

export function kiir(lista, elem) {
  let div = div_keszit(lista, elem);
  let td = td_keszit(lista, elem);
  const ART = document.querySelector("article");
  ART.innerHTML += div;
  const TBODY = document.querySelector("tbody");
  TBODY.innerHTML += td;
  formazas();
}