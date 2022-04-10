<template>
  <div class="home">
    <h1>My Recipes</h1>
    <button @click="togglePopup">Add new Recipe</button>

    <div class="recipes">
      <div class="card" v-for="recipe in $store.state.recipes" :key="recipe.slug">
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe.slug}`">
          <button>View Recipe</button>
        </router-link>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="popupOpen">
      <div class="popup-content">
        <h2>Add new recipe</h2>

        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="newRecipe.title" />
          </div>

          <div class="group">
            <label>Description</label>
            <textarea v-model="newRecipe.description"></textarea>
          </div>

          <div class="group">
            <label>Ingredients</label>
            <div class="ingredient" v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
              <input type="text" v-model="newRecipe.ingredients[index].value" /> <button type="button" @click="deleteIngrdient(index)">Delete</button>
              <span class="error" v-if="submitted && newRecipe.ingredients[index].value">Pleaes Enter Ingredients</span>
            </div>
            <button type="button" @click="addNewIngredient">Add Ingredient</button>
          </div>

          <div class="group">
            <label>Method</label>
            <div class="method" v-for="(method, index) in newRecipe.methods" :key="index">
              <textarea :value="newRecipe.methods[index].value"></textarea>
            </div>
            <button type="button" @click="addNewStep">Add step</button>
          </div>

          <button type="submit">Add Recipe</button>
          <button type="button" @click="togglePopup">Close</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import { useStore } from 'vuex';


export default {
  name: 'Home',
  setup () {
    const newRecipe = ref({
      title: '',
      description: '',
      ingredients: [],
      methods: [],
      submitted: false
    });
    const popupOpen = ref(false);
    const store = useStore();
    const togglePopup = () => {
      popupOpen.value = !popupOpen.value;
    }
    const addNewIngredient = () => {
      newRecipe.value.ingredients.push({});
    }
    
    const addNewStep = () => {
      newRecipe.value.methods.push({});
    }
    
    const addNewRecipe = () => {
      newRecipe.value.submitted = true
      newRecipe.value.slug = newRecipe.value.title.toLowerCase().replace(/\s/g, '-');
      if (!newRecipe.value.slug) {
        alert("Please enter a title");
        return;
      } else if (newRecipe.value.ingredients.length <= 0) {
        alert("Please add ingredient");
        return;
      } else if (newRecipe.value.ingredients.length > 0) {
        const emptyIncredient = newRecipe.value.ingredients.filter(item => !item.value)
        console.log('emptyIncredient', emptyIncredient)
        if (emptyIncredient.length !== 0) {
          alert("Please enter ingredient");
          return;
        }
      }
      store.commit('ADD_RECIPE', { ...newRecipe.value });
      newRecipe.value = {
        title: '',
        description: '',
        ingredients: [],
        methods: []
      };
      newRecipe.value.submitted = false
      togglePopup();
    }

    const deleteIngrdient  = (index) => {
      newRecipe.value.ingredients.splice(index, 1);
    }
    
    return {
      newRecipe,
      addNewRecipe,
      togglePopup,
      popupOpen,
      addNewStep,
      addNewIngredient,
      deleteIngrdient
    }
  }
}
</script>


<style>

.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}
.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}
.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-recipe-popup .popup-content {
  background-color: #3f71aa;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
}
.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.popup-content .group {
  margin-bottom: 1rem;
}
.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}
.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.popup-content .group textarea {
  height: 100px;
  resize: none;
}
.popup-content button[type="submit"] {
  margin-right: 1rem;
}
.ingredient input[type="text"] {
  width: 75%;
  float: left;
} 
.ingredient button  {
  width: 20%;
  margin: 2px 5px;
} 
</style>