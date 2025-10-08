import { useState } from 'react';
import './App.css'

const wysokosc = 8;
const szerokosc = 8;

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
        plansza[i][j] = new PoleSzachownicy(j, p, i, "bialy", figury.brak, false, false);
      }
      else {
        plansza[i][j] = new PoleSzachownicy(j, p, i, "czarny", figury.brak, false, false);
      }

    }
    else {
      if (j % 2 == 0) {
        plansza[i][j] = new PoleSzachownicy(j, p, i, "czarny", figury.brak, false, false);
      }
      else {
        plansza[i][j] = new PoleSzachownicy(j, p, i, "bialy", figury.brak, false, false);
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
  new PoleSzachownicy(8, "h", 7, "bialy", "czarny", figury.pion, false, false)
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

  const doDruku = [];

  for (let i = 0; i < szachownica.length; i++) {
    for (let j = 0; j < szachownica[i].length; j++) {
      doDruku.push(<Pole key={i + " " + j} PoleSzachownicy={szachownica[i][j]}></Pole>);
    }
  }

  return (
    <div id='szachownica'>
      {doDruku}
    </div>
  );
}

function Pole( {PoleSzachownicy: PoleSzachownicy }) {
  function poleClick() {
    if (!czySieRusza) {
      piece = PoleSzachownicy.figura;
      row = PoleSzachownicy.x;
      col = PoleSzachownicy.y;
      console.log(piece);
      switch (piece) {
          case "Pion":
          
          break;
          case "Skoczek":
          
          break;
          case "Goniec":
          
          break;
          case "Wieza":
            for(col+1; col <= 8; col++){
              if(szachownica[col][row].figura == figura.brak){
                szachownica[col][row].czySieRusza = true;
              }else{
                break;
              }
            }
            for(col-1; col >= 0; col--){
              if(szachownica[col][row].figura == figura.brak){
                szachownica[col][row].czySieRusza = true;
              }else{
                break;
              }
            }
            for(row+1; row <= 8; row++){
              if(szachownica[col][row].figura == figura.brak){
                szachownica[col][row].czySieRusza = true;
              }else{
                break;
              }
            }
            for(row-1; row >= 0; row--){
              if(szachownica[col][row].figura == figura.brak){
                szachownica[col][row].czySieRusza = true;
              }else{
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
      // Ruszenie sie
    }
  }

  return <div className='poleSzachownicy' onClick={poleClick}>{PoleSzachownicy.kolorPola} {PoleSzachownicy.kolorPrzeciwnika} - {PoleSzachownicy.figura}</div>;
}

export default Gra
