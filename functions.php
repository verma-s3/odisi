<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site 
{
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts_and_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadGoogleFonts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadFavicon' ) );
		add_action( 'widgets_init', array( $this, 'widget_area' ) );
		add_action( 'login_head', array( $this, 'custom_login_logo' ) );
		add_filter( 'login_headerurl', array( $this, 'login_logo_url' ) );
		add_filter( 'login_headertext', array( $this, 'login_logo_url_title' ) );
		add_action( 'admin_menu', array( $this, 'remove_unecessary_menu_items' ) );
		add_action('init', array( $this,'remove_editor' ) );
		add_filter( 'timber_context', array( $this, 'options_page_global' ) );
		add_action('wp_before_admin_bar_render', array( $this, 'admin_custom_logo' ) );
		add_action( 'after_setup_theme', array( $this, 'theme_register_nav_menus' ) );
		add_action( 'after_setup_theme', array( $this, 'image_cropping_sizes' ) );
		add_action( 'after_setup_theme', array( $this, 'acf_options_page_for_theme' ) );
		add_action( 'init', array( $this, 'register_custom_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action('admin_head', array( $this, 'my_custom_fonts') );
		add_action( 'admin_menu', array( $this, 'remove_default_post_type') );
		add_action( 'wp_before_admin_bar_render', array( $this, 'my_admin_bar_render') );
		add_action( 'admin_menu', array( $this, 'my_remove_admin_menus') );
		add_action('init', array( $this, 'remove_comment_support'), 100);
		add_action( 'wp_before_admin_bar_render', array( $this, 'mytheme_admin_bar_render') );
		add_action( 'add_attachment', array( $this, 'my_set_image_meta_upon_image_upload') );
		add_filter('gform_submit_button', array($this, 'gravityFormButton'), 10, 2) ;
		parent::__construct();
	}

	public function gravityFormButton($button, $form) {
		if (empty($button)) {
			return $button;
		}
	
		$fragment = WP_HTML_Processor::create_fragment($button);
		$fragment->next_token();
	
		$attributes = array('id', 'type', 'class', 'onclick');
		$data_attributes = $fragment->get_attribute_names_with_prefix('data-');
	
		if (!empty($data_attributes)) {
			$attributes = array_merge($attributes, $data_attributes);
		}
	
		$new_attributes = array();
		foreach ($attributes as $attribute) {
			$value = $fragment->get_attribute($attribute);
			if (!empty($value)) {
				$new_attributes[] = sprintf('%s="%s"', $attribute, esc_attr($value));
			}
		}
	
		$label = esc_html($fragment->get_attribute('value'));
	
		return sprintf(
			'<button class="custom-btn" data-hover="%s" %s><span>%s</span></button>',
			$label,
			implode(' ', $new_attributes),
			$label
		);
	}
	

	/**
	 * My custom Twig functionality.
	 *
	 * @param \Twig\Environment $twig
	 * @return \Twig\Environment
	 */
	public function add_to_twig( $twig ) {
		require_once('custom-function.php');
		
		return $twig;
	} 
	
	/** This is where you can register custom post types. */
	public function register_custom_post_types() {
		
	}
	
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {
		
	}

	
	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		// Ensure $context is an array
		if ( ! is_array( $context ) ) {
			$context = [];
		}
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
		return $context;
	}


	/**
	 * Load Styles and Scripts Here
	 */
	public function scripts_and_styles() {
		wp_enqueue_style( 'dashicons' );
	
		// GSAP core + plugins
		wp_enqueue_script('gsap-js', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', array(), null, true);
		wp_enqueue_script('gsap-st', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', array('gsap-js'), null, true);
		wp_enqueue_script('gsap-smoother', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js', array('gsap-js', 'gsap-st'), null, true);
		wp_enqueue_script('gsap-split', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js', array('gsap-js'), null, true);
	
		// ✅ Add Lenis
		wp_enqueue_script('lenis', 'https://unpkg.com/lenis@1.3.16/dist/lenis.min.js', array(), null, true);
	
		// Your custom JS (depends on jQuery + GSAP)
		wp_enqueue_script('my-script', get_template_directory_uri() . '/static/js/all.min.js', array('jquery', 'gsap-js', 'gsap-st', 'gsap-smoother', 'gsap-split', 'lenis'), null, true);
	
		// CSS
		wp_enqueue_style('my-style', get_template_directory_uri() . '/static/css/main.css');
	
		// WP comments
		if ( is_singular() && comments_open() && get_option('thread_comments') ) {
			wp_enqueue_script('comment-reply');
		}
	}
	

	// *** login logo ***
	public function custom_login_logo() {
		echo '
			<style type="text/css">
				.login #login h1 a {
					background-image: url(' . get_stylesheet_directory_uri() . '/static/images/odisi-logo.svg);
					background-size: contain;
				background-position: center;
					width: 100%;
				}
				.login #login form label {
					color: white;
				}
				.login #login form .button-secondary:hover {
					opacity: 1;
				}
				.login #login #nav a, .login #login #backtoblog a {
					color: white;
					opacity: .7;
					transition: .3s;
				}
				.login #login #nav a:hover, .login #login #backtoblog a:hover {
					opacity: 1;
				}
		
				body {
					// background: #C29F71!important;
				}

				body{					
					background: #C29F71;
					background-image: url(' . get_stylesheet_directory_uri() . '/static/images/bg.jpg);
					background-attachment: fixed;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
		
				.login #login form {
					background: #000;
					// background: #5E574D;
					border: none;
					border-radius: 5px;
				}
				.login #login form .button-secondary {
					color: #5E574D;
					opacity: .7;
					transition: .3s;
				}
		
				.login #login form input:focus {
					border-color: #254925;
					box-shadow: 0 0 0 1px #254925;
				}
				.login #login form .button-primary {
					background: #254925;
					border-color: #254925;
					transition: .3s;
				}
		
				.login #login form .button-primary:hover {
					background: #BAC29C;
					border-color: #BAC29C;
					color: #000;
				}
			</style>';
	}

	// *** login URL ***
	public function login_logo_url() {
		return home_url();
	}

		
	// *** login title ***
	public function login_logo_url_title() {
		return 'odisi';
	}

	// *** Remove unecessary menu items for all but Administrators ***
	public function remove_unecessary_menu_items() {
		$user = wp_get_current_user();
		if ( ! $user->has_cap( 'manage_options' ) ) {
			remove_menu_page( 'edit-comments.php' );
			remove_menu_page( 'tools.php' );
			remove_menu_page( 'profile.php' );
		}
	}

	// *** Remove Editor ***
	public function remove_editor() {
		remove_post_type_support('page', 'editor');
	}

	/* Use Options Page Globally */
	public function options_page_global( $context ) {
		$context['options'] = get_fields('option');
		return $context;
	}

	/* Custom Backend Logo */
	public function admin_custom_logo() {
		echo '<style type="text/css">
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default #wp-admin-bar-wp-logo {
			width: 160px;
		}
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default #wp-admin-bar-wp-logo .ab-item .ab-icon:before {
			display: block;
			background-image: url(' . get_stylesheet_directory_uri() . '/static/images/odisi-logo.svg);
			background-position: center;
			background-size: contain;
			background-repeat: no-repeat;
			color: rgba(0,0,0,0);
			width: 144px;
		}
		#wpadminbar {
			background: #1d2327;
		}
		#wpadminbar .menupop .ab-sub-wrapper {
			// background: #5E574D;
		}
		#adminmenu a{
			// color: #fff;
		}
		#adminmenu a:hover, #adminmenu li.menu-top:hover, #adminmenu li.opensub>a.menu-top, #adminmenu li>a.menu-top:focus{
			// background: #000;
		}
		#wpadminbar .ab-item, #wpadminbar a.ab-item, #wpadminbar>#wp-toolbar span.ab-label, #wpadminbar>#wp-toolbar span.noticon{
			// color: #fff;
		}
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li a.ab-item:hover, 
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li.hover > a.ab-item, 
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li:hover a.ab-item:before, 
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li.hover > a.ab-item:before, 
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li:hover a .ab-icon:before,
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li.hover > a .ab-icon:before,
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li:hover a .ab-label,
		#wpadminbar #wp-toolbar #wp-admin-bar-root-default li.hover > a .ab-label,
		#wpadminbar #wp-toolbar #wp-admin-bar-top-secondary li a:hover,
		#wpadminbar #wp-toolbar #wp-admin-bar-top-secondary li.hover > a,
		#wpadminbar #wp-toolbar #wp-admin-bar-top-secondary li:hover > a,
		#wpadminbar #wp-toolbar #wp-admin-bar-top-secondary li.hover > a:before,
		#wpadminbar #wp-toolbar #wp-admin-bar-top-secondary li:hover > a:before,
		#wpadminbar #wp-toolbar #wp-admin-bar-top-secondary #adminbarsearch:hover:before {
			color: #BAC29C;
		}
	</style>
	';
	}
	
		
	/**
	 * Theme Support
	 */
	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/**
	 * Regsiter Nav Menus
	 */
	public function theme_register_nav_menus() {
		register_nav_menus( array(
			'primary_menu' => esc_html__( 'Primary Menu', 'odisi' ),
		) );		
	}

	/**
	 * Regsiter ACF Options Page
	 */
	public function acf_options_page_for_theme() {
		if( function_exists('acf_add_options_page') ) {
			acf_add_options_page();
			acf_set_options_page_title( __('Footer') );
		}		
	}

	/**
	 * Image Cropping Sizes
	 */
	public function image_cropping_sizes() {
		add_image_size('hero', 1640, 768, true);
	}

	/****************
	 * Admin styling
	****************/

	public function my_custom_fonts() {
		echo '<style type="text/css">

		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li a.wp-has-current-submenu .wp-menu-image:before {
			color: white;
		}

		#wpwrap #adminmenumain #adminmenu,
		#wpwrap #adminmenumain #adminmenuback,
		#wpwrap #adminmenumain #adminmenuwrap {
			background-color: #1d2327;
		}

		#wpwrap #adminmenumain #adminmenu .wp-has-current-submenu .wp-submenu {
			// background-color: yellow;
		}

		// #adminmenu .wp-submenu, #adminmenu li.menu-top:hover, #adminmenu li.opensub>a.menu-top, #adminmenu li>a.menu-top:focus{
		// 	background-color: #2E86AB;
		// }

		// #wpadminbar .ab-top-menu>li.hover>.ab-item, #wpadminbar.nojq .quicklinks .ab-top-menu>li>.ab-item:focus, #wpadminbar:not(.mobile) .ab-top-menu>li:hover>.ab-item, #wpadminbar:not(.mobile) .ab-top-menu>li>.ab-item:focus{
		// 	background-color: #2E86AB;
		// }
		
		// #wpadminbar .menupop .ab-sub-wrapper {
		// 	background: #2E86AB;
		// }

		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li a:hover,
		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li a:focus {
			color: #BAC29C;
			box-shadow: inset 4px 0 0 0 #BAC29C;
		}
		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li a:hover .wp-menu-image:before, 
		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li a:focus .wp-menu-image:before, 
		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li.opensub a.menu-top, 
		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li.opensub a.menu-top .wp-menu-image:before, 
		#collapse-button:hover,
		#collapse-button:focus {
			color: #BAC29C;
		}

		#wpwrap #adminmenumain #adminmenuwrap #adminmenu li a.wp-has-current-submenu,
		.wp-core-ui .button-primary {
			background: #254925;
			color: white !important;
		}
		.wp-core-ui .button-primary {
			border-color: #254925;
		}
		.wp-core-ui .button {
			color: #254925;
			border-color: #254925;
			transition: .3s;
		}
		.wp-core-ui .button:focus,
		.wrap .page-title-action:focus {
			box-shadow: 0 0 0 1px #fff, 0 0 0 3px #254925;
		}
		.wrap .page-title-action {
			border: 1px solid #254925;
			color: #254925;
			transition: .3s;
		}

		.wp-core-ui .button-primary:focus,
		.wp-core-ui .button-primary:hover {
			background: #012a25;
			border-color: #012a25;
		}
		.wp-core-ui .button:focus,
		.wp-core-ui .button:hover,
		.wrap .page-title-action:focus,
		.wrap .page-title-action:hover {
			color: #012a25;
			border-color: #012a25;
		}

	</style>
	';
	}

	/**************************
	 * Remove default posts
	 ***************************/

	public function remove_default_post_type() {
		remove_menu_page( 'edit.php' );
	}


	/***************************
	 * REMOVE COMMENT FUNCTION
	 ****************************/
	public function my_admin_bar_render() {
		global $wp_admin_bar;
		$wp_admin_bar->remove_menu('comments');
	}

	// Removes from admin menu
	public function my_remove_admin_menus() {
		remove_menu_page( 'edit-comments.php' );
	}

	// Removes from post and pages
	public function remove_comment_support() {
		remove_post_type_support( 'post', 'comments' );
		remove_post_type_support( 'page', 'comments' );
	}

	// Removes from admin bar
	public function mytheme_admin_bar_render() {
		global $wp_admin_bar;
		$wp_admin_bar->remove_menu('comments');
	}


	/*************************
	 * Load Google Fonts
	 **************************/
	public function loadGoogleFonts()
	{
		// echo '<link rel="preconnect" href="https://fonts.googleapis.com">
		// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		// <link href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&family=Lexend:wght@100..900&display=swap" rel="stylesheet">';

	}

	/*************************
	 * Load Favicon
	 **************************/
	public function loadFavicon() {
		echo '<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<meta name="apple-mobile-web-app-title" content="ODISI" />
		<link rel="manifest" href="/site.webmanifest" />';
	}

	/*******************************
	 * Add ALT tags to empty images
	 *******************************/
	public function my_set_image_meta_upon_image_upload( $post_ID ) {
		// Check if uploaded file is an image, else do nothing
		if ( wp_attachment_is_image( $post_ID ) ) {
			$my_image_title = get_post( $post_ID )->post_title;
			// Sanitize the title:  remove hyphens, underscores & extra spaces:
			$my_image_title = preg_replace( '%\s*[-_\s]+\s*%', ' ',  $my_image_title );
			// Sanitize the title:  capitalize first letter of every word (other letters lower case):
			$my_image_title = ucwords( strtolower( $my_image_title ) );
			// Create an array with the image meta (Title, Caption, Description) to be updated
			// Note:  comment out the Excerpt/Caption or Content/Description lines if not needed
			$my_image_meta = array(
				'ID'		=> $post_ID,			// Specify the image (ID) to be updated
				'post_title'	=> $my_image_title,		// Set image Title to sanitized title
				'post_excerpt'	=> $my_image_title,		// Set image Caption (Excerpt) to sanitized title
				'post_content'	=> $my_image_title,		// Set image Description (Content) to sanitized title
			);
			// Set the image Alt-Text
			update_post_meta( $post_ID, '_wp_attachment_image_alt', $my_image_title );
			// Set the image meta (e.g. Title, Excerpt, Content)
			wp_update_post( $my_image_meta );
		} 
	}
}
new StarterSite();