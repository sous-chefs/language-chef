'use babel';

import chefProviderRecipes from './chef-provider-recipes';
import chefProviderMetadata from './chef-provider-metadata';

export function activate() {
  require('atom-package-deps').install('language-chef')
    .then(function() {
      console.log('All dependencies installed, good to go')
    })
}

export function getProvider() {
  return [
    chefProviderMetadata,
    chefProviderRecipes
  ];
}
