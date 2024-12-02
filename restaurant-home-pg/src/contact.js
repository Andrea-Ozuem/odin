export default function createContact() {
    const contentBody = document.getElementById('content');

    const container = document.createElement('div');
    container.classList.add('container');
    const row = document.createElement('div');
    row.classList.add('row', 'row-contact');

    const h2 = document.createElement('h2');
    h2.textContent = "Contact Us:";
    
    const ul = document.createElement('ul');
    const email = document.createElement('li');
    email.textContent = 'Email: test@gmail.com';
    const phone = document.createElement('li');
    phone.textContent = 'Phone: +1 345 768';
    ul.appendChild(email);
    ul.appendChild(phone);

    row.appendChild(document.createElement('div'));
    row.appendChild(h2);
    row.appendChild(ul);
    container.appendChild(row);

    contentBody.appendChild(container);
}