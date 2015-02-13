APP = {};

APP.Multiform = function () {
  this.cohort_ids = [];
};

APP.Multiform.prototype.postUrl = function () {
  return 'http://localhost:3000/customers/new?cohort_ids[]='+this.cohort_ids;
}

APP.Multiform.prototype.$el = function () {
  return $('#cohorts').find('.cohort');
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

APP.Multiform.prototype.ajaxPushState = function ($div) {
  var self = this;
  //clear cohort_ids if multiple ajax posts occur.
  this.cohort_ids = [];
  //gather selected cohort ids
  $div.filter('.selected').each(function () {
    var sel_cohort_id = $(this).data('cohort-id');
    self.cohort_ids.push(sel_cohort_id);
  });

  // format data to post
  var data = { cohort_ids: this.cohort_ids };

  $.ajax({
    url: self.postUrl(),
    type: 'POST',
    beforeSend: function (xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: data,
    success: function (response) {
      console.log(response);
    },
    error: function (jqXHR, status, error) {
      console.log('error: '+error);
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
    self.ajaxPushState($div);
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

