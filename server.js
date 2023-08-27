require('dotenv').config();
const express = require('express');
const app = express();
const fruits = require('./model/fruits');
const mongoose  = require('mongoose');
const Fruit= require('./model/Fruit');
const vegetables =require('./model/vegetables')
const Vegetable = require('./model/Vegetable');


app.use(express.urlencoded({extended: true}));

app.set('view engine' , 'jsx' );
app.engine('jsx', require('express-react-views').createEngine());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    UseUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})



///Index
///Fruit Index

app.get('/fruits', (req, res) => {
    Fruit.find({}).then((allFruits) => {
        res.render('fruits/Index' , {fruits: allFruits});

    })
    
});

///Vegetable Index

app.get('/vegetables' , (req, res) =>{
    //res.send(vegetables);
    Vegetable.find({}).then((allVegetables) =>{
        console.log(allVegetables);
        res.render('vegetable/Index' , {vegetables:allVegetables});

    })
    .catch(error =>{
        console.log(error);
    })
});


///New
/// Fruit New 
app.get('/fruits/new', (req, res)=>{
    res.render('fruits/New')
})

///Vegetable New

// app.get('vegetables/new', (req, res)=>{
//     res.render('vegetable/New')
// })
app.get('/vegetables/new' , (req, res) => {
    res.render('vegetable/New')
})

///Delete 



/// Updates


/// Create
/// Fruit Create

app.post('/fruits', (req, res) =>{
    if(req.body.readyToEat ==='on'){
        req.body.readyToEat =true;
    }else{
        req.body.readyToEat =false;
    }

    Fruit.create(req.body)
    .then((createdFruit) => {
      res.redirect('/fruits')
    })
    .catch(error => {
      console.error(error)
    });
    
})

///Vegetable Create

app.post('/vegetables', (req,res) => {
    //res.send('received');

    if(req.body.readyToEat ==='on'){
        req.body.readyToEat = true;
    }
    else{
        req.body.readyToEat =false;
    }
    // vegetables.push(req.body);
    // res.redirect('/vegetables');


    // Vegetable.create(req.body).then((error,createVegetable)=>{
    //     if(error){
    //         console.log(error)
    //     }else{
    //         res.send(createVegetable);
    //     }
    // })
      
    Vegetable.create(req.body).then((createVegetable) =>
    {
        //res.send(createVegetable)
        res.redirect('/vegetables')
    }).catch(error => console.error(error))
});




///Edit


///Show

///Fruit Show

app.get('/fruits/:id' , (req, res) => {
    Fruit.findOne({ _id: req.params.id })
    .then ((foundFruit) => {
        //res.send(foundFruit)
        res.render('fruits/Show', { fruit: foundFruit })
    })
    .catch(error => {
        console.log(error)
    })
});

///Vegetable Show


app.get('/vegetables/:id' , (req,res) => {
    //res.send(vegetables[req.params.index]);
    Vegetable.findOne({_id: req.params.id}).then((foundVegetable) =>{
       // res.send(foundVegetable)
       res.render('vegetable/Show' , {
        vegetable: foundVegetable
       })
    }).catch(error =>{
        console.error(error)
    })
})




app.listen(3000, () => {
    console.log("Listening on port 3000");
})