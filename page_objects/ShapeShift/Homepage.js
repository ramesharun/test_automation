import * as locators from './Homepage.json';
import * as pageObjectMethods from '../../lib/page_object_methods';
import { coin } from '../../lib/urls';

const commands = {

  locators: () => { return locators; },

  navigationPath: () => {
    return [
      {
        page: 'Homepage',
        action: 'navigate'
      },
      {
        page: 'Homepage',
        action: 'waitForPageToLoad'
      }
    ];
  }

};

export default {
  url: coin,
  commands: [ pageObjectMethods, commands ],
  elements: {}
};