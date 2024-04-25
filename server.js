
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 8080;

// Allow requests from all origins
app.use(cors());

const data = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

app.get('/api/data', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filteredRecipes = data.recipes.filter(recipe => recipe.category === category);
        res.json(filteredRecipes);
    } else {
        res.json(data.recipes);
    }
});

app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = data.recipes.find(recipe => recipe.id === id);

  if (recipe) {
      res.json(recipe);
  } else {
      res.status(404).json({ error: 'Recipe not found' });
  }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



