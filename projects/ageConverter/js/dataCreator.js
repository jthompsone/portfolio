var newDataList = [];	//array of all new data

$(function() {	//Document ready


	//Set up references
	var $newItemButton = $('#newItemButton');
	var $newItemForm = $('#newItemForm');
	var $textInput = $('input:text');
	var $numberInput = $('#itemAge');

	$newItemButton.show();	//Show the new item button
	$newItemForm.hide();		//Hide the new item form

	//When user clicks the "new Item" button...
	$('#showForm').on('click', function(){
		$newItemButton.hide();	//Hide the new item button
		$newItemForm.show();		//Show the new item form
	});

	//When the new item form is submitted...
	$newItemForm.on('submit', function(e){
		e.preventDefault();	//Do not submit form to server

		var newText = $textInput.val();	//Get the text from the input box
		var newAge = $numberInput.val();	//Get number from the number input box
		var rawData = newText + ':' + newAge;	//Combine the strings with a ':'

		newDataList.push(rawData);	//Push new string to array

		//Add another list item with the new text
			//MAY MODIFY LAYOUT LATER
		$('#newData').append('<li class="dataItem">' + newText + ':' + newAge + '</li>');

		$newItemForm.hide();	//Hide the form
		$newItemButton.show();	//Show the "New Item" button
		$textInput.val('');	//Clear the text input box
		$numberInput.val('');	//Clear age value
	});

	// When the user clicks on an li element, run this function
	$('#newData').on('click', 'li', function() {

		$(this).animate({	//Animate the list item.
			opacity: 0.0,	//Change to transparent
			paddingLeft: '+=80'	//Add 80 to paddingLeft
			}, 500, function() {	//Animate over 500 ms, then

			var badData = '';
			badData = $(this).index();
			newDataList.splice(badData, 1);
			$(this).remove();	//remove the list item
		});
	});


	var textFile = null;
  var makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

  var create = document.getElementById('create');
	var newText = '';


  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
		for (var i = 0; i < newDataList.length; i++) {
			newText += newDataList[i].toString() + '\n';
		}
    link.href = makeTextFile(newText);
    link.style.display = 'block';
  }, false);


});
