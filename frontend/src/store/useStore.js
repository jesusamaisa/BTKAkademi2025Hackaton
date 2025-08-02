// frontend/src/store/useStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Cart/Favorites
      favorites: [],
      addToFavorites: (product) => set((state) => ({
        favorites: [...state.favorites, product]
      })),
      removeFromFavorites: (productId) => set((state) => ({
        favorites: state.favorites.filter(p => p._id !== productId)
      })),
      isFavorite: (productId) => get().favorites.some(p => p._id === productId),

      // Compare list
      compareList: [],
      addToCompare: (product) => set((state) => {
        if (state.compareList.length >= 4) {
          return { compareList: [...state.compareList.slice(1), product] };
        }
        return { compareList: [...state.compareList, product] };
      }),
      removeFromCompare: (productId) => set((state) => ({
        compareList: state.compareList.filter(p => p._id !== productId)
      })),
      clearCompare: () => set({ compareList: [] }),

      // Recent views
      recentViews: [],
      addToRecentViews: (product) => set((state) => ({
        recentViews: [product, ...state.recentViews.filter(p => p._id !== product._id)].slice(0, 10)
      })),

      // Filters
      filters: {
        category: null,
        brand: null,
        minPrice: null,
        maxPrice: null,
        sort: '-createdAt'
      },
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      resetFilters: () => set({
        filters: {
          category: null,
          brand: null,
          minPrice: null,
          maxPrice: null,
          sort: '-createdAt'
        }
      })
    }),
    {
      name: 'fashion-compare-storage',
      partialize: (state) => ({
        user: state.user,
        favorites: state.favorites,
        compareList: state.compareList,
        recentViews: state.recentViews
      })
    }
  )
);

export default useStore;