export function SectionError({ message = "Obsah se momentálně nepodařilo načíst. Zkuste obnovit stránku." }: { message?: string }) {
  return (
    <div className="py-16 flex items-center justify-center">
      <p className="font-body-md text-body-md text-outline font-light text-center max-w-sm">
        {message}
      </p>
    </div>
  )
}
