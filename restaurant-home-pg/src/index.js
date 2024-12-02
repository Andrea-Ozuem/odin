import "./styles.css";
import contentBody from "./home";
import menu from "./menu";
import contact from "./contact";

const homeBtn = document.getElementById('homeBtn');
const menuBtn = document.getElementById('menuBtn');
const contactBtn = document.getElementById('contactBtn');

document.getElementById('homeBtn').addEventListener('click', (e) => {
    document.getElementById('content').innerHTML = '';
    menuBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    e.target.classList.add("active");
    contentBody();
});

document.getElementById('menuBtn').addEventListener('click', (e) => {
    document.getElementById('content').innerHTML = '';
    e.target.classList.add("active");
    homeBtn.classList.remove('active');
    contactBtn.classList.remove('active');
    menu();
});

document.getElementById('contactBtn').addEventListener('click', (e) => {
    document.getElementById('content').innerHTML = '';
    e.target.classList.add("active");
    homeBtn.classList.remove('active');
    menuBtn.classList.remove('active');
    contact();
});

contentBody();
homeBtn.classList.add('active');

console.log('running how!!!');