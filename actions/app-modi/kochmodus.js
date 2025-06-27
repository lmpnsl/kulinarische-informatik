let p = Prompt.create();
p.title = "Kochmodus"
p.message = "Bearbeitung und automatische Bildschirmabschaltung deaktivieren"

p.addButton("einschalten")
p.addButton("ausschalten")
p.isCancellable = true

if (p.show()) {
	if (p.buttonPressed == "einschalten") {
		app.isIdleDisabled = true
		editor.focusModeEnabled = true
		editor.linkModeEnabled = true
	}
	else { // ausschalten
		app.isIdleDisabled = false
		editor.focusModeEnabled = false
		editor.linkModeEnabled = false
	}
}