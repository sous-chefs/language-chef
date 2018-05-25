'use babel';

import chefProviderRecipes from './chef-provider-recipes';
import chefProviderMetadata from './chef-provider-metadata';

export default {
    getProvider() {
        return [chefProviderMetadata, chefProviderRecipes];
    }
};
