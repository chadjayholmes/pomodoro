const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:58561/pomodoro', {
    useNewUrlParser: true
});

const summarySchema = new mongoose.Schema({
    title: String,
    description: String,
    bookmarked: Boolean,
    dateAdded: String,
    categories: Array
});

const categoriesSchema = new mongoose.Schema({
    allCategories: Array,
})

const Summary = mongoose.model('Summary', summarySchema);

const Categories = mongoose.model('Categories', categoriesSchema);

app.post('/api/summaries/', async (req, res) => {
    const summary = new Summary({
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        dateAdded: req.body.dateAdded,
        bookmarked: req.body.bookmarked
    });
    try {
        await summary.save();
        console.log(summary);
        res.send(summary);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/categories/', async (req, res) => {
    try{
        let newCategories = new Categories( {
            allCategories: [],
        });
        await newCategories.save();
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.put('/api/categories/', async (req, res) => {
    try{
        let newArray = await Categories.findOne();
        newArray.allCategories.push(req.body.newCategory);
        newArray.save();
        res.send(newArray);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/categories/', async (req, res) => {
    try{
        debugger;
        let output = await Categories.find();
        console.log(output);
        res.send(output);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/summaries', async (req, res) => {
    try {
        let summaries = await Summary.find();
        console.log(summaries);
        res.send(summaries);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/summaries/:id', async (req, res) => {
    try{
        let summary = await Summary.findOne({ _id: req.params.id });
        summary.bookmarked = req.body.bookmarked;
        summary.save();
        res.send(summary);
    }catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/summaries/:id', async (req, res) => {
    try {
        await Summary.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));