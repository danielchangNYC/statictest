APP = {};

APP.Multiform = function () {
  this.cohort_ids = [];
  this.package_ids = [];
};

APP.Multiform.prototype.$el = function () {
  return $('#packages').find('.cohort');
};

APP.Multiform.prototype.checkFull = function ($div) {
  $div.each(function() {
    if ($(this).data('cohort-full')) {
      $(this).addClass('closed');
    } else {
      $(this).addClass('open');
      $(this).append('<button href="#" class="btn btn-primary add-course">Add to Cart</button>');
    }
  });
};

APP.Multiform.prototype.addListeners = function ($div) {
  var $open = $div.filter('.open');
  $open.find('.add-course').addClass('clickable');
  var self = this;
  //listeners on clickable boxes
  $('.clickable').click(function () {
    console.log("added "+$(this).parent().data('cohort-id'));
    $(this).parent().toggleClass('selected').toggleClass('open');
    //enable or disable enroll button
    if ($('.selected').size() > 0) {
      $('#enroll').removeAttr('disabled');
    } else {
      $('#enroll').attr('disabled', 'disabled');
    }
  });

  //listener on enroll button
  $('#enroll').click(function (event) {
    event.preventDefault();
    //clear cohort_ids if multiple ajax posts occur.
    // this.cohort_ids = [];
    $div.filter('.selected').each(function () {
      var sel_cohort_id = $(this).data('cohort-id');
      var sel_package_id = $(this).parent().data('package-id');
      self.cohort_ids.push(sel_cohort_id);
      self.package_ids.push(sel_package_id);
    });
    window.location.href='http://localhost:3000/customers/new?cohort_ids[]='+self.cohort_ids+'&package_ids[]='+self.package_ids;
  });
};

APP.Multiform.prototype.init = function () {
  var $div = this.$el();
  this.checkFull($div);
  this.addListeners($div);
};

$(function () {
  var multiform = new APP.Multiform();
  //initialize multi-select form table.
  multiform.init();
});

