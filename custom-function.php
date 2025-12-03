<?php

    // Adding a function.
    $twig->addFunction( new Timber\Twig_Function( 'section_heading', function ($pre= null, $post=null, $field='title') {
        $heading = get_field($field);
        if( !empty($heading) ) {
            echo $pre . $heading . $post;
        }
    }) );

    $twig->addFunction( new Timber\Twig_Function( 'section_text', function ($pre= null, $post=null, $field='content') {
        $content = get_field($field);
        if( !empty($content) ) {
            echo $pre . $content . $post;
        }
    }) );
    
?>