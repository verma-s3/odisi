<?php
  global $post;
/*
  Template Name: About Us
*/
/**
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Odisi
 */
/****************************

 * QUERY FEATURED RECIPES

 ***************************/

 $teamArgs = [
  'post_type' => 'team',
  'post_status' => 'publish',
  'posts_per_page' => -1,
];

/****************************************************
 * STORE ALL LOGIC IN CONTEXT AND OUTPUT TO VIEW
 ***************************************************/
$context = Timber::context();
$context['field'] = new Timber\Post();
$context['teams'] = Timber::get_posts($teamArgs);
$templates = array( 'page-about-us.twig' );
Timber::render( $templates, $context );



