
import { Pressable, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.app}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Main"
          screenOptions={({ navigation }) => ({
            headerStyle: styles.header,
            headerTintColor: '#183153',
            headerTitleStyle: styles.headerTitle,
            drawerActiveTintColor: '#2463eb',
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.openDrawer()}
                hitSlop={12}
                style={styles.menuButton}
              >
                <Text style={styles.menuIcon}>☰</Text>
              </Pressable>
            ),
          })}
        >
          <Drawer.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Pay Calculator' }}
          />
          <Drawer.Screen
            name="About"
            component={AboutScreen}
            options={{ title: 'About' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f3f6fb',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  menuButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuIcon: {
    color: '#183153',
    fontSize: 26,
  },
});