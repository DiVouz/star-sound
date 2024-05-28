// NAVBAR

const navbarMore_element = document.querySelector('#navbar-more');

const navbarMoreIconOpen_element = document.querySelector('#navbar-more-icon-open');
const navbarMoreIconClose_element = document.querySelector('#navbar-more-icon-close');

navbarMoreIconOpen_element.addEventListener('click', (event) => {
    navbarMore_element.dataset.open = 'true';
});

navbarMoreIconClose_element.addEventListener('click', (event) => {
    navbarMore_element.dataset.open = 'false';
});

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

        localStorage.setItem("service-active-element-index", index);
    });
});

const lastServiceSectionId = localStorage.getItem("service-active-element-index") || 0;
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

function getGalleryImageIndex(currentIndex, maxIndex, indexPlus) {
    currentIndex += indexPlus;
    if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = maxIndex - 1;
    }
    return currentIndex;
}

function changeGalleryImage(indexPlus) {
    const galleryImages_elements = document.querySelectorAll('.gallery-image');

    const lastActiveIndex = galleryImageIndex;

    galleryImageIndex = getGalleryImageIndex(galleryImageIndex, galleryImages_elements.length, indexPlus);

    const prevIndex = getGalleryImageIndex(galleryImageIndex, galleryImages_elements.length, -1);
    const nextIndex = getGalleryImageIndex(galleryImageIndex, galleryImages_elements.length, 1);

    for (let index = 0; index < galleryImages_elements.length; index++) {
        if (index === galleryImageIndex) {
            galleryImages_elements[index].dataset.direction = ((indexPlus > 0) ? 'right' : 'left');
            galleryImages_elements[index].dataset.active = 'true';
        } else {
            if (index === lastActiveIndex) {
                galleryImages_elements[index].dataset.direction = ((indexPlus > 0) ? 'left' : 'right');
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

changeGalleryImage(galleryImageIndex);