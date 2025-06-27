let template = "\nℹ️ \n👃 \n👄 \n💬 \n⭐ "
let wine = "";

// Zeile
var [lStart, lEnd] = editor.getSelectedLineRange();
var line = editor.getTextInRange(lStart, lEnd).trim();

// Wein aus Eintrag ableiten
if (line.substring(0, 2) == "- ") {
    wine = line.substring(2)
}

// Quick-VKN erstellen
let quickvkn = new Draft();

// Titel und Schablone einsetzen
if (wine) {
    quickvkn.content = "# " + wine + template;
} else {
    quickvkn.content =  template;
}

// Tag setzen und zur VKN springen
quickvkn.addTag("quickvkn");
quickvkn.update();
editor.load(quickvkn);