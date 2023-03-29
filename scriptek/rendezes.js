import {oldalOsszeallit} from "./script.js"
export function rendezes(lista, kulcs, irany) {
    lista.sort(function (a, b) {
        let ertek = 1;
        if (irany == "novekvo") {
            if (a[kulcs] < b[kulcs]) {
                ertek = -1;
            } 
        }
        else{
            if (a[kulcs] > b[kulcs]) {
                ertek = -1;
            }  
        }
        return ertek
    }
    );
    oldalOsszeallit();
}