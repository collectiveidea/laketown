var page = f('file://%s/%s', fs.workingDirectory, "index.html");

casper.test.begin("Basic page", 1, function suite(test) {

  casper.start(page, function() {
    test.assertTitle("How much will fiber cost me?", "page title is the one expected");
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin("Math works with default values", 11, function suite(test) {

  casper.start(page, function() {
    // current
    test.assertField('internet', '75');
    test.assertField('phone', '40');
    test.assertField('video', '0');

    // projected
    test.assertField('projected_internet', '50');
    test.assertField('projected_phone', '9');
    test.assertField('projected_video', '0');

    // taxable value
    test.assertField('taxable_value', '100000');


    this.fill('form', {
      // q: "casperjs"
    }, true);
  });

  casper.then(function() {
    test.assertSelectorHasText('td[data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td[data-name="projected_total"]', '$72.81');
    test.assertSelectorHasText('td[data-name="fiber_tax"]', '$13.81');
    test.assertSelectorHasText('td[data-name="annual_savings"]', '$506.28');
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
    test.assertSelectorHasText('td[data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td[data-name="projected_total"]', '$93.53');
    test.assertSelectorHasText('td[data-name="fiber_tax"]', '$34.53');
    test.assertSelectorHasText('td[data-name="annual_savings"]', '$257.64');
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
    test.assertSelectorHasText('td[data-name="monthly_total"]', '$115');
    test.assertSelectorHasText('td[data-name="projected_total"]', '$65.91');
    test.assertSelectorHasText('td[data-name="fiber_tax"]', '$6.91');
    test.assertSelectorHasText('td[data-name="annual_savings"]', '$589.08');
  });

  casper.run(function() {
    test.done();
  });
});

