import { ExternalLink, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">OAuth PVT</h3>
            <p className="text-xs text-muted-foreground">
              Modern OAuth configuration interface for enterprise applications.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  GitHub <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  Twitter <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>© 2025 OAuth PVT. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500" /> for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}