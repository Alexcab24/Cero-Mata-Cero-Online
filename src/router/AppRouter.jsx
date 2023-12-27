import { Route, Routes} from "react-router-dom"
import AppPage from "../pages/AppPage"
import RoomPage from '../pages/RoomPage'
import NickNamePage from "../pages/NickNamePage"



const AppRouter = () => {

  return (
    <>
    <Routes>
  
        <Route path="/game" element={<AppPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path='/nickname' element={<NickNamePage/>}/>
        <Route path = '/*' element = {<NickNamePage/>}/>
    </Routes>
   
    </>
  )
}

export default AppRouter
