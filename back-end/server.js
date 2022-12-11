const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/pomodoro', {
    useNewUrlParser: true
});

const summarySchema = new mongoose.Schema({
    user: String,
    title: String,
    description: String,
    bookmarked: Boolean,
    dateAdded: String,
    categories: Array,
    editing: Boolean
});

const categoriesSchema = new mongoose.Schema({
    user: String,
    allCategories: Array,
})

const Summary = mongoose.model('Summary', summarySchema);

const Categories = mongoose.model('Categories', categoriesSchema);

app.post('/api/summaries/', async (req, res) => {
    const summary = new Summary({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        dateAdded: req.body.dateAdded,
        bookmarked: req.body.bookmarked,
        editing: req.body.editing
    });
    try {
        await summary.save();
        res.send(summary);
    }catch(error){
        res.sendStatus(500);
    }
});

app.post('/api/categories/', async (req, res) => {
    try{
        let userArray = await Categories.findOne({ user: req.body.user });
        if(!userArray){
            let newCategories = new Categories( {
                user: req.body.user,
                allCategories: [],
            });
            newCategories.allCategories.push(req.body.newCategory);
            console.log(newCategories);
            newCategories.save();
            res.send(newCategories);
        } else {
            let newArray = await Categories.findOne({ user: req.body.user });
            newArray.allCategories.push(req.body.newCategory);
            newArray.save();
            res.send(newArray);
        }
    } catch(error) {
        res.sendStatus(500);
    }
})

app.put('/api/categories/', async (req, res) => {

});

app.get('/api/categories/', async (req, res) => {
    try{
        debugger;
        let output = await Categories.find({ user: req.query.user });
        res.send(output);
    }catch(error){
        res.sendStatus(500);
    }
});

app.get('/api/summaries', async (req, res) => {
    try {
        let summaries = await Summary.find({ user: req.query.user });
        res.send(summaries);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.put('/api/summaries/:id/bookmark', async (req, res) => {
    try{
        let summary = await Summary.findOne({ _id: req.params.id, user: req.body.user });
        summary.bookmarked = req.body.bookmarked;
        summary.save();
        res.send(summary);
    }catch(error) {
        res.sendStatus(500);
    }
});

app.put('/api/summaries/:id/edit', async (req, res) => {
    try{
        let summary = await Summary.findOne({ _id: req.params.id, user: req.body.user });
        summary.editing = req.body.editing;
        summary.save();
        res.send(summary);
    }catch(error) {
        res.sendStatus(500);
    }
});

app.put('/api/summaries/:id', async (req, res) => {
    try{
        let summary = await Summary.findOne({ _id: req.params.id, user: req.body.user });
        summary.title = req.body.title;
        summary.description = req.body.description;
        summary.editing = req.body.editing;
        summary.save();
        res.send(summary);
    }catch(error) {
        res.sendStatus(500);
    }
});

app.delete('/api/summaries/:id', async (req, res) => {
    try {
        var response = await Summary.findByIdAndRemove(req.params.id);
        console.log(response)
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));
