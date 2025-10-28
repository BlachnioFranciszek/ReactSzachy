import { useState } from 'react';
import './App.css'

const wysokosc = 8;
const szerokosc = 8;
const ktoSieRusza = {x: undefined, y: undefined};
var czySieRuszaBialy = true;

const figury = {
  brak: "Brak",
  pion: "Pion",
  skoczek: "Skoczek",
  goniec: "Goniec",
  wieza: "Wieza",
  hetman: "Hetman",
  krol: "Krol"
}

class PoleSzachownicy {
  constructor(y, file, x, kolorPola, kolorPrzeciwnika, figura, czyBije, czySieRusza) {
    this.x=x;
    this.y=y;
    this.file=file;
    this.kolorPola = kolorPola;
    this.kolorPrzeciwnika = kolorPrzeciwnika;
    this.figura = figura;
    this.czyBije = czyBije;
    this.czySieRusza = czySieRusza;
  }
}

const plansza = new Array(wysokosc).fill(0).map(() => new Array(szerokosc).fill(0));

// Petla wypelnia tablice plansza polami w odpowiednich kolorach, pomijamy 2 pierwsze i ostatnie rzedy poniewaz przydzielimy im pola pozniej
var p;
for (let i = 2; i < plansza.length - 2; i++) {
  for (let j = 0; j < plansza[i].length; j++) {
    switch(j){
      case 0:p="a";break;
      case 1:p="b";break;
      case 2:p="c";break;
      case 3:p="d";break;
      case 4:p="e";break;
      case 5:p="f";break;
      case 6:p="g";break;
      case 7:p="h";break;
    }
    if (i % 2 == 0) {
      if (j % 2 == 0) {
        plansza[plansza.length - i - 1][j] = new PoleSzachownicy(j+1, p, i+1, "bialy", "brak", figury.brak, false, false);
      }
      else {
        plansza[plansza.length - i - 1][j] = new PoleSzachownicy(j+1, p, i+1, "czarny", "brak", figury.brak, false, false);
      }

    }
    else {
      if (j % 2 == 0) {
        plansza[plansza.length - i - 1][j] = new PoleSzachownicy(j+1, p, i+1, "czarny", "brak", figury.brak, false, false);
      }
      else {
        plansza[plansza.length - i - 1][j] = new PoleSzachownicy(j+1, p, i+1, "bialy", "brak", figury.brak, false, false);
      }
    }
  }
}


