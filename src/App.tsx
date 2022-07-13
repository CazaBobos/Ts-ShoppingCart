import {Routes,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Home from './pages/Home'
import About from './pages/About'
import Store from './pages/Store'
import NavBar from './components/NavBar'

function App() {
    return (<>
        <NavBar/>
        <Container className="mb-4">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/store" element={<Store/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </Container>
    </>)
}

export default App
