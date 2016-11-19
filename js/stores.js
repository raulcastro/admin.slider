$(function(){
	
	if ( $('#addBook').length ) { 
		$('#addBook').click(function(){
			addBook();
			return false;
		});
	}
	
	if ( $('#updateBook').length ) { 
		$('#updateBook').click(function(){
			updateBook();
			return false;
		});
	}
	
	if ( $('#deleteBook').length ) { 
		$('#deleteBook').click(function(){
			deleteBook();
			return false;
		});
	}
	
	if ( $('.delete-slider').length ) { 
		$('.delete-slider').click(function(){
			deleteSlider(this);
			return false;
		});
	}
	
	var storeId = 0;
	
	if ( $('#storeId').length ) { 
		var storeId = $('#storeId').val();
	}
	
	if ( $('#uploadSliders').length ) { 
		$("#uploadSliders").uploadFile({
			url:		"/ajax/media.php",
			fileName:	"myfile",
			multiple: 	true,
			doneStr:	"uploaded!",
			formData: {
				storeId: storeId,
					opt: 1 
				},
			onSuccess:function(files, data, xhr)
			{
				getSliders();
			}
		});
	}
	
	$('#progressSaveMember').hide();
	$('#memberComplete').hide();
	
});

function addBook()
{
	
	var bookTitle 	= $('#bookTitle').val(); 
	var bookAuthor		= $('#bookAuthor').val();
	
	if (bookTitle && bookAuthor)
	{
		$('#progressSaveMember').show();
		
		$.ajax({
	    type: "POST",
	    url: "/ajax/stores.php",
	    data: {
	    	storeName: 	bookTitle,
	    	storeUrl: 	bookAuthor, 
	    	opt:			'1'
	    },
	    success:
	        function(info)
	        {
	        	if (info != '0')
	        	{
	        		$('#progressSaveMember').hide();
	        		$('#addBook').hide();
	        		$('#bookComplete').attr('href', '/store/'+info+'/new-store/')
	        		$('#bookComplete').show();
	        	}
	        	else
				{
				}
	        }
	    });
	}
}

function updateBook()
{
	var storeName 	= $('#bookTitle').val(); 
	var storeUrl	= $('#bookAuthor').val();
	var storeId 	= $('#storeId').val();
	
	if (storeId)
	{
		$.ajax({
	    type: "POST",
	    url: "/ajax/stores.php",
	    data: {
	    	storeId:	storeId,
	    	storeName: 	storeName,
	    	storeUrl: 	storeUrl,
	    	opt:		'2'
	    },
	    success:
	        function(info)
	        {
		    	if (info != '0')
	        	{
	        		pathArray 		= $(location).attr('href').split( '/' );
	            	newURL 			= pathArray[0]+'//'+pathArray[2]+'/'+pathArray[3]+'/'+pathArray[4]+'/'+pathArray[5]+'-'+Math.floor((Math.random() * 100) + 1)+'/#';
	            	window.location = newURL;
	        	}
	        	else
				{
				}
	        }
	    });
	}
}

function deleteBook()
{
	var storeId = $('#storeId').val();
	
	if (storeId)
	{
		$.ajax({
	    type: "POST",
	    url: "/ajax/stores.php",
	    data: {
	    	storeId:	storeId,
	    	opt:		'3'
	    },
	    success:
	        function(info)
	        {
		    	if (info != '0')
	        	{
		    		pathArray 		= $(location).attr('href').split( '/' );
	        		newURL 			= pathArray[0]+'//'+pathArray[2]+'/dashboard/';
	            	window.location = newURL;
	        	}
	        	else
				{
				}
	        }
	    });
	}
}

function getSliders()
{
	var storeId = $('#storeId').val();
	
	if (storeId)
	{
		$.ajax({
	    type: "POST",
	    url: "/ajax/stores.php",
	    data: {
	    	storeId:	storeId,
	    	opt:		'4'
	    },
	    success:
	        function(info)
	        {
		    	if (info != '0')
	        	{
		    		$('#sliderBox').html(info);
		    		
		    		if ( $('.delete-slider').length ) { 
		    			$('.delete-slider').click(function(){
		    				deleteSlider(this);
		    				return false;
		    			});
		    		}
	        	}
	        	else
				{
				}
	        }
	    });
	}
}

function deleteSlider(node)
{
	var sliderId = $(node).attr('slider-id');
	
	$.ajax({
	    type: "POST",
	    url: "/ajax/stores.php",
	    data: {
	    	sliderId:	sliderId,
	    	opt:		'5'
	    },
	    success:
	        function(info)
	        {
		    	if (info != '0')
	        	{
		    		getSliders();
	        	}
	        	else
				{
				}
	        }
	    });
}
