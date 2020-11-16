const db = require('./models')
const user = require('./models/user')
const faveRecipe = require('./models/faverecipe')


// db.party.findOrCreate({
//     where: {faveDrinkId: 1}
// })
// .then(([party, created])=>{
//         console.log(`Added to party`)
// })
// .catch(err=>{
//     console.log("ERROR:", err)
// })

db.party.findOne({
    include: [db.faveDrink]
}).then(party=>{
    console.log(party.faveDrink.name)
})