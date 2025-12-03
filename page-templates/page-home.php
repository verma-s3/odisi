<?php
  global $post;
/*
  Template Name: Home
*/
/**
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Theme name
 */
/****************************

 * QUERY FEATURED RECIPES

 ***************************/

$recipeArgs = [
  'post_type' => 'recipe',
  'post_status' => 'publish',
  'posts_per_page' => -1,
  'meta_query' => [
    [
      'key' => 'featured',
      'value' => true,
      'Compare' => 'IN'
    ]
  ]
];

/****************************************************
 * STORE ALL LOGIC IN CONTEXT AND OUTPUT TO VIEW
 ***************************************************/
$context = Timber::context();
$context['field'] = new Timber\Post();
$context['recipes'] = Timber::get_posts($recipeArgs);
$templates = array( 'page-home.twig' );
Timber::render( $templates, $context );



