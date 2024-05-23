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

(() => {
    changeGalleryImage(galleryImageIndex);
})();