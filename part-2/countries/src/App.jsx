import { useEffect, useState } from 'react'
import countriesService from "./services/countries"
import Country from './components/Country'
import Countries from './components/Countries'


const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then(res => setCountries(res))
  }, [])

  useEffect(() => {
    var filteredCountries = countries.filter(country => country.name.common.includes(search))
    setFilteredCountries(filteredCountries)
  }, [search])

  // const renderCountryInfo = () => {
  //   console.log(filteredCountries.length < 1 || !filteredCountries)
  //   if (filteredCountries.length < 1 || !filteredCountries) {
  //     return (
  //       <p>No country to render</p>
  //     )
  //   }
  //   filteredCountries.length >= 10
  //     ? <p>Too many matches, specify another filter</p>
  //     : <Country countries={filteredCountries} />
  // }

  return (
    <div>
      <div>
        Find countries <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {/* {
        renderCountryInfo()
      } */}

      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
