function displayCohorts(responseCohorts){

  console.log(responseCohorts);

  var cohorts = $('#cohorts');

  $.each(responseCohorts.cohorts, function(_, cohort){
    cohorts.append('<li data-cohort-id='+cohort.id+'>'+cohort.name+' MAX SEATS: '+cohort.max_enrollments+'</li>');
  });
}
