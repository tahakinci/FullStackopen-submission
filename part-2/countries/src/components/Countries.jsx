import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
    return (
        <div>
            {
                countries.map((country, id) => (
                    <React.Fragment key={`${country.name.common} - ${id}`}>
                        <Country country={country} isShown={countries.length == 1} />
                    </React.Fragment>
                ))
            }

        </div>
    )
}

export default Countries
