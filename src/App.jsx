import NavbarComp from "./Navbar/NavbarComp"
import SideNavbar from "./Navbar/SideNavBar"
import MainPage from "./MainPanel/MainPage"
import { useContext } from "react"
import { ThemeContext } from "./Context/ThemeContext"

function App() {
const {theme}=useContext(ThemeContext)
const styl='d-flex';
const combinedClass=`${styl} ${theme}`
  return (
    <>
      <NavbarComp/>
      <div className={combinedClass} >
        <div style={{marginTop:'20px'}}>
        <SideNavbar/>
        </div>
        <div className={theme} style={{margin:'20px'}}>
        <MainPage />
        </div>
      </div>
        {/* <Row className="p-0 m-0" style={{marginTop:'20px'}}>
            <Col className="p-0 " sm={1} style={{marginTop:'20px'}}>
               <SideNavbar/>
            </Col>
            <Col className="pe-4" style={{marginTop:'20px'}}>
                <MainPage/>
            </Col>
           
      </Row> */}
    </>
  )
}

export default App
