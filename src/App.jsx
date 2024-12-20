import { useState } from "react"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from './appwrite/auth'
import {login,logout} from'./store/authSlice'
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";



function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()

useEffect(()=>{
  authService.getCurrentUser()
  .then((userdata)=>{
    if(userdata){
      dispatch(login({userdata}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=> setloading(false))
},[]) 

return !loading ? (
  <div className=" min-h-screen text-white bg-gray-800 flex flex-wrap content-between">
    <div className="block w-full">
      <Header/>
      <main>
        <Outlet/>todo
      </main>
      <Footer/>
    </div>
  </div>
):(null)
}

export default App
