const Footer = () => {
    return (
      <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center mb-4">
                <span className="text-xl font-semibold tracking-tight text-foreground">plugma</span>
                <div className="ml-1 w-2 h-2 bg-luma-600 rounded-full"></div>
              </a>
              <p className="text-sm text-muted-foreground mb-4">
                I Do not claim the copyright of anything here, this is merely a demo because I couldn't aqquire data from luma or my university event software.
              </p>
            </div>
            
            {/* <div>
              <h3 className="font-medium mb-4 text-sm">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Templates', 'Customers'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-sm">Company</h3>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-sm">Resources</h3>
              <ul className="space-y-3">
                {['Help Center', 'API', 'Status', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-sm">Legal</h3>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>*/}
          </div> 
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} plugma. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map((platform) => (
                <a 
                  key={platform} 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  