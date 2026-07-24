import {BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { AddUser } from './pages/AddUser'
import { Navbar } from "./component/Navbar"
import { Home } from "./pages/Home"
import {VideoPlayer} from "./pages/VideoPlayer"
import UploadVideo from "./pages/UploadVideo"
import { VideoList } from './pages/VideoList'
import { ToastContainer } from "react-toastify";
import {Login} from "./component/Login"
import { Register } from './component/Register'
import { ForgetPassword } from './component/ForgetPassword'
import { ProtectedRoute } from './component/ProtectedRoute'
import "react-toastify/dist/ReactToastify.css";

// Common Layout
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App(){
    return(
        <> 
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    {/* Ye saare pages MainLayout ke andar honge */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path="/home" element={ <Home />  } />
                            <Route path="/user" element={<AddUser />} />
                            <Route path="/user/:id" element={<AddUser />} />
                            <Route path="/video" element={<VideoList />} />
                            <Route path="/video/:id" element={<VideoPlayer />} />
                            <Route path="/video_upload" element={<UploadVideo />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}
export default App    