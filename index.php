<?php 

include 'init.php';

$page = isset($_GET['p'])? $_GET['p'] : null;


switch ($page) {
	case 'login':
		$script = "login.php";
		break;
	
	case 'signup':
		$script = "register.php";
		break;
	

	default:
		$script = "home.php";
		break;
}


require 'includes/header.php';
require 'views/'.$script;
require 'includes/footer.php';
?>