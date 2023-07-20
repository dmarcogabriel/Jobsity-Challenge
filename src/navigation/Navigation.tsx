import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeView from '@app/screens/Home';
import {HomeStack} from '@app/constants/RouteNames';

const HomeStackNavigator = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeStackNavigator.Navigator>
        <HomeStackNavigator.Screen name={HomeStack.Home} component={HomeView} />
      </HomeStackNavigator.Navigator>
    </NavigationContainer>
  );
}
