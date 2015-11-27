(function () {
    'use strict';
    describe('Test OverLay', function () {
        var overlayFilter;
        beforeEach(function(){
            module('Tombola.Module.Ticket');
            inject(function($injector){
                overlayFilter = $injector.get('$filter')('OverLay');
            });
        });

        it('Checks that the filter is returning the correct results.', function(){
            var testFilter = overlayFilter('Well Done! You have won the line prize of £1', 'no house winner');
            testFilter.should.equal('modal');
        });
        it('Checks that the filter is returning the correct results.', function(){
            var testFilter = overlayFilter('no line winner', 'Well Done! You have won the line prize of £5');
            testFilter.should.equal('modal');
        });
    });
}());
