const express = require('express')
const app = express()
const PORT = process.env.PORT || 9292;

const chocolateRouter = require('./routes/chocolate')
const promotionsRouter = require('./routes/promotions')
const leadersRouter = require('./routes/leaders')

app.get('/', (req, res) => {
    res.send("We are at Home Page")
})
app.use('/chocolate', chocolateRouter)
app.use('/promotions', promotionsRouter)
app.use('/leaders', leadersRouter)

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`)
})

