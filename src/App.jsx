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
  constructor(x, y, kolorPola, kolorPrzeciwnika, figura, czyBije, czySieRusza) {
    this.x=x;
    this.y=y;
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
        plansza[i][j] = new PoleSzachownicy(p, i, "bialy", figury.brak, false, false);
      }
      else {
        plansza[i][j] = new PoleSzachownicy(p, i, "czarny", figury.brak, false, false);
      }

    }
    else {
      if (j % 2 == 0) {
        plansza[i][j] = new PoleSzachownicy(p, i, "czarny", figury.brak, false, false);
      }
      else {
        plansza[i][j] = new PoleSzachownicy(p, i, "bialy", figury.brak, false, false);
      }
    }
  }
}


// Uzupelnianie tablicy planszy figurami
plansza[0] = [
  new PoleSzachownicy("a", "8", "bialy", "czarny", figury.wieza, false, false),
  new PoleSzachownicy("b", "8", "czarny", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy("c", "8", "bialy", "czarny", figury.goniec, false, false),
  new PoleSzachownicy("d", "8", "czarny", "czarny", figury.hetman, false, false),
  new PoleSzachownicy("e", "8", "bialy", "czarny", figury.krol, false, false),
  new PoleSzachownicy("f", "8", "czarny", "czarny", figury.goniec, false, false),
  new PoleSzachownicy("g", "8", "bialy", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy("h", "8", "czarny", "czarny", figury.wieza, false, false)
]

plansza[1] = [
  new PoleSzachownicy("a", "7", "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("b", "7", "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy("c", "7", "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("d", "7", "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy("e", "7", "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("f", "7", "bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy("g", "7", "czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("h", "7", "bialy", "czarny", figury.pion, false, false)
]

plansza[6] = [
  new PoleSzachownicy("a", "2", "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("b", "2", "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy("c", "2", "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("d", "2", "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy("e", "2", "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("f", "2", "czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy("g", "2", "bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("h", "2", "czarny", "bialy", figury.pion, false, false)
]

plansza[7] = [
  new PoleSzachownicy("a", "1", "czarny", "bialy", figury.wieza, false, false),
  new PoleSzachownicy("b", "1", "bialy", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy("c", "1", "czarny", "bialy", figury.goniec, false, false),
  new PoleSzachownicy("d", "1", "bialy", "bialy", figury.hetman, false, false),
  new PoleSzachownicy("e", "1", "czarny", "bialy", figury.krol, false, false),
  new PoleSzachownicy("f", "1", "bialy", "bialy", figury.goniec, false, false),
  new PoleSzachownicy("g", "1", "czarny", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy("h", "1", "bialy", "bialy", figury.wieza, false, false)
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
      console.log(piece);
      switch (piece) {
          case "Pion":
          
          break;
          case "Skoczek":
          
          break;
          case "Goniec":
          
          break;
          case "Wieza":
          
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
