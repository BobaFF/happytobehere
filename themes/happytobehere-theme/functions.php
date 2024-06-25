<?php

use Timber\Timber;

require_once __DIR__ . '/vendor/autoload.php';

Timber::init();

function enqueue_assets()
{
    wp_enqueue_script('jquery', "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js");
    wp_enqueue_style("style", get_stylesheet_directory_uri() . "/assets/css/style.css");
    wp_enqueue_style('owlcarousel2', "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css");
    wp_enqueue_script('owlcarousel2', "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js");
    wp_enqueue_script("main", get_stylesheet_directory_uri() . "/assets/js/main.js");
    //wp_enqueue_script("main", get_stylesheet_directory_uri() . "/dist/main.js");
}

/////
function gt_get_post_view()
{
    $count = get_post_meta(get_the_ID(), 'post_views_count', true);
    return $count;
}

function gt_set_post_view()
{
    $key = 'post_views_count';
    $post_id = get_the_ID();
    $count = (int) get_post_meta($post_id, $key, true);
    $count++;
    update_post_meta($post_id, $key, $count);
}

function gt_posts_column_views($columns)
{
    $columns['post_views'] = 'Views';
    return $columns;
}

function gt_sortable_columns($columns)
{
    $columns = array(
        'post_views' => "Views"
    );
    return $columns;
}

function my_column_sorter($vars)
{
    if (array_key_exists('orderby', $vars)) {
        if ('Views' == $vars['orderby']) {
            $vars['orderby'] = 'meta_value';
            $vars['meta_key'] = 'post_views';
        }
    }
    return $vars;
}

function gt_posts_custom_column_views($column)
{
    if ($column === 'post_views') {
        echo gt_get_post_view();
    }
}
function wpse_modify_taxonomy()
{
    $country_category_args = get_taxonomy('destinazione'); // returns an object
    $labels = array(
        'name' => _x('Paesi', 'taxonomy general name'),
        'singular_name' => _x('Paese', 'taxonomy singular name'),
        'search_items' =>  __('Search Paesi'),
        'all_items' => __('All Paesi'),
        'parent_item' => __('Parent Topic'),
        'parent_item_colon' => __('Parent Topic:'),
        'edit_item' => __('Edit Topic'),
        'update_item' => __('Update Topic'),
        'add_new_item' => __('Add New Topic'),
        'new_item_name' => __('New Topic Name'),
        'menu_name' => __('Paesi'),
    );
    $country_category_args->labels = $labels;
    $country_category_args->show_admin_column = true;
    $country_category_args->rewrite['slug'] = 'paese';
    $country_category_args->rewrite['with_front'] = false;
    register_taxonomy('destinazione', 'post', (array) $country_category_args);
}
// hook it up to 11 so that it overrides the original register_taxonomy function
add_action('init', 'wpse_modify_taxonomy', 11);

add_filter('manage_posts_columns', 'gt_posts_column_views');
add_filter("manage_edit_posts_sortable_columns", 'gt_sortable_columns');
add_filter("request", 'my_column_sorter');

add_action('manage_posts_custom_column', 'gt_posts_custom_column_views');

add_action("wp_enqueue_scripts", "enqueue_assets");
/* Disable WordPress Admin Bar for all users */
add_filter('show_admin_bar', '__return_false');

//AJAX
add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts');
add_action('wp_ajax_load_more_posts', 'load_more_posts');

function load_more_posts()
{
    $context = Timber::context();

    $postArchive = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => 10,
        'paged' => $_POST['page'],
        'has_password' => FALSE
    );

    $postCounter = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    );

    if (isset($_POST['author'])) {
        $postArchive['author'] = $_POST['author'];
        $postCounter['author'] = $_POST['author'];
    } else if (isset($_POST['category'])) {
        $postArchive['category__in'] = (array)$_POST['category'];
        $postCounter['category__in'] = (array)$_POST['category'];
        $context['category_info'] = Timber::get_term($_POST['category']);
    } else if (isset($_POST['tag'])) {
        $postArchive['tag__in'] = (array)$_POST['tag'];
        $postCounter['tag__in'] = (array)$_POST['tag'];
    } else if (isset($_POST['popular'])) {
        $postArchive['meta_key'] = 'post_views_count';
        $postArchive['orderby'] = 'meta_value_num';
        $postCounter['meta_key'] = 'post_views_count';
    } else if (isset($_POST['taxonomy'])) {
        $postArchive['tax_query'] = array(
            array(
                'taxonomy' => $_POST['term'], 
                'field'    => 'term_id',
                'terms'    => $_POST['taxonomy']
            )
        );
        $postCounter['tax_query'] =  array(
            array(
                'taxonomy' => $_POST['term'], 
                'field'    => 'term_id',
                'terms'    => $_POST['taxonomy']
            )
        );
    }


    $context['post'] = Timber::get_posts($postArchive);

    $count = count(Timber::get_posts($postCounter));

    if ($count <= $_POST['page'] * 10)
        $context['ended'] = true;
    else $context['ended'] = false;
    Timber::render('components/posts_list.twig', $context);
    die();
}

