<?php
use Timber\Timber;

$context = Timber::context();

$context['post'] = Timber::get_posts();
$context['results_counter'] = $context['post']->found_posts;
//MENU
$context['about_menu'] = Timber::get_menu('top');
$context['category_menu'] = Timber::get_menu('main');


$context['tags'] = Timber::get_terms([
    'taxonomy' => 'post_tag',
    'orderby' => 'count',
    'order' => 'DESC'
]);

$context['most_viewed_posts'] = Timber::get_posts(array(
    'post_type'      => 'post',
    'posts_per_page' => 10, 
    'meta_key'       => 'post_views_count',
    'orderby'        => 'meta_value_num',
    'order'          => 'DESC'
));

$context['title'] = 'Search results for: ' . get_search_query();

Timber::render('pages/search.twig', $context); 

?>