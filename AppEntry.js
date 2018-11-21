import { KeepAwake, registerRootComponent } from 'expo';
import index from './src/index';

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(index);
