export default function createMenu() {
    const contentBody = document.getElementById('content');

    const container = document.createElement('div');
    container.classList.add('container');
    const row = document.createElement('div');
    row.classList.add('row', 'row-menu');

    const h2 = document.createElement('h2');
    h2.textContent = "Our Exquisite Menu";
    h2.classList.add('heading');
    row.appendChild(h2);

    const dflex = document.createElement('div');
    dflex.classList.add('d-flex');
    const col1 = col("SANDWICHES", sandwiches);
    const col2 = col("SALADS", salads);
    dflex.appendChild(col1);
    dflex.appendChild(col2);

    row.appendChild(dflex);
    container.appendChild(row);
    contentBody.appendChild(container);
}


const sandwiches = [
    {
        item: "Club Sandwich",
        ingredients: "Bacon, Lettuce, Tomato, Mayonnaise, Turkey, Ham, Cheese, Bread"
    },
    {
        item: "BLT Sandwich",
        ingredients: "Bacon, Lettuce, Tomato, Mayonnaise, Bread"
    },
    {
        item: "Grilled Cheese Sandwich",
        ingredients: "Cheese, Bread"
    }
];

const salads = [
    {
        item: "Caesar Salad",
        ingredients: "Lettuce, Croutons, Parmesan Cheese, Caesar Dressing"
    },
    {
        item: "Garden Salad",
        ingredients: "Lettuce, Tomato, Cucumber, Carrot, Dressing"
    },
    {
        item: "Greek Salad",
        ingredients: "Lettuce, Tomato, Cucumber, Feta Cheese, Olives, Dressing"
    }
];

function col(header, list) {
    const col = document.createElement('div');

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('menu-section__header');
    const h2 = document.createElement('h3');
    h2.textContent = header;
    h2.classList.add('menu-section__heading');
    headerDiv.appendChild(h2);
    col.appendChild(headerDiv);

    const ul = document.createElement('ul');
    list.forEach(element => {
        const liElement = createLi(element.item, element.ingredients);
        ul.appendChild(liElement);
    });

    col.appendChild(ul);
    return col;
}

function createLi(item, ingredients) {
    const h4 = document.createElement('h4');
    h4.textContent = item;
    const p = document.createElement('p');
    p.textContent = ingredients;
    
    const li = document.createElement('li');
    li.appendChild(h4);
    li.appendChild(p);

    return li;
}