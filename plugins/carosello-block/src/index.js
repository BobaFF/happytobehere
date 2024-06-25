/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	icon: {
		src: <svg
		id="logo"
		data-name="logo"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 27 27"
	  >
		<rect width="27" height="27" fill="#ffff00"></rect>
		<path d="M17,19.36a5.09,5.09,0,0,1-4.61-3l-1.82,1.82L5,12.61v-3L6.88,7.64H9.2L10.54,9l1.33-1.34H14.2l1.67,1.68a5.09,5.09,0,0,1,2.6.11l.24.08.45.19a5.07,5.07,0,0,1,.64.37,5.27,5.27,0,0,1,1.08,1,5,5,0,0,1,.65,1h0a5.09,5.09,0,0,1,0,4.4,5,5,0,0,1-1.73,2,5,5,0,0,1-.64.36,3.62,3.62,0,0,1-.45.2l-.24.08a5.12,5.12,0,0,1-1.51.23M5.88,12.23l4.65,4.66,4.66-4.66V10.11l-.08-.25-1.29-1.3H12.25L10.82,10h-.57L8.82,8.56H7.26L5.89,9.94Zm7.17,3.44A4.19,4.19,0,0,0,17,18.44a4,4,0,0,0,1.24-.19l.19-.06.37-.16a3.72,3.72,0,0,0,.52-.3,4.23,4.23,0,0,0,1.43-1.65h0a4.12,4.12,0,0,0,.4-1.8,4.19,4.19,0,0,0-.4-1.81,4.62,4.62,0,0,0-.54-.84,4.17,4.17,0,0,0-.88-.8,5.54,5.54,0,0,0-.53-.3,3.17,3.17,0,0,0-.37-.16l-.19-.06a4,4,0,0,0-2.1-.1v2.4Z"></path>
	  </svg>
	},
	
	edit: Edit,
} );
