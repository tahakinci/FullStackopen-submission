import { useEffect, useState } from "react"


const Country = ({ country, isShown }) => {
    const [show, setShow] = useState(isShown)


    if (!show) {
        return (
            <div>
                {country.name.common} {" "}
                <button onClick={() => setShow(true)}>show</button>
            </div>
        )
    }

    return (
        < div >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <h2>{country.name.common}</h2>
                <button style={{ display: isShown ? "none" : "block" }} onClick={() => setShow(false)}>hide</button>
            </div>


            <div>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
            </div>

            <h3>Languages</h3>
            <ul>
                {
                    Object.values(country.languages).map(language => (
                        <li key={language}>{language}</li>
                    ))
                }
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} />
        </div >
    )
}

export default Country
