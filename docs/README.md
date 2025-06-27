# Kulinarische Drafts Actions - Repository Struktur

```
kulinarische-drafts-actions/
├── README.md
├── LICENSE
├── docs/
│   ├── installation.md
│   ├── setup-anleitung.md
│   └── screenshots/
├── actions/
│   ├── journal-verwaltung/
│   │   ├── NeueWocheInsJournal.js
│   │   ├── kulinarischerTagebucheintrag.js
│   │   └── README.md
│   ├── gaeste-verwaltung/
│   │   ├── BesuchWarDa.js
│   │   └── README.md
│   ├── menue-planung/
│   │   ├── zurMenueplanungHinzufuegen.js
│   │   └── README.md
│   ├── rezept-verwaltung/
│   │   ├── neuesRezeptEinspeisen.js
│   │   ├── dasKocheNieWieder.js
│   │   ├── hatGutGeschmeckt.js
│   │   ├── tagsZuweisen.js
│   │   └── README.md
│   ├── koch-planung/
│   │   ├── aufDenKochplanSetzen.js
│   │   ├── KochplanAufraeumen.js
│   │   ├── kochplanZeigen.js
│   │   └── README.md
│   ├── wein-verwaltung/
│   │   ├── WeinflascheEntkorkt.js
│   │   ├── QuickVKN.js
│   │   └── README.md
│   └── app-modi/
│       ├── kochmodus.js
│       └── README.md
├── vorlagen/
│   ├── journal-vorlage.md
│   ├── rezept-vorlage.md
│   └── wein-verkostung-vorlage.md
└── beispiele/
    ├── beispiel-journal.md
    ├── beispiel-rezept.md
    └── beispiel-weinnotiz.md
```

## Haupt-README.md Struktur

```markdown
# Kulinarische Drafts Actions

Eine umfassende Sammlung von Drafts Actions für die digitale Verwaltung kulinarischer Aktivitäten.

## 🍳 Überblick

Dieses Repository enthält spezialisierte Drafts Actions für:
- Kulinarisches Journaling
- Rezeptverwaltung
- Menüplanung
- Weinverkostungsnotizen
- Gästeverwaltung
- Kochplanung

## 📱 Kompatibilität

- **Drafts Version**: 5.x oder höher
- **Plattformen**: iOS, iPadOS, macOS
- **Sprache**: Deutsch

## 🚀 Schnellstart

**Neu hier? Beginnen Sie hier:**

1. [📥 Installation & Setup](docs/installation.md) - **Hier beginnen!**
2. [✅ Setup-Checkliste](docs/installation.md#setup-checkliste) - Nichts vergessen
3. [📝 Erstes Journal](kategorien/journal-verwaltung/README.md#erste-schritte-nach-installation) - Loslegen

## 📚 Dokumentation

### 🚀 Erste Schritte
- **[⚙️ Installation & Setup](docs/installation.md)** - Schritt-für-Schritt Anleitung mit Checkliste
- **[🏗️ Systemvoraussetzungen](docs/installation.md#kritisches-setup)** - Erforderliche Drafts und Workspaces

### 📋 Kern-Workflows (Detaillierte Anleitungen)
- **[📝 Journal-Verwaltung](actions/journal-verwaltung/README.md)** - *Herzstück des Systems*
  - Tägliche Essenseinträge
  - Wochenplanung und Navigation
  
- **[🍳 Rezept-Verwaltung](actions/rezept-verwaltung/README.md)** - *Rezepte organisieren und bewerten*
  - Neue Rezepte erfassen und kategorisieren
  - Bewertungssystem nach dem Kochen

- **[🍷 Wein-Verwaltung](actions/wein-verwaltung/README.md)** - *Komplexe Verkostungsnotizen*
  - Detaillierte Verkostungsnotizen (VKN)
  - Automatisches Weinprotokoll

## 📂 Einfache Action-Kategorien

*Diese werden direkt hier erklärt - keine separaten READMEs nötig:*

### Koch-Planung
- **auf den Kochplan setzen!** - Rezept für's Kochen vormerken
- **Kochplan aufräumen** - Erledigte Einträge entfernen  
- **Kochplan zeigen** - Aktuellen Plan anzeigen

**💡 Tipp**: Setzen Sie den Kochplan in den Editor-Einstellungen auf Syntax "TaskPaper+" - dann können Sie Einträge durch Antippen abhaken!

### Menü-Planung
- **zur Menüplanung hinzufügen** - Rezepte und Weine zu Menüs hinzufügen

### Gäste-Verwaltung  
- **Besuch war da** - Gäste im Journal dokumentieren, automatische Gästeprofile

### App-Modi
- **Kochmodus** - Fokus-Modus fürs Kochen (kein Bildschirm-Timeout, Link-Modus)

## 🎯 Systemvoraussetzungen

Das System arbeitet mit folgenden Draft-Typen:
- **Journal culinaire YYYY**: Hauptjournal für das jeweilige Jahr
- **Kochplan**: Zentrale Kochplanung
- **Weinprotokoll**: Chronologische Weinverkostungen
- **Rezept-Drafts**: Mit Tags "rezept", "neuesrezept" oder "verworfenesrezept"
- **VKN-Drafts**: Verkostungsnotizen mit Tag "vkn"
- **Gäste-Drafts**: Mit Tag "besuch"

## 🔧 Benötigte Workspaces

- **Rezepte**: Für die Rezeptverwaltung
- **Menüplanung**: Für Menüplanungen
- **Verkostungsnotizen**: Für Weinnotizen

**Empfohlen:**
- **kochen!**: Geflaggte Rezepte für die Küchenpraxis
- **Neue Rezepte**: Noch nicht getestete Rezepte

## 🆘 Hilfe und Support

### Bei Problemen
- **[🚨 Häufige Probleme](docs/installation.md#häufige-probleme-und-lösungen)** - Lösungen für typische Fehler
- **[📋 Setup-Checkliste](docs/installation.md#setup-checkliste)** - Alles richtig konfiguriert?

### Workflow-spezifische Hilfe
- [Journal-Probleme](actions/journal-verwaltung/README.md#häufige-probleme)
- [Rezept-Tags funktionieren nicht](actions/rezept-verwaltung/README.md#häufige-probleme)
- [Wein-Workspace Fehler](actions/wein-verwaltung/README.md#häufige-probleme)

## 🔄 Typischer Arbeitsablauf

```
Planung → Kochen → Dokumentation:

1. 📋 Kochplan erstellen/anzeigen
2. 🍳 Kochmodus aktivieren (beim Kochen)  
3. 📝 Kulinarischer Tagebucheintrag (nach dem Essen)
4. 🍷 Weinflasche entkorkt (falls Wein dazu)
5. 👥 Besuch war da (falls Gäste da waren)
```

## 🤝 Beitragen

Verbesserungsvorschläge und Pull Requests sind willkommen! Bitte:
1. Fork des Repositories erstellen
2. Feature-Branch erstellen
3. Änderungen commiten
4. Pull Request öffnen

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 👨‍🍳 Entwickelt für

Dieses System wurde für Hobbyköche und Food-Enthusiasten entwickelt, die ihre kulinarischen Aktivitäten systematisch dokumentieren möchten.

---

**Viel Spaß beim kulinarischen Dokumentieren! 🍽️**

> **💡 Neu hier?** Beginnen Sie mit der [Installation](docs/installation.md) und erstellen Sie dann Ihr erstes [kulinarisches Journal](kategorien/journal-verwaltung/README.md)!
```