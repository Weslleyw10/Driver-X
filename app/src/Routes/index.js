import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { navigationRef } from './rootNavigation'

import Login from '../Pages/Login'
import Driver from '../Pages/Steps/driver';
import Passenger from '../Pages/Steps/passenger';
import Type from '../Pages/Steps/type';
import Ride from '../Pages/Ride';
import Home from '../Pages/Home';

const Stack = createStackNavigator()

const Routes = () => (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                options={{headerShown: false}}
                name="Login"
                component={Login}
            />
            <Stack.Screen 
                options={{headerShown: false}}
                name="Driver"
                component={Driver}
            />
            <Stack.Screen 
                options={{headerShown: false}}
                name="Passenger"
                component={Passenger}
            />
            <Stack.Screen 
                options={{headerShown: false}}
                name="Type"
                component={Type}
            />
            <Stack.Screen 
                options={{headerShown: false}}
                name="Ride"
                component={Ride}
            />
            <Stack.Screen 
                options={{headerShown: false}}
                name="Home"
                component={Home}
            />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Routes