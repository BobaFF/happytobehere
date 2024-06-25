jQuery(document).ready(() => {
    immagini();
    /*SCRIPT INSERITO PER STAGING - IMMAGINI*/
    function immagini() {jQuery('img').each(function() {
        var currentSrc = jQuery(this).attr('src');
        if (currentSrc.startsWith('https://wordpress-77517-662570.cloudwaysapps.com/')) {
            var newSrc = currentSrc.replace('https://wordpress-77517-662570.cloudwaysapps.com/', 'https://happytobehere.it/');
            jQuery(this).attr('src', newSrc);
        }
    });}

    
    //MOBILE MENU
    let menu_toggler = jQuery("#menu-toggler");
    let menu_close = jQuery(".closemenu-btn");
    let mobile_menu = jQuery("#mobile-menu");

    menu_toggler.on("click", function () {
        mobile_menu.addClass("show");
    })
    menu_close.on("click", function () {
        mobile_menu.removeClass("show");
    })
    
    //HEADER
    let titleRow = jQuery("#title-row");
    let titleRowHeight = titleRow.height() + 90;
    let stickyTitle = jQuery("#sticky-menu div h1");
    let stickyMenu = jQuery("#sticky-menu");
    let searchContainer = jQuery("div.asl_w_container.asl_w_container_1");
    let toTopBtn = jQuery("a#to-top");

    jQuery(window).scroll(function () {
        let scrollTop = jQuery(this).scrollTop();

        if (scrollTop >= titleRowHeight) {
            stickyTitle.removeClass("d-none");
            stickyTitle.addClass("d-xxl-block");
            stickyMenu.addClass("scroll");
            searchContainer.addClass("hidden");
            toTopBtn.removeClass("nascosto");
        }
        else {
            stickyTitle.addClass("d-none");
            stickyTitle.removeClass("d-xxl-block");
            stickyMenu.removeClass("scroll");
            searchContainer.removeClass("hidden");
            toTopBtn.addClass("nascosto");
        }
    })

    //ARTICLE - Table of contents
    let h2 = jQuery("h2.wp-block-heading");
    let list = jQuery("<ol></ol>");
    let index = jQuery("#list-of-contents");
    Array.from(h2).forEach(heading => {
        let text = jQuery(heading).text();;
        let id = text.replace(/\s+/g, "-");
        jQuery(heading).attr("id", id);
    });
    Array.from(h2).forEach(heading => {
        let id = jQuery(heading).attr("id");
        let text = jQuery(heading).text();
        let list_item = jQuery("<li></li>");
        let link = jQuery("<a></a>").attr("href", "#" + id).text(text);
        list_item.append(link);
        list.append(list_item);
    })
    index.append(list);

    //IMPORTATO DA CAROUSEL DI GIROLIBERO
    jQuery(function ($) {
        $('.carousel-std-js').each(function (index, el) {
            var customNav = $(el).parent().parent().find('.pagination-default');
            var owl = $(el).owlCarousel({
                loop: false,
                rewind: false,
                margin: 23,
                dots: false,
                nav: true,
                navText: ["<i class='icon-arrow-left indicator-xl'></i>", "<i class='icon-arrow-right indicator-xl'></i>"],
                autoWidth: true,
                navContainer: customNav,
                checkVisible: false
            });
        });

        $('.carousel-1-item-js').each(function (index, el) {
            var customNav = $(el).parent().parent().find('.pagination-default');
            var owl = $(el).owlCarousel({
                loop: false,
                rewind: false,
                margin: 15,
                dots: false,
                nav: true,
                navText: ["<i class='icon-arrow-left indicator-xl'></i>", "<i class='icon-arrow-right indicator-xl'></i>"],
                items: 1,
                navContainer: customNav,
                checkVisible: false
            });
        });


        $(window).on('load resize orientationchange', function () {
            //var allowScrollBody = false;
            var homeCarousel = $('.mobile-home-carousel');

            if (window.innerWidth < 992) {
                homeCarousel.addClass('owl-carousel');

                homeCarousel.each(function (index, el) {
                    var owl = $(el).owlCarousel({
                        autoplay: true,
                        autoplayTimeout: 7000,
                        loop: false,
                        margin: 0,
                        nav: false,
                        dots: true,
                        dotsEach: 1,
                        items: 1,
                        autoWidth: true,
                        responsive: {
                            768: {
                                loop: true,
                                dots: true,
                                autoWidth: true,
                            }
                        }
                    });
                });
            }
            else {
                homeCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                homeCarousel.find('.owl-stage-outer').children().unwrap();
            }
        });
    });
    //FINE CAROUSEL

    //SEARCH BAR
    let delSearchBtn = jQuery("div.proclose");
    let SearchInput = jQuery("input.orig");
    let searchToggler = jQuery(".search-mobile-toggler");
    let searchBarContainer = jQuery("div.probox");
    //let searchResultsCounter =  jQuery(".post_number");
    function mobileSearchInput() {
        SearchInput.on("blur", () => {
            searchToggler.addClass("searchOpacity");
            searchToggler.prop('disabled', false);
            searchContainer.removeClass("searchOpacity");
            SearchInput.prop('disabled', true);

            if (window.scrollY >= titleRowHeight) {
                stickyTitle.addClass("searchOpacity");
                stickyTitle.removeClass("d-none");
                stickyMenu.removeClass("searchContent");
            }
            if (SearchInput.val() == "") {
                stickyMenu.removeClass("searchContent");
            }
        });
    }
    function mobileSearchToggler() {
        searchToggler.on("click", () => {
            searchToggler.removeClass("searchOpacity");
            searchToggler.prop('disabled', true);
            SearchInput.prop('disabled', false);
            searchContainer.addClass("searchOpacity");
            stickyMenu.addClass("searchContent");
            stickyTitle.addClass("d-none");
            SearchInput.focus();
        });
    }
    function mobileSearch() {
        if (window.innerWidth < 768) {
            if (SearchInput.val() != "") {
                searchToggler.removeClass("searchOpacity");
                searchContainer.addClass("searchOpacity");
                SearchInput.prop('disabled', false);
            } else {
                SearchInput.prop('disabled', true);
            }
            
            mobileSearchInput();
            mobileSearchToggler();
    
        }/* else {
            SearchInput.off();
            SearchInput.prop('disabled', false);
            searchToggler.off();
        }*/
    }
    function searchResize() {
        if (window.innerWidth > 768) {
            SearchInput.off();
            SearchInput.prop('disabled', false);
            searchToggler.off();
            searchToggler.prop('disabled', false);
        }
        else {
            mobileSearchInput();
            SearchInput.prop('disabled', true);
            mobileSearchToggler();
        }
    }

    if (SearchInput && jQuery(SearchInput).val() && delSearchBtn)
        jQuery(delSearchBtn).addClass("d-block");

    if (jQuery('body[data-searchpage="true"] .archive-results-number').length !== 0) {
        //postNumber = jQuery("<span class=\"post_number searchContent\">" + post_number + " risultati</span>")
        //SearchInput.before(postNumber);
        stickyMenu.addClass("searchContent");
        searchBarContainer.addClass("searchContent");
        stickyMenu.addClass("searchContent");
        /*jQuery(SearchInput).on('input', () => {
            postNumber.remove();
        })*/
    }

    searchContainer.addClass("d-md-block");
    jQuery(window).on('load', mobileSearch);

    //Solo in caso di resize orizzontale
    let lastWidth = jQuery(window).width();
    jQuery(window).on('resize', function() {
        var currentWidth = jQuery(window).width();
        if (lastWidth !== currentWidth) {
            searchResize();
            lastWidth = currentWidth; 
        }
    })


    //SHOW MORE POSTS
    let morePostButton = jQuery("#load-more-posts");
    let morePostLoader = jQuery("#more-posts-loader");
    let body = jQuery("body");
    let postListContainer = jQuery("#post-list-container");
    let counterPage = 2;
    morePostButton.on("click", (event) => {
        let archive_type = jQuery("body").data("archivetype");
        let data = {
            'action': 'load_more_posts',
            'page': counterPage
        }
        switch (archive_type) {
            case "author":
                data['author'] = body.data("archivevalue");
                break;
            case "category":
                data['category'] = body.data("archivevalue");
                break;
            case "tag":
                data['tag'] = body.data("archivevalue");
                break;
            case "destinazione":
            case "citta": 
            case "regione":
                data['taxonomy'] = body.data("archivevalue");
                data['term'] = body.data("archivetype");
                break;
            case "popular":
                data['popular'] = "popular";
                break;
        }
        counterPage++;
        event.preventDefault();
        morePostButton.addClass("d-none");
        morePostLoader.removeClass("d-none");
        jQuery.ajax({
            type: "POST",
            url: siteUrl + "/wp-admin/admin-ajax.php",
            data: data,
            success: function (data) {
                if (data) {
                    morePostLoader.addClass("d-none");
                    morePostButton.removeClass("d-none");
                    postListContainer.append(data);
                    let newsletter_container = jQuery("#newsletter-container");
                    postListContainer.append(newsletter_container);
                    if (jQuery("#post-list-container .last_archive_posts").length != 0)
                        morePostButton.remove();
                    immagini();
                }

            },
            error: function () {
                morePostLoader.addClass("d-none");
                morePostLoader.after("<p>Impossibile caricare altri articoli</p>");
            }
        });
    })

    //NEWSLETTER
    let newsletterForm = jQuery("#mc4wp-form-1 .mc4wp-form-fields");
    if (newsletterForm) {
        newsletterForm.addClass("d-flex flex-column h-100");
        let inputFields = jQuery('#mc4wp-form-1 .mc4wp-form-fields input[type="text"], #mc4wp-form-1 .mc4wp-form-fields input[type="email"]');
        let submitBtn = jQuery('#mc4wp-form-1 .mc4wp-form-fields input[type="submit"]');
        let emailInput = jQuery('#mc4wp-form-1 .mc4wp-form-fields input[type="email"]');

        let emptyFieldMessage = jQuery('<span class="messageError">Campo obbligatorio.</span>');
        let mailError = jQuery('<span class="messageError">L\'indirizzo email inserito non è valido.</span>');

        let newsletterResponse = jQuery(".mc4wp-response");

        function checkEmail(email) {
            var regExp = /^([\w\-\+\.]+){2,}\@([\w\-\+\.]+){2,}\.([\w\-\+\.]+){2,4}$/;
            return regExp.test(email)
        }

        inputFields.each(function () {
            jQuery(this).on("blur", function () {
                if (jQuery(this).val() == "") {
                    jQuery(this).addClass("error");
                    if (!jQuery(this).next(".messageError").length)
                        jQuery(this).after(emptyFieldMessage.clone());
                }
                else {
                    jQuery(this).removeClass("error");
                    jQuery(this).next(".messageError").remove();
                }
            })
        });

        emailInput.on("blur", function () {
            if (!checkEmail(jQuery(this).val())) {
                jQuery(this).addClass("error");
                if (!jQuery(this).next(".messageError").length)
                    jQuery(this).after(mailError.clone());
            }
            else {
                jQuery(this).removeClass("error");
                jQuery(this).next(".messageError").remove();
            }
        })

        emailInput.on("input", function () {
            if (!checkEmail(jQuery(this).val()))
                jQuery(this).addClass("error");
            else {
                jQuery(this).removeClass("error");
            }
            if (jQuery(this).next(".messageError").length)
                jQuery(this).next(".messageError").remove();
        })


        submitBtn.on("click", function (event) {
            inputFields.each(function () {
                if (jQuery(this).val() == "") {
                    event.preventDefault();
                    jQuery(this).addClass("error");
                    if (!jQuery(this).next(".messageError").length)
                        jQuery(this).after(emptyFieldMessage.clone());
                }
                else if (jQuery(this).attr('type') == "email" && !checkEmail(jQuery(this).val())) {
                    event.preventDefault();
                    jQuery(this).addClass("error");
                    if (!jQuery(this).next(".messageError").length)
                        jQuery(this).after(emptyFieldMessage.clone());
                }

            })
        })
        //Inserisce l'esito del form subito dopo il titolo della newsletter
        if(newsletterForm.find(newsletterResponse))
            jQuery("#mc4wp-form-1").before(newsletterResponse);
    }

    //MAP
    const SHIFT = 0.003;
    let page_map = jQuery("#map");
    function showTitle(){
        if (window.innerWidth < 576) {
            stickyTitle.removeClass("d-none");
            stickyTitle.addClass("d-block");
            stickyMenu.addClass("scroll");
            searchContainer.addClass("hidden");
        } else {
            stickyTitle.addClass("d-none");
            stickyTitle.removeClass("d-block");
            stickyMenu.removeClass("scroll");
            searchContainer.removeClass("hidden");
        }
    }
    function modificaCoordinate(obj) {
        for (let key in obj) {
            if (key === 'coordinates' && Array.isArray(obj[key])) {
                obj[key] = obj[key].map(coord => coord +  (Math.random()*SHIFT) - SHIFT / 2); 
            } else if (typeof obj[key] === 'object') {
                modificaCoordinate(obj[key]);
            }
        }
    }
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lyb2xpYmVybyIsImEiOiJjbHd1Y29tb3UwYmkzMnNzNzUwMm1rNndtIn0.SMLktuuixDnEolgMMvHIvw';
    
    if(page_map.length > 0) {
        toTopBtn.addClass("d-none");
            jQuery(window).on('load', showTitle());
            jQuery(window).on('resize', showTitle());
        SearchInput.on("blur", () => {
            stickyTitle.removeClass("d-none");
        })

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/girolibero/clwyukpx3019r01pc3vb44lu4',
        center: [12, 41.5], // starting position [lng, lat]
        zoom: 3,
    });
    modificaCoordinate(posts_coordinates);
    map.on('load', () => {
        map.loadImage(
            siteUrl + '/wp-content/themes/happytobehere-theme/assets/img/pin-3x.png',
            (error, image) => {
                if (error) throw error;
                map.addImage('girolibero-marker', image);

        map.addSource('posts', {
            type: 'geojson',
            data: posts_coordinates,
            generateId: true, // This ensures that all features have unique IDs
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50 
        });
        map.addControl(new mapboxgl.FullscreenControl());
        
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'posts',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-stroke-color': '#FF0',
                    'circle-stroke-width': 1.5,
                    'circle-color': '#FFF',
                    'circle-radius': 12
                }
            });
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'posts',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'symbol',
                source: 'posts',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': 'girolibero-marker', 
                    'icon-size': 0.5,
                    'icon-offset': [14, 0],
                    'icon-allow-overlap': true 
                }
            });
        });
    
    });
    

    let post_id = null;
    
    //hover
    map.on('mousemove', ['unclustered-point', 'clusters'], (event) => {
        map.getCanvas().style.cursor = 'pointer';
    })
    map.on('click', 'unclustered-point', (event) => {
        map.flyTo({
            center: event.features[0].geometry.coordinates,
            duration: 1000,
            zoom: 7
        });
        const popup = new mapboxgl.Popup({ closeOnClick: true, closeButton: false, className: "articolo-map-popup"})
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML('<a class="d-flex" href="'+event.features[0].properties.url+'"><span>'+JSON.parse(event.features[0].properties.category)[0]+'</span><img src="'+event.features[0].properties.img_url+'"><div><p>'+ (event.features[0].properties.title.length > 45 ? event.features[0].properties.title.substring(0, 44) + "..." : event.features[0].properties.title)+'</p><time>' +event.features[0].properties.date +'</time></div></a>')
            .setOffset({
                'top': [0, 20],
                'bottom': [0, -15],
                'left': [15, 0],  
                'right': [-15, 0],  
                'bottom-left': [18, -18],
                'bottom-right': [-18, -18],
                'top-left': [18, 18],
                'top-right': [-18, 18]
            })
            .addTo(map)
        if (event.features.length === 0) 
            return;
        if(post_id){
            map.removeFeatureState({
              source: 'posts',
              id: post_id
            });
          }

          post_id = event.features[0].id;

          map.setFeatureState(
            {
                source: 'posts',
                id: post_id
            },
            {
                hover: true
            }
          );
    
    })
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('posts').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });
    map.on('mouseleave', ['unclustered-point', 'clusters'], () => {
        map.getCanvas().style.cursor = '';
    })
}

//ACCESSIBILITÀ
//Inserimento pulsanti di submit nei form della barra di ricerca
var form1 = jQuery("#ajaxsearchlite1 .proinput form input[type='submit']");
var form2 = jQuery("#__original__ajaxsearchlitesettings1 form");
var submiFormBtn = jQuery('<input>', {
    type: 'submit',
    value: 'Search',
    class: 'A'
    //class: ''
})
form1.css({
    'visibility': 'visible',
    'width': '1px',
    'height': '1px',

});
form2.append(submiFormBtn.clone());


})
