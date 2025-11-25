// NAVBAR

const navbar_element = document.querySelector('#navbar');

(() => {
    const observer = new IntersectionObserver(([e]) => {
        e.target.dataset.sticky = (e.intersectionRatio < 1)
    },
    {
        rootMargin: '-1px 0px 0px 0px',
        threshold: [1]
    });

    observer.observe(navbar_element);
})();

const navbarMore_element = document.querySelector('#navbar-more');

const navbarMoreIconOpen_element = document.querySelector('#navbar-more-icon-open');
navbarMoreIconOpen_element.addEventListener('click', (event) => {
    if (navbarMore_element.dataset.open === 'true') {
        return;
    }

    event.stopPropagation();

    navbarMore_element.dataset.open = 'true';

    if (navbar_element.dataset.sticky === 'false') {
        navbarMore_element.scrollIntoView({
            behavior: 'smooth'
        });
    }
});

const navbarMoreIconClose_element = document.querySelector('#navbar-more-icon-close');
navbarMoreIconClose_element.addEventListener('click', (event) => {
    if (navbarMore_element.dataset.open === 'false') {
        return;
    }

    event.stopPropagation();

    navbarMore_element.dataset.open = 'false';
});

window.addEventListener('click', (event) => {
    if (navbarMore_element.dataset.open === 'true') {
        navbarMore_element.dataset.open = 'false';
    }
});

// LANGUAGE

const navbarLanguageButton_element = document.querySelector('#navbar-language');
const navbarMoreLanguageButton_element = document.querySelector('#navbar-more-language')

function toggleLanguage(forceLang = null) {
	if (forceLang === null || forceLang === undefined) {
		forceLang = document.documentElement.lang === 'en' ? 'el' : 'en';
	}
    
	if (document.documentElement.lang !== forceLang) {
		document.documentElement.lang = forceLang;
		let url = new URL(window.location.href);
		url.searchParams.set('lang', forceLang);
        window.history.pushState({}, '', url.href);
	}
}

(() => {
    navbarLanguageButton_element.addEventListener('click', (event) => toggleLanguage());
    navbarMoreLanguageButton_element.addEventListener('click', (event) => toggleLanguage());

    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam !== null) {
        if (langParam === 'en' || langParam === 'el') {
            toggleLanguage(langParam);
        }
    }
})();

// SERVICES

const servicesItems_elements = document.querySelectorAll('[data-section="services"]');

const servicesTitle = document.querySelector('#services-main-title');
const servicesDescription = document.querySelector('#services-main-description');

servicesItems_elements.forEach((element, index) => {
    element.addEventListener('click', (event) => {
        if (element.dataset.active === 'true') {
            return;
        }

        servicesItems_elements.forEach((element) => {
            element.dataset.active = 'false';
        });
        element.dataset.active = 'true';

        const titleString = element.querySelector('.services-item-title').innerHTML;
        servicesTitle.innerHTML = titleString;

        const descriptionString = element.querySelector('.services-item-description').innerHTML;
        servicesDescription.innerHTML = descriptionString;

        localStorage.setItem('service-active-element-index', index);
    });
});

const lastServiceSectionId = localStorage.getItem('service-active-element-index') || 0;
servicesItems_elements[lastServiceSectionId].click();

// GALLERY

const galleryButtonBack_element = document.querySelector('#gallery-button-back');
const galleryButtonNext_element = document.querySelector('#gallery-button-next');

let galleryImageIndex = 0;

galleryButtonBack_element.addEventListener('click', (event) => {
    changeGalleryImage(-1);
});

galleryButtonNext_element.addEventListener('click', (event) => {
    changeGalleryImage(1);
});

function getGalleryImageIndex(currentIndex, maxIndex, plusIndex) {
    currentIndex += plusIndex;
    if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = maxIndex - 1;
    }
    return currentIndex;
}

function changeGalleryImage(plusIndex) {
    const galleryImages_elements = document.querySelectorAll('.gallery-image');

    const lastActiveIndex = galleryImageIndex;

    galleryImageIndex = getGalleryImageIndex(galleryImageIndex, galleryImages_elements.length, plusIndex);

    const prevIndex = getGalleryImageIndex(galleryImageIndex, galleryImages_elements.length, -1);
    const nextIndex = getGalleryImageIndex(galleryImageIndex, galleryImages_elements.length, 1);

    for (let index = 0; index < galleryImages_elements.length; index++) {
        if (index === galleryImageIndex) {
            galleryImages_elements[index].dataset.direction = ((plusIndex > 0) ? 'right' : 'left');
            galleryImages_elements[index].dataset.active = 'true';
        } else {
            if (index === lastActiveIndex) {
                galleryImages_elements[index].dataset.direction = ((plusIndex > 0) ? 'left' : 'right');
            }

            galleryImages_elements[index].dataset.active = 'false';
        }

        if (
            index === galleryImageIndex ||
            index === prevIndex ||
            index === nextIndex
        ) {
            galleryImages_elements[index].style.backgroundImage = `url(${galleryImages_elements[index].dataset.imageUrl})`;
        }
    }
}

(() => {
    changeGalleryImage(galleryImageIndex);
})();