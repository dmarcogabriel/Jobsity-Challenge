import Navigation from '@app/navigation';
import {Provider} from 'react-redux';
import store from '@app/config/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
