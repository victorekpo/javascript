import createFastContext from "./createFastContext";

const initialState = {
  firstName: "Victor",
  lastName: "Ekpo"
};

const { Provider, useStore } = createFastContext(initialState);

const TextInput = ({ value }: { value: "firstName" | "lastName" }) => {
  const [fieldValue, setStore] = useStore((store) => store[value]);
  return (
    <div className="field">
      {value}: <input
        value={fieldValue}
        onChange={(e) => setStore({[value]: e.target.value })}

    />
    </div>
  );
};

const Display = ({ value }: { value: "firstName" | "lastName" }) => {
  const [fieldValue] = useStore((store) => store[value]);

  return (
    <div className="value">
      {value}: {fieldValue}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className="container">
      <h5>FormContainer</h5>
      <TextInput value="firstName" />
      <TextInput value="lastName" />
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div className="container">
      <h5>DisplayContainer</h5>
      <Display value="firstName" />
      <Display value="lastName" />
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
