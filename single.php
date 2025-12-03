<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
// $blumenortArgs = [
// 	'post_type' => 'blumenort',
// 	'posts_per_page' => -1,
// 	'post_status' => 'publish',
// 	'order'   => 'ASC',
// 	'post__not_in' => array(get_the_ID()), // or array($post->ID)
//  'orderby'        => 'rand',
// ];
$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;


// $context['blumenort'] = Timber::get_posts($blumenortArgs);

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig' ), $context );
}
