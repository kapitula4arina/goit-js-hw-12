import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
    
export function renderGallery(data, tagToInsert) {
    tagToInsert.innerHTML = createMarkup(data);

    lightbox.refresh();
};

function createMarkup(arr) {
    return arr.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => {
        return `<li class = 'list-item'>
            <a class='gallery-link' href='${largeImageURL}'>
                <img
                    class = 'gallery-image'
                    src = '${webformatURL}'
                    alt =  '${tags}'>
                <ul class = 'description-list'>
                    <li class = 'description-item'>
                        <h3>Likes</h3>
                        <p>${likes}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Views</h3>
                        <p>${views}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Comments</h3>
                        <p>${comments}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Downloads</h3>
                        <p>${downloads}</p>
                    </li>
                </ul>
            </a>
        </li>`
    }).join('');
};