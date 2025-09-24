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
  constructor(kolorPola, kolorPrzeciwnika, figura, czyBije, czySieRusza) {
    this.kolorPola = kolorPola;
    this.kolorPrzeciwnika = kolorPrzeciwnika;
    this.figura = figura;
    this.czyBije = czyBije;
    this.czySieRusza = czySieRusza;
  }
}

const plansza = new Array(wysokosc).fill(0).map(() => new Array(szerokosc).fill(0));

// Petla wypelnia tablice plansza polami w odpowiednich kolorach, pomijamy 2 pierwsze i ostatnie rzedy poniewaz przydzielimy im pola pozniej
for (let i = 2; i < plansza.length - 2; i++) {
  for (let j = 0; j < plansza[i].length; j++) {
    if (i % 2 == 0) {
      if (j % 2 == 0) {
        plansza[i][j] = new PoleSzachownicy("bialy", figury.brak, false, false);
      }
      else {
        plansza[i][j] = new PoleSzachownicy("czarny", figury.brak, false, false);
      }

    }
    else {
      if (j % 2 == 0) {
        plansza[i][j] = new PoleSzachownicy("czarny", figury.brak, false, false);
      }
      else {
        plansza[i][j] = new PoleSzachownicy("bialy", figury.brak, false, false);
      }
    }
  }
}

// Uzupelnianie tablicy planszy figurami
plansza[0] = [
  new PoleSzachownicy("bialy", "czarny", figury.wieza, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.goniec, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.hetman, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.krol, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.goniec, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.skoczek, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.wieza, false, false)
]

plansza[1] = [
  new PoleSzachownicy("czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.pion, false, false),
  new PoleSzachownicy("czarny", "czarny", figury.pion, false, false),
  new PoleSzachownicy("bialy", "czarny", figury.pion, false, false)
]

plansza[6] = [
  new PoleSzachownicy("bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.pion, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.pion, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.pion, false, false)
]

plansza[7] = [
  new PoleSzachownicy("czarny", "bialy", figury.wieza, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.goniec, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.hetman, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.krol, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.goniec, false, false),
  new PoleSzachownicy("czarny", "bialy", figury.skoczek, false, false),
  new PoleSzachownicy("bialy", "bialy", figury.wieza, false, false)
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
      // Sprawdzanie gdzie sie mozna ruszac
    }
    else {
      // Ruszenie sie
    }
  }

  return <div className='poleSzachownicy' onClick={poleClick}>{PoleSzachownicy.kolorPola} {PoleSzachownicy.kolorPrzeciwnika} - {PoleSzachownicy.figura}</div>;
}

export default Gra
