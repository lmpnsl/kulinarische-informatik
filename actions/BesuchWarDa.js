// Zeile im Journal
var [lStart, lEnd] = editor.getSelectedLineRange();
var line = editor.getTextInRange(lStart, lEnd).trim();
if (editor.draft.displayTitle.match(/Journal\sculinaire\s(\d{4})/)) {
    year = editor.draft.displayTitle.match(/Journal\sculinaire\s(\d{4})/)[1];
    if (line.match(/\w{2}\s\d{2}\.\d{2}\.\s-\s/)) {
        line = line.replace(/^\w{2}\s(\d{2}\.\d{2}\.)\s-\s/, '$1' + year + ' - ');
    }
}

// GastEinträge
var guestDraft = [];

//Eintrag im Journal
let isFirstEntry = false;
if (line.search(/\(zu Besuch:/) !== -1) {
    isFirstEntry = true;
}
function guestEntry() {
    if (isFirstEntry) {
        editor.setSelectedText(', ' + guestsList + ')');
    } else {
        editor.setSelectedText(' (zu Besuch: ' + guestsList + ')');
    }
    if (guestsList.indexOf(',') !== -1) {
        line += ' (👫 ' + guestsList + ')';
    }
}

// updateGuests
function updateGuests() {
    //Eintrag auf Gast-Draft
    guests.forEach(function(g) {
        var q = 'title:' + g
        var draft = Draft.query(q, "all", ["besuch"]);
        guestDraft.push(draft);
    });
    guestDraft.forEach(function(d) {
        d[0].append('- ' + line)
        d[0].update();
    });
}

// addGuests
function addGuests() {
    // Promt 
    let n = Prompt.create();
    n.title = 'Neuen Gast einspeisen';
    n.message = 'Wer war denn da?\nMehrere Gäste bitte per Komma trennen.'
    n.addTextField('name', 'Name', '');
    n.addButton('OK', 1, true);
    n.show()
    if (n.buttonPressed == 1) { // OK
        var newGuest = n.fieldValues["name"];
        if (guests.length !== 0) {
            guestsList += ', ' + newGuest;
        } else {
            guestsList += newGuest;
        }
    guestEntry()
    //neuen Gast-Draft
    newGuest = newGuest.split(",")
    newGuest.forEach(function(n) {
        var newGuestDraft = Draft.create();
        newGuestDraft.addTag('besuch');
        newGuestDraft.isArchived = true;
        newGuestDraft.content = '# ' + n + '\n\n- ' + line;
        newGuestDraft.update();
    });
    };
}


// Prompt
let tag = 'besuch'
let entries = Draft.query("", "all", [tag])
let allguests = [];
for (let e of entries) {
	allguests.push(e.processTemplate("[[display_title]]"));
}
allguests = allguests.sort();
let s = Prompt.create();
s.title = "Besuch war da";
s.message = "Wer war zu Besuch?";
s.addSelect('allguests', '', allguests, [], true);
s.addButton('OK', 1, true);
s.addButton("Neuer Gast", 2, true);
s.show();

// Wer was da?
if (s.show) {
    var guests = s.fieldValues['allguests'];
    var guestsList = guests.join(', ');
}

//Buttons gedrückt
if (s.buttonPressed == 1) { //OK
    guestEntry();
    updateGuests()
} else if (s.buttonPressed == 2) { //neuer Gast
    addGuests()
    if (guests.length !== 0) {
        updateGuests();
    }
} else { //cancel
    context.cancel()
} 