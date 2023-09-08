import BodyComponent from "./body/BodyComponent"
import FooterComponent from "./footer/FooterComponent"
import HeaderComponent from "./header/HeaderComponent"

const MainComponent = () => {
  return (
    <div style={{background: '#202124'}}>
      <HeaderComponent />
       <BodyComponent />
      <FooterComponent />
      
    </div>
  )
}

export default MainComponent