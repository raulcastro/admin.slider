<?php
$root = $_SERVER['DOCUMENT_ROOT'];
require_once($root.'/models/back/Layout_Model.php');
require_once($root.'/views/Layout_View.php');
require_once $root.'/backends/admin-backend.php';
require_once $root.'/Framework/Tools.php';
$model	= new Layout_Model();


$memberId = (int) $_POST['memberId'];

switch ($_POST['opt'])
{
	case 1:	 
		
		if ($newBook = $model->addStore($_POST))
			echo str_pad($newBook, 4, 0, STR_PAD_LEFT);
		else
			echo 0;
		break;
		
	break;
	
	case 2:
		if ($model->updateStore($_POST))
			echo 1;
		else
			echo 0;
	break;
	
	case 3:
		if ($model->deleteStore($_POST['storeId']))
			echo 1;
		else 
			echo 0;
	break;
	
	case 4:
		if ($sliders = $model->getSliders($_POST['storeId']))
		{
			foreach ($sliders as $slider)
			{
				?>
			<div class="col-md-2 slider">
				<div class="marker-img">
					<img src="/images/sliders/medium/<?php echo $slider['slider']; ?>" />
				</div>
				<div class="delete">
					<a href="javascript: void(0);" slider-id="<?php echo $slider['slider_id']; ?>" class="delete-slider">delete</a>
				</div>
			</div>
				<?php
			}
		}
	break;
	
	case 5:
		if ($model->deleteSlider($_POST['sliderId']))
		{
			echo 1;
		}
	break;
	
	default:
	break;
}