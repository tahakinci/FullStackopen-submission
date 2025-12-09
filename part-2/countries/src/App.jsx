import { useEffect, useState } from 'react'
import countriesService from "./services/countries"
import Country from './components/Country'
import Countries from './components/Countries'


const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  useEffect(() => {
    countriesService.getAll().then(res => setCountries(res))
  }, [])


  return (
    <div>
      <div>
        Find countries <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
