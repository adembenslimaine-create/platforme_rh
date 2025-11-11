"use client"

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres Système</h1>
        <p className="text-foreground-muted mt-2">Configurez les paramètres de votre organisation</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Organization */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Informations Organisationnelles</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nom de l'organisation</label>
              <input
                type="text"
                defaultValue="TalentHub Tunisia"
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email de contact</label>
              <input
                type="email"
                defaultValue="info@talenhub.tn"
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Pays</label>
              <input
                type="text"
                defaultValue="Tunisie"
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface-variant"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  )
}
