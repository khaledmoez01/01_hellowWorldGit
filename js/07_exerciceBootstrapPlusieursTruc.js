$(function() {

    $.getJSON('https://cors.io/?https://api.myglamapp.pl/api/categories?language=EN', function(file){
        var longueurData = file.data.length;
        var longueurDataServices;
        for (var j = 0; j < longueurData; j++)
        {
            var $div01 = $('<div />', {class:"carousel-item col-md-4"});
            var $div02 = $('<div />', {class:"card"});
            var $img01 = $('<img />', {
                class: "card-img-top img-fluid",
                src: "http://" + file.data[j].imagePath,
                alt:"Card image cap"
            });

            $img01.appendTo($div02);

            var $div03 = $('<div />', {class:"card-body"});

            var $img02 = $('<img />', {
                src: "usb/exercice07/images/title_line_section1x.png",
                alt:"logo04"
            });

            $img02.appendTo($div03);

            var $h5_01 = $('<h5 />', {class:"card-title font-weight-bold"});
            $h5_01.text(file.data[j].label);
            $h5_01.appendTo($div03);

            var $p01 = $('<p />', {class: "card-text"});

            var $ul01 = $('<ul />', {class: "ul_carrousel"});

            var i;
            if (file.data[j].Services)
            {
                longueurDataServices = file.data[j].Services.length;
                for (i = 0; i < longueurDataServices; i++)
                {
                    var $li = $('<li />');
                    $li.text("- " + file.data[j].Services[i].label_service);
                    $li.appendTo($ul01);
                }
            }

            $ul01.appendTo($p01);
            $p01.appendTo($div03);
            $div03.appendTo($div02);
            $div02.appendTo($div01);
            $div01.appendTo('#partie2 #myCarousel_carousel_inner');
        }

        $('#partie2 #myCarousel_carousel_inner .carousel-item:first').addClass('active');

    })
    .done(function() {

        function carouselNormalization() {
            var items = $('#partie2 #myCarousel_carousel_inner .carousel-item .card'), //grab all slides
                heights = [], //create empty array to store height values
                tallest; //create variable to make note of the tallest slide
        
            if (items.length) {
        
                function normalizeHeights() {

                    items.each(function() { //add heights to array
                        heights.push($(this).height());
                    });
        
                    tallest = Math.max.apply(null, heights); //cache largest value
                    items.each(function() {
                      $(this).css('min-height', tallest + 'px');
                    });
                };
                normalizeHeights();
                
                $(window).on('resize orientationchange', function() {
                    tallest = 0, heights.length = 0; //reset vars
                    items.each(function() {
                        $(this).css('min-height', '0'); //reset min-height
                    });
                    normalizeHeights(); //run it again
                });
            }
        
        }
		carouselNormalization();
    });

    $("#partie2 #myCarousel").on("slide.bs.carousel", function(e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 3;
      var totalItems = $("#partie2 .carousel-item").length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {

        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
          // append slides to end
          if (e.direction === "left") {
            $("#partie2 .carousel-item")
              .eq(i)
              .appendTo("#partie2 .carousel-inner");
          } else {
            $("#partie2 .carousel-item")
              .eq(0)
              .appendTo($(this).find(".carousel-inner"));
          }
        }
      }
    });

});
