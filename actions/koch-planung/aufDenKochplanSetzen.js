const kochplan = Draft.queryByTitle("Kochplan:")[0]
let thisdraft = draft.processTemplate("[[display_title]]");
newentry = `- [[` + thisdraft + `]]`

// add link to current draft to kochplan
kochplan.append(newentry)
kochplan.update()