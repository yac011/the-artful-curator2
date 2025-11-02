import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import RandomArtModal from './components/RandomArtModal';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FavoritesPage from './components/FavoritesPage';
import { searchArtworks, fetchRandomArtwork } from './services/articService';
import { Artwork, ApiConfig, SearchFiltersState } from './types';
import { THEMES } from './constants';

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifConfig, setIiifConfig] = useState<ApiConfig | null>(null);
  const [selectedThemeQuery, setSelectedThemeQuery] = useState<string | null>(THEMES[0].query);
  const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalArtwork, setModalArtwork] = useState<Artwork | null>(null);
  const [isRandomLoading, setIsRandomLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryTitle, setGalleryTitle] = useState<string>(THEMES[0].title);

  const initialFiltersState: SearchFiltersState = { classification: '', dateStart: '', dateEnd: '', medium: '' };
  const [filters, setFilters] = useState<SearchFiltersState>(initialFiltersState);
  const [activeFilters, setActiveFilters] = useState<SearchFiltersState>(initialFiltersState);

  const handleFetchArtworks = useCallback(async (query: string, page: number = 1, filtersToApply: SearchFiltersState) => {
    setIsLoadingGallery(true);
    setGalleryError(null);
    
    try {
      const { data, config, pagination } = await searchArtworks(query, page, filtersToApply);
      setArtworks(data);
      setIiifConfig(config);
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_pages);
    } catch (error) {
      setGalleryError(error instanceof Error ? error.message : 'An unknown error occurred.');
      setArtworks([]);
    } finally {
      setIsLoadingGallery(false);
    }
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFiltersState);
    setActiveFilters(initialFiltersState);
  }, [initialFiltersState]);
  
  const handleThemeSelection = (query: string) => {
      setSelectedThemeQuery(query);
      setSearchQuery(''); 
      const theme = THEMES.find(t => t.query === query);
      if (theme) {
        setGalleryTitle(theme.title);
      }
      handleClearFilters();
      handleFetchArtworks(query, 1, initialFiltersState);
  };

  useEffect(() => {
    if (selectedThemeQuery) {
      handleFetchArtworks(selectedThemeQuery, 1, initialFiltersState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on initial load

  const handleRandomArtClick = async () => {
    setIsRandomLoading(true);
    setModalArtwork(null);
    setIsModalOpen(true);
    try {
      const { artwork, config } = await fetchRandomArtwork();
      setModalArtwork(artwork);
      if (!iiifConfig) {
        setIiifConfig(config);
      }
    } catch (error) {
      console.error("Failed to get random artwork:", error);
      // Optionally show an error in the modal
    } finally {
      setIsRandomLoading(false);
    }
  };
  
  const handleArtworkCardClick = (artwork: Artwork) => {
    setModalArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalArtwork(null);
  };
  
  const handlePageChange = (page: number) => {
    const currentQuery = searchQuery.trim() || selectedThemeQuery;
    if (currentQuery && page >= 1 && page <= totalPages) {
      handleFetchArtworks(currentQuery, page, activeFilters);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setSelectedThemeQuery(null); // Deselect any active theme
      setGalleryTitle(`Search Results for "${trimmedQuery}"`);
      setActiveFilters(filters);
      handleFetchArtworks(trimmedQuery, 1, filters);
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setActiveFilters(filters);
    handleFetchArtworks(searchQuery.trim(), 1, filters);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header
          onRandomClick={handleRandomArtClick}
          isRandomLoading={isRandomLoading}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onSearch={handleSearch}
          onSearchKeyDown={handleSearchKeyDown}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <HomePage
                artworks={artworks}
                iiifConfig={iiifConfig}
                selectedThemeQuery={selectedThemeQuery}
                isLoadingGallery={isLoadingGallery}
                galleryError={galleryError}
                currentPage={currentPage}
                totalPages={totalPages}
                filters={filters}
                galleryTitle={galleryTitle}
                initialFiltersState={initialFiltersState}
                onThemeSelection={handleThemeSelection}
                onArtworkCardClick={handleArtworkCardClick}
                onPageChange={handlePageChange}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={() => {
                  handleClearFilters();
                  handleFetchArtworks(searchQuery.trim(), 1, initialFiltersState);
                }}
              />
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/favorites" element={<FavoritesPage onArtworkClick={handleArtworkCardClick} />} />
          </Routes>
        </main>
        <RandomArtModal
          artwork={modalArtwork}
          iiifUrl={iiifConfig?.iiif_url || ''}
          onClose={handleCloseModal}
          isLoading={isRandomLoading}
          isOpen={isModalOpen}
        />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;