export default function createHome() {
    const contentBody = document.getElementById('content');

    const container = document.createElement('div');
    container.classList.add('container');
    const row = document.createElement('div');
    row.classList.add('row', 'row-main');

    const h1 = document.createElement('h1');
    h1.innerHTML = "<b>Welcome</b> Andrea's Cocina";
    const h3 = document.createElement('h3');
    h3.classList.add('intro')
    h3.textContent = "Made from Scratch with the Finest Ingredients – Let Andrea's Cocina Sweeten Your Holiday Celebration!";

    row.appendChild(h1);
    row.appendChild(h3);
    container.appendChild(row);

    contentBody.appendChild(container);
}