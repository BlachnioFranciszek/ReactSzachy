import { useState } from 'react';
import './App.css'

const wysokosc = 8;
const szerokosc = 8;
const ktoSieRusza = {x: undefined, y: undefined};
var czySieRuszaBialy = true;
var czyPromocja = false;
var czyObracac = true;
let czySzachVar = false;

var rbroszada = true;
var rcroszada = true;
var lbroszada = true;
var lcroszada = true;



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
    this.czyPromocja = false;
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
    <div id='szachownicaDiv' className={czySieRuszaBialy && czyObracac ? "" : "obroc"}>
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

  function czySzach(szachownica, kolorKrola) {
    for (let i = 0; i < szachownica.length; i++) {
      for (let j = 0; j < szachownica.length; j++) {
        if (szachownica[i][j].figura != figury.brak && szachownica[i][j].kolorPrzeciwnika != kolorKrola) {
          let row = i;
          let col = j;
          let tempx;
          let tempy;
          let startCell;
          console.log("Sprawdzam " + szachownica[i][j].figura + " na " + szachownica[i][j].file + szachownica[i][j].x);
          switch (szachownica[i][j].figura) {
            case "Pion":
              if (kolorKrola == "czarny") {
                try {
                  if (szachownica[row-1][col-1].figura == figury.krol && szachownica[row-1][col-1].kolorPrzeciwnika == "czarny") {
                    return true;
                  }
                } catch (error) {}
                try {
                  if (szachownica[row-1][col+1].figura == figury.krol && szachownica[row-1][col+1].kolorPrzeciwnika == "czarny") {
                    return true;
                  }
                } catch (error) {}
              }
              else {
                try {
                  if (szachownica[row+1][col-1].figura == figury.krol && szachownica[row+1][col-1].kolorPrzeciwnika == "bialy") {
                    return true;
                  }
                } catch (error) {}
                try {
                  if (szachownica[row+1][col+1].figura == figury.krol && szachownica[row+1][col+1].kolorPrzeciwnika == "bialy") {
                    return true;
                  }
                } catch (error) {}
              }
            break;
            case "Skoczek":
              let xmozliwe = [row + 2, row + 1, row - 1, row - 2, row-2, row-1, row+1, row+2];
              let ymozliwe = [col + 1, col + 2, col + 2, col + 1, col-1, col-2, col-2, col-1];
  
              
              for (let i = 0; i < 8; i++) {              
  
                if (xmozliwe[i] < 0 || xmozliwe[i] > 7 || ymozliwe[i] < 0 || ymozliwe[i] > 7) {
                  continue;
                }else{
                  let cell = szachownica[xmozliwe[i]][ymozliwe[i]];
                  if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                    return true;
                  }
                } 
              }
  
            break;
            case "Goniec":
              for (let tempcol = col+1, temprow = row+1; tempcol <= 7 && temprow <= 7; tempcol++, temprow++) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col-1, temprow = row-1; tempcol >= 0 && temprow >= 0; tempcol--, temprow--) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col-1, temprow = row+1; tempcol >= 0 && temprow <= 7; tempcol--, temprow++) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col+1, temprow = row-1; tempcol <= 7 && temprow >= 0; tempcol++, temprow--) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }
            break;
            case "Wieza":
              tempx = row;
              tempy = col;
              startCell = szachownica[tempx][tempy];
  
              for (let c = tempy + 1; c <= 7; c++) {
                let cell = szachownica[row][c];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
              
  
              for (let c = tempy - 1; c >= 0; c--) {
                let cell = szachownica[row][c];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
  
              for (let r = tempx + 1; r <= 7; r++) {
                let cell = szachownica[r][col];

                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
  
              for (let r = tempx - 1; r >= 0; r--) {
                let cell = szachownica[r][col];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
              break;
            case "Hetman":
              tempx = row;
              tempy = col;
              startCell = szachownica[tempx][tempy];
  
              for (let c = tempy + 1; c <= 7; c++) {
                let cell = szachownica[row][c];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
              
  
              for (let c = tempy - 1; c >= 0; c--) {
                let cell = szachownica[row][c];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
  
              for (let r = tempx + 1; r <= 7; r++) {
                let cell = szachownica[r][col];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }
  
              for (let r = tempx - 1; r >= 0; r--) {
                let cell = szachownica[r][col];
  
                if (cell.figura == figury.krol && cell.kolorPrzeciwnika == kolorKrola) {
                  return true;
                } else if (cell.figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col+1, temprow = row+1; tempcol <= 7 && temprow <= 7; tempcol++, temprow++) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  console.log("1")
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col-1, temprow = row-1; tempcol >= 0 && temprow >= 0; tempcol--, temprow--) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  console.log("2")
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col-1, temprow = row+1; tempcol >= 0 && temprow <= 7; tempcol--, temprow++) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  console.log(row)
                  console.log(col)
                  console.log("3")
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

              for (let tempcol = col+1, temprow = row-1; tempcol <= 7 && temprow >= 0; tempcol++, temprow--) {
                if (szachownica[temprow][tempcol].figura == figury.krol && szachownica[temprow][tempcol].kolorPrzeciwnika == kolorKrola) {
                  console.log("4")
                  return true;
                } else if (szachownica[temprow][tempcol].figura != figury.brak) {
                  break;
                }
              }

            break;
            case "Krol":
              let xxmozliwe = [row + 1, row + 1, row , row - 1, row - 1, row - 1, row, row+1];
              let yymozliwe = [col , col + 1, col +1 , col + 1, col , col - 1, col -1, col-1];
              
              for (let i = 0; i < 8; i++) {              
  
                if (xxmozliwe[i] < 0 || xxmozliwe[i] > 7 || yymozliwe[i] < 0 || yymozliwe[i] > 7) {
                  continue;
                }else{
                  let cell = szachownica[xxmozliwe[i]][yymozliwe[i]];
                  if (cell.figura == figury.krol) {
                    return true;
                  }
                } 
              }
  
            break;
          }
        } 
      }
    }
    return false;
  }

  function promocjaClick(figura) {
    let col = PoleSzachownicy.y - 1;
    let row = szachownica.length - PoleSzachownicy.x;
    console.log(col)
    console.log(row)
    switch (figura) {
      case figury.goniec:
        szachownica[row][col].figura = figury.goniec;
        szachownica[row][col].kolorPrzeciwnika = (czySieRuszaBialy ? "bialy" : "czarny");
        break;
      case figury.skoczek:
        szachownica[row][col].figura = figury.skoczek;
        szachownica[row][col].kolorPrzeciwnika = (czySieRuszaBialy ? "bialy" : "czarny");
        break;
      case figury.wieza:
        szachownica[row][col].figura = figury.wieza;
        szachownica[row][col].kolorPrzeciwnika = (czySieRuszaBialy ? "bialy" : "czarny");
        break;
      case figury.hetman:
        szachownica[row][col].figura = figury.hetman;
        szachownica[row][col].kolorPrzeciwnika = (czySieRuszaBialy ? "bialy" : "czarny");
        break;
    }

    szachownica[row][col].czyPromocja = false;
    czyPromocja = false;
    czySieRuszaBialy = !czySieRuszaBialy;
    szachownica[ktoSieRusza.x][ktoSieRusza.y].figura = figury.brak;
    updateSzachownica(szachownica);
  }




  function poleClick() {
    console.log(szachownica);
    let col = PoleSzachownicy.y - 1;
    let row = szachownica.length - PoleSzachownicy.x;
    if (czyPromocja) {
      for (let i = 0; i < szachownica.length; i++) {
        for (let j = 0; j < szachownica.length; j++) {
          szachownica[i][j].czyPromocja = false;
        }
      }
      czyPromocja = false;
      updateSzachownica(szachownica);
      return;
    }
    if (!PoleSzachownicy.czySieRusza) {
      let tempx = row;
      let tempy = col;
      let startCell = szachownica[tempx][tempy];
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
                  szachownica[row-1][col].figura = figury.pion;
                  szachownica[row-1][col].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                    szachownica[row-1][col].czySieRusza = true;
                  }
                  szachownica[row-1][col].figura = figury.brak;
                  szachownica[row][col].figura = figury.pion;

                  if (szachownica[row-2][col].figura == figury.brak) {
                    szachownica[row-2][col].figura = figury.pion;
                    szachownica[row-2][col].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                    szachownica[row][col].figura = figury.brak;
                    if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                      szachownica[row-2][col].czySieRusza = true;
                    }
                    szachownica[row-2][col].figura = figury.brak;
                    szachownica[row][col].figura = figury.pion;
                  }
                }
              }
              else {
                if (szachownica[row-1][col].figura == figury.brak) {
                  szachownica[row-1][col].figura = figury.pion;
                  szachownica[row-1][col].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                    szachownica[row-1][col].czySieRusza = true;
                  }
                  szachownica[row-1][col].figura = figury.brak;
                  szachownica[row][col].figura = figury.pion;
                }
              }
              // Bicie
              try {
                if (szachownica[row-1][col-1].figura != figury.brak && szachownica[row-1][col-1].kolorPrzeciwnika == "czarny") {
                  let poprzedniaFigura = szachownica[row-1][col-1].figura;
                  let poprzedniKolor = szachownica[row-1][col-1].kolorPrzeciwnika;
                  szachownica[row-1][col-1].figura = figury.pion;
                  szachownica[row-1][col-1].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[row-1][col-1].figura = poprzedniaFigura;
                  szachownica[row-1][col-1].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.pion;
                  if (!czySzachVar) {
                    szachownica[row-1][col-1].czySieRusza = true;
                    szachownica[row-1][col-1].czyBije = true;
                  }
                }
              } catch (error) {
                console.log(error)
              }
              try {
                if (szachownica[row-1][col+1].figura != figury.brak && szachownica[row-1][col+1].kolorPrzeciwnika == "czarny") {
                  let poprzedniaFigura = szachownica[row-1][col+1].figura;
                  let poprzedniKolor = szachownica[row-1][col+1].kolorPrzeciwnika;
                  szachownica[row-1][col+1].figura = figury.pion;
                  szachownica[row-1][col+1].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[row-1][col+1].figura = poprzedniaFigura;
                  szachownica[row-1][col+1].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.pion;
                  if (!czySzachVar) {
                    szachownica[row-1][col+1].czySieRusza = true;
                    szachownica[row-1][col+1].czyBije = true;
                  }
                }
              } catch (error) {
                console.log(error)
              }
            }
            else {
              // Ruszenie sie prosto
              if (szachownica[row][col].kolorPrzeciwnika != "czarny") {
                break;
              }

              if (row == 1) {
                if (szachownica[row+1][col].figura == figury.brak) {
                  szachownica[row+1][col].figura = figury.pion;
                  szachownica[row+1][col].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                    szachownica[row+1][col].czySieRusza = true;
                  }
                  szachownica[row+1][col].figura = figury.brak;
                  szachownica[row][col].figura = figury.pion;

                  if (szachownica[row+2][col].figura == figury.brak) {
                    szachownica[row+2][col].figura = figury.pion;
                    szachownica[row+2][col].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                    szachownica[row][col].figura = figury.brak;
                    if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                      szachownica[row+2][col].czySieRusza = true;
                    }
                    szachownica[row+2][col].figura = figury.brak;
                    szachownica[row][col].figura = figury.pion;
                  }
                }
              }
              else {
                if (szachownica[row+1][col].figura == figury.brak) {
                  szachownica[row+1][col].figura = figury.pion;
                  szachownica[row+1][col].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                    szachownica[row+1][col].czySieRusza = true;
                  }
                  szachownica[row+1][col].figura = figury.brak;
                  szachownica[row][col].figura = figury.pion;
                }
              }
              // Bicie
              try {
                if (szachownica[row+1][col-1].figura != figury.brak && szachownica[row+1][col-1].kolorPrzeciwnika == "bialy") {
                  let poprzedniaFigura = szachownica[row+1][col-1].figura;
                  let poprzedniKolor = szachownica[row+1][col-1].kolorPrzeciwnika;
                  szachownica[row+1][col-1].figura = figury.pion;
                  szachownica[row+1][col-1].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[row+1][col-1].figura = poprzedniaFigura;
                  szachownica[row+1][col-1].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.pion;
                  if (!czySzachVar) {
                    szachownica[row+1][col-1].czySieRusza = true;
                    szachownica[row+1][col-1].czyBije = true;
                  }
                }
              } catch (error) {}
              try {
                if (szachownica[row+1][col+1].figura != figury.brak && szachownica[row+1][col+1].kolorPrzeciwnika == "bialy") {
                  let poprzedniaFigura = szachownica[row+1][col+1].figura;
                  let poprzedniKolor = szachownica[row+1][col+1].kolorPrzeciwnika;
                  szachownica[row+1][col+1].figura = figury.pion;
                  szachownica[row+1][col+1].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[row+1][col+1].figura = poprzedniaFigura;
                  szachownica[row+1][col+1].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.pion;
                  if (!czySzachVar) {
                    szachownica[row+1][col+1].czySieRusza = true;
                    szachownica[row+1][col+1].czyBije = true;
                  }
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
                if (cell.figura == figury.brak) {
                  szachownica[row][col].figura = figury.brak;
                  cell.figura = figury.skoczek;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  
                  if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                    cell.czySieRusza = true;
                  }
                  szachownica[row][col].figura = figury.skoczek;
                  cell.figura = figury.brak;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                } else {
                  if (cell.kolorPrzeciwnika !== szachownica[row][col].kolorPrzeciwnika) {
                    let poprzedniaFigura = cell.figura;
                    let poprzedniKolor = cell.kolorPrzeciwnika;
                    cell.figura = figury.skoczek;
                    cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                    szachownica[row][col].figura = figury.brak;
                    let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                    cell.figura = poprzedniaFigura;
                    cell.kolorPrzeciwnika = poprzedniKolor;
                    szachownica[row][col].figura = figury.skoczek;
                    if (!czySzachVar) {
                      cell.czyBije = true;
                      cell.czySieRusza = true;
                    }
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
                szachownica[temprow][tempcol].figura = figury.goniec;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.goniec;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.goniec;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.goniec;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row-1; tempcol >= 0 && temprow >= 0; tempcol--, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.goniec;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.goniec;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.goniec;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.goniec;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row+1; tempcol >= 0 && temprow <= 7; tempcol--, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.goniec;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.goniec;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.goniec;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.goniec;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let tempcol = col+1, temprow = row-1; tempcol <= 7 && temprow >= 0; tempcol++, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.goniec;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.goniec;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.goniec;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.goniec;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
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

            tempx = row;
            tempy = col;
            startCell = szachownica[tempx][tempy];

            for (let c = tempy + 1; c <= 7; c++) {
              let cell = szachownica[row][c];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.wieza;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.wieza;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.wieza;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.wieza;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let c = tempy - 1; c >= 0; c--) {
              let cell = szachownica[row][c];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.wieza;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.wieza;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.wieza;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.wieza;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let r = tempx + 1; r <= 7; r++) {
              let cell = szachownica[r][col];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.wieza;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.wieza;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.wieza;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.wieza;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let r = tempx - 1; r >= 0; r--) {
              let cell = szachownica[r][col];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.wieza;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.wieza;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.wieza;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.wieza;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }
            ktoSieRusza.x = row;
            ktoSieRusza.y = col;
            break;
          case "Hetman":
            // Jesli gracz proboje sie ruszyc nie na swoim ruchu
            if ((czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "czarny") || (!czySieRuszaBialy && szachownica[row][col].kolorPrzeciwnika == "bialy")) {
              break;
            }

            for (let tempcol = col+1, temprow = row+1; tempcol <= 7 && temprow <= 7; tempcol++, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.hetman;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.hetman;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.hetman;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row-1; tempcol >= 0 && temprow >= 0; tempcol--, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.hetman;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.hetman;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.hetman;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let tempcol = col-1, temprow = row+1; tempcol >= 0 && temprow <= 7; tempcol--, temprow++) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.hetman;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.hetman;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.hetman;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let tempcol = col+1, temprow = row-1; tempcol <= 7 && temprow >= 0; tempcol++, temprow--) {
              if (szachownica[temprow][tempcol].figura == figury.brak) {
                szachownica[temprow][tempcol].figura = figury.hetman;
                szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                szachownica[row][col].figura = figury.brak;
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  szachownica[temprow][tempcol].czySieRusza = true;
                }
                szachownica[temprow][tempcol].figura = figury.brak;
                szachownica[row][col].figura = figury.hetman;
              }
              else {
                if ((szachownica[temprow][tempcol].kolorPrzeciwnika == "czarny" && czySieRuszaBialy) || (szachownica[temprow][tempcol].kolorPrzeciwnika == "bialy" && !czySieRuszaBialy)) {
                  let poprzedniaFigura = szachownica[temprow][tempcol].figura;
                  let poprzedniKolor = szachownica[temprow][tempcol].kolorPrzeciwnika;
                  szachownica[temprow][tempcol].figura = figury.hetman;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  szachownica[temprow][tempcol].figura = poprzedniaFigura;
                  szachownica[temprow][tempcol].kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    szachownica[temprow][tempcol].czyBije = true;
                    szachownica[temprow][tempcol].czySieRusza = true;
                  }
                }
                break;
              }
            }
            

            tempx = row;
            tempy = col;
            startCell = szachownica[tempx][tempy];

            for (let c = tempy + 1; c <= 7; c++) {
              let cell = szachownica[row][c];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.hetman;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.hetman;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.hetman;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let c = tempy - 1; c >= 0; c--) {
              let cell = szachownica[row][c];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.hetman;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.hetman;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.hetman;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let r = tempx + 1; r <= 7; r++) {
              let cell = szachownica[r][col];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.hetman;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.hetman;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.hetman;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            for (let r = tempx - 1; r >= 0; r--) {
              let cell = szachownica[r][col];
              if (cell.figura == figury.brak) {
                szachownica[row][col].figura = figury.brak;
                cell.figura = figury.hetman;
                cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                
                if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                  cell.czySieRusza = true;
                }
                szachownica[row][col].figura = figury.hetman;
                cell.figura = figury.brak;
              } else {
                if (cell.kolorPrzeciwnika !== startCell.kolorPrzeciwnika) {
                  let poprzedniaFigura = cell.figura;
                  let poprzedniKolor = cell.kolorPrzeciwnika;
                  cell.figura = figury.hetman;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  szachownica[row][col].figura = figury.brak;
                  let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                  cell.figura = poprzedniaFigura;
                  cell.kolorPrzeciwnika = poprzedniKolor;
                  szachownica[row][col].figura = figury.hetman;
                  if (!czySzachVar) {
                    cell.czyBije = true;
                    cell.czySieRusza = true;
                  }
                }
                break;
              }
            }

            ktoSieRusza.x = row;
            ktoSieRusza.y = col;
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
                console.log(row + " ");
                console.log(col);
                if(row == 7 && col == 4 && szachownica[row][col].kolorPrzeciwnika == "bialy" && rbroszada == true && szachownica[row][col + 2].figura == figury.brak && szachownica[row][col + 1].figura == figury.brak){
                  szachownica[row][col+2].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                if(row == 7 && col == 4 && szachownica[row][col].kolorPrzeciwnika == "bialy" && rbroszada == true && szachownica[row][col - 3].figura == figury.brak && szachownica[row][col - 2].figura == figury.brak && szachownica[row][col - 1].figura == figury.brak){
                  szachownica[row][col-2].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                if(row == 0 && col == 4 && szachownica[row][col].kolorPrzeciwnika == "czarny" && rbroszada == true && szachownica[row][col + 2].figura == figury.brak && szachownica[row][col + 1].figura == figury.brak){
                  szachownica[row][col+2].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                if(row == 0 && col == 4 && szachownica[row][col].kolorPrzeciwnika == "czarny" && rbroszada == true && szachownica[row][col - 3].figura == figury.brak && szachownica[row][col - 2].figura == figury.brak && szachownica[row][col - 1].figura == figury.brak){
                  szachownica[row][col-2].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
                if (cell.figura == figury.brak) {
                  szachownica[row][col].figura = figury.brak;
                  cell.figura = figury.krol;
                  cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                  
                  if (!czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika)) {
                    cell.czySieRusza = true;
                  }
                  szachownica[row][col].figura = figury.krol;
                  cell.figura = figury.brak;
                } else {
                  if (cell.kolorPrzeciwnika !== szachownica[row][col].kolorPrzeciwnika) {
                    let poprzedniaFigura = cell.figura;
                    let poprzedniKolor = cell.kolorPrzeciwnika;
                    cell.figura = figury.krol;
                    cell.kolorPrzeciwnika = szachownica[row][col].kolorPrzeciwnika;
                    szachownica[row][col].figura = figury.brak;
                    let czySzachVar = czySzach(szachownica, szachownica[row][col].kolorPrzeciwnika);
                    cell.figura = poprzedniaFigura;
                    cell.kolorPrzeciwnika = poprzedniKolor;
                    szachownica[row][col].figura = figury.krol;
                    if (!czySzachVar) {
                      cell.czyBije = true;
                      cell.czySieRusza = true;
                    }
                  }
                }
              } 
            }
          ktoSieRusza.x = row;
          ktoSieRusza.y = col;
          break;
        default:break;
      }
    }
    else {

      if (czySieRuszaBialy) {
        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.krol && szachownica[row][col] == szachownica[ktoSieRusza.x ][ktoSieRusza.y +2] && szachownica[ktoSieRusza.x ][ktoSieRusza.y +2].czySieRusza == true ) {
          szachownica[7][5].figura = figury.wieza;
          szachownica[7][7].figura = figury.brak;
          szachownica[7][5].kolorPrzeciwnika = "bialy";
          szachownica[7][7].kolorPrzeciwnika = "bialy";
        }
        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.krol && szachownica[row][col] == szachownica[ktoSieRusza.x][ktoSieRusza.y - 2] && szachownica[ktoSieRusza.x][ktoSieRusza.y -2].czySieRusza == true ) {
          szachownica[7][3].figura = figury.wieza;
          szachownica[7][0].figura = figury.brak;
          szachownica[7][3].kolorPrzeciwnika = "bialy";
          szachownica[7][0].kolorPrzeciwnika = "bialy";
    
        }
        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.krol || (row == 7 && col == 7)) {
          rbroszada = false;
        }
        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.krol || (row == 7 && col == 0) || (ktoSieRusza.x == 7 && ktoSieRusza.y == 0)) {
          lbroszada = false;
        }

        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.pion && ktoSieRusza.x == 1) {
          szachownica[row][col].czyPromocja = true;
          czyPromocja = true;
          resetBoard();
          updateSzachownica(szachownica);
          return;
        }
        else if (szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][col].czyBije) {
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
        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.krol && szachownica[ktoSieRusza.x][ktoSieRusza.y].kolorPrzeciwnika == "czarny"  && cwykonuje == false) {
          rcroszada = false;
        }
        if (szachownica[ktoSieRusza.x][ktoSieRusza.y].figura == figury.pion && ktoSieRusza.x == 7) {
          szachownica[row][col].czyPromocja = true;
          czyPromocja = true;
          resetBoard();
          updateSzachownica(szachownica);
          return;
        }
        else if (szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][col].czyBije) {
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

      czySieRuszaBialy = !czySieRuszaBialy;
    }

    czySzachVar = czySzach(szachownica, (czySieRuszaBialy ? "bialy" : "czarny"));

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
  
  


  if (PoleSzachownicy.czyPromocja) {
    return <PromocjaPiona czyBialy={czySieRuszaBialy} promocjaClick={promocjaClick} />;
  }
  else {
    return (
      <div className={"poleSzachownicy" + (PoleSzachownicy.kolorPola == "bialy" ? ' bialePole' : ' czarnePole') + (czyPromocja ? ' unFocused' : '') + (czySieRuszaBialy && czyObracac ? "" : " obroc") + (czySzachVar && PoleSzachownicy.figura == figury.krol && ((PoleSzachownicy.kolorPrzeciwnika != "czarny" && czySieRuszaBialy) || (PoleSzachownicy.kolorPrzeciwnika != "bialy" && !czySieRuszaBialy)) ? " szach" : "")} onClick={poleClick}>
        {PoleSzachownicy.figura != figury.brak ? <img className={"zdjecieFigura"} src={"./public/assets/" + pieceImageName}/> : <></>}
        {PoleSzachownicy.czySieRusza ? PoleSzachownicy.czyBije ? <img src={"./public/assets/Attack.png"} className='zdjecieRuch'/> : <img src={"./public/assets/Move.png"} className='zdjecieRuch'/> : <></>}
      </div>
    );
  }

}

