// IFFE
(function() {
    var App = {
        init: function() {
            console.log("1. Initialize the application");

            let params = (new URL(document.location)).searchParams;
            let name = params.get("message");

            if(!name){
                return false;
            }

            const stickyNote = new StickyNote();
            stickyNote.message = name;
            stickyNote.createdDate = new Date().getTime();
            stickyNote.id = new Date().getTime() + Math.round(Math.random()*new Date().getTime());

            const stickyNoteJsonString = JSON.stringify(stickyNote);
                
            if(window.localStorage) {
                window.localStorage.setItem(stickyNote.id, stickyNoteJsonString);
            }

            const mayaJsonString = window.localStorage.getItem(stickyNote.id);
            // console.log(mayaJsonString);
            const mayaObject = JSON.parse(mayaJsonString);
            console.log(mayaObject);

            this._applicationDbContext = ApplicationDbContext; // Reference the ApplicationDbContext Literal Object
            this._applicationDbContext.init(mayaObject.id); // Call the init function from the previous object

            this._applicationDbContext.addStickyNote(mayaObject);
            //this._applicationDbContext.getStickyNotes();
            //this._applicationDbContext.updateStickyNote(name);

            //window.localStorage.clear();
            

            var lala = this;

            var els = document.querySelectorAll(".list .note");
            // Or
            [].forEach.call(els, function (el) {
                el.addEventListener('click',function(e){
                    var name = el.getAttribute('id');
                    console.log(el)
                    lala._applicationDbContext.deleteStickyNoteById(name);
                });
            });
        }
    };

    App.init();
})();