const db = require('./models')
const user = require('./models/user')
const faveRecipe = require('./models/faverecipe')


db.faveRecipe.findOrCreate({
    where: {name: 'Yogurt Mousse With Raspberry Sauce',
    image: 'https://spoonacular.com/recipeImages/665553-556x370.jpg',
    apiId: 665553}
})
.then(([faveRecipe, created])=>{
    db.user.findByPk(1)
    .then(foundUser=>{
        foundUser.addFaveRecipe(faveRecipe)
        console.log(`${foundUser.name} has added ${faveRecipe.name} to their favorites`)
    })
})
.catch(err=>{
    console.log("ERROR:", err)
})