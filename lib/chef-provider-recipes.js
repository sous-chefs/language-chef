'use babel';

import suggestionsHelpersDsl from '../data/chef-dslhelpers';
import suggestionsHelpersProperties from '../data/chef-properties';
import suggestionsHelpersRecipes from '../data/chef-recipes';

class ChefProviderRecipes {
	constructor() {
		this.selector = '.source.chef.recipes';
		this.suggestions = this.initSuggestions();
	}

	initSuggestions() {
		let temp = suggestionsHelpersDsl;
		temp = temp.concat(suggestionsHelpersProperties);
		temp = temp.concat(suggestionsHelpersRecipes);

		return temp;
	}

	// getOptimisticVersion(version) {
	// 	let components = version.split('.')
	// 	let optimistic = components[0] + '.' + components[1]
	// 	return optimistic
	// }

	getSuggestions(options) {
		const { prefix } = options;

		if (prefix.length >= 1) {
			return this.findMatchingSuggestions(prefix);
		}
	}

  // TODO: Implement dynamic-scope + expansion of options
	findMatchingSuggestions(prefix) {
		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = this.suggestions.filter((suggestion) => {
			let textLower = suggestion.snippet.toLowerCase();
			return textLower.startsWith(prefixLower);
		});

		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		// Check, if type is set, otherwise set to none
		var suggestiontypes:
		suggestiontypes = ['Resource', 'Helper', 'Metadata'];
		let actype = (suggestiontypes.indexOf(suggestiontypes == suggestion.type )) ? suggestion.type:'';

		// Not set currently
		let replacementPrefix = suggestion.replacementPrefix;

		// Set description: Show code, which will be set, when pressing enter; followed by description
		// -> suggestion.snippet (cleaned up without $(1:xxx) $(2:yyy))+ suggestion.description
		let descsnippet = suggestion.snippet.replace(/\${[0-9]:|}/g, '');
		if (suggestion.since != null) {
			desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description + '\n**Since chef-client**\n' + suggestion.since;
		} else if ( suggestion.deprecated != null ) {
			desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description + '\n**Deprecated in Version**\n' + suggestion.deprecatedin;
		} else {
			desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description ;
		}

		// set icon
		atompackagedir = atom.packages.getPackageDirPaths()
		// define default colors for each type and set icon
		// Resources
		ciconbgcolorresource 		= 	'#FF851B'
		ciconiconcolorresource	=		''
		ciconiconresource 			= 	'<i class="icon-heart"></i>'
		// Helpers
		ciconbgcolorhelper 			= 	'#FF851B'
		ciconiconcolorhelper		=		''
		ciconiconhelper					=		'<img height="16px" src="' + atompackagedir + '/autocomplete-chef/images/icon-resources.svg"></img>'
		// Metadata
		ciconbgcolormetadata 		= 	'#39CCCC'
		ciconiconcolormetadata	=		'White'
		ciconiconmetadata				=		'<i class="icon-squirrel"></i>'
		// All other
		ciconbgcolorother 			= 	'#FFDC00'
		ciconiconcolorother			=		'Brown'
		ciconiconother					= 	'<i class="icon-squirrel"></i>'


		let cicon;
		if (suggestion.icon != null) {
			cicon = suggestion.icon
		} else {
			if ( suggestion.type == 'Resource' ) {
				cicon = '<div style="background-color:' + ciconbgcolorresource + '; color:' + ciconiconcolorresource + '">' + ciconiconresource + '</div>';
			} else if ( suggestion.type == 'Helper' ){
				cicon = '<div style="background-color:' + ciconbgcolorhelper + '; color:' + ciconiconcolorhelper + '">' + ciconiconhelper + '</div>';
			} else if ( suggestion.type == 'Metadata' ) {
				cicon = '<div style="background-color:' + ciconbgcolormetadata + '; color:' + ciconiconcolormetadata + '">' + ciconiconmetadata + '</div>';
			} else {
				cicon = '<div style="background-color:' + ciconbgcolorother + '; color:' + ciconiconcolorother + '">' + ciconiconother + '</div>';
			}
		}

		// Set packagename
		let pack = suggestion.package;

		return {
			displayText: suggestion.displaytext,
			snippet: suggestion.snippet,
			descriptionMoreURL: suggestion.descriptionMoreURL,
			leftLabel: suggestion.type,
			rightLabel: pack,
			iconHTML: cicon,
			type: actype,
			descriptionMarkdown: desc
		};
	}
}
export default new ChefProviderRecipes();
