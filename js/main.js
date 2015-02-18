function displayPackages(responsePackages){

  console.log(responsePackages);
  var packages = $('#packages');

  $.each(responsePackages.packages, function(_, pack){
    var cohorts = pack.cohorts,
        cohorts_html = "";
    cohorts.forEach(function(cohort) {
      var fullText = cohort.full ? 'Close' : 'Open';
      var cohort_div = '<div class="col-sm-12 cohort" data-cohort-id=';
      cohort_div += cohort.id;
      cohort_div += ' data-cohort-full='+cohort.full+'><h3>'+cohort.name+'</h3>';
      cohort_div += '<p><strong>Details</strong><p><ul>';
      if (cohort.seats_left < 6) {
         cohort_div += '<li>Only '+cohort.seats_left+' seats left</li>';
      };
      cohort_div += '</li><li>'+fullText+'</li></ul></div>';
      cohorts_html += cohort_div;
    });
    packages.append('<div class="col-sm-12 package" data-package-id='+pack.id+'><h1>'+pack.name+'</h1><p>'+pack.description+'</p>'+cohorts_html+'</div>')
  });
}

// function displayCohorts(cohorts){
//   var cohorts = $('#cohorts'),
//     cohortTemplate = Handlebars.compile($("#cohort_template").html());

//   $.each(cohorts, function(_, cohort){
//     var context = cohort;
//     context.fullText = cohort.full ? 'Close' : 'Open';
//     cohorts.append(cohortTemplate(context));
//   });
// }

