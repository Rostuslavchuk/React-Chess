import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';
import BoardComponent from './components/BoardComponent';
import DeletedFigures from './components/DeletedFigures';
import { Player } from './modules/Player';
import { Color } from './modules/Color';
import { AppContext } from './components/contextCreate/context';
import { Cell } from './modules/Cell';


function App() {
  const [instance, setInstance] = useState<Board>(new Board())


  const [whiteColor, setWhiteColor] = useState<Player>(new Player(Color.WHITE))
  const [blackColor, setBlackColor] = useState<Player>(new Player(Color.BLACK))
  const [currentColor, setCurrentColor] = useState<Player | null>(null)  

  function restart(){
    const board = new Board();
    board.initCells();
    board.initFigures();
    setInstance(board);
  }

  useEffect(() => {
    restart()
    setCurrentColor(whiteColor)
  }, [])

  function changeColor(){
      setCurrentColor(currentColor === whiteColor ? blackColor : whiteColor)
  }
  return (
      <div className="app">
        <div>
            {currentColor?.color === Color.WHITE ? <h1 style={{color: 'white'}}>Хід білих</h1> : <h1 style={{color: 'black'}} >Хід чорних</h1>}
            <BoardComponent change={changeColor} currentColor={currentColor} board={instance} setBoard={setInstance} />
        </div>
        <div className='container__figures'>
            <DeletedFigures deletedFigures={instance.deletedBlackFigures} title={'Чорні фігури'} color={blackColor} />
            <DeletedFigures deletedFigures={instance.deletedWhiteFigures} title={'Білі фігури'} color={whiteColor}/>
        </div>
    </div>
  );
}

export default App;
