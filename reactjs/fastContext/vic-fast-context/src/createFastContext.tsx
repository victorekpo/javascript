import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useSyncExternalStore
} from "react";

export default function createFastContext<Store>(initialState: Store) {
  function useStoreData (): {
    get: () => Store;
    set: (value: Partial<Store>) => void; // Partial makes them all optional
    subscribe: (callback: () => void) => () => void; // returns unsubscribe function
  } {
    const store = useRef(initialState); // set initial state

    // When building custom hooks, if you're returning a function, wrap it in a useCallback to avoid a new reference to the function

    const get = useCallback(() => store.current,[]);

    // Subscribe needs a list of subscribers
    const subscribers = useRef(new Set<() => void>()) // use a set to avoid the same subscribers being added

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach(callback => callback());
    },[]);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    },[]);

    return {
      get,
      set,
      subscribe
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null); // initialize as null

  const Provider = ({children}: { children: React.ReactNode }) => {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    )
  };

  function useStore<SelectorOutput> (
    selector: (store: Store) => SelectorOutput
  ): [
    SelectorOutput,
    (value: Partial<Store>) => void
  ] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
  }

  return {
    Provider,
    useStore
  }
};
