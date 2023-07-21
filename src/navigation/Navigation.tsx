import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStack} from '@app/constants/RouteNames';
import HomeView from '@app/screens/Home';
import SerieDetails from '@app/screens/SerieDetails';
import EpisodeDetails from '@app/screens/EpisodeDetails';
import Bookmark from '@app/screens/Bookmark';

import BookmarkNavigationButton from './BookmarkNavigationButton';

const HomeStackNavigator = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeStackNavigator.Navigator>
        <HomeStackNavigator.Screen
          name={HomeStack.Home}
          component={HomeView}
          options={{
            headerRight: BookmarkNavigationButton,
          }}
        />
        <HomeStackNavigator.Screen
          name={HomeStack.SerieDetails}
          component={SerieDetails}
        />
        <HomeStackNavigator.Screen
          name={HomeStack.EpisodeDetails}
          component={EpisodeDetails}
        />
        <HomeStackNavigator.Screen
          name={HomeStack.Bookmark}
          component={Bookmark}
        />
      </HomeStackNavigator.Navigator>
    </NavigationContainer>
  );
}
