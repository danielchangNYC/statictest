APP = {};

APP.Multiform = function () {
};

APP.Multiform.prototype.$el = function () {
  return $('#packages').find('.cohort');
};

APP.Multiform.prototype.addCohortButtonListeners = function ($div) {
  var self = this;
  //listeners on clickable boxes
  $('.open').click(function () {
    // Set cohort to selected
    $(this).parent().toggleClass('selected');
    if ($(this).text() == 'Add Class') {
      $(this).text('SELECTED!');
    } else {
      $(this).text('Add Class');
    }
    $(this).toggleClass('btn-primary').toggleClass('btn-info');

    //enable or disable clicking on enroll button
    if ($('.selected').size() > 0) {
      $('#enrollButton').removeAttr('disabled');
    } else {
      $('#enrollButton').attr('disabled', 'disabled');
    }
  });
};

APP.Multiform.prototype.addEnrollButtonListener = function ($div) {
  $('#enrollButton').click(function (e) {
    e.preventDefault();
    var dataResponse = {packages: []};
    var packageId, cohortId;

    // Construct data response from clicked buttons
    $selected = $('.selected');
    $selected.each(function(_, selectedEl){
      var selectedEl = $(selectedEl);
      packageId = selectedEl.parent().data('package-id');
      cohortId = selectedEl.data('cohort-id');

      var targetPackage = dataResponse.packages.filter(function(pack) {
        return pack.id === packageId;
      });

      if (targetPackage[0] != undefined) {
        targetPackage[0].cohort_ids.push(cohortId)
      } else {
        dataResponse.packages.push({id: packageId, cohort_ids: [cohortId]})
      }

      packageId = null, cohortId =[];
    });
    // send dataResponse to //enroll
    $.ajax({
        url: 'http://50df9cfc.ngrok.com/api/carts',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(dataResponse),
        dataType: 'json',
        success: function(res){
          console.log(res["cart"]["id"]);
          var cart_id = res["cart"]["id"];
          // redirect to this window.location redirect customers/new
          window.location.href='http://localhost:3000/customers/new?cart_id='+cart_id;
        }
      });
  });
};

APP.Multiform.prototype.init = function () {
  var $div = this.$el();
  this.addCohortButtonListeners($div);
  this.addEnrollButtonListener($div);
};

$(function () {
  var multiform = new APP.Multiform();
  //initialize multi-select form table.
  multiform.init();
});

