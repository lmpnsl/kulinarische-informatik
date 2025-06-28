let kochplan = Draft.queryByTitle("Kochplan:")[0]
kochplan.content = kochplan.content.replace(/^.*@done\n?/gm, '');
kochplan.update();