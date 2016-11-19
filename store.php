<?php
//	error_reporting(E_ALL);
//	ini_set("display_errors", 1);
// var_dump($_GET);

	$root = $_SERVER['DOCUMENT_ROOT']."/";
	
	require_once $root.'backends/admin-backend.php';
	require_once $root.'/'.'views/Layout_View.php';
	
	$data 	= $backend->loadBackend('store', $_GET['storeId']);
// 	var_dump($data);
	$data['title'] 			= 'Store # '.str_pad($data['storeInfo']['store_id'], 4, 0, STR_PAD_LEFT);
	$data['section'] 		= 'store';
	$data['icon'] 			= 'fa-book';
	$data['template-class'] = '';
	
	$view 	= new Layout_View($data);
	
	echo $view->printHTMLPage();
	
	