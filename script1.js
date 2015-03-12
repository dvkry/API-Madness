

$(document).ready(function() {
  console.log("hello");


  $('#find_city_button').on('click', function() {
    var query = $("#query").val();
    // console.log(query);
    // $('#image_div').hide();
    var wunderground_api = 'http://autocomplete.wunderground.com/aq?query=' + query;
    // console.log(wunderground_api);

    $.ajax({
      url: wunderground_api,
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'cb',
      success: function(response) {
        console.log(response);
        var $data = $('#data')
        results = response.RESULTS
        // console.log(results);
        var elements = $('<div class="cities">')

        for (i = 0; i < results.length; i++) {
          element = $('<div class="cityname">');
          $('<a href="http://www.wunderground.com/' + results[i].l + '">' + results[i].name + '</a>').appendTo(element);
          elements.append(element);
        }
        $data.html(elements);
      }
    });
  });

  $(document.body).on('mouseover', '.cityname' , function() {
    var name = $(this).text();
    $('#big-city-name').text(name);
    console.log($(name).text());
  });

});