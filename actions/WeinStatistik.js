// Alle VKN-Drafts laden
let vkns = Draft.query("", "all", ["vkn"], [], "created", true, false);

if (vkns.length === 0) {
    app.displayWarningMessage("Keine Verkostungsnotizen gefunden");
    context.cancel();
} else {
    let totalWines = vkns.length;
    let allRatings = []; // { score, year, name, vintage }
    let ratingsPerYear = {}; // year → [scores]

    for (let vkn of vkns) {
        let lines = vkn.content.split('\n');
        let currentVintage = null;
        let currentYear = null;

        for (let line of lines) {
            let vintageMatch = line.match(/^## Jahrgang (\d{4})$/);
            if (vintageMatch) { currentVintage = vintageMatch[1]; continue; }

            let dateMatch = line.match(/^### verkostet am \d{2}\.\d{2}\.(\d{4})$/);
            if (dateMatch) { currentYear = dateMatch[1]; continue; }

            if (line.startsWith('⭐')) {
                let scoreMatch = line.match(/(\d+)/);
                if (scoreMatch) {
                    let score = parseInt(scoreMatch[1]);
                    allRatings.push({ score, year: currentYear, name: vkn.displayTitle, vintage: currentVintage });
                    if (currentYear) {
                        ratingsPerYear[currentYear] = ratingsPerYear[currentYear] || [];
                        ratingsPerYear[currentYear].push(score);
                    }
                }
            }
        }
    }

    let winesWithRating = new Set(allRatings.map(r => r.name)).size;

    // Gesamtstatistik
    let scores = allRatings.map(r => r.score);
    let avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : null;
    let minScore = scores.length > 0 ? Math.min(...scores) : null;
    let maxScore = scores.length > 0 ? Math.max(...scores) : null;

    // Punkteverteilung
    let brackets = [
        { label: "95+  ", min: 95, max: Infinity },
        { label: "90–94", min: 90, max: 94 },
        { label: "85–89", min: 85, max: 89 },
        { label: "80–84", min: 80, max: 84 },
        { label: "<80  ", min: 0,  max: 79 }
    ];
    let bracketCounts = brackets.map(b => scores.filter(s => s >= b.min && s <= b.max).length);
    let maxCount = Math.max(...bracketCounts, 1);
    let barWidth = 16;

    // Top 10 Weine
    let top10 = allRatings
        .slice()
        .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
        .slice(0, 10);

    // Jahresübersicht
    let sortedYears = Object.keys(ratingsPerYear).sort((a, b) => b - a);

    // Ausgabe aufbauen
    let msg = `🍷 Weine gesamt: ${totalWines} (${winesWithRating} mit Bewertung)\n`;

    if (scores.length === 0) {
        msg += "\nNoch keine Bewertungen erfasst.";
    } else {
        msg += `\n⭐ Bewertungen gesamt (${scores.length} Verkostungen):\n`;
        msg += `  Ø ${avg} Punkte  |  Min: ${minScore}  |  Max: ${maxScore}\n\n`;

        for (let i = 0; i < brackets.length; i++) {
            let count = bracketCounts[i];
            let filled = Math.round((count / maxCount) * barWidth);
            let bar = "█".repeat(filled) + "░".repeat(barWidth - filled);
            msg += `  ${brackets[i].label}  ${bar}  ${count}\n`;
        }

        msg += `\n🏆 Top 10 Weine:\n`;
        for (let r of top10) {
            let vintageStr = r.vintage ? ` (${r.vintage})` : "";
            msg += `  ${r.score} – ${r.name}${vintageStr}\n`;
        }

        msg += `\n📅 Nach Verkostungsjahr:\n`;
        for (let year of sortedYears) {
            let ys = ratingsPerYear[year];
            let yAvg = (ys.reduce((a, b) => a + b, 0) / ys.length).toFixed(1);
            msg += `  ${year}:  ${ys.length} Verkostungen  |  Ø ${yAvg}\n`;
        }
    }

    let p = Prompt.create();
    p.title = "Weinstatistik";
    p.message = msg;
    p.addButton("OK");
    p.isCancellable = false;
    p.show();
}
