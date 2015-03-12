

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
        // console.log(response);
        var $data = $('#data');
        var results = response.RESULTS;
        // console.log(results);
        var elements = $('<div class="cities">')

        for (i = 0; i < results.length; i++) {
          var element = $('<div class="cityname">');
          // $('< href="http://www.wunderground.com/' + results[i].l + '">' + results[i].name + '</a>').appendTo(element);
          $('<div>' + results[i].name + '</div>').appendTo(element);
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

  $(document.body).on('click', '.cityname', function() {
    var name = $(this).text();
    var api_string = 'http://api.wunderground.com/api/ae7a0ed513dc18de/conditions/q/' + name + '.json';
    console.log(api_string);
    $.ajax({
      url: api_string,
      type: 'GET',
      dataType: 'json',
      jsonp: 'cb',
      success: function(response) {
        var $data = $('#data');
        console.log(response)
        var results = response.current_observation;
        console.log(results);
        var conditions_string = "<h1>Weather: " + results.weather + ", Temperature: " + results.temp_c + '</h1>';
        $('#weather_data').html(conditions_string).append('<img src="' + results.icon_url + '">');

      }
    });

  });

});

// ae7a0ed513dc18de