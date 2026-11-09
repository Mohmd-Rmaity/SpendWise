import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Footer from "./Footer";

const MainLayout = ({children}) =>{
  return(
    <div className="side-layout">
        <Sidebar/>

        <div className="nav-layout">
          <Navbar/>

          <main className="page-layout">
            {children}
            

          </main>
          <Footer/>
        </div>
    </div>
  )
}

export default MainLayout;