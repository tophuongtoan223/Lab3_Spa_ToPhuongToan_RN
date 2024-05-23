import React from 'react';
import { useMyContextController } from '../context';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Customer from './Customer';
import Admin from './Admin';
import COLORS from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Register from './Register';
import Setting from './Setting';
import Profile from './Profile'; // Import Profile component
import AddNewServices from './AddNewServices';
import UpdateServices from './UpdateServices';
import ServicesDetail from './ServicesDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: COLORS.blue },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="Home" component={Admin} options={{ headerShown: false }} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: COLORS.pink } }} name="UpdateServices" component={UpdateServices} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: COLORS.pink }, headerShown: false }} name="ServicesDetail" component={ServicesDetail} />
            <Stack.Screen name="AddNewServices" component={AddNewServices} />
        </Stack.Navigator>
    );
}

const CustomerScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: COLORS.blue },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="CustomerScreen" component={Customer} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const SettingScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: "#FFCC66" },
            }}
        >
            <Stack.Screen name="SettingScreen" component={Setting} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Router = () => {
    const [controller] = useMyContextController();
    const { userLogin } = controller;

    return (
        <>
            {userLogin ? (
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        tabBarActiveTintColor: "#FFCC66",
                        headerShown: false,
                        tabBarShowLabel: true
                    }}
                >
                    {userLogin.role === 'admin' ? (
                        <>
                            <Tab.Screen
                                name="Admin"
                                component={AdminScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="house" color={color} size={size} />
                                    ),
                                    title: "Home"
                                }}
                            />
                            <Tab.Screen
                                name="Transaction"
                                component={AddNewServices}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="money-bill-1-wave" color={color} size={size} />
                                    ),
                                    title: 'Transaction'
                                }}
                            />
                            {/* <Tab.Screen
                                name="Customer"
                                component={CustomerScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="window-restore" color={color} size={size} />
                                    ),
                                    title: 'Customer'
                                }}
                            /> */}
                            <Tab.Screen
                                name="Profile" 
                                component={Profile}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="user" color={color} size={size} />

                                    ),
                                    title: 'Profile'
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={SettingScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="gears" color={color} size={size} />
                                    ),
                                    title: 'Setting'
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Tab.Screen
                                name="Home"
                                component={AdminScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="house" color={color} size={size} />
                                    ),
                                    title: "Home"
                                }}
                            />
                            <Tab.Screen
                                name="Profile" 
                                component={Profile}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="user" color={color} size={size} />

                                    ),
                                    title: 'Profile'
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={SettingScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="gears" color={color} size={size} />
                                    ),
                                    title: 'Setting'
                                }}
                            />
                        </>
                    )}
                </Tab.Navigator>
            ) : (
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Navigator>
                )}
        </>
    );
}
export default Router;
