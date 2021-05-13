var recipes = [
{
   name: "Chicken Biryani",
   description: "some text"
},
{
    name: "Vegetable pilaf",
    description: "some text"
},
{
    name: "Veg burger",
    description: "some text"
},
{
    name: "Pizza",
    description: "some text"
},
{
    name: "Noodles",
    description: 'some text'
},
];

filters = {
    searchText: ''
}

renderRecipes(recipes, filters);

$("#searchRecipe").on("input", function (event) {
    filters.searchText = $(this).val();

    renderRecipes(recipes, filters);
})

function renderRecipes(recipes, filters) {
    var filteredRecipes = $.grep(recipes, function (object) {
        return object.name.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    $(".recipes").empty();

    $.each(filteredRecipes, function (index, value) {
        $(".recipes").append("<p>"+value.name+"</p>");
    })
}

$('#add-recipe').click(function () {
    recipes.push({
        id: uuidv4(),
        name: 'Chicken biryani',
        description: 'some text'
    })
    localStorage.setItem("recipes", JSON.stringify(recipes));
})