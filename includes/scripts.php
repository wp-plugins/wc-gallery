<?php
/**
 * This file loads the CSS and JS necessary for your shortcodes display
 * @package wc Shortcodes Plugin
 * @since 1.0
 * @author AJ Clarke : http://wpexplorer.com
 * @copyright Copyright (c) 2012, AJ Clarke
 * @link http://wpexplorer.com
 * @License: GNU General Public License version 2.0
 * @License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */
if( !function_exists ('wc_gallery_scripts') ) :
	function wc_gallery_scripts() {
		$ver = WC_GALLERY_VERSION;

		if ( get_option( WC_GALLERY_PREFIX . 'enable_shortcode_css', true ) ) {
			wp_enqueue_style( 'wc-gallery-style', plugin_dir_url( __FILE__ ) . 'css/style.css', array( ), $ver );
		}

		// Masonry
		wp_deregister_script( 'jquery-masonry' );
		wp_register_script( 'jquery-masonry', plugin_dir_url( __FILE__ ) . 'js/masonry.pkgd.min.js', array( ), '3.1.2', true );
		wp_enqueue_script( 'jquery-masonry' );

		// jQuery
		wp_enqueue_script('jquery');

		// Gallery Shortcode
		wp_enqueue_style( 'wc-gallery-popup-style', plugin_dir_url( __FILE__ ) . 'css/magnific-popup.css', array( ), '2.1.5' );
		wp_enqueue_style( 'wc-gallery-flexslider-style', plugin_dir_url( __FILE__ ) . 'js/flexslider/flexslider.css', array( ), '2.2.0' );
		wp_register_script( 'wc-gallery-popup', plugin_dir_url( __FILE__ ) . 'js/jquery.magnific-popup.min.js', array ( 'jquery' ), '0.9.8', true );
		wp_register_script( 'wc-gallery-flexslider', plugin_dir_url( __FILE__ ) . 'js/flexslider/jquery.flexslider-min.js', array ( 'jquery' ), '2.2.0', true );
		wp_register_script( 'wc-gallery', plugin_dir_url( __FILE__ ) . 'js/gallery.js', array ( 'jquery' ), $ver, true );
		wp_register_script( 'wc-gallery-woocommerce-product', plugin_dir_url( __FILE__ ) . 'js/woocommerce.product.js', array( 'jquery' ), $ver, true );

		if ( WC_GALLERY_USING_WOOCOMMERCE ) {
			$lightbox_en = get_option( 'woocommerce_enable_lightbox' ) == 'yes' ? true : false;
			if ( ! $lightbox_en && ( is_singular( array( 'product' ) ) || ( ! empty( $post->post_content ) && strstr( $post->post_content, '[product_page' ) ) ) ) {
				wp_enqueue_script( 'wc-gallery-popup' );
				wp_enqueue_script( 'wc-gallery-woocommerce-product' );
			}
		}

	}
	add_action('wp_enqueue_scripts', 'wc_gallery_scripts');
endif;

function wc_gallery_enqueue_admin_scripts() {
	wp_register_script( 'wc-gallery-admin-js', plugin_dir_url( __FILE__ ) . 'js/admin.js', array ( 'jquery' ), WC_GALLERY_VERSION, true );
	wp_enqueue_script( 'wc-gallery-admin-js' );
}
add_action('admin_enqueue_scripts', 'wc_gallery_enqueue_admin_scripts' );