// Uzupelnianie tablicy planszy figurami
plansza[0] = [
  new PoleSzachownicy(1, "a", 8, "czarny", "czarny", figury.wieza, false, false),
  new PoleSzachownicy(2, "b", 8, "bialy", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy(3, "c", 8, "czarny", "czarny", figury.goniec, false, false),
  new PoleSzachownicy(4, "d", 8, "bialy", "czarny", figury.hetman, false, false),
  new PoleSzachownicy(5, "e", 8, "czarny", "czarny", figury.krol, false, false),
  new PoleSzachownicy(6, "f", 8, "bialy", "czarny", figury.goniec, false, false),
  new PoleSzachownicy(7, "g", 8, "czarny", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy(8, "h", 8, "bialy", "czarny", figury.wieza, false, false)
]

plansza[1] = [
  new PoleSzachownicy(1, "a", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(2, "b", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(3, "c", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(4, "d", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(5, "e", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(6, "f", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(7, "g", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(8, "h", 7, "czarny", "czarny", figury.pion, false, false)

]

plansza[6] = [
  new PoleSzachownicy(1, "a", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(2, "b", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(3, "c", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(4, "d", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(5, "e", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(6, "f", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(7, "g", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(8, "h", 2, "bialy", "bialy", figury.pion, false, false)
]

plansza[7] = [
  new PoleSzachownicy(1, "a", 1, "bialy", "bialy", figury.wieza, false, false),
  new PoleSzachownicy(2, "b", 1, "czarny", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy(3, "c", 1, "bialy", "bialy", figury.goniec, false, false),
  new PoleSzachownicy(4, "d", 1, "czarny", "bialy", figury.hetman, false, false),
  new PoleSzachownicy(5, "e", 1, "bialy", "bialy", figury.krol, false, false),
  new PoleSzachownicy(6, "f", 1, "czarny", "bialy", figury.goniec, false, false),
  new PoleSzachownicy(7, "g", 1, "bialy", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy(8, "h", 1, "czarny", "bialy", figury.wieza, false, false)
]


function Gra() {
  const [czyGra, setCzyGra] = useState(false);

  function startGraLokalna() {
    document.title = "Szachy cs local";
    setCzyGra(true)
  }


  if (czyGra) {
    return <Plansza/>
  }
  else {
    return (
      <>
        <h1>Szachy</h1>
        <h3>Zagraj w szachy na komputerze</h3>
        <button onClick={startGraLokalna}>Zagraj lokalnie z innym graczem</button>
      </>
    );
  }
  
}

function Plansza() {
  const [szachownica, setSzachownica] = useState(plansza);

  function updateSzachownica(szachownica) {
    setSzachownica(szachownica);
  }

  const doDruku = [];

  for (let i = 0; i < szachownica.length; i++) {
    for (let j = 0; j < szachownica[i].length; j++) {
      doDruku.push(<Pole key={i + " " + j} szachownica={structuredClone(szachownica)} PoleSzachownicy={szachownica[i][j]} updateSzachownica={updateSzachownica}></Pole>);
    }
  }

  return (
    <div id='szachownicaDiv'>
      {doDruku}
    </div>
  );
}

function Pole( {PoleSzachownicy: PoleSzachownicy, szachownica: szachownica, updateSzachownica: updateSzachownica }) {
  // Zmienia wszystkie czy sie rusza i czy bija na false
  function resetBoard() {
    for (let i = 0; i < szachownica.length; i++) {
      for (let j = 0; j < szachownica.length; j++) {
        szachownica[i][j].czySieRusza = false;
        szachownica[i][j].czyBije = false;
      }
    }
  }

  function poleClick() {
    console.log(szachownica);
    let col = PoleSzachownicy.y - 1;
    let row = szachownica.length - PoleSzachownicy.x;
    if (!PoleSzachownicy.czySieRusza) {
      resetBoard();
      let piece = PoleSzachownicy.figura;
      switch (piece) {
          case "Pion":
            if (czySieRuszaBialy) {
              // Ruszenie sie prosto
              if (szachownica[row][col].kolorPrzeciwnika != "bialy") {
                break;
              }

              if (row == 6) {
                if (szachownica[row-1][col].figura == figury.brak) {
                  szachownica[row-1][col].czySieRusza = true;
                  if (szachownica[row-2][col].figura == figury.brak) {
                    szachownica[row-2][col].czySieRusza = true;
                  }
                }
              }
              else {
                if (szachownica[row-1][col].figura == figury.brak) {
                  szachownica[row-1][col].czySieRusza = true;
                }
              }
              // Bicie
              try {
                if (szachownica[row-1][col-1].figura != figury.brak && szachownica[row-1][col-1].kolorPrzeciwnika == "czarny") {
                  szachownica[row-1][col-1].czyBije = true;
                  szachownica[row-1][col-1].czySieRusza = true;
                }
              } catch (error) {}
              try {
                if (szachownica[row-1][col+1].figura != figury.brak && szachownica[row-1][col+1].kolorPrzeciwnika == "czarny") {
                  szachownica[row-1][col+1].czyBije = true;
                  szachownica[row-1][col+1].czySieRusza = true;
                }
              } catch (error) {}
            }
            else {
              // Ruszenie sie prosto
              if (szachownica[row][col].kolorPrzeciwnika != "czarny") {
                break;
              }

              if (row == 1) {
                if (szachownica[row+1][col].figura == figury.brak) {
                  szachownica[row+1][col].czySieRusza = true;
                  if (szachownica[row+2][col].figura == figury.brak) {
                    szachownica[row+2][col].czySieRusza = true;
                  }
                }
              }
              else {
                if (szachownica[row+1][col].figura == figury.brak) {
                  szachownica[row+1][col].czySieRusza = true;
                }
              }
              // Bicie
              try {
                if (szachownica[row+1][col-1].figura != figury.brak && szachownica[row+1][col-1].kolorPrzeciwnika == "bialy") {
                  szachownica[row+1][col-1].czyBije = true;
                  szachownica[row+1][col-1].czySieRusza = true;
                }
              } catch (error) {}
              try {
                if (szachownica[row+1][col+1].figura != figury.brak && szachownica[row+1][col+1].kolorPrzeciwnika == "bialy") {
                  szachownica[row+1][col+1].czyBije = true;
                  szachownica[row+1][col+1].czySieRusza = true;
                }
              } catch (error) {}
            }
          ktoSieRusza.x = row;
          ktoSieRusza.y = col;
          break;
          case "Skoczek":
            if ((czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "czarny") || (!czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "bialy")) {
              break;
            }
            let xmozliwe = [row + 2, row + 1, row - 1, row - 2, row-2, row-1, row+1, row+2];
            let ymozliwe = [col + 1, col + 2, col + 2, col + 1, col-1, col-2, col-2, col-1];

            
            for (let i = 0; i < 8; i++) {              

              if (xmozliwe[i] < 0 || xmozliwe[i] > 7 || ymozliwe[i] < 0 || ymozliwe[i] > 7) {
                continue;
              }else{
                let cell = szachownica[xmozliwe[i]][ymozliwe[i]];
                if (cell == figury.brak) {
                  
                  cell.czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                } else {
                  if (cell.kolorPrzeciwnika !== szachownica[row][col].kolorPrzeciwnika) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                    ktoSieRusza.x = row;
                    ktoSieRusza.y = col;
                  }
                }
              } 
            }

          break;
          case "Goniec":
            // Jesli gracz proboje sie ruszyc nie na swoim ruchu
            if ((czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "czarny") || (!czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "bialy")) {
              break;
            }

            for (let tempcol = col+1, temprow = row+1; tempcol <= 7 && temprow <= 7; tempcol++, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row-1; tempcol >= 0 && temprow >= 0; tempcol--, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row+1; tempcol >= 0 && temprow <= 7; tempcol--, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }

            for (let tempcol = col+1, temprow = row-1; tempcol <= 7 && temprow >= 0; tempcol++, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }
            
          ktoSieRusza.x = row;
          ktoSieRusza.y = col;
          break;
          case "Wieza":
            // Jesli gracz proboje sie ruszyc nie na swoim ruchu
            if ((czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "czarny") || (!czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "bialy")) {
              break;
            }

            let tempx = row;
            let tempy = col;
            let startCell = szachownica[tempx][tempy];

            for (let c = tempy + 1; c <= 7; c++) {
              let cell = szachownica[row][c];

              if (cell.figura == figury.brak) {
                cell.czySieRusza = true;
                ktoSieRusza.x = row;
                ktoSieRusza.y = col;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  cell.czyBije = true;
                  cell.czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                break;
              }
            }

            for (let c = tempy - 1; c >= 0; c--) {
              let cell = szachownica[row][c];

              if (cell.figura == figury.brak) {
                cell.czySieRusza = true;
                ktoSieRusza.x = row;
                ktoSieRusza.y = col;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  cell.czyBije = true;
                  cell.czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                break;
              }
            }

            for (let r = tempx + 1; r <= 7; r++) {
              let cell = szachownica[r][col];

              if (cell.figura == figury.brak) {
                cell.czySieRusza = true;
                ktoSieRusza.x = row;
                ktoSieRusza.y = col;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  cell.czyBije = true;
                  cell.czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                break;
              }
            }

            for (let r = tempx - 1; r >= 0; r--) {
              let cell = szachownica[r][col];

              if (cell.figura == figury.brak) {
                cell.czySieRusza = true;
                ktoSieRusza.x = row;
                ktoSieRusza.y = col;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  cell.czyBije = true;
                  cell.czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                break;
              }
            }
            break;
          case "Hetman":
            // Jesli gracz proboje sie ruszyc nie na swoim ruchu
            if ((czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "czarny") || (!czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "bialy")) {
              break;
            }

            for (let tempcol = col+1, temprow = row+1; tempcol <= 7 && temprow <= 7; tempcol++, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row-1; tempcol >= 0 && temprow >= 0; tempcol--, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row+1; tempcol >= 0 && temprow <= 7; tempcol--, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }

            for (let tempcol = col+1, temprow = row-1; tempcol <= 7 && temprow >= 0; tempcol++, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].czySieRusza = true;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                  szachownica[temprow][tempcol].czyBije = true;
                }
                break;
              }
            }
            
          ktoSieRusza.x = row;
          ktoSieRusza.y = col;

          let temy1 = col+1;
          let temy2= col-1;
          let temx1 = row+1;
          let temx2 = row-1;
          for(temy1; temy1 <= 7; temy1++){
            if(temy1 != 8){
              if(szachownica[row][temy1].figura == figury.brak){
                szachownica[row][temy1].czySieRusza = true;
              }else if(szachownica[row][temy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][temy1].kolorPrzeciwnika == "czarny"){
                szachownica[row][temy1].czyBije=true;
                szachownica[row][temy1].czySieRusza = true;
                break;
              }else if(szachownica[row][temy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][temy1].kolorPrzeciwnika == "bialy"){
                szachownica[row][temy1].czyBije=true;
                szachownica[row][temy1].czySieRusza = true;
                break;
              }
              else if(szachownica[row][temy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][temy1].kolorPrzeciwnika == "bialy"){
                break;
              }
              else if(szachownica[row][temy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][temy1].kolorPrzeciwnika == "czarny"){
                break;
              }
            }else{
                break;
            }
          }
          for(temy2; temy2 >= 0; temy2--){
            if(temy2 != -1){
              if(szachownica[row][temy2].figura == figury.brak){
                szachownica[row][temy2].czySieRusza = true;
              }else if(szachownica[row][temy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][temy2].kolorPrzeciwnika == "czarny"){
                szachownica[row][temy2].czyBije=true;
                szachownica[row][temy2].czySieRusza = true;
                break;
              }else if(szachownica[row][temy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][temy2].kolorPrzeciwnika == "bialy"){
                szachownica[row][temy2].czyBije=true;
                szachownica[row][temy2].czySieRusza = true;
                break;
              }
              else if(szachownica[row][temy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][temy2].kolorPrzeciwnika == "bialy"){
                break;
              }
              else if(szachownica[row][temy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][temy2].kolorPrzeciwnika == "czarny"){
                break;
              }
            }else{
                break;
            }
          }
          for(temx1; temx1 <= 7; temx1++){
            if(temx1 != 8){
              if(szachownica[temx1][col].figura == figury.brak){
                szachownica[temx1][col].czySieRusza = true;
              }else if(szachownica[row][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[temx1][col].kolorPrzeciwnika == "czarny"){
                szachownica[temx1][col].czyBije=true;
                szachownica[temx1][col].czySieRusza = true;
                break;
              }else if(szachownica[temx1][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[temx1][col].kolorPrzeciwnika == "bialy"){
                szachownica[temx1][col].czyBije=true;
                szachownica[temx1][col].czySieRusza = true;
                break;
              }
              else if(szachownica[temx1][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[temx1][col].kolorPrzeciwnika == "bialy"){
                break;
              }
              else if(szachownica[temx1][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[temx1][col].kolorPrzeciwnika == "czarny"){
                break;
              }
            }else{
                break;
            }
          }

          for(temx2; temx2 >= 0; temx2--){
            if(temx2 != -1){
              if(szachownica[temx2][col].figura == figury.brak){
                szachownica[temx2][col].czySieRusza = true;
              }else if(szachownica[temx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[temx2][col].kolorPrzeciwnika == "czarny"){
                szachownica[temx2][col].czyBije=true;
                szachownica[temx2][col].czySieRusza = true;
                break;
              }else if(szachownica[temx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[temx2][col].kolorPrzeciwnika == "bialy"){
                szachownica[temx2][col].czyBije=true;
                szachownica[temx2][col].czySieRusza = true;
                break;
              }
              else if(szachownica[temx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[temx2][col].kolorPrzeciwnika == "bialy"){
                break;
              }
              else if(szachownica[temx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[temx2][col].kolorPrzeciwnika == "czarny"){
                break;
              }
            }else{
                break;
            }
          }

          break;
          case "Krol":
            if ((czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "czarny") || (!czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "bialy")) {
              break;
            }
            let xxmozliwe = [row + 1, row + 1, row , row - 1, row - 1, row - 1, row, row+1];
            let yymozliwe = [col , col + 1, col +1 , col + 1, col , col - 1, col -1, col-1];
            
            for (let i = 0; i < 8; i++) {              

              if (xxmozliwe[i] < 0 || xxmozliwe[i] > 7 || yymozliwe[i] < 0 || yymozliwe[i] > 7) {
                continue;
              }else{
                let cell = szachownica[xxmozliwe[i]][yymozliwe[i]];
                if (cell == figury.brak) {
                  
                  cell.czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                } else {
                  if (cell.kolorPrzeciwnika !== szachownica[row][col] .kolorPrzeciwnika) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                    ktoSieRusza.x = row;
                    ktoSieRusza.y = col;
                  }
                }
              } 
            }

          break;
        default:break;
      }
    }
    else {
      if (czySieRuszaBialy) {
        if (szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][col].czyBije) {
          szachownica[row][col].figura = szachownica[ktoSieRusza.x][ktoSieRusza.y].figura;
          szachownica[row][col].kolorPrzeciwnika = szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].figura = figury.brak;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika = "brak";
        }
        else if (szachownica[row][col].figura == figury.brak) {
          szachownica[row][col].figura = szachownica[ktoSieRusza.x][ktoSieRusza.y].figura;
          szachownica[row][col].kolorPrzeciwnika = szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].figura = figury.brak;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika = "brak";
        }
      }
      else {
        if (szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][col].czyBije) {
          szachownica[row][col].figura = szachownica[ktoSieRusza.x][ktoSieRusza.y].figura;
          szachownica[row][col].kolorPrzeciwnika = szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].figura = figury.brak;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika = "brak";
        }
        else if (szachownica[row][col].figura == figury.brak) {
          szachownica[row][col].figura = szachownica[ktoSieRusza.x][ktoSieRusza.y].figura;
          szachownica[row][col].kolorPrzeciwnika = szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].figura = figury.brak;
          szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika = "brak";
        }
      }

      resetBoard();
      // Ruszenie sie

      if(czySieRuszaBialy){
        czySieRuszaBialy=false;
      }
      else{
        czySieRuszaBialy=true;
      }
    }

    updateSzachownica(szachownica);
  }

  let pieceImageName;

  if (PoleSzachownicy.kolorPrzeciwnika == "bialy") {
    pieceImageName = "B";
  }
  else {
    pieceImageName = "C";
  }
  switch (PoleSzachownicy.figura) {
    case figury.brak:

    case figury.pion:
      pieceImageName += "Pion.svg";
      break;
    case figury.skoczek:
      pieceImageName += "Skoczek.svg";
      break;
    case figury.goniec:
      pieceImageName += "Goniec.svg";
      break;
    case figury.wieza:
      pieceImageName += "Wierza.svg";
      break;
    case figury.hetman:
      pieceImageName += "Hetman.svg";
      break;
    case figury.krol:
      pieceImageName += "Krol.svg";
      break;
  }



  return <div className={PoleSzachownicy.kolorPola == "bialy" ? 'poleSzachownicy bialePole' : 'poleSzachownicy czarnePole'} onClick={poleClick}>
    {PoleSzachownicy.figura != figury.brak ? <img className="zdjecieFigura" src={"./public/assets/" + pieceImageName}/> : <></>}
    {PoleSzachownicy.czySieRusza ? PoleSzachownicy.czyBije ? <img src={"./public/assets/Attack.png"} className='zdjecieRuch'/> : <img src={"./public/assets/Move.png"} className='zdjecieRuch'/> : <></>}
  </div>;
}

export default Gra
