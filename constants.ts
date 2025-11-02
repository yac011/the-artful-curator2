import { Theme } from './types';

export const API_BASE_URL = 'https://api.artic.edu/api/v1';
export const API_FIELDS = 'id,title,artist_display,date_display,medium_display,classification_titles,image_id,dimensions,provenance_text';
export const GALLERY_ARTWORK_LIMIT = 12;

export const THEMES: Theme[] = [
  { title: 'Portraits & Figures', query: 'portrait OR figure OR people', emoji: '👥' },
  { title: 'Landscapes & Nature', query: 'landscape OR seascape OR cityscape OR nature OR flowers', emoji: '🏞️' },
  { title: 'Abstract & Modern', query: 'abstract OR modernism OR cubism OR surrealism', emoji: '🎨' },
  { title: 'Still Life & Objects', query: 'still life OR objects OR vase', emoji: '🏺' },
  { title: 'Mythology & Religion', query: 'mythology OR religion OR biblical', emoji: '📜' },
  { title: 'Asian Art', query: 'asian art OR japanese art OR chinese art', emoji: '⛩️' }
];
