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
        url: 'http://5bac69d4.ngrok.com/api/create_cart'
        data: dataResponse,
        dataType: 'json',
        success: function(res){
          // response expected: {cart_id: }
          // redirect to this carts/:cart_id/customers/new
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

