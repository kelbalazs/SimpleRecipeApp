import { createStore } from 'vuex'


export default createStore({
  state: {
    recipes: [
      {
        slug: 'gulash',
        title: 'gulash',
        description: 'stew consists of slow braising chunks of meat with root vegetables in a seasoned broth, goulash uses spices such as caraway, cumin, paprika, and peppers ',
        ingredients: [
            '4 tbsp olive oil',
            '700g stewing steak, cut into chunks',
            '30g plain flour',
            '1 large onion, thinly sliced',
            '2 garlic cloves, finely chopped',
            '1 green pepper, deseeded and thinly sliced',
            '1 red pepper, deseeded and thinly sliced',
            '2 tbsp tomato purée',
            '2 tbsp paprika',
            '2 large tomatoes, diced',
            '75ml dry white wine',
            '300ml beef stock, homemade or shop-bought',
            '2 tbsp flat-leaf parsley leaves',
            '150ml soured cream'
        ],
        method: [

    'Heat oven to 160C/140C fan/gas 3',

 
    'Heat 1 tbsp olive oil in a flameproof casserole dish or heavy-based saucepan. Sprinkle 700g stewing steak chunks with 30g plain flour and brown well in three batches, adding an extra 1 tbsp oil for each batch. Set the browned meat aside',

  
    'Add in the remaining 1 tbsp oil to the casserole dish, followed by 1 large thinly sliced onion, 2 finely chopped garlic cloves, 1 green pepper and 1 red pepper, both finely sliced. Fry until softened, around 5-10 mins',

  
    'Return the beef to the pan with 2 tbsp tomato purée and 2 tbsp paprika. Cook, stirring, for 2 mins',

  
    'Add in 2 large diced tomatoes, 75ml dry white wine and 300ml beef stock. Cover and bake in the oven for 1 hr 30 mins - 2 hrs. Alternatively, cover and cook it on the hob on a gentle heat for about an hour, removing the lid after 45 mins',

    'Sprinkle over 2 tbsp flat-leaf parsley leaves and season well with salt and freshly ground pepper. Stir in 150ml soured cream and serve'
          
          
        
        ]
      }
    ]
  },
        
  mutations: {
    ADD_RECIPE (state, recipe) {
      state.recipes.push(recipe)
    }
  }
})