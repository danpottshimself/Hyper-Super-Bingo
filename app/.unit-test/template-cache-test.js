(function () {
    'use strict';
    describe('TemplateUrl Test', function () {
        var $state,
            $rootscope,
            $templateCache,
            sandbox;

        beforeEach(function () {
            module('Tombola.Module.Main');
            sandbox = sinon.sandbox.create();
            inject(function ($injector, _$state_, _$rootScope_, _$templateCache_) {
                $state = _$state_;
                $rootscope = _$rootScope_;
                $templateCache = _$templateCache_;
            });

            $templateCache.put('html/login.html', 'html/login.html');
            $templateCache.put('html/lobby.html', 'html/lobby.html');
            $templateCache.put('ticketMaster', 'ticketMaster');
            $rootscope.$digest();
        });

        it('Make sure the default state is playerselect', function () {
            var state = $state.get('logIn');
            should.exist(state);
            state.url.should.equal('/logIn');
            state.templateProvider($templateCache).should.equal($templateCache.get('html/login.html'));
        });
        it('Make sure the default state is playerselect', function () {
            var state = $state.get('lobby');
            should.exist(state);
            state.url.should.equal('/lobby');
            state.templateProvider($templateCache).should.equal($templateCache.get('html/lobby.html'));
        });
        it('Make sure the default state is playerselect', function () {
            var state = $state.get('tickets');
            should.exist(state);
            state.url.should.equal('/tickets');
            state.templateProvider($templateCache).should.equal($templateCache.get('ticketMaster'));
        });


        afterEach(function () {
            sandbox.restore();
        });
    });
})();