function PromocjaPiona({ czyBialy: czyBialy, promocjaClick: promocjaClick } ) {
  let prefix = "C";
  if (czyBialy) {
    prefix = "B";
  }

  let doWyswietlenia = <></>;
  if (czyBialy) {
    doWyswietlenia = (
      <div className='polaPromocji'>
        <div onClick={() => promocjaClick(figury.hetman)}>
          <img src={"./public/assets/" + prefix + "Hetman.svg"}/>
        </div>
        <div onClick={() => promocjaClick(figury.skoczek)}>
          <img src={"./public/assets/" + prefix + "Skoczek.svg"}/>
        </div>
        <div onClick={() => promocjaClick(figury.wieza)}>
          <img src={"./public/assets/" + prefix + "Wierza.svg"}/>
        </div>
        <div onClick={() => promocjaClick(figury.goniec)}>
          <img src={"./public/assets/" + prefix + "Goniec.svg"}/>
        </div>
      </div>
    )
  }
  else {
    doWyswietlenia = (
      <div className='polaPromocji'>
        <div onClick={() => promocjaClick(figury.goniec)}>
          <img src={"./public/assets/" + prefix + "Goniec.svg"}/>
        </div>
        <div onClick={() => promocjaClick(figury.wieza)}>
          <img src={"./public/assets/" + prefix + "Wierza.svg"}/>
        </div>
        <div onClick={() => promocjaClick(figury.skoczek)}>
          <img src={"./public/assets/" + prefix + "Skoczek.svg"}/>
        </div>
        <div onClick={() => promocjaClick(figury.hetman)}>
          <img src={"./public/assets/" + prefix + "Hetman.svg"}/>
        </div>
      </div>
    )
  }

  return doWyswietlenia;
}

export default Gra
