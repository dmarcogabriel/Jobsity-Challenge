import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {IHomeStackParamsList} from '@app/interfaces/NavigationInterfaces';
import {HomeStack} from '@app/constants/RouteNames';

type INavigation = NativeStackNavigationProp<
  IHomeStackParamsList,
  HomeStack.Home
>;

export default function BookmarkNavigationButton() {
  const navigation = useNavigation<INavigation>();

  const handleGoToBookmarks = () => {
    navigation.navigate(HomeStack.Bookmark);
  };

  return <IconButton icon="bookmark" onPress={handleGoToBookmarks} />;
}
