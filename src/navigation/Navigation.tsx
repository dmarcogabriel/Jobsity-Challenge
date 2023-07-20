import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeView from '@app/screens/Home';
import ScreenNames from '@app/constants/ScreenNames';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.Home} component={HomeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
