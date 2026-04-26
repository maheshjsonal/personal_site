export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div>
          &copy; {new Date().getFullYear()} My Digital Space. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary hover:no-underline">Twitter</a>
          <a href="#" className="hover:text-primary hover:no-underline">GitHub</a>
          <a href="#" className="hover:text-primary hover:no-underline">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
