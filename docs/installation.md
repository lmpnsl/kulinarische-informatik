# Installation - Kulinarische Drafts Actions

📖 **Navigation**: [🏠 Hauptseite](../README.md) | [📝 Journal](../actions/journal-verwaltung/README.md) | [🍳 Rezepte](../actions/rezept-verwaltung/README.md) | [🍷 Wein](../actions/wein-verwaltung/README.md)

---

## 🚀 Installation

### Schritt 1: Actions in Drafts importieren

Da die Actions individuelle JavaScript-Skripte sind, müssen sie manuell in Drafts erstellt werden. Siehe dazu die [Drafts-Dokumentation](https://docs.getdrafts.com).

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

#### 4. Backprotokoll ⭐ WICHTIG (nur wenn man Backen dokumentieren möchte)
````
Titel: Backprotokoll
^^^^^^^^^^^^^
EXAKT so schreiben!
Tags: keine speziellen Tags erforderlich
Inhalt: Leer lassen (wird automatisch befüllt)
```

### Schritt 3: Benötigte Workspaces erstellen

**Diese Workspaces MÜSSEN existieren!** Die Namen müssen **exakt** so geschrieben werden:

#### Workspace-Erstellung in Drafts:
1. Gehe zu den Workspace-Einstellungen
2. Tippe auf "+" um einen neuen Workspace zu erstellen
3. Gib den **exakten** Namen ein
4. Setze den entsprechenden Tag-Filter
5. Speichere den Workspace

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

## 🏷️ Tag-System verstehen

Das System arbeitet mit einem strukturierten Tag-System:

### Rezept-Tags
- `rezept` - Grundtag für alle Rezepte
- `neuesrezept` - Neue, noch nicht getestete Rezepte  
- `verworfenesrezept` - Rezepte, die nicht gut waren
- `rezept/beilage` - Kategorien mit Präfix
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