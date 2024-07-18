import { Outlet } from "react-router-dom"
import { StoreProvider } from "./components/StoreContext";
import NavBar from "./components/NavBar"

function App() {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <StoreProvider>
        <Outlet/>
      </StoreProvider>
    </>
  )
}

export default App;
