import {Provider} from 'react-redux';

import Navigation from '@app/navigation';
import store from '@app/config/store';
import BiometricAccessProvider from './providers/BiometricAccessProvider';

export default function App() {
  return (
    <BiometricAccessProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </BiometricAccessProvider>
  );
}
