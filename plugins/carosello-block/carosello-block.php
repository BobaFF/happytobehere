<?php
/**
 * Plugin Name:       Carosello block
 * Description:       Il blocco del carosello
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Francesco, Nicola
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       carosello-block
 *
 * @package CaroselloBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function carosello_block_carosello_block_block_init() {
	register_block_type( __DIR__ . '/build' );
	$jsonData = file_get_contents('https://www.girolibero.it/api/cron_wp_info.php?get_tours=1&lan=it');
	wp_enqueue_script( 'data-script', get_template_directory_uri() . '/js/script.js' );
	wp_add_inline_script( 'data-script', 'var jsonData = ' . $jsonData, 'before' );

}
add_action( 'init', 'carosello_block_carosello_block_block_init' );
