export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-16 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">About</h1>
  <p className="text-zinc-300/90">
        I am a third-year student at Télécom Nancy, specializing in Internet Systems and Security (ISS), and I am also pursuing a double degree at IAE Nancy.
      </p>
      <p className="mt-4 text-zinc-300/90">
        My main interest lies in cybersecurity in its various dimensions. More recently, I have developed a strong focus on governance, risk management, and compliance (GRC), a field I am eager to further explore throughout my academic and professional journey.
  </p>
    </section>
  );
}