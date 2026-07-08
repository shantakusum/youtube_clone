import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AddUser } from './pages/AddUser'
import { Navbar } from "./component/Navbar"
import { Home } from "./pages/Home"
import {VideoPlayer} from "./pages/VideoPlayer"

import { VideoList } from './pages/VideoList'

function App(){
    return(
        <> 
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<AddUser />} />
                <Route path="/user/:id" element={<AddUser />} />
                <Route path="/video" element={<VideoList />} />
               <Route path="/video/:id" element={<VideoPlayer />} />
            </Routes>
        </Router>
        </>
    )
}

export default App