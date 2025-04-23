// German translations for the application
export const translations = {
  common: {
    loading: "Wird geladen...",
    error: "Ein Fehler ist aufgetreten",
    send: "Senden",
    helpful: "Hilfreich",
    notHelpful: "Nicht hilfreich",
    showSources: "Quellen anzeigen",
    hideSources: "Quellen ausblenden",
    sources: "Quellen",
    response: "Antwort",
    file: "Datei",
    chunk: "Abschnitt",
    imageLoadError: "Bild konnte nicht geladen werden",
    search: "Suchen",
    searchPlaceholder: "Wissensdatenbank durchsuchen...",
    categories: "Kategorien",
    allCategories: "Alle Kategorien",
    noResults: "Keine Ergebnisse gefunden",
    feedback: "Feedback",
    submit: "Absenden",
    cancel: "Abbrechen",
    compare: "Vergleichen",
    extract: "Wichtige Teile extrahieren",
    upload: "Hochladen",
    uploadFile: "Datei hochladen",
    dragAndDrop: "Ziehen Sie Dateien hierher oder klicken Sie zum Hochladen",
    fileUploaded: "Datei hochgeladen",
    textComparison: "Textvergleich",
    originalText: "Originaltext",
    comparedText: "Verglichener Text",
    differences: "Unterschiede",
    similarities: "Ähnlichkeiten",
    importantParts: "Wichtige Teile",
    splitView: "Geteilte Ansicht",
    overlayView: "Überlagerte Ansicht",
    combinedView: "Kombinierte Ansicht",
    knowledgeBase: "Wissensdatenbank",
    textComparator: "Textvergleich",
  },
  chat: {
    welcome: "Willkommen beim RAG Assistenten",
    welcomeMessage: "Stellen Sie eine Frage, um zu beginnen",
    inputPlaceholder: "Schreiben Sie Ihre Nachricht hier...",
    feedbackQuestion: "War diese Antwort hilfreich?",
  },
  query: {
    inputPlaceholder: "Geben Sie Ihre Anfrage hier ein...",
    sendQuery: "Anfrage senden",
  },
  tabs: {
    chat: "Gesprächsmodus",
    query: "Einzelanfragemodus",
    knowledgeBase: "Wissensdatenbank",
    textComparison: "Textvergleich",
  },
  appTitle: "LLM RAG Assistent",
  knowledgeBase: {
    title: "Wissensdatenbank",
    search: "Suchen",
    categories: {
      general: "Allgemein",
      technical: "Technisch",
      business: "Geschäftlich",
      legal: "Rechtlich",
      other: "Sonstiges",
    },
    feedback: {
      title: "Feedback geben",
      helpful: "War dieser Artikel hilfreich?",
      suggestion: "Haben Sie Vorschläge zur Verbesserung?",
      thankYou: "Vielen Dank für Ihr Feedback!",
    },
  },
  textComparison: {
    title: "Textvergleich",
    file1: "Datei 1",
    file2: "Datei 2",
    uploadInstructions: "Laden Sie zwei Textdateien hoch, um sie zu vergleichen",
    compareButton: "Vergleichen",
    extractButton: "Wichtige Teile extrahieren",
    viewOptions: "Ansichtsoptionen",
    loadingComparison: "Vergleich wird durchgeführt...",
    noFilesSelected: "Keine Dateien ausgewählt",
    fileSelected: "Datei ausgewählt",
    processingFiles: "Dateien werden verarbeitet...",
    comparisonComplete: "Vergleich abgeschlossen",
    extractionComplete: "Extraktion abgeschlossen",
    addedContent: "Hinzugefügter Inhalt",
    removedContent: "Entfernter Inhalt",
    unchangedContent: "Unveränderter Inhalt",
    importantContent: "Wichtiger Inhalt",
  },
}

// Helper function to format dates in German style
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Helper function to format numbers in German style
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("de-DE").format(num)
}
