<?php
use Timber\Timber;
gt_set_post_view();
$context = Timber::context();
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

$author_id = get_the_author_meta('ID');
$context['author_img'] = get_avatar_url($author_id, ['size' => 400]);

Timber::render('pages/singular.twig', $context);
?>