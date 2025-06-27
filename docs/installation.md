# Installation - Kulinarische Drafts Actions

📖 **Navigation**: [🏠 Hauptseite](../README.md) | [📝 Journal](../actions/journal-verwaltung/README.md) | [🍳 Rezepte](../actions/rezept-verwaltung/README.md) | [🍷 Wein](../actions/wein-verwaltung/README.md)

---

## 🚀 Installation

### Schritt 1: Actions in Drafts importieren

Da die Actions individuelle JavaScript-Skripte sind, müssen sie manuell in Drafts erstellt werden:

1. **Neue Action erstellen**:
   - Öffnen Sie Drafts
   - Gehen Sie zu den Action-Einstellungen (Zahnrad-Symbol)
   - Tippen Sie auf "+" um eine neue Action zu erstellen

2. **Action konfigurieren**:
   - Geben Sie den **Namen** der Action ein (z.B. "neues Rezept einspeisen")
   - Fügen Sie ein **Icon** hinzu (optional)
   - Wählen Sie **"Script"** als Action-Typ

3. **JavaScript-Code einfügen**:
   - Kopieren Sie den Inhalt der entsprechenden .js-Datei
   - Fügen Sie ihn in das Script-Feld ein
   - Speichern Sie die Action

4. **Wiederholen** für alle gewünschten Actions

### Empfohlene Installationsreihenfolge

**Start mit den Grundlagen:**
1. `kulinarischerTagebucheintrag.js` - Kern des Systems
2. `NeueWocheInsJournal.js` - Wochenplanung
3. `neuesRezeptEinspeisen.js` - Rezeptverwaltung
4. `kochplanZeigen.js` - Kochplanung

**Erweiterte Features:**
5. `WeinflascheEntkorkt.js` - Weinverkostung
6. `BesuchWarDa.js` - Gästeverwaltung
7. Weitere nach Bedarf

## 📋 Systemvoraussetzungen

