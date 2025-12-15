
<?php
  global $post;
/*
  Template Name: Hospitality partners
*/
/**
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Odisi
 */


/****************************************************
 * STORE ALL LOGIC IN CONTEXT AND OUTPUT TO VIEW
 ***************************************************/
$context = Timber::context();
$context['field'] = new Timber\Post();
$templates = array( 'page-hospitality-partners.twig' );
Timber::render( $templates, $context );



