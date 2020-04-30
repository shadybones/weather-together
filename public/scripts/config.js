(($, firebase, APP_CONFIG)=>{

    //FIREBASE configuration START
    var firebaseConfig = {
        apiKey: window.APP_CONFIG.GOOGLE_KEY,
        authDomain: "weather-self.firebaseapp.com",
        databaseURL: "https://weather-self.firebaseio.com",
        projectId: "weather-self",
        storageBucket: "weather-self.appspot.com",
        messagingSenderId: "75146949637",
        appId: window.APP_CONFIG.FIREBASE_APP_ID
    };
    // Initialize Firebase
    //var defaultProject = 
    try{firebase.initializeApp(firebaseConfig);}catch(e){console.error(e);};
    //defaultProject.firestore();



    //SELECT2 CONFIG START
    $().ready(function() {
        $('#search-by-city').select2(select2options);
        $(".select2-selection__arrow")
            .addClass("material-icons")
            .html("arrow_drop_down");
    });

    var select2options = {
        theme: "material",
        language: {
            errorLoading: function (params) {
                return "Type in a city name";
            }
        },
        placeholder: 'Search for a new city',
        ajax: {
            delay: 250,
            url: window.location.protocol+"//"+APP_CONFIG.SERVER_HOST+":"+APP_CONFIG.SERVER_PORT+"/api/locations/v1/cities/autocomplete",
            data: function (params) {
                var query = {
                    q: params.term
                }
                return query;
            },
            processResults: function (data) {
                console.log("got data ", data);
                var results = [];

                if(data){
                    for(var i = 0; i < data.length && results.length < 10; i++){
                        if(data[i].Type === "City" && data[i].Country.ID === "US"){
                            results.push({
                                country : data[i].Country.ID,
                                name : data[i].LocalizedName,
                                text: data[i].LocalizedName + ", " + data[i].AdministrativeArea.LocalizedName,
                                id: data[i].Key
                            });
                        }
                    }
                } 
                return {
                    results: results,
                    "pagination": {
                        "more": false
                    }
                };
            },
            dataType: 'json'
        }
    };

})(window.$, window.firebase, window.APP_CONFIG);