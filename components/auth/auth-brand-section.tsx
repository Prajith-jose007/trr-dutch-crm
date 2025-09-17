import Image from "next/image";

export function AuthBrandSection() {
  return (
    <>
      <Image
        src="https://picsum.photos/seed/yacht-auth/1200/1800"
        alt="Yacht"
        fill
        className="object-cover"
        data-ai-hint="yacht sea"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
    </>
  )
}
