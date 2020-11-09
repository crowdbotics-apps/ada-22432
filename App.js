import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Icon} from 'react-native-ui-kitten';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import SplashScreen from './src/features/SplashScreen';
import {store} from './src/store';
import NavigatorProvider from './src/navigator/mainNavigator';
import {setupHttpConfig} from './src/utils/http';
import * as NavigationService from './src/navigator/NavigationService';

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  async componentWillMount() {
    /**
     * add any aditional app config here,
     * don't use blocking requests here like HTTP requests since they block UI feedback
     * create HTTP requests and other blocking requests using redux saga
     */
    await this.loadAssets();
    setupHttpConfig();
  }

  componentDidMount() {
    /**
     * Read above commments above adding async requests here
     */
    NavigationService.setNavigator(this.navigator);
  }

  loadAssets = async () => {
    // add any loading assets here
    this.setState({isLoaded: true});
  };

  renderLoading = () => (
    <View style={[styles.flex]}>
      <Text>Loading</Text>
    </View>
  );

  renderApp = () => (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <ReduxProvider store={store}>
          <NavigatorProvider
            style={styles.flex}
            ref={nav => {
              this.navigator = nav;
            }}>
            <View style={[styles.flex]}>
              <SplashScreen />
            </View>
          </NavigatorProvider>
        </ReduxProvider>
      </ApplicationProvider>
    </>
  );

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}

const styles = StyleSheet.create({
  flex: {flex: 1},
});
