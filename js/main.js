

function displayCohorts(responseCohorts){

  console.log(responseCohorts);

  var cohorts = $('#cohorts'),
    cohortTemplate = Handlebars.compile($("#cohort_template").html());

  $.each(responseCohorts.cohorts, function(_, cohort){
    var context = cohort;
    context.fullText = cohort.full ? 'Open' : 'Closed';
    cohorts.append(cohortTemplate(context));
  });
}
