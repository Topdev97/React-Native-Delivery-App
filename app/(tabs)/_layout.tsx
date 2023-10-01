import { Tabs } from 'expo-router';

import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

import CustomHeader from '@/components/CustomHeader';
import { Ionicons } from '@expo/vector-icons';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -6 }} {...props} />

}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary
      }}>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name={"ios-home-sharp"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-heart-sharp" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-circle-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
