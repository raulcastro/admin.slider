<?php
$root = $_SERVER['DOCUMENT_ROOT'];
require_once($root.'/models/back/Layout_Model.php');
require_once($root.'/models/back/Media_Model.php');
require_once($root.'/views/Layout_View.php');
require_once $root.'/backends/admin-backend.php';
require_once $root.'/Framework/Tools.php';
$model	= new Layout_Model();

$storeId = (int) $_POST['storeId'];
$model	= new Layout_Model();
$data 	= $backend->loadBackend();
$allowedExtensions = array("jpg", "JPG", "jpeg", "png");

switch ($_POST['opt'])
{
// 	Add Slider
	case 1:
	
		$sizeLimit 	= 20 * 1024 * 1024;
	
		$uploader 	= new Media_Model($allowedExtensions, $sizeLimit);
	
		$savePath 		= $root.'/images/sliders/original/';
		$medium 		= $root.'/images/sliders/medium/';
		$pre	  		= 'slider';
		$mediumWidth 	= 250;
	
		if ($result = $uploader->handleUpload($savePath, $pre))
		{
			$uploader->getThumb($result['fileName']	, $savePath, $medium, $mediumWidth,
					'width', '');
	
			$newData = getimagesize($medium.$result['fileName']);
	
			$wp     = $newData[0];
			$hp     = $newData[1];
				
			$lastId = 0;
				
			if ($newData)
			{
				$model->addSlider($storeId, $result['fileName']);
				$data  = array('success'=>true, 'fileName'=>$result['fileName'],
						'wp'=>$wp, 'hp'=>$hp, 'lastId'=>$lastId);
			}
	
			echo htmlspecialchars(json_encode($data), ENT_NOQUOTES);
		}
		break;
		
	default:
	break;
}