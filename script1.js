

$(document).ready(function() {
  console.log("hello");


  $('#find_city_button').on('click', function() {
    var query = $("#query").val();
    // console.log(query);
    $('#image_div').hide();
    var wunderground_api = 'http://autocomplete.wunderground.com/aq?query=' + query
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
        var elements = $('<div>')

        for (i = 0; i < results.length; i++) {
          elements.append($('<div>').addClass('cityname'));
          html_string = '<a href="http://www.wunderground.com/' + results[i].l + '">' + results[i].name + '</a>'
          elements.append(html_string);
          $data.html(elements);
        }
      }
    });
  });
});