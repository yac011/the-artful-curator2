// FIX: Import the ReactNode type directly to resolve the "Cannot find namespace 'React'" error.
import type { ReactNode } from 'react';

export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display: string | null;
  classification_titles: string[] | null;
  image_id: string;
  dimensions: string | null;
  provenance_text: string | null;
}

export interface ApiConfig {
  iiif_url: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface ArticSearchResponse {
  data: Artwork[];
  config: ApiConfig;
  pagination: Pagination;
}

export interface ArticArtworksResponse {
  data: Artwork[];
  config: ApiConfig;
  pagination: Pagination;
}

export interface Theme {
  title: string;
  query: string;
  emoji: string;
}

export interface SearchFiltersState {
  classification: string;
  dateStart: string;
  dateEnd: string;
  medium: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: ReactNode;
}