//COORDINATES CUSTOM FIELD
function add_coordinates_metabox()
{
    add_meta_box(
        'coordinates_metabox', //meta_box_id
        'Coordinate Geografiche', //title
        'render_coordinates_metabox', //callback_fn
        'post', //WP_screen
        'side', //context - barra laterale
        'high' //priority
    );
}
add_action('add_meta_boxes', 'add_coordinates_metabox');

function render_coordinates_metabox($post)
{
    wp_nonce_field('save_coordinates', 'add_coordinates_metabox'); //Campo nonce, stringa di sicurezza


    $coordinates = get_post_meta($post->ID, 'coordinates', true); //Restituisci le coordinate in un unico array
    $coordinates = !empty($coordinates) ? $coordinates : [];

    $form = '<div>
            <button type="button" class="components-button is-link" id="add_coordinate">Aggiungi coordinate</button>
            <p class="css-1n1x27z">Inserisci le coordinate in questo formato: 12.34567890</p>
            </div>
            <div id="coordinates_container">';
    foreach ($coordinates as $index => $coordinate) {
        //esc attr serve a rendere sicuri attributi html
        $form .=
            '<div class="coordinate_item">
                <span class="css-1v57ksj">Punto ' . ($index + 1) . '</span>
                <button type="button" class="components-button is-link remove_coordinate">Rimuovi</button>
                <div>
                <label for="coordinates[' . $index . '][latitudine]">Latitudine</label>
                <input type="text" name="coordinates[' . $index . '][latitudine]" value="' . esc_attr($coordinate['latitudine']) . '" placeholder="Latitudine" />
                <label for="coordinates[' . $index . '][longitudine]">Longitudine</label>
                <input type="text" name="coordinates[' . $index . '][longitudine]" value="' . esc_attr($coordinate['longitudine']) . '" placeholder="Longitudine" />
                </div>
            <br>
            </div>';
    }
    $form .=    '</div>';
    echo $form;
?>
    <script>
        jQuery(document).ready(function() {
            jQuery(document).on('click', '.remove_coordinate', function() {
                jQuery(this).closest('.coordinate_item').remove();
            })
            let coordinates_container = jQuery("#coordinates_container");
            jQuery("#add_coordinate").on("click", function() {
                let index = coordinates_container.find(".coordinate_item").length;
                coordinates_container.append(
                    '<div class="coordinate_item">' +
                    '<span class="css-1v57ksj">Punto ' + (index + 1) + '&nbsp;</span>' +
                    '<button type="button" class="components-button is-link remove_coordinate">Rimuovi</button>' +
                    '<div>' +
                    '<label for="coordinates[' + index + '][latitudine]" >Latitudine</label>' +
                    '<input type="text" name="coordinates[' + index + '][latitudine]" placeholder="Latitudine" />' +
                    '<label for="coordinates[' + index + '][longitudine]" >Longitudine</label>' +
                    '<input type="text" name="coordinates[' + index + '][longitudine]" placeholder="Longitudine" />' +
                    '</div>' +
                    '</div>'
                );
            });

        })
    </script>
<?php
}

//Per salvare i dati del metabox
function save_coordinates_metabox($post_id)
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['coordinates']) && is_array($_POST['coordinates'])) {
        $coordinates = array_values(array_filter(array_map(function ($coordinate) {
            if ($coordinate['latitudine'] == "" || $coordinate['longitudine'] == "") return;
            return [
                'latitudine' => sanitize_text_field($coordinate['latitudine']),
                'longitudine' => sanitize_text_field($coordinate['longitudine']),
            ];
        }, $_POST['coordinates'])));
        update_post_meta($post_id, 'coordinates', $coordinates);
    } else delete_post_meta($post_id, 'coordinates');
}
add_action('save_post', 'save_coordinates_metabox');
?>