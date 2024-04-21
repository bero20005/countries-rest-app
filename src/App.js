import "./app.css"
import { Routes, Route} from "react-router-dom"
import Countries from "./components/Countries"
import CountryInfo from "./components/CountryInfo"

const App = () => (
  <>
    <div className="header">
      <div className="container">
        <h5>Where in the world?</h5>
      </div>
    </div>
    <div className="container">
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:countryName" element={<CountryInfo />} /> 
      </Routes>
    </div>
  </>
)

export default App
