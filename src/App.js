import './App.css';
import Memorial from "./component/memorial";
import Shittim from "./component/shittim";
import Size from "./component/size";

function App() {
    const images = require.context('../public/assets/background/PV4', true);
    const imageList = images.keys().map(image => images(image));

    return (
        <div className="App">
            <Size/>
            <div className="background" style={{
                backgroundImage: `url(${imageList[Math.floor(Math.random() * imageList.length)]})`,
            }}/>
            <img className="logo" src="/bluearchive.svg" alt="/bluearchive.svg"/>
            <header className="App-header">
                <Shittim>
                    <Memorial/>
                </Shittim>
            </header>
        </div>
    );
}

export default App;