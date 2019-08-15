var page = f('file://%s/%s', fs.workingDirectory, "index.html");

casper.test.begin("Basic page", 1, function suite(test) {

  casper.start(page, function() {
    test.assertTitle("How much will fiber cost me?", "page title is the one expected");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Math works with default values", 10, function suite(test) {

  casper.start(page, function() {
    // current
    test.assertField('internet', '55');
    test.assertField('phone', '0');
    test.assertField('video', '0');

    // projected
    test.assertField('projected_phone', '0');
    test.assertField('projected_video', '0');

    // taxable value
    test.assertField('taxable_value', '65000');

    this.fill('form', {}, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$55');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$51.29');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$10.29');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$44.52');
  });

  casper.run(function() {
    test.done();
  });
});


casper.test.begin("Math works when increasing taxable value", 4, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      taxable_value: "250000"
    }, false);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$55');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$80.58');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$39.58');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$-306.96');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Math works when decreasing taxable value", 4, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      taxable_value: "40000"
    }, false);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$55');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$47.33');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$6.33');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$92.04');
  });

  casper.run(function() {
    test.done();
  });
});


casper.test.begin("Properly rounds to two decimals", 4, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      video: "0",
      projected_video: "30",
      taxable_value: "55000"
    }, false);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$55');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$79.71');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$8.71');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$-296.52');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Works with blank fields", 4, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      video: "",
      phone: "",
      internet: "",
      projected_video: "",
      projected_phone: "",
      taxable_value: ""
    }, false);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$0');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$41');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$0');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$-492');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Works with non-numbers", 2, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      video: "$40",
      phone: "",
      internet: "",
      projected_video: "",
      projected_phone: "",
      taxable_value: "$50,000"
    }, false);
  });

  casper.then(function() {
    test.assertField('video', '');
    test.assertField('taxable_value', '')
  });

  casper.run(function() {
    test.done();
  });
});
