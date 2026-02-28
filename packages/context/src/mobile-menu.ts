import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

export type MenuContext = ReturnType<typeof createMenuContext>;

interface State {
	isOpen: boolean;
}

interface Actions {
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export function createMenuContext(): UseBoundStore<StoreApi<State & Actions>> {
	return create<State & Actions>((set) => ({
		isOpen: false,
		open() {
			set(() => ({ isOpen: true }));
		},
		close() {
			set(() => ({ isOpen: false }));
		},
		toggle() {
			set((state) => ({ isOpen: !state.isOpen }));
		},
	}));
}
