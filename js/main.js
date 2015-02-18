$(document).ready(function() {

  
});

function displayPackages(responsePackages){
  var source = $("#packageTemplate").html();
  var template = Handlebars.compile(source);
  var output = template(responsePackages);
  console.log($("#packages"));
  console.log(output);
  $("#packages").append(output);
}

  // console.log(responsePackages);
  // var packages = $('#packages');

  // responsePackages.packages.forEach(function(pack){
  //   var cohortsByCourse = pack.cohorts_by_course;

  //   for (var courseName in cohortsByCourse) {

  //     var cohorts = cohortsByCourse[courseName],
  //         cohorts_html = '<h2>'+courseName+'</h2>';

  //     cohorts.forEach(function(cohort){
  //       var fullText = cohort.full ? 'Close' : 'Open';
  //       var cohort_div = '<div class="col-sm-12 cohort" data-cohort-id=';
  //       cohort_div += cohort.id;
  //       cohort_div += ' data-cohort-full='+cohort.full+'><h3>'+cohort.name+'</h3>';
  //       cohort_div += '<ul>';

  //       if (cohort.seats_left < 6) {
  //          cohort_div += '<li>Only '+cohort.seats_left+' seats left</li>';
  //       };

  //       cohort_div += '</li><li>'+fullText+'</li></ul></div>';
  //       cohorts_html += cohort_div;
  //     });
  //   }

  //   packages.append('<div class="col-sm-12 package" data-package-id='+pack.id+'><h1>'+pack.name+'</h1><p>'+pack.description+'</p>'+cohorts_html+'</div>')
  // });


// function displayCohorts(cohorts){
//   var cohorts = $('#cohorts'),
//     cohortTemplate = Handlebars.compile($("#cohort_template").html());

//   $.each(cohorts, function(_, cohort){
//     var context = cohort;
//     context.fullText = cohort.full ? 'Close' : 'Open';
//     cohorts.append(cohortTemplate(context));
//   });
// }

