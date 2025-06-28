// fügt einen Link zum aktuellen Draft einem bestehenden Menüplanungsdraft in der Inbox hinzu
const thisdraft = draft.processTemplate("[[display_title]]");
const thisdraftlink = `- [[` + thisdraft + `]]`;
const planungsdrafts = Draft.query("", "inbox", ["menüplanung"])
const workspace = Workspace.find("Menüplanung");
const LastDraftModified = Draft.query("", "all", [], [], "modified", true)[0];
const [lStart, lEnd] = editor.getSelectedLineRange();
const currentLine = editor.getTextInRange(lStart, lEnd).trim();

let menuplanung = null;	//richtiger Menüplanungs-Draft
let task = null; //was soll zur Menüplanung hinzugefügt werden?
let doneCheck = false;

// geht es um Wein oder um ein Rezept?
if (draft.hasTag("rezept")) {
	task = "rezeptdraft";
} else if (draft.hasTag("menüplanung")) {
	task = "zeile";
} else if (draft.hasTag("wein")) {
	task = "wein";
}

function addToMenuplanung() {
	if (task == "rezeptdraft") {
		if (menuplanung.content.includes("## inv")) {
			menuplanung.content = menuplanung.content.replace("## inv", "## inv\n" + thisdraftlink)
		} else {
			menuplanung.content = menuplanung.content + "\n" + thisdraftlink;
		}
	} else if (task == "zeile") {
		if (menuplanung.content.includes("## inv")) {
			menuplanung.content = menuplanung.content.replace("## inv", "## inv\n" + currentLine)
		} else {
			menuplanung.content = menuplanung.content + "\n" + currentLine;
		}
	} else if (task == "wein") {
		if (menuplanung.content.includes("## Wein")) {
			menuplanung.content = menuplanung.content.replace("## Wein", "## Wein\n" + currentLine)
		} else {
			menuplanung.content = menuplanung.content + "\n" + currentLine;
		}
	} else {
		menuplanung.content = menuplanung.content + "\n" + currentLine;
	}
		menuplanung.update();
		doneCheck = true;
		return menuplanung;
}

// richtigen menüplanungs-Draft finden
if (LastDraftModified.hasTag("menüplanung") && !LastDraftModified.isArchived && !LastDraftModified.isTrashed) {
	menuplanung = LastDraftModified;
	addToMenuplanung();
} else if (planungsdrafts.length == 0) {
	app.displayErrorMessage("kein Menüplanungs-Draft gefunden :(")
} else if (planungsdrafts.length == 1) {
	menuplanung = planungsdrafts[0];
	addToMenuplanung();
} else if (planungsdrafts.length > 0) {
	menuplanung = app.selectDraft(workspace);
	addToMenuplanung();
}

if (doneCheck) {
	let menuplanungTitle = menuplanung.processTemplate("[[display_title]]");
	app.displayInfoMessage("🎯" + menuplanungTitle)
}