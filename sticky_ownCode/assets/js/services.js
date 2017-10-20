/*
ApplicationDbContext
====================
1) Database transactions: CRUD-operations
2) Cache for loaded data or content
*/
var ApplicationDbContext = {
    init: function(connectionStr) {
        this._connectionStr = connectionStr; // Connection String = the key in the local storage
        this._dbData = {
            "stickynotes": []
        }; // The data saved as value in the local storage via the connection string aka key
        // Check if the key exists in the local storage
        // If so --> assign the value as value of the variable _dbData
        // Otherwise --> set the value of the variable _dbData as value for the specified key
        // if(window.localStorage.getItem(connectionStr)) {
        //     this._dbData = JSON.parse(window.localStorage.getItem(connectionStr));
        // } else {
        //     window.localStorage.setItem(connectionStr, JSON.stringify(this._dbData));
        // }
        

        for (var i = 0; i < window.localStorage.length; i++) {
            this._dbData.stickynotes.push(window.localStorage.getItem(window.localStorage.key(i)));
        }

    },
    // Get all the sticky notes from the local storage
    getStickyNotes: function() {    
        return this._dbData.stickynotes;
    },
    // Get a specific sticky note by id
    getStickyNoteById: function(id) {        
        return window.localStorage.getItem(id);
    },
    addStickyNote: function(stickyNote) {    
        this._dbData.stickynotes.push(stickyNote);
         // window.localStorage.setItem(stickyNote.id, JSON.stringify(stickyNote));

        var JsonDerulo = JSON.stringify(stickyNote);

        var list =  document.querySelector('.list');

        var tempStr = "";
        for (var i = 0; i < window.localStorage.length; i++) {

            var obj = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
            var message = obj["message"];
            tempStr += `<div class="note" id="${obj["id"]}"> "${message}" :) </div>`;
        }

        list.innerHTML = tempStr;


    },

    updateStickyNote: function(stickyNote) { 
        window.localStorage.setItem(stickyNote.message, stickyNote);
        this._dbData.stickynotes.push(window.localStorage.getItem(stickyNote.message));
    },

    deleteStickyNoteById: function(id) {

        window.localStorage.removeItem(id);
        this._dbData.stickynotes.splice(id, 1);

        var JsonDerulo = JSON.stringify(id);

        var list =  document.querySelector('.list');
        list.innerHTML = ""; 

        var tempStr = "";
        for (var i = 0; i < window.localStorage.length; i++) {

            var obj = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
            var message = obj["message"];
            tempStr += `<div class="note" id="${obj["id"]}"> "${message}" :) </div>`;
        }

        list.innerHTML = tempStr;

    },
    softDeleteStickyNoteById: function(id) {        
        this._dbData.stickynotes.splice(id, 1);
    },
    softUnDeleteStickyNoteById: function(id) {    
        this._dbData.stickynotes.push(window.localStorage.getItem(window.localStorage.key(id)));    

    }
};