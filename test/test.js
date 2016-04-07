var page = f('file://%s/%s', fs.workingDirectory, "index.html");

casper.test.begin("Basic page", 1, function suite(test) {

  casper.start(page, function() {
    test.assertTitle("How much will fiber cost me?", "page title is the one expected");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Math works with default values", 12, function suite(test) {

  casper.start(page, function() {
    // current
    test.assertField('internet', '75');
    test.assertField('phone', '40');
    test.assertField('video', '25');

    // projected
    test.assertField('projected_internet', '32');
    test.assertField('projected_phone', '9');
    test.assertField('projected_video', '25');

    // taxable value
    test.assertField('taxable_value', '100000');

    this.fill('form', {}, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="projected_internet"]', '$32');
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$140');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$79.81');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$13.81');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$722.28');
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
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$140');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$100.53');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$34.53');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$473.64');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Math works when decreasing taxable value", 4, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      taxable_value: "50000"
    }, false);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$140');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$72.91');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$6.91');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$805.08');
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
    test.assertSelectorHasText('td [data-name="current_monthly"]', '$115');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$78.60');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$7.60');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$436.80');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Works with non-numbers", 4, function suite(test) {

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
    test.assertSelectorHasText('td [data-name="projected_total"]', '$32');
    test.assertSelectorHasText('td [data-name="fiber_millage"]', '$0');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$-384');
  });

  casper.run(function() {
    test.done();
  });
});
