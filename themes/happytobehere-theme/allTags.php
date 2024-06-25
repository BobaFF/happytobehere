<?php
/*
   Template Name: TAG    
 */
use Timber\Timber;

$context = Timber::context();

$context['post'] = Timber::get_posts();

//MENU
$context['about_menu'] = Timber::get_menu('top');
$context['category_menu'] = Timber::get_menu('main');

$context['tags'] = Timber::get_terms([
    'taxonomy' => 'post_tag',
    'orderby' => 'count',
    'order' => 'DESC'
]);


$allTags = Timber::get_terms([
    'taxonomy' => 'post_tag',
    'orderby' => 'name',
    'order' => 'ASC'
]);


$context['most_viewed_posts'] = Timber::get_posts(array(
    'post_type'      => 'post',
    'posts_per_page' => 10, 
    'meta_key'       => 'post_views_count',
    'orderby'        => 'meta_value_num',
    'order'          => 'DESC'
));

$ordTags = array();
$slugs = array();
foreach($allTags as $tag) {
    $name = $tag->name;
    $key = strtoupper($name[0]);
    if(!isset($ordTags[$key])) {
        $ordTags[$key]=[];
    }
    $ordTags[$key][] = $name;
    $slugs[$name] = $tag->slug;
}

$context['ordinated_tags']  = $ordTags;
$context['tags_slug']  = $slugs;

$context['most_viewed_posts'] = Timber::get_posts(array(
    'post_type'      => 'post',
    'posts_per_page' => 10, 
    'meta_key'       => 'post_views_count',
    'orderby'        => 'meta_value_num',
    'order'          => 'DESC'
));

Timber::render('pages/allTags.twig', $context);
?>