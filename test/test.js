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
    test.assertField('video', '0');

    // projected
    test.assertField('projected_internet', '32');
    test.assertField('projected_phone', '9');
    test.assertField('projected_video', '0');

    // taxable value
    test.assertField('taxable_value', '100000');


    this.fill('form', {
      // q: "casperjs"
    }, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="projected_internet"]', '$32');
    test.assertSelectorHasText('td [data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$54.81');
    test.assertSelectorHasText('td [data-name="fiber_tax"]', '$13.81');
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
    }, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$75.53');
    test.assertSelectorHasText('td [data-name="fiber_tax"]', '$34.53');
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
    }, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$47.91');
    test.assertSelectorHasText('td [data-name="fiber_tax"]', '$6.91');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$805.08');
  });

  casper.run(function() {
    test.done();
  });
});


casper.test.begin("Properly rounds to two decimals", 4, function suite(test) {

  casper.start(page, function() {
    this.fill('form', {
      projected_video: "30",
      taxable_value: "55000"
    }, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$78.60');
    test.assertSelectorHasText('td [data-name="fiber_tax"]', '$7.60');
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
      projected_internet: "",
      taxable_value: ""
    }, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td [data-name="monthly_total"]', '$0');
    test.assertSelectorHasText('td [data-name="projected_total"]', '$0');
    test.assertSelectorHasText('td [data-name="fiber_tax"]', '$0');
    test.assertSelectorHasText('td [data-name="annual_savings"]', '$0');
  });

  casper.run(function() {
    test.done();
  });
});
