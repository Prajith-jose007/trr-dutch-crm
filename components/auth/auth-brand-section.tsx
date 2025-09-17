export function AuthBrandSection() {
  const backgroundPattern =
    "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-slate-600/20" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("${backgroundPattern}")` }} />

      <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
              <span className="text-orange-500 font-bold text-xl">DC</span>
            </div>
            <h1 className="text-2xl font-bold">Dutch CRM</h1>
          </div>
          <h2 className="text-2xl font-bold mb-6 leading-tight">Powerful Customer Relationship Management</h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Manage your customers, leads, and sales effectively with our comprehensive CRM platform. Increase your
            productivity and strengthen customer relationships.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-slate-500/10 rounded-full blur-xl" />
    </>
  )
}
