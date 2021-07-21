import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import Login from './src/Pages/Login';
import Driver from './src/Pages/Steps/driver';
import Passenger from './src/Pages/Steps/passenger';
import Type from './src/Pages/Steps/type';
import Ride from './src/Pages/Ride';
import Home from './src/Pages/Home';


AppRegistry.registerComponent(appName, () => Home);
