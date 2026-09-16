const app = document.getElementById('app');
const name3d = document.getElementById('name3d');
const heading = name3d.querySelector('h1');
const constrain = 50;
const mainNameText = heading.textContent;
const projects = document.getElementById('projects');
const about = document.getElementById('about');
const routeLinks = document.querySelectorAll('a[href="/home"], a[href="/projects"], a[href="/about"]');
const headerName = document.getElementById('header-name');
const headerNameText = headerName.textContent;

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
	const aboutPage = page === 'about';
	app.classList.toggle('page-hidden', projectsPage || aboutPage);
	projects.classList.toggle('page-visible', projectsPage);
	about.classList.toggle('page-visible', aboutPage);
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};

routeLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		const page = link.getAttribute('href').slice(1);
		history.pushState({}, '', `/${page}`);
		showPage(page);
	});
});

const getCurrentPage = () => {
	const page = window.location.pathname.replace(/^\/+|\/+$/g, '');
	return ['projects', 'about'].includes(page) ? page : 'home';
};

window.addEventListener('popstate', () => {
	showPage(getCurrentPage());
});

showPage(getCurrentPage());

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
};

app.addEventListener('mousemove', moveHeroText);
