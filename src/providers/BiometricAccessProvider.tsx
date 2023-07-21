import {createContext, useState, PropsWithChildren, useEffect} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Context = createContext<null>(null);

const PROMPT_MESSAGES = {
  [BiometryTypes.Biometrics]: 'Use your Fingerprint to unlock',
  [BiometryTypes.FaceID]: 'User your Face ID to unlock',
  [BiometryTypes.TouchID]: 'Use your Touch ID to unlock',
};

export default function BiometricAccessProvider({children}: PropsWithChildren) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const isSensorAvailable = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (available && biometryType) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: PROMPT_MESSAGES[biometryType],
        });

        setIsUserAuthenticated(success);
      } else {
        setIsUserAuthenticated(true);
      }
    } catch (e) {
      setIsUserAuthenticated(false);
    }
  };

  useEffect(() => {
    isSensorAvailable();
  }, []);

  return (
    <Context.Provider value={null}>
      {isUserAuthenticated && children}
    </Context.Provider>
  );
}
