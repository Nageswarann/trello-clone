import './App.scss';
import Trello from './components/Trello/Trello';

function App() {
  return (
    <div className="App">
      <div className='nav-bar'>
        <div className='title'>
          <strong> Trello Clone  </strong>
        </div>
      </div>
      <Trello />
    </div>
  );
}

export default App;
