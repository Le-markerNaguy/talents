"use client"

export default function AdminStats() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm">Talents</span>
        <span className="font-medium">127</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Recommandations</span>
        <span className="font-medium">85</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">En attente</span>
        <span className="font-medium">42</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Approuvés</span>
        <span className="font-medium">156</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Rejetés</span>
        <span className="font-medium">14</span>
      </div>
    </div>
  )
}
