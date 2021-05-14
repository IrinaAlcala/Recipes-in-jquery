const recipeId = location.hash.substr(1);
let recipe = recipes.find(function (recipe) {
    return recipe.id === recipeId;
})

if (recipe === undefined) {
    location.assign('/index.html');
}

$('#recipe-name').val(recipe.name);
$('#recipe-steps').val(recipe.description);
renderIngredients(recipe);

$('#recipe-name').on('input', function (e) {
    recipe.name = e.target.value;
    saveRecipes(recipes);
})

$('#recipe-steps').on('input', function (e) {
    recipe.description = e.target.value;
    saveRecipes(recipes);
})

$('#delete-recipe').click(function () {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
    if(recipeIndex != -1){
        recipes.splice(recipeIndex, 1);
    }
    saveRecipes(recipes);
    location.assign('/index.html');
})

$('#btn-ingredient').click(function () {
    let ingredient = '';
    let id = uuidv4();
    if ($('#add-ingredient').val().length > 0) {
        ingredient = $('#add-ingredient').val();    
    }else{
        ingredient = '';
    }
    
    recipe.ingredients.push({
        id: id,
        name: ingredient,
        flag: false
    });

    saveRecipes(recipes);
    renderIngredients(recipe);
    $('#add-ingredient').val('');
})

function renderIngredients(recipe) {
    $('.ingredients').empty();
    $.each(recipe.ingredients, function (index, element) {
        $('.ingredients').append(generateIngredientDOM(element));
    })
}

function toggleIngredient(element) {
    element.flag = !element.flag;
}

function generateIngredientDOM(element) {
    const rootEl = $('<div>');
    const checkboxEl = $('<input type="checkbox" />');
    const textEl = $('<span>');
    const buttonEl = $('<a>');
    const labelEl = $('<label>');
    const spanEl = $('<span>');
    
    spanEl.addClass('spanStyle');
    buttonEl.attr('href', '#');
    rootEl.addClass('form-check');
    rootEl.addClass('ingredient-card');
    rootEl.addClass('col-sm-4');
    checkboxEl.addClass('form-check-input');
    
    buttonEl.text('Remove');
    checkboxEl.attr('checked', element.flag);

    buttonEl.click(function () {
        removeIngredient(element.id);
        saveRecipes(recipes);
        renderIngredients(recipe);
    })

    checkboxEl.change(function () {
        toggleIngredient(element);
        saveRecipes(recipes);
        renderIngredients(recipe);
    })

    if(element.name.length > 0){
        textEl.text(element.name);
    }else{
        textEl.text('Unnamed ingredient');
    }
    
    labelEl.append(checkboxEl);
    labelEl.append(textEl);
    rootEl.append(labelEl);
    spanEl.append(buttonEl);
    rootEl.append(spanEl);

    return rootEl;
}

function removeIngredient(id) {
    const ingredientIndex = recipe.ingredients.findIndex(ingredient => ingredient.id === id);
    if(ingredientIndex != -1){
        recipe.ingredients.splice(ingredientIndex, 1);
    }
}