### Drafts App
- **Version**: Drafts 5.x oder höher
- **Plattformen**: iOS 14+, iPadOS 14+, macOS 11+
- **Download**: [App Store](https://apps.apple.com/app/drafts/id1435957248)

## ⚠️ KRITISCHES SETUP - Ohne diese Schritte funktioniert nichts!

### Schritt 2: Benötigte Drafts erstellen

**Diese Drafts MÜSSEN existieren, sonst schlagen Actions fehl!** 

#### 1. Kulinarisches Journal ⭐ WICHTIGSTER DRAFT
```
Titel: Journal culinaire 2025
       ^^^^^^^^^^^^^^^^^^^^ 
       EXAKT so schreiben! Mit aktuellem Jahr!
Tags: keine speziellen Tags erforderlich
Inhalt: Leer lassen (wird automatisch befüllt)
```

**📅 Wichtig:** 
- Am Jahresende neuen Draft "Journal culinaire 2026" erstellen
- Alte Journals können archiviert bleiben

#### 2. Kochplan ⭐ WICHTIG  
```
Titel: Kochplan:
       ^^^^^^^^^
       EXAKT so schreiben! Mit Doppelpunkt!
Tags: keine speziellen Tags erforderlich  
Inhalt: Leer lassen
```

#### 3. Weinprotokoll ⭐ WICHTIG (nur bei Weinverkostung)
```
Titel: Weinprotokoll
       ^^^^^^^^^^^^^
       EXAKT so schreiben!
Tags: keine speziellen Tags erforderlich
Inhalt: Leer lassen (wird automatisch befüllt)
```

### Schritt 3: Benötigte Workspaces erstellen

**Diese Workspaces MÜSSEN existieren!** Die Namen müssen **exakt** so geschrieben werden:

#### Workspace-Erstellung in Drafts:
1. Gehen Sie zu den Workspace-Einstellungen
2. Tippen Sie auf "+" um einen neuen Workspace zu erstellen
3. Geben Sie den **exakten** Namen ein
4. Setzen Sie den entsprechenden Tag-Filter
5. Speichern Sie den Workspace

#### Benötigte Workspaces:

**1. Rezepte** ⭐ WICHTIG
- Name: `Rezepte` (exakt so!)
- Filter: Tag enthält "rezept"

**2. Menüplanung** ⭐ WICHTIG  
- Name: `Menüplanung` (exakt so!)
- Filter: Tag enthält "menüplanung"

**3. Verkostungsnotizen** ⭐ WICHTIG
- Name: `Verkostungsnotizen` (exakt so!)
- Filter: Tag enthält "vkn"

## ✅ Setup-Checkliste

Haken Sie jeden Punkt ab, um sicherzustellen, dass alles funktioniert:

### Installation:
- [ ] Drafts App installiert (Version 5.x+)
- [ ] Mindestens 3-4 wichtigste Actions erstellt
- [ ] Actions getestet (keine JavaScript-Fehler)

### Kritische Drafts:
- [ ] Draft "Journal culinaire 2025" erstellt (exakter Titel!)
- [ ] Draft "Kochplan:" erstellt (mit Doppelpunkt!)
- [ ] Draft "Weinprotokoll" erstellt (falls Weinverkostung gewünscht)

### Kritische Workspaces:
- [ ] Workspace "Rezepte" erstellt (Tag-Filter: "rezept")
- [ ] Workspace "Menüplanung" erstellt (Tag-Filter: "menüplanung")  
- [ ] Workspace "Verkostungsnotizen" erstellt (Tag-Filter: "vkn")

### Funktionstest:
- [ ] "Neue Woche ins Journal" ausgeführt → Woche wurde eingefügt
- [ ] "kulinarischer Tagebucheintrag" getestet → Menü erscheint
- [ ] Erstes Rezept mit "neues Rezept einspeisen" erstellt
- [ ] "Kochplan zeigen" funktioniert

## 🏷️ Tag-System verstehen

Das System arbeitet mit einem strukturierten Tag-System:

### Rezept-Tags
- `rezept` - Grundtag für alle Rezepte
- `neuesrezept` - Neue, noch nicht getestete Rezepte  
- `verworfenesrezept` - Rezepte, die nicht gut waren
- `rezept/hauptgang` - Kategorien mit Präfix
- `rezept/dessert` - Weitere Kategorien
- `rezept/vorspeise` - Etc.

### Andere wichtige Tags
- `vkn` - Verkostungsnotizen für Wein
- `quickvkn` - Schnelle Weinnotizen
- `besuch` - Gäste-Dokumentation
- `menüplanung` - Menüplanungen
- `wein` - Wein-bezogene Inhalte

## 🔧 Erste Schritte nach Installation

### 1. Journal einrichten
```
Action: "Neue Woche ins Journal"
→ Erstellt automatisch die erste Woche
→ Journal wird mit Datumstabelle gefüllt
```

### 2. Erstes Rezept
```
1. Neuen Draft mit Rezept erstellen
2. Action: "neues Rezept einspeisen" 
3. Tags auswählen
→ Rezept wird automatisch archiviert und getaggt
```

### 3. Ersten Kochplan erstellen
```
1. Bei einem Rezept: Action "auf den Kochplan setzen!"
2. Action: "Kochplan zeigen"
→ Kochplan wird automatisch erstellt und angezeigt
```

### 4. Erste Weinverkostung (optional)
```
1. Im Journal: Action "Weinflasche entkorkt"
2. Oder: Action "Quick VKN" für schnelle Notiz
→ Verkostungsnotiz wird erstellt und verlinkt
```

## 🆘 Häufige Probleme und Lösungen

### "Draft nicht gefunden" Fehler
⭐ **Häufigster Fehler!** Überprüfen Sie:
- Draft-Titel **exakt** richtig geschrieben?
- Journal: "Journal culinaire 2025" (mit aktuellem Jahr!)
- Kochplan: "Kochplan:" (mit Doppelpunkt!)
- Workspace-Namen **exakt** richtig?

### JavaScript-Fehler
- Stellen Sie sicher, dass der komplette Code kopiert wurde
- Prüfen Sie auf fehlende Anführungszeichen oder Klammern
- Testen Sie Actions einzeln

### Actions erscheinen nicht
- Überprüfen Sie die Action-Sichtbarkeit (Einstellungen)
- Stellen Sie sicher, dass Actions aktiviert sind
- Workspaces korrekt konfiguriert?

### Tag-System funktioniert nicht
- Verwenden Sie nur kleingeschriebene Tags
- Nutzen Sie "Tags zuweisen" für nachträgliche Tag-Vergabe
- Überprüfen Sie Tag-Filter in Workspaces

## ⚙️ Anpassungen

### Tags erweitern
Sie können weitere Rezept-Kategorien hinzufügen:
1. Erstellen Sie neue Tags mit dem Präfix `rezept/`
2. Z.B. `rezept/backen`, `rezept/vegetarisch`, etc.
3. Passen Sie Workspace-Filter entsprechend an

### Actions anpassen
Die meisten Actions können bearbeitet werden:
1. Gehen Sie zur Action-Liste
2. Tippen Sie auf die drei Punkte neben einer Action
3. Wählen Sie "Bearbeiten"
4. Passen Sie JavaScript-Code oder Einstellungen an

## 🔄 Wartung

### Jährliches Update
- Erstellen Sie zum Jahresende einen neuen Journal-Draft
- "Journal culinaire 2026" für das neue Jahr
- Alte Journals können archiviert bleiben

### Backup
- Erstellen Sie regelmäßig Backups Ihrer Drafts
- Exportieren Sie wichtige Actions als Sicherung

## 📞 Hilfe

### Bei Problemen:
1. Prüfen Sie die Setup-Checkliste
2. Kontrollieren Sie exakte Schreibweise aller Namen
3. Testen Sie Actions einzeln
4. Überprüfen Sie JavaScript-Konsole in Drafts

### Tipps:
- Beginnen Sie mit dem kulinarischen Journal (siehe [Journal-Verwaltung](../kategorien/journal-verwaltung/README.md))
- Nutzen Sie "Kochmodus" beim aktiven Kochen  
- "Zufallsrezept zeigen!" hilft bei der Inspiration
- Sichern Sie regelmäßig Ihre Daten

## 📖 Nächste Schritte

Nach erfolgreicher Installation:

1. **[📝 Journal einrichten](../kategorien/journal-verwaltung/README.md#erste-schritte-nach-installation)** - Erste Woche erstellen
2. **[🍳 Erstes Rezept](../kategorien/rezept-verwaltung/README.md#typische-workflows)** - Rezept erfassen und bewerten  
3. **[🍷 Weinverkostung](../kategorien/wein-verwaltung/README.md#typische-workflows)** - Falls Sie Wein trinken

## 📖 Siehe auch

- **[🏠 Hauptseite](../README.md)** - Zurück zur Übersicht
- **[📝 Journal-Verwaltung](../kategorien/journal-verwaltung/README.md)** - Detaillierte Journal-Anleitung
- **[🍳 Rezept-Verwaltung](../kategorien/rezept-verwaltung/README.md)** - Rezepte organisieren
- **[🍷 Wein-Verwaltung](../kategorien/wein-verwaltung/README.md)** - Weinverkostung (für Fortgeschrittene)

---

**Viel Spaß beim kulinarischen Dokumentieren! 👨‍🍳**

> **💡 Tipp:** Beginnen Sie klein - installieren Sie erst 3-4 Actions, testen Sie diese gründlich, und erweitern Sie dann nach Bedarf.