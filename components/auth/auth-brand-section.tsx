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
