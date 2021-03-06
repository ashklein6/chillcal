import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

// export default createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// });

const MainTabSwitchNavigator = createSwitchNavigator({Main: MainTabNavigator});
const AppNavigator = createAppContainer(MainTabSwitchNavigator);

export default AppNavigator;