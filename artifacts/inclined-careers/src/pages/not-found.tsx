import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Meta } from "@/components/shared/Meta";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#FAF9F6] px-4 py-16">
      <Meta
        title="404 - Page Not Found | Inclined Careers"
        description="The requested page could not be found. Return to Inclined Careers home."
        noindex={true}
      />
      <Card className="w-full max-w-md border border-[#ded6c7] bg-[#ffffff] shadow-sm">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#BA780E]/10 text-[#BA780E] mb-4">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold serif text-[#011330]">404 - Page Not Found</h1>
          <p className="mt-2 text-sm text-[#5d6971]">
            We couldn't find the page you're looking for. It may have been moved or no longer exists.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#011330] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f8f4ec] transition-colors hover:bg-[#BA780E] hover:text-[#011330]"
            >
              <ArrowLeft size={14} />
              Return to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
