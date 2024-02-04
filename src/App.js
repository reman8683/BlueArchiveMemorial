import './App.css';
import BG from './BG.jpg';
import Memorial from "./component/memorial";
import Shittim from "./component/shittim";
import Size from "./component/size";

function App() {

    return (
        <div className="App">
            <Size/>
            <div className="background" style={{
                backgroundImage: `url(${BG})`,
            }}/>
            <img className="logo" src="./bluearchive.svg" alt="/bluearchive.svg"/>
            <header className="App-header">
                <Shittim>
                    <Memorial/>
                </Shittim>
            </header>
        </div>
    );
}

export default App;