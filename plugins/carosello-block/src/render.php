<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if (!empty($attributes['codweb']))
	$codwebArray = $attributes['codweb'];
else
	$codwebArray = ["ABC"];

$string = file_get_contents('https://www.girolibero.it/api/cron_wp_info.php?get_tours=1&lan=it');
$array = (array)json_decode($string);

$isSingle = "singular";
if (sizeof($codwebArray) > 1)
	$isSingle = "";

$output = '
<section class="content-home-section carousel home-carousel">
<div class="section-container">
<div class="section-carousel">
<div class="carousel-par">
    <div class="carousel-cont">
        <nav class="pagination-default '.$isSingle.'"></nav>
        <div class="owl-carousel-cont">
            <div class="owl-carousel carousel-std-js">';

foreach ($codwebArray as $codweb) {
	foreach ($array as $trip) {
		if ($codweb == $trip->codweb) {
			$output .= '
					<a href="https://www.girolibero.it/viaggio/' . $trip->url . '" class="item-home owl-carousel-item" target="_blank">
						<div class="item-img-cont">
							<img src="' . 'https://res.cloudinary.com/dxvgecjzm/image/upload/w_768,c_scale/f_auto/'.(json_decode($trip->thumbnail_cloudinary))->_public_id . '" alt=""  class="item-img wp-image-72793" loading="lazy">
						</div>
						<div class="item-texts justify-content-between">
                        	<div class="item-texts-top">
                        		<p class="title">' . $trip->tour . '</p>
                            	<p class="subtitle">' . $trip->activities_name[0]->name . ' ' . $trip->formula->name . '</p>
                        	</div>
							<p class="giroliberoBtn d-none d-md-block">girolibero.it</p>
                    	</div>
					</a>
				';
			break;
		}
	}
}
$output .= '
</div>
</div>           
</nav>
</div>
</div>
</div>
</div>
</section>';
?>
<p <?php echo get_block_wrapper_attributes(); ?>>

	<?php echo $output ?>
</p>