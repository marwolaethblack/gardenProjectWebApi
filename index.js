const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3110);


app.get('/', (req,res) => {
	res.send("hello");
})

app.listen(app.get('port'), () => {
    console.log(`Server is listening on localhost:${app.get('port')}`);
});