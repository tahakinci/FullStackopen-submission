import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
    return (
        <div>
            {
                countries.length < 10
                    ? countries.map((country, i) => (
                        <React.Fragment key={`${country.name.common}-${i}`}>
                            <Country
                                country={country}
                                isShown={countries.length === 1}
                            />
                        </React.Fragment>
                    ))
                    : <p>Too many matches, specify another filter</p>
            }

        </div>
    )
}

export default Countries
