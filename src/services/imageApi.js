const KEY = '26835333-f3f2e8c3d3f3fe0d53393333d';

export default function fetchImages(topic, page) {
    const URL = ` https://pixabay.com/api/?q=${topic}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;
    return fetch(URL)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }            
            return Promise.reject(`There is no photos on this ${topic}. Try to change it.`);
        });
};
