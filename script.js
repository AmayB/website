const app = document.getElementById('app');
const name3d = document.getElementById('name3d');
const heading = name3d.querySelector('h1');
const shadows = name3d.querySelector('.shadows');
const constrain = 50;
const mainNameText = heading.textContent;
const finalNameWidth = heading.getBoundingClientRect().width;
const projects = document.getElementById('projects');
const homeLink = document.querySelector('nav a[href="#home"]');
const projectsLink = document.querySelector('nav a[href="#projects"]');
const headerName = document.getElementById('header-name');
const headerNameText = headerName.textContent;

name3d.style.width = `${finalNameWidth}px`;
heading.textContent = '';
name3d.classList.add('is-typing');
let mainNameIndex = 0;
let mainNameTyping = true;

const typeMainName = () => {
	heading.textContent = mainNameText.slice(0, mainNameIndex);
	mainNameIndex += 1;

	if (mainNameIndex <= mainNameText.length) {
		window.setTimeout(typeMainName, 115);
	} else {
		name3d.classList.remove('is-typing');
		mainNameTyping = false;
	}
};

typeMainName();

const showPage = (page) => {
	const projectsPage = page === 'projects';
	app.classList.toggle('page-hidden', projectsPage);
	projects.classList.toggle('page-visible', projectsPage);
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};

homeLink.addEventListener('click', (event) => {
	event.preventDefault();
	history.pushState({}, '', '#home');
	showPage('home');
});

projectsLink.addEventListener('click', (event) => {
	event.preventDefault();
	history.pushState({}, '', '#projects');
	showPage('projects');
});

window.addEventListener('popstate', () => {
	showPage(window.location.hash === '#projects' ? 'projects' : 'home');
});

showPage(window.location.hash === '#projects' ? 'projects' : 'home');

const moveHeroText = (event) => {
	if (mainNameTyping) return;

	const { clientX, clientY } = event;
	const { x, y, width, height } = name3d.getBoundingClientRect();

	const rotateX = -(clientY - y - height / 2) / constrain;
	const rotateY = (clientX - x - width / 2) / (constrain * width / height);
	const translateX = (2 * x + width - clientX) / (constrain * width / height);
	const translateY = (2 * y + height - clientY) / constrain;
	const rotateZ = (clientX - window.innerWidth / 2) / (constrain * width / height);

	name3d.style.transform = `perspective(400px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	heading.style.transform = `rotateZ(${rotateZ}deg)`;
	shadows.style.transform = `rotateZ(${rotateZ}deg)`;

	[...shadows.children].forEach((shadow, index) => {
		shadow.style.transform = `translate3d(${-(rotateY * index) / 2}px, ${(rotateX * index) / 2}px, ${index / 2}px)`;
		shadow.style.opacity = `${0.16 - index * 0.02}`;
	});
};

app.addEventListener('mousemove', moveHeroText);
