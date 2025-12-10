const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

if (process.argv.length < 5) {
    console.log("Both name and number are required")
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://tahakinci29:${password}@cluster0.qod3mhs.mongodb.net/?appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: name,
    number: number
})

person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
})


Person.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
})

mongoose.connection.close()