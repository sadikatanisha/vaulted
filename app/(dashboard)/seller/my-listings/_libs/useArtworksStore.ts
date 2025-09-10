import { createStore } from "@/lib/createStore";
type State = {
  selectedArtworkId: string | null;
  artworkDialogOpen: boolean;
};

type Actions = {
  updateSelectedArtworkId: (id: State["selectedArtworkId"]) => void;
  updateArtworkDialogOpen: (is: State["artworkDialogOpen"]) => void;
};

type Store = State & Actions;

const useArtworksStore = createStore<Store>(
  (set) => ({
    selectedArtworkId: null,
    updateSelectedArtworkId: (id) =>
      set((state) => {
        state.selectedArtworkId = id;
      }),
    artworkDialogOpen: false,
    updateArtworkDialogOpen: (is) =>
      set((state) => {
        state.artworkDialogOpen = is;
      }),
  }),
  {
    name: "artworks-store",
  }
);

export { useArtworksStore };
