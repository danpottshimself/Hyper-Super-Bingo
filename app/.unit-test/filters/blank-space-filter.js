(function () {
    'use strict';
    describe('Test OverLay', function () {
        var blankSpaceFilter;
        beforeEach(function () {
            module('Tombola.Module.Ticket');
            inject(function ($injector) {
                blankSpaceFilter = $injector.get('$filter')('SpaceFilter');
            });
        });

        it('Checks that the filter is returning the correct results.', function () {
            var ticketNumber = {ticketNumber: '00', matched: false};
            var testFilter = blankSpaceFilter(ticketNumber);
            testFilter.should.equal('blankSpace');
        });

        it('Checks that the filter is returning the correct results.', function () {
            var ticketNumber = {ticketNumber: 27, matched: true};
            var testFilter = blankSpaceFilter(ticketNumber);
            testFilter.should.equal('matched');
        });

        it('Checks that the filter is returning the correct results.', function () {
            var ticketNumber = {ticketNumber: 27, matched: false};
            var testFilter = blankSpaceFilter(ticketNumber);
            testFilter.should.equal('noMatch');
        });
    });
}());
