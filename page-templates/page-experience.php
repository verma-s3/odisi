<?php
  global $post;
/*
  Template Name: Experience
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

$home_page_id = 7;
$context['connect'] = get_field( 'connect', $home_page_id );   
$context['testimonials'] = get_field( 'testimonials', $home_page_id );   


$templates = array( 'page-experience.twig' );
Timber::render( $templates, $context );



