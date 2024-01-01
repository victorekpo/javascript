import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from "react";

type Store = { first: string; last: string };

const useStoreData = (): {
  get: () => Store;
  set: (value: Partial<Store>) => void; // Partial makes them all optional
  subscribe: (callback: () => void) => () => void; // returns unsubscribe function
} => {
  const store = useRef({
    first: "",
    last: "",
  });

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

const useStore = (): [
  Store,
  (value: Partial<Store>) => void
] => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const [state, setState] = useState(store.get()); // initial value of store

  useEffect(() => {
    //
    return store.subscribe(() => setState(store.get())); // return from subscribe gives the unsubscribe which is the clean up function
  },[]);

  return [state, store.set];
}

const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [store, setStore] = useStore();
  return (
    <div className="field">
      {value}: <input
        value={store[value]}
        onChange={(e) => setStore({...store, [value]: e.target.value })}

    />
    </div>
  );
};

const Display = ({ value }: { value: "first" | "last" }) => {
  const [store] = useStore();

  return (
    <div className="value">
      {value}: {store[value]}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className="container">
      <h5>FormContainer</h5>
      <TextInput value="first" />
      <TextInput value="last" />
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div className="container">
      <h5>DisplayContainer</h5>
      <Display value="first" />
      <Display value="last" />
    </div>
  );
};

const ContentContainer = () => {
  return (
    <div className="container">
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
};

function App() {
  return (
    <Provider>
    <div className="container">
      <h5>App</h5>
      <ContentContainer />
    </div>
    </Provider>
  );
}

export default App;
