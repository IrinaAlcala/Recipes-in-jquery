let recipies = getSavedRecipies();

const filters = {
    searchText: ''
}

function getSummaryInfo(element) {
    const summaryEl = $('<p>');
    let falses=0,trues=0;
    $.each(element.ingredients, function name(index, element) {
        if (element.flag) {
            trues++;
        }else{
            falses++;
        }
    })

    if (element.ingredients.length == trues) {
        summaryEl.text('You have all ingredients');
    }else if(element.ingredients.length == falses){
        summaryEl.text('You have none of ingredients');
    }else{
        summaryEl.text('You have some of ingredients');
    }
    return summaryEl;
}

function renderRecipies(recipies, filters) {
    let filteredRecipies = $.grep(recipies, function (element) {
        return element.name.toLowerCase().includes(filters.searchText.toLowerCase());
    })
    $('.recipies').empty();
    $.each(filteredRecipies, function (index, element) {
        let summaryEl = getSummaryInfo(element);
        summaryEl.addClass('list-item__subtitle');
        let cardEl = $('<a>');
        cardEl.addClass('list-item');
        let titleEl = $('<p>');
        titleEl.addClass('list-item__title');
        if(element.name.length > 0){
            titleEl.text(element.name);
        }else{
            titleEl.text('Unnamed Recipe');
        }
        cardEl.attr('href', '/edit.html#'+element.id);
        cardEl.append(titleEl);
        cardEl.append(summaryEl);
        $('.recipies').append(cardEl);
    })
}

$('#filter-recipies').on('input', function (e) {
    filters.searchText = e.target.value;
    renderRecipies(recipies, filters);
})

$('#add-recipe').click(function () {
    const id = uuidv4();
    recipies.push({
        id: id,
        name: '',
        description: '',
        ingredients: []
    })
    saveRecipies(recipies);
    location.assign('/edit.html#'+id);
})

function getSavedRecipies() {
    const recipiesJSON = localStorage.getItem('recipies');
    if (recipiesJSON !== null) {
        return JSON.parse(recipiesJSON);    
    }else{
        return [];
    }
    
}

function saveRecipies(recipies) {
    localStorage.setItem('recipies', JSON.stringify(recipies));
}

renderRecipies(recipies, filters);