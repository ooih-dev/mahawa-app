export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }, { locale: "ar" }];
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
