var mocks = {

    authenticateUser: {
        logOutInformation : function(){},
        nextGameInformation : function (){},
        buyTicketInformation: function(){}
    },
    gameApi: {

    },
    userLogIn: {
        balance: 1990,
        handlePromise: function (tokenNumber) {
        }
    },
    callingMethod: {
    bingoCall: function (){}
    },
    gameTimer: {

    },
    ticketCreation:{
        ifNumbersMatch: function (response){}

    },
    checkWinners: {
        checkForWinner:function (){}

    },
    stateChange: {
        go:function() {}
    },
    logInProxy: {
        dataHandler: function (){},
        callApi: function(){}
    },
    bingoCallApiProxy : {
    bingoCall : function (){}
    },

    tokenService: {
        token: 'f36bb73b-83cc-4539-aac0-893914bc73ec',
        getToken:function (){}
    }

};