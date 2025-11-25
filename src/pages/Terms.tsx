import { Film } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using MovieVerse, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily use MovieVerse for
                personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                The materials on MovieVerse are provided on an 'as is' basis.
                MovieVerse makes no warranties, expressed or implied, and hereby
                disclaims and negates all other warranties including without
                limitation, implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall MovieVerse or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use MovieVerse.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Accuracy of Materials
              </h2>
              <p className="text-muted-foreground mb-4">
                Movie information displayed on MovieVerse is sourced from The
                Movie Database (TMDB). While we strive for accuracy, we cannot
                guarantee the completeness or accuracy of this information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
              <p className="text-muted-foreground mb-4">
                MovieVerse has not reviewed all of the sites linked to its
                platform and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by MovieVerse.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
              <p className="text-muted-foreground mb-4">
                MovieVerse may revise these terms of service at any time without
                notice. By using MovieVerse, you are agreeing to be bound by the
                then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms and conditions are governed by and construed in
                accordance with applicable laws and you irrevocably submit to
                the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
