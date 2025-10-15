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
console.log(plansza.length)
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
  new PoleSzachownicy(1, "a", 8, "bialy", "czarny", figury.wieza, false, false),
  new PoleSzachownicy(2, "b", 8, "czarny", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy(3, "c", 8, "bialy", "czarny", figury.goniec, false, false),
  new PoleSzachownicy(4, "d", 8, "czarny", "czarny", figury.hetman, false, false),
  new PoleSzachownicy(5, "e", 8, "bialy", "czarny", figury.krol, false, false),
  new PoleSzachownicy(6, "f", 8, "czarny", "czarny", figury.goniec, false, false),
  new PoleSzachownicy(7, "g", 8, "bialy", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy(8, "h", 8, "czarny", "czarny", figury.wieza, false, false)
]

plansza[1] = [
  new PoleSzachownicy(1, "a", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(2, "b", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(3, "c", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(4, "d", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(5, "e", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(6, "f", 7, "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy(7, "g", 7, "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy(8, "h", 7, "bialy", "brak", figury.brak, false, false)

]

plansza[6] = [
  new PoleSzachownicy(1, "a", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(2, "b", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(3, "c", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(4, "d", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(5, "e", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(6, "f", 2, "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy(7, "g", 2, "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy(8, "h", 2, "czarny", "bialy", figury.pion, false, false)
]

plansza[7] = [
  new PoleSzachownicy(1, "a", 1, "czarny", "bialy", figury.wieza, false, false),
  new PoleSzachownicy(2, "b", 1, "bialy", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy(3, "c", 1, "czarny", "bialy", figury.goniec, false, false),
  new PoleSzachownicy(4, "d", 1, "bialy", "bialy", figury.hetman, false, false),
  new PoleSzachownicy(5, "e", 1, "czarny", "bialy", figury.krol, false, false),
  new PoleSzachownicy(6, "f", 1, "bialy", "bialy", figury.goniec, false, false),
  new PoleSzachownicy(7, "g", 1, "czarny", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy(8, "h", 1, "bialy", "bialy", figury.wieza, false, false)
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
      console.log(piece);
      console.log("rzad " + row); 
      console.log("kolumna " + col);
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
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                  if (szachownica[row-2][col].figura = figury.brak) {
                    szachownica[row-2][col].czySieRusza = true;
                  }
                }
              }
              else {
                if (szachownica[row-1][col].figura == figury.brak) {
                  szachownica[row-1][col].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
              }
              // Bicie
              try {
                if (szachownica[row-1][col-1].figura != figury.brak && szachownica[row-1][col-1].kolorPrzeciwnika == "czarny") {
                  szachownica[row-1][col-1].czyBije = true;
                  szachownica[row-1][col-1].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
              } catch (error) {}
              try {
                if (szachownica[row-1][col+1].figura != figury.brak && szachownica[row-1][col+1].kolorPrzeciwnika == "czarny") {
                  szachownica[row-1][col+1].czyBije = true;
                  szachownica[row-1][col+1].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
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
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                  if (szachownica[row+2][col].figura = figury.brak) {
                    szachownica[row+2][col].czySieRusza = true;
                  }
                }
              }
              else {
                if (szachownica[row+1][col].figura == figury.brak) {
                  szachownica[row+1][col].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
              }
              // Bicie
              try {
                if (szachownica[row+1][col-1].figura != figury.brak && szachownica[row+1][col-1].kolorPrzeciwnika == "bialy") {
                  szachownica[row+1][col-1].czyBije = true;
                  szachownica[row+1][col-1].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
              } catch (error) {}
              try {
                if (szachownica[row+1][col+1].figura != figury.brak && szachownica[row+1][col+1].kolorPrzeciwnika == "bialy") {
                  szachownica[row+1][col+1].czyBije = true;
                  szachownica[row+1][col+1].czySieRusza = true;
                  ktoSieRusza.x = row;
                  ktoSieRusza.y = col;
                }
              } catch (error) {}
            }
          break;
          case "Skoczek":
          
          break;
          case "Goniec":
          
          break;
          case "Wieza":
     
            let tempy1 = col+1;
            let tempy2= col-1;
            let tempx1 = row+1;
            let tempx2 = row-1;
            for(tempy1; tempy1 < 7; tempy1++){
              console.log(row);
              console.log(tempy1);
              if(tempy1 != 8){
                if(szachownica[row][tempy1].figura == figury.brak){
                  szachownica[row][tempy1].czySieRusza = true;
                  console.log("true");
                }else if(szachownica[row][tempy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][tempy1].kolorPrzeciwnika == "czarny"){
                  szachownica[row][tempy1].czyBije=true;
                  szachownica[row][tempy1].czySieRusza = true;
                  console.log("true");
                  break;
                }else if(szachownica[row][tempy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][tempy1].kolorPrzeciwnika == "bialy"){
                  szachownica[row][tempy1].czyBije=true;
                  szachownica[row][tempy1].czySieRusza = true;
                  console.log("true");
                  break;
                }
                else if(szachownica[row][tempy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][tempy1].kolorPrzeciwnika == "bialy"){
                  console.log("false");
                  break;
                }
                else if(szachownica[row][tempy1].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][tempy1].kolorPrzeciwnika == "czarny"){
                  console.log("false");
                  break;
                }
              }else{
                  console.log("false");
                  break;
              }
            }
            for(tempy2; tempy2 > 0; tempy2--){
              console.log(row);
              console.log(tempy2);
              if(tempy2 != -1){
                if(szachownica[row][tempy2].figura == figury.brak){
                  szachownica[row][tempy2].czySieRusza = true;
                  console.log("true");
                }else if(szachownica[row][tempy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][tempy2].kolorPrzeciwnika == "czarny"){
                  szachownica[row][tempy2].czyBije=true;
                  szachownica[row][tempy2].czySieRusza = true;
                  console.log("true");
                  break;
                }else if(szachownica[row][tempy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][tempy2].kolorPrzeciwnika == "bialy"){
                  szachownica[row][tempy2].czyBije=true;
                  szachownica[row][tempy2].czySieRusza = true;
                  console.log("true");
                  break;
                }
                else if(szachownica[row][tempy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[row][tempy2].kolorPrzeciwnika == "bialy"){
                  console.log("false");
                  break;
                }
                else if(szachownica[row][tempy2].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[row][tempy2].kolorPrzeciwnika == "czarny"){
                  console.log("false");
                  break;
                }
              }else{
                  console.log("false");
                  break;
              }
            }
            for(tempx1; tempx1 < 7; tempx1++){
              console.log(tempx1);
              console.log(col);
              if(tempx1 != 8){
                if(szachownica[tempx1][col].figura == figury.brak){
                  szachownica[tempx1][col].czySieRusza = true;
                  console.log("true");
                }else if(szachownica[row][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[tempx1][col].kolorPrzeciwnika == "czarny"){
                  szachownica[tempx1][col].czyBije=true;
                  szachownica[tempx1][col].czySieRusza = true;
                  console.log("true");
                  break;
                }else if(szachownica[tempx1][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[tempx1][col].kolorPrzeciwnika == "bialy"){
                  szachownica[tempx1][col].czyBije=true;
                  szachownica[tempx1][col].czySieRusza = true;
                  console.log("true");
                  break;
                }
                else if(szachownica[tempx1][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[tempx1][col].kolorPrzeciwnika == "bialy"){
                  console.log("false");
                  break;
                }
                else if(szachownica[tempx1][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[tempx1][col].kolorPrzeciwnika == "czarny"){
                  console.log("false");
                  break;
                }
              }else{
                  console.log("false");
                  break;
              }
            }

            for(tempx2; tempx2 > 0; tempx2--){
              console.log(tempx2);
              console.log(col);
              if(tempx2 != -1){
                if(szachownica[tempx2][col].figura == figury.brak){
                  szachownica[tempx2][col].czySieRusza = true;
                  console.log("true");
                }else if(szachownica[tempx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[tempx2][col].kolorPrzeciwnika == "czarny"){
                  szachownica[tempx2][col].czyBije=true;
                  szachownica[tempx2][col].czySieRusza = true;
                  console.log("true");
                  break;
                }else if(szachownica[tempx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[tempx2][col].kolorPrzeciwnika == "bialy"){
                  szachownica[tempx2][col].czyBije=true;
                  szachownica[tempx2][col].czySieRusza = true;
                  console.log("true");
                  break;
                }
                else if(szachownica[tempx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "bialy" && szachownica[tempx2][col].kolorPrzeciwnika == "bialy"){
                  console.log("false");
                  break;
                }
                else if(szachownica[tempx2][col].figura != figury.brak && szachownica[row][col].kolorPrzeciwnika == "czarny" && szachownica[tempx2][col].kolorPrzeciwnika == "czarny"){
                  console.log("false");
                  break;
                }
              }else{
                  console.log("false");
                  break;
              }
            }
            
          break;
          case "Hetman":
          
          break;
          case "Krol":
          
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

  return <div className='poleSzachownicy' onClick={poleClick}>{PoleSzachownicy.kolorPola} {PoleSzachownicy.kolorPrzeciwnika} - {PoleSzachownicy.figura} {PoleSzachownicy.czySieRusza ? "True" : "False"}</div>;
}

export default Gra
