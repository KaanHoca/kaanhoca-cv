import Link from "next/link";
import { ArrowRight, FileDown, Palette, Lock, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { themes } from "@/lib/themes";

const features = [
  {
    icon: Palette,
    title: "Birden çok tema",
    description:
      "Bilgilerinizi tek sefer girin, kreatiften klasiğe dilediğiniz tasarımda dışa aktarın.",
  },
  {
    icon: FileDown,
    title: "Tek tıkla PDF",
    description:
      "ATS dostu, doğrudan indirilebilir PDF. İşvereniniz hemen okuyabilir.",
  },
  {
    icon: Lock,
    title: "Veriniz sizde kalır",
    description:
      "Bilgileriniz sadece tarayıcınızda saklanır. Üyelik gerekmez, sunucuya bir şey gönderilmez.",
  },
  {
    icon: Zap,
    title: "Hızlı ve ücretsiz",
    description:
      "Ne paywall, ne reklam. Yarın bir gün isterseniz aynı bilgilerle yeni bir tema seçin.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            cv.kaanhoca
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Profesyonel CV'nizi
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent">
              dakikalar içinde
            </span>{" "}
            hazırlayın
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Bilgilerinizi tek seferde doldurun, dilediğiniz tasarımı seçip PDF
            olarak indirin. Üyelik yok, ücret yok, veriniz tarayıcınızda kalır.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/editor"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              CV Oluşturmaya Başla
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            Hazır temalar
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Aynı bilgilerle dilediğiniz tasarıma anında geçiş yapın.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border bg-background p-5 transition hover:shadow-md"
              >
                <div
                  className="mb-3 h-2 w-12 rounded-full"
                  style={{ backgroundColor: t.accent }}
                />
                <h3 className="font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title}>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-foreground px-4 py-14 text-background">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Hazırsınız.</h2>
          <p className="mt-2 text-background/70">
            Birkaç dakika ayırın, gerisini bize bırakın.
          </p>
          <Link
            href="/editor"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "mt-6",
            )}
          >
            Hemen Başla
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <p>cv.kaanhoca · ev sunucumuzdan sevgilerle</p>
      </footer>
    </main>
  );
}
