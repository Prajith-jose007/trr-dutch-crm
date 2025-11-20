<<<<<<< HEAD
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
          <h2 className="text-2xl font-bold mb-6 leading-tight">Krachtige Customer Relationship Management</h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Beheer uw klanten, leads en verkoop effectief met ons uitgebreide CRM-platform. Verhoog uw productiviteit en
            versterk klantrelaties.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Klantenbeheer</h3>
              <p className="text-slate-300">Centraliseer al uw klantgegevens en interacties op één plek.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Sales Pipeline</h3>
              <p className="text-slate-300">Volg leads en deals door uw verkoopproces met gedetailleerde analytics.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Team Samenwerking</h3>
              <p className="text-slate-300">Werk samen met rolgebaseerde toegang en real-time updates.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            "Dutch CRM heeft onze klantrelaties getransformeerd. De intuïtieve interface en krachtige functies maken het
            een plezier om te gebruiken."
          </p>
          <div className="flex items-center mt-4">
            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-medium">PJ</span>
            </div>
            <div>
              <p className="font-medium">Pieter Janssen</p>
              <p className="text-slate-400 text-sm">Sales Manager, TechBedrijf</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-slate-500/10 rounded-full blur-xl" />
    </>
  )
}
=======
import Image from "next/image";

export function AuthBrandSection() {
  return (
    <>
      <Image
        src="/banner.JPG"
        alt="Login Banner"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
    </>
  )
}
>>>>>>> refs/remotes/origin/main
