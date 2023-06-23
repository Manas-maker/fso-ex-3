require('dotenv').config()
const mongoose = require('mongoose')

/*if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}*/

const password = process.argv[2]


const url = process.env.MONGODB_URI
  //`mongodb+srv://manas:${password}@cluster0.byt3avt.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length==2){
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
      })
      
    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
      })
}


